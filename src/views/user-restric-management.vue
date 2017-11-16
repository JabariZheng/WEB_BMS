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
						<th>操作</th>
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
						<td>
							<span v-if="item.member_level!=10 && item.is_deleted==false" class="table-icon-function-btn icon-setting" title="设置" @click="dialog(
								item.is_enable,
								item.is_active,
								item.source_restricted,
								item.device_restricted,
								item.load_restricted,
								item.member_level,
								item.expired_time,
								item.is_deleted,
								item.id
								)"></span>
							<span class="table-icon-function-btn icon-trash-2" v-if="item.member_level!=10 && item.is_deleted==false" title="删除" @click="deleteMember(item.id)"></span>
							<span class="table-icon-function-btn icon-rotate-ccw" v-if="item.member_level!=10 && item.is_deleted==true" title="恢复" @click="restoreMember(item.id)"></span>
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
		<div id="modal-add" class="modal fade in" style="display: none;" tabindex="-1" role="dialog">
			<div class="modal-container">
			    <div class="modal-header">
			        <a class="close" data-dismiss="modal">×</a>
			        <h3>用户设置</h3>
			    </div>
			    <div class="modal-body">
			    	<div class="body-info">
			    		<div class="setting-list">
			    			<div class="list-name">账号状态</div>
			    			<div class="list-detail">
			    				<div class="statue">
			    					<el-radio v-model="accountStatue" label="false">禁用</el-radio> 
			    					<el-radio v-model="accountStatue" label="true">启用</el-radio>
			    				</div>
			    			</div>
			    		</div>
						<div class="setting-list">
			    			<div class="list-name">账号等级</div>
			    			<div class="list-detail">
			    				<div class="statue">
			    					<el-radio v-model="accountLevel" label="1">试用用户</el-radio> 
			    					<el-radio v-model="accountLevel" label="2">普通用户</el-radio>
			    					<el-radio v-model="accountLevel" label="3">高级用户</el-radio>
			    				</div>
			    			</div>
			    		</div>
			    		<div class="setting-list">
			    			<div class="list-name">激活状态</div>
			    			<div class="list-detail">
			    				<div class="statue">
			    					<el-radio v-model="activeStatue" label="true">已激活</el-radio> 
			    					<el-radio v-model="activeStatue" label="false">未激活</el-radio>
			    				</div>
			    			</div>
			    		</div>
						<div class="setting-list">
			    			<div class="list-name">账号到期时间</div>
			    			<div class="list-detail">
			    				<div class="statue">
			    					<el-date-picker
									v-model="expreTime"
									type="date"
									placeholder="选择日期"
									value-format="yyyy-MM-dd"
									format="yyyy 年 MM 月 dd 日"
									:picker-options="expredOptions">>
									</el-date-picker>
			    				</div>
			    			</div>
			    		</div>
			    		<div class="setting-list">
			    			<div class="list-name">可用数据源</div>
			    			<div class="list-detail">
			    				<div class="statue">
			    					<el-checkbox :indeterminate="isDataResource" v-model="dataSourceAll" @change="dataSourceAllChange">全选</el-checkbox>
									<el-checkbox-group v-model="checkDataSource" @change="dataSourceChange"> 
										<el-checkbox v-for="datasource in dataSource" :label="datasource" :key="datasource">{{datasource}}</el-checkbox> 
									</el-checkbox-group>
			    				</div>
			    			</div>
			    		</div>
			    		<div class="setting-list">
			    			<div class="list-name">可用负荷类型</div>
			    			<div class="list-detail">
			    				<div class="statue">
			    					<el-checkbox :indeterminate="isLoadFule" v-model="loadFuleAll" @change="loadFuleAllChange">全选</el-checkbox>
									<el-checkbox-group v-model="checkLoadFule" @change="loadFuleChange"> 
										<el-checkbox v-for="data in dataFule" :label="data" :key="data">{{data}}</el-checkbox> 
									</el-checkbox-group>
			    				</div>
			    			</div>
			    		</div>
			    		<div class="setting-list">
			    			<div class="list-name">可用设备类型</div>
			    			<div class="list-detail">
			    				<div class="statue">
			    					<el-checkbox :indeterminate="isDeviceType" v-model="deviceAll" @change="deviceAllChange">全选</el-checkbox>
									<el-checkbox-group v-model="checkDevice" @change="deviceChange"> 
										<el-checkbox v-for="device in deviceType" :label="device" :key="device">{{device}}</el-checkbox> 
									</el-checkbox-group>
			    				</div>
			    			</div>
			    		</div>
			    	</div>
			    </div>
			    <div class="modal-footer">
			    	<el-button data-dismiss="modal">取消</el-button> 
			    	<el-button type="primary" @click="SaveMemberInfo">确定</el-button>
			    </div>
			</div>
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
			dataSourceAllChange(event) {
				this.checkDataSource = event.target.checked ? this.dataSource : []; 
				this.isDataResource = false;
			},
			dataSourceChange(value) {
		        let checkedCount = value.length;
		        this.dataSourceAll = checkedCount === this.dataSource.length;
		        this.isDataResource = checkedCount > 0 && checkedCount < this.dataSource.length;
			},
			deviceAllChange(event) {
				this.checkDevice = event.target.checked ? this.deviceType : []; 
				this.isDeviceType = false;
			},
			deviceChange(value) {
		        let checkedCount = value.length;
		        this.deviceAll = checkedCount === this.deviceType.length;
		        this.isDeviceType = checkedCount > 0 && checkedCount < this.deviceType.length;
			},
			loadFuleAllChange(event) {
				this.checkLoadFule = event.target.checked ? this.dataSource : []; 
				this.isLoadFule = false;
			},
			loadFuleChange(value) {
		        let checkedCount = value.length;
		        this.loadFuleAll = checkedCount === this.dataSource.length;
		        this.isLoadFule = checkedCount > 0 && checkedCount < this.dataSource.length;
			},
			dialog(is_enable,is_active,source_restricted,device_restricted,load_restricted,member_level,expired_time,is_deleted,id){
				$("#modal-add").modal("show");
				(is_enable)?this.accountStatue="true":this.accountStatue="false";
				(is_active)?this.activeStatue="true":this.activeStatue="false";
				this.accountLevel=member_level.toString();
				this.expreTime=expired_time;
				this.mid=id;
				this.accountDelete=is_deleted;
				let sourceList=source_restricted;
				let deviceList=device_restricted;
				let loadList=load_restricted;
				let mapSourceList=_.map(sourceList,function(n){
					if(n.Enable==1){
						return n.Name
					}
				})
				mapSourceList=_.remove(mapSourceList,function(n){
					return n!=undefined
				})
				if(mapSourceList.length==3){
					this.dataSourceAll=true;
					this.isDataResource=false;					
				}else if(mapSourceList.length==0){
					this.isDataResource=false;					
					this.dataSourceAll=false;
				}else{
					this.dataSourceAll=false;
					this.isDataResource=true;					
				}
				this.checkDataSource=mapSourceList; 
				// device
				let mapDeviceList=_.map(deviceList,function(n){
					if(n.Enable==1){
						return n.Name
					}
				})
				mapDeviceList=_.remove(mapDeviceList,function(n){
					return n!=undefined
				})
				if(mapDeviceList.length==13){
					this.deviceAll=true;
					this.isDeviceType=false;					
				}else if(mapDeviceList.length==0){
					this.isDeviceType=false;					
					this.deviceAll=false;
				}else{
					this.deviceAll=false;
					this.isDeviceType=true;					
				}
				this.checkDevice=mapDeviceList; 
				// fule
				let mapFuleList=_.map(loadList,function(n){
					if(n.Enable==1){
						return n.Name
					}
				})
				mapFuleList=_.remove(mapFuleList,function(n){
					return n!=undefined
				})
				console.log(mapFuleList)
				if(mapFuleList.length==3){
					this.loadFuleAll=true;
					this.isLoadFule=false;					
				}else if(mapFuleList.length==0){
					this.isLoadFule=false;					
					this.loadFuleAll=false;
				}else{
					this.loadFuleAll=false;
					this.isLoadFule=true;					
				}
				this.checkLoadFule=mapFuleList; 
			},
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
			SaveMemberInfo(){
				let data={
					id:parseInt(this.mid),
					member_level:parseInt(this.accountLevel),
					is_active:this.activeStatue,
					is_enable:this.accountStatue,
					expired_time:this.expreTime,
					source_restricted:[],
					device_restricted:[],
					load_restricted:[],
				}
				$.each(this.checkDevice,(i,ele)=>{
					let p={};
					p.Name=ele;
					p.Enable=1;
					data.device_restricted.push(p);
				})
				$.each(this.checkDataSource,(i,ele)=>{
					let p={};
					p.Name=ele;
					p.Enable=1;
					data.source_restricted.push(p);
				})
				$.each(this.checkLoadFule,(i,ele)=>{
					let p={};
					p.Name=ele;
					p.Enable=1;
					data.load_restricted.push(p);
				})
				console.log(data)
				this.$api.post("/Admin/SaveMemberInfo",data,(res)=>{
					console.log(res);
					this.$message({
						message: '设置成功!',
						type: 'success',
						duration:1500,
						onClose:()=>{
							$("#modal-add").modal("hide");
							this.getAllUser();
						}
					});
				})
			},
			restoreMember(id){
				let data={
					id:id,
					is_deleted:0
				};
				this.$api.post("/Admin/DeleteOrRestoreMember",data,(res)=>{
					this.$message({
						message: '账号恢复成功！',
						type: 'success',
						duration:1500,
						onClose:()=>{
							$("#modal-add").modal("hide");
							this.getAllUser();
						}
					});
				})
			},
			deleteMember(id){
				let data={
					id:id,					
					is_deleted:1
				};
				this.$api.post("/Admin/DeleteOrRestoreMember",data,(res)=>{
					this.$message({
						message: '账号删除成功！',
						type: 'success',
						duration:1500,
						onClose:()=>{
							$("#modal-add").modal("hide");
							this.getAllUser();
						}
					});
				})
			},
		},
		created(){
		},
		mounted(){//页面加载完之后
			this.getAllUser();
		}
	}
</script>