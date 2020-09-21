<!--评测过程-->
<template>
  <d2-container>
    <template slot="header">评测过程</template>
    <div class="reviewProcess">
      <div class="rev_jianjie">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>简介</span>
            <el-button style="float: right; padding: 3px 0" type="text">保存</el-button>
          </div>
          <div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 15}"
              placeholder="请输入内容"
              v-model="rev_jianjie_text"
            ></el-input>
          </div>
        </el-card>
      </div>
      <div class="detailedPro">
        <div class="detailedtablo">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>详细过程</span>
              <el-button style="float: right; padding: 3px 0" type="text">提交保存</el-button>
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
              <table id="tab02" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th>实施项目</th>
                    <th>实施细目</th>
                    <th>评测周期(天)</th>
                    <th>备注</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="2">123</td>
                    <td>
                      <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
                    </td>
                    <td>12xsxxxxxxxxxxxxxxxxxxxxxxxxxxxxx3</td>
                  </tr>
                  <tr>
                    <td>abc</td>
                    <td>abc</td>
                    <td>abc</td>
                    <td>123</td>
                  </tr>
                  <tr>
                    <td>一二三</td>
                    <td>一二三</td>
                    <td>一二三</td>
                    <td>123</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-card>
        </div>
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
    };
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
</style>

