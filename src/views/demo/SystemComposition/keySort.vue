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
              @blur="schujiaodian(scope.row)"
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
              @blur="schujiaodian(scope.row)"
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
              @blur="schujiaodian(scope.row)"
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
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.storageDevice"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.storageDevice }}</span>
          </template>
        </el-table-column>

        <el-table-column label="数据采集" width="70">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isDataAcquisition"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="数据储存" width="70">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isDataStorage"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="数据处理" width="70">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isDataHandle"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="数据应用" width="70">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isDataApplication"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="数据流动" width="70">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isDataFlow"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="数据销毁" width="70">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isDataDestruction"></el-checkbox>
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
        <el-table-column label="测评对象" width="70">
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
        dataType: "",
        isDataAcquisition: false,
        belongsBusiness: "",
        safetyProtectionDemand: "",
        storageDevice: "",
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
        isEvaluationObj: true,
        show: false,
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
