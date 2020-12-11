<template>
  <d2-container>
    <div class="mude_is">
      <div class="ts_table">
        <el-tabs
          v-model="activeName"
          type="border-card"
          @tab-click="handleClick"
        >
          <el-tab-pane label="技术部分" name="technology">
            <div class="daochutechnology">
              <el-button
                type="primary"
                @click="daochutechnology('technology', 'excol')"
                >导出问题单（excol）</el-button
              >
              <el-button
                type="primary"
                @click="daochutechnology('technology', 'excol')"
                >导出问题单（word）</el-button
              >
            </div>
            <div v-if="activeName == 'technology'">
              <table id="partnerTable">
                <thead>
                  <tr>
                    <!-- <th style="width: 50px">序号</th> -->
                    <th>层面</th>
                    <th>测评对象</th>
                    <th>指标名称</th>
                    <th>测评项</th>
                    <th>现场记录</th>
                    <th style="width: 120px">符合情况</th>
                    <th>整改建议</th>
                    <th style="width: 150px">风险</th>
                    <th style="width: 50px">权重</th>
                  </tr>
                </thead>
                <template tbody v-for="item in technologyList">
                  <!-- <tr class="List_b" :key="ins">
                    <td colspan="10">{{ item.name }}</td>
                  </tr> -->

                  <tbody
                    v-for="(item1, index1) in item.content"
                    :key="Math.random() + index1"
                  >
                    <!-- <tr>
                      <td :rowspan="item.content.length * ToListm * 10">
                        {{ ins }}
                      </td>
                    </tr> -->
                    <tr >
                      <td :rowspan="item.content.length * ToListm * 10">
                        {{ item.name }}
                      </td>
                    </tr>
                    <tr>
                      <td :rowspan="item1.assetsList.length * ToListm">
                        {{ item1.assetsName }}
                      </td>
                    </tr>
                    <template v-for="item2 in item1.assetsList">
                      <tr
                        v-for="(item3, index3) in item2.spotList"
                        :key="Math.random() + index3"
                      >
                        <td v-if="!index3" :rowspan="item2.spotList.length">
                          {{ item2.spotName }}
                        </td>
                        <!-- 测评项 -->
                        <td>
                          <el-popover
                            title="测评项"
                            trigger="click"
                            placement="top"
                          >
                            <div>
                              <p>
                                {{ item3.controlEntries }}
                              </p>
                            </div>
                            <div slot="reference" class="name-wrapper tsList">
                              {{
                                item3.controlEntries == null
                                  ? item3.controlEntries
                                  : item3.controlEntries.substr(0, 35)
                              }}
                            </div>
                          </el-popover>
                        </td>
                        <!-- 现场记录 -->
                        <td>
                          <el-popover
                            title="现场记录"
                            trigger="click"
                            placement="top"
                          >
                            <div>
                              <p>
                                {{ item3.recordResults }}
                              </p>
                            </div>
                            <div slot="reference" class="name-wrapper tsList">
                              {{
                                item3.recordResults == null
                                  ? item3.recordResults
                                  : item3.recordResults.substr(0, 35)
                              }}
                            </div>
                          </el-popover>
                        </td>
                        <!-- 符合情况 -->
                        <td>
                          <span v-show="item3.accordSituation === 0"
                            >没有选择</span
                          >
                          <span v-show="item3.accordSituation === 2"
                            >部分符合</span
                          >
                          <span v-show="item3.accordSituation === 3"
                            >不符合</span
                          >
                          <span v-show="item3.accordSituation === 4"
                            >不适用</span
                          >
                        </td>
                        <!-- 整改建议 -->
                        <td>
                          <el-popover
                            title="整改建议"
                            trigger="click"
                            placement="top"
                          >
                            <div>
                              <el-input
                                type="textarea"
                                :autosize="{ minRows: 4, maxRows: 8 }"
                                placeholder="请输入内容"
                                v-model="item3.remarks"
                                @blur="Totisadd(item3)"
                              >
                              </el-input>
                            </div>
                            <div
                              slot="reference"
                              v-if="item3.remarks"
                              class="name-wrapper"
                            >
                              {{ item3.remarks.substr(0, 35) }}
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
                        <!-- 风险 -->
                        <td>
                          <el-select
                            v-model="item3.riskGrade"
                            placeholder="请选择"
                            @change="Totisadd(item3)"
                          >
                            <el-option
                              v-for="item in riskGradeList"
                              :key="item.id"
                              :label="item.value"
                              :value="item.id"
                            >
                            </el-option>
                          </el-select>
                        </td>
                        <!-- 权重 -->
                        <td>{{ item3.weight }}</td>
                      </tr>
                    </template>
                  </tbody>
                </template>
              </table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="管理部分" name="management">
            <div class="daochutechnology">
              <el-button
                type="primary"
                @click="daochutechnology('management', 'excol')"
                >导出问题单（excol）</el-button
              >
              <el-button
                type="primary"
                @click="daochutechnology('management', 'excol')"
                >导出问题单（word）</el-button
              >
            </div>
            <div v-if="activeName == 'management'">时5时时</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </d2-container>
</template>

<script>
import { cloneDeep } from "lodash";
export default {
  data() {
    return {
      activeName: "technology",
      managementList: [],
      technologyList: [],
      ToListm: 50,
      riskGradeList: [
        { id: 0, value: "请选择" },
        { id: 1, value: "低" },
        { id: 2, value: "中" },
        { id: 3, value: "高" },
      ],
    };
  },
  created() {
    this.getdataList();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 获取测评问题清单列表
    async getdataList() {
      let res = await this.$api.SYS_reviseManifest_InputDoc();
      if (res.code === 20000) {
        this.managementList = res.data.management;
        this.technologyList = res.data.technology;
      } else {
        this.$message.error(res.message);
      }
    },
    // 修改
    async Totisadd(item) {
      let reviseManifestModel = cloneDeep(item);
      let res = await this.$api.SYS_reviseMupdate_InputDoc(reviseManifestModel);
      if (res.code === 20000) {
        this.getdataList();
      } else {
        this.$message.error(res.message);
      }
    },
    // 导出问题单
    daochutechnology(item, type) {},
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
// .List_b {
//   height: 40px;
//   background-color: darkseagreen;
//   td {
//     color: #fff !important;
//   }
// }
::v-deep .el-tabs--border-card > .el-tabs__header {
  position: sticky;
  top: -21px;
  z-index: 1;
  padding: 5px 0px;
}
.daochutechnology {
  .el-button {
    margin: 15px;
  }
}
</style>
