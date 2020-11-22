<!--区域间安全测评-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">区域间安全测评</div>
            <el-input
              style="min-height: 200px; margin-bottom: 20px"
              type="textarea"
              :autosize="{ minRows: 10, maxRows: 15 }"
              placeholder="请输入内容"
              v-model="fromdata.interregional"
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
        interregional: "",
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
        if (List.data == null || List.data.interregional == null) {
          this.fromdata.interregional = `    区域间的安全测评主要考虑互连互通（包括物理上和逻辑上的互连互通等）的不同区域之间存在的安全功能增强、补充和削弱等关联作用，特别是有数据交换的两个不同区域。`;
        } else {
          this.fromdata.interregional = List.data.interregional;

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


