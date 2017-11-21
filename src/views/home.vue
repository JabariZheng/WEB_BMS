<template>
	<div class="home">
		<div class="information-rectangle">
			<div class="rectangle-div">
				<div class="color_one"></div>
				<div>
					<p>注册人数</p>
					<p>500</p>
				</div>
			</div>
			<div class="rectangle-div">
				<div class="color_two"></div>
				<div>
					<p>今日登陆</p>
					<p>100</p>
				</div>
			</div>
			<div class="rectangle-div">
				<div class="color_three"></div>
				<div>
					<p>服务器时间</p>
					<p>2017-11-20</p>
				</div>
			</div>
			<div class="rectangle-div">
				<div class="color_four"></div>
				<div>
					<p>服务器流量</p>
					<p>500<i>M</i></p>
				</div>
			</div>
		</div>
		<div class="echart-area">
			<div class="echart-div">
				<div class="echart-div-title"></div>
				<div class="e-line-chart" id="e-line-chart-one"></div>
			</div>
			<div class="echart-div e-bar-chart">
				<div class="echart-div-title"></div>
				<div class="e-bar-chart" id="e-bar-chart-one"></div>
			</div>
			<div class="echart-div e-pie-chart">
				<div class="echart-div-title"></div>
				<div class="e-pie-chart" id="e-pie-chart-one"></div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				spinShow: true
			}
		},
		methods: {
			lineChart(){
				let myChart = this.$echarts.init(document.getElementById('e-line-chart-one'));
				let options={
					tooltip : {
					        trigger: 'axis',
					        axisPointer: {
					            type: 'cross',
					            label: {
					                backgroundColor: '#6a7985'
					            }
					        }
					},
					legend: {
					    data:['邮件营销','联盟广告']
					},
					xAxis : [
					        {
					            type : 'category',
					            boundaryGap : false,
					            data : ['周一','周二','周三','周四','周五','周六','周日']
					        }
					],
					yAxis : [
					        {
					            type : 'value'
					        }
					],
					series : [
					        {
					            name:'邮件营销',
					            type:'line',
					            stack: '总量',
					            areaStyle: {normal: {}},
					            data:[120, 132, 101, 134, 90, 230, 210]
					        },
					        {
					            name:'联盟广告',
					            type:'line',
					            stack: '总量',
					            areaStyle: {normal: {}},
					            data:[220, 182, 191, 234, 290, 330, 310]
					        }
					]
				};
				myChart.setOption(options);
			},
			barChart(){
				let myChart = this.$echarts.init(document.getElementById('e-bar-chart-one'));
				let options={
					tooltip : {
					    trigger: 'axis',
					    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					    }
					},
					legend: {
					    data:['直接访问','邮件营销','联盟广告']
					},
					xAxis : [
					    {
					        type : 'category',
					        data : ['周一','周二','周三','周四','周五','周六','周日']
					    }
					],
					yAxis : [
					    {
					        type : 'value'
					    }
					],
					series : [
					    {
					        name:'直接访问',
					        type:'bar',
					        data:[320, 332, 301, 334, 390, 330, 320]
					    },
					    {
					        name:'邮件营销',
					        type:'bar',
					        stack: '广告',
					        data:[120, 132, 101, 134, 90, 230, 210]
					    },
					    {
					        name:'联盟广告',
					        type:'bar',
					        stack: '广告',
					        data:[220, 182, 191, 234, 290, 330, 310]
					    }
					]
				};
				myChart.setOption(options);
			},
			peiChart(){
				let myChart = this.$echarts.init(document.getElementById('e-pie-chart-one'));
				let options={
					tooltip : {
					    trigger: 'item',
					    formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
					    orient: 'vertical',
					    left: 'left',
					    data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
					},
					series : [
					    {
					        name: '访问来源',
					        type: 'pie',
					        radius : '55%',
					        center: ['50%', '60%'],
					        data:[
					            {value:335, name:'直接访问'},
					            {value:310, name:'邮件营销'},
					            {value:234, name:'联盟广告'},
					            {value:135, name:'视频广告'},
					            {value:1548, name:'搜索引擎'}
					        ],
					        itemStyle: {
					            emphasis: {
					                shadowBlur: 10,
					                shadowOffsetX: 0,
					                shadowColor: 'rgba(0, 0, 0, 0.5)'
					            }
					        }
					    }
					]
				};
				myChart.setOption(options);
			},
		},
		created(){

		},
		mounted(){
			this.lineChart();
			this.barChart();
			this.peiChart();
		}
	}
</script>
