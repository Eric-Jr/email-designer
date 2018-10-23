<template>
	<div>
		<div 
			v-for="component in components"
			:key="component.name"
			class="email-component">
			<h2>{{ component.fullname }}</h2>
			<table 
				v-on:dragstart="ondragstart"
				v-on:dragend="ondragend"
				:key="component.name"
				:data-type="component.name"
				draggable="true"
				data-state="drag"
				data-method="copy"
				align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto;" class="email-container">
				<component :is="component.name"></component>
			</table>
		</div>
	</div>
</template>

<script>
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
			props : ['component'],
			components : 
			[
				{
					name : 'email-header',
					fullname : 'Email Header',
				},
				{
					name : 'hero-image',
					fullname : 'Hero Image, Flush',
				},
				{
					name : 'one-column-text-button',
					fullname : '1 Column Text + Button',
				},
				{
					name : 'background-image-text',
					fullname : 'Background Image with Text',
				},
				{
					name : 'two-even-columns',
					fullname : '2 Even Columns',
				},
				{
					name : 'three-even-columns',
					fullname : '3 Even Columns',
				},
				{
					name : 'thumbnail-left-text-right',
					fullname : 'Thumbnail Left, Text Right',
				},
				{
					name : 'thumbnail-right-text-left',
					fullname : 'Thumbnail Right, Text Left',
				},
				{
					name : 'one-column-text',
					fullname : '1 Column Text',
				},
				{
					name : 'clear-spacer',
					fullname : 'Clear Spacer',
				},
			]
		}
	},
	components: {
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
	methods : {
		ondragstart : function(evt)
		{
			let dt = evt.dataTransfer;

			if (dt.setDragImage && dt.setData)
			{
				// removes ghost image on cursor (Firefox/Chrome)
				dt.setDragImage(new Image(), 0, 0);

				// initiates drag events (Firefox only)
				dt.setData('key', '');
			}

			// clone element and store at root
			this.$root.$data.dragged = evt.target.cloneNode(true);

			// show dropzones
			document.querySelectorAll('*[data-state="drop"]').forEach(function(dropzone) {
				dropzone.classList.add('reveal');
			});
		},
		ondragend : function(evt)
		{
			// hide dropzones
			document.querySelectorAll('*[data-state="drop"],*[data-state="append"]').forEach(function(dropzone) {
				dropzone.classList.remove('reveal');
			});
		},
		convertComponentName: function(str)
		{
			var strArr = str.match(/[0-9a-zA-Z\s]/g);
			strArr.forEach(function(character,index) {
				strArr[index] = character.toLowerCase();
			});
			var name = strArr.join('').trim(); // only spaces and letters
			var formatted = name.replace('  ',' ').replace(/\s/g,'-'); // replace spaces with dashes
			return formatted;
		}
	},
}
</script>

<style lang="scss">
	.email-container
	{
		& tr {
			pointer-events: none;
		}

		@mixin reveal()
		{
			content: '[INSERT HERE]';
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
		}

		&.highlight-before
		{
			&:before {
				@include reveal();
			}
		}

		&.highlight-after
		{
			&:after {
				@include reveal();
			}
		}
	}
</style>