<!--威胁赋值表-->
<template>
  <d2-container>
    <el-alert title="威胁识别表" type="success" :closable="false"></el-alert>
    <el-table
      border
      :data="threatIdentification"
      style="width: 100%">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column prop="sign" label="资产编号" width="70"></el-table-column>
      <el-table-column prop="name" label="资产名称" width="150"></el-table-column>
      <el-table-column prop="thr1" label="THR-01软硬件故障" width="60">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.thr1"  maxlength="1" @blur="saveBtn(scope.row)" @focus="getInputFocus($event)" oninput="value=value.replace(/[^1-5]/g, '')"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="thr2" label="THR-02物理环境影响" width="60">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.thr2"  maxlength="1" @blur="saveBtn(scope.row)" @focus="getInputFocus($event)" oninput="value=value.replace(/[^1-5]/g, '')"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="thr3" label="THR-03无作为或操作失误" width="60">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.thr3"  maxlength="1" @blur="saveBtn(scope.row)" @focus="getInputFocus($event)" oninput="value=value.replace(/[^1-5]/g, '')"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="thr4" label="THR-04管理不到位" width="60">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.thr4"  maxlength="1" @blur="saveBtn(scope.row)" @focus="getInputFocus($event)" oninput="value=value.replace(/[^1-5]/g, '')"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="thr5" label="THR-05恶意代码" width="60">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.thr5"  maxlength="1" @blur="saveBtn(scope.row)" @focus="getInputFocus($event)" oninput="value=value.replace(/[^1-5]/g, '')"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="thr6" label="THR-06越权或滥用" width="60">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.thr6"  maxlength="1" @blur="saveBtn(scope.row)" @focus="getInputFocus($event)" oninput="value=value.replace(/[^1-5]/g, '')"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="thr7" label="THR-07网络攻击" width="60">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.thr7"  maxlength="1" @blur="saveBtn(scope.row)" @focus="getInputFocus($event)" oninput="value=value.replace(/[^1-5]/g, '')"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="thr8" label="THR-08物理攻击" width="60">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.thr8"  maxlength="1" @blur="saveBtn(scope.row)" @focus="getInputFocus($event)" oninput="value=value.replace(/[^1-5]/g, '')"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="thr9" label="THR-09泄密" width="60">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.thr9"  maxlength="1" @blur="saveBtn(scope.row)" @focus="getInputFocus($event)" oninput="value=value.replace(/[^1-5]/g, '')"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="thr10" label="THR-10篡改" width="60">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.thr10"  maxlength="1" @blur="saveBtn(scope.row)" @focus="getInputFocus($event)" oninput="value=value.replace(/[^1-5]/g, '')"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="thr11" label="THR-11抵赖" width="60">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.thr11"  maxlength="1" @blur="saveBtn(scope.row)" @focus="getInputFocus($event)" oninput="value=value.replace(/[^1-5]/g, '')"></el-input>
        </template>
      </el-table-column>
    </el-table>
    
  </d2-container>
</template>

<script>
export default {
	data(){
		return{
			threatIdentification:[],
			assetsSign:[
				{type:'',sign:'',list:[]},
				{type:'重要硬件资产',sign:'YJ',list:[]},
				{type:'应用软件资产',sign:'RJ',list:[]},
				{type:'重要文档和数据资产',sign:'SJ',list:[]},
				{type:'重要人员',sign:'RY',list:[]},
				{type:'重要服务应用资产',sign:'FW',list:[]},
			],
		}
	},
	created() {
		this.findThreatList();
	},
	methods: {
		async findThreatList(){//获威胁识别
	       let res = await this.$api.rickReport_findThreat();
	       // console.log(res);
	       if(res.code==20000){
	       		
	       		this.threatDataHandle(res.data);
	       }else{
	         this.$message.error(res.messager);
	       }

	    },
	    threatDataHandle(data){//获取的资产数据变成table数据
	    	var arr = [];
	    	for(var i=0;i<data.length;i++){
	    		data[i].sign = '';
	    		for(var key in data[i]){
	    			if(key.indexOf('thr')==0&&key.length<=5){
	    				if(!data[i][key]){data[i][key]=''};
	    			}
	    		}
	    		this.assetsSign[data[i].groupType].list.push(data[i])
	    	}
	    	for(var i=0;i<this.assetsSign.length;i++){
	    		for(var r=0;r<this.assetsSign[i].list.length;r++){
	    			var sign = this.assetsSign[i].sign;
	    			var index = r+1;
	    			if(index<10){index = '0'+index};
	    			this.assetsSign[i].list[r].sign = sign+index;
	    			arr.push(this.assetsSign[i].list[r])
	    		}
	    	}
	    	// console.log(arr)
	    	this.threatIdentification = arr
	    },
	    getInputFocus(event) {//点击input全选内容
		   // console.log("event",event)
		    event.currentTarget.select();
		},
	    async saveBtn(row,index){//保存按钮

	    	for(var key in row){
	    		if(key.indexOf('thr')==0&&key.length<=5){
	    			if(!row[key]){return};
	    		}
	    	}
	    	console.log('save')
		    let res = await this.$api.rickReport_updateAssetsList(row);
		    if(res.code==20000){
		    	this.$message.success('保存成功！');
		    }else{
		      this.$message.error(res.messager);
		    }
	     
	    },
	    dClone(data){
	        return JSON.parse(JSON.stringify(data));
	    },
	}
}

</script>

<style scoped>
	>>>.el-input__inner{
	  padding:0 5px;
	  text-align: center;
	}
</style>
