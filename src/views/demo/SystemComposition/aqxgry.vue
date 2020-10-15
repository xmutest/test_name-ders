<!--安全相关人员-->
<template>
    <d2-container>
      <el-table :data="tabledatas" border>
        <el-table-column label="" width="80">
          <template slot-scope="scope">
            <div class="itsz"></div>
            <span v-show="!scope.row.show">{{scope.$index + 1}}</span>
          </template>
        </el-table-column>

        <el-table-column label="姓名" width="120">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'name')"
              class="itsz"
            ></div>
            <el-input
              :ref="'name' + scope.$index"
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.name"
            ></el-input>
            <span v-show="!scope.row.show">{{scope.row.name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="岗位/角色" width="150">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'station')"
              class="itsz"
            ></div>
            <el-input
              :ref="'station' + scope.$index"
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.station"
            ></el-input>
            <span v-show="!scope.row.show">{{scope.row.station}}</span>
          </template>
        </el-table-column>

        <el-table-column label="联系方式" width="160">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'connection')"
              class="itsz"
            ></div>
            <el-input
              :ref="'connection' + scope.$index"
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.connection"
            ></el-input>
            <span v-show="!scope.row.show">{{scope.row.connection}}</span>
          </template>
        </el-table-column>

        <el-table-column label="排序号" width="80">
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
        name:'張三',
        station:'工程師',
        connection:'15917725054',
        asc:'1',
      },
      {
        name:'李四',
        station:'工程師',
        connection:'15917725074',
        asc:'2',
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
        name:'',
        station:'',
        connection:'',
        asc:'',
        show: false,
      };
      itss.splice(item + 1, 0, basicData);
      this.tabledatas = itss;
      // console.log();
    },
    deleteRow(index) {
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