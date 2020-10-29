<!--密码产品-->
<template>
  <d2-container>
    <el-table :data="tabledatas" border>
      <el-table-column label="产品名称" width="180">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'productName')"
            class="itsz"
          ></div>
          <el-input
            :ref="'productName' + scope.$index"
            @blur="schujiaodian(scope.row)"
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
            @blur="schujiaodian(scope.row)"
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
            @blur="schujiaodian(scope.row)"
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
            @blur="schujiaodian(scope.row)"
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
            @blur="schujiaodian(scope.row)"
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
            @blur="schujiaodian(scope.row)"
            v-show="scope.row.show"
            v-model="scope.row.productNum"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.productNum }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="is_compile(scope.row)">编辑</el-button> -->
          <el-button size="mini" @click="is_preserve(scope.$index, true, scope.row.sortNum)">
            新增
          </el-button>
          <el-button size="mini" type="danger" @click="deleteRow(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
          productNum: "",
          sortNum: 1,
          show: false,
        },
      ],
      formPage: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getlistdata();
  },
  methods: {
    async getlistdata() {
      let res = await this.$api.APPwdProductFindPwdProduct(
        this.formPage
      );
      console.log(res);
      if (res.code === 20000) {
        let List = res.data.list;
        if (res.data.list.length > 0) {
          List.forEach((element) => {
            element["show"] = false;
          });
          this.tabledatas = List;
        }

        // this.ProjectQueryList();
        //查询列表
      } else {
        this.$message.error("错误，数据查询失败" + res.message);
      }
    },
    is_compile(item, index, itname) {
      item.show = true;
      setTimeout(() => {
        this.$refs[itname + index].focus();
      }, 1);
    },
    async schujiaodian(item) {
      item.show = false;
      let res = "";
      if (item.id && item.id != "undefined") {
        if (this.Itzm == true) {
          res = await this.$api.API_PwdProductSavePwdProduct(item);
        } else {
          res = await this.$api.API_PwdProductUpdatePwdProduct(item);
        }
      } else {
        res = await this.$api.API_PwdProductSavePwdProduct(item);
      }
      if (res.code === 20000) {
        this.getlistdata();
        this.Itzm = false;
        //查询列表
      } else {
        this.$message.error("保存错误，请联系管理员" + res.message);
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
        productNum: "",
        sortNum,
        show: false,
      };
      itss.splice(item + 1, 0, basicData);
      this.tabledatas = itss;
      this.schujiaodian(this.tabledatas[item + 1]);
    },
    async deleteRow(index, rows) {
      console.log(rows);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
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