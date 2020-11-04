<!--安全管理中心-->
<template>
  <d2-container>
    <el-table :data="tabledatas" border>
      <el-table-column label="名称" width="120">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'safeManageCenterName')"
            class="itsz"
          ></div>
          <el-input
            :ref="'safeManageCenterName' + scope.$index"
            @blur="schujiaodian(scope.row)"
            v-show="scope.row.show"
            v-model="scope.row.safeManageCenterName"
          ></el-input>
          <span v-show="!scope.row.show">{{
            scope.row.safeManageCenterName
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="功能描述" width="150">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'functionDescription')"
            class="itsz"
          ></div>
          <el-input
            :ref="'functionDescription' + scope.$index"
            @blur="schujiaodian(scope.row)"
            v-show="scope.row.show"
            v-model="scope.row.functionDescription"
          ></el-input>
          <span v-show="!scope.row.show">{{
            scope.row.functionDescription
          }}</span>
        </template>
      </el-table-column>
      <!-- 尚未完成 2020/10/15 doge127 -->
      <el-table-column label="系统管理" width="80">
        <template slot-scope="scope">
          <el-checkbox
            @change="schujiaodian(scope.row)"
            v-model="scope.row.isSysManage"
          ></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column label="审计管理" width="80">
        <template slot-scope="scope">
          <el-checkbox
            @change="schujiaodian(scope.row)"
            v-model="scope.row.isAuditManage"
          ></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column label="安全管理" width="80">
        <template slot-scope="scope">
          <el-checkbox
            @change="schujiaodian(scope.row)"
            v-model="scope.row.isSafeManage"
          ></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column label="集中管理" width="80">
        <template slot-scope="scope">
          <el-checkbox
            @change="schujiaodian(scope.row)"
            v-model="scope.row.isCentralizedControl"
          ></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column label="重要程度" width="150">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.importantDegree"
            filterable
            @change="schujiaodian(scope.row)"
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
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      importantDegree_list: [
        { value: 5, label: "非常重要(5)" },
        { value: 4, label: "重要（4）" },
        { value: 3, label: "一般（3）" },
        { value: 2, label: "不太重要（2）" },
        { value: 1, label: "不重要（1）" },
      ],
      tabledatas: [
        {
          safeManageCenterName: "管理",
          functionDescription: "功能描述",
          importantDegree: 1,
          isSysManage: false,
          isAuditManage: false,
          isSafeManage: false,
          isCentralizedControl: false,
          sortNum: 1,
          show: false,
        },
      ],
      formPage: {
        pageNum: 1,
        pageSize: 10,
      },
      indexs: null,
    };
  },
  created() {
    this.getlistdata();
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
      let res = await this.$api.APISafeManageCenterFindSafeManageCenter(
        this.formPage
      );
      if (res.code === 20000) {
        let List = res.data.list;
        if (res.data.list.length > 0) {
          List.forEach((element) => {
            element.isSysManage = element.isSysManage == 1 ? true : false;
            element.isAuditManage = element.isAuditManage == 1 ? true : false;
            element.isSafeManage = element.isSafeManage == 1 ? true : false;
            element.isCentralizedControl =
              element.isCentralizedControl == 1 ? true : false;
            element["show"] = false;
          });
          this.tabledatas = List;
          if (this.indexs || this.indexs === 0) {
            this.tabledatas[this.indexs].show = true;
          }
        }

        // this.ProjectQueryList();
        //查询列表
      } else {
        this.$message.error("错误，数据查询失败" + res.message);
      }
    },
    async schujiaodian(item) {
      item.isSysManage = item.isSysManage == true ? 1 : 0;
      item.isAuditManage = item.isAuditManage == true ? 1 : 0;
      item.isSafeManage = item.isSafeManage == true ? 1 : 0;
      item.isCentralizedControl = item.isCentralizedControl == true ? 1 : 0;
      let res = "";
      if (item.id && item.id != "undefined") {
        if (this.Itzm == true) {
          res = await this.$api.API_SafeManageCenterSaveSafeManageCenter(item);
        } else {
          res = await this.$api.API_SafeManageCenterUpdateSafeManageCenter(
            item
          );
        }
      } else {
        res = await this.$api.API_SafeManageCenterSaveSafeManageCenter(item);
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
    is_preserve(item, Itzm, sortNum) {
      this.Itzm = Itzm;
      var itss = this.tabledatas;
      var basicData = {
        safeManageCenterName: "",
        functionDescription: "",
        importantDegree: 1,
        isSysManage: false,
        isAuditManage: false,
        isSafeManage: false,
        isCentralizedControl: false,
        sortNum: 1,
        show: false,
      };
      itss.splice(item + 1, 0, basicData);
      this.tabledatas = itss;
      this.schujiaodian(this.tabledatas[item + 1]);
    },
    async deleteRow(index, rows) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$api.APISafeManageCenterDelSafeManageCenter({
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