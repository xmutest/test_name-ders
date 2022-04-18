<!--已完成的项目-->
<template>
  <d2-container>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="广州华南信息安全测评中心" name="first"
        ><gzHu :gzHuList="gzHuList"></gzHu
      ></el-tab-pane>
      <el-tab-pane label="国源天顺安全服务有限公司" name="second"
        ><gouyuan :gzHuList="gouyuanList"></gouyuan
      ></el-tab-pane>
    </el-tabs>
  </d2-container>
</template>

<script>
import gzHu from "./gz_an.vue";
import gouyuan from "./gyuan.vue";
export default {
  data() {
    return {
      activeName: "first",
      gouyuanList: [],
      gzHuList: [],
    };
  },
  components: {
    gzHu,
    gouyuan,
  },
  computed: {},
  watch: {},
  created() {
    this.getdepartmenTree();
  },
  mounted() {},
  methods: {
    async getdepartmenTree() {
      let res = await this.$api.departmentewdate();
      if (res.code === 20000) {
        this.gzHuList = res.data["childrenList"][0];
        console.log(this.gzHuList)
        this.gouyuanList = res.data["childrenList"][1];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-tabs--border-card > .el-tabs__header {
  position: sticky;
  top: -21px;
  z-index: 1;
  padding: 5px 0px;
}
</style>