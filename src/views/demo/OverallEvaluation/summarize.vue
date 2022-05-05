<!--概述-->
<template>
  <d2-container>
    <el-form ref="ruleForm" :model="form" label-width="110px" :rules="rules" class="mainForm">
      <el-alert title="评估报告概述" type="success" :closable="false"></el-alert>
      <el-form-item label="评估起止日期" prop="time">
        <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="form.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="评估结论" prop="result">
        <el-input size="medium" v-model="form.result" type="textarea" :rows="12"></el-input>
      </el-form-item>
      <el-form-item label="评估概述" prop="summary">
        <el-input size="medium" v-model="form.summary" type="textarea" :rows="12"></el-input>
      </el-form-item>
      <div class="btnBox">
        <el-button type="success" size="small" @click="submitForm('ruleForm')">保存</el-button>
      </div>
      <el-alert title="评估人员构成" type="success" :closable="false"></el-alert>  
      <el-table
        border
        :data="riskAssessorTable"
        style="width: 100%">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.name" clearable :disabled="!scope.row.isEdited"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="项目角色" width="180">
          <!-- <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.role" placeholder="选择角色" :disabled="!scope.row.isEdited">
              <el-option v-for="item in roleList" :label="item" :value="item" :key="item"></el-option>
            </el-select>
          </template> -->
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.role" clearable :disabled="!scope.row.isEdited"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="参与内容">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.content" :disabled="!scope.row.isEdited"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template slot="header" slot-scope="scope">
            <el-button @click="addRoleBtn(scope.row)" type="success" size="mini">新增</el-button>
          </template>
          <template slot-scope="scope">
            <el-button v-if="!scope.row.isEdited" type="default" size="mini" @click="editRoleBtn(scope.row,scope.$index)">编辑</el-button>
            <el-button v-if="scope.row.isEdited" type="default" size="mini" @click="saveRoleBtn(scope.row)">保存</el-button>
            <el-button @click="delRoleBtn(scope.row,scope.$index)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
    </el-form>
  </d2-container>
</template>

<script>
  function onlyNum(value) {
    value=value.replace(/[^0-9.]/g,'')
  }
