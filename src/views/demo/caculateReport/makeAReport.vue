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
            <div class="descTItle">录入联盟信息</div>
            <div class="pc_gonjv">
              <div class="jineginfo">
                <div>
                  <div>
                    <span>项目开始时间：</span
                    ><span>
                      {{
                        UnionModel.projectBeginTime
                          ? UnionModel.projectBeginTime
                          : "----"
                      }}</span
                    >
                  </div>
                  <div>
                    <span>项目结束时间：</span
                    ><span>
                      {{
                        UnionModel.projectEndTime
                          ? UnionModel.projectEndTime
                          : "----"
                      }}</span
                    >
                  </div>
                  <div>
                    <span>联盟平台通过截图：</span>
                    <span
                      class="ksLismu"
                      @click="fujiancalss(UnionModel.inputImgUrl)"
                    >
                      {{
                        UnionModel.inputImgName
                          ? UnionModel.inputImgName
                          : "----"
                      }}</span
                    >
                  </div>
                </div>
                <div>
                  <div>
                    <span>录入联盟时间：</span
                    ><span>
                      {{
                        UnionModel.inputUnionTime
                          ? UnionModel.inputUnionTime
                          : "----"
                      }}</span
                    >
                  </div>
                  <div>
                    <span>联盟通过时间：</span
                    ><span>
                      {{
                        UnionModel.unionPassTime
                          ? UnionModel.unionPassTime
                          : "----"
                      }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">录入打卡信息</div>
            <div class="pc_gonjv">
              <div class="jineginfo">
                <div>
                  <div>
                    <span>打卡到达时间：</span
                    ><span>
                      {{
                        inpuniondel.arriveTime ? inpuniondel.arriveTime : "----"
                      }}</span
                    >
                  </div>
                  <div>
                    <span>打卡离开时间：</span
                    ><span>
                      {{
                        inpuniondel.leaveTime ? inpuniondel.leaveTime : "----"
                      }}</span
                    >
                  </div>
                </div>
                <div>
                  <div>
                    <span>打卡人员：</span
                    ><span>
                      <span
                        v-for="(it, index) in inpuniondel.clockPeopleStr"
                        :key="index"
                      >
                        {{ it }}
                      </span></span
                    >
                  </div>
                  <div>
                    <span>打卡上传附件：</span
                    ><span>
                      <span v-for="it in inpuniondel.fileList" :key="it.fileId">
                        <span
                          class="ksLismu"
                          @click="fujiancalss(it.fileUrl)"
                          >{{ it.fileName }}</span
                        >
                      </span></span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">制作报告</div>

            <el-form
              ref="assessmentGroup"
              :model="assessmentGroup"
              :rules="rules"
              size="medium"
            >
              <el-form-item
                label-width="130px"
                label="该系统本年度测评"
                prop="annualReview"
                class="lisT1"
              >
                <el-select
                  v-model="assessmentGroup.annualReview"
                  placeholder="请选择该系统本年度测评"
                  @change="textChangeHandler"
                  :style="{ width: '100px' }"
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
              <el-form-item
                label-width="120px"
                label="备案证明编号："
                prop="recordSn"
                class="lisT2"
              >
                <el-input
                  v-model="assessmentGroup.recordSn"
                  placeholder="请输入备案证明编号："
                  :disabled="this.info.user_info.companyCode ? true : false"
                  :style="{ width: '170px' }"
                ></el-input>
              </el-form-item>

              <el-form-item
                label-width="140px"
                label="报告日期："
                prop="reportTime"
                class="lisT3"
              >
                <el-date-picker
                  v-model="assessmentGroup.reportTime"
                  type="date"
                  format="yyyy - MM - dd"
                  @change="textChangeHandler"
                  value-format="timestamp"
                  :style="{ width: '150px' }"
                  placeholder="请选择日期"
                ></el-date-picker>
              </el-form-item>

              <el-form-item
                label-width="100px"
                label="报告名称："
                prop="reportName"
                class="lst3"
              >
                <el-input
                  v-model="assessmentGroup.reportName"
                  placeholder="请输入报告名称："
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
              <el-form-item
                label-width="100px"
                label="报告编号："
                prop="reportNum"
                class="lst3"
              >
                <el-input
                  v-model="assessmentGroup.reportNum"
                  placeholder="请输入报告编号："
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>

              <div class="tijiaobaoc">
                <el-button
                  type="primary"
                  size="small"
                  @click="(dialogFormVisible = true), CheckReportTeam()"
                  >检查内容</el-button
                >
                <!-- <el-button type="primary" size="small">保存配置</el-button> -->
                <el-button type="primary" size="small" @click="reportGenerriskrip"
                  >制作报告</el-button
                >
              </div>
            </el-form>
          </div>

          <div class="mude_text_item">
            <div class="descTItle">报告列表</div>
            <el-table
              :header-cell-style="{ 'text-align': 'center' }"
              :data="reportGeneratingRecords"
              style="width: 100%"
            >
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
                  {{ scope.row.reportName }}.docx
                </template>
              </el-table-column>
              <el-table-column label="报告生成状态" width="120">
                <template slot-scope="scope">
                  <div v-if="scope.row.status == 0">生成中</div>
                  <div v-else-if="scope.row.status == 1">已生成</div>
                  <div v-else>生成失败</div>
                </template>
              </el-table-column>
              <el-table-column label="日期" width="220">
                <template slot-scope="scope">
                  {{ formattime(scope.row.createdTime) }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                  <el-button size="mini" @click="reportGeneratingEdit(scope.row)"
                    >下载</el-button
                  >
                  <el-button
                    size="mini"
                    type="info"
                    v-show="scope.row.status == 2"
                    @click="reportGeneratingsbai(scope.row)"
                    >失败原因</el-button
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

    <div class="dialogList">
      <el-dialog
        title="检查内容"
        width="80%"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
      >
        <div class="dialogListTop">
          <el-table :data="gridData">
            <el-table-column
              property="menu"
              label="菜单"
              width="150"
            ></el-table-column>
            <el-table-column property="name" label="名称"></el-table-column>
            <el-table-column
              property="content"
              label="检查结果"
            ></el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
    <!-- 被测单位信息库 -->
    <!-- <div class="baseofUnits">
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
    </div> -->
    <!-- 测单位信息库 -->
    <!-- <div class="baseofUnits">
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
    </div> -->
  </d2-container>
</template>

<script>
import log from "@/libs/util.log";
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialogFormVisible: false,
      // 检查列表
      gridData: [],
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

      UnionModel: {
        projectBeginTime: undefined,
        projectEndTime: undefined,
        inputUnionTime: undefined,
        inputImgUrl: undefined,
        inputImgName: undefined,
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
      reportGeneratingRecords: [],
      rules: {
        recordSn: [
          {
            required: true,
            message: "请输入备案证明编号",
            trigger: "blur",
          },
        ],
        reportNum: [
          {
            required: true,
            message: "请输入报告编号",
            trigger: "blur",
          },
        ],
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
      url: "",
      srcList: [],
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
      inpuniondel: {},
    };
  },
  async created() {
    this.tuopRtime();
    this.getEtlist();
    this.geTlvTopks();
    this.gedakavTopks();
  },
  computed: {
    ...mapState("d2admin", {
      info: (state) => state.user.info,
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  methods: {
    async gedakavTopks() {
      let res = await this.$api.findClockputUnion();
      if (res.code === 20000) {
        this.inpuniondel = res.data;
      }
    },
    async tuopRtime() {
      let res = await this.$api.API_reportTimepdate({
        projectId: this.xmu_info.projectId,
      });
      if (res.data.reportTime !== 0 && res.data.reportTime !== null) {
        this.assessmentGroup.reportTime = res.data.reportTime;
      }
      console.log(8588);
      this.textChangeHandler();
    },
    // 下载附件
    async fujiancalss(item) {
      // let url = `${window.location.protocol}${item.url}`;
      //
      let url = item;
      let Listname = url.split(".").pop();
      const litrue =
        Listname == "doc" ||
        Listname == "docx" ||
        Listname == "xlsx" ||
        Listname == "xls";
      if (!litrue) {
        window.open(url);
      } else {
        let urlList = `https://view.officeapps.live.com/op/view.aspx?src=${
          window.location.protocol + "//" + window.location.host + url
        }`;
        // window.open(urlList);
        window.open(url);
        // let res = await this.$api.SYS_reportWord_DownLoadDoc({ url });
        // if (res.code == 500) {
        //   alert(res.message);
        // } else {
        //   let blob = new Blob([res], {
        //     type: "application/msword;charset=utf-8",
        //   });

        //   //浏览器兼容，Google和火狐支持a标签的download，IE不支持
        //   if (window.navigator && window.navigator.msSaveBlob) {
        //     //IE浏览器、微软浏览器
        //     /* 经过测试，微软浏览器Microsoft Edge下载文件时必须要重命名文件才可以打开，
        //       IE可不重命名，以防万一，所以都写上比较好 */
        //     window.navigator.msSaveBlob(blob, reportName);
        //   } else {
        //     //其他浏览器
        //     let link = document.createElement("a"); // 创建a标签
        //     link.style.display = "none";
        //     let objectUrl = URL.createObjectURL(blob);
        //     link.download = reportName;
        //     link.href = objectUrl;
        //     link.click();
        //     URL.revokeObjectURL(objectUrl);
        //   }
        // }
      }
      // console.log(item);
    },
    async geTlvTopks() {
      let res = await this.$api.GetfindInputUnion();
      if (res.code === 20000) {
        if (res.data) {
          this.UnionModel = res.data;
          this.url = `${
            window.location.protocol +
            "//" +
            window.location.host +
            res.data.inputImgUrl
          }`;
          this.srcList.push(this.url);
        } else {
          this.UnionModel = {
            projectBeginTime: undefined,
            projectEndTime: undefined,
            inputUnionTime: undefined,
            inputImgUrl: undefined,
            inputImgName: undefined,
          };
          this.url = "";
          this.srcList = [];
        }
      }
      console.log(res);
    },
    formattime(item) {
      let date = new Date(parseInt(item));
      let Y = date.getFullYear() + "-";
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      let D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      let h =
        date.getHours() < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      let m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    submitForm() {
      this.$refs["TheMeasurementUnit"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    // 检查内容
    async CheckReportTeam() {
      let res = await this.$api.API_CheckReportTeam();
      if (res.code === 20000) {
        this.gridData = res.data;
      }
    },
    // 生成默认值
    textChangeHandler() {
      this.reportTimepdate();

      // console.log(date.getTime());
    },
    async reportTimepdate() {
      var date = new Date();
      let dataTs = date.getFullYear() + "";
      // console.log(this.info.user_info.companyCode);
      if (this.info.user_info.companyCode != null) {
        let ks = "";
        let formatDate1 = new Date(this.assessmentGroup.reportTime);
        let formatDate2 = new Date("2021-11-24 00:00:00");
        console.log(formatDate1, formatDate2);
        if (formatDate1 >= formatDate2) {
          ks = this.info.user_info.companyId == 2 ? "0160" : "0050";
        } else {
          ks = `${this.info.user_info.companyCode.substring(
            this.info.user_info.companyCode.length - 6
          )}`;
        }
        let lst = `${this.xmu_info.data.recordSn}-${dataTs.substring(
          2,
          4
        )}-${ks}-0${this.assessmentGroup.annualReview}`;
        let Nmas = `${this.xmu_info.data.evaluatedUnit}_${this.xmu_info.data.systemName}_测评报告`;
        this.assessmentGroup.reportNum = lst;
        this.assessmentGroup.recordSn = this.xmu_info.data.recordSn;
        this.assessmentGroup.reportName = Nmas;
      }
    },
    selectChange(provinceName, cityNmae) {
      this.provincesCities = provinceName;
      this.districtCounty = cityNmae;
    },
    async getEtlist() {
      // 获取列表
      let res = await this.$api.API_wordFindList();
      // console.log(res);
      let timeout = "";
      clearTimeout(timeout);
      if (res.code === 20000) {
        this.reportGeneratingRecords = res.data;
        res.data.forEach((item) => {
          if (item.status !== 1 && item.status !== 2) {
            if (!timeout) {
              timeout = setTimeout(() => {
                // console.log(item.computerRoomName);
                this.getEtlist();
              }, 2000);
            }
          }
        });
        // setInterval(() => {
        //   this.getEtlist();
        // }, 2000);
      }
    },
    async submitReport() {
      this.$refs["assessmentGroup"].validate(async (valid) => {
        if (!valid) return;
        // TODO 提交表单
        let versions =
          window.sessionStorage.getItem("radiomstjisfen") == 0 ? 2019 : 2021;
        this.assessmentGroup.versions = versions;
        let res = await this.$api.API_wordGenerGate(this.assessmentGroup);
        if (res.code === 20000) {
          this.getEtlist();
        } else {
          this.$message.error("制作失败");
        }
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
    reportGeneratingDelete(val, row) {
      this.$confirm("确定删除此记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$api.API_wordDelete({ id: row.id });
          if (res.code === 20000) {
            this.$message.success("删除成功！！");
            this.getEtlist();
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
    async reportGenerriskrip() {
      let res = await this.$api.reportGenEdit();
      if (res.data) {
        this.submitReport();
      } else {
        this.$confirm(
          "有不符合的高风险测评项没有进行修正，确定导出报告？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => { 
            this.submitReport();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      }
    },
    //生成报告
    async reportGeneratingEdit(val) {
      if (val.status == 1) {
        let url = `/reportWord/${val.fileName}`;
        let res = await this.$api.SYS_reportWord_DownLoadDoc({ url });
        if (res.code == 500) {
          alert(res.message);
        } else {
          let blob = new Blob([res], {
            type: "application/msword;charset=utf-8",
          });

          //浏览器兼容，Google和火狐支持a标签的download，IE不支持
          if (window.navigator && window.navigator.msSaveBlob) {
            //IE浏览器、微软浏览器
            /* 经过测试，微软浏览器Microsoft Edge下载文件时必须要重命名文件才可以打开，
              IE可不重命名，以防万一，所以都写上比较好 */
            window.navigator.msSaveBlob(blob, val.fileName);
          } else {
            //其他浏览器
            let link = document.createElement("a"); // 创建a标签
            link.style.display = "none";
            let objectUrl = URL.createObjectURL(blob);
            link.download = `${val.reportName}.docx`;
            link.href = objectUrl;
            link.click();
            URL.revokeObjectURL(objectUrl);
          }
        }
      } else {
        this.$message.error("当前状态不支持下载");
      }
    },
    // 失败原因
    reportGeneratingsbai(item) {
      this.$alert(item.failedReason, "失败原因", {
        confirmButtonText: "确定",
        type: "warning",
        callback: (action) => {},
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mude_is {
  margin: 10px 0;
  .mude_is_left {
    margin: 10px 0;
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
.ksLismu {
  cursor: pointer;
}
.ksLismu:hover {
  color: blue;
  border-bottom: red 1px solid;
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
.jineginfo {
  margin-left: 10px;
  display: flex;
  // justify-content: space-around;
  // align-items: center;
  font-size: 14px;
  color: #606266;
  div {
    flex: 1;
    margin: 0 0 15px 0;
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
</style>

