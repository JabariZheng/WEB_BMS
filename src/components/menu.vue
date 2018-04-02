 <template>
	<div class="menuContent">
		<ul>
			<li v-for="item in menuList" :class="[
				{'menu-level-one':item.menuLevel==1},
				{'menu-level-two':item.menuLevel==2},
				{'active':item.menuLevel==1 && activebar==item.routerName}
			]">
				<!-- 一级菜单 -->
				<router-link :to="'/'+item.routerName" v-if="item.menuLevel==1">
					<i :class="item.iconClass"></i>
					<span>{{ item.name }}</span>
				</router-link>

				<!-- 二级菜单 -->
				<a v-if="item.menuLevel==2">
					<i :class="item.iconClass"></i>
					<span>{{ item.name }}</span>
					<i class="icon-chevron-down can-click"></i>
				</a>
				<ul v-if="item.menuLevel==2">
					<li v-for="child in item.children" :class="{'active':activebar==child.routerName}">
						<router-link :to="'/'+child.routerName">
							<span>{{ child.name }}</span>
						</router-link>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import store from '@/vuex/menuStore'
	import {mapState,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				liActive:0,
				menuList:[]
			}
		},
		methods: {
			...mapMutations([
				'changeActivebar',
				'changeRouterTitle'
			]),
			getApiTest(){
				this.$model.userList.getMemberInfo(null,(res)=>{
					console.log(res);
					},(err)=>{
					console.log(err);
					})
			}
		},
		computed:{
			...mapState({
				activebar:state=>state.activebar
			})
		},
		created(){//页面加载之前
			const uri = this.$route.name;
			this.changeActivebar(uri)
			const title = this.$route.meta.title;
			this.changeRouterTitle(title)

			this.menuList = this.$menu;
      this.getApiTest();
		},
		mounted(){//页面加载完之后
			let li=document.getElementsByTagName('li');
			for(var i = 0 ; i < li.length ; i ++ ){
				li[i].onmouseover=function() {
					if(this.className!="active"){
						this.childNodes[0].className="hover"
					}
				}
				let childa=li[i].childNodes;
				childa[0].onmouseout=function() {
					if(this.className=="hover"){
						this.className="router-link-exact-active router-link-active"
					}
				}
			}
			//
			$(".meun-level-two>a").click(function(){
				$(this).next().stop(false,false).slideToggle(function(){
					if($(this).is(":visible")){
						$(".can-click").removeClass("icon-chevron-up");
					}else{
						$(".can-click").addClass("icon-chevron-up");
					}
				});
      });
		},
		watch:{
			$route(){
				const uri = this.$route.name;
				this.changeActivebar(uri)
				const title = this.$route.meta.title;
				this.changeRouterTitle(title)
			}
		},
		store
	}
</script>
