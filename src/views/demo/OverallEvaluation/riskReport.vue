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
    
    <el-alert title="导出报告" type="success" :closable="false"></el-alert>
    <el-form ref="ruleForm" :model="form" label-width="110px" :rules="rules" class="mainForm">
      <el-form-item label="报告名称" prop="reportName">
    	  <el-input size="medium" v-model="form.reportName"></el-input>
      </el-form-item>
      <el-form-item label="评估起止日期" prop="reportDate">
        <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="form.reportDate"
            placeholder="报告日期"
            type="date"
            size="small">
          </el-date-picker>
          <el-button type="success" size="small" @click="report">生成报告</el-button>
      </el-form-item>
      
    </el-form>
<!--     <div class="btnBox">

      <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="reportDate"
          placeholder="报告日期"
          type="date"
          size="small">
        </el-date-picker>
      <el-button type="success" size="small" @click="report">导出报告</el-button>
    </div> -->
    <el-table
      :data="riskHistoryData"
      style="width: 100%">
      <el-table-column prop="reportName" label="报告名称"></el-table-column>
      <el-table-column prop="status" label="报告生成状态">
      	<template slot-scope="scope">
      	  <div v-if="scope.row.status==0">生成中..</div>
      	  <div v-if="scope.row.status==1">已生成</div>
      	  <div v-if="scope.row.status==2">生成失败</div>
      	</template>
      </el-table-column>
      <el-table-column prop="createdTime" label="日期">
      	<template slot-scope="scope">
      	  {{dateFormat('YYYY-mm-dd HH:MM:SS',new Date(scope.row.createdTime))}}
      	</template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="180">
        <!-- <template slot="header" slot-scope="scope">
          <el-button @click="addRoleBtn(scope.row)" type="success" size="mini">新增</el-button>
        </template> -->
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==2" @click="downloadFailBtn(scope.row,scope.$index)" type="default" size="mini">失败原因</el-button>
          <el-button v-if="scope.row.status==1" @click="downloadBtn(scope.row,scope.$index)" type="default" size="mini">下载</el-button>
          <el-button @click="delBtn(scope.row,scope.$index)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </d2-container>
</template>
<script>
import echarts from 'echarts'
export default {
	data(){
		return{
			riskCountData:[],
			url:'',
			riskHistoryData:[],
			form:{
				reportDate:'',
				reportName:'',
			},
	    	rules:{
		      reportDate:[
	            { required: true, message: '请输入评估起止日期', trigger: 'blur' },
		      ],
	          reportName:[
	            { required: true, message: '请输入报告名称', trigger: 'blur' },
	          ],
		    },
		}
	},
	created() {
		this.getDetail();
		this.findAmendNumCount();
		this.findWordList();
		
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
	        this.form.reportName = this.projectName+'_风险评估报告'
	      }else{
	        this.$message.error(res.messager);
	      }

	    },
	    async report(){//导出报告
	    	if(!this.form.reportName){
	    		this.$message.error('请先填写报告名称！');
	    		return;
	    	}
	    	if(!this.form.reportDate){
	    		this.$message.error('请先填写报告日期！');
	    		return;
	    	}
	    	const loading = this.$loading({
    	          lock: true,
    	          text: 'Loading',
    	          spinner: 'el-icon-loading',
    	          background: 'rgba(0, 0, 0, 0.7)'
    	        });

	    	var fileName = this.form.reportName;
	    	var data = {
	    		reportDate:this.form.reportDate,
	    		riskImgBase64:this.url,
	    		reportName:fileName
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
	    	  
	    	  // let blob = new Blob([res], {
	    	  //   type: "application/msword;charset=utf-8",
	    	  // });

	    	  // //浏览器兼容，Google和火狐支持a标签的download，IE不支持
	    	  // if (window.navigator && window.navigator.msSaveBlob) {
	    	  //   //IE浏览器、微软浏览器
	    	  //   /* 经过测试，微软浏览器Microsoft Edge下载文件时必须要重命名文件才可以打开，
	    	  //       IE可不重命名，以防万一，所以都写上比较好 */
	    	  //   window.navigator.msSaveBlob(blob, fileName+'.docx');
	    	  // } else {
	    	  //   //其他浏览器
	    	  //   let link = document.createElement("a"); // 创建a标签
	    	  //   link.style.display = "none";
	    	  //   let objectUrl = URL.createObjectURL(blob);
	    	  //   link.download = fileName+'.docx';
	    	  //   link.href = objectUrl;
	    	  //   link.click();
	    	  //   URL.revokeObjectURL(objectUrl);
	    	  // }

	    	  var _this = this;
	    	  _this.findWordList();
	    	  var interval= setInterval(function () {
	    	  	//生成中就刷新数据到生成完毕
	    	  	if(_this.riskHistoryData[0].status!=1&&_this.riskHistoryData[0].status!=2){
	    	  		_this.findWordList();
	    	  	}else{
	    	  		clearInterval(interval);
	    	  		_this.$message.success('生成成功！');
	    	  	}
	    	  	
	    	  },3000);
	    	  
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
	    async findWordList(){//获取报告历史
	    	var data = {
	    		reportType:3
	    	}
	    	let res = await this.$api.rickReport_findWordList(data);
	    	console.log(res);
	    	if(res.code==20000){
	    	  this.riskHistoryData = res.data;
	    	}else{
	    	  this.$message.error(res.messager);
	    	}

	    },
	    downloadBtn(row,index){//下载报告
	    	var url= 'https://evaluate.iscn.org.cn/reportWord/'+row.fileName

	    	// var url = 'https://evaluate.iscn.org.cn/reportWord/dada9srgoj8h50rhxtum.docx'
	    	console.log(url)
	    	console.log(row.reportName+'.docx')

	    	var a = document.createElement("a");
	    	if (typeof a.download === "undefined") {
	    	
	    	  window.location = url;
	    	} else {
	    	  a.href = url;
	    	  a.download = row.reportName;
	    	  a.target="_blank"
	    	  document.body.appendChild(a);
	    	  a.click();
	    	  a.remove();
	    	}
	    },
	    delBtn(row,index){//删除报告历史

	    	this.$confirm('确定要删除吗?', '信息', {
	    	  confirmButtonText: '确定',
	    	  cancelButtonText: '取消',
	    	  type: 'warning'
	    	})
	    	  .then(() => {
	    	   	this.delWord(row,index);
	    	  })
	    	  .catch(() => {})

	    },
	    async delWord(row,index){//删除ajax
	    	let res = await this.$api.rickReport_wordDel({id:row.id});
	    	console.log(res);
	    	if(res.code==20000){
	    		 this.$message.success('删除成功！')
	    		 this.findWordList();
	    	}else{
	    	  this.$message.error(res.messager);
	    	}
	    },
	    downloadFailBtn(row,index){
	    	this.$alert(row.failedReason);
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
    	margin:20px;
    }
    .mainForm{
    	margin:20px;
    }
    .mainForm button{
    	margin-left:20px;
    }
</style>
