<!--安全物理环境-->
<template>
  <d2-container>
    <div class="schuan_s">
      <!-- 上传 toSonData：传给后台的id  sendSonData上传成功的返回值-->
      <upload-qu :toSonData="toSonData" @toFatherData="sendSonData"></upload-qu>
    </div>
    <div class="ts_table">
      <el-tabs v-loading="loading" class="container-tab" type="card">
        <el-tab-pane v-for="Its in dataList" :key="Its.id" :label="Its.name">
          <div>
            <table id="partnerTable">
              <thead>
                <tr>
                  <th>安全控制点</th>
                  <th>控制项</th>
                  <th>检查内容</th>
                  <th>检查方法</th>
                  <th>推荐值</th>
                  <th>判断标准</th>
                  <th>结果记录</th>
                  <th>符合情况</th>
                  <th>备注</th>
                  <th>权重</th>
                </tr>
              </thead>
              <tbody
                v-for="(item1, index1) in Its.safetyControls"
                :key="index1"
              >
                <tr v-for="(item2, index) in item1.contentList" :key="index">
                  <td v-if="!index" :rowspan="item1.contentList.length">
                    {{ item1.safetyControlSpot }}
                  </td>
                  <td
                    :style="
                      item2.accordSituation
                        ? {
                            'background-color':
                              itemsCoacr[item2.accordSituation].color,
                          }
                        : ''
                    "
                  >
                    <el-popover trigger="click" placement="top">
                      <div>
                        <p
                          v-for="(item3, index3) in item2.controlEntries.split(
                            ';'
                          )"
                          :key="index3"
                        >
                          {{ item3 }}
                        </p>
                      </div>
                      <div slot="reference" class="name-wrapper">
                        <span v-if="item2.accordSituation != 4">{{
                          item2.controlEntries.substr(0, 35)
                        }}</span>
                        <span v-else-if="item2.accordSituation == 4"
                          ><del>{{
                            item2.controlEntries.substr(0, 35)
                          }}</del></span
                        >
                      </div>
                    </el-popover>
                  </td>
                  <td>
                    <el-popover trigger="click" placement="top">
                      <div>
                        <p
                          v-for="(item3,
                          index3) in item2.inspectionContents.split(';')"
                          :key="index3"
                        >
                          {{ item3 }}
                        </p>
                      </div>
                      <div slot="reference" class="name-wrapper">
                        {{ item2.inspectionContents.substr(0, 35) }}
                      </div>
                    </el-popover>
                  </td>
                  <td>
                      <el-popover trigger="click" placement="top">
                      <div>
                        <p
                          v-for="(item3,
                          index3) in item2.inspectionMethod.split(';')"
                          :key="index3"
                        >
                          {{ item3 }}
                        </p>
                      </div>
                      <div slot="reference" class="name-wrapper">
                        {{ item2.inspectionMethod.substr(0, 35) }}
                      </div>
                    </el-popover>
                  </td>
                  <td>
                    <el-popover trigger="click" placement="top">
                      <div>
                        <p
                          v-for="(item3,
                          index3) in item2.recommendedValue.split(';')"
                          :key="index3"
                        >
                          {{ item3 }}
                        </p>
                      </div>
                      <div slot="reference" class="name-wrapper">
                        {{ item2.recommendedValue.substr(0, 35) }}
                      </div>
                    </el-popover>
                  </td>
                  <td>
                    <el-popover trigger="click" placement="top">
                      <div>
                        <p
                          v-for="(item3,
                          index3) in item2.judgmentCriteria.split(';')"
                          :key="index3"
                        >
                          {{ item3 }}
                        </p>
                      </div>
                      <div slot="reference" class="name-wrapper">
                        {{ item2.judgmentCriteria.substr(0, 35) }}
                      </div>
                    </el-popover>
                  </td>

                  <td>
                    <el-popover trigger="click" placement="top">
                      <div>
                        <el-input
                          type="textarea"
                          :autosize="{ minRows: 8, maxRows: 12 }"
                          placeholder="请输入内容"
                          v-model="item2.recordResults"
                          @blur="Totisadd(item2)"
                        >
                        </el-input>
                      </div>
                      <div
                        slot="reference"
                        v-if="item2.recordResults"
                        class="name-wrapper"
                      >
                        {{ item2.recordResults.substr(0, 35) }}
                      </div>
                      <div
                        style="min-height: 100px"
                        slot="reference"
                        v-else
                        class="name-wrapper"
                      >
                        <span style="opacity: 0">点击填写</span>
                      </div>
                    </el-popover>
                  </td>
                  <td>
                    <el-select
                      v-model="item2.accordSituation"
                      clearable
                      @change="Totisadd(item2)"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in accordSituationlist"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-popover trigger="click" placement="top">
                      <div>
                        <el-input
                          type="textarea"
                          :autosize="{ minRows: 4, maxRows: 8 }"
                          placeholder="请输入内容"
                          v-model="item2.remark"
                          @blur="Totisadd(item2)"
                        >
                        </el-input>
                      </div>
                      <div
                        slot="reference"
                        v-if="item2.remark"
                        class="name-wrapper"
                      >
                        {{ item2.remark.substr(0, 35) }}
                      </div>
                      <div
                        style="min-height: 100px"
                        slot="reference"
                        v-else
                        class="name-wrapper"
                      >
                        <span style="opacity: 0">点击填写备注</span>
                      </div>
                    </el-popover>
                  </td>
                  <td>{{ item2.weight }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </d2-container>
</template>

<script>
import { cloneDeep } from "lodash";
export default {
  data() {
    return {
      loading: true,
      // activeName: "",
      itemsCoacr: [
        { color: "#fff" },
        { color: "#fff" },
        { color: "#FFEB3B" },
        { color: "#F44336" },
        { color: "#fff" },
      ],
      toSonData: 1,
      dataList: [],
      accordSituationlist: [
        { value: 0, label: "请选择" },
        { value: 1, label: "符合(1分)" },
        { value: 2, label: "部分符合(0.5分)" },
        { value: 3, label: "不符合(0分)" },
        { value: 4, label: "不适用" },
      ],
      // 请求数据
      api_data: {
        sceneCheckId: 2,
      },
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    sendSonData(data) {
      if (data === true) {
        this.getDataList();
      }
    },
    async Totisadd(item) {
      let fractionModelList = [];
      fractionModelList.push(item);
      let res = await this.$api.SYS_FieldSurveYUpdate(fractionModelList);
      console.log(res);
      if (res.code === 20000) {
        this.$message.success("保存成功");
        this.getDataList();
      }
    },
    async getDataList() {
      this.loading = true;
      const res = await this.$api.SYS_FieldSurveyFindAssetsList(this.api_data);
      if (res.code === 20000) {
        var listTs = cloneDeep(res.data.assetsList);
        this.loading = false;
        this.dataList = listTs;
      }
      //  const res= await this.$http.get('/api/safetyControl/findSpotByBookId',{params:this.api_data});
      //  this.dataList=res.data.data;
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

.schuan_s {
  margin: 15px 0;
  text-align: right;
}
</style>
