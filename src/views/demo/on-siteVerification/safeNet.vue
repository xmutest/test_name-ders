<!--安全通信网络-->
<template>
  <d2-container>
    <el-tabs class="container-tab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="机房一" name="first">
        <div v-if="activeName=='first'">
        <pre>
          用户管理用户管理
        用户管理
        用户管理
        用户管理
        用户管理
             用户管理用户管理
        用户管理
        用户管理
        用户管理
        用户管理
        用户管理
             用户管理用户管理
        用户管理
        用户管理
        用户管理
        用户管理
        用户管理
             用户管理用户管理
        用户管理
        用户管理
        用户管理
        用户管理
        用户管理
             用户管理用户管理
        用户管理
        用户管理
        用户管理
        用户管理
        用户管理
             用户管理用户管理
        用户管理
        用户管理
        用户管理
        用户管理
        用户管理
        用户管理
        </pre>
        </div>
      </el-tab-pane>
      <el-tab-pane label="机房二" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="机房三" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="机房四" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(this.activeName);
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
// .container-tab {
//   ::v-deep .el-tabs__content {
//     height: 400px;
//     overflow: auto;
//   }
// }

.ts_table {
  table {
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
    .el-select {
      margin: 0px 2px;

      ::v-deep .el-input--medium {
        font-size: 12px;
      }
    }
  }
  table th {
    color: #909399;
    height: 40px;
    border: 1px solid #cad9ea;
  }
  table thead th {
    background-color: rgba(238, 238, 238, 1);
    width: 200px;
  }
  table td {
    border: 1px solid #cad9ea;
    color: #666;
    font-size: 13px;
  }
}

.schuan_s {
  margin: 15px 0;
  text-align: right;
}
</style>
