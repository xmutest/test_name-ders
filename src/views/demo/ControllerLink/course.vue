<!--测评过程-->
<template>
  <d2-container>
    <div class="reviewProcess">
      <div class="rev_jianjie">
        <el-card class="box-card">
          <div class="clearfix descTItle">
            <span>简介</span>
            <div class="tijiaobaoc">
              <el-button type="primary" @click="submitReport">保存</el-button>
            </div>
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
                <div class="tijiaobaoc">
                  <el-button type="primary" @click="preview">预览</el-button>
                </div>
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
                      <span>末次会议</span>
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
                  </el-col>
                </el-row>
              </div>
              <div class="detailed_text_item">
                <el-table
                  :data="tableData"
                  :span-method="arraySpanMethod"
                  :header-cell-style="{ 'background-color': 'rgba(238, 238, 238,1.0)' }"
                  :cell-style="tableStyle"
                  border
                  style="width: 100%"
                  :row-style="{ height: '10px' }"
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
                      <span v-else-if="scope.row.name == '总计'">
                        {{ scope.row.evaluationCycle }}
                      </span>
                      <span v-else-if="tableHead.indexOf(scope.row.projectImplementNum) != '-1'">
                        {{ scope.row.evaluationCycle }}
                      </span>
                      
                      <el-input-number
                        v-else
                        @change="Itsclik()"
                        v-model="scope.row.evaluationCycle"
                        controls-position="right"
                        :min="0"
                        :step="0.5"
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
                <div class="tijiaobaoc">
                  <el-button type="primary" @click="submitReportTable"
                    >保存</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <el-dialog
      title="测评时间表"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="70%"
    >
      <div class="mude_text_item">
        <!-- <d2-quill
          style="min-height: 200px; margin-bottom: 20px"
          v-model="timeInfoInsert"
        /> -->
        <el-input
          style="min-height: 200px;  margin-bottom: 20px"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 15 }"
          placeholder="请输入内容"
          v-model="timeInfoInsert"
        >
                   </el-input
        >
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="func_calDateFun"
          >重置为计划表内容</el-button
        >
        <el-button type="primary" @click="saveInfoAndExit"
          >保存并退出</el-button
        >
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import log from '@/libs/util.log';
import { mapState } from "vuex";
import request from 'request'
export default {
  data() {
    return {
      fromData: {
        id: "",
        briefIntroduction: "",
        projectStartTime: "", //项目启动
        startMeetingTime: "", //启动会议
        lastMeetingTime: "", //末次会议
        confirmTime: "", //复核确认
        input_number: "",
      },
      sentences: "",
      tableData: [
        {
          projectImplementNum:18,
          name: "一、测评准备过程",
          amount1: "",
          evaluationCycle: 0,
          remarks: "",
          len: 2,
          ist: 1,
          isfor: true,
          highlight: false,
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
          allrow:true,
          isfor: true,
          highlight: true,
        },
        {
          projectImplementNum:19,
          name: "二、方案编制过程",
          amount1: "",
          evaluationCycle: 0,
          remarks: "",
          len: 2,
          ist: 1,
          isfor: true,
          highlight: false,
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
          allrow:true,
          ist: 1,
          isfor: true,
          highlight: true,
        },
        {
          projectImplementNum:20,
          name: "三、现场实施过程",
          amount1: "",
          evaluationCycle: 0,
          remarks: "",
          len: 2,
          ist: 1,
          isfor: true,
          highlight: false,
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
          allrow:true,
          isfor: true,
          highlight: true,
        },
        {
          projectImplementNum:21,
          name: "四、分析与报告编制过程",
          amount1: "",
          evaluationCycle: 0,
          remarks: "",
          len: 2,
          ist: 1,
          isfor: true,
          highlight: false,
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
          allrow:true,
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
      tableHead:[18,19,20,21],
      dialogVisible: false,
      timeInfoInsert: "", //测评时间表
      saveData: {},
    };
  },
  created() {
    this.getEtlist();
    // this.gainHoliday('202011,202012')
  },
  computed: {
    ...mapState("d2admin", {
      xmu_info: (state) => state.xmu.xmu_info,
      user_info: (state) => state.user.info.user_info,
    }),
  },
  methods: {
    Itsclik() {
      let ItNumber = 0;
      for (let item of this.tableData) {
        if (item.hasOwnProperty("projectImplementNum")) {
          if (item.projectImplementNum != 17 && this.tableHead.indexOf(item.projectImplementNum) == -1) {
            ItNumber += item["evaluationCycle"];
          }
        }
      }
      this.tableData.forEach((el, index) => {
        if (el.projectImplementNum == 17) {
          this.tableData[index].evaluationCycle = ItNumber;
        }
        if(el.projectImplementNum == 18){
          this.tableData[index].evaluationCycle = this.tableData[1].evaluationCycle + this.tableData[2].evaluationCycle
        }
        if(el.projectImplementNum == 19){
          this.tableData[index].evaluationCycle = this.tableData[5].evaluationCycle
        }
        if(el.projectImplementNum == 20){
          this.tableData[index].evaluationCycle = this.tableData[8].evaluationCycle + this.tableData[9].evaluationCycle + 
            this.tableData[10].evaluationCycle + 
            this.tableData[11].evaluationCycle +
            this.tableData[12].evaluationCycle +
            this.tableData[20].evaluationCycle +
            this.tableData[21].evaluationCycle +
            this.tableData[26].evaluationCycle +
            this.tableData[28].evaluationCycle +
            this.tableData[29].evaluationCycle +
            this.tableData[30].evaluationCycle 
        }
        if(el.projectImplementNum == 21){
          this.tableData[index].evaluationCycle = this.tableData[33].evaluationCycle + this.tableData[34].evaluationCycle
        }
      });
    },
    Totisadd() {
      
    },
    // 查询表格
    async RecordFindTimeRecord() {
      let res = await this.$api.API_TimeRecordFindTimeRecord();
      if (res.code === 20000) {
        let data = res.data;
        this.tableData.forEach((item, index) => {
          if (item.hasOwnProperty("projectImplementNum") && this.tableHead.indexOf(item.projectImplementNum) == -1) {
            for (let itm of data) {
              if (item.projectImplementNum == itm.projectImplementNum) {
                this.tableData[index].evaluationCycle = itm.evaluationCycle;
                this.tableData[index].remarks = itm.remarks;
                this.tableData[index].id = itm.id;
              }
            }
          }
        });
        this.Itsclik()
        //查询列表
      } else {
        this.$message.error("查询数据，请联系管理员" + res.message);
      }
    },
    // 查询时间简介
    async getEtlist() {
      let List = await this.$api.API_projectOverviewfindBriefIntroduction();
      if (List.code === 20000) {
        this.RecordFindTimeRecord();
        this.fromData = List.data;
         
        if(this.fromData.projectStartTime == 0)  this.fromData.projectStartTime = new Date().getTime()
        if(this.fromData.startMeetingTime == 0)  this.fromData.startMeetingTime = new Date().getTime()
        if(this.fromData.lastMeetingTime == 0)  this.fromData.lastMeetingTime = new Date().getTime()
        if(this.fromData.confirmTime == 0)  this.fromData.confirmTime = new Date().getTime()
        
        if (this.fromData.briefIntroduction == null) {
          this.fromData.briefIntroduction = `    受${this.xmu_info.data.evaluatedUnit}委托，${this.user_info.companyName}于YYYY年MM月DD日至YYYY年MM月DD日对${this.xmu_info.data.systemName}进行了网络安全等级测评工作。本次安全测评的范围主要包括${this.xmu_info.data.systemName}的物理环境、主机、网络、业务应用系统、安全管理制度和人员等。安全测评通过静态评估、现场测试、综合评估等相关环节和阶段，从安全物理环境、安全通信网络、安全区域边界、安全计算环境、安全管理中心、安全管理制度、安全管理机构、安全管理人员、安全建设管理、安全运维管理等十个方面，对${this.xmu_info.data.systemName}进行综合测评。`;
        }
        //查询列表
      } else {
        this.$message.error(List.message + "测评依据选项出差，请联系管理员");
      }
    },
    async submitReport() {
      let res = await this.$api.API_evaluationBasis_updata(this.fromData);
      if (res.code === 20000) {
         this.$message({
            type: "success",
            message: "修改成功！！",
            duration: 1000
          });
        this.getEtlist();
        //查询列表
      } else {
        this.$message.error("错误，请联系管理员" + res.message);
      }
    },
    async submitReportTable() {
      let objectList = this.tableData;
      if(this.tableData[7].evaluationCycle < 3) {
        return alert('现场实施过程阶段天数至少要有三天')
      }
      
      let table = [];
      for (let item of objectList) {
        let resT = {};
        if (item.hasOwnProperty("projectImplementNum") && this.tableHead.indexOf(item.projectImplementNum) == -1) {
          resT.evaluationCycle = item["evaluationCycle"];
          resT.projectImplementNum = item["projectImplementNum"];
          resT.remarks = item["remarks"];
          if (item["id"] != "") {
            resT.id = item["id"];
          }
          table.push(resT);
        }
      }

      console.log('table',table)

      // console.log('保存的数据',table)
      this.submitReport()

      this.apiCreupdata(table);
    },
    // 修改或者保存
    async apiCreupdata(timeRecords) {
      
      let res = "";
      if (timeRecords[timeRecords.length - 1].id) {
        res = await this.$api.API_TimeRecordUpdateTimeRecord({ timeRecords });
      } else {
        res = await this.$api.API_TimeRecordSaveTimeRecord({ timeRecords });
      }
      if (res.code === 20000) {
        this.$message({
              type: "success",
              message: "保存成功！！",
              duration: 1000,
            });
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

        // 清除总步骤多余的格子
        if(row.allrow){
          if (columnIndex === 2 || columnIndex === 3){
            return [0,0]
          }
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
    tableStyle({ row, column, rowIndex, columnIndex }){
      if(row.allrow){
        return{
          background:'#A4D38A',
          height:'60px'
          // position:'absolute',
          // width:'100%',
          // left:0,
          // right:0,
          // 'z-index':5,
          // margin:'auto'
        }
      }
    },
    preview() {
      // 集成各阶段所需时间
      // 转成毫秒运算后再转成正常时间

      this.dialogVisible = true;
      

      this.func_getProjectTimeInfo();
    },
    // 转换毫秒
    transferDate(normalTIme, type = 0) {
      // return new Date(normalTIme+'').getTime()
      if (type) return new Date(normalTIme);
      return normalTIme * 24 * 3600 * 1000;
    },
    func_calDateFun() {
      let allTime = [];
      this.tableData.map((res) => {
        allTime.push(res.evaluationCycle);
      });

      this.timeArr = [
        this.transferDate(allTime[1] + allTime[2]), //第一阶段
        this.transferDate(allTime[5]), //第二阶段
        this.transferDate(
          allTime[8] +
            allTime[9] +
            allTime[10] +
            allTime[11] +
            allTime[12] +
            allTime[20] +
            allTime[21] +
            allTime[26] +
            allTime[28] +
            allTime[29] +
            allTime[30]
        ), //第三阶段
        this.transferDate(allTime[33] + allTime[34]), //第四阶段
      ];
      
      let startTime = this.fromData.projectStartTime;
      let that = this;
      let realityTime = [];
      this.timeArr.map((res) => {
        let startDay = this.transferDay(startTime)
        // 如果是周末,自转到下周一
        if(startDay == 6){
          startTime = startTime + (2 * 24  * 60 * 60 * 1000)
        }else if(startDay == 0){
          startTime = startTime + (1 * 24  * 60 * 60 * 1000)
        }

        startDay = this.transferDay(startTime)

        let useDay = res / (1000 * 60 * 60 * 24)

        let weekendNums = 0 
        // 得出周末天数,转成毫秒
        if(useDay > 0){
          for(let i=0;i<=useDay;i++){
            let thisDay = (startDay + i ) % 7
            if(thisDay == 0 || thisDay  == 6){
              weekendNums++
            }
          }
        }

        // 结束时间刚好在周末
        // console.log(`几个节假日?${weekendNums}`)

        // 加上周末时间
        let endTime = startTime + res;

        let endDay = this.transferDay(endTime)


        // endDay = this.transferDay(endTime)

        // console.log(`判断一开始是否为周末${new Date(endTime).getDay()}`)

        let endWeekendDay = 0
        if(weekendNums > 0){
          for(let i=1;i<=weekendNums;i++){
            let thisDay = (endDay + i) % 7
            // console.log(`有周末?${endDay + i}`)
            
            if(thisDay == 0 || thisDay == 6){
              // console.log(`进来了${thisDay,i}`)
              endWeekendDay++
            }
          }
        }
        

        // console.log(`补上的日子有${endWeekendDay}`);

        let weekendTime = weekendNums * 24 * 60 * 60 * 1000 || 0
        let endWeekendTime = endWeekendDay * 24 * 60 * 60 * 1000 || 0

        console.log(`endTime${new Date(endTime)},weekendTime${weekendNums},endWeekendTime${endWeekendDay}`)
        endTime = endTime + weekendTime + endWeekendTime
        endDay = this.transferDay(endTime)

        if(endDay == 6){
          endTime = endTime + (2 * 24  * 60 * 60 * 1000)
        }else if(endDay == 0){
          endTime = endTime + (1 * 24  * 60 * 60 * 1000)
        }


        let transferEndTime = that.transferDate(endTime, 1);
        let transferStartTime = that.transferDate(startTime, 1);
        let preRealityTime = {
          startTime: startTime,
          endTime: endTime,
        };
        realityTime.push(preRealityTime);

        // 下一轮开始的日期会多一个工作日
        startTime = endTime + (1 * 24  * 60 * 60 * 1000);
      });

      if (realityTime[0].startTime != 0) {
        // let firseDateStart = new Date(realityTime[0].startTime),
        //     firseDateEnd = new Date(realityTime[0].endTime)

        console.log(this.addZeroOfDate(new Date(realityTime[0].startTime).getMonth() + 1))

        this.sentences = `本次等级测评分为四个过程：测评准备过程、方案编制过程、测评实施过程、分析与报告编制过程。具体如图1-1所示。其中，各阶段的时间安排如下：
    1、${new Date(realityTime[0].startTime).getFullYear()}年${
          this.addZeroOfDate(new Date(realityTime[0].startTime).getMonth() + 1)
        }月${this.addZeroOfDate(new Date(realityTime[0].startTime).getDate())}日~${new Date(
          realityTime[0].endTime
        ).getFullYear()}年${
          this.addZeroOfDate(new Date(realityTime[0].endTime).getMonth() + 1)
        }月${this.addZeroOfDate(new Date(realityTime[0].endTime).getDate())}日，测评准备阶段。
    2、${new Date(realityTime[1].startTime).getFullYear()}年${
          this.addZeroOfDate(new Date(realityTime[1].startTime).getMonth() + 1)
        }月${this.addZeroOfDate(new Date(realityTime[1].startTime).getDate())}日~${new Date(
          realityTime[1].endTime
        ).getFullYear()}年${
          this.addZeroOfDate(new Date(realityTime[1].endTime).getMonth() + 1)
        }月${this.addZeroOfDate(new Date(realityTime[1].endTime).getDate())}日，方案编制过程。
    3、${new Date(realityTime[2].startTime).getFullYear()}年${
          this.addZeroOfDate(new Date(realityTime[2].startTime).getMonth() + 1)
        }月${this.addZeroOfDate(new Date(realityTime[2].startTime).getDate())}日~${new Date(
          realityTime[2].endTime
        ).getFullYear()}年${
          this.addZeroOfDate(new Date(realityTime[2].endTime).getMonth() + 1)
        }月${this.addZeroOfDate(new Date(realityTime[2].endTime).getDate())}日，现场实施过程。
    4、${new Date(realityTime[3].startTime).getFullYear()}年${
          this.addZeroOfDate(new Date(realityTime[3].startTime).getMonth() + 1)
        }月${this.addZeroOfDate(new Date(realityTime[3].startTime).getDate())}日~${new Date(
          realityTime[3].endTime
        ).getFullYear()}年${
          this.addZeroOfDate(new Date(realityTime[3].endTime).getMonth() + 1)
        }月${this.addZeroOfDate(new Date(
          realityTime[3].endTime
        ).getDate())}日，分析与报告编制过程。`;
      } else {
        this.sentences = `本次等级测评分为四个过程：测评准备过程、方案编制过程、测评实施过程、分析与报告编制过程。具体如图1-1所示。其中，各阶段的时间安排如下：
    1、YYYY年MM月DD日~YYYY年MM月DD日，测评准备阶段。
    2、YYYY年MM月DD日~YYYY年MM月DD日，方案编制过程。
    3、YYYY年MM月DD日~YYYY年MM月DD日，现场实施过程。
    4、YYYY年MM月DD日~YYYY年MM月DD日，分析与报告编制过程。
        `;
      }
      
      this.timeInfoInsert = `    ${this.sentences}
    其中，${
      this.fromData.startMeetingTime != 0
        ? new Date(this.fromData.startMeetingTime).getFullYear()
        : "YYYY"
    }年${
        this.fromData.startMeetingTime != 0
          ? new Date(this.fromData.startMeetingTime).getMonth() + 1
          : "MM"
      }月${
        this.fromData.startMeetingTime != 0
          ? new Date(this.fromData.startMeetingTime).getDate()
          : "DD"
      }日召开了项目启动会议，确定了工作方案及项目人员名单；${
        this.fromData.lastMeetingTime != 0
          ? new Date(this.fromData.lastMeetingTime).getFullYear()
          : "YYYY"
      }年${
        this.fromData.lastMeetingTime != 0
          ? new Date(this.fromData.lastMeetingTime).getMonth() + 1
          : "MM"
      }月${
        this.fromData.lastMeetingTime != 0
          ? new Date(this.fromData.lastMeetingTime).getDate()
          : "DD"
      }日召开了项目末次会议，确认了测评发现的问题；${
        this.fromData.confirmTime != 0
          ? new Date(this.fromData.confirmTime).getFullYear()
          : "YYYY"
      }年${
        this.fromData.confirmTime != 0
          ? new Date(this.fromData.confirmTime).getMonth() + 1
          : "MM"
      }月${
        this.fromData.confirmTime != 0
          ? new Date(this.fromData.confirmTime).getDate()
          : "DD"
      }日对系统的整改情况进行了复核确认。`;
    },
    addZeroOfDate(time){
      let str = time + ''
      let res = str
      if(str.length <= 1) res = `0${str}`
      
      return res
    },
    async func_getProjectTimeInfo() {
      let res = await this.$api.API_ProjectOverviewFindDetailTimePreview();
      
      let { data } = res;
      if (res.code !== 20000) return alert(res.message);
      
      this.saveData.id = data.id;

      if (!data.detailTimePreview) {
        this.func_calDateFun();
      } else {
        this.timeInfoInsert = data.detailTimePreview;
      }
    },
    transferDay(time){
      return new Date(time).getDay()
    },
    async saveInfoAndExit() {
      let that = this;
      this.saveData.detailTimePreview = this.timeInfoInsert;
      
      // if(this.tableData[8].evaluationCycle <= 3) return alert('现场实施过程阶段天数至少要有三天')

      let res = await this.$api.API_ProjectOverviewUpdateDetailTimePreview(
        this.saveData
      );

      if (res.code != 20000) return alert("保存失败");

      this.submitReport()

      this.dialogVisible = false;
    },
    async gainHoliday(data){
      let res = await request({
        url: 'http://www.easybots.cn/api/holiday.php',
        method: 'get',
        m:data
      })

      console.log(`节假日接口${res}`)
    }
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
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-align-items: center;
  align-items: center;
}
.descTItle .tijiaobaoc {
  display: inline-block;
  margin: 0;
}

.el-dialog {
  div {
    line-height: 180%;
  }
  .sentences {
    margin-bottom: 20px;
    span {
      color: red;
    }
    div {
      margin-bottom: 10px;
    }
  }
}
.styleRed {
  color: red;
}
.ql-snow .ql-editor pre.ql-syntax {
  background: #fff;
}
.el-table td{
  text-align:center!important;
}
</style>

