<template>
  <div>
    <el-upload
      class="upload-demo"
      action
      :limit="10"
      :file-list="formFileList"
      :http-request="handleUploadForm"
      :on-exceed="formHandleExceed"
      :on-remove="formHandleRemove"
      :before-upload="beforeUploadForm"
      multiple
      accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
    >
      <el-button type="primary">导入</el-button>
    </el-upload>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    //第二种方式
    toSonData: {
      type: Number,
      default: function () {
        return 1;
      },
    },
  },
  data() {
    return {
      formMaxSize: 10, // 上传文件大小
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
      const extension =
        testmsg === "xlsx" || testmsg === "xls" || testmsg === "csv";
      if (!extension) {
        this.$message({
          message: "上传文件只能是xlsx/xls/csv格式!",
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
    handleUploadForm(param) {
      let thiz = this;
      console.log(thiz.xmu_info);
      let formData = new FormData();
      formData.append("projectId", thiz.xmu_info.projectId); // 额外参数
      formData.append("files", param.file);
      formData.append("sag", thiz.xmu_info.data.sag);
      let loading = thiz.$loading({
        lock: true,
        text: "上传中，请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      // thiz.$http.post("/api/import/check/upload", formData)
      this.$api.SYS_checkUpload(formData).then(({ data }) => {
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
    },
  },
};
</script>

<style>
</style>