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
              :autosize="{ minRows: 20, maxRows: 35 }"
              placeholder="请输入内容"
              v-model="fromdata.overallEvaluation"
            >
            </el-input>
            <div> 
              <p class="textLidateget">
                以下测评结论会在报告的总体评价的最后一段自动加上
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
        overallEvaluation: "",
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
  destroyed: function () {
    this.submitReport(1);
  },
  methods: {
    textChangeHandler(delta, oldDelta, source) {
      // console.log(delta,oldDelta,source)
    },
    //获取风险总数统计
    async dategetList() {
      let res = await this.$api.API_CalculateriskTotalNum();
      console.log(res);
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
        this.dateget = `${this.xmu_info.data.systemName}中存在不符合项或部分符合项，系统面临${lts}安全风险，本次测评的等级测评结论为${riskMap.fractionResult==undefined?'无':riskMap.fractionResult}，综合得分为${riskMap.totalFraction==undefined?'无':riskMap.totalFraction}分。`;
      }
    },
    async getEtlist() {
      let List = await this.$api.API_ProjectfindOverallEvaluation();
      if (List.code === 20000) {
        this.dategetList();
        if (List.data == null || List.data.overallEvaluation == null) {
          this.fromdata.overallEvaluation = `    为贯彻落实《中华人民共和国网络安全法》等相关法律、法规和标准对网络安全等级测评工作的要求，${this.xmu_info.data.evaluatedUnit}特委托${this.info.user_info.companyName}对其${this.xmu_info.data.systemName}实施网络安全等级测评。通过对安全物理环境、安全通信网络、安全区域边界、安全计算环境、安全管理中心、安全管理制度、安全管理机构、安全管理人员、安全建设管理、安全运维管理十个方面的安全措施测试评估，数据分析。${this.xmu_info.data.systemName}安全保护状况描述如下：`;
        } else {
          this.fromdata.overallEvaluation = List.data.overallEvaluation;

          // this.fromdata.id = List.data.id;
        }

        //查询列表
      } else {
        this.$message.error(List.message + "测评依据选项出差，请联系管理员");
      }
    },
    async submitReport(it) {
      let res = await this.$api.API_ProjectupdateOverallEvaluation(
        this.fromdata
      );

      if (res.code === 20000) {
        if (it !== 1) {
           this.$message({
            type: "success",
            message: "修改成功！！",
            duration: 1000
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

