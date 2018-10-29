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
			<textarea v-placeholder ref="textarea" style="width: 100%;" v-model="text"></textarea>
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
				if (this.$root.$children[0].$data.editNode.context)
				{
					this.$root.$children[0].$data.editNode.context.$data.textcontent = this.text;
				}
			}
		},
		directives :
		{
			placeholder : 
			{
				inserted : function (el,binding,vnode)
				{
					el.value = vnode.context.$root.$children[0].$data.editNode.context.textcontent;
				}
			}
		},
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