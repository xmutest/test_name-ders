<!--密码产品-->
<template>
    <d2-container>
      <el-table :data="tabledatas" border>
        <el-table-column label="" width="80">
          <template slot-scope="scope">
            <div class="itsz"></div>
            <span v-show="!scope.row.show">{{scope.$index + 1}}</span>
          </template>
        </el-table-column>

        <el-table-column label="产品名称" width="300">
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
            <span v-show="!scope.row.show">{{scope.row.productName}}</span>
          </template>
        </el-table-column>

        <el-table-column label="生产厂商" width="450">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'productFrom')"
              class="itsz"
            ></div>
            <el-input
              :ref="'productFrom' + scope.$index"
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.productFrom"
            ></el-input>
            <span v-show="!scope.row.show">{{scope.row.productFrom}}</span>
          </template>
        </el-table-column>

        <el-table-column label="商密型号" width="200">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'busniessPass')"
              class="itsz"
            ></div>
            <el-input
              :ref="'busniessPass' + scope.$index"
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.busniessPass"
            ></el-input>
            <span v-show="!scope.row.show">{{scope.row.busniessPass}}</span>
          </template>
        </el-table-column>

        <el-table-column label="密码算法" width="80">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'passCal')"
              class="itsz"
            ></div>
            <el-input
              :ref="'passCal' + scope.$index"
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.passCal"
            ></el-input>
            <span v-show="!scope.row.show">{{scope.row.passCal}}</span>
          </template>
        </el-table-column>

        <el-table-column label="用途" width="150">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'useful')"
              class="itsz"
            ></div>
            <el-input
              :ref="'useful' + scope.$index"
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.useful"
            ></el-input>
            <span v-show="!scope.row.show">{{scope.row.useful}}</span>
          </template>
        </el-table-column>

        <el-table-column label="数量" width="100">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'number')"
              class="itsz"
            ></div>
            <el-input
              :ref="'number' + scope.$index"
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.number"
            ></el-input>
            <span v-show="!scope.row.show">{{scope.row.number}}</span>
          </template>
        </el-table-column>

        <el-table-column label="排序号" width="100">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'asc')"
              class="itsz"
            ></div>
            <el-input
              :ref="'asc' + scope.$index"
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.asc"
            ></el-input>
            <span v-show="!scope.row.show">{{scope.row.asc}}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="is_compile(scope.row)">编辑</el-button> -->
            <el-button size="mini" @click="is_preserve(scope.$index)">
              新增
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteRow(scope.$index)"
            >
              删除
            </el-button>
          </template>
      </el-table-column>

      </el-table>
  </d2-container>
</template>

<script>
export default {
  data(){
    return{
      importance_list:[
        { value: 3, label: "高" },
        { value: 2, label: "中" },
        { value: 1, label: "低" },
      ],
      tabledatas:[],
    };
  },
  created() {
    let list = [
      {
        productName:'产品1',
        productFrom:'厂家1',
        busniessPass:'ISO9001',
        passCal:'lls9345',
        useful:'食品加工',
        number:'99999',
        asc:'1',
      },
      {
        productName:'产品1',
        productFrom:'厂家1',
        busniessPass:'ISO9001',
        passCal:'lls9345',
        useful:'食品加工',
        number:'99999',
        asc:'1',
      },
    ];
    list.forEach((element) => {
      element["show"] = false;
    });
    this.tabledatas = list;

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
      console.log(item)
      var itss = this.tabledatas;
      var basicData = {
        show: false,
        productName:'',
        productFrom:'',
        busniessPass:'',
        passCal:'',
        useful:'',
        number:'',
        asc:'',
      };
      itss.splice(item + 1, 0, basicData);
      this.tabledatas = itss;
      // console.log();
    },
    deleteRow(index, rows) {
      console.log('索引',index)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // rows.id

          this.tabledatas.splice(index,1)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
}
</script>

<style>

</style>