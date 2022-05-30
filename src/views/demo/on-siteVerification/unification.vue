<!--安全物理环境-->
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
          <upload-dachu :toSonData="api_data"></upload-dachu>
        </div>
        <div v-if="api_data.sceneCheckId == 4">
          <el-select
            v-model="inputactiveNameTabs"
            clearable
            filterable
            @change="NameTabss"
            placeholder="请选择"
          >
            <el-option
              v-for="item in listTs"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
          <!-- <el-input
            v-model="inputactiveNameTabs"
            placeholder="请输入资产名称查询"
          >
            <el-button
              slot="append"
              @click="NameTabss"
              icon="el-icon-search"
            ></el-button>
          </el-input> -->
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
                <el-button type="primary" @click="submitReport(Its, 1)"
                  >保存</el-button
                >
                <el-button type="primary" @click="submitReport(Its, 2)"
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
              <div class="fuary">
                <el-button @click="updrdResult(Its)" size="small" type="primary"
                  >预设的验收标准</el-button
                >
                <el-button @click="fuzclk(Its)" size="small" type="primary"
                  >复制到其他同类资产</el-button
                >
              </div>
              <table id="partnerTable">
                <thead>
                  <tr>
                    <th style="width: 100px">安全控制点</th>
                    <th>控制项</th>
                    <th>检查内容</th>
                    <!-- <th>检查方法</th> -->
                    <th>推荐值</th>
                    <!-- <th>判断标准</th> -->
                    <th>结果记录</th>
                    <th style="width: 140px">符合情况</th>
                    <th>建议</th>
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
                              v-for="(
                                item3, index3
                              ) in item2.controlEntries.split(';')"
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
                          v-if="item2.inspectionContents"
                          trigger="click"
                          placement="top"
                        >
                          <div>
                            <p
                              v-for="(
                                item3, index3
                              ) in item2.inspectionContents.split(';')"
                              :key="index3"
                            >
                              {{ item3 }}
                            </p>
                          </div>
                          <div slot="reference" class="name-wrapper">
                            {{ item2.inspectionContents.substr(0, 35) }}
                          </div>
                        </el-popover>
                        <div v-else>
                          {{ item2.inspectionContents }}
                        </div>
                      </td>
                      <!-- <td>
                        <el-popover
                          title="检查方法"
                          trigger="click"
                          placement="top"
                          v-if="item2.inspectionMethod"
                        >
                          <div>
                            <p
                              v-for="(
                                item3, index3
                              ) in item2.inspectionMethod.split(';')"
                              :key="index3"
                            >
                              {{ item3 }}
                            </p>
                          </div>
                          <div slot="reference" class="name-wrapper">
                            {{ item2.inspectionMethod.substr(0, 35) }}
                          </div>
                        </el-popover>
                        <div v-else>
                          {{ item2.inspectionMethod }}
                        </div>
                      </td> -->
                      <td>
                        <el-popover
                          title="推荐值"
                          v-if="item2.recommendedValue"
                          trigger="click"
                          placement="top"
                        >
                          <div>
                            <div>
                              <p
                                v-for="(
                                  item3, index3
                                ) in item2.recommendedValue.split(';')"
                                :key="index3"
                              >
                                {{ item3 }}
                              </p>
                            </div>
                            <div>
                              <p>判断标准</p>
                              <p
                                v-for="(
                                  item3, index3
                                ) in item2.judgmentCriteria.split(';')"
                                :key="index3"
                              >
                                {{ item3 }}
                              </p>
                            </div>
                          </div>
                          <div slot="reference" class="name-wrapper">
                            <div>
                              {{ item2.recommendedValue.substr(0, 35) }}
                            </div>
                            <div slot="reference" class="name-wrapper">
                              {{ item2.judgmentCriteria.substr(0, 35) }}
                            </div>
                          </div>
                        </el-popover>
                        <div v-else>
                          <div>
                            {{ item2.recommendedValue }}
                          </div>
                        </div>
                      </td>
                      <!-- <td>
                        <el-popover
                          title="判断标准"
                          trigger="click"
                          placement="top"
                          v-if="item2.judgmentCriteria"
                        >
                          <div>
                            <p
                              v-for="(
                                item3, index3
                              ) in item2.judgmentCriteria.split(';')"
                              :key="index3"
                            >
                              {{ item3 }}
                            </p>
                          </div>
                          <div slot="reference" class="name-wrapper">
                            {{ item2.judgmentCriteria.substr(0, 35) }}
                          </div>
                        </el-popover>
                        <div v-else>
                          {{ item2.judgmentCriteria }}
                        </div>
                      </td> -->
                      <td table="结果记录" style="width: 300px">
                        <el-popover trigger="click" placement="top">
                          <div>
                            <el-input
                              type="textarea"
                              :autosize="{ minRows: 8, maxRows: 12 }"
                              placeholder="请输入内容"
                              @input="changerList($event)"
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
                          @change="touxuanList(Its.resultBookId, item2)"
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
                              @input="changerList($event)"
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
                            <span style="opacity: 0">点击填写建议</span>
                          </div>
                        </el-popover>
                      </td>
                      <td>
                        {{ qvList(item2.weight) }}
                      </td>
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
    <el-dialog
      title="复制到其他同类资产"
      :visible.sync="fuialosible"
      width="600px"
    >
      <div>
        <div class="list_fuz">
          <el-checkbox-group v-model="fuckList">
            <el-col :span="24" v-for="item in fuzactiTabs" :key="item.id">
              <el-checkbox :label="item.id">{{ item.name }}</el-checkbox>
            </el-col>
          </el-checkbox-group>
        </div>

        <div>
          <el-input placeholder="请输入内容" v-model="sourceAsset.assetsName">
            <template slot="prepend">需要替换的关键字：</template>
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="fuialosible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="fuzLtop"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div>
      <el-dialog
        title="请选择结果记录"
        :visible.sync="dialogbleList"
        width="60%"
        :close-on-click-modal="false"
        :before-close="xuanzleClose"
      >
        <div class="regroupovalue">
          <el-radio-group v-model="resultBoovalue">
            <el-radio
              v-for="item in resultBookList"
              :key="item.id"
              :label="item.id"
              >{{ item.recordResults }}</el-radio
            >
          </el-radio-group>
          <!-- <el-select v-model="resultBoovalue" placeholder="请选择">
            <el-option
              v-for="(item, index) in resultBookList"
              :key="index"
              :label="item.recordResults"
              :value="item.id"
            >
            </el-option>
          </el-select> -->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="qxdialogist">取 消</el-button>
          <el-button type="primary" @click="dlogblefrom">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapState } from "vuex";
