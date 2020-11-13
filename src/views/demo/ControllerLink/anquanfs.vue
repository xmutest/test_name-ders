<!-- 安全服务 -->
<template>
  <d2-container>
    <el-table :data="t_security_services" border :header-cell-style="{ 'background-color': 'rgba(238, 238, 238,1.0)' }">
      <el-table-column label="安全服务名称" width="450">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index + 1, 'servicesName')"
            class="itsz"
          ></div>
          <el-input
            :ref="'servicesName' + scope.$index + 1"
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

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="is_compile(scope.row)">编辑</el-button> -->
          <el-button size="mini" @click="is_preserve(scope.$index, true)"
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
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      Itzm: false,
      t_security_services: [
        { servicesName: "", serviceProvider: "", show: false },
      ],
      indexs: "",
    };
  },
  created() {
    this.getlistdata();
    // })
  },
  mounted() {
    var that = this;
    document.addEventListener("click", function (e) {
      if (e.target.className == "d2-container-full__body") {
        that.indexs = "";
        that.getlistdata();
      }
    });
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
          this.t_security_services = List;
          if (this.indexs || this.indexs === 0) {
            this.t_security_services[this.indexs].show = true;
          }
        } else {
          this.t_security_services = [
            { servicesName: "", serviceProvider: "", show: false },
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
    is_compile(item, index, itname) {
      console.log(item, index, itname);
      if (this.indexs == index || this.indexs == "") {
        item.show = true;
      } else {
        this.t_security_services.forEach((items) => {
          items.show = false;
        });
        item.show = true;
      }
      this.indexs = index;
      setTimeout(() => {
        this.$refs[itname + index].focus();
      }, 1);
      console.log(item);
    },
    async schujiaodian(item) {
      // item.show = false;
      let res = "";
      if (item.id && item.id != "undefined") {
        if (this.Itzm == true) {
          res = await this.$api.API_securityServicessaveService(item);
        } else {
          res = await this.$api.API_securityServicesupdateService(item);
        }
      } else {
        res = await this.$api.API_securityServicessaveService(item);
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
    is_preserve(item, Itzm) {
      var itss = this.t_security_services;
      this.Itzm = Itzm;
      var list = {
        servicesName: "",
        serviceProvider: "",
        show: false,
        sortNum: item + 1,
      };
      itss.splice(item + 1, 0, list);
      this.t_security_services = itss;
      this.schujiaodian(this.t_security_services[item + 1]);
    },
    async deleteRow(index, rows) {
      console.log(rows);
      this.$confirm("确定删除此记录?", "提示", {
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
.el-table td,
.el-table th.is-leaf {
  text-align: center;
}
</style>