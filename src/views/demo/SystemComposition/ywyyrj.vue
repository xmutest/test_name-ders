<!--业务应用软件/平台-->
<!--区域边界-->
<template>
  <d2-container>
    <el-table
      :data="tabledatas"
      border
      :header-cell-style="{ 'background-color': 'rgba(238, 238, 238,1.0)' }"
    >
      <el-table-column label="应用系统/平台名称">
        <template slot-scope="scope">
          <div
            @click="
              is_compile(scope.row, scope.$index, 'software_platform_name')
            "
            class="itsz"
          ></div>
          <el-input
            :ref="'software_platform_name' + scope.$index"
            @blur="schujiaodian(scope.row)"
            v-show="scope.row.show"
            v-model="scope.row.software_platform_name"
          ></el-input>
          <span v-show="!scope.row.show">{{
            scope.row.software_platform_name
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="主要功能">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'major_function')"
            class="itsz"
          ></div>
          <el-input
            :ref="'major_function' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.major_function"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.major_function }}</span>
        </template>
      </el-table-column>

      <el-table-column label="应用软件及版本">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'software_edition')"
            class="itsz"
          ></div>
          <el-input
            :ref="'software_edition' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.software_edition"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.software_edition }}</span>
        </template>
      </el-table-column>

      <el-table-column label="开发厂商">
        <template slot-scope="scope">
          <div
            @click="
              is_compile(scope.row, scope.$index, 'develop_manufacturers')
            "
            class="itsz"
          ></div>
          <el-input
            :ref="'develop_manufacturers' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.develop_manufacturers"
          ></el-input>
          <span v-show="!scope.row.show">{{
            scope.row.develop_manufacturers
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="重要程度">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.important_degree"
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

      <el-table-column label="评测指导书">
        <template slot-scope="scope">
          <div
            @click="
              is_compile(scope.row, scope.$index, 'evaluation_instruction_book')
            "
            class="itsz"
          ></div>
          <el-input
            :ref="'evaluation_instruction_book' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.evaluation_instruction_book"
          ></el-input>
          <span v-show="!scope.row.show">{{
            scope.row.evaluation_instruction_book
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="测评对象" width="80">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.is_evaluation_obj"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
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
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      //  		重要程度	测评对象	排序号
      importance_list: [
        { value: 5, label: "非常重要(5)" },
        { value: 4, label: "重要（4）" },
        { value: 3, label: "一般（3）" },
        { value: 2, label: "不太重要（2）" },
        { value: 1, label: "不重要（1）" },
      ],
      tabledatas: [
        {
          software_platform_name: "",
          major_function: "",
          software_edition: "",
          important_degree: 1,
          evaluation_instruction_book: "",
          is_evaluation_obj: true,
          show: false,
        },
      ],
    };
  },
  created() {
    this.getlistdata();
  },
  methods: {
    getlistdata() {
      let list = [
        {
          software_platform_name: "边界名称",
          major_function: "接入方式",
          software_edition: "承载主要业务应用",
          important_degree: 1,
          evaluation_instruction_book: "安全区域边界",
          is_evaluation_obj: true,
        },
        {
          software_platform_name: "边界名称",
          major_function: "接入方式",
          software_edition: "承载主要业务应用",
          important_degree: 1,
          evaluation_instruction_book: "安全区域边界",
          is_evaluation_obj: true,
        },
      ];
      list.forEach((element) => {
        element["show"] = false;
      });
      this.tabledatas = list;
    },
    is_compile(item, index, itname) {
      // console.log(item,index,itname)
      item.show = true;
      console.log(itname);
      setTimeout(() => {
        this.$refs[itname + index].focus();
      }, 1);
      console.log(item);
    },
    schujiaodian(item) {
      item.show = false;
      console.log(item);
    },
    is_preserve(item) {
      var itss = this.tabledatas;
      var list = {
        software_platform_name: "",
        major_function: "",
        software_edition: "",
        important_degree: 1,
        evaluation_instruction_book: "",
        is_evaluation_obj: true,
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
.el-table {
  font-size: 12px;
}
</style>


