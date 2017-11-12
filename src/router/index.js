import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Index from '@/views/index'
import Home from '@/views/home'

Vue.use(Router)

const router = new Router({
  	routes: [
    	{
      	path: '/',
      	name: 'Login',
      	component: Login
    	},
    	{
      	path: '/index',
      	name: 'Index',
      	component: Index,
      	children:
      		[
	      		{
	      			path: '/home',
	      			name: 'Home',
	      			component: Home
	      		}
	      	]
    	}
  	]
});
export default router 
