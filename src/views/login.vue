<template>
	<div class="login">
		<div class="left">
			<div class="contetn-center">
				<div class="logTitle">后台管理系统</div>
				<div class="phone-in">
					<input v-model="username" type="input" class="inputPrimary user-in" placeholder="管理员账号">
				</div>
				<div class="password-in">
					<input v-model="password" type="password" class="inputPrimary pass-in" placeholder="管理员密码">
				</div>
				<div class="log-btn">
					<button class="btnPrimary" @click="login">登陆</button>
				</div>
				<div class="forget" >
					<!-- <a>忘记密码？</a> -->
				</div>
			</div>
		</div>
	</div>
</template>
<style type="text/css">

</style>
<script type="text/javascript">
	export default{
		data(){
			return{
				username:'',
				password:'',
				valiCode:'',
				spinShow: false,
			}
		},
		methods: {
			login(){
				let data={
					userid:this.username,
					password:this.password,
				};
				this.$api.post("/User/Login",data,(res)=>{
					if(res.code==1){
						this.$router.push({name:"home"});					
					}
				})
			},
			contetnCenter(){
				let windowHeight=$(window).height();
				let centerHeight=$(".contetn-center").height();
				if(windowHeight>centerHeight && windowHeight>545){
					$(".contetn-center").css("margin-top",(windowHeight-centerHeight)/2-90)
				}else{
					$(".contetn-center").css("margin-top","0")
				}
			},
		},
		created(){//页面加载之前
			$(window).resize(()=>{
				this.contetnCenter();
			});
		},
		mounted(){//页面加载完之后
			this.contetnCenter();
		}
	}
</script>