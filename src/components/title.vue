<template>
	<div class="page-title">
	    <div>{{routerTitle}}</div>
	</div>
</template>
<script type="text/javascript">
	import store from '@/vuex/menuStore'
	import {mapState} from 'vuex'
	export default{
		data(){
			return{

			}
		},
		methods: {

		},
		computed:{
			...mapState({
				routerTitle:state=>state.routerTitle
			})
		},
		created(){
		},
		store
	}
</script>