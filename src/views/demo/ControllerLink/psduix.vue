<!-- 测评对象选择方法 -->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">评测对象选择方法</div>
            <el-input
              type="textarea"
              style="min-height: 200px; margin-bottom: 20px"
              :autosize="{ minRows: 15, maxRows: 25 }"
              placeholder="请输入内容"
              v-model="fromdata.objSelectionMethod"
            >
            </el-input>
          </div>
          <!-- <div class="mude_text_item">
            <div class="descTItle">评测方法</div>
            <el-input
              type="textarea"
              style="min-height: 200px; margin-bottom: 20px"
              :autosize="{ minRows: 10, maxRows: 15 }"
              placeholder="请输入内容"
              v-model="fromdata.evaluationMethod"
            >
            </el-input>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">测评工具</div>
            <div class="pc_gonjv">
              <el-tree
                :data="setFindAll"
                show-checkbox
                default-expand-all
                :default-checked-keys="listtools"
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps"
              >
              </el-tree>
            </div>
          </div> -->
          <div class="tijiaobaoc">
            <el-button type="primary" @click="submitReport">保存</el-button>
          </div>
        </el-card>
      </div>
      <!-- 图片 -->
    </div>
  </d2-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      listtools: [],
      fromdata: {
        id: "",
        //测评对象选择方法
        objSelectionMethod: "",
        //测评方法
        evaluationMethod: "",
        //评测工具
        tools: [],
      },
      setFindAll: [],
      defaultProps: {
        children: "toolsData",
        label: "menuName",
      },
    };
  },
  created() {
    this.getEtlist();
    
  },
  computed: {
    ...mapState("d2admin", {
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  methods: {
    // 获取评测工具
    async getFindAll() {
      let List = await this.$api.API_projectOverviewEvaluationToolFindAll();
      if (List.code === 20000) {
        this.setFindAll = List.data;
        // this.fromdata.id = List.data.id;
        //查询列表
      } else {
        this.$message.error(List.message + "评测依据选项出差，请联系管理员");
      }
    },
    textChangeHandler(delta, oldDelta, source) {
      // console.log(delta,oldDelta,source)
    },
    async getEtlist() {
      let List = await this.$api.API_projectOverviewdObjSelectionMethod();
      if (List.code === 20000) {
        this.getFindAll();
        this.fromdata = List.data;
        if (List.data.objSelectionMethod == null) {
          this.fromdata.objSelectionMethod = `    ${this.xmu_info.data.systemName}等级测评的测评对象种类上基本覆盖、数量进行抽样，重点抽查主要的设备、设施、人员和文档等。结合${this.xmu_info.data.systemName}的网络拓扑结构和业务情况，本次等级测评的测评对象在抽样时主要考虑以下几个方面：
    1) 主机房(包括其环境、设备和设施等)和部分辅机房,应将放置了服务于定级对象的局部(包括整体)或对定级对象的局部(包括整体)安全性起重要作用的设备、设施的辅机房选取作为测评对象；
    2) 存储被测定级对象重要数据的介质的存放环境；
    3) 办公场地；
    4) 整个系统的网络拓扑结构；
    5) 安全设备，包括防火墙、入侵检测设备和防病毒网关等；
    6) 边界网络设备(可能会包含安全设备)，包括路由器、防火墙、认证网关和边界接入设备(如楼层交换机)等；
    7) 对整个定级对象或其局部的安全性起作用的网络互联设备，如核心交换机、汇聚层交换机、路由器等；
    8) 承载被测定级对象主要业务或数据的服务器(包括其操作系统和数据库)；
    9) 管理终端和主要业务应用系统终端；
    10) 能够完成被测定级对象不同业务使命的业务应用系统；
    11) 业务备份系统；
    12) 信息安全主管人员、各方面的负责人员、具体负责安全管理的当事人、业务负责人；
    13) 涉及到定级对象安全的所有管理制度和记录。
    在本级定级对象测评时，定级对象中配置相同的安全设备、边界网络设备、网络互联设备、服务器、终端以及备份设备，每类应至少抽查两台作为测评对象。`;
        }
        let tools = [];
        List.data.tools.forEach((item) => {
          tools.push(item.evaluationToolId);
        });
        this.listtools = tools;
        // this.fromdata.id = List.data.id;
        //查询列表
      } else {
        this.$message.error(List.message + "评测依据选项出差，请联系管理员");
      }
    },
    async submitReport() {
      // let tolist = this.$refs.tree.getCheckedKeys().filter((item) => {
      //   if (item != "undefined") {
      //     return item;
      //   }
      // });
      // let isT = [];
      // tolist.forEach((element) => {
      //   let em = {};
      //   em.evaluationToolId = element;
      //   isT.push(em);
      // });
      // this.fromdata.tools = isT;
      let res = await this.$api.API_evaluationBasis_updata(this.fromdata);
      if (res.code === 20000) {
        this.$message.success("修改成功！！");
        this.getEtlist();
        //查询列表
      } else {
        this.$message.error("错误，请联系管理员" + res.message);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
</style>