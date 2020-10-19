<!-- // 安全环境 -->
<template>
  <d2-container>
    <el-table :data="tabledatas" border>
      <el-table-column label="" width="80">
        <template slot-scope="scope">
          <div class="itsz"></div>
          <span v-show="!scope.row.show">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="威胁分（子）类" >
        <template slot-scope="scope">
          <span v-show="!scope.row.show">{{ scope.row.threatClassificationName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="描述">
        <template slot-scope="scope">
          <span v-show="!scope.row.show">{{ scope.row.describe }}</span>
        </template>
      </el-table-column>

      <el-table-column label="威胁赋值"  width='80'>
        <template slot-scope="scope">
         <span v-show="!scope.row.show">{{ scope.row.threatGrade }}</span>
        </template>
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      importance_list: [
        { value: 3, label: "高" },
        { value: 2, label: "中" },
        { value: 1, label: "低" },
      ],
      tabledatas: [],
    };
  },
  created() {
    this.getEtlist();
  },
  methods: {
    async getEtlist() {
      let List = await this.$api.API_projectOThreatClassificationFindAll();
      console.log(List);
     if (List.code === 20000) {
        this.tabledatas = List.data;
        //查询列表
      } else {
        this.$message.error(List.message + "评测依据选项出差，请联系管理员");
      }
    },
  },
};
</script>

<style>

</style>