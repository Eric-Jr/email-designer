<template>
	<div 
		v-on:mousemove="resizeDrag"
		v-on:mouseup="resizeEnd"
		id="app">
		<!-- <router-view/> -->
		<!-- BEGIN : DISPLAY AREA -->
		<display-area></display-area>
		<!-- END : DISPLAY AREA -->
		<!-- BEGIN : WORK SPACE -->
		<work-space></work-space>
		<!-- END : WORK SPACE -->
	</div>
</template>

<script>
import DisplayArea from './components/display/display-area'
import WorkSpace from './components/workspace/work-space'

export default {
	name: 'App',
	components : {
		WorkSpace,
		DisplayArea,
	},
	data () {
		return {
			emailwidth : 600,
		}
	},
	methods: {
		resizeDrag : function(evt)
		{
			this.$root.$data.pageX = evt.pageX;
			
			if (this.$root.$data.resizeEl)
			{
				const maxResize = window.innerWidth - 600;

				if (this.$root.$data.mouseDown &&
					this.$root.$data.resizeEl.offsetWidth <= maxResize) 
				{
					this.$root.$data.resizeEl.style.width = evt.pageX + 'px';
					this.$root.$data.resizeEl.style.flex = '0 0 auto';
					this.setMinResize(this.$root.$data.resizeEl);
					this.setMaxResize(this.$root.$data.resizeEl);
					this.setMobileView(this.$root.$data.resizeEl);
				}
			}
		},
		resizeEnd : function(evt)
		{
			this.$root.$data.mouseDown = false;
		},
		setMinResize : function(el)
		{
			const minResize = 350;

			if (el.offsetWidth < minResize)
			{
				el.style.width = minResize + 'px';
			}
		},
		setMaxResize : function(el)
		{
			const maxResize = window.innerWidth - 600;

			if (el.offsetWidth > maxResize)
			{
				el.style.width = maxResize + 'px';
			}
		},
		setMobileView : function(el)
		{
			if (el.offsetWidth < 650) 
			{
				el.classList.add('mobile');
			} 
			else if (el.offsetWidth >= 650)
			{
				el.classList.remove('mobile');
			}
		},
	}
}
</script>

<style lang="scss">
body
{
	background: rgba(230,230,230,1);
	height: 100vh;
	display: flex;
	flex-flow: column;
	margin: 0;

	& > * {
		flex: 1 1 auto;
	}
}

#app
{
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	display: flex;
	flex-flow: row;
	justify-content: space-between;
	overflow: hidden;
	box-sizing: border-box;

	& > * {
		flex: 1 1 50%;
	}

	.initial-display
	{
		&:before {
			content: 'Drag Blocks Here To Start';
			color: rgba(120, 120, 120, 1);
			font-size: 2em;
			font-family: sans-serif;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
	}

	.resize {
		content: '';
		height: 100%;
		width: 15px;
		position: absolute;
		top: 0;
		right: 0;
		transform: translateX(60%);
		z-index: 3;

		&:hover {
			cursor: col-resize;
		}
	}
}
</style>