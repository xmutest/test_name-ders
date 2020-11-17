<!--风险值修正-->
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
            <th>原始风险值</th>
            <th>修正前严重程度</th>
            <th>修正因子</th>
            <th>修正理由</th>
            <th>修正后风险值</th>
            <th>修正后严重程度</th>
            <th>权重</th>
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
                <td>{{ item3.originalRisk }}</td>
                <!-- 修正前严重程度 -->
                <td>
                  <div>
                    {{ item3.beforeModificationSeverity }}
                  </div>
                </td>
                <!-- 修正因子 -->
                <td>
                  <div>
                    <el-select
                      @change="Totisadd(item3)"
                      v-model="item3.correctFactor"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in xiuzheng"
                        :key="item.id"
                        :label="item.value"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </td>
                <!-- 修正理由 -->
                <td>
                  <el-popover trigger="click" placement="top">
                    <div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 8, maxRows: 12 }"
                        placeholder="请输入内容"
                        v-model="item3.correctReason"
                        @blur="Totisadd(item3)"
                      >
                      </el-input>
                    </div>
                    <div slot="reference" class="name-wrapper">
                      <span style="opacity: 0">.</span>
                      <span v-if="item3.correctReason != null">
                        {{
                          item3.correctReason == ""
                            ? item3.correctReason
                            : item3.correctReason.substr(0, 35)
                        }}
                      </span>
                    </div>
                  </el-popover>
                  <!-- <div>
                    {{ item3.correctReason }}
                  </div> -->
                </td>
                <!-- 修正后风险值 -->
                <td>
                  <div>
                    <el-select
                      @change="afterAmendSeverityLis(item3)"
                      v-model="item3.afterAmendRisk"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in afterAmendSeverityList"
                        :key="item.id"
                        :label="item.value"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </td>
                <!-- 修正后严重程度 -->
                <td>
                  <div>
                    {{ item3.afterAmendSeverity }}
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
      Toamount: 20,
      dataList: [],
      afterAmendSeverityList: [
        { id: 1, value: "高" },
        { id: 2, value: "中" },
        { id: 3, value: "低" },
      ],
      xiuzheng: [
        { id: 1, value: 0.5 },
        { id: 2, value: 0.6 },
        { id: 3, value: 0.7 },
        { id: 4, value: 0.8 },
        { id: 5, value: 0.9 },
        { id: 6, value: 1.0 },
        { id: 7, value: 1.1 },
        { id: 8, value: 1.2 },
        { id: 9, value: 1.3 },
        { id: 10, value: 1.4 },
        { id: 11, value: 1.5 },
      ],
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    // 修改
    async Totisadd(item) {
      let amendAnalysis = item;
      // let fractionModelList = [];
      // fractionModelList.push(item);
      let res = await this.$api.API_RiskUpdateRiskCorrection(amendAnalysis);
      if (res.code === 20000) {
        this.$message.success("保存成功");
        this.getDataList();
      }
    },
    async afterAmendSeverityLis(item) {
      let amendAnalysis = item;
      // let fractionModelList = [];
      // fractionModelList.push(item);
      let res = await this.$api.API_RiskUpdateAfterAmendRisk(amendAnalysis);
      if (res.code === 20000) {
        this.$message.success("保存成功");
        this.getDataList();
      }
    },
    async getDataList() {
      // let its = dataLists;

      // this.dataList = its.data.pageData;
      let res = await this.$api.API_RiskFindRiskCorrections(this.api_data);
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
