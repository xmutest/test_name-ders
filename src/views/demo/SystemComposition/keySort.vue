<!--关键数据类别-->
<template>
  <d2-container>
    <div>
      <el-table
        :data="tabledatas"
        border
        :header-cell-style="{ 'background-color': 'rgba(238, 238, 238,1.0)' }"
      >
        <el-table-column label="数据类别" width="100">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'dataType')"
              class="itsz"
            ></div>
            <el-input
              :ref="'dataType' + scope.$index"
              @blur="
                schujiaodian({
                  id: scope.row.id,
                  dataType: scope.row.dataType,
                })
              "
              v-show="scope.row.show"
              v-model="scope.row.dataType"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.dataType }}</span>
          </template>
        </el-table-column>

        <el-table-column label="所属业务应用" width="100">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'belongsBusiness')"
              class="itsz"
            ></div>
            <el-input
              :ref="'belongsBusiness' + scope.$index"
              @blur="
                schujiaodian({
                  id: scope.row.id,
                  belongsBusiness: scope.row.belongsBusiness,
                })
              "
              placeholder="请输入内容"
              v-show="scope.row.show"
              v-model="scope.row.belongsBusiness"
            ></el-input>
            <span v-show="!scope.row.show">{{
              scope.row.belongsBusiness
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="安全防护需求" width="120">
          <template slot-scope="scope">
            <div
              @click="
                is_compile(scope.row, scope.$index, 'safetyProtectionDemand')
              "
              class="itsz"
            ></div>
            <el-input
              placeholder="请输入内容"
              :ref="'safetyProtectionDemand' + scope.$index"
              @blur="
                schujiaodian({
                  id: scope.row.id,
                  safetyProtectionDemand: scope.row.safetyProtectionDemand,
                })
              "
              v-show="scope.row.show"
              v-model="scope.row.safetyProtectionDemand"
            ></el-input>
            <span v-show="!scope.row.show">{{
              scope.row.safetyProtectionDemand
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="主要储存设备" width="120">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'storageDevice')"
              class="itsz"
            ></div>
            <el-input
              placeholder="请输入内容"
              :ref="'storageDevice' + scope.$index"
              @blur="
                schujiaodian({
                  id: scope.row.id,
                  storageDevice: scope.row.storageDevice,
                })
              "
              v-show="scope.row.show"
              v-model="scope.row.storageDevice"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.storageDevice }}</span>
          </template>
        </el-table-column>

        <el-table-column label="数据采集" width="70">
          <template slot-scope="scope">
            <el-checkbox
              @change="
                schujiaodian({
                  id: scope.row.id,
                  isDataAcquisition: scope.row.isDataAcquisition,
                })
              "
              v-model="scope.row.isDataAcquisition"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="数据储存" width="70">
          <template slot-scope="scope">
            <el-checkbox
              @change="
                schujiaodian({
                  id: scope.row.id,
                  isDataStorage: scope.row.isDataStorage,
                })
              "
              v-model="scope.row.isDataStorage"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="数据处理" width="70">
          <template slot-scope="scope">
            <el-checkbox
              @change="
                schujiaodian({
                  id: scope.row.id,
                  isDataHandle: scope.row.isDataHandle,
                })
              "
              v-model="scope.row.isDataHandle"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="数据应用" width="70">
          <template slot-scope="scope">
            <el-checkbox
              @change="
                schujiaodian({
                  id: scope.row.id,
                  isDataApplication: scope.row.isDataApplication,
                })
              "
              v-model="scope.row.isDataApplication"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="数据流动" width="70">
          <template slot-scope="scope">
            <el-checkbox
              @change="
                schujiaodian({
                  id: scope.row.id,
                  isDataFlow: scope.row.isDataFlow,
                })
              "
              v-model="scope.row.isDataFlow"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="数据销毁" width="70">
          <template slot-scope="scope">
            <el-checkbox
              @change="
                schujiaodian({
                  id: scope.row.id,
                  isDataDestruction: scope.row.isDataDestruction,
                })
              "
              v-model="scope.row.isDataDestruction"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="重要程度" width="130">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.importantDegree"
              filterable
              @change="
                schujiaodian({
                  id: scope.row.id,
                  importantDegree: scope.row.importantDegree,
                })
              "
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
        <el-table-column label="测评对象" width="70">
          <template slot-scope="scope">
            <el-checkbox
              @change="schujiaodianTm(scope.row)"
              v-model="scope.row.isEvaluationObj"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
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
    </div>
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
      tabledatas: [
        {
          dataType: "",
          isDataAcquisition: false,
          isDataStorage: false,
          isDataHandle: false,
          isDataApplication: false,
          isDataFlow: false,
          isDataDestruction: false,
          belongsBusiness: "",
          safetyProtectionDemand: "",
          storageDevice: "",
          importantDegree: 5,
          isEvaluationObj: false,
          sortNum: 1,
          show: false,
        },
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      importantDegree_list: [
        { value: 5, label: "非常重要" },
        { value: 4, label: "重要" },
        { value: 3, label: "一般" },
        { value: 2, label: "不太重要" },
        { value: 1, label: "不重要" },
      ],
      xmform: {
        dataType: "",
        isDataAcquisition: false,
        belongsBusiness: "",
        safetyProtectionDemand: "",
        storageDevice: "",
        importantDegree: 5,
        isEvaluationObj: false,
      },
      formLabelWidth: "120px",
      rules: {},
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
    // })
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
      let res = await this.$api.APICruxDataTypeFindCruxDataType(this.formPage);
      if (res.code === 20000) {
        let List = res.data.list;
        this.total=res.data.total;
        if (res.data.list.length > 0) {
          List.forEach((element) => {
            element.isEvaluationObj =
              element.isEvaluationObj == 1 ? true : false;
            element.isFictitiousEquipment =
              element.isFictitiousEquipment == 1 ? true : false;
            element.isDataAcquisition =
              element.isDataAcquisition == 1 ? true : false;
            element.isDataStorage = element.isDataStorage == 1 ? true : false;
            element.isDataHandle = element.isDataHandle == 1 ? true : false;
            element.isDataApplication =
              element.isDataApplication == 1 ? true : false;
            element.isDataFlow = element.isDataFlow == 1 ? true : false;
            element.isDataDestruction =
              element.isDataDestruction == 1 ? true : false;
            element["show"] = false;
          });
          this.tabledatas = List;
          if (this.indexs || this.indexs === 0) {
            this.tabledatas[this.indexs].show = true;
          }
        } else {
          this.tabledatas = [
            {
              dataType: "",
              isDataAcquisition: false,
              isDataStorage: false,
              isDataHandle: false,
              isDataApplication: false,
              isDataFlow: false,
              isDataDestruction: false,
              belongsBusiness: "",
              safetyProtectionDemand: "",
              storageDevice: "",
              importantDegree: 5,
              isEvaluationObj: false,
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
    async schujiaodian(item) {
      if (typeof item.isEvaluationObj == "boolean") {
        item.isEvaluationObj = item.isEvaluationObj == true ? 1 : 0;
      }
      if (typeof item.isFictitiousEquipment == "boolean") {
        item.isFictitiousEquipment = item.isFictitiousEquipment == true ? 1 : 0;
      }
      if (typeof item.isDataAcquisition == "boolean") {
        item.isDataAcquisition = item.isDataAcquisition == true ? 1 : 0;
      }
      if (typeof item.isDataStorage == "boolean") {
        item.isDataStorage = item.isDataStorage == true ? 1 : 0;
      }
      if (typeof item.isDataHandle == "boolean") {
        item.isDataHandle = item.isDataHandle == true ? 1 : 0;
      }
      if (typeof item.isDataApplication == "boolean") {
        item.isDataApplication = item.isDataApplication == true ? 1 : 0;
      }
      if (typeof item.isDataFlow == "boolean") {
        item.isDataFlow = item.isDataFlow == true ? 1 : 0;
      }
      if (typeof item.isDataDestruction == "boolean") {
        item.isDataDestruction = item.isDataDestruction == true ? 1 : 0;
      }

      let res = "";
      if (item.id && item.id != "undefined") {
        if (this.Itzm == true) {
          res = await this.$api.API_CruxDataTypeSaveCruxDataType(item);
        } else {
          res = await this.$api.API_CruxDataTypeUpdateCruxDataType(item);
        }
      } else {
        res = await this.$api.API_CruxDataTypeSaveCruxDataType(item);
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
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
      var itss = this.tabledatas;
      this.Itzm = Itzm;
      var list = {
        dataType: "",
        isDataAcquisition: false,
        isDataStorage: false,
        isDataHandle: false,
        isDataApplication: false,
        isDataFlow: false,
        isDataDestruction: false,
        belongsBusiness: "",
        safetyProtectionDemand: "",
        storageDevice: "",
        importantDegree: 5,
        isEvaluationObj: false,
        sortNum,
        show: false,
      };
      itss.splice(item + 1, 0, list);
      this.tabledatas = itss;
      this.schujiaodian(this.tabledatas[item + 1]);
    },
    async deleteRow(index, rows) {
      this.$confirm(" 确定删除此记录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$api.APICruxDataTypeDelCruxDataType({
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
        assetsNum: 10,
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
.add_buoot {
  margin-bottom: 20px;
}
.add_from_xmu {
  ::v-deep .el-dialog__header {
    background-color: rgba(3, 169, 244, 0.5);
    .el-dialog__title {
      color: #ffffff;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #ffffff;
    }
  }
  .ist_lis {
    display: flex;
  }
  .dia-footer {
    text-align: right;
  }
}
.el-table {
  font-size: 12px;
}
.el-input {
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
