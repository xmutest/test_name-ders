
<template>
  <d2-container>
    <div v-if="dataList.length > 0">
      <div class="schuan_s">
        <div>
          <el-button @click="dialogVisible = true" type="primary"
            >已有安全措施</el-button
          >
        </div>
        <div>
          <upload-qu
            :toSonData="toSonData"
            @toFatherData="sendSonData"
          ></upload-qu>
        </div>
        <div>
          <upload-dachu :toSonData="api_data.sceneCheckId"></upload-dachu>
        </div>
        <!-- 上传 toSonData：传给后台的id  sendSonData上传成功的返回值-->
      </div>
      <!-- 安全保护 -->
      <el-dialog
        title="已有安全措施"
        :visible.sync="dialogVisible"
        width="80%"
        :close-on-click-modal="false"
        :before-close="handleClose"
      >
        <div class="table_To1"></div>
        <div class="ToMits">
          <el-tabs v-loading="loading" class="container-tab" type="border-card">
            <el-tab-pane
              v-for="Its in ToMitList"
              :key="Its.id"
              :label="Its.name"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 15 }"
                placeholder="请输入内容"
                v-model="Its.content"
              >
              </el-input>
              <div class="tijiaobaoc">
                <el-button type="primary" @click="submitReporAdd(Its)"
                  >生成</el-button
                >
                <el-button type="primary" @click="submitReport(Its)"
                  >保存并退出</el-button
                >
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>
      <div class="ts_table">
        <el-tabs
          v-loading="loading"
          v-model="activeNameTabs"
          class="container-tab"
          type="border-card"
        >
          <el-tab-pane
            v-for="Its in dataList"
            :name="Its.name + Its.id"
            :key="Its.id"
            :label="Its.name"
          >
            <div v-if="activeNameTabs == Its.name + Its.id">
              <table id="partnerTable">
                <thead>
                  <tr>
                    <th style="width: 100px">安全控制点</th>
                    <th>控制项</th>
                    <th>检查内容</th>
                    <th>检查方法</th>
                    <th>推荐值</th>
                    <th>判断标准</th>
                    <th>结果记录</th>
                    <th style="width: 130px">符合情况</th>
                    <th>备注</th>
                    <th style="width: 50px">权重</th>
                  </tr>
                </thead>
                <template v-for="(ite, ins) in Its.safetyControls">
                  <tr class="List_b" :key="ins">
                    <td colspan="10">{{ ite.name }}</td>
                  </tr>
                  <tbody v-for="item1 in ite.content" :key="item1.id">
                    <tr
                      v-for="(item2, index) in item1.contentList"
                      :key="index"
                    >
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
                        <el-popover
                          title="控制项"
                          trigger="click"
                          placement="top"
                        >
                          <div>
                            <p
                              v-for="(item3,
                              index3) in item2.controlEntries.split(';')"
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
                        <el-popover
                          title="检查内容"
                          trigger="click"
                          placement="top"
                        >
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
                        <el-popover
                          title="检查方法"
                          trigger="click"
                          placement="top"
                        >
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
                        <el-popover
                          title="推荐值"
                          v-if="item2.recommendedValue"
                          trigger="click"
                          placement="top"
                        >
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
                        <div v-else>
                          {{ item2.recommendedValue }}
                        </div>
                      </td>
                      <td>
                        <el-popover
                          title="判断标准"
                          trigger="click"
                          placement="top"
                        >
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
                </template>
              </table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div v-else>
      <upload-wushu></upload-wushu>
    </div>
  </d2-container>
</template>

<script>
import { cloneDeep } from "lodash";
export default {
  data() {
    return {
      activeNameTabs: "",
      dialogVisible: false,
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
      ToMitList: [],
      accordSituationlist: [
        { value: 0, label: "请选择" },
        { value: 1, label: "符合" },
        { value: 2, label: "部分符合" },
        { value: 3, label: "不符合" },
        { value: 4, label: "不适用" },
      ],
      // 请求数据
      api_data: {
        sceneCheckId: 3,
      },
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    async submitReporAdd(item) {
      let data = {
        projectId: item.projectId,
        type: item.type,
      };
      let res = await this.$api.SYS_fieldSurveySyncProtective(data);
      if (res.code === 20000) {
        item.content = res.data;
      } else {
        this.$message.error("错误，请联系管理员" + res.message);
      }
    },
    // 获取
    async submitReport(item) {
      let fractionModelList = [];
      fractionModelList.push(item);
      let res = await this.$api.SYSFieldSurveyUpdateList(fractionModelList);
      if (res.code === 20000) {
        this.$message.success("保存成功");
        this.dialogVisible = false;
        this.getDataList();
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    sendSonData(data) {
      if (data === true) {
        this.getDataList();
      }
    },
    async Totisadd(item) {
      let fractionModelList = [];
      fractionModelList.push(item);
      let res = await this.$api.SYS_FieldSurveYUpdate(fractionModelList);
      if (res.code === 20000) {
        this.$message.success("保存成功");
        this.getDataList();
      }
    },
    async getDataList() {
      this.loading = true;
      const res = await this.$api.SYS_FieldSurveyFindAssetsList(this.api_data);
      if (res.code === 20000) {
        if (res.data.assetsList.length == 0) {
          this.loading = false;
          return;
        }
        var listTs = cloneDeep(res.data.assetsList);
        this.ToMitList = cloneDeep(res.data.protectiveList);
        if (this.activeNameTabs == 0) {
          this.activeNameTabs = listTs[0].name + listTs[0].id;
        }
        this.loading = false;
        this.dataList = listTs;
        this.ToMitList.forEach((element) => {
          if (element.content == null) {
            this.submitReporAdd(element);
          }
        });
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

.schuan_s {
  margin: 15px 0;
  display: flex;
  div {
    margin: 0 10px;
  }
}
.List_b {
  height: 40px;
  background-color: darkseagreen;
  td {
    color: #fff !important;
  }
}
::v-deep .el-tabs--border-card > .el-tabs__header {
  position: sticky;
  top: -21px;
  z-index: 1;
  padding: 5px 0px;
}
</style>
