<!--安全设备-->
<template>
  <d2-container>
    <template slot="header">安全设备</template>
    <div>
      <div class="add_buoot">
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
      </div>
      <el-table :data="tabledatas" border>
        <el-table-column label="设备名称" width="150">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.devicename"></el-input>
            <span v-show="!scope.row.show">{{scope.row.devicename}}</span>
          </template>
        </el-table-column>
        <el-table-column label="虚拟设备" width="80">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.virtual"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="系统及版本" width="150">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.andVersion"></el-input>
            <span v-show="!scope.row.show">{{scope.row.andVersion}}</span>
          </template>
        </el-table-column>
        <el-table-column label="品牌及型号" width="150">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.BrandAndModel"></el-input>
            <span v-show="!scope.row.show">{{scope.row.BrandAndModel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用途" width="150">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.use"></el-input>
            <span v-show="!scope.row.show">{{scope.row.use}}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="150">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.remark"></el-input>
            <span v-show="!scope.row.show">{{scope.row.remark}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="80">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.quantity"></el-input>
            <span v-show="!scope.row.show">{{scope.row.quantity}}</span>
          </template>
        </el-table-column>
        <el-table-column label="重要程度" width="150">
          <template slot-scope="scope">
            <el-select v-model="scope.row.importance" filterable placeholder="请选择">
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
            <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.engineer"></el-input>
            <span v-show="!scope.row.show">{{scope.row.engineer}}</span>
          </template>
        </el-table-column>
        <el-table-column label="测评对象" width="80">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.testee"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column fixed label="操作" width="220">
          <template slot-scope="scope">
            <el-button size="mini" @click="is_compile(scope.row)">编辑</el-button>
            <el-button size="mini" @click="is_preserve(scope.row)">保存</el-button>
            <el-button size="mini" type="danger" @click="deleteRow(scope.$index, tabledatas)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增表单 -->
    <div class="add_from_xmu">
      <el-dialog style="min-width: 960px;" title="新建设备" :visible.sync="dialogFormVisible">
        <el-form :model="xmform" :rules="rules" ref="xmform">
          <el-form-item label="设备名称" :label-width="formLabelWidth" prop="devicename">
            <el-input v-model="xmform.devicename" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="虚拟设备" :label-width="formLabelWidth" prop="virtual">
            <el-checkbox v-model="xmform.virtual"></el-checkbox>
          </el-form-item>
          <el-form-item label="系统及版本" :label-width="formLabelWidth" prop="andVersion">
            <el-input v-model="xmform.andVersion" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="品牌及型号" :label-width="formLabelWidth" prop="BrandAndModel">
            <el-input v-model="xmform.BrandAndModel" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用途" :label-width="formLabelWidth">
            <el-input v-model="xmform.use" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
            <el-input v-model="xmform.remark" clearable autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="数量" :label-width="formLabelWidth" prop="quantity">
            <el-input v-model="xmform.quantity" clearable autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="重要程度" :label-width="formLabelWidth" prop="importance">
            <el-select v-model="xmform.importance" filterable placeholder="请选择">
              <el-option
                v-for="item in importance_list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="测评指导书" :label-width="formLabelWidth" prop="engineer">
            <el-input v-model="xmform.engineer" clearable autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="测评对象" :label-width="formLabelWidth" prop="testee">
            <el-checkbox v-model="xmform.testee"></el-checkbox>
          </el-form-item>

          <div class="dia-footer">
            <el-form-item>
              <el-button type="primary" @click="submitForm('xmform')">立即创建</el-button>
              <el-button type="danger" @click="resetForm('xmform')">重置</el-button>
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
      importance_list: [
        { value: 5, label: "非常重要(5)" },
        { value: 4, label: "重要（4）" },
        { value: 3, label: "一般（3）" },
        { value: 2, label: "不太重要（2）" },
        { value: 1, label: "不重要（1）" },
      ],
      xmform: {
        devicename: "",
        virtual: false,
        andVersion: "",
        BrandAndModel: "",
        use: "",
        remark: "",
        quantity: 5,
        importance: 5,
        engineer: "",
        testee: true,
      },
      formLabelWidth: "120px",
      rules: {},
    };
  },
  created() {
    // 设备名称	虚拟设备	系统及版本	品牌及型号	用途	备注	数量	重要程度	测评指导书	测评对象
    let list = [
      {
        devicename: "CPQY01-C",
        virtual: false,
        andVersion: "ios-101",
        BrandAndModel: "cisco-FP",
        use: "安全设计",
        remark: "123",
        quantity: 5,
        importance: 5,
        engineer: "默认安全设备",
        testee: true,
      },
      {
        devicename: "CPQY01-A",
        virtual: false,
        andVersion: "ios-504",
        BrandAndModel: "cisco-FP",
        use: "安全设备",
        remark: "",
        quantity: 5,
        importance: 5,
        engineer: "默认安全设备",
        testee: true,
      },
    ];
    list.forEach((element) => {
      element["show"] = false;
    });
    this.tabledatas = list;
    // })
  },
  methods: {
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
    is_compile(item) {
      item.show = true;
      console.log(item);
    },
    is_preserve(item) {
      item.show = false;
      console.log(this.tabledatas);
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
</style>
