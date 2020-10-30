<!--区域间安全测评-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">区域间安全测评</div>
            <d2-quill
              style="min-height: 200px; margin-bottom: 20px"
              v-model="fromdata.interregional"
              @text-change="textChangeHandler"
            />
          </div>
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
export default {
  data() {
    return {
      fromdata: {
        interregional: "",
        id: "",
      },
    };
  },
  created() {
    this.getEtlist();
  },
  methods: {
    textChangeHandler(delta, oldDelta, source) {
      // console.log(delta,oldDelta,source)
    },
    async getEtlist() {
      let List = await this.$api.API_WholeEvaluationFindWholeEvaluation();
      if (List.code === 20000) {
        if (List.data == null || List.data.interregional == null) {
          this.fromdata.interregional = `
         
          区域间的安全测评主要考虑互连互通（包括物理上和逻辑上的互连互通等）的不同区域之间存在的安全功能增强、补充和削弱等关联作用，特别是有数据交换的两个不同区域。例如，流入某个区域的所有网络数据都已经在另一个区域上做过网络安全审计，则可以认为该区域通过区域互连后具备网络安全审计功能。安全功能上的增强和补充可以使两个不同区域上的安全控制发挥更强的综合效能，可以使单个低等级安全控制在特定环境中达到高等级信息系统的安全要求。安全功能上的削弱会使一个区域上的安全功能影响另一个区域安全功能的发挥或者给其带来新的脆弱性。
 <br/> <br/>
          区域间测评举例
 <br/>
          例子1：中心机房和屏蔽机房之间
 <br/>
          由于屏蔽机房是建设在中心机房内部的，它只有一个出入口，该出入口在中心机房内。因此，在中心机房的出入口上安排24小时专人值守等措施，可以解决屏蔽机房区域上的物理访问控制等相应措施的安全功能，使其达到该区域物理安全所要求的安全保护强度。
 <br/>
          例子2：DMZ区与服务区之间
 <br/> <br/>
          被测系统在全网部署了统一的网络防病毒服务器，该服务器位于中心机房服务区。在DMZ的FTP服务器上安装了网络防病毒的客户端。为了使FTP服务器上的防病毒客户端软件能够得到及时的、统一的升级服务和其他管理，在FTP服务器上安装了双网卡，一个网卡连接到DMZ区的交换机上，使用公网IP地址；另外一个网卡连接到核心交换机6509的服务区上，使用内部网络IP地址。DMZ区上的防火墙FW1设置规则禁止任何从DMZ区主机上发起的，连接到内部网络服务区的行为，也就是，在网络访问控制上采取的是禁止措施。但是，由于DMZ区与服务区除了防火墙FW1这一网络通道外，还有FTP服务器（双网卡），防火墙FW1的访问控制规则被旁路，使得其网络访问控制失效。
 <br/>
          在实际测评中，可以通过利用FTP服务器漏洞，先侵入FTP服务器，取得管理控制权限，然后进一步利用其作为跳板，进一步攻击服务区上的机器，得以验证。因此，边界区域DMZ区与信息系统内部区域服务区之间存在安全功能的削弱作用，使网络访问控制的功能等级降低，其安全功能已不能满足信息系统安全等级的安全要求，可以确定该措施已影响到信息系统的整体安全保护能力。
         
          `;
        } else {
          this.fromdata.interregional = List.data.interregional;

          this.fromdata.id = List.data.id;
        }
        //查询列表
      } else {
        this.$message.error(List.message + "评测依据选项出差，请联系管理员");
      }
    },
    async submitReport() {
      let res = "";
      if (this.fromdata.id) {
        // 修改
        res = await this.$api.API_WholeEvaluationUpdateWholeEvaluation(
          this.fromdata
        );
      } else {
        // 保存
        res = await this.$api.API_WholeEvaluationSaveWholeEvaluation(
          this.fromdata
        );
      }
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
</style>


