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
              @click="is_compile(scope.row, scope.$index, 'serverName')"
              class="itsz"
            ></div>
            <el-input
              :ref="'serverName' + scope.$index"
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.serverName"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.serverName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="虚拟设备" width="80">
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.isFictitiodbManageSysquipment"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="系统及版本" width="100">
          <template slot-scope="scope">
            <div
              @click="is_compile(scope.row, scope.$index, 'operatingSysEditio')"
              class="itsz"
            ></div>
            <el-input
              :ref="'operatingSysEditio' + scope.$index"
              @blur="schujiaodian(scope.row)"
              placeholder="请输入内容"
              v-show="scope.row.show"
              v-model="scope.row.operatingSysEditio"
            ></el-input>
            <span v-show="!scope.row.show">{{
              scope.row.operatingSysEditio
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
            <span v-show="!scope.row.show">{{ scope.row.middlewareEdition }}</span>
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
              @click="is_compile(scope.row, scope.$index, 'terminalNum')"
              class="itsz"
            ></div>
            <el-input
              placeholder="请输入内容"
              :ref="'terminalNum' + scope.$index"
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.terminalNum"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.terminalNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="重要程度" width="150">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.importantDegree"
              filterable
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
            <el-checkbox v-model="scope.row.isEvaluationObj"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="is_compile(scope.row)">编辑</el-button> -->
            <el-button size="mini" @click="is_preserve(scope.$index)"
              >新增</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="deleteRow(scope.$index, tabledatas)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增表单 -->
    <div class="add_from_xmu">
      <el-dialog
        style="min-width: 960px"
        title="新建设备"
        :visible.sync="dialogFormVisible"
      >
        <el-form :model="xmform" :rules="rules" ref="xmform">
          <el-form-item
            label="设备名称"
            :label-width="formLabelWidth"
            prop="serverName"
          >
            <el-input
              v-model="xmform.serverName"
              clearable
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="虚拟设备"
            :label-width="formLabelWidth"
            prop="isFictitiodbManageSysquipment"
          >
            <el-checkbox
              v-model="xmform.isFictitiodbManageSysquipment"
            ></el-checkbox>
          </el-form-item>
          <el-form-item
            label="系统及版本"
            :label-width="formLabelWidth"
            prop="operatingSysEditio"
          >
            <el-input
              v-model="xmform.operatingSysEditio"
              clearable
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="品牌及型号"
            :label-width="formLabelWidth"
            prop="softwarePlatformName"
          >
            <el-input
              v-model="xmform.softwarePlatformName"
              clearable
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="用途" :label-width="formLabelWidth">
            <el-input
              v-model="xmform.dbManageSys"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="备注"
            :label-width="formLabelWidth"
            prop="remarks"
          >
            <el-input
              v-model="xmform.remarks"
              clearable
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="数量"
            :label-width="formLabelWidth"
            prop="terminalNum"
          >
            <el-input
              v-model="xmform.terminalNum"
              clearable
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="重要程度"
            :label-width="formLabelWidth"
            prop="importantDegree"
          >
            <el-select
              v-model="xmform.importantDegree"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in importantDegree_list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="测评对象"
            :label-width="formLabelWidth"
            prop="isEvaluationObj"
          >
            <el-checkbox v-model="xmform.isEvaluationObj"></el-checkbox>
          </el-form-item>

          <div class="dia-footer">
            <el-form-item>
              <el-button type="primary" @click="submitForm('xmform')"
                >立即创建</el-button
              >
              <el-button type="danger" @click="resetForm('xmform')"
                >重置</el-button
              >
              <el-button @click="dialogFormVisible = false">取 消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      tabledatas: [],
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
        serverName: "",
        isFictitiodbManageSysquipment: false,
        operatingSysEditio: "",
        softwarePlatformName: "",
        dbManageSys: "",
        remarks: "",
        terminalNum: 5,
        importantDegree: 5,
        isEvaluationObj: true,
      },
      formLabelWidth: "120px",
      rules: {},
    };
  },
  created() {
    // 设备名称	虚拟设备	系统及版本	品牌及型号	用途	备注	数量	重要程度	测评指导书	测评对象
    let list = [
      {
        serverName: "CPQY01-C",
        isFictitiodbManageSysquipment: false,
        operatingSysEditio: "ios-101",
        softwarePlatformName: "cisco-FP",
        dbManageSys: "安全设计",
        remarks: "123",
        terminalNum: 5,
        importantDegree: 5,
        isEvaluationObj: true,
      },
      {
        serverName: "CPQY01-A",
        isFictitiodbManageSysquipment: false,
        operatingSysEditio: "ios-504",
        softwarePlatformName: "cisco-FP",
        dbManageSys: "安全设备",
        remarks: "",
        terminalNum: 5,
        importantDegree: 5,
        isEvaluationObj: true,
      },
    ];
    list.forEach((element) => {
      element["show"] = false;
    });
    this.tabledatas = list;
    // })
  },
  methods: {
    schujiaodian(item) {
      item.show = false;
      console.log(item);
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
    is_preserve(item) {
      var itss = this.tabledatas;
      var list = {
        serverName: "",
        isFictitiodbManageSysquipment: false,
        operatingSysEditio: "",
        softwarePlatformName: "",
        dbManageSys: "",
        middlewareEdition:'',
        remarks: "",
        terminalNum: 5,
        importantDegree: 5,
        isEvaluationObj: true,
        show: false,
      };
      itss.splice(item + 1, 0, list);
      this.tabledatas = itss;
      // console.log();
    },
    deleteRow(index, rows) {
      console.log(index, rows);
      rows.splice(index, 1);
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
