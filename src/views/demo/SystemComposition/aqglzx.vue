<!--安全管理中心-->
<template>
  <d2-container>
    <el-table :data="tabledatas" border>
      <el-table-column label="" width="80">
        <template slot-scope="scope">
          <div class="itsz"></div>
          <span v-show="!scope.row.show">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

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

      <el-table-column fixed="right" label="操作" width="200">
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
      importantDegree_list: [
        { value: 3, label: "高" },
        { value: 2, label: "中" },
        { value: 1, label: "低" },
      ],
      tabledatas: [
        {
          safeManageCenterName: "管理",
          functionDescription: "功能描述",
          importantDegree: "",
          isSysManage: false,
          isAuditManage: false,
          isSafeManage: false,
          isCentralizedControl: false,
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
        safeManageCenterName: "",
        functionDescription: "",
        importantDegree: "",
        isSysManage: false,
        isAuditManage: false,
        isSafeManage: false,
        isCentralizedControl: false,
        sortNum: 1,
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