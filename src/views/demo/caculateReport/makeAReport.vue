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
          <div class="mude_text_item">
            <div class="descTItle">测评单位</div>
            <div class="demo-input-suffix">
              <div>
                <span>单位名称：</span>
                <el-input
                  placeholder="请输入"
                  v-model="TheMeasurementUnit.companyName"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>联系人：</span>
                <el-input
                  placeholder="请输入"
                  v-model="TheMeasurementUnit.contacts"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>移动电话：</span>
                <el-input
                  placeholder="请输入"
                  v-model="TheMeasurementUnit.mobilePhone"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>所在部门：</span>
                <el-input
                  placeholder="请输入"
                  v-model="TheMeasurementUnit.department"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>职务/职称：</span>
                <el-input
                  placeholder="请输入"
                  v-model="TheMeasurementUnit.companyPosition"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>邮政编码：</span>
                <el-input
                  placeholder="请输入"
                  v-model="TheMeasurementUnit.postalCode"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>办公电话：</span>
                <el-input
                  placeholder="请输入"
                  v-model="TheMeasurementUnit.officesPhone"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>通讯地址：</span>
                <el-input
                  placeholder="请输入"
                  v-model="TheMeasurementUnit.companyAddress"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>电子邮箱：</span>
                <el-input
                  placeholder="请输入"
                  v-model="TheMeasurementUnit.email"
                  size="small"
                >
                </el-input>
              </div>
            </div>
            <div class="tijiaobaoc">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-folder-opened"
                >纳入委托单位库</el-button
              >
              <!-- <el-button
                type="primary"
                @click="MeasurementUnitble = true"
                size="small"
                icon="el-icon-s-order"
                >现有测评单位</el-button
              > -->
            </div>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">制作报告</div>
            <div class="demo-input-suffix">
              <div>
                <span>报告编号：</span>
                <el-input
                  placeholder="请输入"
                  v-model="assessmentGroup.reportNum"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>备案证明编号：</span>
                <el-input
                  placeholder="请输入"
                  v-model="assessmentGroup.recordSn"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>报告名称：</span>
                <el-input
                  placeholder="请输入"
                  v-model="assessmentGroup.reportName"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>报告日期：</span>
                <el-date-picker
                  v-model="assessmentGroup.reportTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="tijiaobaoc">
            <el-button type="primary" size="small">保存配置</el-button>
            <el-button type="primary" size="small" @click="submitReport"
              >制作报告</el-button
            >
          </div>
          <div class="mude_text_item">
            <div class="descTItle">现有报告</div>
            <el-table :data="reportGeneratingRecords" style="width: 100%">
              <el-table-column label="报告编号" width="200">
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
              </el-table-column>
              <el-table-column label="报告名称" width="150">
                <template slot-scope="scope">
                  {{ scope.row.reportName }}
                </template>
              </el-table-column>
              <el-table-column label="报告日期" width="150">
                <template slot-scope="scope">
                  {{ scope.row.reportTime }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="reportGeneratingEdit(scope.$index, scope.row)"
                    >生成</el-button
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
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
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
    };
  },
  created() {
    this.getEtlist();
  },
  methods: {
    textChangeHandler(delta, oldDelta, source) {
      // console.log(delta,oldDelta,source)
    },
    selectChange(provinceName, cityNmae) {
      this.provincesCities = provinceName;
      this.districtCounty = cityNmae;
    },
    async getEtlist() {},
    async submitReport() {},
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

