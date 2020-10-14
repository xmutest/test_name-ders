<!-- 安全服务 -->
<template>
  <d2-container>
    <el-table :data="t_security_services" border>
      <el-table-column label="" width="80">
        <template slot-scope="scope">
          <div class="itsz"></div>
          <span v-show="!scope.row.show">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="安全服务名称" width="450">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'servicesName')"
            class="itsz"
          ></div>
          <el-input
            :ref="'servicesName' + scope.$index"
            @blur="schujiaodian(scope.row)"
            v-show="scope.row.show"
            v-model="scope.row.servicesName"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.servicesName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="安全服务商" width="450">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'serviceProvider')"
            class="itsz"
          ></div>
          <el-input
            :ref="'serviceProvider' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.serviceProvider"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.serviceProvider }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="is_compile(scope.row)">编辑</el-button> -->
          <el-button size="mini" @click="is_preserve(scope.$index)"
            >新增</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteRow(scope.$index, t_security_services)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      t_security_services: [],
    };
  },
  created() {
    this.getlistdata();
    // })
  },
  methods: {
    async getlistdata() {
      let res = await this.$api.API_securityServicesFindAll();
      if (res.code === 20000) {
        let List = res.data;
        if (res.data != null) {
          List.forEach((element) => {
            element["show"] = false;
          });
        }

        this.t_security_services = List;
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
    is_compile(item, index, itname) {
      // console.log(item,index,itname)
      item.show = true;
      setTimeout(() => {
        this.$refs[itname + index].focus();
      }, 1);
    },
    async schujiaodian(item) {
      item.show = false;
      let res = await this.$api.API_securityServicesupdateService(item);
      if (res.code === 20000) {
        this.getlistdata();
        //查询列表
      } else {
        this.$message.error("保存错误，请联系管理员" + res.message);
      }
    },
    is_preserve(item) {
      var itss = this.t_security_services;
      var list = {
        servicesName: "",
        serviceProvider: "",
        show: false,
      };
      itss.splice(item + 1, 0, list);
      this.t_security_services = itss;
      // console.log();
    },
    async deleteRow(index, rows) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$api.API_securityServicesdelService({
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

<style lang="scss">
.form {
  .el-table th > .cell {
    text-align: center;
  }
  .el-table--enable-row-transition .el-table__body td {
    text-align: center;
  }
}
.itsz {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.el-table td,
.el-table th.is-leaf {
  text-align: center;
}
</style>