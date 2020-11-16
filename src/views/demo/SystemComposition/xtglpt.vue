<!--服务器/存储设备-->
<template>
  <d2-container>
    <el-table
      :data="tabledatas"
      border
      :header-cell-style="{ 'background-color': 'rgba(238, 238, 238,1.0)' }"
    >
      <el-table-column label="管理软件/平台名称">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'platformExtendName')"
            class="itsz"
          ></div>
          <el-input
            :ref="'platformExtendName' + scope.$index"
            @blur="
              schujiaodian({
                id: scope.row.id,
                platformExtendName: scope.row.platformExtendName,
              })
            "
            v-show="scope.row.show"
            v-model="scope.row.platformExtendName"
          ></el-input>
          <span v-show="!scope.row.show">{{
            scope.row.platformExtendName
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所在设备名称">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'inEquipmentName')"
            class="itsz"
          ></div>
          <el-input
            :ref="'inEquipmentName' + scope.$index"
            @blur="
              schujiaodian({
                id: scope.row.id,
                inEquipmentName: scope.row.inEquipmentName,
              })
            "
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.inEquipmentName"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.inEquipmentName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="版本">
        <template slot-scope="scope">
          <div
            @click="
              is_compile(scope.row, scope.$index, 'platformExtendEdition')
            "
            class="itsz"
          ></div>
          <el-input
            :ref="'platformExtendEdition' + scope.$index"
            @blur="
              schujiaodian({
                id: scope.row.id,
                platformExtendEdition: scope.row.platformExtendEdition,
              })
            "
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.platformExtendEdition"
          ></el-input>
          <span v-show="!scope.row.show">{{
            scope.row.platformExtendEdition
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
            @blur="
              schujiaodian({
                id: scope.row.id,
                majorFunction: scope.row.majorFunction,
              })
            "
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.majorFunction"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.majorFunction }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'remarks')"
            class="itsz"
          ></div>
          <el-input
            :ref="'remarks' + scope.$index"
            @blur="
              schujiaodian({
                id: scope.row.id,
                remarks: scope.row.remarks,
              })
            "
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.remarks"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.remarks }}</span>
        </template>
      </el-table-column>

      <el-table-column label="重要程度" width="130">
        <template slot-scope="scope">
          <el-select
            @change="
              schujiaodian({
                id: scope.row.id,
                importantDegree: scope.row.importantDegree,
              })
            "
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

      <el-table-column label="评测指导书">
        <template slot-scope="scope">
          <el-select
            @change="
              schujiaodian({
                id: scope.row.id,
                evaluationInstructionBookId: scope.row.evaluationInstructionBookId,
              })
            "
            v-model="scope.row.evaluationInstructionBookId"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in evaluationBookNameList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>

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
    <div class="page_name" style="padding: 0 20px 20px 20px;margin: 15px 0;">
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
    </div>
  </d2-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      Itzm: false,
      evaluationBookNameList: [
        { id: 24, label: "业务应用系统" },
        { id: 25, label: "云管理平台（扩展）" },
        { id: 26, label: "移动管理平台（扩展）" },
        { id: 27, label: "物联管理平台（扩展）" },
        { id: 28, label: "工控管理平台（扩展）" },
        { id: 29, label: "大数据管理平台（扩展）" },
      ],
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
          platformExtendName: "",
          inEquipmentName: "",
          platformExtendEdition: "",
          importantDegree: 5,
          remarks: "",
          evaluationInstructionBookId: 24,
          isEvaluationObj: false,
          show: false,
        },
      ],
      formPage: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
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
        // that.getlistdata();
      }
    });
  },
  methods: {
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
      let res = await this.$api.PlatformExtendFindPlatformExtend(this.formPage);
      if (res.code === 20000) {
        let List = res.data.list;
        this.total=res.data.total;
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
              platformExtendName: "",
              inEquipmentName: "",
              platformExtendEdition: "",
              importantDegree: 5,
              evaluationInstructionBookId: 24,
              remarks: "",
              sortNum: 1,
              isEvaluationObj: false,
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
      if (typeof item.isEvaluationObj == "boolean") {
        if (item.isEvaluationObj == true) {
          item.isEvaluationObj = 1;
        } else {
          item.isEvaluationObj = 0;
        }
      }
      let res = "";
      if (item.id && item.id != "undefined") {
        if (this.Itzm == true) {
          res = await this.$api.API_PlatformExtendSavePlatformExtend(item);
        } else {
          res = await this.$api.API_PlatformExtendUpdatePlatformExtend(item);
        }
      } else {
        res = await this.$api.API_PlatformExtendSavePlatformExtend(item);
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
        platformExtendName: "",
        inEquipmentName: "",
        platformExtendEdition: "",
        importantDegree: 5,
        evaluationInstructionBookId: 24,
        remarks: "",
        sortNum,
        isEvaluationObj: false,
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
          let res = await this.$api.APIPlatformExtendDelPlatformExtend({
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
        assetsNum: 6,
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



