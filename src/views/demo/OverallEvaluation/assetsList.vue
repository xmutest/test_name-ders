<!--资产赋值表-->
<template>
  <d2-container>
    <el-alert title="重要资产清单" type="success" :closable="false"></el-alert>
      <!-- @cell-mouse-leave="cellMouseLeave" @cell-mouse-enter="cellMouseEnter"
       :cell-class-name="tableRowClassName" -->
    <el-table
      border style="width: 100%" :data="assetsData.tableData" :span-method="objectSpanMethod">
      <el-table-column prop="assetsTypeName" label="资产分类" width="150"></el-table-column>
      <el-table-column prop="sign" label="资产标识" width="70"></el-table-column>
      <el-table-column prop="name" label="资产名称" width="200"></el-table-column>
      <el-table-column prop="type"label="规格型号" width="200"></el-table-column>
      <el-table-column prop="ip" label="ip地址" width="120"></el-table-column>
      <el-table-column prop="principal" label="负责人" width="120">
      </el-table-column>
      <el-table-column prop="pointSecurity" label="保密性" width="70">
        <template slot-scope="scope">
          <el-select size="mini" v-model="scope.row.pointSecurity" placeholder="请选择" @change="saveBtn(scope.row)">
            <el-option v-for="item in numList" :label="item" :value="item" :key="item"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="pointWhole" label="完整性" width="70">
        <template slot-scope="scope">
          <el-select size="mini" v-model="scope.row.pointWhole" placeholder="请选择" @change="saveBtn(scope.row)">
            <el-option v-for="item in numList" :label="item" :value="item" :key="item"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="pointUserful" label="可用性" width="70">
        <template slot-scope="scope">
          <el-select size="mini" v-model="scope.row.pointUserful" placeholder="请选择" @change="saveBtn(scope.row)">
            <el-option v-for="item in numList" :label="item" :value="item" :key="item"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="cost" label="资产价值" width="70">
        <template slot-scope="scope">
          {{getMax(scope.row.pointSecurity,scope.row.pointWhole,scope.row.pointUserful)}}
        </template>
      </el-table-column>
<!--       <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.isEdited" type="default" size="mini" @click="editBtn(scope.row,scope.$index)">编辑</el-button>
          <el-button v-if="scope.row.isEdited" type="default" size="mini" @click="saveBtn(scope.row)">保存</el-button>
        </template>
      </el-table-column> -->
    </el-table>
<!--     <div class="btnBox">
      <el-button type="success" size="small" @click="saveTable">保存</el-button>
    </div> -->
  </d2-container>
</template>

