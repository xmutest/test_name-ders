<!--业务应用软件/平台-->
<template>
  <d2-container>
    <el-table
      :data="tabledatas"
      border
      :header-cell-style="{ 'background-color': 'rgba(238, 238, 238,1.0)' }"
    >
      <el-table-column label="应用系统/平台名称">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'softwarePlatformName')"
            class="itsz"
          ></div>
          <el-input
            :ref="'softwarePlatformName' + scope.$index"
            @blur="schujiaodian(scope.row)"
            v-show="scope.row.show"
            v-model="scope.row.softwarePlatformName"
          ></el-input>
          <span v-show="!scope.row.show">{{
            scope.row.softwarePlatformName
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="主要功能">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'majorFunction')"
            class="itsz"
          ></div>
          <el-input
            :ref="'majorFunction' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.majorFunction"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.majorFunction }}</span>
        </template>
      </el-table-column>

      <el-table-column label="应用软件及版本">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'softwareEdition')"
            class="itsz"
          ></div>
          <el-input
            :ref="'softwareEdition' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.softwareEdition"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.softwareEdition }}</span>
        </template>
      </el-table-column>

      <el-table-column label="开发厂商">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'developManufacturers')"
            class="itsz"
          ></div>
          <el-input
            :ref="'developManufacturers' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.developManufacturers"
          ></el-input>
          <span v-show="!scope.row.show">{{
            scope.row.developManufacturers
          }}</span>
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

      <!-- <el-table-column label="评测指导书">
        <template slot-scope="scope">
          <div
            @click="
              is_compile(scope.row, scope.$index, 'evaluationInstructionBookId')
            "
            class="itsz"
          ></div>
          <el-input
            :ref="'evaluationInstructionBookId' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.evaluationInstructionBookId"
          ></el-input>
          <span v-show="!scope.row.show">{{
            scope.row.evaluationInstructionBookId
          }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="测评对象" width="80">
        <template slot-scope="scope">
          <el-checkbox
            @change="schujiaodianTm(scope.row)"
            v-model="scope.row.isEvaluationObj"
          ></el-checkbox>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      //  		重要程度	测评对象	排序号
      importance_list: [
         { value: 5, label: "非常重要" },
        { value: 4, label: "重要" },
        { value: 3, label: "一般" },
        { value: 2, label: "不太重要" },
        { value: 1, label: "不重要" },
      ],
      tabledatas: [
        {
          softwarePlatformName: "",
          majorFunction: "",
          softwareEdition: "",
          importantDegree: 1,
          isEvaluationObj: false,
          developManufacturers: "",
          sortNum: 1,
          show: false,
        },
      ],
      indexs: null,
    };
  },
  created() {
    this.getlistdata();
  },
  computed: {
    ...mapState("d2admin", {
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  mounted() {
    var that = this;
    document.addEventListener("click", function (e) {
      if (
        e.target.className != "itsz" &&
        e.target.className != "el-input__inner"
      ) {
        that.indexs = "";
        that.getlistdata();
      }
    });
  },
  methods: {
    async getlistdata() {
      let res = await this.$api.APISoftwarePlatformFindsoftwarePlatform(
        this.formPage
      );
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
          if (this.indexs || this.indexs === 0) {
            this.tabledatas[this.indexs].show = true;
          }
        } else {
          this.tabledatas = [
            {
              softwarePlatformName: "",
              majorFunction: "",
              softwareEdition: "",
              importantDegree: 1,
              isEvaluationObj: false,
              developManufacturers: "",
              sortNum: 1,
              show: false,
            },
          ];
        }

        // this.ProjectQueryList();
        //查询列表
      } else {
        this.$message.error("错误，数据查询失败" + res.message);
      }
    },
    is_compile(item, index, itname) {
      // console.log(item,index,itname)
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
    async schujiaodian(item) {
      if (item.isEvaluationObj == true) {
        item.isEvaluationObj = 1;
      } else {
        item.isEvaluationObj = 0;
      }
      let res = "";
      if (item.id && item.id != "undefined") {
        if (this.Itzm == true) {
          res = await this.$api.API_SoftwarePlatformSaveSoftwarePlatformt(item);
        } else {
          res = await this.$api.API_SoftwarePlatformUpdateSoftwarePlatform(
            item
          );
        }
      } else {
        res = await this.$api.API_SoftwarePlatformSaveSoftwarePlatformt(item);
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
        softwarePlatformName: "",
        majorFunction: "",
        softwareEdition: "",
        importantDegree: 1,
        isEvaluationObj: false,
        developManufacturers: "",
        sortNum,
        show: false,
      };
      itss.splice(item + 1, 0, list);
      this.tabledatas = itss;
      this.schujiaodian(this.tabledatas[item + 1]);
    },
    async deleteRow(index, rows) {
      this.$confirm("确定删除此记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$api.APISoftwarePlatformDelSoftwarePlatform({
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
    async schujiaodianTm(item) {
      let data = {
        assetsNum: 5,
        assetsId: item.id,
        guideBookId: item.evaluationInstructionBookId,
        projectId: this.xmu_info.projectId,
        evaluationGrade: this.xmu_info.data.level,
      };
      let lsmin =
        item.isEvaluationObj == true
          ? "确定设置为测评对象？"
          : "确定设置为非测评对象？系统将删除与其相关的测评数据";
      this.$confirm(lsmin, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = "";
          if (item.isEvaluationObj === true) {
            res = await this.$api.SYS_FieldSurveyActive(data);
          } else {
            res = await this.$api.SYS_FieldSurveyDelete(data);
          }
          if (res.code === 20000) {
            this.schujiaodian(item);
            //查询列表
          } else {
            this.$message.error("删除错误，请联系管理员" + res.message);
          }
        })
        .catch(() => {
          item.isEvaluationObj = !item.isEvaluationObj;
          this.$message({
            type: "info",
            message: "已取消",
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


