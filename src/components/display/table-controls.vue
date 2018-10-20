<template>
	<div class="tab-controls">
		<button>Move</button>
		<button>Edit</button>
		<button
			v-on:click="deleteBlock"
		>Delete</button>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		methods :
		{
			deleteBlock : function(evt)
			{
				// grab currently evaluated table
				let el = evt.target.parentNode.parentNode;
				// hide controls
				evt.target.parentNode.style.display = 'none';
				// remove controls from table
				this.$parent.$el.appendChild(evt.target.parentNode);
				// delete insert block
				el.nextElementSibling.remove();
				// delete table
				el.remove();
			}
		}
	}
</script>

<style lang="scss">
.tab-controls
{
	position: absolute;
	top: 0;
	left: 0;
	display: none;
	width: 100%;
}
</style>