<!--层面间安全测评-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">层面间安全测评</div>
            <d2-quill
              style="min-height: 200px; margin-bottom: 20px"
              v-model="fromdata.betweenLayers"
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
        betweenLayers: "",
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
        if (List.data == null || List.data.betweenLayers == null) {
          this.fromdata.betweenLayers = `
           
                层面间的安全测评主要考虑同一区域内的不同层面之间存在的功能增强、补充和削弱等关联作用。安全功能上的增强和补充可以使两个不同层面上的安全控制发挥更强的综合效能，可以使单个低等级安全控制在特定环境中达到高等级信息系统的安全要求。安全功能上的削弱会使一个层面上的安全控制影响另一个层面安全控制的功能发挥或者给其带来新的脆弱性。

        层面间测评举例 <br/>

        例子1：物理安全与主机系统安全 <br/>

        由于加强了机房的物理安全，采取限制进入屏蔽机房的人员，对进入机房的外来人员必须单位内部工作人员陪同，监视和限制其主机执行命令等措施，使得在物理上直接访问控制信息区的AIX主机变得安全可控。AIX机器上的本地登录用户的身份鉴别和自主访问控制功能虽然没有满足相应安全等级要求，但考虑物理安全的加强可以增强主机系统这方面安全功能。因此，可以适当降低强度身份鉴别和自主访问控制功能的要求，主机系统在总体的安全功能上也不会受到影响，仍能满足相应等级的安全要求。

         <br/>例子2：主机系统安全与系统运维管理

         <br/>对重点区的PC服务器，在系统运维管理中指定为专人运行维护，只有一个人可以使用该机器，主机系统上只有一个可以在本地登录的帐户。该机器在主机系统安全中的自主访问控制和资源控制虽然没有满足相应安全等级要求，但考虑到通过系统运维管理的加强可以增强主机系统这方面安全功能。因此，可以适当降低自主访问控制和资源控制的要求，主机系统在总体的安全功能上也不会受到影响，仍能满足相应等级的安全要求。
         `;
        } else {
          this.fromdata.betweenLayers = List.data.betweenLayers;

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

