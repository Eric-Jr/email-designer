<template>
	<section id="displayarea">
		<div class="inner">
			<div width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
				<center 
					v-on:dragenter="ondragenter"
					v-on:dragover="ondragover"
					v-on:dragleave="ondragleave"
					v-on:drop.stop="ondrop"
					data-state='drop'
					style="width: 100%; background-color: #222222;"
				>
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
					
					<div
					v-if="this.components.length === 0"
					style="
					color: #787878;
					font-size: 2em;
					font-family: sans-serif;
					display: -webkit-box;
					display: -ms-flexbox;
					display: flex;
					-webkit-box-pack: center;
					-ms-flex-pack: center;
					justify-content: center;
					-webkit-box-align: center;
					-ms-flex-align: center;
					align-items: center;
					height: 100%;
					width: 100%;
					position: absolute;
					top: 0;
					left: 0;
					"
					>
						Drag Blocks Here To Start
					</div>
					
					<table
					align="center"
					role="presentation"
					cellspacing="0"
					cellpadding="0"
					border="0"
					class="email-container"
					style="margin: 0 auto;"
					:width="this.$root.$children[0].$data.emailwidth"
					>
						<!-- BEGIN : Render Email Components -->
						<template v-if="this.components.length !== 0">
							<tr
							v-for="component in this.components"
							:key="'email-component-' + component.id"
							>
								<component
								:data-id="component.id"
								:data-type="component.type" 
								:is="component.type"
								></component>
							</tr>
						</template>
						<!-- END : Render Email Components -->
					</table>

				<!--[if mso | IE]>
				</td>
				</tr>
				</table>
				<![endif]-->
				</center>
			</div>
		</div>
		<span 
			v-on:mousedown.stop="resizeStart"
			class="resize"></span>
	</section>
</template>

<script>
	import TableControls from './table-controls'
	import OneColumn from '../email-components/OneColumn'
	import TwoColumnEven from '../email-components/TwoColumnEven'
	import ThreeColumnEven from '../email-components/ThreeColumnEven'
	import TwoColumn2080 from '../email-components/TwoColumn2080'
	import TwoColumn8020 from '../email-components/TwoColumn8020'

	export default {
		data () {
			return {
				components : [],
				emailwidth : 600,
			}
		},
		components : 
		{
			TableControls,
			OneColumn,
			TwoColumnEven,
			ThreeColumnEven,
			TwoColumn2080,
			TwoColumn8020,
		},
		methods : 
		{
			showEvent : function (evt)
			{
				console.log(evt);
			},
			ondragenter : function (evt)
			{
				evt.preventDefault();

				if (evt.target.dataset.state === 'drop')
				{
					// add highlights
					evt.target.classList.add('highlight');
				}

				if (evt.target.getAttribute('class'))
				{
					if (evt.target.getAttribute('class').match(/email-container/g))
					{
						// enables dropzones when dragging
						// evt.preventDefault();

						// check whether user is scrolling top or bottom half
						if (evt.offsetY < evt.target.offsetHeight / 2)
						{
							// evt.target.classList.add('highlight-before');
						}
						else
						{
							// evt.target.classList.add('highlight-after');
						}
					}
				}
			},
			ondragover : function(evt)
			{
				evt.preventDefault();

				if (evt.target.getAttribute('class'))
				{
					if (evt.target.getAttribute('class').match(/email-container/g))
					{
						// enables dropzones when dragging
						// evt.preventDefault();

						// check whether user is hovering on top or bottom half
						if (evt.offsetY < evt.target.offsetHeight / 2)
						{
							// evt.target.classList.remove('highlight-after');
							// evt.target.classList.add('highlight-before');
						}
						else
						{
							// evt.target.classList.remove('highlight-before');
							// evt.target.classList.add('highlight-after');
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

				// clear highlights
				evt.target.classList.remove('highlight');

				if (vm.$root.$data.dragged)
				{
					// add to virtual dom tree
					vm.$data.components.push({
						type : vm.$root.$data.dragged,
					});

					// re-index vnode array
					this.reIndex(this);

					vm.$root.$data.dragged = false;
				}
			},
			resizeStart : function(evt)
			{
				evt.stopImmediatePropagation();
				this.$root.$data.mouseDown = true;
				this.$root.$data.resizeEl = evt.target.parentNode;
			},
			insertComponent : function(evt)
			{
				let vm = this;
				let vnode;

				// grab id of drop zone
				let id = Number(evt.target.dataset.id);

				// clear highlights
				evt.target.classList.remove('highlight-before');
				evt.target.classList.remove('highlight-after');

				// check whether user is scrolling top or bottom half
				if (evt.offsetY < evt.target.offsetHeight / 2)
				{
					switch (vm.$root.$data.dragged.dataset.method)
					{
						case 'copy':
							vnode = {
								content : vm.$root.$data.dragged.outerHTML,
								type : vm.$root.$data.dragged.dataset.type,
							};
						break;

						case 'move':
							let moveid = Number(vm.$root.$data.dragged.dataset.id);
							vnode = vm.$data.components[moveid];

							// delete current vnode from array
							vm.$data.components.splice(moveid, 1);
						break;
					}

					// add vnode to virtual dom array
					vm.$data.components.splice(id, 0, vnode);
				}
				else
				{
					// append after target
					if (evt.target.nextElementSibling)
					{
						switch (vm.$root.$data.dragged.dataset.method)
						{
							case 'copy':
								vnode = {
									content : vm.$root.$data.dragged.outerHTML,
									type : vm.$root.$data.dragged.dataset.type,
								};
							break;
							
							case 'move':
								let moveid = Number(vm.$root.$data.dragged.dataset.id);
								vnode = vm.$data.components[moveid];

								// delete current vnode from array
								vm.$data.components.splice(moveid, 1);
							break;
						}

						// add to vnode virtual dom tree
						vm.$data.components.splice(id + 1, 0, vnode);
					}
					else
					{
						switch (vm.$root.$data.dragged.dataset.method)
						{
							case 'copy':
								// add to virtual dom tree
								vm.$data.components.push({
									content : vm.$root.$data.dragged.outerHTML,
									type : vm.$root.$data.dragged.dataset.type,
								});
							break;
						
							case 'move':
								let moveid = Number(vm.$root.$data.dragged.dataset.id);
								vnode = vm.$data.components[moveid];

								// delete current vnode from array
								vm.$data.components.splice(moveid, 1);

								// move vnode to new position
								vm.$data.components.push(vnode);
							break;
						}
					}
				}

				// re-index vnode array
				this.reIndex(this);
			},
			reIndex : function(vm)
			{
				vm.components.forEach(function(component,key)
				{
					component.id = key;
				});
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