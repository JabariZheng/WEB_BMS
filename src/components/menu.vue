 <template>
	<div class="menuContent">
		<ul>
			<li class="menu-level-one" :class="{'active':activebar=='/home'}">
				<router-link :to="'/home'">
					<i class="icon-home"></i>
					<span>首页</span>
				</router-link>
			</li>
			<li class="meun-level-two">
				<a>
					<i class="icon-user"></i>
					<span>用户管理</span>
					<i class="icon-chevron-down can-click"></i>
				</a>
				<ul>
					<li :class="{'active':activebar=='/user-management'}">
						<router-link :to="'/user-management'">
							<span>用户信息管理</span>
						</router-link>
					</li>
						<li :class="{'active':activebar=='/user-restric-management'}">
						<router-link :to="'/user-restric-management'">
							<span>用户权限设置</span>
						</router-link>
					</li>
				</ul>
			</li>
            <li class="menu-level-one" :class="{'active':activebar=='/project-management'}">
				<router-link :to="'/project-management'">
					<i class="icon-folder"></i>
					<span>项目管理</span>
				</router-link>
			</li>
			<li class="menu-level-one" :class="{'active':activebar=='/device-management'}">
				<router-link :to="'/device-management'">
					<i class="icon-cpu"></i>
					<span>设备管理</span>
				</router-link>
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
				liActive:0
			}
		},
		methods: {
			...mapMutations([
				'changeActivebar',
				'changeRouterTitle'
			]),
		},
		computed:{
			...mapState({
				activebar:state=>state.activebar
			})
		},
		created(){//页面加载之前
			const uri = this.$route.path;
			this.changeActivebar(uri)
			const title = this.$route.meta.title;
			this.changeRouterTitle(title)	
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
						$(".can-click").addClass("icon-chevron-up");
					}else{
						$(".can-click").removeClass("icon-chevron-up");
					}
				});
			})
		},
		watch:{
			$route(){
				const uri = this.$route.path;
				this.changeActivebar(uri)
				const title = this.$route.meta.title;
				this.changeRouterTitle(title)	
			}
		},
		store
	}
</script>
