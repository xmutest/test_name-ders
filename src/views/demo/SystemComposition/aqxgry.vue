<!--安全相关人员-->
<template>
  <d2-container>
    <el-table :data="tabledatas" border>
      <el-table-column label="姓名" width="120">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'personnelName')"
            class="itsz"
          ></div>
          <el-input
            :ref="'personnelName' + scope.$index"
            @blur="schujiaodian(scope.row)"
            v-show="scope.row.show"
            v-model="scope.row.personnelName"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.personnelName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="岗位/角色" width="150">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'personnelPost')"
            class="itsz"
          ></div>
          <el-input
            :ref="'personnelPost' + scope.$index"
            @blur="schujiaodian(scope.row)"
            v-show="scope.row.show"
            v-model="scope.row.personnelPost"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.personnelPost }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系方式" width="160">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'telephone')"
            class="itsz"
          ></div>
          <el-input
            :ref="'telephone' + scope.$index"
            @blur="schujiaodian(scope.row)"
            v-show="scope.row.show"
            v-model="scope.row.telephone"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.telephone }}</span>
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
          personnelName: "",
          personnelPost: "",
          telephone: "",
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
      let res = await this.$api.APISecurityPersonnelFindSecurityPersonnel(
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
          res = await this.$api.API_SecurityPersonnelSaveSecurityPersonnel(item);
        } else {
          res = await this.$api.API_SecurityPersonnelUpdateSecurityPersonnel(item);
        }
      } else {
        res = await this.$api.API_SecurityPersonnelSaveSecurityPersonnel(item);
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
        personnelName: "",
        personnelPost: "",
        telephone: "",
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
          let res = await this.$api.APISecurityPersonnelDelSecurityPersonnel({
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

<style>
</style>