<!--层面间安全测评-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">导出问题确认单</div>
            <el-form
              ref="assessmentGroup"
              :model="assessmentGroup"
              :rules="rules"
              size="medium"
            >
              <el-form-item
                label-width="140px"
                label="报告日期："
                prop="reportTime"
                class="lisT3"
              > 
                <el-date-picker
                  v-model="assessmentGroup.reportTime"
                  type="date"
                  format="yyyy - MM - dd"
                  value-format="timestamp"
                  :style="{ width: '150px' }"
                  placeholder="请选择日期"
                ></el-date-picker>
              </el-form-item>

              <el-form-item
                label-width="100px"
                label="报告名称："
                prop="reportName"
                class="lst3"
              >
                <el-input
                  v-model="assessmentGroup.reportName"
                  placeholder="请输入报告名称："
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
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
      assessmentGroup: {
        // 报告名称()
        reportName: "",
        // 报告日期()
        reportTime: "",
      },
      rules: {
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
      this.assessmentGroup.reportTime = date.getTime();
      // ${this.xmu_info.data.systemName}
      console.log(this.xmu_info.data);
      this.assessmentGroup.reportName = `${this.xmu_info.data.evaluatedUnit}-${this.xmu_info.data.systemName}-问题确认单`;
    },
    async submitReport() {
      let url = `${process.env.VUE_APP_API}/word/differenceAnalysis`;
      let data = {
        url: url,
        data: {
          reportTime: this.assessmentGroup.reportTime,
          projectId: this.xmu_info.projectId,
        },
      };
      let res = await this.$api.API_problemConfirm(data);
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
          let reportName=`${this.assessmentGroup.reportName}.docx`
          link.download = reportName;
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
.demo-input-suffix {
  display: flex;
  align-items: center;
  flex-flow: wrap;
  div {
    margin: 5px;
    span {
      font-size: 12px;
      min-width: 80px;
    }
    .el-input {
      width: 220px;
    }
  }
}
.baseofUnits {
  width: 1200px;
  .el-dialog {
    width: 996px;
  }
  .descTItle {
    @extend %unable-border-left;
  }
}

.lisT1 {
  min-width: 250px;
  display: inline-block;
}
.lisT2 {
  min-width: 250px;
  display: inline-block;
}
.lisT3 {
  width: 285px;
  display: inline-block;
}
.lst3 {
  width: 50%;
  display: inline-block;
}
.dialogListTop {
  max-height: 450px;
  overflow: auto;
}
</style>

