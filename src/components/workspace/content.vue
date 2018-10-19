<template>
	<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto;">
        <div v-for="block in blocks"> 
    	 	<component :is="block.name"></component>
        </div>
    </table>
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
				blocks : 
				[
					{
						name : 'email-header'
					},
					{
						name : 'hero-image',
					},
					{
						name : 'one-column-text-button',
					},
					{
						name : 'background-image-text',
					},
					{
						name : 'two-even-columns',
					},
					{
						name : 'three-even-columns',
					},
					{
						name : 'thumbnail-left-text-right',
					},
					{
						name : 'thumbnail-right-text-left',
					},
					{
						name : 'one-column-text',
					},
					{
						name : 'clear-spacer',
					},
				]
			}
		},
		components: {
			EmailHeader
		},
		computed : {
			convertComponentName: function(name)
			{
				console.log(name);
				var name = this.match(/[a-zA-Z,\s]/g).join(''); // only spaces and letters
				var formatted = name.replace(/\s/,'-'); // replace spaces with dashes
				return formatted;
			}
		}
	}
</script>

<style lang="scss">
	
</style>