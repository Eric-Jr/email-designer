<template>
	<div class="tab-controls">
		<span 
			v-on:dragstart="moveStart"
			v-on:dragend="moveEnd"
			data-state="move" draggable="true">Move</span>
		<span>Edit</span>
		<span
			v-on:click="deleteBlock"
		>Delete</span>
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
			moveStart : function(evt) {
				this.$root.dragged = evt.target.parentNode.parentNode;

				let dt = evt.dataTransfer;
				
				if (dt.setDragImage && dt.setData)
				{
					// removes ghost image on cursor (Firefox/Chrome)
					dt.setDragImage(new Image(), 0, 0);

					// initiates drag events (Firefox only)
					dt.setData('key', '');
				}

				// reveal dropzones
				document.querySelectorAll('*[data-state="drop"],*[data-state="append"]').forEach(function(dropzone) {
					dropzone.classList.add('reveal');
				});
			},
			moveEnd : function(evt)
			{
				// hide dropzones
				document.querySelectorAll('*[data-state="drop"],*[data-state="append"]').forEach(function(dropzone) {
					dropzone.classList.remove('reveal');
				});
			},
			deleteBlock : function(evt)
			{
				// grab currently evaluated table
				let el = evt.target.parentNode.parentNode;
				// hide controls
				evt.target.parentNode.style.display = 'none';
				// remove controls from table
				this.$parent.$el.appendChild(evt.target.parentNode);
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

	span
	{
		padding: 5px;
		margin-right: 5px;
		background: rgba(0,0,0,.5);

		&:hover {
			cursor: pointer;
		}
	}
}
</style>