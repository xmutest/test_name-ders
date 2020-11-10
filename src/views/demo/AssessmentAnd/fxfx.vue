<!--风险分析和评价-->
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
            <th>危害分析</th>
            <th>整改建议</th>
          </tr>
        </thead>
        <template tbody v-for="(item, ins) in dataList">
          <tr class="List_b" :key="ins">
            <td colspan="10">{{ item.extendedStandard }}</td>
          </tr>
          <tbody v-for="item1 in item.resultData" :key="item1.id">
            <tr>
              <td :rowspan="item1.sceneCheckData.length * Toamount">
                {{ item1.sceneCheckName }}
              </td>
            </tr>
            <template v-for="item2 in item1.sceneCheckData">
              <tr
                v-for="(item3, index3) in item2.controlEntriesData"
                :key="Math.random() + index3"
              >
                <td v-if="!index3" :rowspan="item2.controlEntriesData.length">
                  {{ item2.safetyControlSpot }}
                </td>

                <td @dblclick="shishiClick(item3)">
                  <div slot="reference" class="name-wrapper">
                    {{ item3.assets }}
                  </div>
                </td>
                <td>
                  <div slot="reference" class="name-wrapper">
                    {{ item3.controlEntries }}
                  </div>
                </td>
                <td>
                  <div slot="reference" class="name-wrapper">
                    {{ item3.problemDescription }}
                  </div>
                </td>
                <td>{{ item3.problemAnalysis }}</td>
                <td>
                  <div>
                    {{ item3.relationThreaten }}
                  </div>
                </td>
                <td>
                  <div>
                    {{ item3.originalRisk }}
                  </div>
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
              </tr>
            </template>
          </tbody>
        </template>
      </table>
    </div>
    <div class="updata_dialog">
      <el-dialog title="系统安全问题风险分析和评价" :visible.sync="dialogVisible" :before-close="handleClose">
        <el-dialog
          width="30%"
          title="关联威胁值"
          :visible.sync="innerVisible"
          append-to-body
          :before-close="handleClose"
        >
          <div class="relevanceWeiList">
            <el-checkbox-group v-model="relevanceWeiList">
              <el-checkbox
                v-for="item in DataListPou"
                :key="item.id"
                :label="item.id"
              >
                {{ item.threatClassificationName }}({{ item.threatGrade }}风险)
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="relevanceMenace"
              >确 定</el-button
            >
          </span>
        </el-dialog>
        <div class="name_ts">
          <div></div>
          <div class="name_ro">
            <div>修改后测评符合程度：0</div>
            <div>严重程度值：{{ beforeModificationSeverity }}</div>
          </div>
        </div>
        <div class="relevance relevance_tyu">
          <div>
            <div class="textName">
              {{ tsAmlist.assets }}({{ tsAmlist.fraction }}分)
            </div>
            <div class="text_fininfo">{{ tsAmlist.recordResults }}</div>
          </div>
        </div>
        <div class="relevance">
          <el-tabs style="height: 200px" type="border-card">
            <el-tab-pane label="风险知识库">
              <div class="xuna">
                <el-radio
                  @change="Listdatamis(item)"
                  v-for="(item, index) in relevanceList"
                  :key="index"
                  v-model="Ts_radio"
                  :label="index"
                  >{{ item.riskName }}</el-radio
                >
              </div>
            </el-tab-pane>
            <el-tab-pane label="高风险叛列">
              {{ amendAnalysis.highRiskJudge }}
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="up_wt">
          <div>
            <p>问题描述：</p>
            <el-input
              type="textarea"
              v-model="amendAnalysis.problemDescription"
              :rows="3"
              placeholder="请输入内容"
            >
            </el-input>
          </div>
          <div>
            <p>危害分析：</p>
            <el-input
              type="textarea"
              :rows="3"
              v-model="amendAnalysis.hazardAnalysis"
              placeholder="请输入内容"
            >
            </el-input>
          </div>
          <div>
            <p>问题分析：</p>
            <el-input
              type="textarea"
              :rows="3"
              v-model="amendAnalysis.problemAnalysis"
              placeholder="请输入内容"
            >
            </el-input>
          </div>
          <div>
            <p>整改建议：</p>
            <el-input
              type="textarea"
              :rows="3"
              v-model="amendAnalysis.rectificationSuggestions"
              placeholder="请输入内容"
            >
            </el-input>
          </div>
        </div>
        <div class="Threats">
          <div>
            <el-popover width="600" trigger="hover">
              <el-button
                @click="FmeListo('高')"
                :style="
                  amendAnalysis.originalRisk == '高' ||
                  amendAnalysis.riskGrade == 1
                    ? 'background-color: red'
                    : ''
                "
                slot="reference"
              >
                高风险
              </el-button>
            </el-popover>
          </div>
          <div>
            <el-popover width="600" trigger="hover">
              <el-button
                @click="FmeListo('中')"
                :style="
                  amendAnalysis.originalRisk == '中' ||
                  amendAnalysis.riskGrade == 2
                    ? 'background-color: #FFEB3B'
                    : ''
                "
                slot="reference"
                >中风险</el-button
              >
            </el-popover>
          </div>
          <div>
            <el-popover width="600" trigger="hover">
              <el-button
                slot="reference"
                @click="FmeListo('低')"
                :style="
                  amendAnalysis.originalRisk == '低' ||
                  amendAnalysis.riskGrade == 3
                    ? 'background-color: #4CAF50'
                    : ''
                "
                >低风险</el-button
              >
            </el-popover>
          </div>
          <div>
            <el-button type="info" @click="innerVisible = true"
              >关联威胁</el-button
            >
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="Tolist()">确 定</el-button>
          <el-button @click="(dialogVisible = false), getDataList()"
            >取 消</el-button
          >
        </span>
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
import { cloneDeep } from "lodash";
export default {
  data() {
    return {
      Toamount: 5,
      innerVisible: false,
      dialogVisible: false,
      itemsCoacr: [
        { color: "#fff" },
        { color: "#fff" },
        { color: "#FFEB3B" },
        { color: "#F44336" },
        { color: "#fff" },
      ],
      dataList: [],
      // 风险
      DataListPou: [],
      accordSituationlist: [
        { value: 4, label: "不适用" },
        { value: 3, label: "不符合(0分)" },
        { value: 2, label: "部分符合(0.5分)" },
        { value: 1, label: "符合(1分)" },
      ],
      relevanceList: [],
      relevanceWeiList: [],
      // 请求数据
      api_data: {
        pageNum: 1,
        pageSize: 30,
        amendId: 1,
        safetyControlId: 136,
      },
      tsAmlist: {},
      amendAnalysis: {
        problemDescription: "",
        hazardAnalysis: "",
        problemAnalysis: "",
        rectificationSuggestions: "",
        originalRisk: "",
        relationThreaten: "",
        highRiskJudge: "",
      },
      Ts_radio: "",
      beforeModificationSeverity: "",
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    Listdatamis(item) {
      let ls = [
        {
          id: 1,
          value: "高",
        },
        {
          id: 2,
          value: "中",
        },
        {
          id: 3,
          value: "低",
        },
      ];
      let amendId = this.amendAnalysis.amendId;
      this.amendAnalysis = item;
      this.relevanceWeiList=item.threatId;
      this.amendAnalysis.amendId = amendId;
       ls.forEach((it) => {
        console.log(item.riskGrade);
        if (it.id == item.riskGrade) {
          this.amendAnalysis.originalRisk = it.value;
        }
      });
    },
    Totisadd() {
      console.log(5);
    },
    shishiClick(item3) {
      this.tsAmlist = item3;
      this.amendAnalysis = item3;
      this.beforeModificationSeverity = item3.beforeModificationSeverity;
      this.api_data.amendId = item3.amendId;
      this.api_data.safetyControlId = item3.safetyControlId;
      this.dialogVisible = true;
      this.getDaPuList();
      this.getDataListPou();
    },
    async Tolist() {
      // relationThreaten
      let ls = "";
      this.relevanceWeiList.forEach((item) => {
        ls += this.DataListPou[item - 1].threatClassificationName + ",";
      });
      this.amendAnalysis.relationThreaten = ls;
      this.amendAnalysis.threatId = this.relevanceWeiList;
      let res = await this.$api.API_RiskUpdateAmendAnalysis(this.amendAnalysis);
      if (res.code == 20000) {
        this.dialogVisible = false;
        this.getDataList();
      } else {
        this.$message.error("保存出错");
      }
    },
    async getDaPuList() {
      let res = await this.$api.API_RiskFindRiskKnowledge(this.api_data);
      if (res.code == 20000) {
        this.relevanceList = res.data[0];
        this.relevanceWeiList = res.data[1];
      } else {
        this.$message.error("信息加载出错");
      }
    },
    async getDataList() {
      // let its = dataLists;

      // this.dataList = its.data.pageData;
      let res = await this.$api.API_RiskFindAmendAnalysis(this.api_data);
      if (res.code == 20000) {
        this.dataList = res.data.pageData;
        this.Toamount = res.data.count + 5;
      } else {
        this.$message.error("信息加载出错");
      }
    },
    // 获取关联威胁
    async getDataListPou() {
      let res = await this.$api.API_projectOThreatClassificationFindAll();
      if (res.code == 20000) {
        this.DataListPou = res.data;
      } else {
        this.$message.error("信息加载关联威胁出错");
      }
    },
    FmeListo(item) {
      this.amendAnalysis.originalRisk = item;
      if (item == "高") {
        this.amendAnalysis.riskGrade = 1;
      } else if (item == "中") {
        this.amendAnalysis.riskGrade = 2;
      } else {
        this.amendAnalysis.riskGrade = 3;
      }
    },
    // 设置关联威胁
    relevanceMenace() {
      this.innerVisible = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
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
.relevanceWeiList {
  height: 150px;
  overflow: auto;
  .el-checkbox-group {
    .el-checkbox {
      display: block;
      margin: 5px 0;
    }
  }
}
.schuan_s {
  margin: 15px 0;
  text-align: right;
}
::v-deep .el-dialog {
  width: 900px;
}
.updata_dialog {
  .name_ts {
    display: flex;
    margin-bottom: 5px;
    position: relative;
    color: blue;
    .name_ro {
      position: absolute;
      right: 0;
      display: flex;
      color: black;
      div {
        margin: 0 15px;
      }
    }
  }
  .relevance {
    max-height: 200px;
    margin: 15px 0;
    .xuna {
      overflow: auto;
      height: 135px;
      .el-radio {
        display: block;
        margin: 5px 0;
      }
    }
  }
  .up_wt {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    div {
      width: 400px;
      padding: 0 10px;
    }
  }
  .Threats {
    padding: 10px;
    display: flex;
    div {
      margin: 0 10px;
    }
  }
}
.List_b {
  height: 40px;
  background-color: darkseagreen;
  td {
    color: #fff !important;
  }
}
.relevance_tyu {
  width: 300px;
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  .textName {
    font-size: 16px;
    font-weight: bold;
  }
  .text_fininfo {
    font-size: 12px;
  }
}
</style>


