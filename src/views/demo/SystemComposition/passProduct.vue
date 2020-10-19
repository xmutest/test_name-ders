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
          <el-button size="mini" @click="is_preserve(scope.$index)">
            新增
          </el-button>
          <el-button size="mini" type="danger" @click="deleteRow(scope.$index)">
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
      importance_list: [
        { value: 3, label: "高" },
        { value: 2, label: "中" },
        { value: 1, label: "低" },
      ],
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
    };
  },
  created() {
    
  },
  methods: {
    is_compile(item, index, itname) {
      item.show = true;
      setTimeout(() => {
        this.$refs[itname + index].focus();
      }, 1);
    },
    schujiaodian(item) {
      item.show = false;
    },
    is_preserve(item) {
      console.log(item);
      var itss = this.tabledatas;
      var basicData = {
        productName:'',
        manufacturer:'',
        pwdModel:'',
        pwdAlgorithm:'',
        productPurpose:'',
        productNum:'',
        sortNum,
        show:false
      };
      itss.splice(item + 1, 0, basicData);
      this.tabledatas = itss;
      // console.log();
    },
    deleteRow(index, rows) {
      console.log("索引", index);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // rows.id

          this.tabledatas.splice(index, 1);
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
</style>