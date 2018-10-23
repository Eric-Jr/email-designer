<template>
	<div v-if="this.$root.$data.editorContent">
		<textarea v-cke="this" name="content" id="editor" cols="30" rows="10"></textarea>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				wysiwyg : false,
			}
		},
		method :
		{
			
		},
		directives:
		{
			cke : 
			{
				inserted : function(el,binding)
				{
					let ClassicEditor = window.ClassicEditor;
					
					/* TODO:
					 =>	Figure out how to pass valid HTML into CKEditor
					**/
					// el.innerHTML = binding.value.$root.$data.editorContent;
					el.innerHTML = 'In magna sed qui cupidatat veniam cupidatat veniam excepteur voluptate exercitation velit eu esse aliqua esse exercitation ad veniam anim quis aute dolore ut elit pariatur qui in.';

					if (!binding.value.$data.wysiwyg)
					{
						console.log('wysiwyg created');
						ClassicEditor
							.create(el)
							.catch(error => {
								console.error(error);
						});
					}

					binding.value.$data.wysiwyg = true;
				}
			}
		}
	}
</script>

<style lang="scss">
	
</style>