<template>
	<div id="work-space-nav">
		<button 
			v-for="tab in tabs"
			v-bind:key="tab"
			v-bind:class="['tab-button', { active: currentTab === tab }]"
			v-on:click="currentTab = tab"
		>{{ tab }}</button>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				currentTab: 'settings',
				tabs: ['settings','content','social']
			}
		},
		computed: {
			currentTabComponent: function() {
				return 'tab-' + this.currentTab.toLowerCase();
			}
		}
	}
</script>

<style lang="scss" scoped>
	#work-space-nav {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-evenly;
		border-bottom: 1px solid;
	}

	button {
		flex: 1 1 auto;
		border: 1px solid rgba(200,200,200,1);
		border-bottom: none;
		outline: none;
		font-weight: 700;
		padding: 7px 5px;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		background: rgba(255,255,255,1);
		box-sizing: border-box;
		transition: 0.2s all;


		&:hover, &.active {
			cursor: pointer;
			background: rgba(100,100,200,1);
			color: rgba(255,255,255,1);
		}
	}
</style>