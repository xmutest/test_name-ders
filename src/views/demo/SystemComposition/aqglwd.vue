<!--安全管理文档-->
<template>
  <d2-container>
    <div class="Bomms_ks">
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
          accept="application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          multiple
        >
          <el-button size="small" type="primary">导入</el-button>
        </el-upload>
      </div>
      <div>
        <el-button size="small" @click="reportGeneratingEdit" type="primary"
          >下载</el-button
        >
      </div>
      <div>
        <el-button size="small" @click="deleteAndGenerateus" type="primary"
          >删除全部并更新</el-button
        >
      </div>
    </div>
    <el-table
      :data="tabledatas"
      border
      :header-cell-style="{ 'background-color': 'rgba(238, 238, 238,1.0)' }"
    >
      <el-table-column label="文档名称">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'fileName')"
            class="itsz"
          ></div>
          <el-input
            :ref="'fileName' + scope.$index"
            @blur="
              schujiaodian({
                id: scope.row.id,
                fileName: scope.row.fileName,
              })
            "
            v-show="scope.row.show"
            v-model="scope.row.fileName"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.fileName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="主要内容">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'fileContent')"
            class="itsz"
          ></div>
          <el-input
            :ref="'fileContent' + scope.$index"
            @blur="
              schujiaodian({
                id: scope.row.id,
                fileContent: scope.row.fileContent,
              })
            "
            v-show="scope.row.show"
            v-model="scope.row.fileContent"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.fileContent }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="is_compile(scope.row)">编辑</el-button> -->
          <el-button
            size="mini"
            @click="is_preserve(scope.$index, true, scope.row.sortNum)"
          >
            新增
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteRow(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="page_name" style="padding: 0 20px 20px 20px; margin: 15px 0">
      <div class="search_ls">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="formPage.pageNum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="formPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div> -->
  </d2-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      Itzm: false,
      tabledatas: [
        {
          fileName: "",
          fileContent: "",
          sortNum: 1,
          show: false,
        },
      ],
      formPage: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      indexs: null,
      formMaxSize: 50, // 上传文件大小
      formFileList: [], // 显示上传文件
      uploadFormFileList: [], // 确定上传文件
    };
  },
  created() {
    this.getlistdata();
  },
  computed: {
    ...mapState("d2admin", {
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  mounted() {
    var that = this;
    document.addEventListener("click", function (e) {
      if (
        e.target.className != "itsz" &&
        e.target.className != "el-input__inner"
      ) {
        clearTimeout(that.timeout);
        that.timeout = setTimeout(() => {
          // console.log(item.computerRoomName);
          that.indexs = "";
          that.tabledatas.forEach((items) => {
            items.show = false;
          });
        }, 200);
      }
    });
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
      const extension = (testmsg === "xlsx") | (testmsg === "xls");
      if (!extension) {
        this.$message({
          message: "上传文件只能是xlsx格式!",
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
      thiz.$api.securityManageFileUpload(formData).then((data) => {
        console.log(data);
        if (data.code === 20000) {
          thiz.$message({
            message: "上传文件成功，" + data.message,
            type: "success",
          });
          thiz.formFileList = [];
          thiz.uploadFormFileList = [];
          this.getlistdata();
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
    //生成报告
    async reportGeneratingEdit() {
      let fileName = `安全文档`;
      let res = await this.$api.API_woutPutModel();
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
          window.navigator.msSaveBlob(blob, fileName);
        } else {
          //其他浏览器
          let link = document.createElement("a"); // 创建a标签
          link.style.display = "none";
          let objectUrl = URL.createObjectURL(blob);
          link.download = `${fileName}.xlsx`;
          link.href = objectUrl;
          link.click();
          URL.revokeObjectURL(objectUrl);
        }
      }
    },
    changeInput(item) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        // console.log(item.computerRoomName);
        this.schujiaodian(item);
      }, 500);
      // console.log(item.computerRoomName);
    },
    // 分页
    handleSizeChange(val) {
      this.formPage.pageSize = val;
      this.getlistdata();
    },
    handleCurrentChange(val) {
      this.formPage.pageNum = val;
      this.getlistdata();
    },
    async getlistdata() {
      let res = await this.$api.APISecurityManageFileFindSecurityManageFile();
      if (res.code === 20000) {
        // this.total = res.data.total;
        let List = res.data;
        if (res.data.length > 0) {
          List.forEach((element) => {
            element["show"] = false;
          });
          this.tabledatas = List;
          if (this.indexs || this.indexs === 0) {
            this.tabledatas[this.indexs].show = true;
          }
        } else {
          this.tabledatas = [
            {
              fileName: "",
              fileContent: "",
              sortNum: 1,
              show: false,
            },
          ];
        }

        // this.ProjectQueryList();
        //查询列表
      } else {
        this.$message.error("错误，数据查询失败" + res.message);
      }
    },
    deleteAndGenerateus() {
      this.$confirm("确定删除全部管理文档并从现场记录表更新？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$api.deleteAndGenerateusDescriptioniongeFile();
          if (res.code === 20000) {
            this.$message({
              type: "success",
              message: "操作成功!",
            });
            this.getlistdata();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    is_compile(item, index, itname) {
      if (this.indexs == index || this.indexs == "") {
        item.show = true;
      } else {
        this.tabledatas.forEach((items) => {
          items.show = false;
        });
        item.show = true;
      }
      this.indexs = index;
      setTimeout(() => {
        this.$refs[itname + index].focus();
      }, 1);
    },
    async schujiaodian(item) {
      let res = "";
      if (item.id && item.id != "undefined") {
        if (this.Itzm == true) {
          res = await this.$api.API_SecurityManageFileSaveSecurityManageFile(
            item
          );
        } else {
          if (item.fileName != "") {
            res =
              await this.$api.API_SecurityManageFileUpdateSecurityManageFile(
                item
              );
          }
        }
      } else {
        res = await this.$api.API_SecurityManageFileSaveSecurityManageFile(
          item
        );
      }
      if (res.code === 20000) {
        this.getlistdata();
        this.Itzm = false;
        //查询列表
      }
      this.Itzm = false;
    },
    is_preserve(item, Itzm, sortNum) {
      this.Itzm = Itzm;
      var itss = this.tabledatas;
      var basicData = {
        personnelName: "",
        fileName: "",
        fileContent: "",
        sortNum,
        show: false,
      };
      itss.splice(item + 1, 0, basicData);
      this.tabledatas = itss;
      this.schujiaodian(this.tabledatas[item + 1]);
    },
    async deleteRow(index, rows) {
      this.$confirm("确定删除此记录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$api.APISecurityManageFileDelSecurityManageFile({
            id: rows.id,
          });
          if (res.code === 20000) {
            this.getlistdata();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //查询列表
          } else {
            this.$message.error("删除错误，请联系管理员" + res.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-table {
  font-size: 12px;
}
.itsz {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.Bomms_ks {
  display: flex;
  float: right;
  div {
    margin: 0 5px;
  }
  margin: 10px 0;
}
</style>