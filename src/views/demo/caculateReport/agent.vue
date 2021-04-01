<!--层面间安全测评-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">项目基本信息</div>
            <div class="jineginfo">
              <div>
                <span>项目名称：</span
                ><span>{{ xmu_info.data.projectName }}</span>
              </div>
              <div>
                <span>系统名称：</span
                ><span>{{ xmu_info.data.systemName }}</span>
              </div>
              <div>
                <span>被测单位：</span
                ><span>{{ xmu_info.data.evaluatedUnit }}</span>
              </div>
              <div>
                <span>备案证号码：</span
                ><span>{{ xmu_info.data.recordSn }}</span>
              </div>
              <div>
                <el-table :data="tabList" border style="width: 100%">
                  <el-table-column label="报告文件名">
                    <template slot-scope="scope">
                      <span class="xiazaiList" @click="submitReport(scope.row, 1)">{{
                        scope.row.fileName
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="备案证">
                    <template slot-scope="scope">
                      <span class="xiazaiList" @click="submitReport(scope.row, 2)">{{
                        scope.row.recordName
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="备注">
                    <template slot-scope="scope">
                      {{ scope.row.remarks }}
                    </template>
                  </el-table-column>
                  <el-table-column label="上传人姓名" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.userName }}
                    </template>
                  </el-table-column>
                  <el-table-column label="上传时间" width="150">
                    <template slot-scope="scope">
                      {{ scope.row.uploadTime }}
                    </template>
                  </el-table-column>
                  <!-- <el-table-column label="操作"> </el-table-column> -->
                </el-table>
              </div>
            </div>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">评审记录列表</div>
            <div class="jineginfo"></div>
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
      tabList: [],
    };
  },
  created() {
    this.revifindListok();
    // this.getEtlist();
  },
  computed: {
    ...mapState("d2admin", {
      info: (state) => state.user.info,
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  methods: {
    // 获取列表
    async revifindListok() {
      let res = await this.$api.revifindListok({
        projectId: this.xmu_info.projectId,
      });
      if (res.code == 20000) {
        this.tabList = res.data;
      }
    },
    // async getEtlist() {
    //   var date = new Date();
    //   this.assessmentGroup.reportTime = date.getTime();
    //   // ${this.xmu_info.data.systemName}
    //   this.assessmentGroup.reportName = `${this.xmu_info.data.evaluatedUnit}_问题确认单`;
    // },
    async submitReport(val, ids) {
      console.log(val);
      //  下载报告
      let url = "";
      let fileName = "";
      if (ids == 1) {
        url = `${val.fileUrl}`;
        fileName = `${val.fileName}`;
      } else if (ids == 2) {
        url = `${val.recordUrl}`;
        fileName = `${val.recordName}`;
      }
      let res = await this.$api.SYS_reportWord_DownLoadDoc({ url });
      let blob = new Blob([res], {
        type: "application/msword;charset=utf-8",
      });

      //浏览器兼容，Google和火狐支持a标签的download，IE不支持
      if (window.navigator && window.navigator.msSaveBlob) {
        //IE浏览器、微软浏览器
        /* 经过测试，微软浏览器Microsoft Edge下载文件时必须要重命名文件才可以打开，
              IE可不重命名，以防万一，所以都写上比较好 */
        window.navigator.msSaveBlob(blob, fileName);
      } else {
        //其他浏览器
        let link = document.createElement("a"); // 创建a标签
        link.style.display = "none";
        let objectUrl = URL.createObjectURL(blob);
        link.download = fileName;
        link.href = objectUrl;
        link.click();
        URL.revokeObjectURL(objectUrl);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.xiazaiList{
  cursor: pointer;
  color: cornflowerblue;
}
.xiazaiList:hover{
  color: red;
  border-bottom: red solid 1px;
}
.jineginfo {
  margin-left: 10px;
  div {
    margin: 15px 0;
  }
}
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

