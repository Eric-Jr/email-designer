<template>
	<td style="background-color: #ffffff;padding: 20px;">
		<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
			<tr>
				<table-column
				v-on:drop.native.stop="appendComponent($event)"
				v-on:dragenter.native.prevent=""
				v-on:dragover.native.prevent=""
				style="padding: 10px;text-align:center;"
				bgcolor="#dddddd"
				>
					<component
					v-for="component in components"
					v-on:mouseenter.native.stop="showControls($event)"
					v-on:mouseleave.native.stop="hideControls($event)"
					:key="component.type"
					:is="component.type"
					style="position: relative;"
					>
					</component>
				</table-column>
			</tr>
		</table>
	</td>
</template>

<script>
	export default {
		data () {
			return {
				components : [],
				props : {
					columns : null,
				}
			}
		},
		components :
		{
			TableColumn : {
				render : function(createElement)
				{
					return createElement(
						'td', this.$slots.default
					)
				}
			}
		},
		methods :
		{
			appendComponent : function (evt)
			{
				let vm = this;
				switch (this.$root.$data.dragged)
				{
					case 'text':
						vm.components.push({
							type : 'EmailText',
							content : 'type some content',
						});
					break;
				}

				this.$root.$data.dragged = false;
				vm.$parent.reIndex(vm);
			},
			showControls : function(evt,componentid,component)
			{
				evt.target.children[0].style.display = 'flex';
			},
			hideControls : function(evt,componentid,component)
			{
				evt.target.children[0].style.display = 'none';
			},
		},
		directives :
		{
			add :
			{
				inserted : function(el,binding,vnode)
				{
					
				}
			}
		}
	}
</script>

<style lang="scss">
	
</style>