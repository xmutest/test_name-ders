<!-- 测评重点 -->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">对被测系统的基本判断</div>
            <el-input
              type="textarea"
              style="min-height: 200px; margin-bottom: 20px"
              :autosize="{ minRows: 10, maxRows: 15 }"
              placeholder="请输入内容"
              v-model="fromdata.basicJudgment"
            >
            </el-input>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">对方案中应关注的测评重点建议</div>
            <el-input
              type="textarea"
              style="min-height: 200px; margin-bottom: 20px"
              :autosize="{ minRows: 10, maxRows: 15 }"
              placeholder="请输入内容"
              v-model="fromdata.keySuggestions"
            >
            </el-input>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">对系统实施渗透测试的初步考虑</div>
            <div class="pc_gonjv">
              <el-input
                type="textarea"
                style="min-height: 200px; margin-bottom: 20px"
                :autosize="{ minRows: 10, maxRows: 15 }"
                placeholder="请输入内容"
                v-model="fromdata.infiltrationTestSuggestions"
              >
              </el-input>
            </div>
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
        id: "",
        //测评对象选择方法
        basicJudgment: "",
        //测评方法
        keySuggestions: "",
        //测评工具
        infiltrationTestSuggestions: "",
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
      let List = await this.$api.API_projectOverviewfindEvaluationFocus();
      if (List.code === 20000) {
        this.fromdata = List.data;
        //查询列表
      } else {
        this.$message.error(List.message + "测评依据选项出差，请联系管理员");
      }
    },
    async submitReport() {
      let res = await this.$api.API_evaluationBasis_updata(this.fromdata);
      if (res.code === 20000) {
         this.$message({
            type: "success",
            message: "修改成功！！",
            duration: 1000
          });
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