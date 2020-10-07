<!--服务器/存储设备-->
<template>
  <d2-container>
    <el-table
      :data="tabledatas"
      border
      :header-cell-style="{ 'background-color': 'rgba(238, 238, 238,1.0)' }"
    >
      <el-table-column label="管理软件/平台名称">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'platform_extend_name')"
            class="itsz"
          ></div>
          <el-input
            :ref="'platform_extend_name' + scope.$index"
            @blur="schujiaodian(scope.row)"
            v-show="scope.row.show"
            v-model="scope.row.platform_extend_name"
          ></el-input>
          <span v-show="!scope.row.show">{{
            scope.row.platform_extend_name
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所在设备名称">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'equipment_name')"
            class="itsz"
          ></div>
          <el-input
            :ref="'equipment_name' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.equipment_name"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.equipment_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="版本">
        <template slot-scope="scope">
          <div
            @click="
              is_compile(scope.row, scope.$index, 'platform_extend_edition')
            "
            class="itsz"
          ></div>
          <el-input
            :ref="'platform_extend_edition' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.platform_extend_edition"
          ></el-input>
          <span v-show="!scope.row.show">{{
            scope.row.platform_extend_edition
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

      <el-table-column label="备注">
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
              is_compile(
                scope.row,
                scope.$index,
                'evaluation_instruction_book_id'
              )
            "
            class="itsz"
          ></div>
          <el-input
            :ref="'evaluation_instruction_book_id' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.evaluation_instruction_book_id"
          ></el-input>
          <span v-show="!scope.row.show">{{
            scope.row.evaluation_instruction_book_id
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
          platform_extend_name: "",
          equipment_name: "",
          platform_extend_edition: "",
          important_degree: 1,
          evaluation_instruction_book_id: "",
          remarks:'',
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
          platform_extend_name: "边界名称",
          equipment_name: "接入方式",
          platform_extend_edition: "承载主要业务应用",
          important_degree: 1,
          remarks:'',
          evaluation_instruction_book_id: "安全区域边界",
          is_evaluation_obj: true,
        },
        {
          platform_extend_name: "边界名称",
          equipment_name: "接入方式",
          platform_extend_edition: "承载主要业务应用",
          important_degree: 1,
          remarks:'备注',
          evaluation_instruction_book_id: "安全区域边界",
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
        platform_extend_name: "",
        equipment_name: "",
        platform_extend_edition: "",
        important_degree: 1,
        evaluation_instruction_book_id: "",
        remarks:'',
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



