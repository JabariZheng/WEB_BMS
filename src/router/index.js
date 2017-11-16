import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Index from '@/views/index'
import Home from '@/views/home'
import ProjectManage from '@/views/project-management'
import UserManageIndex from '@/views/user-management-index'
import UserManage from '@/views/user-management'
import UserRestricManage from '@/views/user-restric-management'
import DeviceManage from '@/views/device-management'

import UserTest from '@/views/user-test'
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
        meta:{
          title:'ceshi'
        },
      	children:
      		[
	      		{
	      			path: '/home',
	      			name: 'home',
              meta:{
                  title: '首页',
              },
	      			component: Home
	      		},
            {
                path: '/project-management',
                name: 'project-management',
                meta:{
                    title: '项目管理',
                },
                component: ProjectManage
            },
            {
                path: '/user-management-index',
                name: 'user-management-index',
                meta:{
                    title: '用户管理',
                },
                component: UserManageIndex,
                children:[
                  {
                    path: '/user-management',
                    name: 'user-management',
                    meta:{
                        title: '用户信息管理',
                    },
                    component: UserManage
                  },
                  {
                    path: '/user-test',
                    name: 'user-management',
                    meta:{
                        title: '用户二级页面测试',
                    },
                    component: UserTest
                  },
                  {
                    path: '/user-restric-management',
                    name: 'user-restric-management',
                    meta:{
                        title: '用户权限管理',
                    },
                    component: UserRestricManage
                  },
                ]
            },
            {
                path: '/device-management',
                name: 'device-management',
                meta:{
                    title: '设备管理',
                },
                component: DeviceManage
            }
	      	]
    	}
  	]
});

router.beforeEach((to, from, next) => {
  console.log(to.name)
  next();
})
router.afterEach((to, from, next) => {
})

export default router
