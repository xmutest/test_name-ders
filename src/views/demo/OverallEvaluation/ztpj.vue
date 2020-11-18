<!--总体评价-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">总体评价</div>
            <el-input
              style="min-height: 200px; margin-bottom: 20px"
              type="textarea"
              :autosize="{ minRows: 10, maxRows: 15 }"
              placeholder="请输入内容"
              v-model="fromdata.overallEvaluation"
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
import { mapState } from "vuex";
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
  computed: {
    ...mapState("d2admin", {
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  methods: {
  
    textChangeHandler(delta, oldDelta, source) {
      // console.log(delta,oldDelta,source)
    },
    async getEtlist() {
      console.log(this.xmu_info);
      let List = await this.$api.API_ProjectfindOverallEvaluation();
      if (List.code === 20000) {
        if (List.data == null || List.data.overallEvaluation == null) {
          this.fromdata.overallEvaluation = `
          通过对信息系统基本安全保护状态的分析，${this.xmu_info.data.evaluatedUnit}针对${this.xmu_info.data.systemName}面临的主要安全威胁采取了相应的安全机制，基本达到保护信息系统重要资产的作用。其中：
          `;
        } else {
          this.fromdata.overallEvaluation = List.data.overallEvaluation;

          // this.fromdata.id = List.data.id;
        }

        //查询列表
      } else {
        this.$message.error(List.message + "评测依据选项出差，请联系管理员");
      }
    },
    async submitReport() {
      let res = await this.$api.API_ProjectupdateOverallEvaluation(
        this.fromdata
      );

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

