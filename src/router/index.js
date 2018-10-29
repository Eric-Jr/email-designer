import Vue from 'vue'
import Router from 'vue-router'
import Display from '@/components/display/display-area'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'display',
			component: Display
		}
	]
})
