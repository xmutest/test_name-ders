<!--终端/ 感知设备/现场设备-->
<template>
  <d2-container>
    <el-table
      :data="tabledatas"
      border
      :header-cell-style="{ 'background-color': 'rgba(238, 238, 238,1.0)' }"
    >
      <el-table-column label="设备名称">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'terminalName')"
            class="itsz"
          ></div>
          <el-input
            :ref="'terminalName' + scope.$index"
            @blur="
              schujiaodian({
                id: scope.row.id,
                terminalName: scope.row.terminalName,
              })
            "
            v-show="scope.row.show"
            v-model="scope.row.terminalName"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.terminalName }}</span>
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

      <el-table-column label="操作系统/控制软件">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'operatingSystem')"
            class="itsz"
          ></div>
          <el-input
            :ref="'operatingSystem' + scope.$index"
            @blur="
              schujiaodian({
                id: scope.row.id,
                operatingSystem: scope.row.operatingSystem,
              })
            "
            v-show="scope.row.show"
            v-model="scope.row.operatingSystem"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.operatingSystem }}</span>
        </template>
      </el-table-column>

      <el-table-column label="设备类别/用途">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'terminalTypePurpose')"
            class="itsz"
          ></div>
          <el-input
            :ref="'terminalTypePurpose' + scope.$index"
            @blur="
              schujiaodian({
                id: scope.row.id,
                terminalTypePurpose: scope.row.terminalTypePurpose,
              })
            "
            v-show="scope.row.show"
            v-model="scope.row.terminalTypePurpose"
          ></el-input>
          <span v-show="!scope.row.show">{{
            scope.row.terminalTypePurpose
          }}</span>
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
            v-show="scope.row.show"
            v-model="scope.row.remarks"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.remarks }}</span>
        </template>
      </el-table-column>

      <el-table-column label="数量">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'equipmentNum')"
            class="itsz"
          ></div>
          <el-input
            :ref="'equipmentNum' + scope.$index"
            @blur="
              schujiaodian({
                id: scope.row.id,
                equipmentNum: scope.row.equipmentNum,
              })
            "
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.equipmentNum"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.equipmentNum }}</span>
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
            v-show="scope.row.id"
            @change="schujiaodianTm(scope.row)"
            v-model="scope.row.isEvaluationObj"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
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
          terminalName: "",
          isFictitiousEquipment: "",
          operatingSystem: "",
          terminalTypePurpose: "",
          remarks: "",
          equipmentNum: 1,
          importantDegree: 5,
          isEvaluationObj: false,
          sortNum: 1,
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
      let res = await this.$api.APITerminalFindTerminal(this.formPage);
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
              terminalName: "",
              isFictitiousEquipment: "",
              operatingSystem: "",
              terminalTypePurpose: "",
              remarks: "",
              equipmentNum: 1,
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
          res = await this.$api.API_TerminalSaveTerminal(item);
        } else {
          if (item.terminalName != "") {
            res = await this.$api.API_ServerTerminalUpdateTerminal(item);
          }
        }
      } else {
        res = await this.$api.API_TerminalSaveTerminal(item);
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
        terminalName: "",
        isFictitiousEquipment: "",
        operatingSystem: "",
        terminalTypePurpose: "",
        remarks: "",
        equipmentNum: 1,
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
      console.log(rows);
      this.$confirm("确定删除此记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$api.APITerminalDelTerminal({
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
        assetsNum: 9,
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

