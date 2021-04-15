<!--层面间安全测评-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">项目基本信息</div>
            <div class="jineginfo">
              <div>
                <span>项目名称：</span
                ><span>{{ xmu_info.data.projectName }}</span>
              </div>
              <div>
                <span>系统名称：</span
                ><span>{{ xmu_info.data.systemName }}</span>
              </div>
              <div>
                <span>被测单位：</span
                ><span>{{ xmu_info.data.evaluatedUnit }}</span>
              </div>
              <div>
                <span>备案证号码：</span
                ><span>{{ xmu_info.data.recordSn }}</span>
              </div>
            </div>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">审核列表</div>
            <div class="jineginfo">
              <el-table :data="tabList" border style="width: 100%">
                <el-table-column label="类型" width="100">
                  <template slot-scope="scope">
                    {{ scope.row.fileType == 1 ? "报告" : "方案" }}
                  </template>
                </el-table-column>
                <el-table-column label="报告文件名">
                  <template slot-scope="scope">
                    <span
                      class="xiazaiList"
                      v-for="item in scope.row.reportReviewModels"
                      :key="item.id"
                      @click="submitReport(item, 1)"
                      >{{ item.fileName }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column label="备案证">
                  <template slot-scope="scope">
                    <span
                      class="xiazaiList"
                      @click="submitReport(scope.row, 2)"
                      >{{ scope.row.recordName }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column label="备注">
                  <template slot-scope="scope">
                    {{ scope.row.remarks }}
                  </template>
                </el-table-column>
                <el-table-column label="上传人姓名" width="100">
                  <template slot-scope="scope">
                    {{ scope.row.userName }}
                  </template>
                </el-table-column>
                <el-table-column label="上传时间" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.uploadTime }}
                  </template>
                </el-table-column>
                <!-- <el-table-column label="操作"> </el-table-column> -->
              </el-table>
            </div>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">
              <div>方案评审记录列表</div>
              <div class="boot_an">
                <el-button
                  type="primary"
                  v-if="info.userTypeId == 10"
                  @click="addListks(2)"
                  size="mini"
                  >新建方案评审记录</el-button
                >
              </div>
            </div>
            <el-table :data="fanganfotabList" border style="width: 100%">
              <el-table-column label="评审过程记录">
                <template slot-scope="scope">
                  <pre>{{ scope.row.reviewRecord }}</pre>
                  <!-- <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    readonly
                    v-model="scope.row.reviewRecord"
                  >
                  </el-input> -->
                </template>
              </el-table-column>
              <el-table-column label="评审意见">
                <template slot-scope="scope">
                  <pre>{{ scope.row.reviewOpinion }}</pre>
                  <!-- <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    readonly
                    v-model="scope.row.reviewOpinion"
                  >
                  </el-input> -->
                </template>
              </el-table-column>
              <el-table-column label="附件">
                <template slot-scope="scope">
                  <p
                    v-for="item in scope.row.reportReviewModels"
                    @click="submitReport(item, 1)"
                    class="xiazaiList"
                    :key="item.id"
                  >
                    {{ item.fileName }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="审核人" width="100">
                <template slot-scope="scope">
                  {{ scope.row.userName }}
                </template>
              </el-table-column>
              <el-table-column label="时间" width="150">
                <template slot-scope="scope">
                  {{ scope.row.time }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="infodeiList(scope.row, 2)"
                    type="primary"
                    >详细</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">
              <div>报告评审记录列表</div>
              <div class="boot_an">
                <el-button
                  type="primary"
                  v-if="info.userTypeId == 10"
                  @click="addListks(1)"
                  size="mini"
                  >新建报告评审记录</el-button
                >
              </div>
            </div>
            <el-table :data="pcLinfotabList" border style="width: 100%">
              <el-table-column label="评审过程记录">
                <template slot-scope="scope">
                  <pre>{{ scope.row.reviewRecord }}</pre>
                  <!-- <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    readonly
                    v-model="scope.row.reviewRecord"
                  >
                  </el-input> -->
                </template>
              </el-table-column>
              <el-table-column label="评审意见">
                <template slot-scope="scope">
                  <pre>{{ scope.row.reviewOpinion }}</pre>
                  <!-- <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    readonly
                    v-model="scope.row.reviewOpinion"
                  >
                  </el-input> -->
                </template>
              </el-table-column>
              <el-table-column label="附件">
                <template slot-scope="scope">
                  <p
                    v-for="item in scope.row.reportReviewModels"
                    @click="submitReport(item, 1)"
                    class="xiazaiList"
                    :key="item.id"
                  >
                    {{ item.fileName }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="审核人" width="100">
                <template slot-scope="scope">
                  {{ scope.row.userName }}
                </template>
              </el-table-column>
              <el-table-column label="时间" width="150">
                <template slot-scope="scope">
                  {{ scope.row.reviewFirstTime }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="infodeiList(scope.row, 1)"
                    type="primary"
                    >详细</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class="jineginfo"></div>
          </div>
        </el-card>
      </div>
      <!-- 详细 -->
      <el-dialog
        title="评审记录详细"
        :visible.sync="kslistdatafyinfo"
        :close-on-click-modal="false"
      >
        <div class="jineginfo">
          <div>
            <span>项目名称：</span><span>{{ xmu_info.data.projectName }}</span>
          </div>
          <div>
            <span>系统名称：</span><span>{{ xmu_info.data.systemName }}</span>
          </div>
          <div>
            <span>被测单位：</span
            ><span>{{ xmu_info.data.evaluatedUnit }}</span>
          </div>
          <div>
            <span>备案证号码：</span><span>{{ xmu_info.data.recordSn }}</span>
          </div>
          <div v-if="pingcheji == 1">
            <span>评审时间：</span
            ><span>{{ infopaymentOrderModel.reviewFirstTime }}</span>
          </div>
          <div v-if="pingcheji == 2">
            <span>评审时间：</span><span>{{ infopaymentOrderModel.time }}</span>
          </div>
          <div>
            <span>评审参加人员：</span
            ><span>{{ infopaymentOrderModel.assessor }}</span>
          </div>
          <div>
            <span>被测单位部门：</span
            ><span>{{ infopaymentOrderModel.department }}</span>
          </div>
          <div>
            <span>被测单位联系人：</span
            ><span>{{ infopaymentOrderModel.contact }}</span>
          </div>
          <!-- 方案 -->
          <div v-if="pingcheji == 1">
            <div>
              <span
                >测评报告对被测系统和抽选对象的描述是否与测评方案一致？：</span
              ><span>{{
                infopaymentOrderModel.reviewA == "1" ? "是" : "否"
              }}</span>
            </div>
            <div>
              <span>测评记录是否清晰、详实？：</span
              ><span>{{
                infopaymentOrderModel.reviewB == "1" ? "是" : "否"
              }}</span>
            </div>
            <div>
              <span>测评项的符合情况判断是否准确？：</span
              ><span>{{
                infopaymentOrderModel.reviewC == "1" ? "是" : "否"
              }}</span>
            </div>
            <div>
              <span>测评报告中具有工具扫描和渗透测试的结果？（★）：</span
              ><span>{{
                infopaymentOrderModel.reviewD == "1" ? "是" : "否"
              }}</span>
            </div>
            <div>
              <span>安全问题的描述与评判是否准确？：</span
              ><span>{{
                infopaymentOrderModel.reviewE == "1" ? "是" : "否"
              }}</span>
            </div>
            <div>
              <span>整改建议是否完整、准确、合理？：</span
              ><span>{{
                infopaymentOrderModel.reviewF == "1" ? "是" : "否"
              }}</span>
            </div>
            <div>
              <span>测评结论是否具准确？：</span
              ><span>{{
                infopaymentOrderModel.reviewG == "1" ? "是" : "否"
              }}</span>
            </div>
          </div>
          <!-- 方案 -->
          <div v-if="pingcheji == 2">
            <div>
              <span>测评方案对被测系统和调查对象的描述是否与调查表一致？：</span
              ><span>{{
                infopaymentOrderModel.planA == "1" ? "是" : "否"
              }}</span>
            </div>
            <div>
              <span>测评方案是否具有项目基本信息？：</span
              ><span>{{
                infopaymentOrderModel.planB == "1" ? "是" : "否"
              }}</span>
            </div>
            <div>
              <span>测评方案是否具有抽选的被测对象的信息？：</span
              ><span>{{
                infopaymentOrderModel.planC == "1" ? "是" : "否"
              }}</span>
            </div>
            <div>
              <span>测评方案是否具有工具扫描和渗透测试内容？（★）：</span
              ><span>{{
                infopaymentOrderModel.planD == "1" ? "是" : "否"
              }}</span>
            </div>
            <div>
              <span>测评方案关键内容是否准确？：</span
              ><span>{{
                infopaymentOrderModel.planE == "1" ? "是" : "否"
              }}</span>
            </div>
          </div>
          <div>
            <span>评审结论：</span
            ><span v-if="infopaymentOrderModel.reviewResult == '1'">合格</span>
            <span v-if="infopaymentOrderModel.reviewResult == '2'"
              >基本合格</span
            >
            <span v-if="infopaymentOrderModel.reviewResult == '3'">不合格</span>
          </div>
        </div>
        <div class="tijiaobaoc">
          <el-button type="info" @click="kslistdatafyinfo = false"
            >取消</el-button
          >
        </div>
      </el-dialog>
      <!-- 新建 -->
      <el-dialog
        title="新建评审记录"
        :visible.sync="kslistdatafy"
        :close-on-click-modal="false"
      >
        <el-row :gutter="10">
          <el-form
            ref="paymentOrderModel"
            :model="paymentOrderModel"
            :rules="rules"
            size="medium"
            label-width="120px"
            label-position="left"
          >
            <el-col :span="12">
              <el-form-item
                v-if="pingcheji == 1"
                label="评审时间"
                prop="reviewFirstTime"
              >
                <el-date-picker
                  v-model="paymentOrderModel.reviewFirstTime"
                  format="yyyy-MM-dd"
                  value-format="timestamp"
                  :style="{ width: '100%' }"
                  placeholder="请选择评审时间"
                  clearable
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item v-else label="评审时间" prop="time">
                <el-date-picker
                  v-model="paymentOrderModel.time"
                  format="yyyy-MM-dd"
                  value-format="timestamp"
                  :style="{ width: '100%' }"
                  placeholder="请选择评审时间"
                  clearable
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="评审参加人员" prop="assessor">
                <el-select
                  v-model="paymentOrderModel.assessor"
                  placeholder="请选择评审参加人员"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in assessorOptions"
                    :key="index"
                    :label="item"
                    :value="item"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="被测单位部门" prop="department">
                <el-input
                  v-model="paymentOrderModel.department"
                  placeholder="请输入被测单位部门"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="被测单位联系人" prop="contact">
                <el-input
                  v-model="paymentOrderModel.contact"
                  placeholder="请输入被测单位联系人"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- 报告 -->
            <div v-if="pingcheji == 1">
              <el-col :span="24">
                <el-form-item
                  label-width="430px"
                  label="测评报告对被测系统和抽选对象的描述是否与测评方案一致？"
                  prop="reviewA"
                >
                  <el-radio-group
                    v-model="paymentOrderModel.reviewA"
                    size="medium"
                  >
                    <el-radio
                      v-for="(item, index) in reviewAOptions"
                      :key="index"
                      :label="item.value"
                      :disabled="item.disabled"
                      >{{ item.label }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label-width="430px"
                  label="测评记录是否清晰、详实？"
                  prop="reviewB"
                >
                  <el-radio-group
                    v-model="paymentOrderModel.reviewB"
                    size="medium"
                  >
                    <el-radio
                      v-for="(item, index) in reviewBOptions"
                      :key="index"
                      :label="item.value"
                      :disabled="item.disabled"
                      >{{ item.label }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label-width="430px"
                  label="测评项的符合情况判断是否准确？"
                  prop="reviewC"
                >
                  <el-radio-group
                    v-model="paymentOrderModel.reviewC"
                    size="medium"
                  >
                    <el-radio
                      v-for="(item, index) in reviewCOptions"
                      :key="index"
                      :label="item.value"
                      :disabled="item.disabled"
                      >{{ item.label }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label-width="430px"
                  label="测评报告中具有工具扫描和渗透测试的结果？（★）"
                  prop="reviewD"
                >
                  <el-radio-group
                    v-model="paymentOrderModel.reviewD"
                    size="medium"
                  >
                    <el-radio
                      v-for="(item, index) in reviewDOptions"
                      :key="index"
                      :label="item.value"
                      :disabled="item.disabled"
                      >{{ item.label }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label-width="430px"
                  label="安全问题的描述与评判是否准确？"
                  prop="reviewE"
                >
                  <el-radio-group
                    v-model="paymentOrderModel.reviewE"
                    size="medium"
                  >
                    <el-radio
                      v-for="(item, index) in reviewEOptions"
                      :key="index"
                      :label="item.value"
                      :disabled="item.disabled"
                      >{{ item.label }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label-width="430px"
                  label="整改建议是否完整、准确、合理？"
                  prop="reviewF"
                >
                  <el-radio-group
                    v-model="paymentOrderModel.reviewF"
                    size="medium"
                  >
                    <el-radio
                      v-for="(item, index) in reviewFOptions"
                      :key="index"
                      :label="item.value"
                      :disabled="item.disabled"
                      >{{ item.label }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label-width="430px"
                  label="测评结论是否具准确？"
                  prop="reviewG"
                >
                  <el-radio-group
                    v-model="paymentOrderModel.reviewG"
                    size="medium"
                  >
                    <el-radio
                      v-for="(item, index) in reviewGOptions"
                      :key="index"
                      :label="item.value"
                      :disabled="item.disabled"
                      >{{ item.label }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </div>
            <!-- 方案 -->
            <div v-if="pingcheji == 2">
              <el-col :span="24">
                <el-form-item
                  label-width="430px"
                  label="测评方案对被测系统和调查对象的描述是否与调查表一致？"
                  prop="planA"
                >
                  <el-radio-group
                    v-model="paymentOrderModel.planA"
                    size="medium"
                  >
                    <el-radio
                      v-for="(item, index) in planOptions"
                      :key="index"
                      :label="item.value"
                      :disabled="item.disabled"
                      >{{ item.label }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label-width="430px"
                  label="测评方案是否具有项目基本信息？"
                  prop="planB"
                >
                  <el-radio-group
                    v-model="paymentOrderModel.planB"
                    size="medium"
                  >
                    <el-radio
                      v-for="(item, index) in planOptions"
                      :key="index"
                      :label="item.value"
                      :disabled="item.disabled"
                      >{{ item.label }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label-width="430px"
                  label="测评方案是否具有抽选的被测对象的信息？"
                  prop="planC"
                >
                  <el-radio-group
                    v-model="paymentOrderModel.planC"
                    size="medium"
                  >
                    <el-radio
                      v-for="(item, index) in planOptions"
                      :key="index"
                      :label="item.value"
                      :disabled="item.disabled"
                      >{{ item.label }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label-width="430px"
                  label="测评方案是否具有工具扫描和渗透测试内容？（★）"
                  prop="planD"
                >
                  <el-radio-group
                    v-model="paymentOrderModel.planD"
                    size="medium"
                  >
                    <el-radio
                      v-for="(item, index) in planOptions"
                      :key="index"
                      :label="item.value"
                      :disabled="item.disabled"
                      >{{ item.label }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label-width="430px"
                  label="测评方案关键内容是否准确？"
                  prop="planE"
                >
                  <el-radio-group
                    v-model="paymentOrderModel.planE"
                    size="medium"
                  >
                    <el-radio
                      v-for="(item, index) in planOptions"
                      :key="index"
                      :label="item.value"
                      :disabled="item.disabled"
                      >{{ item.label }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </div>
            <el-col :span="24">
              <el-form-item label="评审过程记录" prop="reviewRecord ">
                <el-input
                  v-model="paymentOrderModel.reviewRecord"
                  type="textarea"
                  placeholder="请输入评审过程记录"
                  :autosize="{ minRows: 4, maxRows: 10 }"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="评审意见" prop="reviewOpinion ">
                <el-input
                  v-model="paymentOrderModel.reviewOpinion"
                  type="textarea"
                  placeholder="请输入评审意见"
                  :autosize="{ minRows: 4, maxRows: 10 }"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="评审结论" prop="reviewResult">
                <el-radio-group
                  v-model="paymentOrderModel.reviewResult"
                  size="medium"
                >
                  <el-radio
                    v-for="(item, index) in reviewResultOptions"
                    :key="index"
                    :label="item.value"
                    :disabled="item.disabled"
                    >{{ item.label }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="附件">
                <el-upload
                  class="upload-demo"
                  action
                  :limit="10"
                  :file-list="formFileList"
                  :on-exceed="formHandleExceed"
                  :on-remove="formFileListRemove"
                  :before-upload="beforeUploadForm"
                  :auto-upload="false"
                  :on-change="fileChangeformFileList"
                  multiple
                >
                  <el-button size="mini" type="primary">上传附件</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div slot="footer">
          <el-button @click="close()">取消</el-button>
          <el-button type="primary" @click="handelConfirm">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      pingcheji: 1,
      tabList: [],
      pcLinfotabList: [],
      fanganfotabList: [],
      kslistdatafy: false,
      kslistdatafyinfo: false,
      infopaymentOrderModel: {},
      paymentOrderModel: {
        reviewFirstTime: new Date().getTime(),
        time: new Date().getTime(),
        planA: null,
        planB: null,
        planC: null,
        planD: null,
        planE: null,
        assessor: null,
        department: null,
        contact: null,
        reviewA: null,
        reviewB: null,
        reviewC: null,
        reviewD: null,
        reviewE: null,
        reviewF: null,
        reviewG: null,
        reviewRecord: null,
        reviewOpinion: null,
        reviewResult: null,
      },
      rules: {
        planA: [
          {
            required: true,
            message:
              "测评方案对被测系统和调查对象的描述是否与调查表一致？不能为空",
            trigger: "change",
          },
        ],
        planB: [
          {
            required: true,
            message: "测评方案是否具有项目基本信息？不能为空",
            trigger: "change",
          },
        ],
        planC: [
          {
            required: true,
            message: "测评方案是否具有抽选的被测对象的信息？不能为空",
            trigger: "change",
          },
        ],
        planD: [
          {
            required: true,
            message: "测评方案是否具有工具扫描和渗透测试内容？（★）不能为空",
            trigger: "change",
          },
        ],
        planE: [
          {
            required: true,
            message: "测评方案关键内容是否准确？不能为空",
            trigger: "change",
          },
        ],
        reviewFirstTime: [
          {
            required: true,
            message: "请选择评审时间",
            trigger: "change",
          },
        ],
        time: [
          {
            required: true,
            message: "请选择评审时间",
            trigger: "change",
          },
        ],
        assessor: [
          {
            required: true,
            message: "请选择评审参加人员",
            trigger: "change",
          },
        ],
        department: [
          {
            required: true,
            message: "请输入被测单位部门",
            trigger: "blur",
          },
        ],
        contact: [
          {
            required: true,
            message: "请输入被测单位联系人",
            trigger: "blur",
          },
        ],
        reviewA: [
          {
            required: true,
            message:
              "测评报告对被测系统和抽选对象的描述是否与测评方案一致？不能为空",
            trigger: "change",
          },
        ],
        reviewB: [
          {
            required: true,
            message: "测评记录是否清晰、详实？不能为空",
            trigger: "change",
          },
        ],
        reviewC: [
          {
            required: true,
            message: "测评项的符合情况判断是否准确？不能为空",
            trigger: "change",
          },
        ],
        reviewD: [
          {
            required: true,
            message: "测评报告中具有工具扫描和渗透测试的结果？（★）不能为空",
            trigger: "change",
          },
        ],
        reviewE: [
          {
            required: true,
            message: "安全问题的描述与评判是否准确？不能为空",
            trigger: "change",
          },
        ],
        reviewF: [
          {
            required: true,
            message: "整改建议是否完整、准确、合理？不能为空",
            trigger: "change",
          },
        ],
        reviewG: [
          {
            required: true,
            message: "测评结论是否具准确？不能为空",
            trigger: "change",
          },
        ],
        reviewRecord: [
          {
            required: true,
            message: "请输入评审过程记录",
            trigger: "blur",
          },
        ],
        reviewOpinion: [
          {
            required: true,
            message: "请输入评审意见",
            trigger: "blur",
          },
        ],
        reviewResult: [
          {
            required: true,
            message: "评审结论不能为空",
            trigger: "change",
          },
        ],
      },
      assessorOptions: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      reviewAOptions: [
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ],
      reviewBOptions: [
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ],
      reviewCOptions: [
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ],
      planOptions: [
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ],
      reviewDOptions: [
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ],
      reviewEOptions: [
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ],
      reviewFOptions: [
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ],
      reviewGOptions: [
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ],
      reviewResultOptions: [
        {
          label: "合格",
          value: 1,
        },
        {
          label: "基本合格",
          value: 2,
        },
        {
          label: "不合格",
          value: 3,
        },
      ],
      // 附件
      formMaxSize: 10, // 上传文件大小
      formFileList: [], // 显示评测上传文件
      uploadFormFileList: [], // 确定上传文件，
    };
  },
  created() {
    this.userreviewFind();
    this.revifindListok();
    // this.getEtlist();
  },
  computed: {
    ...mapState("d2admin", {
      info: (state) => state.user.info,
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  methods: {
    // 附件
    // 开始上传前验证
    beforeUploadForm(file) {
      // 验证文件大小
      if (file.size / 1024 / 1024 > this.formMaxSize) {
        this.$message({
          message: `上传文件大小不能超过${this.formMaxSize}M!`,
          type: "warning",
        });
        return false;
      }
      // 中文乱码处理
      if (file.raw) {
        let reader = new FileReader(); // 读取文件内容
        reader.readAsText(file.raw, "gb2312"); // 防止中文乱码问题，不加reader.onload方法都不会触发
        reader.onload = function (e) {
          this.contentHtml = e.target.result; // txt文本内容，接下来就可以对其进行校验处理了
        };
      }
      // 验证文件类型
      // var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      // const extension =
      //   testmsg === "xlsx" || testmsg === "xls" || testmsg === "csv";
      // if (!extension) {
      //   this.$message({
      //     message: "上传文件只能是xlsx/xls/csv格式!",
      //     type: "warning",
      //   });
      // }
      // return extension;
    },
    // 允许上传文件个数验证
    formHandleExceed(files, formFileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + formFileList.length
        } 个文件`
      );
    },
    // 移除备评测列表中文件
    formFileListRemove(file, formFileList) {
      let thiz = this;
      for (let i = 0; i < thiz.formFileList.length; i++) {
        if (thiz.formFileList[i].name === file.name) {
          thiz.formFileList.splice(i, 1);
          break;
        }
      }
    },
    fileChangeformFileList(file) {
      this.formFileList.push(file.raw); //上传文件变化时将文件对象push进files数组
    },
    addListks(item) {
      this.userpassiveCompany();
      this.pingcheji = item;
      this.kslistdatafy = true;
    },
    // 新建提交
    handelConfirm() {
      this.$refs["paymentOrderModel"].validate(async (valid) => {
        if (!valid) {
          setTimeout(() => {
            const isError = document.getElementsByClassName("is-error");
            isError[0].querySelector("input").focus();
          }, 100);
          return false;
        }
        let loading = this.$loading({
          lock: true,
          text: "上传中，请稍候...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        let formData = new FormData();
        if (this.formFileList.length !== 0) {
          this.formFileList.forEach((file) => {
            formData.append("files", file);
          });
        }
        this.paymentOrderModel.projectId = this.xmu_info.projectId;
        this.paymentOrderModel.id = this.xmu_info.reviewId;
        for (const key in this.paymentOrderModel) {
          formData.append(key, this.paymentOrderModel[key]);
        }
        let res = "";
        if (this.pingcheji == 1) {
          res = await this.$api.userreviewSave(formData);
        } else if (this.pingcheji == 2) {
          res = await this.$api.userresavePlan(formData);
        }
        if (res.code === 20000) {
          this.$message({
            message: "创建成功",
            type: "success",
          });
          this.close();
          this.userreviewFind();
        }
        loading.close();
      });
    },
    // 查询评审记录列表
    async userreviewFind() {
      let res = await this.$api.userreviewFind({
        projectId: this.xmu_info.projectId,
      });
      this.pcLinfotabList = res.data;
      let refangan = await this.$api.userreviewfindPlan({
        projectId: this.xmu_info.projectId,
      });
      this.fanganfotabList = refangan.data;
    },
    close() {
      this.$refs["paymentOrderModel"].resetFields();
      this.paymentOrderModel = {
        reviewFirstTime: new Date().getTime(),
        time: new Date().getTime(),
        planA: null,
        planB: null,
        planC: null,
        planD: null,
        planE: null,
        assessor: null,
        department: null,
        contact: null,
        reviewA: null,
        reviewB: null,
        reviewC: null,
        reviewD: null,
        reviewE: null,
        reviewF: null,
        reviewG: null,
        reviewRecord: null,
        reviewOpinion: null,
        reviewResult: null,
      };
      this.formFileList = [];
      this.kslistdatafy = false;
    },
    // 详细
    async infodeiList(item, its) {
      this.infopaymentOrderModel = item;
      this.pingcheji = its;
      this.kslistdatafyinfo = true;
    },
    // 获取列表
    async revifindListok() {
      let res = await this.$api.revifindListok({
        projectId: this.xmu_info.projectId,
      });
      if (res.code == 20000) {
        this.tabList = res.data;
      }
      this.userreviewfindAssessor();
    },
    // 获取测评师
    async userreviewfindAssessor() {
      let res = await this.$api.userreviewfindAssessor({ level: 2 });
      this.assessorOptions = res.data;
    },
    // 查询被测单位信息
    async userpassiveCompany() {
      let res = await this.$api.userpassiveCompany({
        projectId: this.xmu_info.projectId,
      });
      this.paymentOrderModel.department = res.data.department;
      this.paymentOrderModel.contact = res.data.contacts;
    },

    async submitReport(val, ids) {
      //  下载报告
      let url = "";
      let fileName = "";
      if (ids == 1) {
        url = `${val.fileUrl}`;
        fileName = `${val.fileName}`;
      } else if (ids == 2) {
        url = `${val.recordUrl}`;
        fileName = `${val.recordName}`;
      }
      let res = await this.$api.SYS_reportWord_DownLoadDoc({ url });
      let blob = new Blob([res], {
        type: "application/msword;charset=utf-8",
      });

      //浏览器兼容，Google和火狐支持a标签的download，IE不支持
      if (window.navigator && window.navigator.msSaveBlob) {
        //IE浏览器、微软浏览器
        /* 经过测试，微软浏览器Microsoft Edge下载文件时必须要重命名文件才可以打开，
              IE可不重命名，以防万一，所以都写上比较好 */
        window.navigator.msSaveBlob(blob, fileName);
      } else {
        //其他浏览器
        let link = document.createElement("a"); // 创建a标签
        link.style.display = "none";
        let objectUrl = URL.createObjectURL(blob);
        link.download = fileName;
        link.href = objectUrl;
        link.click();
        URL.revokeObjectURL(objectUrl);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  font-size: 14px;
}
.xiazaiList {
  cursor: pointer;
  color: cornflowerblue;
  font-size: 12px;
  display: block;
}
.xiazaiList:hover {
  color: red;
  border-bottom: red solid 1px;
}
.jineginfo {
  margin-left: 10px;
  div {
    margin: 15px 0;
  }
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.mude_text_item {
  margin: 15px 0;
}
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
    position: relative;
    .boot_an {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
.el-card__header {
  border-bottom: 0px solid #ebeef5;
}
.demo-input-suffix {
  display: flex;
  align-items: center;
  flex-flow: wrap;
  div {
    margin: 5px;
    span {
      font-size: 12px;
      min-width: 80px;
    }
    .el-input {
      width: 220px;
    }
  }
}
.baseofUnits {
  width: 1200px;
  .el-dialog {
    width: 996px;
  }
  .descTItle {
    @extend %unable-border-left;
  }
}

.lisT1 {
  min-width: 250px;
  display: inline-block;
}
.lisT2 {
  min-width: 250px;
  display: inline-block;
}
.lisT3 {
  width: 285px;
  display: inline-block;
}
.lst3 {
  width: 50%;
  display: inline-block;
}
.dialogListTop {
  max-height: 450px;
  overflow: auto;
}
::v-deep .el-dialog__header {
  background-color: rgba(3, 169, 244, 0.5);
  .el-dialog__title {
    color: #ffffff;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #ffffff;
  }
}
::v-deep .el-dialog {
  margin-top: 5vh !important;
}
</style>

