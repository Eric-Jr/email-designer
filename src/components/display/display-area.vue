<template>
	<section id="displayarea">
		<div class="inner">
			<div width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
				<email-display 
					v-on:dragenter.native="ondragenter"
					v-on:dragover.native="ondragover"
					v-on:dragleave.native="ondragleave"
					v-on:drop.native="ondrop"
					data-state='drop'
					style="width: 100%; background-color: #222222;" class="initial-display">
				<!--[if mso | IE]>
				<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #222222;">
				<tr>
				<td>
				<![endif]-->

					<!-- Visually Hidden Preheader Text : BEGIN -->
					<div contenteditable="true" style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
						(Optional) This text will appear in the inbox preview, but not the email body. It can be used to supplement the email subject line or even summarize the email's contents. Extended text preheaders (~490 characters) seems like a better UX for anyone using a screenreader or voice-command apps like Siri to dictate the contents of an email. If this text is not included, email clients will automatically populate it using the text (including image alt text) at the start of the email's body.
					</div>
					<!-- Visually Hidden Preheader Text : END -->

					<!-- Create white space after the desired preview text so email clients don’t pull other distracting text into the inbox preview. Extend as necessary. -->
					<!-- Preview Text Spacing Hack : BEGIN -->
					<div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
						&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
					</div>
					<!-- Preview Text Spacing Hack : END -->
					
					<!-- BEGIN : Render Email Components -->
					<div v-if="this.$data.components[0]">
						<component 
							v-for="component in this.$data.components"
							v-on:mouseenter.native="showControls"
							v-on:mouseleave.native="hideControls"
							v-on:drop.native="insertComponent"
							:key="'email-component-'+component.id"
							:data-id="component.id"
							:data-type="component.type"
							:is="component.type"
							class="email-container"
							data-method="move">
						</component>
					</div>
					<!-- END : Render Email Components -->

				<!--[if mso | IE]>
				</td>
				</tr>
				</table>
				<![endif]-->
				</email-display>
			</div>
			<table-controls></table-controls>
		</div>
		<span 
			v-on:mousedown.stop="resizeStart"
			class="resize"></span>
	</section>
</template>

