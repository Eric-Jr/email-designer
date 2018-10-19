<template>
	<section id="workspace">
		<div id="work-space-nav">
			<button 
				v-for="tab in tabs"
				v-bind:key="tab"
				v-bind:class="['tab-button', { active: currentTab === tab }]"
				v-on:click="currentTab = tab"
			>{{ tab }}</button>
		</div>
		<div 
			v-bind:is="currentTabComponent"
			class="inner"
		></div>
		<nav></nav>
	</section>
</template>

<script>
	import WorkSpaceContent from './content'
	import WorkSpaceSettings from './settings'
	import WorkSpaceSocial from './social'

	export default {
		data () {
			return {
				currentTab: 'content',
				tabs: ['settings','content','social']
			}
		},
		components: {
			WorkSpaceContent,
			WorkSpaceSettings,
			WorkSpaceSocial
		},
		computed: {
			currentTabComponent: function() {
				return 'work-space-' + this.currentTab.toLowerCase();
			}
		}
	}
</script>

<style lang="scss">
#workspace
{
	-webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;

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
		background: rgba(255,255,255,1);
		box-sizing: border-box;
		transition: 0.2s all;


		&:hover, &.active {
			cursor: pointer;
			background: rgba(100,100,200,1);
			color: rgba(255,255,255,1);
		}
	}

    .inner {
        max-height: 100%;
        overflow-y: scroll;
        overflow-x: none;
        position: relative;
        
        table {
            position: relative;
        }
    }

    *[data-state="drag"] {
        cursor: move;
        font-family: sans-serif;
        margin-bottom: 15px;
        transition: 0.2s all;
        position: relative;

        & * {
            pointer-events: none;
        }

        &:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 2;
        }

        &:hover {
            box-shadow: 0 0 50px rbga(0,0,0,0.9);
        }
    }
}
</style>