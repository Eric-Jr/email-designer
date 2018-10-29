<template>
	<div ref="email-text" style="height: 100%;">
		<table-controls></table-controls>
		<p>{{ this.$data.textcontent }}</p>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				textcontent : 'type some text',
			}
		},
	}
</script>

<style lang="scss">
	
</style>