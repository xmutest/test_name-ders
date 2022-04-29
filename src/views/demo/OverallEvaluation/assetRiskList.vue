<!--资产风险计算表-->
<template>
  <d2-container>
    <el-alert title="风险计算表" type="success" :closable="false"></el-alert>
    <el-table ref="multipleTable" border :span-method="objectSpanMethod" :data="risk.tableData">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column label="资产标识" align="center" prop="sign" width="90"></el-table-column>
      <el-table-column label="资产名称" align="center" prop="assetsName" width="90"></el-table-column>
      <el-table-column label="威胁种类" align="center" prop="threatType" width="120"></el-table-column>
      <el-table-column label="脆弱性问题" align="center" prop="problemDescription" width="200"></el-table-column>
      <el-table-column label="资产赋值A" prop="apoint" align="center" width="50"></el-table-column>
      <el-table-column label="威胁赋值T" prop="tpoint" align="center" width="50"></el-table-column>
      <el-table-column label="脆弱性赋值V" prop="vpoint" align="center" width="50"></el-table-column>
      <el-table-column label="安全事件发生的可能性L（L=T*V）" prop="lpoint" align="center" width="50"></el-table-column>
      <el-table-column label="安全事件发生的损失F（F=A*V）" prop="fpoint" align="center" width="50"></el-table-column>
      <el-table-column label="风险值" prop="risk" align="center"  width="50"></el-table-column>
      <el-table-column label="风险等级" prop="level" align="center"  width="50"></el-table-column>
      <el-table-column label="风险标识" prop="riskMark" align="center"  width="50"></el-table-column>
       <el-table-column label="是否可接受" prop="accept" align="center"  width="50"></el-table-column> 
       <el-table-column label="风险控制建议" prop="rectificationSuggestions" align="center"  width="150"></el-table-column>
    </el-table>
    
  </d2-container>
</template>

<script>
export default {
	data(){
		return{
			risk:{
			  tableData: [
			    {id:'YJ03',name:'H3c交换机',menace:'THR-03无作为或操作失误',fragility:'交换机未采用身份鉴别措施，未配置密码复杂度和密码有效期策略。',a:'1',t:'2',v:'3',l:'6',f:'3',sum:'18',level:'一级',sign:'很低',accept:'是',suggest:'建议交换机采用身份鉴别措施，使用用户名+密码进行身份鉴别和标识，配置密码复杂度要求，要求密码8位以上且包含3种不同类型的字符；配置密码有效期180天，每180天更换一次密码。',
			    },
			    {id:'YJ03',name:'H3c交换机',menace:'THR-03无作为或操作失误',fragility:'交换机未配置登录失败处理功能。',a:'1',t:'2',v:'2',l:'4',f:'2',sum:'8',level:'一级',sign:'很低',accept:'是',suggest:'建议交换机配置登录失败超过3次后锁定账户10分钟；配置空闲15分钟后自动退出账户。',
			    },
			    {id:'YJ03',name:'H3c交换机',menace:'THR-03无作为或操作失误',fragility:'交换机未采取措施防止鉴别信息在传输过程中被窃听。',a:'1',t:'2',v:'4',l:'8',f:'4',sum:'32',level:'一级',sign:'很低',accept:'是',suggest:'建议交换机采用ssh协议进行远程管理，防止鉴别信息在传输过程中被窃听。',
			    },
			  ],
			  mergeArr: [],
			  hoverOrderArr: [],
			  rowIndex: '-1',
			}
		}
	},
	created() {
		this.findAmendCountList();
		
	},
	methods: {
		getInputFocus(event) {//点击input全选内容
		   // console.log("event",event)
		    event.currentTarget.select();
		},
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
		async findAmendCountList(){//获威胁识别
	       let res = await this.$api.rickReport_amendCount();
	       console.log(res.data.technology);
	       if(res.code==20000){
	       		this.amendCountDataHandle(res.data.technology);
	       }else{
	         this.$message.error(res.messager);
	       }

	    },
        amendCountDataHandle(data){//威胁识别数据处理成表格数据
        	var arr = []
    		for(var i=0;i<data.length;i++){

    			for(var r=0;r<data[i].content.length;r++){

    				var sign = data[i].content[r].assetMark;
    				var assetsName = data[i].content[r].assetsName;
    				for(var k=0;k<data[i].content[r].assetsList.length;k++){
    					
    					for(var j=0;j<data[i].content[r].assetsList[k].spotList.length;j++){
    						var o = data[i].content[r].assetsList[k].spotList[j];
    						o.sign = sign;
    						o.assetsName = assetsName;
    						// if(!o.weakGrade){o.weakGrade=''}
    						arr.push(o)
    					}
    					
    				}
    			}
    		}
    		// console.log(arr)
    		this.risk.tableData = arr;
    		this.getSameArr();
    	},
	    // ===================表格合并及样式处理======================== //
	    getSameArr(table) {// 获取相同编号的数组 资产名称合并

	      var table='risk'

	      let o = {}
	      this[table].tableData.forEach((item, index) => {

	          item.rowIndex = index
	          if (o[item.id]) {
	            o[item.id].push(index)
	          } else {
	            o[item.id] = []
	            o[item.id].push(index)
	          }
	      })
	      for (let k in o) {
	        if (o[k].length > 1) {
	          this[table].mergeArr.push(o[k])
	        }
	      }
	      
	    },
	    objectSpanMethod({row,column,rowIndex,columnIndex}) { // 合并单元格
	      var table='risk'
	      
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
	    },
	    // ===================表格合并及样式处理结束======================== //
			
	}
}
</script>

<style scoped>
::v-deep .el-table--enable-row-hover .el-table__body tr:hover>td{
  background: none;
}
::v-deep .el-input__inner{
  padding:0 5px;
  text-align: center;
}
</style>