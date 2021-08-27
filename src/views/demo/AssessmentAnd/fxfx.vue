<!--风险分析和评价-->
<template>
  <d2-container>
    <div class="ts_table">
      <table>
        <thead>
          <tr>
            <th style="width: 120px">安全层面</th>
            <th style="width: 120px">控制点</th>
            <th style="width: 120px">关联资产</th>
            <th style="width: 300px">控制项</th>
            <th style="width: 120px">问题描述</th>
            <th>问题分析</th>
            <th>关联威胁</th>
            <th style="width: 100px">原始风险值</th>
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

                <td>
                  <el-popover trigger="click" placement="top">
                    <div>
                      <p>
                        {{ item3.assets }}
                      </p>
                    </div>
                    <div slot="reference" class="name-wrapper tsList">
                      {{
                        item3.assets == null
                          ? item3.assets
                          : item3.assets.substr(0, 35)
                      }}
                    </div>
                  </el-popover>
                </td>
                <td
                  class="leftLs"
                  @click="shishiClick(item3, item1.sceneCheckName)"
                >
                  <div slot="reference" class="name-wrapper">
                    <a class="text_click">
                      {{
                        item3.controlEntries == null
                          ? item3.controlEntries
                          : item3.controlEntries.substr(0, 80)
                      }}
                    </a>
                  </div>
                </td>
                <td>
                  <el-popover trigger="click" placement="top">
                    <div>
                      <p>
                        {{ item3.problemDescription }}
                      </p>
                    </div>
                    <div slot="reference" class="name-wrapper tsList">
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

                <td>
                  <el-popover trigger="click" placement="top">
                    <div>
                      <p>
                        {{ item3.hazardAnalysis }}
                      </p>
                    </div>
                    <div slot="reference" class="name-wrapper">
                      {{
                        item3.hazardAnalysis == null
                          ? item3.hazardAnalysis
                          : item3.hazardAnalysis.substr(0, 35)
                      }}
                    </div>
                  </el-popover>
                </td>
                <td>
                  <el-popover trigger="click" placement="top">
                    <div>
                      <p>
                        {{ item3.rectificationSuggestions }}
                      </p>
                    </div>
                    <div slot="reference" class="name-wrapper">
                      {{
                        item3.rectificationSuggestions == null
                          ? item3.rectificationSuggestions
                          : item3.rectificationSuggestions.substr(0, 35)
                      }}
                    </div>
                  </el-popover>
                </td>
              </tr>
            </template>
          </tbody>
        </template>
      </table>
    </div>
    <div class="updata_dialog">
      <el-dialog
        title="系统安全问题风险分析和评价"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :before-close="handleClose"
      >
        <el-dialog
          width="30%"
          title="关联威胁值"
          :visible.sync="innerVisible"
          :close-on-click-modal="false"
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

        <div class="relevance relevance_tyu">
          <div
            class="relevance_tyu_item"
            v-for="(item, index) in DataListOp"
            :key="index"
          >
            <div class="textName">
              {{ item.assetsName }}({{ item.fraction }}分)
            </div>
            <div class="text_fininfo">{{ item.recordResults }}</div>
          </div>
        </div>
        <div class="relevance">
          <el-tabs style="height: 200px" type="border-card">
            <el-tab-pane label="风险知识库">
              <div class="xuna xunaListbu">
                <el-radio
                  @change="Listdatamis(item)"
                  v-for="(item, index) in relevanceList"
                  :key="index"
                  v-model="Ts_radio"
                  :label="index"
                >
                  <span v-show="item.userId === 0">{{ item.riskName }}</span>
                  <span v-show="item.userId !== 0"
                    ><i class="el-icon-s-flag"></i>{{ item.riskName
                    }}<el-button
                      type="danger"
                      icon="el-icon-delete"
                      @click="deletefenis(item)"
                      circle
                    ></el-button
                  ></span>
                </el-radio>
              </div>
            </el-tab-pane>
            <el-tab-pane label="高风险判例" v-if="fenxianList.length != 0">
              <div class="xuna">
                <div v-for="(item, index) in fenxianList" :key="index">
                  <h4>{{ item.title }}</h4>
                  <!-- <el-input
                    type="textarea"
                    :rows="2"
                    readonly
                    v-model=" "
                  >
                  </el-input> -->
                  <pre
                    >{{ item.highRiskJudge }}
                 </pre
                  >
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="整改建议" v-if="fenxianList.length != 0">
              <div class="xuna">
                <div v-for="(item, index) in fenxianList" :key="index">
                  <h4>{{ item.title }}</h4>
                  {{ item.suggestion }}
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="up_wt">
          <div>
            <p>
              问题描述：<span
                v-show="this.itemName == '安全计算环境'"
                class="Listiption"
                >（相关资产会在报告里面自动生成，此处不需填资产）</span
              >
            </p>
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
            <el-button type="info" @click="innerVisible = true"
              >关联威胁</el-button
            >
          </div>
        </div>
        <div class="name_ro">
          <div>修改后测评符合程度：0</div>
          <div>严重程度值：{{ beforeModificationSeverity }}</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="Organization()" v-throttle
            >纳入我的知识库</el-button
          >
          <el-button type="primary" @click="Tolist()" v-throttle
            >确 定</el-button
          >
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
import { mapState } from "vuex";
import log from "@/libs/util.log";
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
      fenxianList: [],
      amendAnalysisVO: {},
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
      DataListOp: [],
      lust: {},
      // 判断名称
      itemName: "",
      // 关联id
      safetyControlRelationId: "",
      beforeDescription: "",
    };
  },
  created() {
    this.getDataList();
  },
  computed: {
    ...mapState("d2admin", {
      info: (state) => state.user.info,
    }),
  },
  methods: {
    // 纳入风险知识库
    async Organization() {
      let riskKnowledge = {};
      riskKnowledge.threatId = this.relevanceWeiList;
      let ls = "";
      this.relevanceWeiList.forEach((item) => {
        ls += this.DataListPou[item - 1].threatClassificationName + ",";
      });
      riskKnowledge.relationThreaten = ls.slice(0, ls.length - 1);
      riskKnowledge.hazardAnalysis = this.amendAnalysis.hazardAnalysis;
      riskKnowledge.originalRisk = this.amendAnalysis.originalRisk;
      riskKnowledge.problemAnalysis = this.amendAnalysis.problemAnalysis;
      riskKnowledge.problemDescription = this.amendAnalysis.problemDescription;
      riskKnowledge.rectificationSuggestions =
        this.amendAnalysis.rectificationSuggestions;
      if (
        riskKnowledge.originalRisk != "" &&
        riskKnowledge.originalRisk != "undefined"
      ) {
        if (riskKnowledge.originalRisk == "高") {
          riskKnowledge.riskGrade = 1;
        } else if (riskKnowledge.originalRisk == "中") {
          riskKnowledge.riskGrade = 2;
        } else if (riskKnowledge.originalRisk == "低") {
          riskKnowledge.riskGrade = 3;
        }
      } else {
        riskKnowledge.riskGrade = this.amendAnalysis.riskGrade;
      }

      riskKnowledge.userId = this.info.user_info.userId;
      if (
        this.safetyControlRelationId !== "" &&
        this.safetyControlRelationId !== undefined
      ) {
        riskKnowledge.safetyControlRelationId = this.safetyControlRelationId;
      } else {
        return this.$message.error("获取关联id出错，请重新打开");
      }
      console.log(this.safetyControlRelationId);
      let res = await this.$api.API_saveRiskKnowledge(riskKnowledge);
      if (res.code === 20000) {
        this.$message.success("纳入风险知识库成功");
        this.getDaPuList(riskKnowledge.threatId);
      } else {
        this.$message.error("纳入风险知识库出错");
      }
    },
    Listdatamis(items) {
      this.getDaPuList(items.threatId);
      let item = cloneDeep(items);
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
      // if (this.itemName == "安全物理环境" || this.itemName == "安全计算环境") {
      //   this.amendAnalysis.problemDescription = `${this.tsAmlist.assets}${item.problemDescription}`;
      // }

      this.amendAnalysis.amendId = amendId;
      ls.forEach((it) => {
        if (it.id == item.riskGrade) {
          this.amendAnalysis.originalRisk = it.value;
        }
      });
    },
    shishiClick(item3s, itemName) {
      let item3 = cloneDeep(item3s);
      if (itemName != "") {
        this.itemName = itemName;
      }
      this.tsAmlist = item3;
      this.amendAnalysis = item3;
      this.beforeDescription = item3.problemDescription;
      this.lust = {
        server: item3.server,
        software: item3.software,
        equipment: item3.equipment,
        assets: item3.assets,
      };
      this.beforeModificationSeverity = item3.beforeModificationSeverity;
      this.api_data.amendId = item3.amendId;
      this.api_data.safetyControlId = item3.safetyControlId;
      this.amendAnalysisVO = item3;
      //
      this.dialogVisible = true;
      this.getDaPuList();
      this.getDataListPou();
    },
    async Tolist() {
      this.dialogVisible = false;
      // relationThreaten
      let ls = "";
      console.log(this.relevanceWeiList, this.DataListPou);
      this.relevanceWeiList.forEach((item) => {
        this.DataListPou.forEach((items) => {
          if (item == items.id) {
            ls += items.threatClassificationName + ",";
          }
        });
        // console.log(this.DataListPou[item - 1]);
        // if (this.DataListPou[item - 1]) {
        //
        // }
      });
      this.amendAnalysis.beforeDescription = this.beforeDescription;
      this.amendAnalysis.relationThreaten = ls.slice(0, ls.length - 1);
      this.amendAnalysis.threatId = this.relevanceWeiList;
      Object.assign(this.amendAnalysis, this.lust);
      let res = await this.$api.API_RiskUpdateAmendAnalysis(this.amendAnalysis);
      if (res.code == 20000) {
        this.getDataList();
        this.Ts_radio = "";
      } else {
        this.$message.error("保存出错");
      }
    },
    async getDaPuList(its) {
      this.amendAnalysisVO.userId = this.info.user_info.userId;
      // this.amendAnalysisVO.safetyControlRelationId = this.safetyControlRelationId;
      let res = await this.$api.API_RiskFindRiskKnowledge(this.amendAnalysisVO);
      console.log(res);
      if (res.code == 20000) {
        this.relevanceList = res.data[0];
        if (res.data[0].length !== 0) {
          this.safetyControlRelationId = res.data[0][0].safetyControlRelationId;
        }
        if (its) {
          this.relevanceWeiList = its;
        } else {
          this.relevanceWeiList = res.data[1];
        }
        console.log(its, res.data[1]);
        this.DataListOp = res.data[2];
        this.fenxianList = res.data[3];
        if (this.fenxianList.length != 0) {
          let toriginalRisk =
            this.amendAnalysis["originalRisk"] ||
            this.amendAnalysis["riskGrade"];
          if (toriginalRisk == undefined) {
            this.$set(this.amendAnalysis, "originalRisk", "高");
          }
        }
      } else {
        this.$message.error("信息加载出错");
      }
    },
    async getDataList() {
      // let its = dataLists;
      let loading = this.$loading({
        lock: true,
        text: "拉取数据中，请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      // this.dataList = its.data.pageData;
      let res = await this.$api.API_RiskFindAmendAnalysis(this.api_data);
      if (res.code == 20000) {
        this.dataList = res.data.pageData;
        this.Toamount = res.data.count + 5;
        this.Ts_radio = "";
        loading.close();
      } else {
        this.$message.error("信息加载出错");
        loading.close();
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
      // this.amendAnalysis.originalRisk = item;
      this.$set(this.amendAnalysis, "originalRisk", item);
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
      let Listda = "";
      let DataList = cloneDeep(this.DataListPou);
      let WeiList = cloneDeep(this.relevanceWeiList);
      console.log(DataList);
      console.log(this.relevanceWeiList);
      DataList.forEach((item) => {
        WeiList.forEach((its) => {
          if (item.id === its) {
            if (item.threatGrade == "高") {
              Listda = "高";
              this.amendAnalysis.riskGrade = 1;
            } else if (item.threatGrade == "中") {
              if (Listda != "高") {
                Listda = "中";
                this.amendAnalysis.riskGrade = 2;
              }
            } else if (item.threatGrade == "低") {
              if (Listda != "高" && Listda != "中") {
                Listda = "低";
                this.amendAnalysis.riskGrade = 3;
              }
            }
          }
        });
      });
      this.amendAnalysis.originalRisk = Listda;
      this.innerVisible = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    deletefenis(item) {
      this.$confirm("确定删除此记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$api.API_delRiskKnowledge({
            riskKnowledgeId: item.id,
          });
          if (res.code === 20000) {
            this.$message.success("删除成功！！");
            this.getDaPuList();
            //查询列表
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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
.leftLs {
  text-align: left;
  padding: 2px;
}
.relevanceWeiList {
  height: 300px;
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
  .el-dialog__body {
    padding: 0 20px;
  }
  .el-button:active {
    color: #fff;
  }
}
.updata_dialog {
  .name_ts {
    display: flex;
    margin-bottom: 5px;
    position: relative;
    color: blue;
  }
  .name_ro {
    position: absolute;
    display: flex;
    color: black;
    div {
      margin: 25px 15px;
    }
  }
  .relevance {
    max-height: 200px;
    .xuna {
      overflow: auto;
      height: 135px;
      h4 {
        color: #08c;
      }
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
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  .relevance_tyu_item {
    margin: 5px 15px;
    // display: flex;
    flex-wrap: wrap;
  }
  .textName {
    font-size: 16px;
    font-weight: bold;
  }
  .text_fininfo {
    font-size: 12px;
  }
}
::v-deep .el-dialog__header {
  padding: 10px 20px 10px 20px;
  background-color: rgba(3, 169, 244, 0.5);
  .el-dialog__title {
    color: #ffffff;
    font-size: 16px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #ffffff;
  }
}
.text_click {
  background: transparent;
  text-decoration: none;
  color: #08c;
}
.text_click:hover {
  cursor: pointer;
  color: black;
}
.tsList {
  max-width: 120px;
  overflow: hidden;
}
.xunaListbu {
  ::v-deep .el-button {
    border-radius: 50%;
    padding: 2px;
    margin-left: 15px;
  }
  .el-icon-s-flag {
    color: red;
    margin-right: 5px;
  }
}
.Listiption {
  font-size: 12px;
  color: red;
}
::v-deep .el-tabs--border-card > .el-tabs__header {
  #tab-1 {
    color: red;
  }
}
</style>


