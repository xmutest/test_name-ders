<!--层面间安全测评-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">项目计划书</div>
            <el-form
              ref="assessmentGroup"
              :model="assessmentGroup"
              :rules="rules"
              size="medium"
              label-width="120px"
              label-position="left"
            >
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="项目组长" prop="ahshg">
                    <el-input
                      v-model="assessmentGroup.ahshg"
                      placeholder="请输入项目组长"
                      clearable
                      :style="{ width: '100%' }"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="质量监督人" prop="qualitySupervisor">
                    <el-input
                      v-model="assessmentGroup.qualitySupervisor"
                      placeholder="请输入质量监督人"
                      clearable
                      :style="{ width: '100%' }"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="技术测试组人员"
                    prop="technologyEvaluationTeam"
                  >
                    <el-input
                      v-model="assessmentGroup.technologyEvaluationTeam"
                      placeholder="请输入技术测试组人员"
                      clearable
                      :style="{ width: '100%' }"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="管理评估组人员"
                    prop="manageEvaluationTeam"
                  >
                    <el-input
                      v-model="assessmentGroup.manageEvaluationTeam"
                      placeholder="请输入管理评估组人员"
                      clearable
                      :style="{ width: '100%' }"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="渗透测试组人员"
                    prop="penetrationTestTeam"
                  >
                    <el-input
                      v-model="assessmentGroup.penetrationTestTeam"
                      placeholder="请输入渗透测试组人员"
                      clearable
                      :style="{ width: '100%' }"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-col :span="12">
                <el-form-item label="备案证明编号：" prop="recordSn">
                  <el-input
                    v-model="assessmentGroup.recordSn"
                    placeholder="请输入备案证明编号："
                    :style="{ width: '100%' }"
                    :disabled="this.info.user_info.companyCode ? true : false"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="报告日期："
                  class="kstlis"
                  prop="reportTime"
                >
                  <el-date-picker
                    v-model="assessmentGroup.reportTime"
                    type="date"
                    :style="{ width: '70%' }"
                    format="yyyy - MM - dd"
                    value-format="timestamp"
                    placeholder="请选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="报告名称：" prop="reportName">
                  <el-input
                    v-model="assessmentGroup.reportName"
                    placeholder="请输入报告名称："
                    :style="{ width: '100%' }"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="24">
                <el-form-item label="报告编号：" prop="reportNum">
                  <el-input
                    v-model="assessmentGroup.reportNum"
                    placeholder="请输入报告编号："
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
          <div class="tijiaobaoc">
            <el-button type="primary" @click="submitReport">导出</el-button>
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
      //测评组
      assessmentGroup: {
        ahshg: undefined,
        qualitySupervisor: undefined,
        technologyEvaluationTeam: undefined,
        manageEvaluationTeam: undefined,
        penetrationTestTeam: undefined,
        // 报告编号()
        reportNum: "",
        // 备案证明编号()
        recordSn: "",
        // 报告名称()
        reportName: "",
        // 报告日期()
        reportTime: "",
      },
      rules: {
        recordSn: [
          {
            required: true,
            message: "请输入备案证明编号",
            trigger: "blur",
          },
        ],
        reportNum: [
          {
            required: true,
            message: "请输入报告编号",
            trigger: "blur",
          },
        ],
        reportName: [
          {
            required: true,
            message: "请输入报告名称",
            trigger: "blur",
          },
        ],
        reportTime: [
          {
            required: true,
            message: "请选择报告日期",
            trigger: "change",
          },
        ],
        ahshg: [
          {
            required: true,
            message: "请输入单行文本项目组长",
            trigger: "blur",
          },
        ],
        qualitySupervisor: [
          {
            required: true,
            message: "请输入质量监督人",
            trigger: "blur",
          },
        ],
        technologyEvaluationTeam: [
          {
            required: true,
            message: "请输入技术测试组人员",
            trigger: "blur",
          },
        ],
        manageEvaluationTeam: [
          {
            required: true,
            message: "请输入管理评估组人员",
            trigger: "blur",
          },
        ],
        penetrationTestTeam: [
          {
            required: true,
            message: "请输入渗透测试组人员",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getEtlist();
  },
  computed: {
    ...mapState("d2admin", {
      info: (state) => state.user.info,
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  methods: {
    async getEtlist() {
      var date = new Date();
      let dataTs = date.getFullYear() + "";
      let res = await this.$api.API_findEvaluationTeam();
      if (res.code === 20000) {
        this.assessmentGroup = res.data;
      }
      this.assessmentGroup.reportTime = date.getTime();
      if (this.info.user_info.companyCode != null) {
        let lst = `${this.xmu_info.data.recordSn}-${dataTs.substring(
          2,
          4
        )}-${this.info.user_info.companyCode.substring(
          this.info.user_info.companyCode.length - 6
        )}`;
        let Nmas = `${this.xmu_info.data.evaluatedUnit}_${this.xmu_info.data.systemName}项目计划书`;
        this.assessmentGroup.reportNum = lst;
        this.assessmentGroup.recordSn = this.xmu_info.data.recordSn;
        this.assessmentGroup.reportName = Nmas;
      }

      // console.log(date.getTime());
    },
    async submitReport() {
      let url = `${process.env.VUE_APP_API}/word/missionPlan`;
      let data = {
        url: url,
        data: {
          ...this.assessmentGroup,
          projectId: this.xmu_info.projectId,
        },
      };
      let res = await this.$api.SYS_reportWord_DownLoadDocpost(data);
      if (res.code == 500) {
        alert(res.message);
      } else {
        let blob = new Blob([res], {
          type:
            "application/msword;application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8",
        });

        //浏览器兼容，Google和火狐支持a标签的download，IE不支持
        if (window.navigator && window.navigator.msSaveBlob) {
          //IE浏览器、微软浏览器
          /* 经过测试，微软浏览器Microsoft Edge下载文件时必须要重命名文件才可以打开，
              IE可不重命名，以防万一，所以都写上比较好 */
          window.navigator.msSaveBlob(blob, val.fileName);
        } else {
          //其他浏览器
          let link = document.createElement("a"); // 创建a标签
          link.style.display = "none";
          let objectUrl = URL.createObjectURL(blob);
          link.download = this.assessmentGroup.reportName;
          link.href = objectUrl;
          link.click();
          URL.revokeObjectURL(objectUrl);
        }
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

.kstlis {
  margin-left: 10px;
}
</style>

