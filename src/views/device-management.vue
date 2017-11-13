<template>
	<div class="device-management">
		<div class="search-top">
			<el-input v-model="searchValue" placeholder="请输入设备品牌" size="small" style="width: 300px" @keyup.enter.native="getAllDevice"></el-input>
			<el-button type="primary" style="width: 100px" size="small" @click="getAllDevice">搜索</el-button>
		</div>
		<div class="show-table">
			<table class="table table-hover information-table">
				<thead>
					<tr>
						<th>设备ID</th>
						<th>设备类型</th>
						<th>设备品牌</th>
						<th>设备型号</th>
						<th>设备状态</th>
						<th>设备创建人</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in tableData">
						<td>{{item.id}}</td>
						<td>{{item.device_type_name}}</td>
						<td>{{item.brand}}</td>
						<td>{{item.model}}</td>
						<td>
							<span v-if="item.is_audit==false">未审核</span>
							<span v-if="item.is_audit==true">已审核</span>
						</td>
						<td>{{item.user_name}}</td>
						<td>
							<span v-if="item.is_audit==false" class="icon-setting edit-button" title="设置" @click="dialog(
							item.id,
							item.device_type_id,
							item.device_type_name,
							item.brand,
							item.model
							)"></span>
							<span v-if="item.is_audit==false" class="icon-feather edit-button" title="审核" @click="examineDevice(item.id)"></span>
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
			        <h3>设备设置</h3>
			    </div>
			    <div class="modal-body">
			    	<div class="body-info">
			    		<div class="device-part-one">
			    			<!-- <div class="part-title">设备信息</div> -->
			    			<div class="device-info-title">
			    				<div>设备类型：<span>{{modalType}}</span></div>
			    				<div>设备品牌：<span>{{modalBrand}}</span></div>
			    				<div>设备型号：<span>{{modalModel}}</span></div>
			    			</div>
			    			<div class="part-list">
				    			<div class="device-list">
				    				<div class="list-left"></div>
				    				<div class="list-right"></div>
				    			</div>
				    			<div class="device-list">
				    				<div class="list-left"></div>
				    				<div class="list-right"></div>
				    			</div>
			    			</div>
			    		</div>
			    		<div class="device-part-two">
			    			<!-- <div class="part-title">设备参数</div> -->
			    			<div class="part-list">
				    			<div class="device-setting-list">
									<ul class="show-setting-info"></ul>
				    			</div>
			    			</div>
			    		</div>
			    	</div>
			    </div>
			    <div class="modal-footer">
			    	<el-button data-dismiss="modal">取消</el-button> 
			    	<el-button type="primary" @click="saveDeviceSetting">确定</el-button>
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
				spinShow:false,
				pagesize:15,
				tableData:[],
				modalType:'',
				modalBrand:'',
				modalModel:'',
				checkDeviceId:0,
				deviceAllInfoData:{},
				//pv 
    			appendName_PV:["投资成本","容量密度","效<i class='zhan'></i>率","维护成本","寿<i class='zhan'></i>命"],
    			appendUnit_PV:["（元/kW）","（kW/m²）","（%）","（元/kWh）","（年）"],
    			getDataName_PV:["invest_cost","energy_density","conversion_efficiency","maintain_cost","lifespan"],
    			setDataName_PV:["InvestCost","EnergyDensity","ConversionEfficiency","MaintainCost","Lifespan"],
    			//风机 
    			appendName_FJ:["投资成本","运维成本","寿<i class='zhan'></i>命","额定容量","额定风速","切入风速","切出风速"],
    			appendUnit_FJ:["（元/kW）","（元/kWh）","（年）","（kW）","（m/s）","（m/s）","（m/s）"],
    			getDataName_FJ:["invest_cost","maintain_cost","lifespan","rated_capacity","rated_wind_speed","cutin_wind_speed","cutout_wind_speed"],
    			setDataName_FJ:["InvestCost","MaintainCost","Lifespan","RatedCapacity","RatedWindSpeed","CutinWindSpeed","CutoutWindSpeed"],
    			//蓄电 
    			appendName_XD:["固定成本","变动成本","维护成本","寿<i class='zhan'></i>命","充电效率 ","放电效率","自放电率","最小SOC","最大充电率","最大放电率","循环充放电次数","单体容量"],
    			appendUnit_XD:["（元）","（元/kW）","（元/kWh）","（年）","（%）","（%）","（%）","（--）","（%）","（%）","（次）","（kWh）"],
    			getDataName_XD:["invest_cost","change_cost","maintain_cost","lifespan","charge_efficiency","discharge_efficiency","self_discharge_efficiency","min_soc","max_charge_rate","max_discharge_rate","charge_discharge_cycle","unit_capacity"],
    			setDataName_XD:["InvestCost","ChangeCost","MaintainCost","Lifespan","ChargeEfficiency","DischargeEfficiency","SelfDischargeEfficiency","MinSoc","MaxChargeRate","MaxDischargeRate","ChargeDischargeCycle","UnitCapacity"],
    			//逆变器 
    			appendName_NBQ:["逆变器成本","其他成本 "],
    			appendUnit_NBQ:["（元/kW）","（元）"],
    			getDataName_NBQ:["unit_price","other_cost"],
    			setDataName_NBQ:["UnitPrice","OtherCost"],
    			//光热 
    			appendName_GR:["投资成本","维护成本","容量密度","寿<i class='zhan'></i>命","效<i class='zhan'></i>率"],
    			appendUnit_GR:["（元/kW）","（元/kWh）","（kW/m2）","（年）","（%）"],
    			getDataName_GR:["invest_cost","maintain_cost","energy_density","lifespan","conversion_efficiency"],    
    			setDataName_GR:["InvestCost","MaintainCost","EnergyDensity","Lifespan","ConversionEfficiency"],
    			//电锅炉 
    			appendName_DGL:["固定成本","变动成本","维护成本","锅炉效率","寿<i class='zhan'></i>命"],
    			appendUnit_DGL:["（元）","（元/kW）","（元/kWh）","（%）","（年）"],
    			getDataName_DGL:["fixed_cost","change_cost","maintain_cost","conversion_efficiency","lifespan"],
    			setDataName_DGL:["FixedCost","ChangeCost","MaintainCost","ConversionEfficiency","Lifespan"], 
    			//燃气锅炉 
    			appendName_RQGL:["固定成本","变动成本","维护成本","锅炉效率","寿<i class='zhan'></i>命"],
    			appendUnit_RQGL:["（元）","（元/kW）","（元/kWh）","（%）","（年）"],
    			getDataName_RQGL:["fixed_cost","change_cost","maintain_cost","conversion_efficiency","lifespan"],
    			setDataName_RQGL:["FixedCost","ChangeCost","MaintainCost","ConversionEfficiency","Lifespan"], 
    			//溴冷机 
    			appendName_XLJ:["固定成本","变动成本","维护成本","制冷COP","寿<i class='zhan'></i>命"],
    			appendUnit_XLJ:["（元）","（元/kW）","（元/kWh）","（-）","（年）"],
    			getDataName_XLJ:["fixed_cost","change_cost","maintain_cost","cop","lifespan"],
    			setDataName_XLJ:["FixedCost","ChangeCost","MaintainCost","COP","Lifespan"], 
    			//直燃机 
    			appendName_ZRJ:["固定成本","变动成本","维护成本","制冷COP","寿<i class='zhan'></i>命"],
    			appendUnit_ZRJ:["（元）","（元/kW）","（元/kWh）","（-）","（年）"],
    			getDataName_ZRJ:["fixed_cost","change_cost","maintain_cost","cop","lifespan"],
    			setDataName_ZRJ:["FixedCost","ChangeCost","MaintainCost","COP","Lifespan"], 
    			//电制冷 
    			appendName_DZL:["固定成本","变动成本","维护成本","制冷COP","寿<i class='zhan'></i>命"],
    			appendUnit_DZL:["（元）","（元/kW）","（元/kWh）","（-）","（年）"],
    			getDataName_DZL:["fixed_cost","change_cost","maintain_cost","cop","lifespan"],
    			setDataName_DZL:["FixedCost","ChangeCost","MaintainCost","COP","Lifespan"], 
    			//CHP 
    			appendName_CHP:["投资成本","运维成本","寿<i class='zhan'></i>命","额定容量","发电效率","热电比","最低负荷率"],
    			appendUnit_CHP:["（元/kW）","（元/kWh）","（年）","（kW）","（%）","（-）","（%）"],
    			getDataName_CHP:["invest_cost","maintain_cost","lifespan","rated_capacity","generate_efficiency","heat_electric_ratio","load_ratio_min"],
    			setDataName_CHP:["InvestCost","MaintainCost","Lifespan","RatedCapacity","GenerateEfficiency","HeatElectricRatio","LoadRatioMin"],
    			//储热 
    			appendName_CR:["固定成本","变动成本","维护成本","寿<i class='zhan'></i>命","蓄热效率","放热效率","自耗效率","最大蓄热率","最大放热率"],
    			appendUnit_CR:["（元）","（元/kW）","（元/kWh）","（年）","（%）","（%）","（%）","（%）","（%）"],
    			getDataName_CR:["fixed_cost","change_cost","maintain_cost","lifespan","heat_storage_efficiency","heat_release_efficiency","self_consume_efficiency","heat_storage_max","heat_release_max"],
    			setDataName_CR:["FixedCost","ChangeCost","MaintainCost","Lifespan","HeatStorageEfficiency","HeatReleaseEfficiency","SelfConsumeEfficiency","HeatStorageMax","HeatReleaseMax"],
    			// 
    			appendName:[],
    			appendUnit:[],
    			setDataName:[],
    			getDataName:[],
			}
		},
		methods: {
			changeCurrent(val){
				this.current=val;
				this.getAllDevice();
			},
			changeSize(val){
				this.pagesize=val;
				this.getAllDevice();
			},
			dialog(device_id,device_type_id,device_type_name,brand,model){
				$("#modal-add").modal("show");
				this.modalBrand=brand;
				this.modalModel=model;
				this.modalType=device_type_name;
				this.checkDeviceId=device_id;
				this.deviceAllInfoData={};
		        switch(device_type_id){
		            case 1:
		                this.appendName=this.appendName_FJ;
		                this.appendUnit=this.appendUnit_FJ;
		                this.setDataName=this.setDataName_FJ;
		                this.getDataName=this.getDataName_FJ;
		                break;
		            case 2:
		                this.appendName=this.appendName_PV;
		                this.appendUnit=this.appendUnit_PV;
		                this.setDataName=this.setDataName_PV;
		                this.getDataName=this.getDataName_PV;
		                break;
		            case 3:
		                this.appendName=this.appendName_XD;
		                this.appendUnit=this.appendUnit_XD;
		                this.setDataName=this.setDataName_XD;
		                this.getDataName=this.getDataName_XD;
		                break;
		            case 4:
		                this.appendName=this.appendName_NBQ;
		                this.appendUnit=this.appendUnit_NBQ;
		                this.setDataName=this.setDataName_NBQ;
		                this.getDataName=this.getDataName_NBQ;
		                break;
		            case 5:
		                this.appendName=this.appendName_GR;
		                this.appendUnit=this.appendUnit_GR;
		                this.setDataName=this.setDataName_GR;
		                this.getDataName=this.getDataName_GR;
		                break;
		            case 6:
		                this.appendName=this.appendName_DGL;
		                this.appendUnit=this.appendUnit_DGL;
		                this.setDataName=this.setDataName_DGL;
		                this.getDataName=this.getDataName_DGL;
		                break;
		            case 7:
		                this.appendName=this.appendName_RQGL;
		                this.appendUnit=this.appendUnit_RQGL;
		                this.setDataName=this.setDataName_RQGL;
		                this.getDataName=this.getDataName_RQGL;
		                break;
		            case 8:
		                this.appendName=this.appendName_XLJ;
		                this.appendUnit=this.appendUnit_XLJ;
		                this.setDataName=this.setDataName_XLJ;
		                this.getDataName=this.getDataName_XLJ;
		                break;
		            case 9:
		                this.appendName=this.appendName_ZRJ;
		                this.appendUnit=this.appendUnit_ZRJ;
		                this.setDataName=this.setDataName_ZRJ;
		                this.getDataName=this.getDataName_ZRJ;
		                break;
		            case 10:
		                this.appendName=this.appendName_DZL;
		                this.appendUnit=this.appendUnit_DZL;
		                this.setDataName=this.setDataName_DZL;
		                this.getDataName=this.getDataName_DZL;
		                break;
		            case 11:
		                this.appendName=this.appendName_CHP;
		                this.appendUnit=this.appendUnit_CHP;
		                this.setDataName=this.setDataName_CHP;
		                this.getDataName=this.getDataName_CHP;
		                break;
		            case 12:
		                this.appendName=this.appendName_CR;
		                this.appendUnit=this.appendUnit_CR;
		                this.setDataName=this.setDataName_CR;
		                this.getDataName=this.getDataName_CR;
		                break;
		        }
				this.appendInput(this.appendName,this.appendUnit,this.setDataName);
				let data={
					deviceid:parseInt(device_id)
				}
				this.$api.get("/Admin/GetDeviceInfo",data,(res)=>{
					this.deviceAllInfoData=res.Data;
					this.inputInData(this.appendName,this.getDataName);
				})
			},
			getAllDevice(){
				let data={
					keywords:this.searchValue,
					page:this.current,
					pagesize:this.pagesize
				}
				this.spinShow=true;
				this.$api.get("/Admin/GetAllDevices",data,(res)=>{
					this.spinShow=false;
					console.log(res.Data)
					this.tableData=res.Data;
					this.Alltotal=res.PageCount;
				})
			},
			appendInput(appendName,appendUnit,setDataName){
				$(".show-setting-info").find("li").remove();
				$.each(appendName,(i,ele)=>{
					let appendLi="<li class='"+setDataName[i]+"'><div>"+ele+"</div><input class='el-input__inner' type='text' name='"+setDataName[i]+"' style='height:30px;'><div>"+appendUnit[i]+"</div></li>";
					$(".show-setting-info").append(appendLi);
				})
			},
			inputInData(appendName,getDataName){
				let inputList=$(".show-setting-info input");
				$.each(appendName,(i, el)=>{
					inputList.eq(i).val(this.deviceAllInfoData[getDataName[i]])
				});
			},
			examineDevice(device_id){
				let data={
					 id:parseInt(device_id)
				};
				this.$api.post("/Admin/AuditDevices",data,(res)=>{
					this.$message({
						message: '设备审核成功！',
						type: 'success',
						duration:1500,
						onClose:()=>{
							$("#modal-add").modal("hide");
							this.getAllDevice();
						}
					});
				})
			},
			saveDeviceSetting(){
				let data={
					deviceId:parseInt(this.checkDeviceId),
					info:{}
				};
				$.each(this.setDataName,(i,ele)=>{
					data.info[ele]=$("input[name='"+ele+"']").val();
				});
				this.$api.post("/Admin/SaveEditDevice",data,(res)=>{
					this.$message({
						message: '设备修改成功！',
						type: 'success',
						duration:1500,
						onClose:()=>{
							$("#modal-add").modal("hide");
							this.getAllDevice();
						}
					});
				})
			},
		},
		created(){
		},
		mounted(){
			this.getAllDevice();
		}
	}
</script>