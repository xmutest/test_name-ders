<!-- 网络结构 -->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">网络结构描述</div>
            <el-input
              style="min-height: 200px; margin-bottom: 20px"
              type="textarea"
              :autosize="{ minRows: 10, maxRows: 15 }"
              placeholder="请输入内容"
              v-model="fromdata.networkStructureDescribe"
            >
            </el-input>
          </div>
          <div class="tijiaobaoc">
            <el-button type="primary" @click="submitReport">保存</el-button>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">网络结构图</div>
            <div class="wangruo_ken">
              <div class="wangruo_img">
                <img :src="imgUrl" alt="" />
              </div>
            </div>
            <div class="wangruo_updata">
              <el-upload
                class="avatar-uploader"
                action=""
                :before-upload="beforePicUpload"
                :show-file-list="false"
              >
                <el-button type="primary" icon="el-icon-upload"
                  >上传图片</el-button
                >
              </el-upload>
            </div>
          </div>
          <!-- <div class="mude_text_item">
            <div class="descTItle">系统边界表(仅方案)</div>
            <div class="wangruo_table">
              <el-table
                :data="t_sys_boundary"
                border
                :header-cell-style="{
                  'background-color': 'rgba(238, 238, 238,1.0)',
                }"
              >
                <el-table-column label="边界名称">
                  <template slot-scope="scope">
                    <div
                      @click="
                        is_compile(scope.row, scope.$index, 'boundaryName')
                      "
                      class="itsz"
                    ></div>
                    <el-input
                      :ref="'boundaryName' + scope.$index"
                      @blur="schujiaodian(scope.row)"
                      v-show="scope.row.show"
                      v-model="scope.row.boundaryName"
                    ></el-input>
                    <span v-show="!scope.row.show">{{
                      scope.row.boundaryName
                    }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="接入方式">
                  <template slot-scope="scope">
                    <div
                      @click="
                        is_compile(scope.row, scope.$index, 'accessMethod')
                      "
                      class="itsz"
                    ></div>
                    <el-input
                      :ref="'accessMethod' + scope.$index"
                      @blur="schujiaodian(scope.row)"
                      placeholder="请输入内容"
                      v-show="scope.row.show"
                      v-model="scope.row.accessMethod"
                    ></el-input>
                    <span v-show="!scope.row.show">{{
                      scope.row.accessMethod
                    }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="承载主要业务应用">
                  <template slot-scope="scope">
                    <div
                      @click="
                        is_compile(scope.row, scope.$index, 'mainBusiness')
                      "
                      class="itsz"
                    ></div>
                    <el-input
                      :ref="'mainBusiness' + scope.$index"
                      @blur="schujiaodian(scope.row)"
                      placeholder="请输入内容"
                      v-show="scope.row.show"
                      v-model="scope.row.mainBusiness"
                    ></el-input>
                    <span v-show="!scope.row.show">{{
                      scope.row.mainBusiness
                    }}</span>
                  </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="
                        is_preserve(scope.$index, true, scope.row.sortNum)
                      "
                      >新增</el-button
                    >
                    <el-button
                      size="mini"
                      type="danger"
                      @click="deleteRow(scope.$index, scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div> -->
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
      fromdata: {
        networkStructureDescribe: "",
        id: "",
      },
      Itzm: false,
      imgUrl: "",
      imgUrl_id: "",
      t_sys_boundary: [
        {
          boundaryName: "",
          accessMethod: "",
          mainBusiness: "",
          show: false,
        },
      ],
      files: [],
      indexs: null,
    };
  },
  computed: {
    ...mapState("d2admin", {
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  created() {
    this.getEtlist();
  },
  mounted() {
    var that = this;
    document.addEventListener("click", function (e) {
      if (
        e.target.className != "itsz" &&
        e.target.className != "el-input__inner"
      ) {
        that.indexs = "";
        // that.getlistdata();
      }
    });
  },
  methods: {
    async beforePicUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 5;
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 5MB!");
        return false;
      }
      if (this.imgUrl == "") {
        let res = await this.$api.API_imgSaveNetworkImg({
          file,
        });
        if (res.code === 20000) {
          this.$message.success("更新图片成功！！");
          this.getlistdataImg();
          //查询列表
        } else {
          this.$message.error("错误，请联系管理员" + res.message);
        }
      } else {
        let res = await this.$api.API_imgupdateImg({
          file,
          id: this.imgUrl_id,
        });
        if (res.code === 20000) {
          this.$message.success("更新图片成功！！");
          this.getlistdataImg();
          //查询列表
        } else {
          this.$message.error("错误，请联系管理员" + res.message);
        }
      }
      return false;
    },
    async getlistdataImg() {
      //  获取图片
      let res = await this.$api.API_findNetworkImg();
      if (res.code === 20000) {
        if (res.data !== null) {
          this.imgUrl = res.data.imgUrl + res.data.imgName;
          this.imgUrl_id = res.data.id;
        }
      }
      if (res.code !== 20000) {
        this.$message.error("图片获取失败，请联系管理员" + res.message);
      }
    },
    // 获取数据
    async getlistdata() {
      let res = await this.$api.API_sysBoundaryFindSysBoundary();
      if (res.code === 20000) {
        let List = res.data;
        if (List.length > 0) {
          List.forEach((element) => {
            element["show"] = false;
          });
          this.t_sys_boundary = List;
          if (this.indexs || this.indexs === 0) {
            this.t_sys_boundary[this.indexs].show = true;
          }
        } else {
          this.t_sys_boundary = [
            {
              boundaryName: "",
              accessMethod: "",
              mainBusiness: "",
              show: false,
            },
          ];
        }

        // this.ProjectQueryList();
        //查询列表
      } else {
        this.$message.error("错误，数据查询失败" + res.message);
      }
      // this.list.forEach((element) => {
      //   element["show"] = false;
      // });
      // ;
    },
    textChangeHandler(delta, oldDelta, source) {
      // console.log(delta,oldDelta,source)
    },
    async getEtlist() {
      let List = await this.$api.API_projectOverviewStructureDescribe();
      let data = "";
      if (List.code === 20000) {
        // this.getlistdata();
        this.getlistdataImg();
        if (List.data.networkStructureDescribe != null) {
          data = List.data.networkStructureDescribe;
        } else {
          data = `    如图2-1 ${this.xmu_info.data.systemName}网络拓扑图所示`;
        }
        this.fromdata.networkStructureDescribe = data;
        this.fromdata.id = List.data.id;
        //查询列表
      } else {
        this.$message.error(List.message + "评测依据选项出差，请联系管理员");
      }
    },
    async submitReport() {
      let res = await this.$api.API_evaluationBasis_updata(this.fromdata);
      if (res.code === 20000) {
        this.$message.success("修改成功！！");
        this.getEtlist();
        //查询列表
      } else {
        this.$message.error("错误，请联系管理员" + res.message);
      }
    },
    is_compile(item, index, itname) {
      if (this.indexs == index || this.indexs == "") {
        item.show = true;
      } else {
        this.t_sys_boundary.forEach((items) => {
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
          res = await this.$api.API_sysBoundarySave(item);
        } else {
          res = await this.$api.API_sysBoundaryUpdate(item);
        }
      } else {
        res = await this.$api.API_sysBoundarySave(item);
      }
      if (res.code === 20000) {
        // this.getlistdata();
        this.Itzm = false;
        //查询列表
      } else {
        this.$message.error("保存错误，请联系管理员" + res.message);
      }
    },
    is_preserve(item, Itzm, sortNum) {
      var itss = this.t_sys_boundary;
      this.Itzm = Itzm;
      console.log();
      var list = {
        boundaryName: "",
        accessMethod: "",
        mainBusiness: "",
        show: false,
        sortNum: sortNum + 1,
      };
      itss.splice(item + 1, 0, list);
      this.t_sys_boundary = itss;
      this.schujiaodian(this.t_sys_boundary[item + 1]);
    },
    async deleteRow(index, rows) {
      this.$confirm("确定删除此记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$api.API_sysBoundaryDelSysBoundary({
            id: rows.id,
          });
          if (res.code === 20000) {
            // this.getlistdata();
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
  .wangruo_ken {
    display: flex;
    align-items: center;
    .wangruo_img {
      max-width: 600px;
      margin-right: 10px;
      img {
        width: 100%;
      }
    }
  }
}
.el-card__header {
  border-bottom: 0px solid #ebeef5;
}
.wangruo_updata {
  margin: 5px 0;
  text-align: right;
}
.itsz {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>