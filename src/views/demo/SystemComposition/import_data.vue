<!--导入测评调研表-->
<template>
  <d2-container>
    <div class="ks_to">
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
        accept="application/msword,application/vnd.ms-excel"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          上传文件只能是doc格式，且不超过10m
        </div>
      </el-upload>
      <div class="ks_buttm">
        <el-button type="primary" @click="ks_toBummt">导出模板</el-button>
      </div>
    </div>
  </d2-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      formMaxSize: 1, // 上传文件大小
      formFileList: [], // 显示上传文件
      uploadFormFileList: [], // 确定上传文件
      ifsTo: false,
    };
  },
  computed: {
    ...mapState("d2admin", {
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
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
      const extension = testmsg === "doc";
      if (!extension) {
        this.$message({
          message: "上传文件只能是doc格式!",
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
    // 导出
    async ks_toBummt() {
      let res = await this.$api.SYS_USER_DownLoadDoc();
      if (res.code == 500) {
        alert(res.message);
      } else {
        let blob = new Blob([res], {
          type: "application/msword;charset=utf-8",
        });

        //浏览器兼容，Google和火狐支持a标签的download，IE不支持
        if (window.navigator && window.navigator.msSaveBlob) {
          //IE浏览器、微软浏览器
          /* 经过测试，微软浏览器Microsoft Edge下载文件时必须要重命名文件才可以打开，
              IE可不重命名，以防万一，所以都写上比较好 */
          window.navigator.msSaveBlob(blob, "文件.doc");
        } else {
          //其他浏览器
          let link = document.createElement("a"); // 创建a标签
          link.style.display = "none";
          let objectUrl = URL.createObjectURL(blob);
          link.download = "系统构成表模板";
          link.href = objectUrl;
          link.click();
          URL.revokeObjectURL(objectUrl);
        }
      }

      // window.open('/downLoadDoc')
    },
  },
};
</script>

<style lang="scss" scoped>
.ks_to {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .ks_buttm {
    margin: 15px 0;
    text-align: right;
  }
}
</style>