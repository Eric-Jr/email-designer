<template>
	<div>
		<div 
		v-for="component in this.components"
		:key="component.type"
		v-on:dragstart="ondragstart($event,component.type)"
		class="email-component"
		draggable="true">
			<h2>{{ component.name }}</h2>
		</div>
	</div>
</template>

<script>

export default {
	data () {
		return {
			components : 
			[
				{
					type : 'text',
					name : 'Text Block',
				},
			]
		}
	},
	methods : {
		ondragstart : function (evt,type)
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
			this.$root.$data.dragged = type;
		},
		ondragend : function (evt)
		{
			
		},
	},
}
</script>

<style lang="scss">

</style>