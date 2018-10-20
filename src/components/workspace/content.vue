<template>
	<div> 
		<component 
			v-for="component in components"
			v-on:dragstart.native="ondragstart"
			v-on:dragend.native="ondragend"
			v-bind:key="component.id"
			:is="component.name"
			draggable="true"
			data-state="drag"
			data-method="copy">
		</component>
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
			let isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

			if (!isIE11)
			{
				// removes ghost image on cursor (Firefox/Chrome)
				dt.setDragImage(new Image(), 0, 0);

				// initiates drag events (Firefox only)
				dt.setData('key', '');
			}

			// clone element and store at root
			this.$root.dragged = evt.target.querySelector('table').cloneNode(true);

			// switch dragging flag to true
			this.$root.dragging = true;

			// show dropzones
			document.querySelectorAll('*[data-state="drop"],*[data-state="append"]').forEach(function(dropzone) {
				dropzone.classList.add('reveal');
			});
		},
		ondragend : function(evt)
		{
			// this.target.removeAttribute('draggable');

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
	
</style>