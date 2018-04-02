// name 菜单名称
// menuLevel 几级菜单
// routerName 路由名称
// iconClass icon的class值

let  menuList=[
	{
		name : '首页',
		menuLevel : 1,
		routerName : 'home',
		iconClass : 'icon-home'
	},
	{
		name : '用户管理',
		menuLevel : 2,
		iconClass : 'icon-user',
		children:[
			{
				name : '用户信息管理',
				routerName : 'user-management',
			},
			{
				name : '用户权限设置',
				routerName : 'user-restric-management',
			},
		]
	},
	{
		name : '项目管理',
		menuLevel : 1,
		routerName : 'project-management',
		iconClass : 'icon-folder'
	},
	{
		name : '设备管理',
		menuLevel : 1,
		routerName : 'device-management',
		iconClass : 'icon-cpu'
	}
];

export default menuList
