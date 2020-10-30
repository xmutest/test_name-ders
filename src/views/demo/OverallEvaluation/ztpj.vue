<!--总体评价-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">总体评价</div>
            <d2-quill
              style="min-height: 200px; margin-bottom: 20px"
              v-model="fromdata.overallEvaluation"
              @text-change="textChangeHandler"
            />
          </div>
          <div class="tijiaobaoc">
            <el-button type="primary" @click="submitReport">保存</el-button>
          </div>
        </el-card>
      </div>
      <!-- 图片 -->
    </div>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      fromdata: {
        overallEvaluation: "",
      },
    };
  },
  created() {
    this.getEtlist();
  },
  methods: {
    textChangeHandler(delta, oldDelta, source) {
      // console.log(delta,oldDelta,source)
    },
     async getEtlist() {
      let List = await this.$api.API_ProjectfindOverallEvaluation();
      if (List.code === 20000) {
        if(List.data == null || List.data.overallEvaluation == null){
          this.fromdata.overallEvaluation = `
          <br/> 
            通过对信息系统基本安全保护状态的分析，广州泰康粤园医院有限公司针对广州泰康粤园医院医院信息系统面临的主要安全威胁采取了相应的安全机制，基本达到保护信息系统重要资产的作用。其中：（至少选择三个突出方面进行描述，总结+示例方式描述）
 <br/> <br/>
            在安全责任制方面，安全管理机构较为完善，责任明确。（从机构、人员的措施列举突出的具体的防护措施）
 <br/> <br/>
            在管理制度体系方面，已建立较为完整的信息安全保障制度体系。（从安全管理的制度层面列举突出的具体防护措施）
 <br/> <br/>
            在基础设施与网络环境方面，网络、主机层面采取充分的冗余措施并实施安全加固。（从物理、网络、主机层面列出的具体防护措施）
 <br/> <br/>
            在安全控制措施方面，在防攻击、防病毒、身份认证、审计方面措施较为完备。采取租用运营商流量清洗设备抵御拒绝服务攻击。针对网络设备和主机采取双因素认证结合堡垒机的防护体系。
 <br/> <br/>
            在数据保护方面，对关键数据和敏感数据分别采取完整性保护和加密措施，重要业务数据进行异地备份。
 <br/> <br/>
            在系统规划与建设方面，结合系统的安全需求设计方案，在定级、备案、测评、整改等方面严格按照等级保护的工作要求。
 <br/> <br/>
            在系统运维管理方面，已建立包括基础设施、应用、安全等各个层次的运维保障、监控和应急响应体系。

         
          `
        }else{
          this.fromdata.overallEvaluation = List.data.overallEvaluation

          // this.fromdata.id = List.data.id;
        }

        //查询列表
      } else {
        this.$message.error(List.message + "评测依据选项出差，请联系管理员");
      }
    },
    async submitReport() {
      let res = await this.$api.API_ProjectupdateOverallEvaluation(this.fromdata)
      
      if (res.code === 20000) {
        this.$message.success("修改成功！！");
        this.getEtlist();
        //查询列表
      } else {
        this.$message.error("错误，请联系管理员" + res.message);
      }
    },
  },
};
</script>

<style lang="scss">
.mude_is {
  margin: 20px 0;
  .mude_is_left {
    margin: 20px 0;
  }
  .to_tim {
    margin-top: 5px;
    .el-tag {
      margin-right: 5px;
    }
  }
  .descTItle {
    @extend %unable-border-left;
  }
}
.el-card__header {
  border-bottom: 0px solid #ebeef5;
}
</style>