<script>
	import TableControls from './table-controls'
	import EmailHeader from '../email-components/email-header'
	import HeroImage from '../email-components/hero-image'
	import OneColumnTextButton from '../email-components/one-column-text-button'
	import BackgroundImageText from '../email-components/background-image-text'
	import TwoEvenColumns from '../email-components/two-even-columns'
	import ThreeEvenColumns from '../email-components/three-even-columns'
	import ThumbnailLeftTextRight from '../email-components/thumbnail-left-text-right'
	import ThumbnailRightTextLeft from '../email-components/thumbnail-right-text-left'
	import OneColumnText from '../email-components/one-column-text'
	import ClearSpacer from '../email-components/clear-spacer'

	export default {
		data () {
			return {
				components : [],
			}
		},
		components : 
		{
			TableControls,
			EmailDisplay :
			{
				render : function(createElement)
				{
					return createElement(
						'center',
						this.$slots.default
					);
				}
			},
			EmailHeader,
			HeroImage,
			OneColumnTextButton,
			BackgroundImageText,
			TwoEvenColumns,
			ThreeEvenColumns,
			ThumbnailLeftTextRight,
			ThumbnailRightTextLeft,
			OneColumnText,
			ClearSpacer,
		},
		methods : 
		{
			ondragenter : function(evt)
			{
				if (evt.target.dataset.state === 'drop')
				{
					// enables dropzones when dragging
					evt.preventDefault();

					// add highlights
					evt.target.classList.add('highlight');
				}

				if (evt.target.getAttribute('class'))
				{
					if (evt.target.getAttribute('class').match(/email-container/g))
					{
						// enables dropzones when dragging
						evt.preventDefault();

						// check whether user is scrolling top or bottom half
						if (evt.offsetY < evt.target.offsetHeight / 2)
						{
							evt.target.classList.add('highlight-before');
						}
						else
						{
							evt.target.classList.add('highlight-after');
						}
					}
				}
			},
			ondragover : function(evt)
			{
				if (evt.target.dataset.state === 'drop')
				{
					// enables dropzones when dragging
					evt.preventDefault();
				}

				if (evt.target.getAttribute('class'))
				{
					if (evt.target.getAttribute('class').match(/email-container/g))
					{
						// enables dropzones when dragging
						evt.preventDefault();

						// check whether user is scrolling top or bottom half
						if (evt.offsetY < evt.target.offsetHeight / 2)
						{
							evt.target.classList.remove('highlight-after');
							evt.target.classList.add('highlight-before');
						}
						else
						{
							evt.target.classList.remove('highlight-before');
							evt.target.classList.add('highlight-after');
						}
					}
				}
			},
			ondragleave : function(evt)
			{
				if (evt.target.dataset.state === 'drop' ||
					evt.target.getAttribute('class'))
				{
					// clear highlights
					evt.target.classList.remove('highlight');
					evt.target.classList.remove('highlight-before');
					evt.target.classList.remove('highlight-after');
				}
			},
			ondrop : function(evt)
			{
				let vm = this;

				// prevent event bubbling
				evt.stopImmediatePropagation();

				// clear highlights
				evt.target.classList.remove('highlight');

				if (evt.target.dataset.state === 'drop')
				{
					// add to virtual dom tree
					vm.$data.components.push({
						el : vm.$root.dragged,
						type : vm.$root.dragged.dataset.type,
					});

					// re-index vnode array
					this.reIndex();

					// Remove initial instructions
					if (document.querySelector('.initial-display'))
					{
						document.querySelector('.initial-display').classList.remove('initial-display');
					}
				}
			},
			resizeStart : function(evt)
			{
				evt.stopImmediatePropagation();
				this.$root.mouseDown = true;
				this.$root.resizeEl = evt.target.parentNode;
			},
			showControls : function(evt)
			{
				let vm = this;
				evt.target.style.position = 'relative';
				evt.target.appendChild(vm.$children[1].$el);
				vm.hovered = this;
				vm.$children[1].$el.style.display = 'flex';
			},
			hideControls : function(evt)
			{
				let vm = this;
				vm.$children[1].$el.style.display = 'none';
				evt.target.style.position = '';
				vm.$el.appendChild(vm.$children[1].$el);
			},
			insertComponent : function(evt)
			{
				let vm = this;

				// clear highlights
				evt.target.classList.remove('highlight-before');
				evt.target.classList.remove('highlight-after');

				// grab vnode id
				let id = Number(evt.target.dataset.id);
				let vnode;

				// check whether user is scrolling top or bottom half
				if (evt.offsetY < evt.target.offsetHeight / 2) {
					if (vm.$root.dragged.dataset.method !== 'move')
					{
						// append before target in virtual dom
						vm.$data.components.splice(
						id, // insert before this index
						0, // don't delete any items in array
						{
							el : vm.$root.dragged,
							type : vm.$root.dragged.dataset.type,
						});
					}
					else
					{
						/*
						** TODO:
						** 	fix this shit
						**/
						// append before target in virtual dom
						// let moveid = vm.$root.dragged.dataset.id;
						// let cur = vm.$data.components[id];
						// let tmp = cur;

						// vm.$data.components[id] = vm.$data.components[moveid];
					}
				}
				else
				{
					// append after target
					if (evt.target.nextElementSibling)
					{
						// add to virtual dom tree
						vm.$data.components.splice(
						id + 1, // insert after this index
						0, // don't delete any items in array
						{
							el : vm.$root.dragged,
							type : vm.$root.dragged.dataset.type,
						});
					}
					else
					{
						// add to virtual dom tree
						vm.$data.components.push({
							el : vm.$root.dragged,
							type : vm.$root.dragged.dataset.type,
						});
					}
				}

				// re-index vnode array
				this.reIndex();
			},
			reIndex : function()
			{
				this.$data.components.forEach(function(component,key)
				{
					component.id = key;
					component.el.dataset.id = key;
				})
			}
		},
	}
