<template>
	<div class="user-management">
		<div class="search-input-btn-area">
			<el-input v-model="searchValue" placeholder="请输入用户名" style="width: 300px" @keyup.enter.native="getAllUser"></el-input>
			<el-button type="primary" style="width: 100px" @click="getAllUser">搜索</el-button>
		</div>
		<div class="table-for-information">
			<table class="table table-hover information-table">
				<thead>
					<tr>
						<th>id</th>
						<th>用户名</th>
						<th>手机号</th>
						<th>邮箱</th>
						<th>用户等级</th>
						<th>注册时间</th>
						<th>到期时间</th>
						<th>账号状态</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in tableData">
						<td>{{item.id}}</td>
						<td>{{item.user_name}}</td>
						<td>{{item.phone}}</td>
						<td>{{item.email}}</td>
						<td>
							<span v-if="item.member_level==1">试用用户</span>
							<span v-if="item.member_level==2">普通用户</span>
							<span v-if="item.member_level==3">高级用户</span>
							<span v-if="item.member_level==10">管理员</span>
						</td>
						<td>{{item.registered_time}}</td>
						<td>{{item.expired_time}}</td>
						<td>
							<span class="isEnable" v-if="item.is_enable==false">已禁用</span>							
							<span class="isDelete" v-if="item.is_deleted==true">已删除</span>							
							<span class="isActive" v-if="item.is_active==true && item.is_deleted==false && item.is_enable==true">已激活</span>	
							<span class="idNoActive" v-if="item.is_active==false && item.is_deleted==false && item.is_enable==true">未激活</span>		
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="page-page">
			<div class="page-left"></div>
			<div class="page-right">
				<el-pagination
			      @size-change="changeSize"
			      @current-change="changeCurrent"
			      :current-page="1"
			      :page-sizes="[15, 50, 100, 100]"
			      :page-size="pagesize"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="Alltotal">
			    </el-pagination>
			</div>
		</div>
		<div> 
			<el-button @click="testRouter">test</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				searchValue:"",
				Alltotal:0,
				current:1,
				// 
				accountStatue:"true",
				activeStatue:"true",
				checkDataSource:[],
				checkDevice:[],
				checkLoadFule:[],
				// 
				dataSourceAll:true,
				dataSource:["NASA","CSWD","SE-DATA"],
				isDataResource:true, 
				deviceAll:true,
				isDeviceType:true,
				deviceType:["电网","光伏","风机","储能电池","光热","储热","电锅炉","燃气锅炉","溴冷机","直燃机","电制冷","CHP","逆变器"],
				isLoadFule:true,
				loadFuleAll:true,
				dataFule:["电负荷","热负荷","冷负荷"],
				tableData:[],
				pagesize:15,
				//count statue
				accountText:"",
				accountStatueText:"",				
				resourcceArr:[],
				deviceArr:[],
				mid:0,
				expreTime:"",
				accountLevel:'1',
				accountDelete:'',
				expredOptions: {
					disabledDate(time) {
						return time.getTime() < Date.now();
					}
				},
			}
		},
		methods: {
			changeCurrent(val){
				this.current=val;
				this.getAllUser();
			},
			changeSize(val){
				this.pagesize=val;
				this.getAllUser();
			},
			getAllUser(){
				let data={
					userName:this.searchValue,
					page:this.current,
					pagesize:this.pagesize
				}
				this.$api.post("/User/GetMemberInfo",data,(res)=>{
					console.log(res)
					this.tableData=res.data;
					this.Alltotal=res.pageCount;
				})
			},
			testRouter(){
				this.$router.push({path:'/user-test'})
			},
		},
		created(){
			
		},
		mounted(){//页面加载完之后
			this.getAllUser();
		}
	}
</script>