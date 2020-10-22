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
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.equipmentName"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.equipmentName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="虚拟设备" width="80">
          <template slot-scope="scope">
            <el-checkbox
              @change="schujiaodian(scope.row)"
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
              @blur="schujiaodian(scope.row)"
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
              @blur="schujiaodian(scope.row)"
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
              @blur="schujiaodian(scope.row)"
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
              @blur="schujiaodian(scope.row)"
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
              @blur="schujiaodian(scope.row)"
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
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.middlewareEdition"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.majorFunction }}</span>
          </template>
        </el-table-column>

        <el-table-column label="重要程度" width="150">
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
          middlewareEdition: 5,
          inEquipmentName: "",
          majorFunction: "",
          importantDegree: 1,
          isEvaluationObj: false,
          sortNum: 1,
          show: false,
        },
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      importance_list: [
        { value: 5, label: "非常重要(5)" },
        { value: 4, label: "重要（4）" },
        { value: 3, label: "一般（3）" },
        { value: 2, label: "不太重要（2）" },
        { value: 1, label: "不重要（1）" },
      ],
      formLabelWidth: "120px",
      rules: {},
      formPage: {
        pageNum: 1,
        pageSize: 10,
      },
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
  methods: {
    async getlistdata() {
      let res = await this.$api.APIDbManageSysFindDbManageSys(this.formPage);
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
            if (element.isFictitiousEquipment == 1) {
              element.isFictitiousEquipment = true;
            } else {
              element.isFictitiousEquipment = false;
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
    async schujiaodian(item) {
      if (item.isEvaluationObj == true) {
        item.isEvaluationObj = 1;
      } else {
        item.isEvaluationObj = 0;
      }
      if (item.isFictitiousEquipment == true) {
        item.isFictitiousEquipment = 1;
      } else {
        item.isFictitiousEquipment = 0;
      }
      item.show = false;
      let res = "";
      if (item.id && item.id != "undefined") {
        if (this.Itzm == true) {
          res = await this.$api.API_DbManageSysSaveDbManageSys(item);
        } else {
          res = await this.$api.API_DbManageSysUpdateDbManageSys(item);
        }
      } else {
        res = await this.$api.API_DbManageSysSaveDbManageSys(item);
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
      item.show = true;
      console.log(itname);
      setTimeout(() => {
        this.$refs[itname + index].focus();
      }, 1);
      console.log(item);
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
        middlewareEdition: 5,
        inEquipmentName: "",
        majorFunction: "",
        importantDegree: 1,
        isEvaluationObj: false,
        sortNum,
        show: false,
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
      this.$confirm("确认改变生产资产?", "提示", {
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
