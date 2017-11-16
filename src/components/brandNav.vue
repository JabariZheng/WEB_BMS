<template>
	<div class="brand-nav">
		<span v-for="(item,index) in brandList">
			<!-- <router-link :to="item.path">{{item.meta.title}}<span>{{index}}</span></router-link> -->
		</span>
	</div>
</template>
<style>
	.brand-nav{
		padding-left: 20px;
		border-top: 1px solid #edeef0;
		background-color: #fff;
	}
</style>
<script type="text/javascript">
	export default{
		data(){
			return{
				brandList:[]
			}
		},
		methods: {

		},
		created(){
			this.brandList = this.$route.matched;
			// console.log(this.brandList)
			console.log(this.$route.router)
		}
	}
</script>