<!--已完成的项目-->
<template>
  <d2-container class="page">
    <div class="page_name" style="padding: 0 20px 20px 20px">
      <div class="search_ls">
        <div>
          <span class="search_ls_name">项目名称</span>
          <el-input
            placeholder="请输入内容"
            v-model="projectModel.projectName"
            clearable
          ></el-input>
        </div>
        <div>
          <el-button icon="el-icon-search" @click="searchBi" circle></el-button>
        </div>
        <div class="die_roift">
          <el-button @click="dialogFormVisibleList" type="primary"
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
                      <p>
                        <el-radio
                          size="medium"
                          v-model="radio_projectId"
                          @change="optionTo(scope.$index, scope.row)"
                          :label="scope.row.projectId"
                        >
                          {{ "" }}
                        </el-radio>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="项目名称">
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
                  <el-table-column label="系统名称">
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
                  <el-table-column label="创建人" width="120">
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
                  <el-table-column label="创建时间" width="100">
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
                  <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
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
        :title="table_name_el"
        :visible.sync="dialogFormVisible"
      >
        <el-form :model="xmform" :rules="rules" ref="xmform">
          <el-form-item
            label="项目名称"
            :label-width="formLabelWidth"
            prop="projectName"
          >
            <el-input
              v-model="xmform.projectName"
              clearable
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
              <el-form-item label="标准体系" :label-width="formLabelWidth">
                <el-select
                  v-model="xmform.standard"
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
                <el-select v-model="xmform.standardVersion">
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
          <el-form-item label="扩展标准" :label-width="formLabelWidth">
            <el-select
              v-model="xmform.standardExtends"
              multiple
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
          <div class="ist_lis">
            <div>
              <el-form-item label="等保等级" :label-width="formLabelWidth">
                <el-select
                  v-model="xmform.level"
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
                <el-select v-model="xmform.sag" placeholder="请选择">
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
          <div class="dia-footer">
            <el-form-item>
              <el-button type="primary" @click="submitForm('xmform', ua_cre)"
                >保存</el-button
              >
              <el-button type="danger" @click="resetForm('xmform')"
                >重置</el-button
              >
              <el-button @click="dialogFormVisible = false">取 消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      // 项目是否进行
      statusList: [
        { id: 1, value: "进行中" },
        { id: 2, value: "已完成" },
      ],
      radio_projectId: 0,
      total: 0,
      ua_cre: 0, //0创建 1更新
      table_name_el: "新建项目",
      account: "",
      getTimeDate: "",
      its_id_to: 2,
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
          value: [{ label: "GBT22239-2019", value: 1 }],
        },
      ],
      //等级保护
      levellist: [
        { label: "第一级", value: 1 },
        { label: "第二级", value: 2 },
        { label: "第三级", value: 3 },
        { label: "第四级", value: 4 },
        { label: "第五级", value: 5 },
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
      membersIdLists: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      xmform: {
        projectName: "", //COMMENT '项目名称
        systemName: "", //系统名称
        evaluatedUnit: "", //被测单位名称
        recordSn: "", //备案证明编号
        standard: 3, //标准体系.1：老国标，2：新国标（2017试行版），3：新国标
        standardVersion: 1, // '拓展版本.1：默认，2：电力(生产控制信息系统类)，3：电力(管理信息系统)，4：证券期货行业，5：金融行业，6：云计算，7：税务(试行)(平行权重)，8：烟草，9：征信(上海),10：试行稿(2017-10-26)，11：GBT22239-2019',
        standardExtends: "", //拓展标准
        level: 1, //等保等级.1：第一级，2：第二级，3：第三级，4：第四级
        sag: "", //SAG等级.1：S1A3G3，2：S2A3G3，3：S3A3G3，4：S3A2G3，5：S3A1G3
        membersIdList: [], //项目参与人
        status: 1,
      },
      projectModel: {
        page: 1,
        pageSize: 10,
        projectName: "",
        queryType: 3,
      },
      formLabelWidth: "120px",
      rules: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
        systemName: [
          { required: true, message: "请输入系统名称", trigger: "blur" },
        ],
        // membersIdList: [
        //   { required: true, message: "请选择项目参与人", trigger: "blur" },
        // ],
      },
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
    this.ProjectQueryList();
  },
  methods: {
    // 搜索
    searchBi() {
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
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
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
    async optionTo(index, row) {
      let res = await this.Project_detail(row.projectId);
      // 设置 vuex 用户信息
      await this.$store.dispatch(
        "d2admin/xmu/set",
        {
          name: row.projectName,
          projectId: row.projectId,
          data: res,
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
    async selectGoodsByGroupId(enent) {
      let res = await this.$api.API_SagFindSagByLevel({ sagLevel: enent });
      if (res.code === 20000) {
        this.saglist = res.data;
        this.xmform.sag = res.data[0].id;
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
            const res = await this.$api.API_Project_Creation(this.xmform);
            if (res.code === 20000) {
              this.$message.success("创建成功！！");
              this.dialogFormVisible = false;
              this.ProjectQueryList();
              //查询列表
            } else {
              this.$message.error(res.message);
            }
            this.resetForm("xmform");
          } else if (ua_cre === 1) {
            // 修改
            const res = await this.$api.API_Project_updata(this.xmform);
            if (res.code === 20000) {
              this.$message.success("修改成功！！");
              this.dialogFormVisible = false;
              this.ProjectQueryList();
              this.resetForm("xmform");
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
    dialogFormVisibleList() {
      this.ua_cre = 0;
      this.selectGoodsByGroupId(this.xmform.level);
      this.table_name_el = "新建项目";
      this.resetForm("xmform");
      this.datalog_list_rom();
      this.dialogFormVisible = true;
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

      this.table_name_el = "更新项目";
      this.datalog_list_rom(row.creator);

      let res = await this.Project_detail(row.projectId);
      this.selectGoodsByGroupId(res.level);
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
        level: 1, //等保等级.1：第一级，2：第二级，3：第三级，4：第四级
        sag: 1, //SAG等级.1：S1A3G3，2：S2A3G3，3：S3A3G3，4：S3A2G3，5：S3A1G3
        membersIdList: [], //项目参与人
        status: 1,
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
    margin-top: 20px;
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
.search_ls {
  display: flex;
  align-items: center;
  div {
    margin-right: 5px;
    display: flex;
    align-items: center;
    .search_ls_name {
      font-size: 12px;
      font-family: "Courier New", Courier, monospace;
    }
  }
  .el-input {
    max-width: 180px;
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
</style>

