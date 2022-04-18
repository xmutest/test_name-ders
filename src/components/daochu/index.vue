<template>
  <div class="ks_buttm">
    <el-button type="primary" @click="ks_toBummt">导出</el-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    //第二种方式
    toSonData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("d2admin", {
       info: (state) => state.user.info,
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  methods: {
    // 导出
    doadhh() {
      console.log();
      var url = `${window.location.protocol}${process.env.VUE_APP_API}/output/sceneCheck?sceneCheckId=${this.toSonData.sceneCheckId}&projectId=${this.xmu_info.projectId}`;
      var xhr = new XMLHttpRequest();
      var fileName = this.toSonData.name; // 文件名称
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.setRequestHeader("Authorization",`Bearer ${this.info.user_info.token}`); // 请求头中的验证信息等（如果有）
      xhr.onload = function (res) {
        if (this.status === 200) {
          var type = xhr.getResponseHeader("application/msword;charset=utf-8");
          var blob = new Blob([this.response], { type: type });
          if (typeof window.navigator.msSaveBlob !== "undefined") {
            /*
             * For IE
             * >=IE10
             */
            window.navigator.msSaveBlob(blob, fileName);
          } else {
            /*
             * For Non-IE (chrome, firefox)
             */
            var URL = window.URL || window.webkitURL;
            var objectUrl = URL.createObjectURL(blob);
            if (fileName) {
              var a = document.createElement("a");
              if (typeof a.download === "undefined") {
                window.location = objectUrl;
              } else {
                a.href = objectUrl;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
              }
            } else {
              window.location = objectUrl;
            }
          }
        }
      };
      xhr.send();
    },
    async ks_toBummt() {
      //localhost:8080/api/output/sceneCheck?projectId=8
      let reportName = this.toSonData.name;
      let url = `${window.location.protocol}${process.env.VUE_APP_API}/output/sceneCheck?sceneCheckId=${this.toSonData.sceneCheckId}&projectId=${this.xmu_info.projectId}`;
      let res = await this.$api.SYS_reportWord_DownLoadDoc({ url });
      try {
        let reader = new FileReader(); // 创建读取文件对象

        reader.addEventListener("loadend", function () {
          let ress = JSON.parse(reader.result); // 返回的数据
          if (ress) {
            alert(ress.message);
          }
        });
        reader.readAsText(res, "utf-8"); // 设置读取的数据以及返回的数据类型为utf-8
        console.log(reader.readAsText(res, "utf-8"));
      } catch (err) {
        let blob = new Blob([res], {
          type: "application/zip;application/msword;charset=utf-8",
        });

        //浏览器兼容，Google和火狐支持a标签的download，IE不支持
        if (window.navigator && window.navigator.msSaveBlob) {
          //IE浏览器、微软浏览器
          /* 经过测试，微软浏览器Microsoft Edge下载文件时必须要重命名文件才可以打开，
              IE可不重命名，以防万一，所以都写上比较好 */
          window.navigator.msSaveBlob(blob, reportName);
        } else {
          //其他浏览器
          let link = document.createElement("a"); // 创建a标签
          link.style.display = "none";
          let objectUrl = URL.createObjectURL(blob);
          link.download = `${reportName}`;
          link.href = objectUrl;
          link.click();
          URL.revokeObjectURL(objectUrl);
        }
      }

      // let routeUrl = URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // link.href = routeUrl;
      // link.download = row.evi_name;
      // link.click();
      //     let data = {
      //   sceneCheckId: this.toSonData.sceneCheckId,
      // };
      // let res = await this.$api.SYS_OutputSceneCheck(data);
      // let blob = new Blob([res], {
      //   type:
      //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      // });
      // if (res.code == 500) {
      //   his.$message.error("导出失败，请联系管理员");
      // } else {
      //   let blob = new Blob([res], {
      //     type:
      //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      //   });
      //   //浏览器兼容，Google和火狐支持a标签的download，IE不支持
      //   if (window.navigator && window.navigator.msSaveBlob) {
      //     //IE浏览器、微软浏览器
      //     /* 经过测试，微软浏览器Microsoft Edge下载文件时必须要重命名文件才可以打开，
      //         IE可不重命名，以防万一，所以都写上比较好 */
      //     window.navigator.msSaveBlob(blob, "文件");
      //   } else {
      //     //其他浏览器
      //     let link = document.createElement("a"); // 创建a标签
      //     link.style.display = "none";
      //     let objectUrl = URL.createObjectURL(blob);
      //     link.href = objectUrl;
      //     link.setAttribute(
      //       "download",
      //       `0${this.toSonData.sceneCheckId}_${this.toSonData.name}` + ".xlsx"
      //     ); // 设置下载文件名称
      //     link.click();
      //     URL.revokeObjectURL(objectUrl);
      //   }
      // }

      // window.open('/downLoadDoc')
    },
  },
};
</script>

<style>
</style>