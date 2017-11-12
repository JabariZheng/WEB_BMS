 <template>
	<div class="menuContent">
		<ul>
			<li :class="{'active':activebar=='/home'}">
				<router-link :to="'/home'">
					<i class="icon-home"></i>
					<span>首页</span>
				</router-link>
			</li>
			<li>
				<i class="icon-user"></i>
				<span>用户管理</span>
				<ul class="second-menu">
					<li :class="{'active':activebar=='/'}">
					<router-link :to="'/'">
						<span>企业会员信息</span>
					</router-link>
				</li>
					<li :class="{'active':activebar=='/'}">
					<router-link :to="'/'">
						<span>个人会员信息</span>
					</router-link>
				</li>
					<li :class="{'active':activebar=='/'}">
					<router-link :to="'/'">
						<span>员工信息</span>
					</router-link>
				</li>
					<li :class="{'active':activebar=='/'}">
					<router-link :to="'/'">
						<span>级别设置</span>
					</router-link>
				</li>
				</ul>
			</li>
			<li>
				<i class="icon-user"></i>
				<span>竞价管理</span>
				<ul class="second-menu">
					<li :class="{'active':activebar=='/'}">
					<router-link :to="'/'">
						<span>图纸输入</span>
					</router-link>
				</li>
					<li :class="{'active':activebar=='/'}">
					<router-link :to="'/'">
						<span>竞价中图纸</span>
					</router-link>
				</li>
					<li :class="{'active':activebar=='/'}">
					<router-link :to="'/'">
						<span>全部订单</span>
					</router-link>
				</li>
					<li :class="{'active':activebar=='/'}">
					<router-link :to="'/'">
						<span>已下架图纸</span>
					</router-link>
				</li>
				</ul>
			</li>
			<li>
				<i class="icon-user"></i>
				<span>信息数据统计</span>
				<ul class="second-menu">
					<li :class="{'active':activebar=='/'}">
					<router-link :to="'/'">
						<span>交期异常反馈</span>
					</router-link>
				</li>
					<li :class="{'active':activebar=='/'}">
					<router-link :to="'/'">
						<span>质量异常反馈</span>
					</router-link>
				</li>
					<li :class="{'active':activebar=='/'}">
					<router-link :to="'/'">
						<span>KPI指标</span>
					</router-link>
				</li>
				</ul>
			</li>
			<li>
				<i class="icon-user"></i>
				<span>对账支付管理</span>
				<ul class="second-menu">
					<li :class="{'active':activebar=='/'}">
					<router-link :to="'/'">
						<span>对账单</span>
					</router-link>
				</li>
				</ul>
			</li>
			<li>
				<i class="icon-user"></i>
				<span>消息管理</span>
				<ul class="second-menu">
					<li :class="{'active':activebar=='/'}">
					<router-link :to="'/commonProblem'">
						<span>平台消息推送</span>
					</router-link>
				</li>
					<li :class="{'active':activebar=='/'}">
					<router-link :to="'/commonProblem'">
						<span>用户留言</span>
					</router-link>
				</li>
				</ul>
			</li>
			<li>
				<i class="icon-user"></i>
				<span>内容管理</span>
				<ul class="second-menu">
					<li :class="{'active':activebar=='/'}">
					<router-link :to="'/commonProblem'">
						<span>公司新闻</span>
					</router-link>
				</li>
					<li :class="{'active':activebar=='/'}">
					<router-link :to="'/commonProblem'">
						<span>标准化资料</span>
					</router-link>
				</li>
					<li :class="{'active':activebar=='/'}">
					<router-link :to="'/commonProblem'">
							<span>周边配套厂商</span>
						</router-link>
					</li>
				</ul>
			</li>
<!-- 			<li :class="{'active':activebar=='/commonProblem'}">
				<router-link :to="'/commonProblem'">
					<i class="icon-alert-circle"></i>
					<span>常见问题管理</span>
				</router-link>
			</li> -->
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				liActive:0
			}
		},
		methods: {
			
		},
		created(){//页面加载之前

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

		},
	}
</script>