export default {
	data() {
	    return {
        
	    	form:{
            time:[],
            beginTime:'',
            endTime:'',
            result:'',
            summary:'',
	    	},
	    	rules:{
	    	  time:[
            { required: true, message: '请输入评估起止日期', trigger: 'blur' },
	    	  ],
          result:[
            { required: true, message: '请输入评估结论', trigger: 'blur' },
          ],
          summary:[
            { required: true, message: '请输入评估概述', trigger: 'blur' },
          ],
	    	},
        riskAssessorSave:true,//true就执行save false就执行update
        riskAssessorTable:[],
        roleList:['甲方项目负责人','乙方项目负责人','甲方项目联络人','项目经理','应用系统检测','文档管理','甲方相关人员',],
        oRiskAssessor:[
          {name: '',role: '甲方项目负责人',content: '被评估机构项目负责人',isAdd:1,projectId:this.projectId,isEdited:1},
          {name: '',role: '乙方项目负责人',content: '评估机构项目负责人',isAdd:1,projectId:this.projectId,isEdited:1},
          {name: '',role: '甲方项目联络人',content: '负责甲方项目协调工作，配合整体调研工作。',isAdd:1,projectId:this.projectId,isEdited:1},
          {name: '',role: '项目经理',content: '负责项目方案、计划、总结、报告起草；资产调研与分析、人员、组织、策略、数据存储、现有措施的调研；差距分析、脆弱点、威胁风险、风险值计算。',isAdd:1,projectId:this.projectId,isEdited:1},
          {name: '',role: '应用系统检测',content: '应用系统和服务器操作系统、数据库系统的配置策略；账号、权限、日志审计策略的调研。',isAdd:1,projectId:this.projectId,isEdited:1},
          {name: '',role: '文档管理',content: '现状调研及信息资产表的收集整理、统计；文档归档。',isAdd:1,projectId:this.projectId,isEdited:1},
          {name: '',role: '甲方相关人员',content: '针对发现的安全漏洞，选择适当的攻击工具及方法，模拟入侵行为；汇总测试过程的安全漏洞。',isAdd:1,projectId:this.projectId,isEdited:1},
        ],
      
	   }
	},
	created() {
    this.getProjectId();
    this.getDetail();
    this.getEvaluateUser();

    
	},
  mounted() {

  },
	methods: {
    async getProjectId(){
      var projectId = await this.$api.rickReport_ProjectId();
      this.projectId = projectId;
    },
    async getDetail() {//获取概述详情

      let res = await this.$api.rickReport_ProjectDetail();
      // console.log(res);
      if(res.code==20000){
        res.data.time = [res.data.endTime,res.data.endTime]
        this.form = res.data;
      }else{
        this.$message.error(res.messager);
      }

    },
    async saveDetail() {//保存概述详情

      this.form.beginTime = this.form.time[0]
      this.form.endTime = this.form.time[1]

      let res = await this.$api.rickReport_SaveProjectDetail(this.form);
      // console.log(res);
      if(res.code==20000){
        // this.form = res.data;
        this.$message.success('保存概述成功');
      }else{
        this.$message.error(res.messager);
      }

    },
    async getEvaluateUser() {//获取人员列表
      let res = await this.$api.rickReport_EvaluateUser();
      // console.log(res);
      if(res.code==20000){

        if(res.data.length!=0){
          res.data.forEach((item,index)=>{
            item.isEdited = 0;
          })
          this.riskAssessorTable = res.data;
          this.riskAssessorSave = false;
        }else{
          this.riskAssessorTable = this.oRiskAssessor
        }
      }else{
        this.$message.error(res.messager);
      }
    },
    addRoleBtn(){//新增人员按钮
      this.riskAssessorTable.push({name: '',role: '',content: '',isAdd:1,projectId:this.projectId,isEdited:1})
    },
    editRoleBtn(row,index){//编辑人员按钮
      this.riskAssessorTable[index].isEdited = 1;
      // console.log(this.riskAssessorTable)
    },
    saveRoleBtn(row,index){//保存人员按钮
      console.log(row.isAdd)
      if(row.isAdd){
        this.saveRole(row,index)
      }else{
        this.updateRole(row,index)
      }
    },
    async saveRole(row,index){//保存人员（单个）

      let res = await this.$api.rickReport_EvaluateUserSave([row]);
      if(res.code==20000){
        this.$message.success('新增人员成功！');
        this.getEvaluateUser();
      }else{
        this.$message.error(res.messager);
      }
    },
    async updateRole(row,index){//更新人员信息（单个）
      let res = await this.$api.rickReport_EvaluateUserUpdate(row);
      // console.log(res);
      if(res.code==20000){
        this.$message.success('修改人员成功！');
        this.getEvaluateUser();
      }else{
        this.$message.error(res.messager);
      }
    },
    delRoleBtn(row,index){//删除人员按钮
      console.log(row)
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if(row.isAdd==1){
            this.$message.success('删除成功！');
            this.riskAssessorTable.splice(index,1)
          }else{
            this.delRole(row,index);
          }
        })
        .catch(() => {})
      
    },
    async delRole(row,index){//删除人员
      let res = await this.$api.rickReport_EvaluateUserDel({id:row.id});
      // console.log(res);
      if(res.code==20000){
        this.$message.success('删除成功！');
        this.riskAssessorTable.splice(index,1)
      }else{
        this.$message.error(res.messager);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
      if (valid) {

        this.saveDetail();//保存概述
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  },
	},

}


</script>

<style lang="scss" scoped>
.mainForm{
  // max-width: 1000px;
}
.el-alert{
  margin-bottom: 20px;
}
::v-deep .el-input__inner{
  padding:0 5px;
  text-align: center;
}
.btnBox{
  float: right;
  button{
    margin: 10px 0 20px;
  }
}
.el-input.is-disabled .el-input__inner{
  background-color: #fff!important;
  border-color: #fff;
  color:#999;
}
.el-input.is-disabled .el-input__icon{
  display: none;
}
</style>
