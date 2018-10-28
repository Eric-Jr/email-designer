<template>
	<div>
		<!-- EMAIL WIDTH -->
		<p>{{'Email Width:' + this.$root.$children[0].$data.emailwidth + 'px'}}</p>
		<div id="email-width" class="slider-track">
			<input
				type="range"
				v-on:input="updateEmailWidth"
				min="350"
				max="900"
				:value="this.$root.$children[0].$data.emailwidth"
				class="slider">
		</div>
		<template v-if="this.$root.$children[0].$data.editNode">
			<textarea ref="textarea" style="width: 100%;" v-model="text"></textarea>
			<button v-on:click="updateText($event)">Update</button>
		</template>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				text : '',
			}
		},
		methods :
		{
			updateEmailWidth : function (evt)
			{
				this.$root.$children[0].$data.emailwidth = evt.target.value;
			},
			updateText : function (evt)
			{
				this.$root.$children[0].$data.editNode.context.content = this.text;
			}
		},
		directives :
		{
			cke : 
			{
				inserted : function (el,binding)
				{	
					
				}
			}
		}
	}
</script>

<style lang="scss">
	.slider-track
	{
		width: 100%;
		position: relative;

		.slider
		{
			width: 100%;

			&:hover {
				cursor: pointer;
			}
		}
	}
</style>