<!--数据库管理系统-->
<template>
  <d2-container>
    <div>
      <!-- <div class="add_buoot">
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
      </div> -->
      <el-table :data="tabledatas" border :header-cell-style="{'background-color': 'rgba(238, 238, 238,1.0)'}">
        <el-table-column label="设备名称" width="100">
          <template slot-scope="scope">
            <div @click="is_compile(scope.row,scope.$index,'db_equipment_name')" class="itsz"></div>
            <el-input
              :ref='"db_equipment_name"+scope.$index'
              @blur="schujiaodian(scope.row)"
              v-show="scope.row.show"
              v-model="scope.row.db_equipment_name"
            ></el-input>
            <span v-show="!scope.row.show">{{scope.row.db_equipment_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="虚拟设备" width="80">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.is_fictitious_equipment"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="数据库管理系统及版本" width="100">
          <template slot-scope="scope">
            <div @click="is_compile(scope.row,scope.$index,'manage_sys')" class="itsz"></div>
            <el-input :ref='"manage_sys"+scope.$index' @blur="schujiaodian(scope.row)" placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.manage_sys"></el-input>
            <span v-show="!scope.row.show">{{scope.row.manage_sys}}</span>
          </template>
        </el-table-column>
        <el-table-column label="品牌及型号" width="120">
          <template slot-scope="scope">
            <div @click="is_compile(scope.row,scope.$index,'BrandAndModel')" class="itsz"></div>
            <el-input placeholder="请输入内容" :ref='"BrandAndModel"+scope.$index' @blur="schujiaodian(scope.row)" v-show="scope.row.show" v-model="scope.row.BrandAndModel"></el-input>
            <span v-show="!scope.row.show">{{scope.row.BrandAndModel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="系统/平台名称" width="120">
          <template slot-scope="scope">
            <div @click="is_compile(scope.row,scope.$index,'software_platform_name')" class="itsz"></div>
            <el-input placeholder="请输入内容" :ref='"software_platform_name"+scope.$index' @blur="schujiaodian(scope.row)" v-show="scope.row.show" v-model="scope.row.software_platform_name"></el-input>
            <span v-show="!scope.row.show">{{scope.row.software_platform_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作系统版本" width="120">
          <template slot-scope="scope">
            <div @click="is_compile(scope.row,scope.$index,'operating_system')" class="itsz"></div>
            <el-input placeholder="请输入内容" :ref='"operating_system"+scope.$index' @blur="schujiaodian(scope.row)" v-show="scope.row.show" v-model="scope.row.operating_system"></el-input>
            <span v-show="!scope.row.show">{{scope.row.operating_system}}</span>
          </template>
        </el-table-column>
        <el-table-column label="中间件及版本" width="110">
          <template slot-scope="scope">
            <div @click="is_compile(scope.row,scope.$index,'middleware_edition')" class="itsz"></div>
            <el-input placeholder="请输入内容" :ref='"middleware_edition"+scope.$index' @blur="schujiaodian(scope.row)" v-show="scope.row.show" v-model="scope.row.middleware_edition"></el-input>
            <span v-show="!scope.row.show">{{scope.row.middleware_edition}}</span>
          </template>
        </el-table-column>

          <el-table-column label="所在设备名称" width="110">
          <template slot-scope="scope">
            <div @click="is_compile(scope.row,scope.$index,'in_equipment_name')" class="itsz"></div>
            <el-input placeholder="请输入内容" :ref='"in_equipment_name"+scope.$index' @blur="schujiaodian(scope.row)" v-show="scope.row.show" v-model="scope.row.middleware_edition"></el-input>
            <span v-show="!scope.row.show">{{scope.row.in_equipment_name}}</span>
          </template>
        </el-table-column>

         <el-table-column label="主要功能" width="110">
          <template slot-scope="scope">
            <div @click="is_compile(scope.row,scope.$index,'major_function')" class="itsz"></div>
            <el-input placeholder="请输入内容" :ref='"major_function"+scope.$index' @blur="schujiaodian(scope.row)" v-show="scope.row.show" v-model="scope.row.middleware_edition"></el-input>
            <span v-show="!scope.row.show">{{scope.row.major_function}}</span>
          </template>
        </el-table-column>

        <el-table-column label="重要程度" width="150">
          <template slot-scope="scope">
            <el-select v-model="scope.row.important_degree" filterable placeholder="请选择">
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
            <el-checkbox v-model="scope.row.is_evaluation_obj"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column  label="操作" width="150">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="is_compile(scope.row)">编辑</el-button> -->
            <el-button size="mini" @click="is_preserve(scope.$index)">新增</el-button>
            <el-button size="mini" type="danger" @click="deleteRow(scope.$index, tabledatas)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增表单 -->
    <div class="add_from_xmu">
      <el-dialog style="min-width: 960px;" title="新建设备" :visible.sync="dialogFormVisible">
        <el-form :model="xmform" :rules="rules" ref="xmform">
          <el-form-item label="设备名称" :label-width="formLabelWidth" prop="db_equipment_name">
            <el-input v-model="xmform.db_equipment_name" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="虚拟设备" :label-width="formLabelWidth" prop="is_fictitious_equipment">
            <el-checkbox v-model="xmform.is_fictitious_equipment"></el-checkbox>
          </el-form-item>
          <el-form-item label="系统及版本" :label-width="formLabelWidth" prop="manage_sys">
            <el-input v-model="xmform.manage_sys" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="品牌及型号" :label-width="formLabelWidth" prop="BrandAndModel">
            <el-input v-model="xmform.BrandAndModel" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用途" :label-width="formLabelWidth">
            <el-input v-model="xmform.software_platform_name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="备注" :label-width="formLabelWidth" prop="operating_system">
            <el-input v-model="xmform.operating_system" clearable autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="中间件及版本" :label-width="formLabelWidth" prop="middleware_edition">
            <el-input v-model="xmform.middleware_edition" clearable autocomplete="off"></el-input>
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

          <el-form-item label="测评对象" :label-width="formLabelWidth" prop="is_evaluation_obj">
            <el-checkbox v-model="xmform.is_evaluation_obj"></el-checkbox>
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
      tabledatas: [{db_equipment_name: "",
        is_fictitious_equipment: false,
        manage_sys: "",
        BrandAndModel: "",
        software_platform_name: "",
        operating_system: "",
        middleware_edition: 5,
        importance: 5,
        in_equipment_name:'',
        major_function:'',
        is_evaluation_obj: true,
        show:false}],
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
        db_equipment_name: "",
        is_fictitious_equipment: false,
        manage_sys: "",
        BrandAndModel: "",
        software_platform_name: "",
        operating_system: "",
        middleware_edition: 5,
        importance: 5,
        is_evaluation_obj: true,
      },
      formLabelWidth: "120px",
      rules: {},
    };
  },
  created() {
    // 设备名称	虚拟设备	系统及版本	品牌及型号	用途	备注	中间件及版本	重要程度	测评指导书	测评对象
    let list = [
      {
        db_equipment_name: "CPQY01-C",
        is_fictitious_equipment: false,
        manage_sys: "ios-101",
        BrandAndModel: "cisco-FP",
        software_platform_name: "安全设计",
        operating_system: "123",
        middleware_edition: 5,
        in_equipment_name:'',
        major_function:'',
        importance: 5,
        is_evaluation_obj: true,
      },
      {
        db_equipment_name: "CPQY01-A",
        is_fictitious_equipment: false,
        manage_sys: "ios-504",
        BrandAndModel: "cisco-FP",
        software_platform_name: "安全设备",
        operating_system: "",
        middleware_edition: 5,
        in_equipment_name:'',
        major_function:'',
        importance: 5,
        is_evaluation_obj: true,
      },
    ];
    list.forEach((element) => {
      element["show"] = false;
    });
    // this.tabledatas = list;
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
    is_compile(item,index,itname) {
      item.show = true;
      console.log(itname);
      setTimeout(() => {
        this.$refs[itname + index].focus();
      }, 1);
      console.log(item);
    },
    is_preserve(item) {
      var itss=this.tabledatas;
      var list =  {
        db_equipment_name: "",
        is_fictitious_equipment: false,
        manage_sys: "",
        BrandAndModel: "",
        software_platform_name: "",
        operating_system: "",
        middleware_edition: 5,
        importance: 5,
        in_equipment_name:'',
        major_function:'',
        is_evaluation_obj: true,
        show:false
      };
      itss.splice(item+1, 0, list);
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