</script>

<style lang="scss">
#displayarea
{
	position: relative;
	background-color: #222222;

	.inner
	{
		margin: 0 auto;
		overflow-y: scroll;
		height: 100%;
		position: relative;
		padding: 15px;
		display: flex;
		flex-flow: column;

		& > * {
			flex: 1 1 100%;
		}
	}

	*[data-state='drop']
	{
		color: #fff;
		position: relative;
		min-height: 100%;
		padding-top: 30px;
		padding-bottom: 30px;

		&.reveal {
			outline: 4px dashed rgba(100,100,100,.8);
		}

		&.highlight {
			outline-color: rgb(255,255,255);
		}

		*[data-state="drag"] {
			margin-bottom: 0;
		}
	}

	*[data-state='append']
	{

		&.reveal
		{
			background: rgba(94, 194, 221, 1);
			border: 4px dashed rgba(34, 77, 89, .5);
			outline: 2px solid rgba(34, 77, 89, 1);
			height: 30px;
			color: rgb(34, 77, 89);
			letter-spacing: 12px;
			font-weight: 700;
			display: flex;
			justify-content: center;
			align-items: center;

			&:before {
				content: attr(data-title);
			}
		}

		&.highlight {
			border-color: rgb(255,255,255);

			&:before {
				color: rgb(255,255,255);
			}
		}
	}

	.block
	{
		position: relative;

		&:hover 
		{
			outline: 3px solid rgba(75,75,200,.8);

			& .block-controls {
				display: inline-block;
			}
		}

		*[data-append="before"] {
			height: 10px;
			width: 100%;
			position: absolute;
			top: 0;
		}

		*[data-append="after"] {
			height: 10px;
			width: 100%;
			position: absolute;
			bottom: 0;
		}

		*[data-append].highlight {
			background: rgba(75,75,200,.8);
		}

		.block-controls {
			display: none;
			background: rgba(0,0,0,.9);
			border-radius: 15px;
			position: absolute;
			transform: translateY(-50%);
		}

		@mixin blockControls()
		{
			display: inline-block;
			text-align: center;
			padding: 15px;
			outline: 0px solid rgba(0,0,0,.6);
			transform: scale(1);
			transition: 0.2s all;
			z-index: 2;

			&:hover {
				cursor: pointer;
				// outline-width: 2px;
				// transform: scale(1.3);
			}

			&:before {
				content: attr(data-method);
			}
		}

		div[data-method="move"]
		{
			@include blockControls();

			&:hover {
				cursor: move;
			}
		}

		div[data-method="edit"]
		{
			@include blockControls();
			&:hover {
				cursor: text;
			}
		}

		div[data-method="delete"]
		{
			@include blockControls();
			&:hover {
				cursor: no-drop;
			}
		}
  }

	&.mobile
	{
		min-width: 350px !important;

		.email-container {
			width: 100% !important;
			margin: auto !important;
		}

		/* What it does: Forces elements to resize to the full width of their container. Useful for resizing images beyond their max-width. */
		.fluid {
			max-width: 100% !important;
			height: auto !important;
			margin-left: auto !important;
			margin-right: auto !important;
		}

		/* What it does: Forces table cells into full-width rows. */
		.stack-column,
		.stack-column-center {
			display: block !important;
			width: 100% !important;
			max-width: 100% !important;
			direction: ltr !important;
		}

		/* And center justify these ones. */
		.stack-column-center {
			text-align: center !important;
		}

		/* What it does: Generic utility class for centering. Useful for images, buttons, and nested tables. */
		.center-on-narrow {
			text-align: center !important;
			display: block !important;
			margin-left: auto !important;
			margin-right: auto !important;
			float: none !important;
		}

		table.center-on-narrow {
			display: inline-block !important;
		}

		/* What it does: Adjust typography on small screens to improve readability */
		.email-container p {
			font-size: 17px !important;
		}
	}
}
</style>