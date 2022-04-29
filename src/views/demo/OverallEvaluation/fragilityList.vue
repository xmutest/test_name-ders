<!--脆弱性赋值表-->
<template>
  <d2-container>
    <el-alert title="脆弱性赋值表" type="success" :closable="false"></el-alert>
    <el-table ref="multipleTable" border :span-method="objectSpanMethod" :cell-class-name="tableRowClassName"
      @cell-mouse-leave="cellMouseLeave"  @cell-mouse-enter="cellMouseEnter" :data="fragility.tableData">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column label="资产标识" align="center" prop="sign" width="110"></el-table-column>
      <el-table-column label="资产名称" align="center" prop="assetsName" width="110"></el-table-column>
      <el-table-column label="脆弱性类别" align="center" prop="safetyControlSpot" width="110"></el-table-column>
      <el-table-column label="脆弱性描述" align="center" prop="problemDescription"></el-table-column>
      <el-table-column label="赋值" align="center" prop="num"  width="70">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.weakGrade" maxlength="1" @blur="saveBtn(scope.row)" @focus="getInputFocus($event)" oninput="value=value.replace(/[^1-5]/g, '')"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
export default {
	data(){
		return{
			fragility:{
			  tableData: [],
			  mergeArr: [],
			  mergeArr2:[],
			  hoverOrderArr: [],
			  rowIndex: '-1',
			},	
				
		}
	},
	created() {
		this.findReviseManifest();
	},
	methods: {
		getInputFocus(event) {//点击input全选内容
		   // console.log("event",event)
		    event.currentTarget.select();
		},
		async findReviseManifest(){//获威胁识别
	       let res = await this.$api.rickReport_findReviseManifest();
	       // console.log(res);
	       if(res.code==20000){
	       		this.reviseManifestDataHandle(res.data.technology);
	       }else{
	         this.$message.error(res.messager);
	       }

	    },
	    reviseManifestDataHandle(data){//威胁识别数据处理成表格数据
	    	var arr = []
			for(var i=0;i<data.length;i++){
				
				// console.log(sign)
				for(var r=0;r<data[i].content.length;r++){

					var sign = data[i].content[r].assetMark;
					for(var k=0;k<data[i].content[r].assetsList.length;k++){
						
						for(var j=0;j<data[i].content[r].assetsList[k].spotList.length;j++){
							var o = data[i].content[r].assetsList[k].spotList[j];
							o.sign = sign;
							if(!o.weakGrade){o.weakGrade=''}
							arr.push(o)
						}
						
					}
				}
			}
			// console.log(arr)
			this.fragility.tableData = arr;
			this.getSameArr();
		},
		async saveBtn(row,index){//保存按钮
			// console.log(row)
		 if(row.weakGrade){
		 	// console.log('save')
		 	let res = await this.$api.rickReport_updateWeakGrade(row);
		 	if(res.code==20000){
		 		this.$message.success('保存成功！');
		 	}else{
		 	  this.$message.error(res.messager);
		 	}
		 }else{
		 	// this.$message.error('请全部打分后再保存！');
		 }
		 
		},
		// ========================表格合并和样式设置======================= //
		getSameArr() {// 资产标识+资产名称合并

		  var table='fragility'
		  let o = {}
		  this[table].tableData.forEach((item, index) => {

		      item.rowIndex = index
		      if (o[item.assetsName]) {
		        o[item.assetsName].push(index)
		      } else {
		        o[item.assetsName] = []
		        o[item.assetsName].push(index)
		      }
		  })
		  for (let k in o) {
		    if (o[k].length > 1) {
		      this[table].mergeArr.push(o[k])
		    }
		  }
		  if(table=='fragility'){
		    // 脆弱性类别合并
		    var o2 = {};
		    for(var i=0;i<this[table].mergeArr.length;i++){
		      for(var r=0;r<this[table].mergeArr[i].length;r++){
		        if (o2[i+'_'+this[table].tableData[this[table].mergeArr[i][r]].safetyControlSpot]) {
		          o2[i+'_'+this[table].tableData[this[table].mergeArr[i][r]].safetyControlSpot].push(this[table].mergeArr[i][r])
		        } else {
		          o2[i+'_'+this[table].tableData[this[table].mergeArr[i][r]].safetyControlSpot] = []
		          o2[i+'_'+this[table].tableData[this[table].mergeArr[i][r]].safetyControlSpot].push(this[table].mergeArr[i][r])
		        }
		      }
		    }

		    for (let k in o2) {
		      if (o2[k].length > 1) {
		        this[table].mergeArr2.push(o2[k])
		      }
		    }
		  }
		  
		},
		objectSpanMethod({row,column,rowIndex,columnIndex}) { // 合并单元格
		  var table='fragility'
		  
		  if (columnIndex === 1||columnIndex === 2) {
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
		  if(table=='fragility'){
		    if (columnIndex === 3) {
		      for (let i = 0; i < this[table].mergeArr2.length; i++) {
		        for (let r = 0; r < this[table].mergeArr2[i].length; r++) {
		          let item = this[table].mergeArr2[i][r]
		          if (rowIndex == item) {
		            if (r == 0) {
		              return {
		                rowspan: this[table].mergeArr2[i].length,
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
		  }
		},
		tableRowClassName({row,rowIndex}) {//设置hover样式
		  var table='fragility'
		  	      
		  let arr = this[table].hoverOrderArr
		  for (let i = 0; i < arr.length; i++) {
		    if (rowIndex == arr[i]) {
		      return 'hovered-row'
		    }
		  }
		},
		cellMouseEnter(row, column, cell, event) {//移进鼠标加上hover样式
		  var table='fragility'
		  	      
		  this[table].rowIndex = row.rowIndex;
		  this[table].hoverOrderArr = [];
		  this[table].mergeArr.forEach(item => {
		      if (item.indexOf(this[table].rowIndex) >= 0) {
		        this[table].hoverOrderArr = item
		      }
		  })
		},
		cellMouseLeave(row, column, cell, event) {//移开鼠标去掉hover样式
		  var table='fragility'
		  this[table].rowIndex = '-1'
		  this[table].hoverOrderArr = [];
		},
		// ========================表格合并和样式设置结束======================= //
	}
}
</script>

<style scoped>
.el-table >>>.hovered-row {
  background: #f5f7fa;
}
>>>.el-input__inner{
  padding:0 5px;
  text-align: center;
}
</style>
