<template>
  <d2-container class="page">
    <div class="page_name" style="padding: 0 20px 20px 20px">
      <div class="search_ls">
        <div>
          <span class="search_ls_name"> 项目/系统名称：</span>
          <el-input
            placeholder="请输入内容"
            v-model="projectModel.projectName"
            @input="searchBi"
            size="small"
            clearable
          ></el-input>
        </div>
        <!-- <div>
          <el-button
            icon="el-icon-search"
            type="primary"
            size="small"
            @click="searchBi"
            circle
          ></el-button>
        </div>  -->
        <div>
          <span class="search_ls_name"> 项目状态：</span>
          <el-select
            v-model="projectModel.queryType"
            @change="searchBi"
            placeholder="请选择"
            clearable
            size="small"
          >
            <el-option
              v-for="item in optionStatus"
              :key="item.value"
              :label="item.title"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <span class="search_ls_name"> 是否录入联盟：</span>
          <el-select
            v-model="projectModel.isInputUnion"
            @change="searchBi"
            placeholder="请选择"
            clearable
            size="small"
          >
            <el-option
              v-for="item in isInputUnionopTlist"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <span class="search_ls_name">创建人：</span>
          <el-select
            v-model="projectModel.creator"
            @change="searchBi"
            placeholder="请选择"
            clearable
            filterable
            size="small"
          >
            <el-option
              v-for="item in ksrenyuanList"
              :key="item.value"
              :label="item.userName"
              :value="item.userId"
            >
            </el-option>
          </el-select>
        </div>
        <div v-if="info.userTypeId != 10 && info.userTypeId != 16">
          <el-button size="small" @click="dialogFormVisibleList" type="primary"
            ><i class="el-icon--left el-icon-circle-plus-outline"></i
            >新增</el-button
          >
        </div>
      </div>
    </div>
    <div class="page_ts">
      <el-container>
        <el-main style="padding: 0 20px 20px 20px">
          <el-col class="box-card">
            <el-card shadow="hover">
              <div>
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  :header-cell-style="{
                    'background-color': 'rgba(238, 238, 238,1.0)',
                  }"
                >
                  <el-table-column label="选择" width="80">
                    <template slot-scope="scope">
                      <p style="text-align: center">
                        <el-radio
                          size="medium"
                          v-model="radio_projectId"
                          @change="optionTo(scope.row)"
                          :label="scope.row.projectId"
                        >
                          {{ "" }}
                        </el-radio>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="优先级" width="60">
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <el-tooltip
                          class="item"
                          effect="light"
                          content="正常"
                          placement="top-start"
                          v-if="scope.row.projectPriority == 0"
                        >
                          <span style="color: #58d68d; font-size: 20px">
                            <d2-icon name="exclamation-triangle" />
                          </span>
                        </el-tooltip>
                        <el-tooltip
                          class="item"
                          effect="light"
                          content="紧急"
                          placement="top-start"
                          v-if="scope.row.projectPriority == 1"
                        >
                          <span style="color: #f4d03f; font-size: 20px">
                            <d2-icon name="exclamation-triangle" />
                          </span>
                        </el-tooltip>
                        <el-tooltip
                          class="item"
                          effect="light"
                          content="特批加急"
                          placement="top-start"
                          v-if="scope.row.projectPriority == 2"
                        >
                          <span style="color: red; font-size: 20px">
                            <d2-icon name="exclamation-triangle" />
                          </span>
                        </el-tooltip>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="重点抽查项目" width="60">
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <span>{{
                          scope.row.important == 1 ? "是" : "否"
                        }}</span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="报告优先级" width="80">
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <el-tooltip
                          class="item"
                          effect="light"
                          content="正常"
                          placement="top-start"
                          v-if="scope.row.reportPriority == 1"
                        >
                          <span style="color: #58d68d; font-size: 20px">
                            <d2-icon name="exclamation-triangle" />
                          </span>
                        </el-tooltip>
                        <el-tooltip
                          class="item"
                          effect="light"
                          content="紧急"
                          placement="top-start"
                          v-if="scope.row.reportPriority == 2"
                        >
                          <span style="color: #f4d03f; font-size: 20px">
                            <d2-icon name="exclamation-triangle" />
                          </span>
                        </el-tooltip>
                        <el-tooltip
                          class="item"
                          effect="light"
                          content="特批加急"
                          placement="top-start"
                          v-if="scope.row.reportPriority == 3"
                        >
                          <span style="color: red; font-size: 20px">
                            <d2-icon name="exclamation-triangle" />
                          </span>
                        </el-tooltip>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="方案优先级" width="80">
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <el-tooltip
                          class="item"
                          effect="light"
                          content="正常"
                          placement="top-start"
                          v-if="scope.row.planPriority == 1"
                        >
                          <span style="color: #58d68d; font-size: 20px">
                            <d2-icon name="exclamation-triangle" />
                          </span>
                        </el-tooltip>
                        <el-tooltip
                          class="item"
                          effect="light"
                          content="紧急"
                          placement="top-start"
                          v-if="scope.row.planPriority == 2"
                        >
                          <span style="color: #f4d03f; font-size: 20px">
                            <d2-icon name="exclamation-triangle" />
                          </span>
                        </el-tooltip>
                        <el-tooltip
                          class="item"
                          effect="light"
                          content="特批加急"
                          placement="top-start"
                          v-if="scope.row.planPriority == 3"
                        >
                          <span style="color: red; font-size: 20px">
                            <d2-icon name="exclamation-triangle" />
                          </span>
                        </el-tooltip>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="项目名称" min-width="250px">
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <span class="optionTo_name">{{
                          scope.row.projectName
                        }}</span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="系统名称" min-width="200px">
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <span>{{ scope.row.systemName }}</span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="等保等级" width="80">
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <span>{{ scope.row.level }}</span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-if="info.userTypeId != 10"
                    label="创建人"
                    width="120"
                  >
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <span>{{ scope.row.creatorName }}</span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-if="info.userTypeId != 10"
                    label="创建时间"
                    width="100"
                  >
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <span>{{
                          timestampToTime(scope.row.createdTime)
                        }}</span>
                      </p>
                    </template>
                  </el-table-column>

                  <el-table-column
                    v-if="info.userTypeId == 10"
                    label="提交人"
                    width="120"
                  >
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <span>{{ scope.row.reviewSendName }}</span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-if="info.userTypeId == 10"
                    label="提交审批时间"
                    width="150"
                  >
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <span>{{ timestampToTime(scope.row.reviewTime) }}</span>
                      </p>
                    </template>
                  </el-table-column>

                  <el-table-column label="状态" width="100">
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <span>{{ scope.row.status }}</span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-if="
                      info.user_info.userType == 1
                        ? true
                        : info.user_info.userType == 2
                        ? true
                        : info.userTypeId == 10 && info.user_info.userType == 3
                    "
                    label="审核人员"
                    width="100"
                  >
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <span>{{ scope.row.approvedName }}</span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-if="info.userTypeId == 10 && info.user_info.userType == 3"
                    label="派单状态"
                    width="100"
                  >
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <span v-if="scope.row.isSend == 0">未派单</span>
                        <span v-else>已派单</span>
                      </p>
                    </template>
                  </el-table-column>
                  <!-- v-if="info.userTypeId == 16" -->
                  <el-table-column label="是否录入联盟" width="80">
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <span v-if="scope.row.isInputUnion == 1">否</span>
                        <span v-else>是</span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="联盟通过时间" width="120">
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <span>{{ scope.row.unionPassTime }}</span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="打卡到达时间" width="120">
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <span>{{ scope.row.arriveTime }}</span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="打卡离开时间" width="120">
                    <template slot-scope="scope">
                      <p
                        :class="
                          radio_projectId == scope.row.projectId
                            ? 'blue-class'
                            : ''
                        "
                      >
                        <span>{{ scope.row.leaveTime }}</span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    :width="info.userTypeId == 16 ? '250' : '150'"
                  >
                    <template slot-scope="scope">
                      <div
                        v-if="info.userTypeId !== 10 && info.userTypeId !== 16"
                      >
                        <el-button
                          size="mini"
                          type="primary"
                          @click="xmuupdata(scope.$index, scope.row)"
                          >修改</el-button
                        >
                        <el-button
                          size="mini"
                          type="danger"
                          @click="xmuDelete(scope.$index, scope.row)"
                          >删除</el-button
                        >
                      </div>
                      <div class="ms_zk_bomm_css" v-if="info.userTypeId == 10">
                        <div>
                          <el-button
                            v-if="info.user_info.userType == 3"
                            size="mini"
                            type="primary"
                            @click="Listpaidan(scope.row)"
                            >派单</el-button
                          >
                          <el-button
                            size="mini"
                            @click="pingshengList(scope.row)"
                            type="primary"
                            >评审</el-button
                          >
                        </div>
                        <div>
                          <el-button
                            size="mini"
                            @click="piengList(scope.row, 0)"
                            type="warning"
                            >初审</el-button
                          >
                          <el-button
                            size="mini"
                            @click="piengList(scope.row, 1)"
                            type="warning"
                            >终审</el-button
                          >
                        </div>
                      </div>
                      <div v-if="info.userTypeId == 16">
                        <el-button
                          size="mini"
                          type="primary"
                          @click="lvTopks(scope.row)"
                          >录入联盟</el-button
                        >
                        <el-button
                          size="mini"
                          type="primary"
                          @click="lvdaka(scope.row)"
                          >录入打卡</el-button
                        >
                      </div>
                      <!-- <el-button size="mini" @click="truexmuList(scope.row)"
                        >复制</el-button
                      > -->
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
        </el-main>
      </el-container>
    </div>
    <div class="page_name" style="padding: 0 20px 20px 20px">
      <div class="search_ls">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="projectModel.page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="projectModel.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 新增表单 -->
    <div class="add_from_xmu">
      <el-dialog
        style="min-width: 960px"
        :close-on-click-modal="false"
        :title="table_name_el"
        :visible.sync="dialogFormVisible"
      >
        <el-form :model="xmform" :rules="rules" ref="xmform">
          <el-form-item label="选择项目" :label-width="formLabelWidth">
            <el-select
              style="width: 350px"
              v-model="xmulistId"
              filterable
              @change="getList(xmulistId)"
              placeholder="请选择"
            >
              <el-option
                v-for="item in xmuListoptions"
                :key="item.id"
                :label="item.projectName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择系统" :label-width="formLabelWidth">
            <el-select
              style="width: 350px"
              v-model="xtUliId"
              @change="getxtList(xtUliId)"
              placeholder="请选择"
            >
              <el-option
                v-for="item in xTListoptions"
                :key="item.id"
                :label="item.sysName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="优先级"
            :label-width="formLabelWidth"
            prop="projectPriority"
          >
            <el-select
              v-model="xmform.projectPriority"
              disabled
              placeholder="请选择优先级"
              clearable
            >
              <el-option
                v-for="(item, index) in projectPriorityOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="项目编号"
            :label-width="formLabelWidth"
            prop="contractSn"
          >
            <el-input
              v-model="xmform.contractSn"
              clearable
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="项目名称"
            :label-width="formLabelWidth"
            prop="projectName"
          >
            <el-input
              v-model="xmform.projectName"
              clearable
              disabled
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="系统名称"
            :label-width="formLabelWidth"
            prop="systemName"
          >
            <el-input
              v-model="xmform.systemName"
              clearable
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="被测单位名称"
            :label-width="formLabelWidth"
            prop="evaluatedUnit"
          >
            <el-input
              v-model="xmform.evaluatedUnit"
              clearable
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="备案证明编号"
            :label-width="formLabelWidth"
            prop="recordSn"
          >
            <el-input
              type="text"
              v-model="xmform.recordSn"
              maxlength="17"
              ref="cardInput"
              placeholder="请输入格式为xxxxxxxxxxx-xxxxx"
              @input="formatCardNumber(xmform.recordSn)"
            ></el-input>
          </el-form-item>
          <div class="ist_lis">
            <div>
              <el-form-item label="等保等级" :label-width="formLabelWidth">
                <el-select
                  v-model="xmform.level"
                  :disabled="ua_cre == 1 ? true : false"
                  @change="selectGoodsByGroupId($event)"
                >
                  <el-option
                    v-for="item in levellist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="SAG等级" :label-width="formLabelWidth">
                <el-select
                  :disabled="ua_cre == 1 ? true : false"
                  v-model="xmform.sag"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in saglist"
                    :key="item.id"
                    :label="item.sagCombination"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <span
            style="
              color: red;
              font-size: 12px;
              display: block;
              margin-top: -20px;
              text-align: right;
              margin-right: 12px;
              margin-bottom: 15px; /* position: absolute; */ /* top: 0; */
            "
          >
            业务信息安全等级 - S， 系统服务安全等级 - A
          </span>
          <div class="ist_lis">
            <div>
              <el-form-item label="标准体系" :label-width="formLabelWidth">
                <el-select
                  v-model="xmform.standard"
                  :disabled="ua_cre == 1 ? true : false"
                  @change="selectTrigger(xmform.standard)"
                >
                  <el-option
                    v-for="item in standardlist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="标准版本" :label-width="formLabelWidth">
                <el-select
                  :disabled="ua_cre == 1 ? true : false"
                  v-model="xmform.standardVersion"
                >
                  <!-- <div v-if="">

                  </div> -->
                  <el-option
                    v-for="item in standardVersionlist[xmform.standard].value"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="ist_lis">
            <div>
              <el-form-item label="扩展标准" :label-width="formLabelWidth">
                <el-select
                  v-model="xmform.standardExtends"
                  multiple
                  :disabled="ua_cre == 1 ? true : false"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in standardExtend_list"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <!-- <div>
              <el-form-item
                label="是否使用新版指导书"
                prop="isNewBook"
                label-width="150px"
              >
                <el-radio v-model="xmform.isNewBook" :label="1">否</el-radio>
                <el-radio v-model="xmform.isNewBook" :label="2">是</el-radio>
              </el-form-item>
            </div> -->
          </div>

          <el-form-item
            label="项目参与人"
            prop="membersIdList"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="xmform.membersIdList"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in membersIdLists"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="项目状态"
            prop="status"
            :label-width="formLabelWidth"
          >
            <el-select v-model="xmform.status" placeholder="请选择">
              <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="项目复制"
            prop="itemList"
            v-if="ua_cre == 0"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="xmform.itemList"
              filterable
              clearable
              :filter-method="filterList"
              @change="xuanmufuzList()"
              placeholder="请选择"
            >
              <el-option
                v-for="item in tableDataListfenduan"
                :key="item.projectId"
                :label="item.projectName"
                :value="item.projectId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <div class="dia-footer">
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('xmform', ua_cre)"
                v-throttle
                >保存</el-button
              >
              <!-- <el-button type="danger" v-if="ua_cre != 1 " @click="resetForm('xmform')"
                >重置</el-button
              > -->
              <el-button @click="dialogFormVisib">取 消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <!-- 复制 -->
      <el-dialog
        title="复制项目"
        :close-on-click-modal="false"
        :visible.sync="diaprojectName"
      >
        <el-form
          ref="copyProjec"
          :model="copyProjec"
          :rules="rules"
          size="medium"
          label-width="120px"
          label-position="left"
        >
          <el-form-item label="当前项目：" prop="copyname">
            <span>
              {{ copyProjec.copyname }}
            </span>
          </el-form-item>
          <el-form-item label="项目名称：" prop="projectName">
            <el-input
              v-model="copyProjec.projectName"
              placeholder="请输入项目名称"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="系统名称：" prop="systemName">
            <el-input
              v-model="copyProjec.systemName"
              placeholder="请输入系统名称"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="diaprojectName = false">取消</el-button>
          <el-button type="primary" @click="openList">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="add_from_xmu">
      <el-dialog
        style="min-width: 660px"
        :close-on-click-modal="false"
        title="派单"
        :visible.sync="paidanFormVisible"
      >
        <el-form
          ref="paidanginfo"
          :model="paidanginfo"
          :rules="rules"
          size="medium"
          label-width="140px"
          label-position="left"
        >
          <el-form-item label="报告来源" prop="out">
            <el-radio-group v-model="paidanginfo.out" size="medium">
              <el-radio
                v-for="(item, index) in outOptions"
                :key="index"
                disabled
                :label="item.value"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="技术部分审核" prop="technologyName">
            <span>{{ paidanginfo.technologyName }}</span>
            <!-- <el-input
              v-model="paidanginfo.technologyName"
              placeholder="请输入技术部分审核"
              clearable
              :style="{ width: '100%' }"
            ></el-input> -->
          </el-form-item>
          <!-- <el-form-item label="质控人员" prop="sendId">
            <el-select
              v-model="paidanginfo.sendId"
              placeholder="请选择下拉选择质控人员"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in sendIdOptions"
                :key="index"
                :label="item.userName"
                :value="item.userId"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="重点抽查项目" prop="important">
            <el-radio-group v-model="paidanginfo.important" size="medium">
              <el-radio
                v-for="(item, index) in importantOptions"
                :key="index"
                :label="item.value"
                :disabled="item.disabled"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="技术部分审核员" prop="technologySendId">
            <el-select
              v-model="paidanginfo.technologySendId"
              placeholder="请选择技术部分审核员"
              clearable
              multiple
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in sendIdOptions"
                :key="index"
                :label="item.userName"
                :value="item.userId"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="非技术部分审核员" prop="untechnologySendId">
            <el-select
              v-model="paidanginfo.untechnologySendId"
              placeholder="请选择非技术部分审核员"
              clearable
              multiple
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in sendIdOptions"
                :key="index"
                :label="item.userName"
                :value="item.userId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="dia-footer">
          <el-button type="primary" @click="paidangtijoap()" v-throttle
            >保存</el-button
          >
          <!-- <el-button type="danger" v-if="ua_cre != 1 " @click="resetForm('xmform')"
                >重置</el-button
              > -->
          <el-button @click="paidanFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 录入联盟 -->
    <el-drawer
      :title="drawertitle.name"
      :visible.sync="drawer"
      :direction="direction"
      size="50%"
      :before-close="handleClose"
    >
      <div class="ruList">
        <div class="page_name" style="padding: 0 20px 20px 20px">
          <el-row v-if="drawertitle.id == 1" :gutter="10">
            <div class="page_test page_test_xx">
              <el-row>
                <el-col :span="5"
                  ><div class="renwuName">项目开始时间</div></el-col
                >
                <el-col :span="19"
                  ><div>
                    {{
                      UnionModel.projectBeginTime
                        ? UnionModel.projectBeginTime
                        : "----"
                    }}
                  </div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="5"
                  ><div class="renwuName">项目结束时间</div></el-col
                >
                <el-col :span="19"
                  ><div>
                    {{
                      UnionModel.projectEndTime
                        ? UnionModel.projectEndTime
                        : "----"
                    }}
                  </div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="5"
                  ><div class="renwuName">录入联盟时间</div></el-col
                >
                <el-col :span="19"
                  ><div>
                    {{
                      UnionModel.inputUnionTime
                        ? UnionModel.inputUnionTime
                        : "----"
                    }}
                  </div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="5"
                  ><div class="renwuName">联盟通过时间</div></el-col
                >
                <el-col :span="19"
                  ><div>
                    {{
                      UnionModel.unionPassTime
                        ? UnionModel.unionPassTime
                        : "----"
                    }}
                  </div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="5"
                  ><div class="renwuName">联盟平台通过截图</div></el-col
                >
                <el-col :span="19"
                  ><div
                    class="ksLismu"
                    @click="fujiancalss(UnionModel.inputImgUrl)"
                  >
                    {{
                      UnionModel.inputImgName ? UnionModel.inputImgName : "----"
                    }}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-row>
          <el-row v-if="drawertitle.id == 2" :gutter="10">
            <div class="page_test page_test_xx">
              <el-row>
                <el-col :span="5"
                  ><div class="renwuName">打卡到达时间</div></el-col
                >
                <el-col :span="19"
                  ><div>
                    {{
                      inpuniondel.arriveTime ? inpuniondel.arriveTime : "----"
                    }}
                  </div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="5"
                  ><div class="renwuName">打卡离开时间</div></el-col
                >
                <el-col :span="19"
                  ><div>
                    {{ inpuniondel.leaveTime ? inpuniondel.leaveTime : "----" }}
                  </div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="5"><div class="renwuName">打卡人员</div></el-col>
                <el-col :span="19"
                  ><div
                    v-for="(it, index) in inpuniondel.clockPeopleStr"
                    :key="index"
                  >
                    {{ it }}
                  </div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="renwuName">打卡上传附件</div></el-col
                >
                <el-col :span="17">
                  <div v-for="it in inpuniondel.fileList" :key="it.fileId">
                    <span class="ksLismu" @click="fujiancalss(it.fileUrl)">{{
                      it.fileName
                    }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-row>
          <div class="buLitop">
            <div>
              <el-button size="mini" @click="resetFormlv">取消</el-button>
              <template>
                <el-button
                  size="mini"
                  v-if="drawertitle.id == 1"
                  type="info"
                  @click="updatabmitForm"
                  >修改</el-button
                >
                <el-button
                  size="mini"
                  v-if="drawertitle.id == 2"
                  type="info"
                  @click="databmitdak"
                  >修改</el-button
                >
                <!-- <el-button size="mini" type="primary" @click="luformsList"
                  >新建</el-button
                > -->
                <el-button
                  size="mini"
                  v-if="drawertitle.id == 1"
                  type="danger"
                  @click="deleTlist"
                  >删除</el-button
                >
              </template>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
    <div>
      <el-dialog
        :title="lvru.name"
        :visible.sync="lurudialogVisible"
        width="50%"
      >
        <el-row>
          <el-form
            ref="inputUnionModel"
            :model="inputUnionModel"
            size="medium"
            label-width="180px"
            label-position="left"
          >
            <el-col :span="18">
              <el-form-item label="项目开始时间" prop="projectBeginTime">
                <el-date-picker
                  v-model="inputUnionModel.projectBeginTime"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :style="{ width: '100%' }"
                  placeholder="请选择项目开始时间"
                  clearable
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="项目结束时间" prop="projectEndTime">
                <el-date-picker
                  v-model="inputUnionModel.projectEndTime"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :style="{ width: '100%' }"
                  placeholder="请选择结束开始时间"
                  clearable
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="录入联盟时间" prop="inputUnionTime">
                <el-date-picker
                  v-model="inputUnionModel.inputUnionTime"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :style="{ width: '100%' }"
                  placeholder="请选择录入联盟时间"
                  clearable
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="联盟通过时间" prop="unionPassTime">
                <el-date-picker
                  v-model="inputUnionModel.unionPassTime"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :style="{ width: '100%' }"
                  placeholder="请选择录入联盟时间"
                  clearable
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="联盟平台通过截图">
                <el-upload
                  class="upload-demo"
                  action
                  ref="doctypeCrfile"
                  :limit="1"
                  :file-list="formFileList"
                  :http-request="handleUploadForm"
                  :on-exceed="formHandleExceed"
                  :on-remove="formHandleRemove"
                  :before-upload="beforeUploadForm"
                  :before-remove="beforeRemove"
                  :auto-upload="false"
                >
                  <el-button type="primary">上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="lurudialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="ListxiaoMlit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 打卡 -->
    <el-dialog
      title="录入打卡"
      :visible.sync="dakaiVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <el-form
          ref="inpuniondel"
          :model="inpuniondel"
          :rules="rules"
          size="medium"
          label-width="140px"
          label-position="left"
        >
          <el-form-item label="打卡到达时间" prop="arriveTime">
            <el-date-picker
              v-model="inpuniondel.arriveTime"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :style="{ width: '100%' }"
              placeholder="请选择打卡离开时间"
              clearable
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="打卡离开时间" prop="leaveTime">
            <el-date-picker
              v-model="inpuniondel.leaveTime"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :style="{ width: '100%' }"
              placeholder="请选择打卡离开时间"
              clearable
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="打卡人员" prop="clockPeople">
            <el-select
              v-model="inpuniondel.clockPeople"
              placeholder="请选择打卡人员"
              multiple
              filterable
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in clockPeopleOptions"
                :key="index"
                :label="item.userName"
                :value="item.userId"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="打卡平台截图">
            <el-upload
              class="upload-demo"
              action
              ref="dakahandleUp"
              :limit="10"
              :file-list="formFileList"
              :http-request="dakahandleUploadForm"
              :on-exceed="formHandleExceed"
              :on-remove="formHandleRemove"
              :before-upload="beforeUploadForm"
              :before-remove="beforeRemove"
              :on-change="fileChange"
              :auto-upload="false"
            >
              <el-button type="primary">上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dakaiVisible = false">取 消</el-button>
        <el-button type="primary" @click="ddleUploadForm">确 定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {
    queryType: "",
  },
  data() {
    return {
      dakaiVisible: false,
      drawertitle: {
        id: 1,
        name: "录入联盟",
      },
      lvru: {
        name: "新建录入联盟",
        id: 1,
      },
      UnionModel: {
        projectBeginTime: undefined,
        projectEndTime: undefined,
        inputUnionTime: undefined,
        inputImgUrl: undefined,
        inputImgName: undefined,
        unionPassTime: undefined,
      },
      inpuniondel: {
        arriveTime: null,
        leaveTime: null,
        clockPeople: [],
      },
      ksrenyuanList: [],
      formMaxSize: 10, // 上传文件大小
      formFileList: [], // 显示上传文件
      dakformFileList: [],
      uploadFormFileList: [], // 确定上传文件
      lianmList: "",
      lurudialogVisible: false,
      //合同 项目列表
      xmulistId: "",
      xmuListoptions: [],
      // 系统
      xtUliId: "",
      drawer: false,
      direction: "rtl",
      xTListoptions: [],
      // 项目是否进行
      statusList: [
        { id: 1, value: "进行中" },
        { id: 2, value: "已完成" },
      ],
      inputUnionModel: {
        projectBeginTime: undefined,
        projectEndTime: undefined,
        inputUnionTime: undefined,
        inputImgUrl: undefined,
        inputImgName: undefined,
        unionPassTime: undefined,
      },
      rulesinputUnionModel: {},
      radio_projectId: 0,
      total: 0,
      ua_cre: 0, //0创建 1更新
      table_name_el: "新建项目",
      account: "",
      getTimeDate: "",
      its_id_to: 2,
      tableDataList: [],
      tableDataListfenduan: [],
      tableData: [],
      // 标准体系列表
      standardlist: [
        { label: "老国标", value: 1 },
        { label: "新国标（2017试行版）", value: 2 },
        { label: "新国标", value: 3 },
      ],
      //行业列表
      standardVersionlist: [
        {},
        {
          id: 1,
          value: [
            { label: "默认", value: 1 },
            { label: "电力(生产控制信息系统类)", value: 2 },
            { label: "电力(管理信息系统)", value: 3 },
            { label: "证券期货行业", value: 4 },
            { label: "金融行业", value: 5 },
            { label: "云计算", value: 6 },
            { label: "税务(试行)(平行权重)", value: 7 },
            { label: "烟草", value: 8 },
            { label: "征信(上海)", value: 9 },
          ],
        },
        {
          id: 2,
          value: [{ label: "试行搞(2017-10-26)", value: 1 }],
        },
        {
          id: 3,
          value: [
            { label: "GBT22239-2019", value: 1 },
            { label: "广电行业", value: 12 },
            { label: "金融行业", value: 5 },
          ],
        },
      ],
      //等级保护
      levellist: [
        { label: "第一级", value: 1 },
        { label: "第二级", value: 2 },
        { label: "第三级", value: 3 },
        { label: "第四级", value: 4 },
      ],
      //sag  1：S1A3G3，2：S2A3G3，3：S3A3G3，4：S3A2G3，5：S3A1G3
      saglist: [
        { label: "S1A3G3", value: 1 },
        { label: "S2A3G3", value: 2 },
        { label: "S3A3G3", value: 3 },
        { label: "S3A2G3", value: 4 },
        { label: "S3A1G3", value: 5 },
      ],
      // 扩展标准
      standardExtend_list: [
        { label: "云计算安全扩展要求", value: 2 },
        { label: "移动互联安全扩展要求", value: 3 },
        { label: "物联网安全扩展要求", value: 4 },
        { label: "工业控制系统安全扩展要求", value: 5 },
        { label: "大数据安全扩展要求", value: 6 },
      ],
      xmudan: {},
      membersIdLists: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      diaprojectName: false,
      xmform: {
        projectName: "", //COMMENT '项目名称
        systemName: "", //系统名称
        evaluatedUnit: "", //被测单位名称
        recordSn: "", //备案证明编号
        standard: 3, //标准体系.1：老国标，2：新国标（2017试行版），3：新国标
        standardVersion: 1, // '拓展版本.1：默认，2：电力(生产控制信息系统类)，3：电力(管理信息系统)，4：证券期货行业，5：金融行业，6：云计算，7：税务(试行)(平行权重)，8：烟草，9：征信(上海),10：试行稿(2017-10-26)，11：GBT22239-2019',
        standardExtends: "", //拓展标准
        level: 2, //等保等级.1：第一级，2：第二级，3：第三级，4：第四级
        sag: "", //SAG等级.1：S1A3G3，2：S2A3G3，3：S3A3G3，4：S3A2G3，5：S3A1G3
        membersIdList: [], //项目参与人
        status: 1,
        itemList: null,
        projectPriority: "",
        contractSn: "",
        isNewBook: 1,
      },
      ptPriorityOptions: [
        // 正常，紧急，特批加急 （默认：正常）
        {
          label: "正常",
          value: 1,
        },
        {
          label: "紧急",
          value: 2,
        },
        {
          label: "特批加急",
          value: 3,
        },
      ],
      projectPriorityOptions: [
        // 正常，紧急，特批加急 （默认：正常）
        {
          label: "正常",
          value: 0,
        },
        {
          label: "紧急",
          value: 1,
        },
        {
          label: "特批加急",
          value: 2,
        },
      ],
      optionStatus: [
        { title: "请选择", value: 0 },
        { title: "进行中", value: 1 },
        { title: "我创建的项目", value: 2 },
        { title: "已完成", value: 3 },
        { title: "生成报告", value: 4 },
        { title: "提交审核", value: 5 },
        { title: "审核中", value: 6 },
        { title: "完成初审", value: 7 },
        { title: "完成终审", value: 8 },
      ],
      isInputUnionopTlist: [
        { id: 1, value: "否" },
        { id: 2, value: "是" },
      ],
      projectModel: {
        page: 1,
        pageSize: 20,
        projectName: "",
        queryType: "",
        isInputUnion: "",
        creator: "",
      },
      formLabelWidth: "120px",
      projectIdks: null,
      // 录入联盟

      // 复制
      copyProjec: {
        copyname: "",
        projectName: "",
        systemName: "",
        projectId1: "",
        userId: "",
      },
      rules: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
        systemName: [
          { required: true, message: "请输入系统名称", trigger: "blur" },
        ],
        arriveTime: [
          {
            required: true,
            message: "请选择时间选择打卡到达时间",
            trigger: "change",
          },
        ],
        leaveTime: [
          {
            required: true,
            message: "请选择打卡离开时间",
            trigger: "change",
          },
        ],
        clockPeople: [
          {
            required: true,
            type: "array",
            message: "请至少选择一个打卡人员",
            trigger: "change",
          },
        ],
        out: [
          {
            required: true,
            message: "报告来源不能为空",
            trigger: "change",
          },
        ],
        technologyName: [],
        sendId: [
          {
            required: true,
            message: "请选择下拉选择质控人员",
            trigger: "change",
          },
        ],
        important: [],
        technologySendId: [
          {
            required: true,
            message: "请选择技术部分审核员",
            trigger: "change",
          },
        ],
        untechnologySendId: [
          {
            required: true,
            message: "请选择非技术部分审核员",
            trigger: "change",
          },
        ],
        // membersIdList: [
        //   { required: true, message: "请选择项目参与人", trigger: "blur" },
        // ],
      },
      clockPeopleOptions: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      // 派单
      paidanFormVisible: false,
      paidanginfo: {
        out: 0,
        technologyName: null,
        sendId: null,
        important: null,
        technologySendId: null,
        untechnologySendId: null,
      },
      radio_projectId: 0,
      isTtop: true,
      outOptions: [
        {
          label: "内部",
          value: 0,
        },
        {
          label: "外部",
          value: 1,
        },
      ],
      sendIdOptions: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      importantOptions: [
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ],
      technologySendIdOptions: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      untechnologySendIdOptions: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
    };
  },
  computed: {
    ...mapState("d2admin", {
      info: (state) => state.user.info,
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  components: {},
  created() {
    this.projectModel.queryType = this.queryType;
    this.ProjectQueryList();
    this.gEtksrenyuanList();
    this.findTelListfindPlan();
  },
  methods: {
    // 项目复制分段
    filterList(query = "") {
      let arr = this.tableDataList.filter((item) => {
        return item.projectName.includes(query);
      });
      if (arr.length > 20) {
        this.tableDataListfenduan = arr.slice(0, 20);
      } else {
        this.tableDataListfenduan = arr;
      }
    },
    // 初审终深
    piengList(row, type) {
      this.$confirm(`确定完成${type == 0 ? "初审" : "终审"}？`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$api.revifindListok({
            projectId: row.projectId,
          });
          if (res.code == 20000) {
            // this.tabList = ;
            let baokao = res.data.filter((item) => item.fileType == 1);
            this.$api
              .API_reporreviewFirst({
                type,
                projectId: row.projectId,
                userName: this.info.name,
                uploadName: baokao[0].userName,
              })
              .then(async () => {
                let ms = await this.$api.nishReviewdate({
                  type,
                  projectId: row.projectId,
                });
                if (ms.code == 20000) {
                  this.$message.success("确认成功");
                  this.ProjectQueryList();
                }
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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
      // 验证文件类型;
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension =
        testmsg === "JPG" ||
        testmsg === "jpg" ||
        testmsg === "jpeg" ||
        testmsg === "png" ||
        testmsg === "PNG" ||
        testmsg === "gif";
      if (!extension) {
        this.$message({
          message: "请上传jpg、jpeg、png或gif",
          type: "warning",
        });
      }
      return extension;
    },
    // 移除上传列表中文件
    async formHandleRemove(file, formFileList) {
      if (!file.raw) {
        let res = "";
        if (this.drawertitle.id == 1) {
          res = await this.$api.inpudelUnionImgImgon({
            fileName: file.name,
            projectId: this.lianmList.projectId,
          });
        }
        if (this.drawertitle.id == 2) {
          console.log(file);
          res = await this.$api.deleteFileImgImgon({
            id: file.id,
            projectId: this.lianmList.projectId,
          });
        }
        if (res.code === 20000) {
          // this.inputUnionModel.inputImgName=""
          // this.inputUnionModel.inputImgUrl = "";
          this.$message.success("删除成功！！");
          //查询列表
        } else {
          this.$message.error(res.message);
        }
      }
      let thiz = this;
      for (let i = 0; i < thiz.uploadFormFileList.length; i++) {
        if (thiz.uploadFormFileList[i].pname === file.name) {
          thiz.uploadFormFileList.splice(i, 1);
          break;
        }
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 允许上传文件个数验证
    formHandleExceed(files, formFileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + formFileList.length
        } 个文件`
      );
    },
    // 上传文件
    handleUploadForm(param) {
      let thiz = this;
      let formData = new FormData();
      formData.append("projectId", this.lianmList.projectId); // 额外参数
      formData.append("files", param.file);
      let loading = thiz.$loading({
        lock: true,
        text: "上传中，请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      // thiz.$http.post("/api/import/check/upload", formData)
      this.$api.GeupduploadUnionImgon(formData).then((data) => {
        if (data.code === 20000) {
          thiz.$message({
            message: "上传文件成功，" + data.message,
            type: "success",
          });
          if (data.data) {
            this.inputUnionModel.inputImgName =
              data.data[Object.keys(data.data)[0]];
            this.inputUnionModel.inputImgUrl = `${Object.keys(data.data)[0]}${
              data.data[Object.keys(data.data)[0]]
            }`;
          }
          this.TopLiuiPO();

          thiz.formFileList = [];
          thiz.uploadFormFileList = [];
          thiz.ifsTo = true;
        } else {
          thiz.formFileList = [];
          thiz.uploadFormFileList = [];
          thiz.$message("上传文件失败，" + data.message);
        }
      });

      loading.close();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 派单
    async Listpaidan(row) {
      Object.keys(this.paidanginfo).forEach((key) => {
        this.paidanginfo[key] = row[key];
      });
      this.optionTo(row);
      let res = await this.$api.userFindReviewok();
      this.sendIdOptions = res.data;
      this.paidanFormVisible = true;
      this.ProjectQueryList();
    },
    // 评审
    async pingshengList(row) {
      // let res = await this.Project_detail(row.projectId);
      // // 设置 vuex 用户信息
      // await this.$store.dispatch(
      //   "d2admin/xmu/set",
      //   {
      //     name: row.projectName,
      //     projectId: row.projectId,
      //     reviewId: row.reviewId,
      //     data: res,
      //   },
      //   {
      //     root: true,
      //   }
      // );
      this.paidanginfo.reviewId = row.reviewId;
      let res = await this.Project_detail(row.projectId);
      // 设置 vuex 用户信息
      await this.$store.dispatch(
        "d2admin/xmu/set",
        {
          name: row.projectName,
          projectId: row.projectId,
          reviewId: row.reviewId,
          data: res,
          row,
        },
        {
          root: true,
        }
      );
      this.$api.CalculateFractionTotalFraction();
      this.$router.push({ path: "demo/caculateReport/agent" });
    },
    // 派单提交
    async paidangtijoap() {
      this.$refs["paidanginfo"].validate(async (valid) => {
        if (!valid) return;
        this.paidanginfo.projectId = this.xmu_info.projectId;
        let res = await this.$api.userreviewSendReview(this.paidanginfo);
        if (res.code === 20000) {
          this.$message({
            message: "派单成功！！",
            type: "success",
          });
          this.paidanginfo = {
            out: 0,
            technologyName: null,
            sendId: null,
            important: null,
            technologySendId: null,
            untechnologySendId: null,
          };
          this.paidanFormVisible = false;
          this.ProjectQueryList();
        }
      });
    },
    // 搜索
    searchBi() {
      if (
        this.projectModel.projectName !== "" &&
        this.projectModel.projectName !== undefined
      ) {
        this.projectModel.page = 1;
        this.projectModel.pageSize > 20 ? this.total : 20;
      } else {
        this.projectModel.page = 1;
        this.projectModel.pageSize = 20;
      }

      this.ProjectQueryList();
    },
    // 分页
    handleSizeChange(val) {
      this.projectModel.pageSize = val;
      this.ProjectQueryList();
    },
    handleCurrentChange(val) {
      this.projectModel.page = val;
      this.ProjectQueryList();
    },
    //时间
    timestampToTime(timestamp) {
      if (!timestamp) {
        return "";
      }
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      // var D = date.getDate() + " ";
      var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate() + "";
      return Y + M + D;
    },
    formatCardNumber(cardNum) {
      // 获取input的dom对象，这里因为用的是element ui的input，所以需要这样拿到
      const input = this.$refs.cardInput.$el.getElementsByTagName("input")[0];
      // 获取当前光标的位置
      const cursorIndex = input.selectionStart;
      // 字符串中光标之前-的个数
      const lineNumOfCursorLeft = (
        cardNum.slice(0, cursorIndex).match(/-/g) || []
      ).length;
      // 去掉所有-的字符串
      const noLine = cardNum.replace(/-/g, "-");
      // 去除格式不对的字符并重新插入-的字符串
      const newCardNum = noLine
        .replace(/\D+/g, "")
        .replace(/(\d{11})/g, "$1-")
        .replace(/ $/, "-");
      // 改后字符串中原光标之前-的个数
      const newLineNumOfCursorLeft = (
        newCardNum.slice(0, cursorIndex).match(/-/g) || []
      ).length;
      // 光标在改后字符串中应在的位置
      const newCursorIndex =
        cursorIndex + newLineNumOfCursorLeft - lineNumOfCursorLeft;
      // 赋新值，nextTick保证-不能手动输入或删除，只能按照规则自动填入
      this.$nextTick(() => {
        this.xmform.recordSn = newCardNum;
        // 修正光标位置，nextTick保证在渲染新值后定位光标
        this.$nextTick(() => {
          // selectionStart、selectionEnd分别代表选择一段文本时的开头和结尾位置
          input.selectionStart = newCursorIndex;
          input.selectionEnd = newCursorIndex;
        });
      });
    },
    // 选择绑定
    selectTrigger(id) {
      this.its_id_to = id;
    },
    // 选择项目跳转
    async optionTo(row) {
      this.paidanginfo.reviewId = row.reviewId;
      let res = await this.Project_detail(row.projectId);
      // 设置 vuex 用户信息
      await this.$store.dispatch(
        "d2admin/xmu/set",
        {
          name: row.projectName,
          projectId: row.projectId,
          reviewId: row.reviewId,
          data: res,
          row,
        },
        {
          root: true,
        }
      );
      this.$api.CalculateFractionTotalFraction();
    },
    // 删除项目
    xmuDelete(index, row) {
      this.$confirm("确定删除此记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (this.xmu_info.projectId == row.projectId) {
            return this.$message.error("当前项目为选中项目，禁止删除！");
          }
          let res = await this.$api.API_department_delete({
            projectId: row.projectId,
          });
          if (res.code === 20000) {
            this.$message.success("删除成功！！");
            this.ProjectQueryList();
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
    // 等级联动
    async selectGoodsByGroupId(enent, sag) {
      let is = enent - 1;
      let res = await this.$api.API_SagFindSagByLevel({ sagLevel: enent });
      if (res.code === 20000) {
        this.saglist = res.data;
        if (sag) {
          this.xmform.sag = sag;
        } else {
          this.xmform.sag = res.data[is].id;
        }
      }
    },
    // 提交
    submitForm(formName, ua_cre) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.xmform.standardExtends.length == 0) {
            this.xmform.standardExtends = "";
          } else {
            this.xmform.standardExtends = this.xmform.standardExtends.join("┋");
          }
          // 创建
          if (ua_cre === 0) {
            // if()
            let msk =
              this.info.user_info.departmentId == 3 ||
              this.info.user_info.departmentId == 4 ||
              this.info.user_info.departmentId == 5 ||
              this.info.user_info.departmentId == 8 ||
              this.info.user_info.departmentId == 9;
            if (this.info.user_info.departmentId != 7) {
              if (this.xmulistId == "" || this.xmulistId == undefined) {
                return this.$message({
                  message: "请选择CRM上对应的项目/系统",
                  type: "error",
                });
              }
            }

            if (this.xmform.itemList !== undefined) {
              this.copyProjec.projectId1 = this.xmform.itemList;
              this.copyProjec.projectName = this.xmform.projectName;
              this.copyProjec.systemName = this.xmform.systemName;
              this.copyProjec.recordSn = this.xmform.recordSn;
              this.copyProjec.standardExtends = this.xmform.standardExtends;
              this.dialogFormVisible = false;
              return this.openList();
            }
            // console.log(this.xmform)
            const res = await this.$api.API_Project_Creation(this.xmform);
            if (res.code === 20000) {
              this.$message.success("创建成功！！");
              this.dialogFormVisible = false;
              this.ProjectQueryList();
              this.$api.API_findLisupdatem({
                evaluateProjectId: res.data,
                token: window.sessionStorage.getItem("ms_token"),
                id: this.xtUliId,
                isPenetration: this.xmform.isPenetration,
                childAmount: this.xmform.childAmount,
              });
              //查询列表
            } else {
              this.$message.error(res.message);
            }
            this.resetForm("xmform");
          } else if (ua_cre === 1) {
            // 修改
            const res = await this.$api.API_Project_updata(this.xmform);
            if (res.code === 20000) {
              this.$message({
                type: "success",
                message: "修改成功！！",
                duration: 1000,
              });
              this.$api.API_findLisupdatem({
                evaluateProjectId: this.projectIdks.projectId,
                token: window.sessionStorage.getItem("ms_token"),
                id: this.xtUliId,
                isPenetration: this.xmform.isPenetration,
                childAmount: this.xmform.childAmount,
              });
              this.dialogFormVisible = false;
              this.ProjectQueryList();
              this.resetForm("xmform");
              this.optionTo(this.projectIdks);
              //查询列表
            } else {
              this.$message.error(res.message);
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //查询项目
    async ProjectQueryList() {
      let res = await this.$api.API_Project_Query(this.projectModel);
      if (res.code === 20000) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      } else {
        this.$message.error(res.message);
      }
      if (this.xmu_info.projectId && this.xmu_info.projectId !== "undefined") {
        this.radio_projectId = this.xmu_info.projectId;
      }
    },
    //查询全部项目
    async ProjectfindAllList() {
      let res = await this.$api.API_Project_findAllList(this.projectModel);
      if (res.code === 20000) {
        this.tableDataList = res.data;
        this.tableDataListfenduan = this.tableDataList.slice(0, 50);
      } else {
        this.$message.error(res.message);
      }
    },
    //获取项目参与人
    async datalog_list_rom(id) {
      let userId = "";
      if (id && id !== "undefined") {
        userId = id;
      } else {
        userId = this.info.user_info.userId;
      }
      let res = await this.$api.API_department_List({ userId });
      if (res.code === 20000) {
        this.membersIdLists = res.data;
      } else {
        this.$message.error(res.message);
      }
    },
    // 新镇
    async dialogFormVisibleList() {
      this.ua_cre = 0;
      this.selectGoodsByGroupId(this.xmform.level);
      this.ProjectfindAllList();
      this.table_name_el = "新建项目";
      this.projectIdks = "";
      this.resetForm("xmform");
      this.datalog_list_rom();
      this.xmulistId = "";
      this.xtUliId = "";
      let ms_token = window.sessionStorage.getItem("ms_token");
      this.dialogFormVisible = true;
      if (ms_token) {
        let ms = await this.$api.API_findListoFndList_men({
          token: ms_token,
        });
        this.xmuListoptions = ms.data;
      } else {
        console.log("获取token失败，请重新登录获取");
      }
    },
    // 获取系统
    async getList(item) {
      // console.log(item);
      let res = await this.$api.API_findListofindSystem({
        projectId: item,
        token: window.sessionStorage.getItem("ms_token"),
      });
      this.xTListoptions = res.data;
      this.xmudan = this.xmuListoptions.filter((ite) => ite.id == item);
      this.resetForm();
      this.xtUliId = "";
      // console.log(ks[0]);
      // this.xmform.projectPriority = ks[0].projectPriority;
      // this.xmform.contractSn = ks[0].contractSn;
      // console.log();
    },
    getxtList(itemId) {
      let xtList = [];
      xtList = this.xTListoptions.filter((item) => item.id == itemId)[0];
      let recordInformationModel = xtList.recordInformationModel;
      this.xmform = {
        projectName: xtList.projectName || "", //COMMENT '项目名称
        systemName: xtList.sysName || "", //系统名称
        evaluatedUnit: xtList.evaluatedUnit || "", //被测单位名称
        recordSn: recordInformationModel.recordCertificateNo || "", //备案证明编号
        standard: 3, //标准体系.1：老国标，2：新国标（2017试行版），3：新国标
        standardVersion: 1, // '拓展版本.1：默认，2：电力(生产控制信息系统类)，3：电力(管理信息系统)，4：证券期货行业，5：金融行业，6：云计算，7：税务(试行)(平行权重)，8：烟草，9：征信(上海),10：试行稿(2017-10-26)，11：GBT22239-2019',
        standardExtends: "", //拓展标准
        level: recordInformationModel.ggrade || 2, //等保等级.1：第一级，2：第二级，3：第三级，4：第四级
        sag: 1, //SAG等级.1：S1A3G3，2：S2A3G3，3：S3A3G3，4：S3A2G3，5：S3A1G3
        membersIdList: [], //项目参与人
        status: 1,
        isPenetration: xtList.isPenetration,
        childAmount: xtList.childAmount,
        projectPriority: this.xmudan[0].projectPriority,
        contractSn: this.xmudan[0].contractSn,
        isNewBook: 1,
        important: xtList.important,
      };
      if (this.projectIdks.standardExtends) {
        let nums = this.projectIdks.standardExtends.split("┋");
        nums.forEach((item, index) => {
          nums[index] = parseInt(nums[index]);
        });
        this.xmform.standardExtends = nums;
      }
      this.selectGoodsByGroupId(recordInformationModel.ggrade || 2);
    },
    async Project_detail(PeID) {
      if (!PeID && PeID == "undefined") {
        return alert("错误！");
      }
      let res = await this.$api.API_Project_detail({
        projectId: PeID,
      });
      if (res.code === 20000) {
        return res.data;
      } else {
        this.$message.error(res.message);
      }
    },
    async xmuupdata(index, row) {
      this.ua_cre = 1;
      this.xmulistId = "";
      this.xtUliId = "";
      this.projectIdks = row;
      this.table_name_el = "更新项目";
      this.datalog_list_rom(row.creator);
      let res = await this.Project_detail(row.projectId);
      this.selectGoodsByGroupId(res.level, res.sag);
      this.xmform.projectId = row.projectId;
      this.xmform.status = res.status;
      Object.keys(this.xmform).forEach((key) => {
        this.xmform[key] = res[key];
      });
      if (row.standardExtends) {
        let nums = row.standardExtends.split("┋");
        nums.forEach((item, index) => {
          nums[index] = parseInt(nums[index]);
        });
        this.xmform.standardExtends = nums;
      }
      let ms_token = window.sessionStorage.getItem("ms_token");
      if (ms_token) {
        let ms = await this.$api.API_findListoFndList_men({
          token: ms_token,
        });
        this.xmuListoptions = ms.data;
      } else {
        console.log("获取token失败，请重新登录获取");
      }
      this.dialogFormVisible = true;
    },
    // 清空
    resetForm(formName) {
      this.xmform = {
        projectName: "", //COMMENT '项目名称
        systemName: "", //系统名称
        evaluatedUnit: "", //被测单位名称
        recordSn: "", //备案证明编号
        standard: 3, //标准体系.1：老国标，2：新国标（2017试行版），3：新国标
        standardVersion: 1, // '拓展版本.1：默认，2：电力(生产控制信息系统类)，3：电力(管理信息系统)，4：证券期货行业，5：金融行业，6：云计算，7：税务(试行)(平行权重)，8：烟草，9：征信(上海),10：试行稿(2017-10-26)，11：GBT22239-2019',
        standardExtends: "", //拓展标准
        level: 2, //等保等级.1：第一级，2：第二级，3：第三级，4：第四级
        sag: 1, //SAG等级.1：S1A3G3，2：S2A3G3，3：S3A3G3，4：S3A2G3，5：S3A1G3
        membersIdList: [], //项目参与人
        status: 1,
        projectPriority: "",
        contractSn: "",
        isNewBook: 1,
      };
    },
    // 录入打卡
    lvdaka(row) {
      this.drawertitle = {
        id: 2,
        name: "录入打卡",
      };
      this.drawer = true;
      this.lianmList = row;
      this.geTlvTopks(row, 2);
    },
    // 录入联盟
    lvTopks(row) {
      this.drawertitle = {
        id: 1,
        name: "录入联盟",
      };
      this.drawer = true;
      this.lianmList = row;
      this.geTlvTopks(row, 1);
    },

    async geTlvTopks(row, itsId) {
      let data = {
        projectId: row.projectId,
      };
      let res = "";
      // 查询录入联盟
      if (itsId == 1) {
        res = await this.$api.GetfindInputUnion(data);
      }
      // 查询打卡联盟
      if (itsId == 2) {
        res = await this.$api.findClockputUnion(data);
      }

      if (res.code === 20000) {
        switch (itsId) {
          case 1:
            if (res.data) {
              this.UnionModel = res.data;
            } else {
              this.UnionModel = {
                projectBeginTime: undefined,
                projectEndTime: undefined,
                inputUnionTime: undefined,
                inputImgUrl: undefined,
                inputImgName: undefined,
                unionPassTime: undefined,
              };
            }
            break;
          case 2:
            if (res.data) {
              this.files = [];
              this.inpuniondel = res.data;
            } else {
              this.inpuniondel = {
                arriveTime: null,
                leaveTime: null,
                clockPeople: [],
              };
            }
            break;
          default:
            break;
        }
      }
      // console.log(res);
    },
    async findTelListfindPlan() {
      let res = await this.$api.findTelListfindPlan();
      if (res.code === 20000) {
        this.clockPeopleOptions = res.data;
        // this.technologySendIdOptions = res.data;
      }
    },
    updatabmitForm() {
      this.lvru = {
        name: "修改录入联盟",
        id: 2,
      };
      this.inputUnionModel = this.UnionModel;
      this.formFileList = [];
      if (this.UnionModel.inputImgName) {
        this.formFileList.push({
          name: this.UnionModel.inputImgName,
          id: this.UnionModel.id,
        });
      }
      this.lurudialogVisible = true;
    },
    // 获取创建人员
    async gEtksrenyuanList() {
      let res = await this.$api.findTechnologypdate();
      if (res.code === 20000) {
        this.ksrenyuanList = res.data;
        // this.untechnologySendIdOptions = res.data;
      }
    },
    databmitdak() {
      this.formFileList = [];
      if (this.inpuniondel.fileList) {
        this.inpuniondel.fileList.forEach((item) => {
          let ks = {
            name: item.fileName,
            id: item.fileId,
          };
          this.formFileList.push(ks);
        });
      }
      this.dakaiVisible = true;
    },
    ddleUploadForm() {
      this.dakahandleUploadForm();
    },
    fileChange(file) {
      this.files.push(file.raw); //上传文件变化时将文件对象push进files数组
    },
    dakahandleUploadForm() {
      let thiz = this;
      let formData = new FormData();
      formData.append("projectId", this.lianmList.projectId); // 额外参数
      thiz.files.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("arriveTime", thiz.inpuniondel.arriveTime);
      formData.append("leaveTime", thiz.inpuniondel.leaveTime);
      formData.append("clockPeople", thiz.inpuniondel.clockPeople);
      let loading = thiz.$loading({
        lock: true,
        text: "上传中，请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      // thiz.$http.post("/api/import/check/upload", formData)
      this.$api.uploadClockUnionon(formData).then((data) => {
        if (data.code === 20000) {
          thiz.$message({
            message: "录入打卡成功，" + data.message,
            type: "success",
          });
          this.dakaiVisible = false;
          this.ProjectQueryList();
          this.geTlvTopks(this.lianmList, 2);
          thiz.formFileList = [];
          thiz.uploadFormFileList = [];
          thiz.files = [];
        } else {
          thiz.formFileList = [];
          thiz.uploadFormFileList = [];
          thiz.files = [];
          thiz.$message("上传文件失败，" + data.message);
        }
      });
      loading.close();
    },
    luformsList() {
      this.lvru = {
        name: "新建录入联盟",
        id: 1,
      };
      this.formFileList = [];
      this.inputUnionModel = {
        projectBeginTime: undefined,
        projectEndTime: undefined,
        inputUnionTime: undefined,
        inputImgUrl: undefined,
        inputImgName: undefined,
        unionPassTime: undefined,
      };
      this.lurudialogVisible = true;
    },
    // 提交联盟
    async ListxiaoMlit() {
      if (this.$refs.doctypeCrfile.uploadFiles.length > 0) {
        console.log(this.$refs.doctypeCrfile.uploadFiles);
        if (this.$refs.doctypeCrfile.uploadFiles[0].raw) {
          this.$refs.doctypeCrfile.submit();
        } else {
          console.log(55);
          this.TopLiuiPO();
        }
      } else {
        this.TopLiuiPO();
      }

      //
    },

    async TopLiuiPO() {
      this.inputUnionModel.projectId = this.lianmList.projectId;
      // if (this.lvru.id == 1) {
      //   let res = await this.$api.GetfiinputUnionon(this.inputUnionModel);
      //   if (res.code === 20000) {
      //     this.$message.success("录入成功！！");
      //     this.ProjectQueryList();
      //     this.geTlvTopks(this.lianmList);
      //     this.lurudialogVisible = false;
      //   }
      // }
      // if (this.lvru.id == 2) {

      // }
      let res = await this.$api.GetfiinputUnionon(this.inputUnionModel);
      if (res.code === 20000) {
        this.$message.success("录入成功！！");
        this.ProjectQueryList();
        this.geTlvTopks(this.lianmList, 1);
        this.lurudialogVisible = false;
      }
    },
    // 删除
    async deleTlist() {
      this.$confirm("确定删除此记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (!this.UnionModel.id) {
            return this.$message.error("当前项目无录入联盟！");
          }
          let res = await this.$api.inputUniondUnionImgon({
            id: this.UnionModel.id,
          });
          if (res.code === 20000) {
            this.$message.success("删除成功！！");
            this.geTlvTopks(this.lianmList, 1);
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
    resetFormlv() {
      this.drawer = false;
      this.isTtop = false;
    },
    // 复制
    truexmuList(item) {
      this.diaprojectName = true;
      this.copyProjec.copyname = item.projectName;
    },
    // 复制确认
    async openList() {
      this.copyProjec.userId = this.info.user_info.userId;
      let res = await this.$api.APICopyCopyProject(this.copyProjec);

      if (res.code === 20000) {
        this.$api.API_findLisupdatem({
          evaluateProjectId: res.data,
          token: window.sessionStorage.getItem("ms_token"),
          id: this.xtUliId,
          isPenetration: this.xmform.isPenetration,
          childAmount: this.xmform.childAmount,
        });
        this.ProjectQueryList();
      }
    },
    xuanmufuzList() {
      let ks = this.tableDataList.filter(
        (item) => item.projectId == this.xmform.itemList
      )[0];
      if (this.xmform.standardVersion != ks.standardVersion) {
        this.$message.error("错误，标准版本不一致");
        this.xmform.itemList = "";
      }
      // console.log(this.xmform.standardVersion, ks.standardVersion);
    },
    // 取消
    dialogFormVisib() {
      this.dialogFormVisible = false;
      this.xmform = {
        projectName: "", //COMMENT '项目名称
        systemName: "", //系统名称
        evaluatedUnit: "", //被测单位名称
        recordSn: "", //备案证明编号
        standard: 3, //标准体系.1：老国标，2：新国标（2017试行版），3：新国标
        standardVersion: 1, // '拓展版本.1：默认，2：电力(生产控制信息系统类)，3：电力(管理信息系统)，4：证券期货行业，5：金融行业，6：云计算，7：税务(试行)(平行权重)，8：烟草，9：征信(上海),10：试行稿(2017-10-26)，11：GBT22239-2019',
        standardExtends: "", //拓展标准
        level: 2, //等保等级.1：第一级，2：第二级，3：第三级，4：第四级
        sag: 2, //SAG等级.1：S1A3G3，2：S2A3G3，3：S3A3G3，4：S3A2G3，5：S3A1G3
        membersIdList: [], //项目参与人
        status: 1,
        projectPriority: "",
        contractSn: "",
        isNewBook: 1,
      };
    },
    getNowDate() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let H = date.getHours();
      let mm = date.getMinutes();
      let s = date.getSeconds();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      H = H < 10 ? "0" + H : H;
      this.getTimeDate = y + "年" + m + "月" + d;
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  .page_name {
    span {
      &:nth-child(1) {
        font-size: 18px;
      }
      &:nth-child(2) {
        margin-left: 36px;
        color: #9e9e9e;
      }
    }
  }
  .page_ts {
    ::v-deep .el-card__body {
      padding: 0;
    }
    .box-card {
      ::v-deep .el-card__header {
        background-color: #dddddd;
      }
      .text_item {
        cursor: pointer;
        margin: 15px 0;
        .fa-bookmark {
          margin-right: 5px;
        }
      }
      .clearfix {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .header_ggao {
          color: rgba(3, 169, 244, 1);
          font-size: 18px;
        }
      }
    }
    .box-card-sit {
      margin-top: 20px;
      ::v-deep .el-card__body {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
      }

      div {
        margin: 10px 0;
        background-color: rgba(0, 188, 212, 0.5);
        width: 150px;
        height: 150px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        span {
          i {
            font-size: 26px;
          }
          display: inline-block;
        }
      }
    }
  }
}
.add_from_xmu {
  ::v-deep .el-dialog__header {
    background-color: rgba(3, 169, 244, 0.5);
    .el-dialog__title {
      color: #ffffff;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #ffffff;
    }
  }
  .ist_lis {
    display: flex;
  }
  .dia-footer {
    text-align: right;
  }
}
.optionTo_name {
  cursor: pointer;
}
.ksLismu {
  font-size: 14px;
  cursor: pointer;
}
.ksLismu:hover {
  color: red;
}
.search_ls {
  display: flex;
  align-items: center;
  // width: 800px;
  flex-wrap: wrap;
  div {
    margin-top: 5px;
    margin-right: 5px;
    display: flex;
    align-items: center;
    .search_ls_name {
      font-size: 14px !important;
      min-width: 75px;
      font-family: "Courier New", Courier, monospace;
    }
    .el-select {
      width: 130px;
    }
  }
  .el-input {
    max-width: 200px;
    margin-left: 5px;
  }
}
.search_ls {
  position: relative;
}
.die_roift {
  position: absolute;
  right: 0;
}
.blue-class {
  color: #409eff;
}
.buLitop {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  line-height: 55px;
  div {
    margin-left: 15px;
  }
}
.page_test_xx {
  .el-col {
    line-height: 35px;
    font-size: 14px;
    margin-bottom: 15px;
  }
}
.ms_zk_bomm_css {
  div {
    margin: 5px 0;
  }
}
</style>
