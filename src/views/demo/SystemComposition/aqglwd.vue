<!--安全管理文档-->
<template>
    <d2-container>
      <el-table :data="tabledatas" border>
        <el-table-column label="" width="80">
          <template slot-scope="scope">
            <div class="itsz"></div>
            <span v-show="!scope.row.show">{{scope.$index + 1}}</span>
          </template>
        </el-table-column>

        <el-table-column label="文档名称" width="120">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'fileName')"
              class="itsz"
            ></div>
            <el-input
              :ref="'fileName' + scope.$index"
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.fileName"
            ></el-input>
            <span v-show="!scope.row.show">{{scope.row.fileName}}</span>
          </template>
        </el-table-column>

        <el-table-column label="主要内容" width="150">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'mainContent')"
              class="itsz"
            ></div>
            <el-input
              :ref="'mainContent' + scope.$index"
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.mainContent"
            ></el-input>
            <span v-show="!scope.row.show">{{scope.row.mainContent}}</span>
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
        fileName:'文档1',
        mainContent:'主要内容1',
        asc:'1',
      },
      {
        fileName:'文档2',
        mainContent:'主要内容2',
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
        fileName:'',
        mainContent:'',
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