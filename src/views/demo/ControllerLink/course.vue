<!--评测过程-->
<template>
  <d2-container>
    <div class="reviewProcess">
      <div class="rev_jianjie">
        <el-card class="box-card">
          <div  class="clearfix descTItle">
            <span>简介</span>
            
          </div>
          <div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 15}"
              placeholder="请输入内容"
              v-model="rev_jianjie_text"
            ></el-input>
          </div>
          <div class="detailedPro">
            <div class="detailedtablo">
              <div class="clearfix descTItle">
                <span>详细过程</span>
                
              </div>
              <div class="detailedTime">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <span>项目启动</span>
                      <el-date-picker v-model="xmutime" type="date" placeholder="选择日期"></el-date-picker>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <span>启动会议</span>
                      <el-date-picker v-model="qidohuiyi" type="date" placeholder="选择日期"></el-date-picker>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <span>未次会议</span>
                      <el-date-picker v-model="weicitime" type="date" placeholder="选择日期"></el-date-picker>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <span>复核确认</span>
                      <el-date-picker v-model="isqdtime" type="date" placeholder="选择日期"></el-date-picker>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="detailed_text_item">
                <el-table
                  :data="tableData"
                  :span-method="arraySpanMethod"
                  border
                  show-summary
                  sum-text="总计"
                  style="width: 100%"
                >
                  <el-table-column label="实施项目" prop="name" width="180">
                    <template slot-scope="scope">
                      <span
                        style="margin-left: 10px;font-weight: bold;"
                        v-if="scope.row.highlight"
                      >{{ scope.row.name }}</span>
                      <span style="margin-left: 10px" v-else>{{ scope.row.name }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="amount1" label="实施细目">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.amount1 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="amount2" label="测评周期(天)">
                    <template slot-scope="scope">
                      <el-input-number v-model="scope.row.amount2" controls-position="right"  :min="0" ></el-input-number>
                      <!-- <span style="margin-left: 10px">{{  }}</span> -->
                    </template>
                  </el-table-column>
                  <el-table-column prop="amount3" label="备注">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.amount3 }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div class="tijiaobaoc"><el-button style="float: right;" type="text">保存</el-button></div>
        </el-card>
      </div>
    </div>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      rev_jianjie_text: "",
      xmutime: "",
      qidohuiyi: "",
      weicitime: "",
      isqdtime: "",
      input_number: "",
      tableData: [
        {
          name: "一、测评准备过程",
          amount1: "",
          amount2: 0,
          amount3: "",
          len: 2,
          ist: 1,
          isfor: true,
          highlight: true,
        },
        {
          name: "现场调查",
          amount1: "",
          amount2: 0,
          amount3: "需要系统管理员配合访谈",
          len: 2,
          ist: 1,
          isfor: true,
        },
        {
          name: "工具和文档准备",
          amount1: "",
          amount2: 0,
          amount3: "",
          len: 2,
          ist: 1,
          isfor: true,
        },

        {
          name: "第一阶段输出结果：《测评系统基本情况调查报告》",
          amount1: "",
          amount2: 0,
          amount3: "",
          len: 4,
          ist: 1,
          isfor: true,
          highlight: true,
        },
        {
          name: "二、方案编制过程",
          amount1: "",
          amount2: 0,
          amount3: "",
          len: 2,
          ist: 1,
          isfor: true,
          highlight: true,
        },
        {
          name: "方案及计划制定审核",
          amount1: "",
          amount2: 0,
          amount3: "",
          len: 2,
          ist: 1,
          isfor: true,
        },
        {
          name:
            "第二阶段输出结果：《系统安全测评方案》、《系统安全测评现场实施计划》",
          amount1: "",
          amount2: 0,
          amount3: "",
          len: 4,
          ist: 1,
          isfor: true,
          highlight: true,
        },
        {
          name: "三、现场实施过程",
          amount1: "",
          amount2: 0,
          amount3: "",
          len: 2,
          ist: 1,
          isfor: true,
          highlight: true,
        },
        {
          name: "首次会议",
          amount1: "确认方案和计划，协调测评资源",
          amount2: 0,
          amount3: "需要系统方运行相关人员参与",
          len: 1,
          ist: 1,
          isfor: false,
        },
        {
          name: "安全物理环境",
          amount1: "机房环境",
          amount2: 0,
          amount3: "需要机房管理员配合",
          len: 1,
          ist: 1,
          isfor: false,
        },
        {
          name: "安全通信网络",
          amount1: "网络结构分析",
          amount2: 0,
          amount3: "以核查配置文件为主，需要网络管理员配合",
          len: 1,
          ist: 1,
          isfor: false,
        },
        {
          name: "安全区域边界",
          amount1: "区域边界",
          amount2: 0,
          amount3: "",
          len: 1,
          ist: 1,
          isfor: false,
        },
        {
          name: "安全计算环境",
          amount1: "操作系统核查",
          amount2: 0,
          amount3:
            "以核查配置文件为主，需要系统管理员配合；核查并验证安全功能的实现，需要应用系统管理员配合；访谈需要应用系统管理员或开发人员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全计算环境",
          amount1: "数据库核查",
          amount2: 0,
          amount3:
            "以核查配置文件为主，需要系统管理员配合；核查并验证安全功能的实现，需要应用系统管理员配合；访谈需要应用系统管理员或开发人员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全计算环境",
          amount1: "终端设备核查",
          amount2: 0,
          amount3:
            "以核查配置文件为主，需要系统管理员配合；核查并验证安全功能的实现，需要应用系统管理员配合；访谈需要应用系统管理员或开发人员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全计算环境",
          amount1: "安全设备核查",
          amount2: 0,
          amount3:
            "以核查配置文件为主，需要系统管理员配合；核查并验证安全功能的实现，需要应用系统管理员配合；访谈需要应用系统管理员或开发人员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全计算环境",
          amount1: "应用安全核查",
          amount2: 0,
          amount3:
            "以核查配置文件为主，需要系统管理员配合；核查并验证安全功能的实现，需要应用系统管理员配合；访谈需要应用系统管理员或开发人员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全计算环境",
          amount1: "数据安全核查分析",
          amount2: 0,
          amount3:
            "以核查配置文件为主，需要系统管理员配合；核查并验证安全功能的实现，需要应用系统管理员配合；访谈需要应用系统管理员或开发人员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全计算环境",
          amount1: "数据安全验证测试",
          amount2: 0,
          amount3:
            "以核查配置文件为主，需要系统管理员配合；核查并验证安全功能的实现，需要应用系统管理员配合；访谈需要应用系统管理员或开发人员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全计算环境",
          amount1: "验证测试",
          amount2: 0,
          amount3:
            "以核查配置文件为主，需要系统管理员配合；核查并验证安全功能的实现，需要应用系统管理员配合；访谈需要应用系统管理员或开发人员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全管理中心",
          amount1: "安全管理中心",
          amount2: 0,
          amount3: "以核查配置文件为主，需要系统管理员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },

        {
          name: "安全管理",
          amount1: "安全管理制度",
          amount2: 0,
          amount3: "以核查配置文件为主，需要系统管理员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全管理",
          amount1: "安全管理机构",
          amount2: 0,
          amount3: "以核查配置文件为主，需要系统管理员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全管理",
          amount1: "安全管理人员",
          amount2: 0,
          amount3: "以核查配置文件为主，需要系统管理员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全管理",
          amount1: "安全建设管理",
          amount2: 0,
          amount3: "以核查配置文件为主，需要系统管理员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "安全管理",
          amount1: "安全运维管理",
          amount2: 0,
          amount3: "以核查配置文件为主，需要系统管理员配合",
          len: 1,
          ist: 2,
          isfor: false,
        },

        {
          name: "漏洞扫描",
          amount1: "操作系统",
          amount2: 0,
          amount3: "需要系统管理员配合测试",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "漏洞扫描",
          amount1: "数据库",
          amount2: 0,
          amount3: "需要系统管理员配合测试",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "渗透性测试",
          amount1: "模拟从Ineternet非授权访问系统",
          amount2: 0,
          amount3: "需要网络管理员、系统管理员配合测试",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "测试结果初步分析",
          amount1: "",
          amount2: 0,
          amount3: "",
          len: 1,
          ist: 2,
          isfor: false,
        },
        {
          name: "末次会议",
          amount1: "测评结果交流确认、结果审核",
          amount2: 0,
          amount3: "需要系统方运行相关人员参与并确认测评结果",
          len: 1,
          ist: 2,
          isfor: false,
        },

        {
          name: "第三阶段输出结果：《系统安全测评记录表》",
          amount1: "",
          amount2: 0,
          amount3: "",
          len: 4,
          ist: 1,
          isfor: true,
          highlight: true,
        },
        {
          name: "四、分析与报告编制过程",
          amount1: "",
          amount2: 0,
          amount3: "",
          len: 2,
          ist: 1,
          isfor: true,
          highlight: true,
        },
        {
          name: "测评报告书写",
          amount1: "",
          amount2: 0,
          amount3: "",
          len: 2,
          ist: 1,
          isfor: true,
        },
        {
          name: "测评报告审核及签发",
          amount1: "",
          amount2: 0,
          amount3: "",
          len: 2,
          ist: 1,
          isfor: true,
        },
        {
          name: "第四阶段输出结果：《系统安全测评报告》",
          amount1: "",
          amount2: 0,
          amount3: "",
          len: 4,
          ist: 1,
          isfor: true,
          highlight: true,
        },
      ],
    };
  },
  methods: {
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
  created() {
    this.rev_jianjie_text =
      "受广州泰康粤园医院有限公司委托，广州华南信息安全测评中心（广州市中邦信息工程有限公司）于YYYY年MM月DD日至YYYY年MM月DD日对广州泰康粤园医院医院信息系统进行了系统安全等级测评工作。本次安全测评的范围主要包括广州泰康粤园医院医院信息系统的物理环境、主机、网络、业务应用系统、安全管理制度和人员等。安全测评通过静态评估、现场测试、综合评估等相关环节和阶段，从安全物理环境、安全通信网络、安全区域边界、安全计算环境、安全管理中心、安全管理制度、安全管理机构、安全管理人员、安全建设管理、安全运维管理等十个方面，对广州泰康粤园医院医院信息系统进行综合测评。";
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
        width: 150px;
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

