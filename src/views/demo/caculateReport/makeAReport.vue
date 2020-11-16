<!--制作报告-->
<!--制作评论方案和计划-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <!-- <div class="mude_text_item">
            <div class="descTItle">被测评单位(委托单位)</div>
            <div class="demo-input-suffix">
              <div>
                <span>单位名称：</span>
                <el-input
                  placeholder="请输入"
                  v-model="BeingMeasured.companyName"
                  size="small"
                >
                </el-input>
              </div> 
              <div>
                <span>联系人：</span>
                <el-input
                  placeholder="请输入"
                  v-model="BeingMeasured.contacts"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>移动电话：</span>
                <el-input
                  placeholder="请输入"
                  v-model="BeingMeasured.mobilePhone"
                  size="small" 
                >
                </el-input>
              </div>
              <div>
                <span>所在部门：</span>
                <el-input
                  placeholder="请输入"
                  v-model="BeingMeasured.department"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>职务/职称：</span>
                <el-input
                  placeholder="请输入"
                  v-model="BeingMeasured.companyPosition"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>邮政编码：</span>
                <el-input
                  placeholder="请输入"
                  v-model="BeingMeasured.postalCode"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>办公电话：</span>
                <el-input
                  placeholder="请输入"
                  v-model="BeingMeasured.officesPhone"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>通讯地址：</span>
                <el-input
                  placeholder="请输入"
                  v-model="BeingMeasured.companyAddress"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>电子邮箱：</span>
                <el-input
                  placeholder="请输入"
                  v-model="BeingMeasured.email"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>行业类型：</span>
                <el-select
                  size="small"
                  v-model="BeingMeasured.industryType"
                  placeholder="请选择"
                >
                  <el-option :key="''" :label="'全部'" :value="''"> </el-option>
                  <el-option
                    v-for="item in industryTypes"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </div>
              <div>
                <span>业务类型：</span>
                <el-select
                  size="small"
                  v-model="BeingMeasured.businessType"
                  placeholder="请选择"
                >
                  <el-option :key="''" :label="'全部'" :value="''"> </el-option>
                  <el-option
                    v-for="item in businessTypes"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </div>
              <upload-city
                ref="addFormProvince"
                @selectChange="selectChange"
              ></upload-city>
            </div>
            <div class="tijiaobaoc">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-folder-opened"
                >纳入委托单位库</el-button
              >
              <el-button
                type="primary"
                @click="BeingMeasuredble = true"
                size="small"
                icon="el-icon-s-order"
                >现有委托单位库</el-button
              >
            </div>
          </div> -->
          <!-- <div class="mude_text_item">
            <div class="descTItle">测评单位</div>
            <div>
              <el-row :gutter="15">
                <el-form
                  ref="TheMeasurementUnit"
                  :model="TheMeasurementUnit"
                  :rules="rules"
                  size="medium"
                  label-width="100px"
                >
                  <el-col :span="22">
                    <el-form-item
                      label-width="110px"
                      label="单位名称："
                      prop="companyName"
                    >
                      <el-input
                        v-model="TheMeasurementUnit.companyName"
                        placeholder="请输入单位名称："
                        :disabled="true"
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="13">
                    <el-form-item
                      label-width="110px"
                      label="单位地址："
                      prop="companyAddress"
                    >
                      <el-input
                        v-model="TheMeasurementUnit.companyAddress"
                        placeholder="请输入单位地址："
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item
                      label-width="110px"
                      label="邮政编码："
                      prop="postalCode"
                    >
                      <el-input
                        v-model="TheMeasurementUnit.postalCode"
                        placeholder="请输入邮政编码："
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item
                      label-width="110px"
                      label="联系人姓名："
                      prop="contacts"
                    >
                      <el-input
                        v-model="TheMeasurementUnit.contacts"
                        placeholder="请输入联系人姓名："
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item
                      label-width="110px"
                      label="职务/职称："
                      prop="companyPosition"
                    >
                      <el-input
                        v-model="TheMeasurementUnit.companyPosition"
                        placeholder="请输入职务/职称："
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item
                      label-width="110px"
                      label="所属部门："
                      prop="department"
                    >
                      <el-input
                        v-model="TheMeasurementUnit.department"
                        placeholder="请输入所属部门："
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item
                      label-width="110px"
                      label="办公电话："
                      prop="officesPhone"
                    >
                      <el-input
                        v-model="TheMeasurementUnit.officesPhone"
                        placeholder="请输入办公电话："
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item
                      label-width="110px"
                      label="移动电话："
                      prop="mobilePhone"
                    >
                      <el-input
                        v-model="TheMeasurementUnit.mobilePhone"
                        placeholder="请输入移动电话："
                        :maxlength="11"
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item
                      label-width="110px"
                      label="电子邮箱："
                      prop="email"
                    >
                      <el-input
                        v-model="TheMeasurementUnit.email"
                        placeholder="请输入电子邮箱："
                        clearable
                        :style="{ width: '100%' }"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <div class="tijiaobaoc">
                    <el-button
                      type="primary"
                      size="small"
                      @click="submitForm"
                      icon="el-icon-folder-opened"
                      >纳入委托单位库</el-button
                    >
             
                  </div>
                </el-form>
              </el-row>
            </div>
          </div> -->
          <div class="mude_text_item">
            <div class="descTItle">制作报告</div>
            <el-row :gutter="24">
              <el-form
                ref="assessmentGroup"
                :model="assessmentGroup"
                :rules="rules"
                size="medium"
                label-width="100px"
              >
                <el-col :span="8">
                  <el-form-item
                    label-width="120px"
                    label="报告编号："
                    prop="reportNum"
                  >
                    <el-input
                      v-model="assessmentGroup.reportNum"
                      placeholder="请输入报告编号："
                      :style="{ width: '100%' }"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label-width="120px"
                    label="备案证明编号："
                    prop="recordSn"
                  >
                    <el-input
                      v-model="assessmentGroup.recordSn"
                      placeholder="请输入备案证明编号："
                      :style="{ width: '100%' }"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label-width="120px"
                    label="报告名称："
                    prop="reportName"
                  >
                    <el-input
                      v-model="assessmentGroup.reportName"
                      placeholder="请输入报告名称："
                      :style="{ width: '100%' }"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label-width="120px"
                    label="报告日期："
                    prop="reportTime"
                  >
                    <el-date-picker
                      v-model="assessmentGroup.reportTime"
                      value-formate="timestamp"
                      :style="{ width: '100%' }"
                      placeholder="请选择报告日期："
                      clearable
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item
                    label-width="130px"
                    label="该系统本年度测评"
                    prop="annualReview"
                  >
                    <el-select
                      v-model="assessmentGroup.annualReview"
                      placeholder="请选择该系统本年度测评"
                      @change="textChangeHandler"
                      :style="{ width: '100%' }"
                    >
                      <el-option
                        v-for="(item, index) in field108Options"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <div class="tijiaobaoc">
                    <!-- <el-button type="primary" size="small">保存配置</el-button> -->
                    <el-button type="primary" size="small" @click="submitReport"
                      >制作报告</el-button
                    >
                  </div>
                </el-col>
              </el-form>
            </el-row>
          </div>

          <div class="mude_text_item">
            <div class="descTItle">现有报告</div>
            <el-table :data="reportGeneratingRecords" style="width: 100%">
              <!-- <el-table-column label="报告编号" width="200">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.reportNum
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="备案证明编号" width="200">
                <template slot-scope="scope">
                  {{ scope.row.recordSn }}
                </template>
              </el-table-column> -->
              <el-table-column label="报告名称">
                <template slot-scope="scope">
                  {{ scope.row.reportName }}
                </template>
              </el-table-column>
              <el-table-column label="日期" width="120">
                <template slot-scope="scope">
                  {{ scope.row.reportTime }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="reportGeneratingEdit(scope.$index, scope.row)"
                    >下载</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="reportGeneratingDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 被测单位信息库 -->
    <div class="baseofUnits">
      <el-dialog
        title="被测单位信息库"
        :visible.sync="BeingMeasuredble"
        :close-on-click-modal="false"
      >
        <div class="mude_text_item">
          <div class="descTItle">单位信息</div>
          <div class="demo-input-suffix">
            <div>
              <span>单位名称：</span>
              <el-input
                placeholder="请输入"
                v-model="updataBeingMeasured.companyName"
                size="small"
              >
              </el-input>
            </div>
            <div>
              <span>联系人：</span>
              <el-input
                placeholder="请输入"
                v-model="updataBeingMeasured.contacts"
                size="small"
              >
              </el-input>
            </div>
            <div>
              <span>移动电话：</span>
              <el-input
                placeholder="请输入"
                v-model="updataBeingMeasured.mobilePhone"
                size="small"
              >
              </el-input>
            </div>
            <div>
              <span>所在部门：</span>
              <el-input
                placeholder="请输入"
                v-model="updataBeingMeasured.department"
                size="small"
              >
              </el-input>
            </div>
            <div>
              <span>职务/职称：</span>
              <el-input
                placeholder="请输入"
                v-model="updataBeingMeasured.companyPosition"
                size="small"
              >
              </el-input>
            </div>
            <div>
              <span>邮政编码：</span>
              <el-input
                placeholder="请输入"
                v-model="updataBeingMeasured.postalCode"
                size="small"
              >
              </el-input>
            </div>
            <div>
              <span>办公电话：</span>
              <el-input
                placeholder="请输入"
                v-model="updataBeingMeasured.officesPhone"
                size="small"
              >
              </el-input>
            </div>
            <div>
              <span>通讯地址：</span>
              <el-input
                placeholder="请输入"
                v-model="updataBeingMeasured.companyAddress"
                size="small"
              >
              </el-input>
            </div>
            <div>
              <span>电子邮箱：</span>
              <el-input
                placeholder="请输入"
                v-model="updataBeingMeasured.email"
                size="small"
              >
              </el-input>
            </div>
            <upload-city
              ref="addFormProvince"
              @selectChange="selectChange"
            ></upload-city>
          </div>
          <div class="tijiaobaoc">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-circle-plus-outline"
              >新增单位信息库</el-button
            >
            <el-button type="primary" size="small" icon="el-icon-circle-check"
              >保存修改</el-button
            >
          </div>
        </div>
        <div class="mude_text_item">
          <div class="descTItle">现有单位信息</div>
          <el-table
            :data="BeingMeasuredList"
            @current-change="BeingMeasureChange"
            style="width: 100%"
          >
            <el-table-column label="单位名称" width="200">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.companyName
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="通讯地址" width="200">
              <template slot-scope="scope">
                {{ scope.row.companyAddress }}
              </template>
            </el-table-column>
            <el-table-column label="联系人" width="150">
              <template slot-scope="scope">
                {{ scope.row.contacts }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="BeingMeasuredEdit(scope.$index, scope.row)"
                  >选中</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="BeingMeasureDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
    <!-- 测单位信息库 -->
    <div class="baseofUnits">
      <el-dialog
        title="测单位信息库"
        :visible.sync="MeasurementUnitble"
        :close-on-click-modal="false"
      >
        <div class="mude_text_item">
          <div class="descTItle">单位信息</div>
          <div class="demo-input-suffix">
            <div>
              <span>单位名称：</span>
              <el-input
                placeholder="请输入"
                v-model="updataTheMeasurementUnit.companyName"
                size="small"
              >
              </el-input>
            </div>
            <div>
              <span>联系人：</span>
              <el-input
                placeholder="请输入"
                v-model="updataTheMeasurementUnit.contacts"
                size="small"
              >
              </el-input>
            </div>
            <div>
              <span>移动电话：</span>
              <el-input
                placeholder="请输入"
                v-model="updataTheMeasurementUnit.mobilePhone"
                size="small"
              >
              </el-input>
            </div>
            <div>
              <span>所在部门：</span>
              <el-input
                placeholder="请输入"
                v-model="updataTheMeasurementUnit.department"
                size="small"
              >
              </el-input>
            </div>
            <div>
              <span>职务/职称：</span>
              <el-input
                placeholder="请输入"
                v-model="updataTheMeasurementUnit.companyPosition"
                size="small"
              >
              </el-input>
            </div>
            <div>
              <span>邮政编码：</span>
              <el-input
                placeholder="请输入"
                v-model="updataTheMeasurementUnit.postalCode"
                size="small"
              >
              </el-input>
            </div>
            <div>
              <span>办公电话：</span>
              <el-input
                placeholder="请输入"
                v-model="updataTheMeasurementUnit.officesPhone"
                size="small"
              >
              </el-input>
            </div>
            <div>
              <span>通讯地址：</span>
              <el-input
                placeholder="请输入"
                v-model="updataTheMeasurementUnit.companyAddress"
                size="small"
              >
              </el-input>
            </div>
            <div>
              <span>电子邮箱：</span>
              <el-input
                placeholder="请输入"
                v-model="updataTheMeasurementUnit.email"
                size="small"
              >
              </el-input>
            </div>
          </div>
          <div class="tijiaobaoc">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-circle-plus-outline"
              >新增单位信息库</el-button
            >
            <el-button type="primary" size="small" icon="el-icon-circle-check"
              >保存修改</el-button
            >
          </div>
        </div>
        <div class="mude_text_item">
          <div class="descTItle">现有单位信息</div>
          <el-table
            :data="TheMeasurementUnitList"
            @current-change="TheMeasurementUnitChange"
            style="width: 100%"
          >
            <el-table-column label="单位名称" width="200">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.companyName
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="通讯地址" width="200">
              <template slot-scope="scope">
                {{ scope.row.companyAddress }}
              </template>
            </el-table-column>
            <el-table-column label="联系人" width="150">
              <template slot-scope="scope">
                {{ scope.row.contacts }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="TheMeasurementUnitEdit(scope.$index, scope.row)"
                  >选中</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="TheMeasurementUnitDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
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
      BeingMeasuredble: false,
      // // 被测评单位
      // BeingMeasured: {
      //   // 单位名称
      //   companyName: "",
      //   // 联系人
      //   contacts: "",
      //   // 移动电话
      //   mobilePhone: "",
      //   // 所在部门(
      //   department: "",
      //   // 职务/职称()
      //   companyPosition: "",
      //   // 邮政编码()
      //   postalCode: "",
      //   // 办公电话
      //   officesPhone: "",
      //   // 通讯地址()
      //   companyAddress: "",
      //   // 电子邮箱()
      //   email: "",
      //   // 所在省/市()
      //   provincesCities: "",
      //   // 所在区/县()
      //   districtCounty: "",
      //   // 行业类型()
      //   industryType: "",
      //   // 业务类型()
      //   businessType: "",
      // },
      // 修改被测评单位
      updataBeingMeasured: {
        // 单位名称
        companyName: "",
        // 联系人
        contacts: "",
        // 移动电话
        mobilePhone: "",
        // 所在部门(
        department: "",
        // 职务/职称()
        companyPosition: "",
        // 邮政编码()
        postalCode: "",
        // 办公电话
        officesPhone: "",
        // 通讯地址()
        companyAddress: "",
        // 电子邮箱()
        email: "",
        // 所在省/市()
        provincesCities: "",
        // 所在区/县()
        districtCounty: "",
        // 行业类型()
        industryType: "",
        // 业务类型()
        businessType: "",
      },

      industryTypes: [
        { id: 1, value: "电信" },
        { id: 2, value: "广电" },
        { id: 3, value: "经营性公众互联网" },
        { id: 4, value: "银行" },
        { id: 5, value: "海关" },
        { id: 6, value: "税务" },
        { id: 7, value: "民航" },
        { id: 8, value: "电力" },
        { id: 9, value: "证券" },
        { id: 10, value: "保险" },
        { id: 11, value: "国防科技工业" },
        { id: 12, value: "公安" },
        { id: 13, value: "人事劳动和社会保障" },
        { id: 14, value: "财政" },

        { id: 15, value: "审计" },
        { id: 16, value: "商业贸易" },
        { id: 17, value: "国土资源" },
        { id: 18, value: "能源" },
        { id: 19, value: "交通" },
        { id: 20, value: "统计" },
        { id: 21, value: "工商行政管理" },
        { id: 22, value: "邮政" },
        { id: 23, value: "教育" },
        { id: 24, value: "文化" },
        { id: 25, value: "卫生" },
        { id: 26, value: "农业" },
        { id: 27, value: "外交" },

        { id: 28, value: "发展改革" },
        { id: 29, value: "科技" },
        { id: 30, value: "宣传" },
        { id: 31, value: "质量监督检验检" },
        { id: 32, value: "其他" },
      ],
      businessTypes: [],
      // 现有被测评单位信息
      BeingMeasuredList: [
        {
          // 单位名称
          companyName: "定场地成都的刺激多次基督教的",
          // 通讯地址()
          companyAddress: "定场地成都的刺激多次基督教的",
          // 联系人
          contacts: "252525525",
        },
      ],
      // 测评单位
      MeasurementUnitble: false,
      TheMeasurementUnit: {
        // 单位名称
        companyName: "",
        // 联系人
        contacts: "",
        // 移动电话
        mobilePhone: "",
        // 所在部门(
        department: "",
        // 职务/职称()
        companyPosition: "",
        // 邮政编码()
        postalCode: "",
        // 办公电话
        officesPhone: "",
        // 通讯地址()
        companyAddress: "",
        // 电子邮箱()
        email: "",
      },
      updataTheMeasurementUnit: {
        // 单位名称
        companyName: "",
        // 联系人
        contacts: "",
        // 移动电话
        mobilePhone: "",
        // 所在部门(
        department: "",
        // 职务/职称()
        companyPosition: "",
        // 邮政编码()
        postalCode: "",
        // 办公电话
        officesPhone: "",
        // 通讯地址()
        companyAddress: "",
        // 电子邮箱()
        email: "",
      },
      TheMeasurementUnitList: [],
      //测评组
      assessmentGroup: {
        // 报告编号()
        reportNum: "",
        // 备案证明编号()
        recordSn: "",
        // 报告名称()
        reportName: "",
        // 报告日期()
        reportTime: "",
        //年度测评
        annualReview: 1,
      },
      // 现有报告
      reportGeneratingRecords: [
        {
          // 报告编号()
          reportNum: "",
          // 备案证明编号()
          recordSn: "",
          // 报告名称()
          reportName: "",
          // 报告日期()
          reportTime: "",
        },
      ],
      rules: {
        recordSn: [
          {
            required: true,
            message: "请输入备案证明编号",
            trigger: "blur",
          },
        ],
        reportNum: [ {
            required: true,
            message: "请输入报告编号",
            trigger: "blur",
          },],
        reportName: [
          {
            required: true,
            message: "请输入报告名称",
            trigger: "blur",
          },
        ],
        reportTime: [
          {
            required: true,
            message: "请选择报告日期",
            trigger: "change",
          },
        ],
        field108: [
          {
            required: true,
            message: "请选择该系统本年度测评",
            trigger: "change",
          },
        ],
      },
      field108Options: [
        {
          label: "第一次",
          value: 1,
        },
        {
          label: "第二次",
          value: 2,
        },
      ],
    };
  },
  created() {
    this.getEtlist();
    this.textChangeHandler();
  },
  computed: {
    ...mapState("d2admin", {
      info: (state) => state.user.info,
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  methods: {
    submitForm() {
      this.$refs["TheMeasurementUnit"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    // 生成默认值
    textChangeHandler() {
      console.log(this.info);
      console.log(this.xmu_info);
      var date = new Date();
      let dataTs = date.getFullYear() + "";
      if (this.info.user_info.companyCode != null) {
        let lst = `${this.xmu_info.data.recordSn}-${dataTs.substring(
          0,
          2
        )}-${this.info.user_info.companyCode.substring(
          this.info.user_info.companyCode.length - 6
        )}-0${this.assessmentGroup.annualReview}`;
        let Nmas = `${this.xmu_info.data.evaluatedUnit}_${this.xmu_info.data.systemName}_测评报告_0${this.assessmentGroup.annualReview}`;
        this.assessmentGroup.reportNum = lst;
        this.assessmentGroup.recordSn = this.xmu_info.data.recordSn;
        this.assessmentGroup.reportName = Nmas;
      } else {
        this.$message.error('当前账号无测评机构代码，请联系管理员添加');
      }

      // console.log(date.getTime());
      this.assessmentGroup.reportTime = date.getTime();
    },
    selectChange(provinceName, cityNmae) {
      this.provincesCities = provinceName;
      this.districtCounty = cityNmae;
    },
    async getEtlist() {},
    async submitReport() {
      this.$refs["assessmentGroup"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    // 被测评
    BeingMeasuredEdit(index, row) {
      console.log(index, row);
    },
    BeingMeasureDelete(index, row) {
      console.log(index, row);
    },
    BeingMeasureChange(val) {
      console.log(val);
    },

    // 测评单位
    TheMeasurementUnitEdit(index, row) {
      console.log(index, row);
    },
    TheMeasurementUnitDelete(index, row) {
      console.log(index, row);
    },
    TheMeasurementUnitChange(val) {
      console.log(val);
    },
    //删除报告
    reportGeneratingDelete(val) {
      console.log(val);
    },
    //生成报告
    reportGeneratingEdit() {},
  },
};
</script>

<style lang="scss">
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
</style>

