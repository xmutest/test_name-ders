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
            @click="is_compile(scope.row, scope.$index, 'terminal_name')"
            class="itsz"
          ></div>
          <el-input
            :ref="'terminal_name' + scope.$index"
            @blur="schujiaodian(scope.row)"
            v-show="scope.row.show"
            v-model="scope.row.terminal_name"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.terminal_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="虚拟设备" width="80">
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.is_fictitious_equipment"
          ></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column label="操作系统/控制软件">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'operating_system')"
            class="itsz"
          ></div>
          <el-input
            :ref="'operating_system' + scope.$index"
            @blur="schujiaodian(scope.row)"
            v-show="scope.row.show"
            v-model="scope.row.operating_system"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.operating_system }}</span>
        </template>
      </el-table-column>

      <el-table-column label="设备类别/用途">
        <template slot-scope="scope">
          <div
            @click="
              is_compile(scope.row, scope.$index, 'terminal_type_purpose')
            "
            class="itsz"
          ></div>
          <el-input
            :ref="'terminal_type_purpose' + scope.$index"
            @blur="schujiaodian(scope.row)"
            v-show="scope.row.show"
            v-model="scope.row.terminal_type_purpose"
          ></el-input>
          <span v-show="!scope.row.show">{{
            scope.row.terminal_type_purpose
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
            @blur="schujiaodian(scope.row)"
            v-show="scope.row.show"
            v-model="scope.row.remarks"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.remarks }}</span>
        </template>
      </el-table-column>

      <el-table-column label="数量">
        <template slot-scope="scope">
          <div
            @click="is_compile(scope.row, scope.$index, 'terminal_num')"
            class="itsz"
          ></div>
          <el-input
            :ref="'terminal_num' + scope.$index"
            @blur="schujiaodian(scope.row)"
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.terminal_num"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.terminal_num }}</span>
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
          terminal_name: "",
          is_fictitious_equipment: "",
          operating_system: "",
          terminal_type_purpose: "",
          remarks: "",
          terminal_num: 5,
          important_degree: 1,
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
          computer_room_name: "机房名称1",
          terminal_num: "物理位置1",
          important_degree: 1,
          is_evaluation_obj: true,
        },
        {
          computer_room_name: "机房名称2",
          terminal_num: "物理位置2",
          important_degree: 1,
          is_evaluation_obj: true,
        },
      ];
      list.forEach((element) => {
        element["show"] = false;
      });
      // this.tabledatas = list;
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
        terminal_name: "",
        is_fictitious_equipment: "",
        operating_system: "",
        terminal_type_purpose: "",
        remarks: "",
        terminal_num: 5,
        important_degree: 1,
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

