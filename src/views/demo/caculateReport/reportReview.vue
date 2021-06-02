<!--层面间安全测评-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="">
            <div class="descTItle">
              <div>审核列表</div>
              <div class="boot_an">
                <el-button
                  type="primary"
                  @click="kslistdatafy = true"
                  size="mini"
                  >提交审核</el-button
                >
              </div>
            </div>
            <div class="">
              <el-table :data="tabList" border style="width: 100%">
                <el-table-column label="类型" width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.fileType == 1 ? "报告" : "方案" }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="审核材料">
                  <template slot-scope="scope">
                    <span
                      class="xiazaiList"
                      v-for="item in scope.row.reportReviewModels"
                      :key="item.id"
                      @click="submitReport(item, 1)"
                      >{{ item.fileName }}</span
                    >
                  </template>
                </el-table-column>

                <el-table-column label="备注" width="150">
                  <template slot-scope="scope">
                    {{ scope.row.remarks }}
                  </template>
                </el-table-column>
                <el-table-column label="上传人姓名" width="150">
                  <template slot-scope="scope">
                    {{ scope.row.userName }}
                  </template>
                </el-table-column>
                <el-table-column label="上传时间" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.uploadTime }}
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="delectinfo(scope.row)"
                      type="danger"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
                <!-- <el-table-column label="操作"> </el-table-column> -->
              </el-table>
            </div>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">
              <div>方案评审记录列表</div>
              <div class="boot_an">
                <el-button
                  type="primary"
                  v-if="info.userTypeId == 10"
                  @click="addListks(2)"
                  size="mini"
                  >新建方案评审记录</el-button
                >
              </div>
            </div>
            <el-table :data="fanganfotabList" border style="width: 100%">
              <el-table-column label="评审过程记录">
                <template slot-scope="scope">
                  <!-- <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    readonly
                    v-model="scope.row.reviewRecord"
                  >
                  </el-input> -->
                  <pre>{{ scope.row.reviewRecord }}</pre>
                </template>
              </el-table-column>
              <el-table-column label="评审意见">
                <template slot-scope="scope">
                  <!-- <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    readonly
                    v-model="scope.row.reviewOpinion"
                  >
                  </el-input> -->
                  <pre>{{ scope.row.reviewOpinion }}</pre>
                </template>
              </el-table-column>
              <el-table-column label="附件">
                <template slot-scope="scope">
                  <p
                    v-for="item in scope.row.reportReviewModels"
                    @click="submitReport(item, 1)"
                    class="xiazaiList"
                    :key="item.id"
                  >
                    {{ item.fileName }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="审核人" width="100">
                <template slot-scope="scope">
                  {{ scope.row.userName }}
                </template>
              </el-table-column>
              <el-table-column label="时间" width="150">
                <template slot-scope="scope">
                  {{ scope.row.time }}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">
              <div>报告评审记录列表</div>
            </div>
            <el-table :data="pcLinfotabList" border style="width: 100%">
              <el-table-column label="评审过程记录">
                <template slot-scope="scope">
                  <pre>{{ scope.row.reviewRecord }}</pre>
                  <!-- <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    readonly
                    v-model="scope.row.reviewRecord"
                  >
                  </el-input> -->
                </template>
              </el-table-column>
              <el-table-column label="评审意见">
                <template slot-scope="scope">
                  <pre>{{ scope.row.reviewOpinion }}</pre>
                  <!-- <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    readonly
                    v-model="scope.row.reviewOpinion"
                  >
                  </el-input> -->
                </template>
              </el-table-column>
              <el-table-column label="附件">
                <template slot-scope="scope">
                  <p
                    v-for="item in scope.row.reportReviewModels"
                    @click="submitReport(item, 1)"
                    class="xiazaiList"
                    :key="item.id"
                  >
                    {{ item.fileName }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="审核人" width="100">
                <template slot-scope="scope">
                  {{ scope.row.userName }}
                </template>
              </el-table-column>
              <el-table-column label="时间" width="150">
                <template slot-scope="scope">
                  {{ scope.row.reviewFirstTime }}
                </template>
              </el-table-column>

              <!-- <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="infodeiList(scope.row)"
                    type="primary"
                    >详细</el-button
                  >
                </template>
              </el-table-column> -->
            </el-table>
          </div>
        </el-card>
      </div>

      <el-dialog
        title="新建审核"
        :visible.sync="kslistdatafy"
        :close-on-click-modal="false"
        width="800px"
      >
        <el-form
          ref="form"
          :model="formsendType"
          label-position="left"
          label-width="120px"
        >
          <el-form-item label="审核类型">
            <el-radio-group v-model="formsendType.sendType">
              <el-radio :label="1">报告</el-radio>
              <el-radio :label="3">方案</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核材料">
            <el-upload
              class="upload-demo"
              action
              :limit="10"
              :file-list="formFileList"
              :on-exceed="formHandleExceed"
              :on-remove="formFileListRemove"
              :before-upload="beforeUploadForm"
              :auto-upload="false"
              :on-change="fileChangeformFileList"
              multiple
            >
              <el-button size="mini" type="primary">上传</el-button>
              <span style="color: red; font-size: 12px; margin-left: 5px"
                >（请上传压缩包，包含要审核的测评方案或测评报告，备案证，定级报告）</span
              >
            </el-upload>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 12 }"
              placeholder="请输入内容"
              v-model="formsendType.projemList"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div class="tijiaobaoc">
          <el-button type="info" @click="kslistdatafy = false">取消</el-button>
          <el-button type="success" @click="submitUpload">提交审核</el-button>
        </div>
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      kslistdatafy: false,
      formMaxSize: 10, // 上传文件大小
      formFileList: [], // 显示评测上传文件
      uploadFormFileList: [], // 确定上传文件，
      formpanFileList: [], // 显示备案证上传文件

      tabList: [],
      pcLinfotabList: [],
      // 文件类型
      formsendType: {
        sendType: 1,
        projemList: "",
      },
      fanganfotabList: [],
    };
  },
  created() {
    this.revifindListok();
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
      let refangan = await this.$api.userreviewfindPlan({
        projectId: this.xmu_info.projectId,
      });
      this.fanganfotabList = refangan.data;
    },
    // 获取列表
    async revifindListok() {
      let res = await this.$api.revifindListok({
        projectId: this.xmu_info.projectId,
      });
      if (res.code == 20000) {
        this.tabList = res.data;
      }
      this.userreviewFind();
    },
    // 开始上传前验证
    beforeUploadForm(file) {
      // 验证文件大小
      if (file.size / 1024 / 1024 > this.formMaxSize) {
        this.$message({
          message: `上传文件大小不能超过${this.formMaxSize}M!`,
          type: "warning",
        });
        return false;
      }
      // 中文乱码处理
      if (file.raw) {
        let reader = new FileReader(); // 读取文件内容
        reader.readAsText(file.raw, "gb2312"); // 防止中文乱码问题，不加reader.onload方法都不会触发
        reader.onload = function (e) {
          this.contentHtml = e.target.result; // txt文本内容，接下来就可以对其进行校验处理了
        };
      }
      // 验证文件类型
      // var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      // const extension =
      //   testmsg === "xlsx" || testmsg === "xls" || testmsg === "csv";
      // if (!extension) {
      //   this.$message({
      //     message: "上传文件只能是xlsx/xls/csv格式!",
      //     type: "warning",
      //   });
      // }
      // return extension;
    },
    // 移除备评测列表中文件
    formFileListRemove(file, formFileList) {
      let thiz = this;
      for (let i = 0; i < thiz.formFileList.length; i++) {
        if (thiz.formFileList[i].name === file.name) {
          thiz.formFileList.splice(i, 1);
          break;
        }
      }
    },
    // 移除备案证列表中文件
    formHandleRemove(file, formpanFileList) {
      let thiz = this;
      for (let i = 0; i < thiz.formpanFileList.length; i++) {
        if (thiz.formpanFileList[i].name === file.name) {
          thiz.formpanFileList.splice(i, 1);
          break;
        }
      }
    },
    // 允许上传文件个数验证
    formHandleExceed(files, formFileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + formFileList.length
        } 个文件`
      );
    },
    // 删除
    delectinfo(item) {
      console.log(item);
      this.$confirm("确定删除此记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let ids = [];
          item.reportReviewModels.forEach((item) => {
            ids.push(item.id);
          });
          if (ids.length == 0) {
            ids.push(item.id);
          }
          let res = await this.$api.userdelFilePlan(ids);
          if (res.code === 20000) {
            this.$message.success("删除成功！！");
            this.revifindListok();
            //查询列表
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async submitUpload() {
      let loading = this.$loading({
        lock: true,
        text: "提交数据中，请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let thiz = this;
      let formData = new FormData();
      if (thiz.formFileList.length !== 0) {
        thiz.formFileList.forEach((file) => {
          formData.append("files", file);
        });
      }
      if (thiz.formpanFileList.length !== 0) {
        thiz.formpanFileList.forEach((file) => {
          formData.append("file", file);
        });
      }
      formData.append("projectId", thiz.xmu_info.projectId);
      formData.append("remarks", thiz.formsendType.projemList);
      formData.append("userName", thiz.info.name);
      formData.append("sendType", thiz.formsendType.sendType);
      let res = await thiz.$api.reviewloadBook(formData);
      if (res.code == 20000) {
        loading.close();
        this.$message({
          message: "上传文件成功",
          type: "success",
        });
        this.$api.API_reportFirstdatem({
          projectId: thiz.xmu_info.projectId,
          userName: this.info.name,
        });
        this.formFileList = [];
        this.formpanFileList = [];
        this.projemList = "";
        this.kslistdatafy = false;
        this.revifindListok();
      } else {
      }
      loading.close();
    },
    async submitReport(val, ids) {
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
      window.open(url);
      // let res = await this.$api.SYS_reportWord_DownLoadDoc({ url });
      // let blob = new Blob([res], {
      //   type: "application/msword;charset=utf-8",
      // });

      // //浏览器兼容，Google和火狐支持a标签的download，IE不支持
      // if (window.navigator && window.navigator.msSaveBlob) {
      //   //IE浏览器、微软浏览器
      //   /* 经过测试，微软浏览器Microsoft Edge下载文件时必须要重命名文件才可以打开，
      //         IE可不重命名，以防万一，所以都写上比较好 */
      //   window.navigator.msSaveBlob(blob, fileName);
      // } else {
      //   //其他浏览器
      //   let link = document.createElement("a"); // 创建a标签
      //   link.style.display = "none";
      //   let objectUrl = URL.createObjectURL(blob);
      //   link.download = fileName;
      //   link.href = objectUrl;
      //   link.click();
      //   URL.revokeObjectURL(objectUrl);
      // }
    },
    fileChangeformpanFileList(file) {
      this.formpanFileList.push(file.raw); //上传文件变化时将文件对象push进files数组
    },
    fileChangeformFileList(file) {
      this.formFileList.push(file.raw); //上传文件变化时将文件对象push进files数组
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
    position: relative;
    .boot_an {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
.el-card__header {
  border-bottom: 0px solid #ebeef5;
}
.mude_text_item {
  margin: 15px 0;

  .ListmUPdata {
    margin-left: 15px;
  }
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
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>

