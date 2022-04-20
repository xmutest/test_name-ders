<!--区域边界-->
<template>
  <d2-container>
    <el-table
      :data="tabledatas"
      border
      :header-cell-style="{ 'background-color': 'rgba(238, 238, 238,1.0)' }"
    >
      <el-table-column label="边界名称">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'boundaryName')"
            class="itsz"
          ></div>
          <el-input
            :ref="'boundaryName' + scope.$index"
            @blur="schujiaodian(scope.row)"
            v-show="scope.row.show"
            v-model="scope.row.boundaryName"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.boundaryName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="接入方式">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'accessMode')"
            class="itsz"
          ></div>
          <el-input
            :ref="'accessMode' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.accessMode"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.accessMode }}</span>
        </template>
      </el-table-column>

      <el-table-column label="承载主要业务应用">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'mainBusiness')"
            class="itsz"
          ></div>
          <el-input
            :ref="'mainBusiness' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.mainBusiness"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.mainBusiness }}</span>
        </template>
      </el-table-column>

      <el-table-column label="重要程度" width="130">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.importantDegree"
            @change="schujiaodian(scope.row)"
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
      <el-table-column label="选择指导书" width="130">
        <template slot-scope="scope">
          <el-select
            @change="
              schujiaodian({
                id: scope.row.id,
                isNewBook: scope.row.resultBookId,
              })
            "
            v-model="scope.row.resultBookId"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in iongeist"
              :key="item.id"
              :label="item.evaluationBookName"
              :value="item.id"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <!-- <el-table-column label="测评指导书">
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
            v-show="scope.row.id"
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
    <!-- <div class="page_name" style="padding: 0 20px 20px 20px; margin: 15px 0">
      <div class="search_ls">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="formPage.pageNum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="formPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div> -->
  </d2-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      Itzm: false,
      //  		重要程度	测评对象	 排序号
      importance_list: [
        { value: 5, label: "关键" },
        { value: 4, label: "重要" },
        { value: 3, label: "一般" },
      ],
      iongeist: [],
      tabledatas: [
        {
          boundaryName: "",
          accessMode: "",
          mainBusiness: "",
          importantDegree: 5,
          evaluationInstructionBookId: 1,
          isEvaluationObj: false,
          sortNum: 1,
          show: false,
          resultBookId: "",
        },
      ],
      formPage: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      indexs: "",
    };
  },
  created() {
    this.getlistdata();
    this.compositiongeFile();
  },
  mounted() {
    var that = this;
    document.addEventListener("click", function (e) {
      if (
        e.target.className != "itsz" &&
        e.target.className != "el-input__inner"
      ) {
        clearTimeout(that.timeout);
        that.timeout = setTimeout(() => {
          // console.log(item.computerRoomName);
          that.indexs = "";
          that.tabledatas.forEach((items) => {
            items.show = false;
          });
        }, 200);
      }
    });
  },
  computed: {
    ...mapState("d2admin", {
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  methods: {
     async compositiongeFile() {
      let res = await this.$api.sysCompositiongeFile({
        systemCompositionId: 2,
      });
      if (res.code === 20000) {
        this.iongeist = res.data;
      }
      // console.log(res);
    },
    // 分页
    handleSizeChange(val) {
      this.formPage.pageSize = val;
      this.getlistdata();
    },
    handleCurrentChange(val) {
      this.formPage.pageNum = val;
      this.getlistdata();
    },
    async getlistdata() {
      let res = await this.$api.API_JF_RegionBoundaryFndRegionBoundary(
        this.formPage
      );

      if (res.code === 20000) {
        let List = res.data;
        // this.total = res.data.total;
        if (res.data.length > 0) {
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
              boundaryName: "",
              accessMode: "",
              mainBusiness: "",
              importantDegree: 5,
              evaluationInstructionBookId: 1,
              isEvaluationObj: false,
              show: false,
              sortNum: 1,
              resultBookId: "",
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
          res = await this.$api.API_RegionBoundarySaveRegionBoundary(item);
        } else {
          if (item.boundaryName != "") {
            res = await this.$api.API_RegionBoundaryUpdateRegionBoundary(item);
          }
        }
      } else {
        res = await this.$api.API_RegionBoundarySaveRegionBoundary(item);
      }
      if (res.code === 20000) {
        this.getlistdata();
        this.Itzm = false;
        //查询列表
      }
      this.Itzm = false;
    },
    is_preserve(item, Itzm, sortNum) {
      var itss = this.tabledatas;
      this.Itzm = Itzm;
      var list = {
        boundaryName: "",
        accessMode: "",
        mainBusiness: "",
        importantDegree: 5,
        evaluationInstructionBookId: 1,
        isEvaluationObj: false,
        show: false,
        sortNum,
        resultBookId: "",
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
          let res = await this.$api.API_RegionBoundaryDelRegionBoundary({
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
        assetsNum: 2,
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
            this.schujiaodian({
              id: item.id,
              isEvaluationObj: item.isEvaluationObj,
            });
            //查询列表
          } else {
            this.$message.error("错误，请联系管理员" + res.message);
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
