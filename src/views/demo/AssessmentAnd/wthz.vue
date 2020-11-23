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
            <th style="width: 100px">原始风险值</th>
            <th style="width: 100px">修正或整改后</th>
            <th>危害分析</th>
            <th>整改建议</th>
            <th style="width: 50px">权重</th>
          </tr>
        </thead>
        <template tbody v-for="(item, ins) in dataList">
          <tr class="List_b" :key="ins">
            <td colspan="12">{{ item.extendedStandard }}</td>
          </tr>
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
                  <el-popover trigger="click" placement="top">
                    <div>
                      <p>
                        {{ item3.assets }}
                      </p>
                    </div>
                    <div slot="reference" class="name-wrapper">
                      {{
                        item3.assets == null
                          ? item3.assets
                          : item3.assets.substr(0, 35)
                      }}
                    </div>
                  </el-popover>
                </td>
                <td>
                  <el-popover trigger="click" placement="top">
                    <div>
                      <p>
                        {{ item3.controlEntries }}
                      </p>
                    </div>
                    <div slot="reference" class="name-wrapper">
                      {{
                        item3.controlEntries == null
                          ? item3.controlEntries
                          : item3.controlEntries.substr(0, 35)
                      }}
                    </div>
                  </el-popover>
                </td>
                <td>
                  <el-popover trigger="click" placement="top">
                    <div>
                      <p>
                        {{ item3.problemDescription }}
                      </p>
                    </div>
                    <div slot="reference" class="name-wrapper">
                      {{
                        item3.problemDescription == null
                          ? item3.problemDescription
                          : item3.problemDescription.substr(0, 35)
                      }}
                    </div>
                  </el-popover>
                </td>
                <td>
                  <el-popover trigger="click" placement="top">
                    <div>
                      <p>
                        {{ item3.problemAnalysis }}
                      </p>
                    </div>
                    <div slot="reference" class="name-wrapper">
                      {{
                        item3.problemAnalysis == null
                          ? item3.problemAnalysis
                          : item3.problemAnalysis.substr(0, 35)
                      }}
                    </div>
                  </el-popover>
                </td>
                <td>
                  <el-popover trigger="click" placement="top">
                    <div>
                      <p>
                        {{ item3.relationThreaten }}
                      </p>
                    </div>
                    <div slot="reference" class="name-wrapper">
                      {{
                        item3.relationThreaten == null
                          ? item3.relationThreaten
                          : item3.relationThreaten.substr(0, 35)
                      }}
                    </div>
                  </el-popover>
                </td>
                <td>
                  <p v-if="item3.originalRisk == '高'">
                    <span style="color: red">{{ item3.originalRisk }}</span>
                  </p>
                  <p v-else-if="item3.originalRisk == '中'">
                    <span style="color: #ffcc33">{{ item3.originalRisk }}</span>
                  </p>
                  <p v-else-if="item3.originalRisk == '低'">
                    <span style="color: #66cc00">{{ item3.originalRisk }}</span>
                  </p>
                </td>
                <!-- 修正后风险值 -->
                <td>
                  <p v-if="item3.afterAmendRisk == '高'">
                    <span style="color: red">{{ item3.afterAmendRisk }}</span>
                  </p>
                  <p v-else-if="item3.afterAmendRisk == '中'">
                    <span style="color: #ffcc33">{{
                      item3.afterAmendRisk
                    }}</span>
                  </p>
                  <p v-else-if="item3.afterAmendRisk == '低'">
                    <span style="color: #66cc00">{{
                      item3.afterAmendRisk
                    }}</span>
                  </p>
                </td>
                <td>
                  <div>
                    {{ item3.hazardAnalysis }}
                  </div>
                </td>
                <td>
                  <div>
                    {{ item3.rectificationSuggestions }}
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
    font-size: 14px;
    font-weight: bold;
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
.List_b {
  height: 40px;
  background-color: darkseagreen;
  td {
    color: #fff !important;
  }
}
</style>
