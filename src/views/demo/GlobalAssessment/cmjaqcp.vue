<!--层面间安全测评-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">层面间安全测评</div>
            <el-input
              style="min-height: 200px; margin-bottom: 20px"
              type="textarea"
              :autosize="{ minRows: 10, maxRows: 15 }"
              placeholder="请输入内容"
              v-model="fromdata.betweenLayers"
            >
            </el-input>
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
        betweenLayers: "",
        id: "",
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
      let List = await this.$api.API_WholeEvaluationFindWholeEvaluation();
      if (List.code === 20000) {
        if (List.data == null || List.data.betweenLayers == null) {
          this.fromdata.betweenLayers = `    层面间的安全测评主要考虑同一区域内的不同层面之间存在的功能增强、补充和削弱等关联作用。安全功能上的增强和补充可以使两个不同层面上的安全控制发挥更强的综合效能，可以使单个低等级安全控制在特定环境中达到高等级信息系统的安全要求。安全功能上的削弱会使一个层面上的安全控制影响另一个层面安全控制的功能发挥或者给其带来新的脆弱性。 
    安全物理环境、安全通信网络、安全区域边界、安全计算环境、安全管理中心、安全管理制度、安全管理机构、安全管理人员、安全建设管理、安全运维管理等同一区域内的不同层面之间不存在的功能增强、补充和削弱等关联作用。`;
        } else {
          this.fromdata.betweenLayers = List.data.betweenLayers;

          this.fromdata.id = List.data.id;
        }
        //查询列表
      } else {
        this.$message.error(List.message + "评测依据选项出差，请联系管理员");
      }
    },
    async submitReport() {
      let res = "";
      if (this.fromdata.id) {
        // 修改
        res = await this.$api.API_WholeEvaluationUpdateWholeEvaluation(
          this.fromdata
        );
      } else {
        // 保存
        res = await this.$api.API_WholeEvaluationSaveWholeEvaluation(
          this.fromdata
        );
      }
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

<style lang="scss" scoped>
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

