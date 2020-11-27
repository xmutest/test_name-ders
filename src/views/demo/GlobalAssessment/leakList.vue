<!--安全控制间安全测评cmjaqcp-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">漏洞扫描报告</div>
            <div class="ScTlist">
              <div class="scanningTool">
                <span class="scanningToolName">(1)主机扫描工具</span>
                <el-select size="mini" v-model="toolName" placeholder="请选择">
                  <el-option
                    v-for="item in scanningTool"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <div class="scanningupload">
                  <el-upload
                    class="upload-demo"
                    drag
                    action
                    :limit="10"
                    :file-list="formFileList"
                    :http-request="handleUploadForm"
                    :on-exceed="formHandleExceed"
                    :on-remove="formHandleRemove"
                    :before-upload="beforeUploadForm"
                    accept="application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    multiple
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      将文件拖到此处，或<em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">
                      上传文件只能是doc/docx格式，且不超过10m
                    </div>
                  </el-upload>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="tijiaobaoc">
            <el-button type="primary" @click="submitReport">保存</el-button>
          </div> -->
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
      formMaxSize: 10, // 上传文件大小
      formFileList: [], // 显示上传文件
      uploadFormFileList: [], // 确定上传文件
      dataList: [],
      // 主机扫描工具
      scanningTool: [
        { id: 1, value: "绿盟" },
        { id: 2, value: "天镜" },
        { id: 3, value: "Nessus" },
      ],
      toolName: 1,
      //   应用系统扫描工具
      systemScanTool: [
        { id: 1, value: "绿盟" },
        { id: 2, value: "天镜" },
        { id: 3, value: "Nessus" },
        { id: 4, value: "AppScan" },
      ],
      ScantoolName: 1,
    };
  },
  created() {},
  methods: {
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
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "doc" || testmsg === "docx";
      if (!extension) {
        this.$message({
          message: "上传文件只能是doc/docx格式!",
          type: "warning",
        });
      }
      return extension;
    },
    // 移除上传列表中文件
    formHandleRemove(file, formFileList) {
      let thiz = this;
      for (let i = 0; i < thiz.uploadFormFileList.length; i++) {
        if (thiz.uploadFormFileList[i].pname === file.name) {
          thiz.uploadFormFileList.splice(i, 1);
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
    // 上传文件
    async handleUploadForm(param) {
      let thiz = this;
      let formData = new FormData();
      //formData.append("projectId", this.toSonData); // 额外参数
      formData.append("file", param.file);
      let loading = thiz.$loading({
        lock: true,
        text: "上传中，请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      formData.append("projectId", thiz.xmu_info.projectId);
      thiz.$api.SYS_USER_InputDoc(formData).then((data) => {
        if (data.code === 20000) {
          thiz.$message({
            message: "上传文件成功，" + data.message,
            type: "success",
          });
          thiz.formFileList = [];
          thiz.uploadFormFileList = [];
          thiz.ifsTo = true;
          thiz.$emit("toFatherData", thiz.ifsTo);
        } else {
          thiz.formFileList = [];
          thiz.uploadFormFileList = [];
          thiz.$message("上传文件失败，" + data.message);
        }
      });
      loading.close();
      // thiz.$http.post("/api/import/check/upload", formData).then(({ data }) => {

      // });
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
.ScTlist {
  margin: 0 20px;
  .scanningTool {
    .scanningToolName {
      font-size: 14px;
      margin: 10px 10px 10px 0;
      font-family: "Courier New", Courier, monospace;
    }
    .scanningupload {
      margin: 20px 0;
    }
  }
}
</style>