export default {
  props: {
    queryType: Object,
    default: function () {
      return {};
    },
  },
  data() {
    return {
      resultBookList: [],
      resultBoovalue: "",
      ultBooItem: {},
      dialogbleList: false,
      inputactiveNameTabs: "",
      activeNameTabs: "",
      dialogVisible: false,
      fuialosible: false,
      loading: true,
      fuckList: [],
      // activeName: "",
      fuzactiTabs: [],
      sourceAsset: {
        assetsId: "",
        assetsName: "",
        assetsNum: "",
        projectId: "",
      },
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
      api_data: this.queryType,
      listTs: [],
    };
  },
  computed: {
    ...mapState("d2admin", {
      xmu_info: (state) => state.xmu.xmu_info,
    }),
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
    async submitReport(item, it) {
      let fractionModelList = [];
      fractionModelList.push(item);
      let res = await this.$api.SYSFieldSurveyUpdateList(fractionModelList);
      if (res.code === 20000) {
        if (it == 2) {
          this.dialogVisible = false;
          this.getDataList();
        }
        this.$message.success("保存成功");
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    xuanzleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.Totisadd(this.ultBooItem, true);
          done();
        })
        .catch((_) => {});
    },
    sendSonData(data) {
      if (data === true) {
        this.getDataList();
      }
    },
    qxdialogist() {
      this.Totisadd(this.ultBooItem, true);
    },
    async Totisadd(item, bol) {
      let fractionModelList = [];
      fractionModelList.push(item);
      let res = await this.$api.SYS_FieldSurveYUpdate(fractionModelList);
      if (res.code === 20000) {
        this.$message.success("成功");
        if (bol) {
          this.dialogbleList = false;
          this.resultBoovalue = "";
          // this.getDataList();
        }
        this.$api.CalculateFractionTotalFraction();
        //
      }
    },
    async touxuanList(resultBookId, item) {
      let data = {
        resultBookId,
        safetyControlId: item.safetyControlId,
        accordSituation: item.accordSituation,
      };
      let res = await this.$api.findRecordResultson(data);
      if (res.code == 20000) {
        if (res.data) {
          if (res.data.length == 0) {
            this.Totisadd(item);
          } else {
            this.dialogbleList = true;
            this.resultBookList = cloneDeep(res.data);
            this.ultBooItem = item;
          }
        } else {
          this.Totisadd(item);
          // this.$message.error("无符合项");
        }
      }
    },
    changerList(e) {
      this.$forceUpdate();
    },
    fuzclk(its) {
      this.fuialosible = true;
      this.sourceAsset = {
        assetsId: its.id,
        assetsNum: its.assetsNum,
        assetsName: its.name,
        projectId: this.xmu_info.projectId,
      };
      this.fuzactiTabs = this.dataList.filter(
        (item) => item.assetsNum == its.assetsNum && item.id != its.id
      );
    },
    async updrdResult(its) {
      let sourceAsset = {
        assetsId: its.id,
        assetsNum: its.assetsNum,
        resultBookId: its.resultBookId,
        projectId: this.xmu_info.projectId,
      };
      this.$confirm(
        "确定要把预设的验收标准的结果记录和建议覆盖到此表格？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
          customClass: "messageBox",
        }
      )
        .then(async () => {
          let res = await this.$api.updateRordy(sourceAsset);
          if (res.code === 20000) {
            this.$message.success("成功！！");
            this.getDataList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    async fuzLtop() {
      // if (!this.sourceAsset.assetsName)
      //   return this.$message.error("需要替换的关键字不能为空");
      if (this.fuckList.length == 0)
        return this.$message.error("请选择复制到的资产");
      let targetAssetList = [];
      this.dataList.forEach((item) => {
        this.fuckList.forEach((id) => {
          if (id == item.id) {
            let sourceAsset = {
              assetsId: item.id,
              assetsNum: item.assetsNum,
              assetsName: item.name,
              projectId: this.xmu_info.projectId,
            };
            targetAssetList.push(sourceAsset);
          }
        });
      });
      let res = await this.$api.copyResultRecordy({
        targetAssetList,
        sourceAsset: this.sourceAsset,
      });
      if (res.code === 20000) {
        this.$message.success("成功");
        this.fuialosible = false;
        this.fuckList = [];
        this.getDataList();
      }
    },
    async dlogblefrom() {
      if (!this.resultBoovalue) return this.$message.error("请选择！！！");
      let mk = this.resultBookList.filter(
        (item) => item.id == this.resultBoovalue
      );
      this.ultBooItem.recordResults = cloneDeep(mk[0].recordResults);
      this.ultBooItem.remark = cloneDeep(mk[0].remark);
      this.Totisadd(this.ultBooItem, true);
    },
    async getDataList() {
      let loading = this.$loading({
        lock: true,
        text: "拉取数据中，请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.loading = true;
      const res = await this.$api.SYS_FieldSurveyFindAssetsList(this.api_data);
      if (res.code === 20000) {
        loading.close();
        if (res.data.assetsList.length == 0) {
          this.loading = false;
          return;
        }
        var listTs = cloneDeep(res.data.assetsList);
        this.listTs = listTs;
        this.ToMitList = cloneDeep(res.data.protectiveList);
        if (this.activeNameTabs == 0) {
          this.activeNameTabs = listTs[0].name + listTs[0].id;
        }
        this.loading = false;
        this.dataList = listTs;
      }
      loading.close();
      this.ToMitList.forEach((element) => {
        if (element.content == null) {
          this.submitReporAdd(element);
        }
      });

      //  const res= await this.$http.get('/api/safetyControl/findSpotByBookId',{params:this.api_data});
      //  this.dataList=res.data.data;
    },
    // 跳转
    NameTabss() {
      let msuer = this.listTs.filter(
        (item) => item.name == this.inputactiveNameTabs
      );
      if (msuer.length !== 0) {
        this.activeNameTabs = msuer[0].name + msuer[0].id;
      } else {
        this.activeNameTabs = this.listTs[0].name + this.listTs[0].id;
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
.regroupovalue {
  max-height: 450px;
  overflow-y: auto;
  .el-radio-group {
    .el-radio {
      margin: 10px 0;
    }
  }
  ::v-deep .el-radio__label {
    width: 100% !important;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 18px;
    // word-wrap: break-word !important;    无效
  }
}
.fuary {
  margin: 10px 0;
  text-align: right;
}
.list_fuz {
  max-height: 250px;
  overflow: auto;
  .el-col {
    height: 30px;
    line-height: 15px;
  }
}
</style>
<style >
.messageBox {
  width: 460px;
}
</style>
