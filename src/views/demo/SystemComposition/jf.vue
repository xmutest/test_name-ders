<!--机房-->
<template>
  <d2-container>
    <el-table
      :data="tabledatas"
      border
      :header-cell-style="{ 'background-color': 'rgba(238, 238, 238,1.0)' }"
    >
      <el-table-column label="" width="80">
        <template slot-scope="scope">
          <div class="itsz"></div>
          <span v-show="!scope.row.show">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="机房名称">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'computerRoomName')"
            class="itsz"
          ></div>
          <el-input
            :ref="'computerRoomName' + scope.$index"
            @blur="schujiaodian(scope.row)"
            v-show="scope.row.show"
            v-model="scope.row.computerRoomName"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.computerRoomName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物理位置">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'physicalPosition')"
            class="itsz"
          ></div>
          <el-input
            :ref="'physicalPosition' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.physicalPosition"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.physicalPosition }}</span>
        </template>
      </el-table-column>

      <el-table-column label="重要程度">
        <template slot-scope="scope">
          <el-select
            @change="schujiaodian(scope.row)"
            v-model="scope.row.importantDegree"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in importance_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="测评对象" width="80">
        <template slot-scope="scope">
          <el-checkbox @change="schujiaodian(scope.row)" v-model="scope.row.isEvaluationObj"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="is_compile(scope.row)">编辑</el-button> -->
          <el-button
            size="mini"
            @click="is_preserve(scope.$index, true, scope.row.sortNum)"
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
      //  		重要程度	测评对象	排序号
      importance_list: [
        { value: 5, label: "非常重要(5)" },
        { value: 4, label: "重要（4）" },
        { value: 3, label: "一般（3）" },
        { value: 2, label: "不太重要（2）" },
        { value: 1, label: "不重要（1）" },
      ],
      tabledatas: [
        {
          computerRoomName: "",
          physicalPosition: "",
          importantDegree: 1,
          isEvaluationObj: false,
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
      let res = await this.$api.API_JF_ComputerRoomFindComputerRoom(
        this.formPage
      );
      console.log(res);
      if (res.code === 20000) {
        let List = res.data.list;
        if (res.data.list.length > 0) {
          List.forEach((element) => {
            if (element.isEvaluationObj == 1) {
              element.isEvaluationObj = true;
            } else {
              element.isEvaluationObj = false;
            }
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
      // console.log(item,index,itname)
      item.show = true;
      console.log(itname);
      setTimeout(() => {
        this.$refs[itname + index].focus();
      }, 1);
      console.log(item);
    },
    async schujiaodian(item) {
      if (item.isEvaluationObj == true) {
        item.isEvaluationObj = 1;
      } else {
        item.isEvaluationObj = 0;
      }
      item.show = false;
      let res = "";
      if (item.id && item.id != "undefined") {
        if (this.Itzm == true) {
          res = await this.$api.API_JF_ComputerRoomFindSaveRoom(item);
        } else {
          res = await this.$api.API_JF_ComputerRoomFindUpdateRoom(item);
        }
      } else {
        res = await this.$api.API_JF_ComputerRoomFindSaveRoom(item);
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
      var itss = this.tabledatas;
      this.Itzm = Itzm;
      var list = {
        computerRoomName: "",
        physicalPosition: "",
        importantDegree: 1,
        isEvaluationObj: 0,
        show: false,
        sortNum: sortNum,
      };
      itss.splice(item + 1, 0, list);
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
          let res = await this.$api.API_JF_ComputerRoomFindDelComputerRoom({
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
</style>
