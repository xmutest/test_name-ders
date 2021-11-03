
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">漏洞扫描结果统计</div>
            <div class="ScTlist">
              <el-tabs
                v-model="activeName"
                @tab-click="handleClick"
                type="border-card"
              >
                <el-tab-pane label="主机扫描" name="first">
                  <div class="scanningTool" v-if="activeName == 'first'">
                    <div class="scanningToolListo">
                      <div>
                        <span class="scanningToolName">(1)主机扫描工具</span>
                        <el-select
                          size="mini"
                          v-model="toolName"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in scanningTool"
                            :key="item.id"
                            :label="item.value"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                      <div>
                        <span class="scanningToolName">(2)主机接入点：</span>
                        <el-select
                          size="mini"
                          v-model="pointtoolName"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in pointtoolNameList"
                            :key="item.id"
                            :label="item.value"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                      <p class="tisks">
                        * 请上传HTML格式的漏洞扫描报告
                        （绿盟：index.html，天镜：files/Report_main.html，Nessus：支持英文/谷歌翻译的中文）
                      </p>
                    </div>
                    <div class="scanningupload">
                      <DaoruLou
                        :sonValue="{ type: 1, toolName, api: pointtoolName }"
                        @toFatherData="toFatherData"
                      ></DaoruLou>
                    </div>
                    <div>
                      <el-table
                        :header-cell-style="{
                          'background-color': 'rgba(238, 238, 238,1.0)',
                        }"
                        :data="FindHostList"
                        style="width: 100%"
                      >
                        <el-table-column label="设备名称">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                              scope.row.systemName
                            }}</span>
                          </template>
                        </el-table-column>

                        <el-table-column label="IP地址" width="180">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                              scope.row.hostOrUrl
                            }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="OS" width="150">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                              scope.row.operatingSysType
                            }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="高" width="80">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                              scope.row.hignNum
                            }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="中" width="80">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                              scope.row.middleNum
                            }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="低" width="80">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                              scope.row.lowNum
                            }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" width="80">
                          <template slot-scope="scope">
                            <el-button
                              size="mini"
                              @click="handleEditdt(scope.row)"
                              >编辑</el-button
                            >
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="应用系统扫描" name="second">
                  <div class="scanningTool" v-if="activeName == 'second'">
                    <div class="scanningToolListo">
                      <div>
                        <span class="scanningToolName"
                          >(1)应用系统扫描工具</span
                        >
                        <el-select
                          size="mini"
                          v-model="ScantoolName"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in systemScanTool"
                            :key="item.id"
                            :label="item.value"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                      <div>
                        <span class="scanningToolName"
                          >(2)应用系统接入点：</span
                        >
                        <el-select
                          size="mini"
                          v-model="pointScantoolName"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in pointtoolNameList"
                            :key="item.id"
                            :label="item.value"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                      <p class="tisks">
                        * 请上传HTML格式的漏洞扫描报告
                        （绿盟：index.html，天镜：files/Report_main.html，Nessus：支持英文/谷歌翻译的中文）
                      </p>
                      <p class="tisks">
                        * AppScan： 请上传docx报告，（<span class="arktitle"
                          >从AppScan导出时选择
                          “发现的问题（按问题类型）[样本].docx”</span
                        >）
                      </p>
                    </div>
                    <div class="scanningupload">
                      <DaoruLou
                        :sonValue="{
                          type: 2,
                          toolName: ScantoolName,
                          api: pointScantoolName,
                        }"
                        @toFatherData="toFatherData"
                      ></DaoruLou>
                    </div>
                    <div>
                      <el-table
                        :header-cell-style="{
                          'background-color': 'rgba(238, 238, 238,1.0)',
                        }"
                        :data="HtmlFindAppList"
                        style="width: 100%"
                      >
                        <el-table-column label="系统名称">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                              scope.row.systemName
                            }}</span>
                          </template>
                        </el-table-column>

                        <el-table-column label="URL" width="180">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                              scope.row.hostOrUrl
                            }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="类型" width="150">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                              scope.row.operatingSysType
                            }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="高" width="80">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                              scope.row.hignNum
                            }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="中" width="80">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                              scope.row.middleNum
                            }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="低" width="80">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">{{
                              scope.row.lowNum
                            }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" width="80">
                          <template slot-scope="scope">
                            <el-button
                              size="mini"
                              @click="handleEditdt(scope.row)"
                              >编辑</el-button
                            >
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div></el-tab-pane
                >
              </el-tabs>
            </div>
          </div>
          <!-- 数据表格 -->
          <div class="mude_text_item">
            <div class="descTItle">漏洞列表</div>
            <div class="addList">
              <el-button type="danger" @click="handleDelete" size="medium"
                >删除所有</el-button
              >
            </div>
            <div>
              <el-table
                :header-cell-style="{
                  'background-color': 'rgba(238, 238, 238,1.0)',
                }"
                :data="dataList"
                style="width: 100%"
              >
                <el-table-column label="漏洞名称">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      scope.row.vulnerabilityName
                    }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="主机IP/URL" width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      scope.row.hostOrUrl
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="等级" width="100">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      scope.row.riskLevel
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="接入点" width="80">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.point }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="操作" width="180">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="handleEdit(scope.row)"
                      >修改</el-button
                    >
                    <el-button
                      type="danger"
                      size="mini"
                      @click="delelcdluo(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div
            class="page_name"
            style="padding: 0 20px 20px 20px; margin: 15px 0"
          >
            <div class="search_ls">
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageList.pageNum"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="pageList.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                >
                </el-pagination>
              </div>
            </div>
          </div>
          <!-- <div class="tijiaobaoc">
            <el-button type="primary" @click="submitReport">保存</el-button>
          </div> -->
        </el-card>
      </div>
    </div>
    <!-- //弹框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      title="详细"
    >
      <el-row :gutter="10">
        <el-form
          ref="vulnerability"
          :model="vulnerability"
          :rules="rules"
          size="medium"
          label-width="100px"
          label-position="left"
        >
          <el-col :span="24">
            <el-form-item label-width="120px" label="主机IP" prop="hostOrUrl">
              <el-input
                v-model="vulnerability.hostOrUrl"
                placeholder="请输入主机IP"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label-width="120px"
              label="漏洞名称"
              prop="vulnerabilityName"
            >
              <el-input
                v-model="vulnerability.vulnerabilityName"
                placeholder="请输入漏洞名称"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label-width="120px"
              label="漏洞描述"
              prop="vulnerabilityDescription"
            >
              <el-input
                v-model="vulnerability.vulnerabilityDescription"
                type="textarea"
                placeholder="请输入漏洞描述"
                :autosize="{ minRows: 4, maxRows: 4 }"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label-width="120px"
              label="漏洞危险等级"
              prop="riskLevel"
            >
              <el-select
                v-model="vulnerability.riskLevel"
                placeholder="请选择漏洞危险等级"
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in riskLevelOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label-width="100px" label="接入点" prop="point">
              <el-select
                v-model="vulnerability.point"
                placeholder="请选择漏洞危险等级"
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in pointtoolNameList"
                  :key="index"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label-width="120px"
              label="漏洞修复建议"
              prop="repairSuggestions"
            >
              <el-input
                v-model="vulnerability.repairSuggestions"
                type="textarea"
                placeholder="请输入漏洞修复建议"
                :autosize="{ minRows: 4, maxRows: 4 }"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label-width="120px"
              label="漏洞数量"
              prop="vulnerabilityNum"
            >
              <el-input-number
                v-model="vulnerability.vulnerabilityNum"
                placeholder="漏洞数量"
                :step="1"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="漏洞类型"
              label-width="120px"
              prop="vulnerabilityType"
            >
              <el-select
                v-model="vulnerability.vulnerabilityType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in vulnerabilityTypeList"
                  :key="item.value"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-show="vulnerability.vulnerabilityType == 2">
            <el-form-item
              label="应用系统名称"
              label-width="120px"
              prop="vulnerabilityType"
            >
              <el-input
                v-model="vulnerability.systemName"
                placeholder="请输入应用系统名称"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handelConfirm">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="Confirmmsible"
      :close-on-click-modal="false"
      title="修改"
    >
      <el-form
        ref="EditdtList"
        :model="EditdtList"
        :rules="rules"
        size="medium"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="设备名称" prop="systemName">
          <el-input
            v-model="EditdtList.systemName"
            placeholder="请输入设备名称"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="hostOrUrl">
          <el-input
            v-model="EditdtList.hostOrUrl"
            placeholder="请输入IP地址"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="OS" prop="operatingSysType">
          <el-input
            v-model="EditdtList.operatingSysType"
            placeholder="请输入OS"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="Confirmmsible = false">取消</el-button>
        <el-button type="primary" @click="Confirmms">确定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import { cloneDeep } from "lodash";
