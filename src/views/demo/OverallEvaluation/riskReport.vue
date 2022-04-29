<!--风险数量计算-->
<template>
  <d2-container>
    <el-alert title="风险数量计算" type="success" :closable="false"></el-alert>
    <el-table
      :data="riskCountData"
      style="width: 100%">
      <el-table-column prop="name" label="风险等级"></el-table-column>
      <el-table-column prop="veryLowRisk" label="很低"></el-table-column>
      <el-table-column prop="lowRisk" label="低"></el-table-column>
      <el-table-column prop="middleRisk" label="中等"></el-table-column>
      <el-table-column prop="highRisk" label="高"></el-table-column>
      <el-table-column prop="veryHighRisk" label="很高"></el-table-column>
    </el-table>
    <div id="chart"></div>
    <!-- <img :src="url"> -->
    <div class="btnBox">
      <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="reportDate"
          placeholder="报告日期"
          type="date"
          size="small">
        </el-date-picker>
      <el-button type="success" size="small" @click="report">导出报告</el-button>
    </div>
  </d2-container>
</template>
<script>
import echarts from 'echarts'
export default {
	data(){
		return{
			riskCountData:[],
			url:'',
			reportDate:'',
		}
	},
	created() {
		this.getDetail();
		this.findAmendNumCount();
	},
	methods: {
		async findAmendNumCount(){//获取风险数量表数据
	       let res = await this.$api.rickReport_amendNumCount();
	       // console.log(res);
	       if(res.code==20000){
	       		
	       		this.amendNumCountDataHandle(res.data);
	       }else{
	         this.$message.error(res.messager);
	       }

	    },
	    amendNumCountDataHandle(data){//获取的风险数量表数据变成table数据
	    	console.log(data.veryLowRiskNum)
	    	var arr = [];
	    	var chartArr = [];
	    	arr.push({
	    		name:'风险数目',
	    		veryLowRisk:data.veryLowRiskNum,
	    		lowRisk:data.lowRiskNum,
	    		middleRisk:data.middleRiskNum,
	    		highRisk:data.highRiskNum,
	    		veryHighRisk:data.veryHighRiskNum,
	    	})
	    	arr.push({
	    		name:'所占百分比',
	    		veryLowRisk:data.veryLowRiskPercent+'%',
	    		lowRisk:data.lowRiskPercent+'%',
	    		middleRisk:data.middleRiskPercent+'%',
	    		highRisk:data.highRiskPercent+'%',
	    		veryHighRisk:data.veryHighRiskPercent+'%',
	    	})
	    	this.riskCountData = arr;
	    	chartArr = [
	    		{name:'很低风险',value:data.veryLowRiskPercent},
	    		{name:'低风险',value:data.lowRiskPercent},
	    		{name:'中等风险',value:data.middleRiskPercent},
	    		{name:'高风险',value:data.highRiskPercent},
	    		{name:'很高风险',value:data.veryHighRiskPercent},
	    	]
	    	this.createChart(chartArr);
	    },
	    async getDetail() {//获取项目详情

	      let res = await this.$api.rickReport_ProjectDetail();
	      console.log(res);
	      if(res.code==20000){
	        this.projectName = res.data.projectName;
	      }else{
	        this.$message.error(res.messager);
	      }

	    },
	    async report(){//导出报告
	    	if(!this.reportDate){
	    		this.$message.error('请先填写报告日期！');
	    		return;
	    	}
	    	const loading = this.$loading({
    	          lock: true,
    	          text: 'Loading',
    	          spinner: 'el-icon-loading',
    	          background: 'rgba(0, 0, 0, 0.7)'
    	        });
	    	// console.log(this.reportDate)
	    	var fileName = this.projectName+'_风险评估报告.docx'
	    	var data = {
	    		reportDate:this.reportDate,
	    		riskImgBase64:this.url,
	    		fileName:fileName
	    	}
	    	console.log(data)
	    	// return;
	    	let res = await this.$api.rickReport_amendReview(data);
	    	// console.log(res);
	    	if (res.code == 500) {
	    	  loading.close();
	    	  this.$message.error(res.message);
	    	} else {
	    	  loading.close();
	    	  let blob = new Blob([res], {
	    	    type: "application/msword;charset=utf-8",
	    	  });

	    	  //浏览器兼容，Google和火狐支持a标签的download，IE不支持
	    	  if (window.navigator && window.navigator.msSaveBlob) {
	    	    //IE浏览器、微软浏览器
	    	    /* 经过测试，微软浏览器Microsoft Edge下载文件时必须要重命名文件才可以打开，
	    	        IE可不重命名，以防万一，所以都写上比较好 */
	    	    window.navigator.msSaveBlob(blob, fileName);
	    	  } else {
	    	    //其他浏览器
	    	    let link = document.createElement("a"); // 创建a标签
	    	    link.style.display = "none";
	    	    let objectUrl = URL.createObjectURL(blob);
	    	    link.download = fileName;
	    	    link.href = objectUrl;
	    	    link.click();
	    	    URL.revokeObjectURL(objectUrl);
	    	  }
	    	}
	     
	    },
	    createChart(data){//生成图片
	    	console.log(data)
	    	var charts = echarts.init(document.getElementById('chart'));
	    	var option = {
	    	 animation: false,
	    	  itemStyle: {
	    	     borderColor: '#fff',
	    	     borderWidth: 1
	    	 },
	    	 grid: {
	    	     left: '3%',
	    	     right: '4%',
	    	     top: '3%',
	    	   },
	    	  color:[
	    	      '#4472C4',
	    	      '#ED7D31',
	    	      '#A5A5A5',
	    	      '#FFC000',
	    	      '#91CB74',
	    	  ],
	    	  tooltip: {
	    	    trigger: 'item'
	    	  },
	    	  legend: {
	    	      bottom: '5%',
	    	      left: 'center'
	    	  },
	    	  series: [
	    	    {
	    	      name: '',
	    	      type: 'pie',
	    	      radius: '62%',
	    	      center:['50%', '46%'],
	    	      data: data,
	    	      label: {
	    	             formatter: '{d}%',
	    	      }
	    	    }
	    	  ]
	    	};
	    	
	    	charts.setOption(option)
	    	var _this = this;
	    	setTimeout(function () {
	    		_this.url = charts.getDataURL();
	    		// console.log(_this.url)
	    	},300)
	    },
	    dateFormat(fmt, date){//时间格式化
	      let ret;
	          const opt = {
	              "Y+": date.getFullYear().toString(),        // 年
	              "m+": (date.getMonth() + 1).toString(),     // 月
	              "d+": date.getDate().toString(),            // 日
	              "H+": date.getHours().toString(),           // 时
	              "M+": date.getMinutes().toString(),         // 分
	              "S+": date.getSeconds().toString()          // 秒
	              // 有其他格式化字符需求可以继续添加，必须转化成字符串
	          };
	          for (let k in opt) {
	              ret = new RegExp("(" + k + ")").exec(fmt);
	              if (ret) {
	                  fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
	              };
	          };
	          // console.log(fmt)
	          return fmt;
	    },
	    dClone(data){
	        return JSON.parse(JSON.stringify(data));
	    },
	}
}

</script>

<style scoped>
	#chart{
		width: 500px;
		height: 350px;
		margin: 30px auto;
    }
    .btnBox{
    	float: right;
    }
</style>
