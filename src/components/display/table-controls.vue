<template>
	<div class="tab-controls">
		<button 
			v-on:dragstart.stop="moveStart"
			v-on:dragend.stop="moveEnd"
			data-state="move" draggable="true">Move</button>
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
			moveStart : function(evt) {
				this.$root.dragged = evt.target.parentNode.parentNode;

				let dt = evt.dataTransfer;
				let isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

				if (!isIE11)
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
}
</style>