import DaoruLou from "./daorudou/daoruloudou.vue";
export default {
  data() {
    return {
      activeName: "first",
      toListts: "添加",
      dataList: [],
      // 主机扫描工具
      scanningTool: [
        { id: 1, value: "绿盟" },
        { id: 2, value: "天镜" },
        { id: 3, value: "Nessus" },
      ],
      pointtoolNameList: [
        { id: 1, value: "JA" },
        { id: 2, value: "JB" },
        { id: 3, value: "JC" },
        { id: 4, value: "JD" },
        { id: 5, value: "JE" },
        { id: 6, value: "JF" },
      ],
      EditdtList: {
        systemName: undefined,
        hostOrUrl: undefined,
        operatingSysType: undefined,
      },
      // 接入点
      pointtoolName: "JA",
      toolName: "绿盟",
      //   应用系统扫描工具
      systemScanTool: [
        { id: 1, value: "绿盟" },
        { id: 2, value: "天镜" },
        { id: 3, value: "Nessus" },
        { id: 4, value: "AppScan" },
      ],
      vulnerabilityTypeList: [
        { id: 1, value: "主机" },
        { id: 2, value: "应用系统" },
      ],
      // 接入点
      pointScantoolName: "JA",
      ScantoolName: "绿盟",
      dialogVisible: false,
      vulnerability: {
        hostOrUrl: undefined,
        vulnerabilityName: undefined,
        vulnerabilityDescription: undefined,
        riskLevel: undefined,
        repairSuggestions: undefined,
        vulnerabilityNum: 0,
        vulnerabilityType: undefined,
        point: "JA",
        systemName: "",
      },
      bilityType: 1,
      rules: {
        vulnerabilityName: [
          {
            required: true,
            message: "请输入漏洞名称",
            trigger: "blur",
          },
        ],
        vulnerabilityDescription: [
          {
            required: true,
            message: "请输入漏洞描述",
            trigger: "blur",
          },
        ],
        riskLevel: [
          {
            required: true,
            message: "请选择漏洞危险等级",
            trigger: "change",
          },
        ],
        repairSuggestions: [
          {
            required: true,
            message: "请输入漏洞修复建议",
            trigger: "blur",
          },
        ],
        vulnerabilityNum: [
          {
            required: true,
            message: "漏洞数量",
            trigger: "blur",
          },
        ],
        vulnerabilityType: [
          {
            required: true,
            message: "请输入漏洞类型",
            trigger: "blur",
          },
        ],
      },
      riskLevelOptions: [
        {
          label: "高",
          value: "高",
        },
        {
          label: "中",
          value: "中",
        },
        {
          label: "低",
          value: "低",
        },
      ],
      pageList: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      usr_updata: 0,
      // 主机统计
      FindHostList: [],
      HtmlFindAppList: [],
      Confirmmsible: false,
    };
  },
  created() {
    this.getListts();
  },
  components: {
    DaoruLou,
  },
  methods: {
    // 修改统计
    Confirmms() {
      this.$refs["EditdtList"].validate(async (valid) => {
        if (!valid) return;
        let res = await this.$api.SYS_updateDetails_InputDoc(this.EditdtList);
        if (res.code === 20000) {
          this.Confirmmsible = false;
          this.HtmlFindHost();
          this.HtmlFindApp();
          this.$message({
            type: "success",
            message: "修改成功！！",
            duration: 1000,
          });
        } else {
          this.$message.error("修改失败：" + res.message);
        }
      });
    },
    // 修改统计
    handleEditdt(item) {
      this.Confirmmsible = true;
      this.EditdtList = cloneDeep(item);
    },
    // 获取主机统计
    async HtmlFindHost() {
      let res = await this.$api.SYSparsingHtmlFindHost();
      if (res.code === 20000) {
        this.FindHostList = res.data[0];
      }
    },
    // 获取应用扫描统计
    async HtmlFindApp() {
      let res = await this.$api.SYSParsingHtmlFindApp();
      if (res.code === 20000) {
        this.HtmlFindAppList = res.data[0];
      }
    },
    toFatherData(ifsTo) {
      if (ifsTo === true) {
        this.getListts();
      }
    },
    handleClick(tab) {
      if (tab.name == "first") {
        this.bilityType = 1;
      } else if (tab.name == "second") {
        this.bilityType = 2;
      }
      this.getListts();
    },
    async getListts() {
      this.pageList.vulnerabilityType = this.bilityType;
      let res = await this.$api.SYS_findDetails_InputDoc(this.pageList);
      if (res.code === 20000) {
        this.dataList = res.data.list;
        this.total = res.data.total;
        this.HtmlFindHost();
        this.HtmlFindApp();
      }
    },
    // 删除
    async delelcdluo(row) {
      this.$confirm("确定删除此记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$api.ParsingHtmlDelSingleVulnerbility({
            infoId: row.infoId,
          });
          if (res.code === 20000) {
            this.$message.success("删除成功！！");
            this.getListts();
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
    handelConfirm() {
      this.$refs["vulnerability"].validate(async (valid) => {
        if (!valid) return;
        if (this.usr_updata === 0) {
          // 添加
          let res = await this.$api.SYS_saveDetails_InputDoc(
            this.vulnerability
          );
          if (res.code === 20000) {
            this.dialogVisible = false;
            this.getListts();
            this.$message.success("添加成功！！");
          } else {
            this.$message.error("添加失败：" + res.message);
          }
        } else if (this.usr_updata === 1) {
          // 修改
          let res = await this.$api.SYS_updateDetails_InputDoc(
            this.vulnerability
          );
          if (res.code === 20000) {
            this.dialogVisible = false;
            this.getListts();
            this.$message({
              type: "success",
              message: "修改成功！！",
              duration: 1000,
            });
          } else {
            this.$message.error("修改失败：" + res.message);
          }
        } else {
          this.$message.error("出错，请联系管理员");
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      this.pageList.pageSize = val;
      this.getListts();
    },
    handleCurrentChange(val) {
      this.pageList.pageNum = val;
      this.getListts();
    },
    // 修改
    handleEdit(row) {
      let tsmlist = JSON.stringify(row);
      this.usr_updata = 1;
      this.toListts = "修改";
      this.dialogVisible = true;
      this.vulnerability = JSON.parse(tsmlist);
    },
    // 添加
    handleAddList() {
      this.usr_updata = 0;
      this.vulnerability = {
        hostOrUrl: undefined,
        vulnerabilityName: undefined,
        vulnerabilityDescription: undefined,
        riskLevel: undefined,
        repairSuggestions: undefined,
        vulnerabilityNum: 0,
        vulnerabilityType: undefined,
        point: "JA",
      };
      this.dialogVisible = true;
      this.toListts = "添加";
    },
    // 删除
    handleDelete(row) {
      this.$confirm("确定删除此记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          row.vulnerabilityType = this.bilityType;
          let res = await this.$api.SYS_delVulnerbility_InputDoc(row);
          if (res.code === 20000) {
            this.$message.success("删除成功！！");
            this.getListts();
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
.mude_is {
  margin: 20px 0;
  .mude_is_left {
    margin: 20px 0;
  }
  .to_tim {
    margin-top: 5px;
    .el-tag {
      margin-right: 5px;
    }
  }
  .descTItle {
    @extend %unable-border-left;
  }
}
.el-card__header {
  border-bottom: 0px solid #ebeef5;
}
.ScTlist {
  margin: 0 20px 10px 20px;

  .scanningTool {
    .scanningToolName {
      font-size: 14px;
      margin: 10px 10px 10px 0;
      font-family: "Courier New", Courier, monospace;
    }
    .scanningupload {
      margin: 20px 0;
    }
  }
}
.addList {
  margin-bottom: 15px;
  text-align: right;
}
.scanningToolListo {
  div {
    margin: 5px 0;
  }
}
.tisks {
  color: red;
  font-size: 14px;
  font-family: cursive;
  .arktitle {
  
    font-weight: bold;

    background: linear-gradient(to right, red, blue);
    -webkit-background-clip: text;
    color: transparent;
    animation: blink 2s linear infinite;
    -webkit-animation: blink 2s linear infinite;
    -moz-animation: blink 2s linear infinite;
    -ms-animation: blink 2s linear infinite;
    -o-animation: blink 2s linear infinite;
    @keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 0.8;
      }
    }
    @-webkit-keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 0.8;
      }
    }
    @-moz-keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 0.8;
      }
    }
    @-ms-keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 0.8;
      }
    }
    @-o-keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 0.8;
      }
    }
  }
}
</style>
