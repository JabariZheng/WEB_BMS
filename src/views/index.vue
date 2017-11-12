<template>
	<div id="main">
		<HeadTop></HeadTop>
		<div id="content">
			<MenuLeft></MenuLeft>
			<div id="contentRigh" class="contentRigh"> 
				<RouterTitle></RouterTitle>
				<router-view></router-view>
				<Foot></Foot>
		  </div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import Router from 'vue-router'
	import App from '../App'
 	import HeadTop from '../components/header.vue'
 	import RouterTitle from '../components/title.vue'
 	import Foot from '../components/footer.vue'
	import MenuLeft from '../components/menu.vue'

	export default{
		components:{HeadTop,RouterTitle,Foot,MenuLeft},
		data(){
			return{

			}
		},
		methods: {
			menuToLeft(){
				let goLeft=$(".menuContent");
				let windowWidth=$(window).width();
	            if(goLeft.hasClass("goLeft")){
	            	
	            }else{
	            	if(windowWidth<1084){
					$(".menuContent").css("margin-left","-240px").addClass("goLeft");
				}else{
					$(".menuContent").css("margin-left","0").removeClass("goLeft");
				}
	            }
				
			},
			getApi(){
				//调取接口方式 get（post同样）-接口名称mock-参数传递：无-成功函数-失败函数（可写可不写）
				this.$api.get("mock",null,r=>{
					console.log("success");
					console.log(r)
				},r=>{
					console.log("fail");
					console.log(r)
				})
			},
			postApi(){
				//调取接口方式 get（post同样）-接口名称mock-参数传递：有-成功函数-失败函数（可写可不写）				
				let data={
					id:55
				};
				this.$api.get("proxy",data,r=>{
					console.log("success");
					console.log(r)
				},r=>{
					console.log("fail");
					console.log(r)
				})
			},
			footerSize(){
	            let windowHeight=$(window).height();
	            let documentHeight=$("#contentRigh>div").eq(1).height();
	            if(documentHeight<windowHeight){
	                // $("footer").css({"position":"fixed"});
	                $("#contentRigh").css("overflow-y","auto");
	            }else{
	                // $("footer").css({"position":"static"});
	                $("#contentRigh").css("overflow-y","scroll");
	            }

	        }
		},
		created(){//页面加载之前
			$(window).resize(()=>{
				this.menuToLeft();
				this.footerSize();
			})
		},
		mounted(){//页面加载完之后
			this.menuToLeft();
			this.footerSize();
		}
	}
</script>