<script>
export default {
	data() {
		return {
			numList:[1,2,3,4,5],
			assetsData:{
				tableData:[],
				mergeArr: [],
				hoverOrderArr: [],
				rowIndex: '-1',
			},
			assetsSign:[
				{assetsTypeName:'',sign:''},
				{assetsTypeName:'重要硬件资产',sign:'YJ'},
				{assetsTypeName:'应用软件资产',sign:'RJ'},
				{assetsTypeName:'重要文档和数据资产',sign:'SJ'},
				{assetsTypeName:'重要人员',sign:'RY'},
				{assetsTypeName:'重要服务应用资产',sign:'FW'},
			]
		}
	},
	created() {
		this.findAssetsList();

	},
	methods: {
		getMax(num1,num2,num3) {//获取最大值
			if(num1&&num2&&num3){
				var max = 0;
				if (num1 > num2) {
				    max = num1;
				    if (num1 > num3) {
				        return max;
				    } else {
				        return num3;
				    }
				} else {
				    max = num2;
				    if (num2 > num3) {
				        return max;
				    } else {
				        return num3;
				    }
				}
			}
		    
		},
		async findAssetsList(){//获取资产数据
	       let res = await this.$api.rickReport_findAssetsList();
	       // console.log(res);
	       if(res.code==20000){
	       		this.assetsDataHandle(res.data)
	       }else{
	         this.$message.error(res.messager);
	       }

	    },
	    assetsDataHandle(data){//获取的资产数据变成table数据
	    	var arr = [];
	    	for(var key in data){
	    		var assetsTypeName = this.assetsSign[key].assetsTypeName
	    		var assetsSign = this.assetsSign[key].sign
	    		// console.log(data[key])
	    		for(var i=0;i<data[key].length;i++){

	    			var index = i+1;
	    			if(index<10){index='0'+index}
	    			var o = data[key][i];
	    			o.assetsTypeName = assetsTypeName;
	    			o.sign = assetsSign+index;
	    			o.isEdited = 1;
	    			if(!o.pointSecurity){o.pointSecurity=''};
	    			if(!o.pointUserful){o.pointUserful=''};
	    			if(!o.pointWhole){o.pointWhole=''};

	    			arr.push(o)
	    		}
	    	}
	    	// console.log(arr)
	    	this.assetsData.tableData = arr;
	    	this.getSameArr('assetsData')
	    },
	    editBtn(row,index){//编辑按钮
	      this.assetsData.tableData[index].isEdited = 1;
	    },
	    async saveBtn(row,index){//保存按钮
	    	// console.log(row.pointSecurity+'_'+row.pointUserful+'_'+row.pointWhole)
	     if(row.pointSecurity&&row.pointUserful&&row.pointWhole){
	     	// console.log('save')
	     	let res = await this.$api.rickReport_updateAssetsList(row);
	     	if(res.code==20000){
	     		this.$message.success('保存成功！');
	     	}else{
	     	  this.$message.error(res.messager);
	     	}
	     }else{
	     	// this.$message.error('请全部打分后再保存！');
	     }
	     
	    },
	    // ===================表格合并及样式处理======================== //
	    getSameArr(table) {// 获取相同编号的数组 资产名称合并

	      var table='assetsData'

	      let o = {}
	      this[table].tableData.forEach((item, index) => {

	          item.rowIndex = index
	          if (o[item.assetsTypeName]) {
	            o[item.assetsTypeName].push(index)
	          } else {
	            o[item.assetsTypeName] = []
	            o[item.assetsTypeName].push(index)
	          }
	      })
	      for (let k in o) {
	        if (o[k].length > 1) {
	          this[table].mergeArr.push(o[k])
	        }
	      }
	      
	    },
	    objectSpanMethod({row,column,rowIndex,columnIndex}) { // 合并单元格
	      var table='assetsData'
	      
	      if (columnIndex === 0) {
	        for (let i = 0; i < this[table].mergeArr.length; i++) {
	          for (let r = 0; r < this[table].mergeArr[i].length; r++) {
	            let item = this[table].mergeArr[i][r]
	            if (rowIndex == item) {
	              if (r == 0) {
	                return {
	                  rowspan: this[table].mergeArr[i].length,
	                  colspan: 1
	                }
	              } else if (r != 0) {
	                return {
	                  rowspan: 0,
	                  colspan: 0
	                }
	              }
	            }
	          }
	        }
	      }
	    },
	    // tableRowClassName({row,rowIndex}) {//设置hover样式
	    //   var table='assetsData'
	      	      
	    //   let arr = this[table].hoverOrderArr
	    //   for (let i = 0; i < arr.length; i++) {
	    //     if (rowIndex == arr[i]) {
	    //       return 'hovered-row'
	    //     }
	    //   }
	    // },
	    // cellMouseEnter(row, column, cell, event) {//移进鼠标加上hover样式
	    //   var table='assetsData'
	      	      
	    //   this[table].rowIndex = row.rowIndex;
	    //   this[table].hoverOrderArr = [];
	    //   this[table].mergeArr.forEach(item => {
	    //       if (item.indexOf(this[table].rowIndex) >= 0) {
	    //         this[table].hoverOrderArr = item
	    //       }
	    //   })
	    // },
	    // cellMouseLeave(row, column, cell, event) {//移开鼠标去掉hover样式
	    //   var table='assetsData'
	    //   this[table].rowIndex = '-1'
	    //   this[table].hoverOrderArr = [];
	    // },
	    // ===================表格合并及样式处理结束======================== //
	}
	 
	
}
</script>

<style scoped>
/*.el-table >>>.hovered-row {
  background: #f5f7fa;
}*/
::v-deep .el-table--enable-row-hover .el-table__body tr:hover>td{
  background: none;
}
::v-deep .el-input__inner{
  padding:0 5px;
  text-align: left;
}

</style>
