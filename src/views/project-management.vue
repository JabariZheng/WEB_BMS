<template>
	<div class="project-management">
		<div class="search-input-btn-area">
			<el-input v-model="searchValue" placeholder="请输入项目名称" style="width: 300px" @keyup.enter.native="getAllProject"></el-input>
			<el-button type="primary" style="width: 100px" @click="getAllProject">搜索</el-button>
		</div>
		<div class="show-table">
			<table class="table table-hover information-table">
				<thead>
					<tr>
						<th>项目名称</th>
						<th>项目描述</th>
						<th>项目位置</th>
						<th>项目所有者</th>
						<th>创建时间</th>
						<th>状态</th>
						<th>可见范围</th>
						<th>推荐等级</th>
						<th>项目报告</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in tableData">
						<td>{{item.name}}</td>
						<td>{{item.description}}</td>
						<td>{{item.address}}</td>
						<td>{{item.user_name}}</td>
						<td>{{item.create_time}}</td>
						<td>
							<span v-if="item.status_id==1">规划中</span>
							<span v-if="item.status_id==2">排队中</span>
							<span v-if="item.status_id==3">计算中</span>
							<span v-if="item.status_id==4">已完成</span>
							<span v-if="item.status_id==5">已取消</span>
							<span v-if="item.status_id==6">已删除</span>
						</td>
						<td>
							<span v-if="item.is_public==false">私有</span>
							<span v-if="item.is_public==true">公开</span>
						</td>
						<td>{{item.star_rank}}</td>
						<td>
							<span class="icon-download edit-button" title="下载" @click=""></span>
						</td>
						<td>
							<span class="icon-setting edit-button" title="设置" @click="dialog(
							item.id,
							item.is_public,
							item.star_rank,
							item.keywords)"></span>
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
			      :page-sizes="[15, 50, 100, 150]"
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
			        <h3>项目设置</h3>
			    </div>
			    <div class="modal-body">
			    	<div class="body-info">
			    		<div class="setting-list">
			    			<div class="list-name">项目可见范围</div>
			    			<div class="list-detail">
			    				<el-radio v-model="projectPublic" label="false">私有</el-radio>
			    				<el-radio v-model="projectPublic" label="true">公开</el-radio> 
			    			</div>
			    		</div>
			    		<div class="setting-list">
			    			<div class="list-name">项目推荐等级</div>
			    			<div class="list-detail">
			    				<el-slider
									v-model="projectLevel"
							    	:step="1"
							    	:max="10"
							    	show-input
							     	show-stops>
							    </el-slider>
			    			</div>
			    		</div>
						<div class="setting-list">
			    			<div class="list-name">项目推荐关键字</div>
			    			<div class="list-detail">
			    				<el-input v-model="projectRecommend" placeholder="请输入内容"></el-input>
			    			</div>
			    		</div>
			    	</div>
			    </div>
			    <div class="modal-footer">
			    	<el-button data-dismiss="modal">取消</el-button> 
			    	<el-button type="primary" @click="saveProject">确定</el-button>
			    </div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				searchValue:'',
				Alltotal:1,
				current:1,
				tableData:[],
				spinShow:"false",
				pagesize:15,
				projectid:0,
				projectPublic:'0',
				projectLevel:1,
				checkProjectId:"",
				projectRecommend:"",
			}
		},
		methods: {
			changeSize(val){
				this.pagesize=val;
				this.getAllProject();
			},
			changeCurrent(val){
				this.current=val;
				this.getAllProject();
			},
			dialog(id,is_public,star_rank,keywords){
				$("#modal-add").modal("show");
				this.projectid=id;
				this.projectPublic=is_public.toString();
				this.p0rojectLevel=parseInt(star_rank);
				this.projectRecommend=keywords;
			},
			getAllProject(){
				let data={
					keywords:this.searchValue,
					page:this.current,
					pagesize:this.pagesize
				}
				this.spinShow=true;
				this.$api.get("/Admin/GetAllProjects",data,(res)=>{
					this.spinShow=false;
					console.log(res)
					this.tableData=res.Data;
					this.Alltotal=res.PageCount;
				})
			},
			saveProject(){
				let data={
					id:this.projectid,
					is_public:this.projectPublic,
					star_rank:this.projectLevel,
					keywords:this.projectRecommend
				}
				this.$api.post("/Admin/SaveProjects",data,(res)=>{
					this.$message({
						message: '设置成功!',
						type: 'success',
						duration:1500,
						onClose:()=>{
							$("#modal-add").modal("hide");
							this.getAllProject();
						}
					});
				})
			},
		},
		created(){
			
		},
		mounted(){
			this.getAllProject();
		}
	}
</script>