<template>
  <header class="header">
    <div class="headBody">
    	<div class="head-left">
    		<span>LOGO</span>
    	</div>
    	<div class="head-right">
    		<div class="welcome">
    			<span class="icon-align-justify menu-slide" @click="menuReset()"></span>
    		</div>
    		<div class="logout"><button @click="logout" class="btn-c btnPrimary">退出登录</button></div>
    	</div>
    </div>
  </header>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{

			}
		},
		methods: {
			logout(){
				this.$api.post("/User/Logout",null,(res)=>{
					if(res.Code==1){
						sessionStorage.removeItem("loginList");
						this.$router.push({name:"/"});
					}else{
						bDialog(res.Message);
					}
				})
			},
			menuReset(){
				if($(".menuContent").hasClass("goLeft")){
					$(".menuContent").css("margin-left","0").removeClass("goLeft");
				}else{
					$(".menuContent").css("margin-left","-240px").addClass("goLeft");
				}
				let windowHeight=$(window).height();
	            let documentHeight=$("#contentRigh>div").eq(1).height();
	            if(documentHeight<windowHeight){
	                $("footer").css({"position":"fixed"});
	            }else{
	                $("footer").css({"position":"static"});
	            }
			},
		},
		created(){//页面加载之前
			
		},
		mounted(){//页面加载完之后

		}
	}
</script>