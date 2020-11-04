<!--被测信息系统情况-->
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
        <el-table-column label="系统及版本" width="100">
          <template slot-scope="scope">
            <div
              @click="
                is_compile(scope.row, scope.$index, 'operatingSysEdition')
              "
              class="itsz"
            ></div>
            <el-input
              :ref="'operatingSysEdition' + scope.$index"
              @blur="schujiaodian(scope.row)"
              placeholder="请输入内容"
              v-show="scope.row.show"
              v-model="scope.row.operatingSysEdition"
            ></el-input>
            <span v-show="!scope.row.show">{{
              scope.row.operatingSysEdition
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应用系统/平台名称" width="120">
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
        <el-table-column label="数据库管理系统" width="120">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'dbManageSys')"
              class="itsz"
            ></div>
            <el-input
              placeholder="请输入内容"
              :ref="'dbManageSys' + scope.$index"
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.dbManageSys"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.dbManageSys }}</span>
          </template>
        </el-table-column>

        <el-table-column label="中间件及版本" width="120">
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

        <el-table-column label="备注" width="120">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'remarks')"
              class="itsz"
            ></div>
            <el-input
              placeholder="请输入内容"
              :ref="'remarks' + scope.$index"
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.remarks"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.remarks }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="80">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'equipmentNum')"
              class="itsz"
            ></div>
            <el-input
              placeholder="请输入内容"
              :ref="'equipmentNum' + scope.$index"
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.equipmentNum"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.equipmentNum }}</span>
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
          operatingSysEdition: "",
          softwarePlatformName: "",
          dbManageSys: "",
          middlewareEdition: "",
          remarks: "",
          equipmentNum: 0,
          importantDegree: 5,
          isEvaluationObj: false,
          show: false,
          sortNum: 1,
        },
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      importantDegree_list: [
        { value: 5, label: "非常重要(5)" },
        { value: 4, label: "重要（4）" },
        { value: 3, label: "一般（3）" },
        { value: 2, label: "不太重要（2）" },
        { value: 1, label: "不重要（1）" },
      ],
      xmform: {
        equipmentName: "",
        isFictitiousEquipment: false,
        operatingSysEdition: "",
        softwarePlatformName: "",
        dbManageSys: "",
        remarks: "",
        equipmentNum: 5,
        importantDegree: 5,
        isEvaluationObj: false,
      },
      formLabelWidth: "120px",
      rules: {},
      formPage: {
        pageNum: 1,
        pageSize: 10,
      },
      indexs: null,
    };
  },
  created() {
    // 设备名称	虚拟设备	系统及版本	品牌及型号	用途	备注	数量	重要程度	测评指导书	测评对象
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
        that.getlistdata();
      }
    });
  },
  methods: {
    async getlistdata() {
      let res = await this.$api.APIServerStorageFindServerStorage(
        this.formPage
      );
      if (res.code === 20000) {
        let List = res.data.list;
        if (res.data.list.length > 0) {
          List.forEach((element) => {
            element.isEvaluationObj =
              element.isEvaluationObj == 1 ? true : false;
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
      let res = "";
      if (item.id && item.id != "undefined") {
        if (this.Itzm == true) {
          res = await this.$api.API_ServerStorageSaveServerStorage(item);
        } else {
          res = await this.$api.API_ServerStorageUpdateServerStorage(item);
        }
      } else {
        res = await this.$api.API_ServerStorageSaveServerStorage(item);
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
        equipmentName: "",
        isFictitiousEquipment: false,
        operatingSysEdition: "",
        softwarePlatformName: "",
        dbManageSys: "",
        middlewareEdition: "",
        remarks: "",
        equipmentNum: 5,
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
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$api.APIServerStorageDelServerStorage({
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
        assetsNum: 8,
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
