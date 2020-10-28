<!--安全问题汇总-->
<template>
  <d2-container>
    <div class="ts_table">
      <table>
        <thead>
          <tr>
            <th>安全层面</th>
            <th>控制点</th>
            <th>关联资产</th>
            <th>控制项</th>
            <th>问题描述</th>
            <th>问题分析</th>
            <th>关联威胁</th>
            <th>原始风险值</th>
            <th>修正或整改后</th>
            <th>危害分析</th>
            <th>整改建议</th>
            <th>权重</th>
          </tr>
        </thead>
        <template tbody v-for="item in dataList">
          <tbody v-for="(item1, index1) in item.resultData" :key="index1">
            <tr>
              <td :rowspan="item1.sceneCheckData.length * Toamount">
                {{ item1.sceneCheckName }}
              </td>
            </tr>
            <template v-for="item2 in item1.sceneCheckData">
              <tr
                v-for="(item3, index3) in item2.controlEntriesData"
                :key="item3.amendId"
              >
                <td v-if="!index3" :rowspan="item2.controlEntriesData.length">
                  {{ item2.safetyControlSpot }}
                </td>

                <td>
                  <div slot="reference" class="name-wrapper">
                    {{ item3.assets }}
                  </div>
                </td>
                <td>
                  <div slot="reference" class="name-wrapper">
                    {{ item3.controlEntries.substr(0, 35) }}
                  </div>
                </td>
                <td>
                  <div slot="reference" class="name-wrapper">
                    {{ item3.problemDescription.substr(0, 35) }}
                  </div>
                </td>
                <td>{{ item3.problemAnalysis.substr(0, 35) }}</td>
                <!-- 关联威胁 -->
                <td>
                  <div>
                    {{ item3.relationThreaten.substr(0, 35) }}
                  </div>
                </td>
                <!-- 原始风险值 -->
                <td>{{ item3.originalRisk.substr(0, 35) }}</td>
                <!-- 修正后风险值 -->
                <td>
                  <div>
                    {{ item3.afterAmendRisk }}
                  </div>
                </td>
                <td>
                  <div>
                    {{ item3.hazardAnalysis.substr(0, 35) }}
                  </div>
                </td>
                <td>
                  <div>
                    {{ item3.rectificationSuggestions.substr(0, 35) }}
                  </div>
                </td>
                <!-- 权重 -->
                <td>
                  <div>
                    {{ item3.weight }}
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </template>
      </table>
    </div>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    async getDataList() {
      // let its = dataLists;

      // this.dataList = its.data.pageData;
      let res = await this.$api.API_RiskFindSummary(this.api_data);
      if (res.code == 20000) {
        this.dataList = res.data.pageData;
        this.Toamount = res.data.count + 5;
      } else {
        this.$message.error("信息加载出错");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
