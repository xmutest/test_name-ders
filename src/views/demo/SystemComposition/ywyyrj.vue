<!--业务应用软件/平台-->
<template>
  <d2-container>
    <el-table
      :data="tabledatas"
      border
      :header-cell-style="{ 'background-color': 'rgba(238, 238, 238,1.0)' }"
    >
      <el-table-column label="应用系统/平台名称" width="120">
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

      <el-table-column label="主要功能" width="180">
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

      <el-table-column label="应用软件及版本" width="120">
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
      <el-table-column label="应用模式（B/S或C/S）" width="130">
        <template slot-scope="scope">
          <el-select
            @change="schujiaodian(scope.row)"
            v-model="scope.row.model"
            filterable
            size="small"
            placeholder="请选择"
          >
            <el-option label="B/S" value="B/S"></el-option>
            <el-option label="C/S" value="C/S"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="硬件/软件平台" width="130">
        <template slot-scope="scope">
          <el-select
            @change="schujiaodian(scope.row)"
            v-model="scope.row.platform"
            size="small"
            filterable
            placeholder="请选择"
          >
            <el-option label="硬件" value="硬件"></el-option>
            <el-option label="软件" value="软件"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="自行开发/外包开发" width="130">
        <template slot-scope="scope">
          <el-select
            @change="schujiaodian(scope.row)"
            v-model="scope.row.develop"
            filterable
            size="small"
            placeholder="请选择"
          >
            <el-option label="自行开发" value="自行开发"></el-option>
            <el-option label="外包开发" value="外包开发"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="ip地址" width="120">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'ip')"
            class="itsz"
          ></div>
          <el-input
            placeholder="请输入内容"
            :ref="'ip' + scope.$index"
            @blur="schujiaodian(scope.row)"
            v-show="scope.row.show"
            v-model="scope.row.ip"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开发厂商" width="150">
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
      <el-table-column label="用户类别及数量" width="120">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'userTypeAndNum')"
            class="itsz"
          ></div>
          <el-input
            :ref="'userTypeAndNum' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.userTypeAndNum"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.userTypeAndNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="选择指导书" width="130">
        <template slot-scope="scope">
          <el-select
            @change="schujiaodian(scope.row)"
            v-model="scope.row.resultBookId"
            filterable
            clearable
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
      <el-table-column label="重要程度" width="130">
        <template slot-scope="scope">
          <el-select
            @change="schujiaodian(scope.row)"
            v-model="scope.row.importantDegree"
            filterable
            size="small"
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
      <el-table-column label="备注" width="180">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'remarks')"
            class="itsz"
          ></div>
          <el-input
            :ref="'remarks' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.remarks"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.remarks }}</span>
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
      //  		重要程度	测评对象	排序号
      importance_list: [
        { value: 5, label: "关键" },
        { value: 4, label: "重要" },
        { value: 3, label: "一般" },
      ],
      tabledatas: [
        {
          softwarePlatformName: "",
          majorFunction: "",
          softwareEdition: "",
          importantDegree: 5,
          isEvaluationObj: false,
          developManufacturers: "",
          sortNum: 1,
          show: false,
          remarks: "",
          platform: "",
          develop: "",
          model: "",
          userTypeAndNum: "",
          ip: "",
          resultBookId: "",
        },
      ],
      iongeist: [],
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
    this.compositiongeFile();
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
    async compositiongeFile() {
      let res = await this.$api.sysCompositiongeFile({
        systemCompositionId: 5,
      });
      if (res.code === 20000) {
        this.iongeist = res.data;
      }
      // console.log(res);
    },
    changeInput(item) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        // console.log(item.computerRoomName);
        this.schujiaodian(item);
      }, 500);
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
      let res = await this.$api.APISoftwarePlatformFindsoftwarePlatform(
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
              softwarePlatformName: "",
              majorFunction: "",
              softwareEdition: "",
              importantDegree: 5,
              isEvaluationObj: false,
              developManufacturers: "",
              sortNum: 1,
              show: false,
              remarks: "",
              platform: "",
              develop: "",
              model: "",
              userTypeAndNum: "",
              ip: "",
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
          if (item.softwarePlatformName != "") {
            res = await this.$api.API_SoftwarePlatformUpdateSoftwarePlatform(
              item
            );
          }
        }
      } else {
        res = await this.$api.API_SoftwarePlatformSaveSoftwarePlatformt(item);
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
        softwarePlatformName: "",
        majorFunction: "",
        softwareEdition: "",
        importantDegree: 5,
        isEvaluationObj: false,
        developManufacturers: "",
        sortNum,
        show: false,
        remarks: "",
        platform: "",
        develop: "",
        model: "",
        userTypeAndNum: "",
        ip: "",
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


