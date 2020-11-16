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
              <el-button type="primary" @click="BeingMeasuredble=true" size="small" icon="el-icon-s-order"
                >现有委托单位库</el-button
              >
            </div>
          </div>
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
              <el-button type="primary" @click="MeasurementUnitble=true" size="small" icon="el-icon-s-order"
                >现有测评单位</el-button
              >
            </div>
          </div> -->
          <div class="mude_text_item">
            <div class="descTItle">测评组(多姓名以顿号;分割)</div>
             <div class="demo-input-suffix">
              <div>
                <span>技术测评组：</span>
                <el-input
                  placeholder="请输入"
                  v-model="assessmentGroup.technologyEvaluationTeam"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>管理评估组：</span>
                <el-input
                  placeholder="请输入"
                  v-model="assessmentGroup.manageEvaluationTeam"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>渗透测试组：</span>
                <el-input
                  placeholder="请输入"
                  v-model="assessmentGroup.penetrationTestTeam"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>质量监督人：</span>
                <el-input
                  placeholder="请输入"
                  v-model="assessmentGroup.qualitySupervisor"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <span>项目组长：</span>
                <el-input
                  placeholder="请输入"
                  v-model="assessmentGroup.ahshg"
                  size="small"
                >
                </el-input>
              </div>
            </div>
          </div>
          <div class="tijiaobaoc">
            <el-button type="primary" @click="submitReport">生成安全测评方案</el-button>
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
      BeingMeasuredble: false,
      // 被测评单位
      BeingMeasured: {
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
      industryTypes: [],
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
      assessmentGroup:{
        // 技术测评组()
        technologyEvaluationTeam:'',
        // 管理评估组()
        manageEvaluationTeam:'',
        // 渗透测试组()
        penetrationTestTeam:'',
        // 质量监督人()
        qualitySupervisor:'',
        // 项目组长
        ahshg:''
      }
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
