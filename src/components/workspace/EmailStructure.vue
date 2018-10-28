<template>
	<div>
		<div 
		v-for="component in components"
		:key="component.type"
		class="email-component"
		>
			<h2>{{ component.name }}</h2>
			<div 
			v-on:dragstart="ondragstart"
			v-on:dragend="ondragend"
			:key="component.type"
			:data-type="component.type"
			draggable="true"
			data-state="drag"
			data-method="copy"
			style="margin: 0 auto;"
			class="email-container"
			>
				<table
				align="center"
				role="presentation"
				cellspacing="0"
				cellpadding="0"
				border="0"
				class="email-container"
				style="margin: 0 auto;"
				:width="600"
				>
					<tr>
						<component v-bind="component.props" :is="component.type"></component>
					</tr>
				</table>
			</div>
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
					type : 'OneColumn',
					name : '1 Column',
					props : {
						columns : 1,
					}
				},
			]
		}
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
			this.$root.$data.dragged = evt.target.dataset.type;

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
	},
}
</script>

<style lang="scss">
	.email-container
	{
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