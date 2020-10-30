<!--评测过程-->
<template>
  <d2-container>
    <div class="reviewProcess">
      <div class="rev_jianjie">
        <el-card class="box-card">
          <div class="clearfix descTItle">
            <span>简介</span>
          </div>
          <div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 15 }"
              placeholder="请输入内容"
              v-model="fromData.briefIntroduction"
            ></el-input>
          </div>
          <div class="detailedPro">
            <div class="detailedtablo">
              <div class="clearfix descTItle">
                <span>详细过程</span>
              </div>
              <div class="detailedTime">
                <el-row :gutter="24">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <span>项目启动</span>
                      <el-date-picker
                        v-model="fromData.projectStartTime"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="timestamp"
                      ></el-date-picker>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <span>启动会议</span>
                      <el-date-picker
                        v-model="fromData.startMeetingTime"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="timestamp"
                      ></el-date-picker>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <span>未次会议</span>
                      <el-date-picker
                        v-model="fromData.lastMeetingTime"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="timestamp"
                      ></el-date-picker>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <span>复核确认</span>
                      <el-date-picker
                        v-model="fromData.confirmTime"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="timestamp"
                      ></el-date-picker>
                    </div>
                    <div class="tijiaobaoc">
                      <el-button type="primary" @click="submitReport"
                        >保存</el-button
                      >
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="detailed_text_item">
                <el-table
                  :data="tableData"
                  :span-method="arraySpanMethod"
                  border
                  style="width: 100%"
                >
                  <el-table-column label="实施项目" prop="name" width="180">
                    <template slot-scope="scope">
                      <span
                        style="margin-left: 10px; font-weight: bold"
                        v-if="scope.row.highlight"
                        >{{ scope.row.name }}</span
                      >
                      <span style="margin-left: 10px" v-else>{{
                        scope.row.name
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="amount1" label="实施细目">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{
                        scope.row.amount1
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="evaluationCycle" label="测评周期(天)">
                    <template slot-scope="scope">
                      <span v-if="scope.row.highlight"></span>
                      <el-input-number
                        v-else
                        @change="Itsclik()"
                        v-model="scope.row.evaluationCycle"
                        controls-position="right"
                        :min="0"
                      ></el-input-number>
                      <!-- <span style="margin-left: 10px">{{  }}</span> -->
                    </template>
                  </el-table-column>
                  <el-table-column prop="remarks" label="备注">
                    <template slot-scope="scope">
                      <el-popover trigger="click" placement="top">
                        <div>
                          <el-input
                            type="textarea"
                            :autosize="{ minRows: 1, maxRows: 8 }"
                            placeholder="请输入内容"
                            v-model="scope.row.remarks"
                            @blur="Totisadd"
                          >
                          </el-input>
                        </div>
                        <div
                          slot="reference"
                          v-if="scope.row.remarks"
                          class="name-wrapper"
                        >
                          {{ scope.row.remarks }}
                        </div>
                        <div
                          style="min-height: 20px"
                          slot="reference"
                          v-else
                          class="name-wrapper"
                        >
                          <span style="opacity: 0">点击填写</span>
                        </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div class="tijiaobaoc">
            <el-button type="primary" @click="submitReportTable"
              >保存</el-button
            >
          </div>
        </el-card>
      </div>
    </div>
  </d2-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      fromData: {
        id: "",
        briefIntroduction: "",
        projectStartTime: "",
        startMeetingTime: "",
        lastMeetingTime: "",
        confirmTime: "",
        input_number: "",
      },

      tableData: [
        {
          name: "一、测评准备过程",
          amount1: "",
          evaluationCycle: 0,
          remarks: "",
          len: 2,
          ist: 1,
          isfor: true,
          highlight: true,
        },
        {
          id: "",
          name: "现场调查",
          amount1: "",
          projectImplementNum: 1,
          evaluationCycle: 0,
          remarks: "需要系统管理员配合访谈",
          len: 2,
          ist: 1,
          isfor: true,
        },
        {
          id: "",
          name: "工具和文档准备",
          amount1: "",
          projectImplementNum: 2,
          evaluationCycle: 0,
          remarks: "",
          len: 2,
          ist: 1,
          isfor: true,
        },

        {
          name: "第一阶段输出结果：《测评系统基本情况调查报告》",
          amount1: "",
          evaluationCycle: 0,
          remarks: "",
          len: 4,
          ist: 1,
          isfor: true,
          highlight: true,
        },
        {
          name: "二、方案编制过程",
          amount1: "",
          evaluationCycle: 0,
          remarks: "",
          len: 2,
          ist: 1,
          isfor: true,
          highlight: true,
        },
        {
          id: "",
          name: "方案及计划制定审核",
          projectImplementNum: 3,
          amount1: "",
          evaluationCycle: 0,
          remarks: "",
          len: 2,
          ist: 1,
          isfor: true,
        },
        {
          name:
            "第二阶段输出结果：《系统安全测评方案》、《系统安全测评现场实施计划》",
          amount1: "",
          evaluationCycle: 0,
          remarks: "",
          len: 4,
          ist: 1,
          isfor: true,
          highlight: true,
        },
        {
          name: "三、现场实施过程",
          amount1: "",
          evaluationCycle: 0,
          remarks: "",
          len: 2,
          ist: 1,
          isfor: true,
          highlight: true,
        },
        {
          id: "",
          name: "首次会议",
          amount1: "确认方案和计划，协调测评资源",
          evaluationCycle: 0,
          projectImplementNum: 4,
          remarks: "需要系统方运行相关人员参与",
          len: 1,
          ist: 1,
          isfor: false,
        },
        {
          id: "",
          name: "安全物理环境",
          amount1: "机房环境",
          projectImplementNum: 5,
          evaluationCycle: 0,
          remarks: "需要机房管理员配合",
          len: 1,
          ist: 1,
          isfor: false,
        },
        {
          id: "",
          projectImplementNum: 6,
          name: "安全通信网络",
          amount1: "网络结构分析",
          evaluationCycle: 0,
          remarks: "以核查配置文件为主，需要网络管理员配合",
          len: 1,
          ist: 1,
          isfor: false,
        },
        {
          id: "",
          projectImplementNum: 7,
          name: "安全区域边界",
          amount1: "区域边界",
          evaluationCycle: 0,
          remarks: "",
          len: 1,
          ist: 1,
          isfor: false,
        },
        {
          id: "",
          projectImplementNum: 8,
          name: "安全计算环境",
          amount1: "操作系统核查",
          evaluationCycle: 0,
          remarks:
            "以核查配置文件为主，需要系统管理员配合；核查并验证安全功能的实现，需要应用系统管理员配合；访谈需要应用系统管理员或开发人员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全计算环境",
          amount1: "数据库核查",
          evaluationCycle: 0,
          remarks:
            "以核查配置文件为主，需要系统管理员配合；核查并验证安全功能的实现，需要应用系统管理员配合；访谈需要应用系统管理员或开发人员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全计算环境",
          amount1: "终端设备核查",
          evaluationCycle: 0,
          remarks:
            "以核查配置文件为主，需要系统管理员配合；核查并验证安全功能的实现，需要应用系统管理员配合；访谈需要应用系统管理员或开发人员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全计算环境",
          amount1: "安全设备核查",
          evaluationCycle: 0,
          remarks:
            "以核查配置文件为主，需要系统管理员配合；核查并验证安全功能的实现，需要应用系统管理员配合；访谈需要应用系统管理员或开发人员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全计算环境",
          amount1: "应用安全核查",
          evaluationCycle: 0,
          remarks:
            "以核查配置文件为主，需要系统管理员配合；核查并验证安全功能的实现，需要应用系统管理员配合；访谈需要应用系统管理员或开发人员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全计算环境",
          amount1: "数据安全核查分析",
          evaluationCycle: 0,
          remarks:
            "以核查配置文件为主，需要系统管理员配合；核查并验证安全功能的实现，需要应用系统管理员配合；访谈需要应用系统管理员或开发人员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全计算环境",
          amount1: "数据安全验证测试",
          evaluationCycle: 0,
          remarks:
            "以核查配置文件为主，需要系统管理员配合；核查并验证安全功能的实现，需要应用系统管理员配合；访谈需要应用系统管理员或开发人员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全计算环境",
          amount1: "验证测试",
          evaluationCycle: 0,

          remarks:
            "以核查配置文件为主，需要系统管理员配合；核查并验证安全功能的实现，需要应用系统管理员配合；访谈需要应用系统管理员或开发人员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          id: "",
          projectImplementNum: 9,
          name: "安全管理中心",
          amount1: "安全管理中心",
          evaluationCycle: 0,
          remarks: "以核查配置文件为主，需要系统管理员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },

        {
          id: "",
          projectImplementNum: 10,
          name: "安全管理",
          amount1: "安全管理制度",
          evaluationCycle: 0,
          remarks: "以核查配置文件为主，需要系统管理员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全管理",
          amount1: "安全管理机构",
          evaluationCycle: 0,
          remarks: "以核查配置文件为主，需要系统管理员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全管理",
          amount1: "安全管理人员",
          evaluationCycle: 0,
          remarks: "以核查配置文件为主，需要系统管理员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全管理",
          amount1: "安全建设管理",
          evaluationCycle: 0,
          remarks: "以核查配置文件为主，需要系统管理员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全管理",
          amount1: "安全运维管理",
          evaluationCycle: 0,
          remarks: "以核查配置文件为主，需要系统管理员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },

        {
          id: "",
          name: "漏洞扫描",
          projectImplementNum: 11,
          amount1: "操作系统",
          evaluationCycle: 0,
          remarks: "需要系统管理员配合测试",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          // projectImplementNum: 11,
          name: "漏洞扫描",
          amount1: "数据库",
          evaluationCycle: 0,
          remarks: "需要系统管理员配合测试",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          id: "",
          projectImplementNum: 12,
          name: "渗透性测试",
          amount1: "模拟从Ineternet非授权访问系统",
          evaluationCycle: 0,
          remarks: "需要网络管理员、系统管理员配合测试",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          id: "",
          projectImplementNum: 13,
          name: "测试结果初步分析",
          amount1: "",
          evaluationCycle: 0,
          remarks: "",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          id: "",
          projectImplementNum: 14,
          name: "末次会议",
          amount1: "测评结果交流确认、结果审核",
          evaluationCycle: 0,
          remarks: "需要系统方运行相关人员参与并确认测评结果",
          len: 1,
          ist: 2,
          isfor: false,
        },

        {
          name: "第三阶段输出结果：《系统安全测评记录表》",
          amount1: "",
          evaluationCycle: 0,
          remarks: "",
          len: 4,
          ist: 1,
          isfor: true,
          highlight: true,
        },
        {
          name: "四、分析与报告编制过程",
          amount1: "",
          evaluationCycle: 0,
          remarks: "",
          len: 2,
          ist: 1,
          isfor: true,
          highlight: true,
        },
        {
          id: "",
          projectImplementNum: 15,
          name: "测评报告书写",
          amount1: "",
          evaluationCycle: 0,
          remarks: "",
          len: 2,
          ist: 1,
          isfor: true,
        },
        {
          id: "",
          projectImplementNum: 16,
          name: "测评报告审核及签发",
          amount1: "",
          evaluationCycle: 0,
          remarks: "",
          len: 2,
          ist: 1,
          isfor: true,
        },
        {
          name: "第四阶段输出结果：《系统安全测评报告》",
          amount1: "",
          evaluationCycle: 0,
          remarks: "",
          len: 4,
          ist: 1,
          isfor: true,
          highlight: true,
        },
        {
          id: "",
          projectImplementNum: 17,
          name: "总计",
          amount1: "",
          evaluationCycle: 0,
          remarks: "",
          len: 2,
          ist: 1,
          isfor: true,
        },
      ],
    };
  },
  created() {
    this.getEtlist();
    this.RecordFindTimeRecord();
  },
  computed: {
    ...mapState("d2admin", {
      xmu_info: (state) => state.xmu.xmu_info,
      user_info: (state) => state.user.info.user_info,
    })
  },
  methods: {
    Itsclik() {
      let ItNumber = 0;
      for (let item of this.tableData) {
        if (item.hasOwnProperty("projectImplementNum")) {
          if (item.projectImplementNum != 17) {
            ItNumber += item["evaluationCycle"];
          }
        }
      }
      this.tableData.forEach((el, index) => {
        if (el.projectImplementNum == 17) {
          this.tableData[index].evaluationCycle = ItNumber;
        }
      });
    },
    Totisadd() {
      console.log(5);
    },
    // 查询表格
    async RecordFindTimeRecord() {
      let res = await this.$api.API_TimeRecordFindTimeRecord();
      if (res.code === 20000) {
        let data = res.data;
        this.tableData.forEach((item, index) => {
          if (item.hasOwnProperty("projectImplementNum")) {
            for (let itm of data) {
              if (item.projectImplementNum == itm.projectImplementNum) {
                this.tableData[index].evaluationCycle = itm.evaluationCycle;
                this.tableData[index].remarks = itm.remarks;
                this.tableData[index].id = itm.id;
              }
            }
          }
        });
        //查询列表
      } else {
        this.$message.error("查询数据，请联系管理员" + res.message);
      }
    },
    // 查询时间简介
    async getEtlist() {
      let List = await this.$api.API_projectOverviewfindBriefIntroduction();
      if (List.code === 20000) {
        this.fromData = List.data;
        if (this.fromData.briefIntroduction == null) {
          this.fromData.briefIntroduction = `受${this.xmu_info.data.evaluatedUnit}委托，${this.user_info.companyName}于YYYY年MM月DD日至YYYY年MM月DD日对${this.xmu_info.data.systemName}进行了系统安全等级测评工作。本次安全测评的范围主要包括${this.xmu_info.data.systemName}的物理环境、主机、网络、业务应用系统、安全管理制度和人员等。安全测评通过静态评估、现场测试、综合评估等相关环节和阶段，从安全物理环境、安全通信网络、安全区域边界、安全计算环境、安全管理中心、安全管理制度、安全管理机构、安全管理人员、安全建设管理、安全运维管理等十个方面，对${this.xmu_info.data.systemName}进行综合测评。`;
        }
        //查询列表
      } else {
        this.$message.error(List.message + "评测依据选项出差，请联系管理员");
      }
    },
    async submitReport() {
      let res = await this.$api.API_evaluationBasis_updata(this.fromData);
      if (res.code === 20000) {
        this.$message.success("修改成功！！");
        this.getEtlist();
        //查询列表
      } else {
        this.$message.error("错误，请联系管理员" + res.message);
      }
    },
    async submitReportTable() {
      let objectList = this.tableData;
      let table = [];
      for (let item of objectList) {
        let resT = {};
        if (item.hasOwnProperty("projectImplementNum")) {
          resT.evaluationCycle = item["evaluationCycle"];
          resT.projectImplementNum = item["projectImplementNum"];
          resT.remarks = item["remarks"];
          if (item["id"] != "") {
            resT.id = item["id"];
          }
          table.push(resT);
        }
      }

      this.apiCreupdata(table);
    },
    // 修改或者保存
    async apiCreupdata(timeRecords) {
      console.log(timeRecords);
      let res = "";
      if (timeRecords[timeRecords.length - 1].id) {
        res = await this.$api.API_TimeRecordUpdateTimeRecord({ timeRecords });
      } else {
        res = await this.$api.API_TimeRecordSaveTimeRecord({ timeRecords });
      }
      if (res.code === 20000) {
        this.$message.success("保存成功！！");
        this.getEtlist();
        //查询列表
      } else {
        this.$message.error("错误，请联系管理员" + res.message);
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.isfor == true) {
        if (columnIndex === 0) {
          return {
            rowspan: row.ist,
            colspan: row.len,
          };
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      } else {
        if (row.name === "安全计算环境") {
          if (columnIndex != 1) {
            if (rowIndex % 8 === 4) {
              return {
                rowspan: 8,
                colspan: 1,
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0,
              };
            }
          }
        } else if (row.name === "安全管理") {
          if (columnIndex != 1) {
            if (rowIndex % 5 === 1) {
              return {
                rowspan: 5,
                colspan: 1,
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0,
              };
            }
          }
        } else if (row.name === "漏洞扫描") {
          if (columnIndex != 1) {
            if (rowIndex % 2 === 0) {
              return {
                rowspan: 2,
                colspan: 1,
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0,
              };
            }
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.reviewProcess {
  .detailedPro {
    margin-top: 20px;
  }
}
.detailedTime {
  .el-row {
    min-width: 800px;
    .grid-content {
      span {
        font-size: 12px;
        margin-right: 5px;
      }
      ::v-deep .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 185px;
      }
    }
  }
}
.detailed_text_item {
  margin-top: 15px;
  table {
    width: 100%;
  }
  #tab02,
  #tab02 tr th,
  #tab02 tr td {
    border: 1px solid #ccc;
  }
  #tab02 {
    border-collapse: collapse;
  }
}
.descTItle {
  @extend %unable-border-left;
}
</style>

