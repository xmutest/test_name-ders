<!--总体评价-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">安全状况描述</div>
            <el-input
              style="min-height: 200px; margin-bottom: 20px"
              type="textarea"
              :autosize="{ minRows: 20, maxRows: 35 }"
              placeholder="【填写说明：根据实际测评情况简要描述被测对象的整体安全状况，包括最主要的中高风险安全问题及数量和等级结论，建议不超过400字】"
              v-model="fromdata.safetyStatusDescription"
            >
            </el-input>
            <div>
              <p class="textLidateget">
                以下测评结论会在报告的安全状况描述的最后一段自动加上
              </p>
              <p class="dateget">
                {{ dateget }}
              </p>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      fromdata: {
        safetyStatusDescription: "",
      },
      dateget: "",
    };
  },
  created() {
    this.getEtlist();
  },
  computed: {
    ...mapState("d2admin", {
      xmu_info: (state) => state.xmu.xmu_info,
      info: (state) => state.user.info,
    }),
  },
  //   destroyed: function () {
  //     this.submitReport(1);
  //   },
  methods: {
    textChangeHandler(delta, oldDelta, source) {
      // console.log(delta,oldDelta,source)
    },
    //获取风险总数统计
    async dategetList() {
      let res = await this.$api.API_CalculateriskTotalNum();
      if (res.code === 20000) {
        let riskMap = res.data;
        let lts = "";
        if (riskMap.highRiskNum > 0) {
          lts = "高";
        } else if (riskMap.middleRiskNum > 0) {
          if (lts != "高") {
            lts = "中";
          }
        } else if (riskMap.lowRiskNum > 0) {
          if (lts != "高" && lts != "中") {
            lts = "低";
          }
        }
        this.dateget = `根据本次测评结果分析，${
          this.xmu_info.data.systemName
        }中存在${riskMap.highRiskNum}个高风险安全问题，${
          riskMap.middleRiskNum
        }个中风险安全问题，${riskMap.lowRiskNum}个低风险安全问题， 综合得分为${
          riskMap.totalFraction == undefined ? "无" : riskMap.totalFraction
        }，等级测评结论为${
          riskMap.fractionResult == undefined ? "无" : riskMap.fractionResult
        }。`;
        // this.dateget = `${
        //   this.xmu_info.data.systemName
        // }中存在不符合项或部分符合项，系统面临${lts}安全风险，本次测评的等级测评结论为${
        //   riskMap.fractionResult == undefined ? "无" : riskMap.fractionResult
        // }，综合得分为${
        //   riskMap.totalFraction == undefined ? "无" : riskMap.totalFraction
        // }分。`;
      }
    },
    async getEtlist() {
      let List = await this.$api.updafindSafetyStatusDescriptioniongeFile();
      if (List.code === 20000) {
        this.dategetList();
        // if (List.data == null || List.data.safetyStatusDescription == null) {
        //   this.fromdata.safetyStatusDescription = `    `;
        // } else {
        this.fromdata.safetyStatusDescription =
          List.data.safetyStatusDescription;
        this.fromdata.id = List.data.id;
        // }
        //查询列表
      } else {
        this.$message.error(List.message + "测评依据选项出差，请联系管理员");
      }
    },
    async submitReport(it) {
      this.fromdata.safetyStatusDescription = `    ${this.fromdata.safetyStatusDescription.trim()}`;
      let res = await this.$api.updateSafetyStatusDescriptiongeFile(
        this.fromdata
      );

      if (res.code === 20000) {
        if (it !== 1) {
          this.$message({
            type: "success",
            message: "修改成功！！",
            duration: 1000,
          });
          this.getEtlist();
        }

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
.textLidateget {
  color: red;
  font-size: 12px;
}
.dateget {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>

