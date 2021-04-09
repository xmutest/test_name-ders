<!--层面间安全测评-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">导出评审记录</div>
            <el-table :data="pcLinfotabList" border style="width: 100%">
              <el-table-column label="评审意见">
                <template slot-scope="scope">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    readonly
                    v-model="scope.row.reviewOpinion"
                  >
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column label="评审人员" width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.userName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="时间" width="150">
                <template slot-scope="scope">
                  {{ scope.row.reviewFirstTime }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="submitReport(scope.row, 1)"
                    >导出初审</el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="submitReport(scope.row, 2)"
                    >导出终审</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
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
      pcLinfotabList: [],
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
    // 查询评审记录列表
    async userreviewFind() {
      let res = await this.$api.userreviewFind({
        projectId: this.xmu_info.projectId,
      });
      this.pcLinfotabList = res.data;
    },
    async getEtlist() {
      // ${this.xmu_info.data.systemName}
      this.assessmentGroup.reportName = `${this.xmu_info.data.evaluatedUnit}测评报告评审记录`;
      this.userreviewFind();
    },
    async submitReport(row, item) {
      let data = {
        projectId: this.xmu_info.projectId,
        type: item,
        id: row.id,
      };
      let Listname = item == 1 ? "初审" : "终审";
      let reportName = `${this.assessmentGroup.reportName}_${Listname}`;
      let res = await this.$api.API_reviewFirstfirm(data);
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
.xiazaiList {
  cursor: pointer;
  color: cornflowerblue;
  display: inline-block;
}
.xiazaiList:hover {
  color: red;
  border-bottom: red solid 1px;
}
</style>

