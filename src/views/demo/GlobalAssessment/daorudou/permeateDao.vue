
<template>
  <div>
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
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!-- <div class="el-upload__tip" slot="tip">
          上传文件只能是doc/docx格式，且不超过10m
        </div> -->
      </el-upload>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    sonValue: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      formMaxSize: 500, // 上传文件大小
      formFileList: [], // 显示上传文件
      uploadFormFileList: [], // 确定上传文件
    };
  },
  created() {},
  computed: {
    ...mapState("d2admin", {
      info: (state) => state.user.info,
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  methods: {
    // 开始上传前验证
    beforeUploadForm(file) {
      if (this.sonValue.type === 1) {
        if (this.sonValue.technology.isGiveUp === false) {
          if (
            this.sonValue.technology.userId == "" ||
            this.sonValue.technology.userId == "undefined"
          ) {
            this.$message({
              message: `请选择渗透人员在上传授权书！`,
              type: "warning",
            });
            return false;
          }
        }
      }

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
      // const extension = testmsg === "doc" || testmsg === "docx";
      // if (!extension) {
      //   this.$message({
      //     message: "上传文件只能是doc/docx格式!",
      //     type: "warning",
      //   });
      // }
      // return extension;
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
      thiz.ifsTo = false;
      let formData = new FormData();
      // formData.append("tool", this.sonValue.toolName);

      let url = "";
      if (this.sonValue.type === 1) {
        url = `/penetration/uploadBook`;
        formData.append("type", this.sonValue.type); // 额外参数
        formData.append("userId", this.sonValue.technology.userId);
      } else if (this.sonValue.type === 2) {
        url = `/penetration/parsingPenetrationFile`;
      }

      formData.point = url; // 额外参数
      formData.append("files", param.file);
      formData.append("projectId", thiz.xmu_info.projectId);
      let loading = thiz.$loading({
        lock: true,
        text: "上传中，请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      thiz.$api.SYS_loudouploadBook(formData).then((data) => {
        if (data.code === 20000) {
          console.log(data);
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
</style>
