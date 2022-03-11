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
                <el-table-column label="加急详细" width="150">
                  <template slot-scope="scope">
                    {{ scope.row.reason }}
                  </template>
                </el-table-column>
                <el-table-column label="上传人姓名" width="150">
                  <template slot-scope="scope">
                    {{ scope.row.userName }}
                  </template>
                </el-table-column>
                <el-table-column label="技术审核人" width="150">
                  <template slot-scope="scope">
                    {{ scope.row.technologyName }}
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
              <el-table-column label="审核环节" width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.link == 1">初审</span>
                  <span v-if="scope.row.link == 2">终审</span>
                </template>
              </el-table-column>
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
              <el-table-column label="审核环节" width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.link == 1">初审</span>
                  <span v-if="scope.row.link == 2">终审</span>
                </template>
              </el-table-column>
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

          <el-form-item v-if="formsendType.sendType == 1" label="技术审核人">
            <el-select
              v-model="formsendType.technologyId"
              size="small"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in jsuoptions"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
              >
              </el-option>
            </el-select>
            <div>
              <span style="color: red; font-size: 12px"
                >报告提交给质控部前，请本部门的中级测评师先预审技术部分（附录D和相关章节），并把技术部分的评审记录作为审核材料一起上传。</span
              >
            </div>
          </el-form-item>
          <el-form-item
            label="优先级"
            :label-width="formLabelWidth"
            prop="projectPriority"
            size="small"
          >
            <el-select
              v-model="formsendType.priority"
              placeholder="请选择优先级"
              clearable
            >
              <el-option
                v-for="(item, index) in projectPriorityOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="formsendType.priority == 3 || formsendType.priority == 2"
            label="加急详细"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 12 }"
              placeholder="请输入内容"
              v-model="formsendType.reason"
            >
            </el-input>
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
                >（请上传压缩包，包含要审核的测评方案或测评报告，备案证，定级报告，现场授权书，渗透授权书）</span
              >
            </el-upload>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 12 }"
              placeholder="请输入内容"
              v-model="formsendType.remarks"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div class="tijiaobaoc">
          <el-button type="info" @click="kslistdatafy = false">取消</el-button>
          <el-button type="success" @click="sbchslllll">提交审核</el-button>
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
        remarks: "",
        technologyId: "",
        priority: 1,
        reason: "",
      },
      jsuoptions: [],
      fanganfotabList: [],
      projectPriorityOptions: [
        // 正常，紧急，特批加急 （默认：正常）
        {
          label: "正常",
          value: 1,
        },
        {
          label: "紧急",
          value: 2,
        },
        {
          label: "特批加急",
          value: 3,
        },
      ],
    };
  },
  created() {
    this.revifindListok();
    this.findTelListfindPlan();
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
    // 获取本部门技术人员
    async findTelListfindPlan() {
      let res = await this.$api.findTelListfindPlan();
      if (res.code === 20000) {
        this.jsuoptions = res.data;
      }
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
      formData.append("userName", thiz.info.name);
      for (const key in thiz.formsendType) {
        if (key == "technologyId") {
          thiz.formsendType[key] = thiz.formsendType[key]
            ? thiz.formsendType[key]
            : 0;
        }

        formData.append(key, thiz.formsendType[key]);
      }
      // formData.append("remarks", thiz.formsendType.remarks);
      // formData.append("technologyId", thiz.formsendType.technologyId);
      // formData.append("sendType", thiz.formsendType.sendType);
      let res = await thiz.$api.reviewloadBook(formData);
      if (res.code == 20000) {
        loading.close();
        this.$message({
          message: "上传文件成功",
          type: "success",
        });

        this.formFileList = [];
        this.formpanFileList = [];
        this.remarks = "";
        this.kslistdatafy = false;
        this.revifindListok();
      } else {
      }
      loading.close();
    },
    async sbchslllll() {
      // this.submitUpload();
      if (this.formsendType.sendType == 1) {
        if (!this.formsendType.technologyId)
          return this.$message.error("请选择技术审核人");
      }
      if (this.formFileList.length <= 0) {
        return this.$message.error("请上传审核材料");
      }
      let ins = this.info.user_info.departmentId;
      if (ins >= 12 && ins <= 15) {
        this.submitUpload();
      } else {
        let res = await this.$api.API_reportFirstdatem({
          projectId: this.xmu_info.projectId,
          userName: this.info.name,
        });
        if (res.code == 20000) {
          this.submitUpload();
        }
      }
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

