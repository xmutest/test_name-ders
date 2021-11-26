<!--数据库管理系统-->
<template>
  <d2-container>
    <div>
      <el-table
        :data="tabledatas"
        border
        :header-cell-style="{ 'background-color': 'rgba(238, 238, 238,1.0)' }"
      >
        <el-table-column label="设备名称" width="100">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'equipmentName')"
              class="itsz"
            ></div>
            <el-input
              :ref="'equipmentName' + scope.$index"
              @blur="
                schujiaodian({
                  id: scope.row.id,
                  equipmentName: scope.row.equipmentName,
                })
              "
              v-show="scope.row.show"
              v-model="scope.row.equipmentName"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.equipmentName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否虚拟设备" width="80">
          <template slot-scope="scope">
            <el-checkbox
              @change="
                schujiaodian({
                  id: scope.row.id,
                  isFictitiousEquipment: scope.row.isFictitiousEquipment,
                })
              "
              v-model="scope.row.isFictitiousEquipment"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="数据库管理系统及版本" width="100">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'manageSysEdition')"
              class="itsz"
            ></div>
            <el-input
              :ref="'manageSysEdition' + scope.$index"
              @blur="
                schujiaodian({
                  id: scope.row.id,
                  manageSysEdition: scope.row.manageSysEdition,
                })
              "
              placeholder="请输入内容"
              v-show="scope.row.show"
              v-model="scope.row.manageSysEdition"
            ></el-input>
            <span v-show="!scope.row.show">{{
              scope.row.manageSysEdition
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="系统/平台名称" width="120">
          <template slot-scope="scope">
            <div
              @click="
                is_compile(scope.row, scope.$index, 'softwarePlatformName')
              "
              class="itsz"
            ></div>
            <el-input
              placeholder="请输入内容"
              :ref="'softwarePlatformName' + scope.$index"
              @blur="
                schujiaodian({
                  id: scope.row.id,
                  softwarePlatformName: scope.row.softwarePlatformName,
                })
              "
              v-show="scope.row.show"
              v-model="scope.row.softwarePlatformName"
            ></el-input>
            <span v-show="!scope.row.show">{{
              scope.row.softwarePlatformName
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作系统版本" width="120">
          <template slot-scope="scope">
            <div
              @click="
                is_compile(scope.row, scope.$index, 'operatingSysEdition')
              "
              class="itsz"
            ></div>
            <el-input
              placeholder="请输入内容"
              :ref="'operatingSysEdition' + scope.$index"
              @blur="
                schujiaodian({
                  id: scope.row.id,
                  operatingSysEdition: scope.row.operatingSysEdition,
                })
              "
              v-show="scope.row.show"
              v-model="scope.row.operatingSysEdition"
            ></el-input>
            <span v-show="!scope.row.show">{{
              scope.row.operatingSysEdition
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="中间件及版本" width="110">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'middlewareEdition')"
              class="itsz"
            ></div>
            <el-input
              placeholder="请输入内容"
              :ref="'middlewareEdition' + scope.$index"
              @blur="
                schujiaodian({
                  id: scope.row.id,
                  middlewareEdition: scope.row.middlewareEdition,
                })
              "
              v-show="scope.row.show"
              v-model="scope.row.middlewareEdition"
            ></el-input>
            <span v-show="!scope.row.show">{{
              scope.row.middlewareEdition
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="所在设备名称" width="110">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'inEquipmentName')"
              class="itsz"
            ></div>
            <el-input
              placeholder="请输入内容"
              :ref="'inEquipmentName' + scope.$index"
              @blur="
                schujiaodian({
                  id: scope.row.id,
                  inEquipmentName: scope.row.inEquipmentName,
                })
              "
              v-show="scope.row.show"
              v-model="scope.row.inEquipmentName"
            ></el-input>
            <span v-show="!scope.row.show">{{
              scope.row.inEquipmentName
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="主要功能" width="110">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'majorFunction')"
              class="itsz"
            ></div>
            <el-input
              placeholder="请输入内容"
              :ref="'majorFunction' + scope.$index"
              @blur="
                schujiaodian({
                  id: scope.row.id,
                  majorFunction: scope.row.majorFunction,
                })
              "
              v-show="scope.row.show"
              v-model="scope.row.majorFunction"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.majorFunction }}</span>
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
        <el-table-column label="测评指导书" width="150">
          <template slot-scope="scope">
            <el-select
              
              @change="
                schujiaodian({
                  id: scope.row.id,
                  evaluationInstructionBookId:
                    scope.row.evaluationInstructionBookId,
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
              v-show="scope.row.id"
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
    <!-- 新增表单 -->
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
          equipmentName: "",
          isFictitiousEquipment: false,
          manageSysEdition: "",
          softwarePlatformName: "",
          operatingSysEdition: "",
          middlewareEdition: 1,
          inEquipmentName: "",
          majorFunction: "",
          importantDegree: 5,
          isEvaluationObj: false,
          sortNum: 1,
          show: false,
          evaluationInstructionBookId: 30,
        },
      ],
      evaluationBookNameList: [
        { id: 37, label: "mongoDB" },
        { id: 30, label: "默认数据库" },
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      importance_list: [
        { value: 5, label: "关键" },
        { value: 4, label: "重要" },
        { value: 3, label: "一般" },
      ],
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
  methods: {
    changeInput(item) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        // console.log(item.computerRoomName);
        this.schujiaodian(item);
      }, 1000);
      // console.log(item.computerRoomName);
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
      let res = await this.$api.APIDbManageSysFindDbManageSys(this.formPage);
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
            if (element.isFictitiousEquipment == 1) {
              element.isFictitiousEquipment = true;
            } else {
              element.isFictitiousEquipment = false;
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
              equipmentName: "",
              isFictitiousEquipment: false,
              manageSysEdition: "",
              softwarePlatformName: "",
              operatingSysEdition: "",
              middlewareEdition: 1,
              inEquipmentName: "",
              majorFunction: "",
              importantDegree: 5,
              isEvaluationObj: false,
              sortNum: 1,
              show: false,
              evaluationInstructionBookId: 30,
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
        if (item.isEvaluationObj == true) {
          item.isEvaluationObj = 1;
        } else {
          item.isEvaluationObj = 0;
        }
      }
      if (typeof item.isFictitiousEquipment == "boolean") {
        if (item.isFictitiousEquipment == true) {
          item.isFictitiousEquipment = 1;
        } else {
          item.isFictitiousEquipment = 0;
        }
      }

      let res = "";
      if (item.id && item.id != "undefined") {
        if (this.Itzm == true) {
          res = await this.$api.API_DbManageSysSaveDbManageSys(item);
        } else {
          if (item.equipmentName != "") {
            res = await this.$api.API_DbManageSysUpdateDbManageSys(item);
          }
        }
      } else {
        res = await this.$api.API_DbManageSysSaveDbManageSys(item);
      }
      if (res.code === 20000) {
        this.getlistdata();
        this.Itzm = false;
        //查询列表
      }
      this.Itzm = false;
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
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
        equipmentName: "",
        isFictitiousEquipment: false,
        manageSysEdition: "",
        softwarePlatformName: "",
        operatingSysEdition: "",
        middlewareEdition: 1,
        inEquipmentName: "",
        majorFunction: "",
        importantDegree: 5,
        isEvaluationObj: false,
        sortNum,
        show: false,
        evaluationInstructionBookId: 30,
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
          let res = await this.$api.APIDbManageSysDelDbManageSys({
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
        assetsNum: 7,
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
