<!--密码产品-->
<template>
  <d2-container>
    <el-table
      :data="tabledatas"
      border
      :header-cell-style="{ 'background-color': 'rgba(238, 238, 238,1.0)' }"
    >
      <el-table-column label="产品名称" width="180">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'productName')"
            class="itsz"
          ></div>
          <el-input
            :ref="'productName' + scope.$index"
            @blur="
              schujiaodian({
                id: scope.row.id,
                productName: scope.row.productName,
              })
            "
            v-show="scope.row.show"
            v-model="scope.row.productName"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.productName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="生产厂商" width="180">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'manufacturer')"
            class="itsz"
          ></div>
          <el-input
            :ref="'manufacturer' + scope.$index"
            @blur="
              schujiaodian({
                id: scope.row.id,
                manufacturer: scope.row.manufacturer,
              })
            "
            v-show="scope.row.show"
            v-model="scope.row.manufacturer"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.manufacturer }}</span>
        </template>
      </el-table-column>

      <el-table-column label="商密型号" width="180">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'pwdModel')"
            class="itsz"
          ></div>
          <el-input
            :ref="'pwdModel' + scope.$index"
            @blur="
              schujiaodian({
                id: scope.row.id,
                pwdModel: scope.row.pwdModel,
              })
            "
            v-show="scope.row.show"
            v-model="scope.row.pwdModel"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.pwdModel }}</span>
        </template>
      </el-table-column>

      <el-table-column label="密码算法" width="80">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'pwdAlgorithm')"
            class="itsz"
          ></div>
          <el-input
            :ref="'pwdAlgorithm' + scope.$index"
            @blur="
              schujiaodian({
                id: scope.row.id,
                pwdAlgorithm: scope.row.pwdAlgorithm,
              })
            "
            v-show="scope.row.show"
            v-model="scope.row.pwdAlgorithm"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.pwdAlgorithm }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用途" width="150">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'productPurpose')"
            class="itsz"
          ></div>
          <el-input
            :ref="'productPurpose' + scope.$index"
            @blur="
              schujiaodian({
                id: scope.row.id,
                productPurpose: scope.row.productPurpose,
              })
            "
            v-show="scope.row.show"
            v-model="scope.row.productPurpose"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.productPurpose }}</span>
        </template>
      </el-table-column>

      <el-table-column label="数量" width="100">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'productNum')"
            class="itsz"
          ></div>
          <el-input
            :ref="'productNum' + scope.$index"
            @blur="
              schujiaodian({
                id: scope.row.id,
                productNum: scope.row.productNum,
              })
            "
            v-show="scope.row.show"
            v-model="scope.row.productNum"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.productNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重要程度" width="130">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.importantDegree"
            filterable
            @change="
              schujiaodian({
                id: scope.row.id,
                importantDegree: scope.row.importantDegree,
              })
            "
            placeholder="请选择"
          >
            <el-option
              v-for="item in importantDegree_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
export default {
  data() {
    return {
      Itzm: false,
      tabledatas: [
        {
          productName: "",
          manufacturer: "",
          pwdModel: "",
          pwdAlgorithm: "",
          productPurpose: "",
          importantDegree: 5,
          productNum: "",
          sortNum: 1,
          show: false,
        },
      ],
      importantDegree_list: [
        { value: 5, label: "关键" },
        { value: 4, label: "重要" },
        { value: 3, label: "一般" },
      ],
      formPage: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      indexs: null,
    };
  },
  created() {
    this.getlistdata();
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
      let res = await this.$api.APPwdProductFindPwdProduct(this.formPage);
      if (res.code === 20000) {
        let List = res.data;
        // this.total = res.data.total;
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
              productName: "",
              manufacturer: "",
              pwdModel: "",
              pwdAlgorithm: "",
              importantDegree: 5,
              productPurpose: "",
              productNum: "",
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
          res = await this.$api.API_PwdProductSavePwdProduct(item);
        } else {
          if (item.productName != "") {
            res = await this.$api.API_PwdProductUpdatePwdProduct(item);
          }
        }
      } else {
        res = await this.$api.API_PwdProductSavePwdProduct(item);
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
        productName: "",
        manufacturer: "",
        pwdModel: "",
        pwdAlgorithm: "",
        productPurpose: "",
        importantDegree: 5,
        productNum: "",
        sortNum,
        show: false,
      };
      itss.splice(item + 1, 0, basicData);
      this.tabledatas = itss;
      this.schujiaodian(this.tabledatas[item + 1]);
    },
    async deleteRow(index, rows) {
      this.$confirm("确定删除此记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$api.APIPwdProductDelPwdProductr({
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
</style>