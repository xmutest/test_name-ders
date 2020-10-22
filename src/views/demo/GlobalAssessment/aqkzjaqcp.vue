<!--安全控制间安全测评cmjaqcp-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">安全控制间安全测评</div>
            <d2-quill
              style="min-height: 200px; margin-bottom: 20px"
              v-model="fromdata.safetyControlRoom"
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
        safetyControlRoom: "",
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
        

        if(List.data == null || List.data.safetyControlRoom == null){
          this.fromdata.safetyControlRoom = `
          <pre>
            安全控制间的安全测评主要考虑同一区域内、同一层面上的不同安全控制间存在的功能增强、补充或削弱等关联作用。安全功能上的增强和补充可以使两个不同强度、不同等级的安全控制发挥更强的综合效能，可以使单个低等级安全控制在特定环境中达到高等级信息系统的安全要求。例如，可以通过物理层面上的物理访问控制来增强其安全防盗窃功能等。安全功能上的削弱会使一个安全控制的引入影响另一个安全控制的功能发挥或者给其带来新的脆弱性。例如，应用安全层面的代码安全与访问控制，如果代码安全没有做好，很可能会使应用系统的访问控制被旁路。

            安全控制间测评举例

            例子1：物理访问控制与防盗窃安全功能增强（物理安全）

            中心机房只有一个出入口，在物理访问控制上安排24小时专人值守中心机房的出入口。这有助于增强防盗窃安全控制的安全功能。通过专人值守可以及时发现并阻止设备被盗窃。

            例子2：身份鉴别、自主访问控制中的安全功能消弱和增强（主机系统安全）

            3台AIX机器有两台机器A和B存在信任关系，AIX机器A和B上各有一个帐户a和b，建立了帐户的相互协同信任关系。在机器A上以帐户a登录，就可以毫无阻拦地使用任何以r*开头的远程调用命令，在机器B上执行相当于帐户b的权限。测试发现机器A帐户a的身份鉴别存在薄弱口令，直接影响到机器B的安全。
        </pre>
          `
        }else{
          this.fromdata.safetyControlRoom = List.data.safetyControlRoom

          this.fromdata.id = List.data.id;
        }

        //查询列表
      } else {
        this.$message.error(List.message + "评测依据选项出差，请联系管理员");
      }
    },
    async submitReport() {
      let res = '';
      if(this.fromdata.id){
        // 修改
        res = await this.$api.API_WholeEvaluationUpdateWholeEvaluation(this.fromdata);
      }else{
        // 保存
        res = await this.$api.API_WholeEvaluationSaveWholeEvaluation(this.fromdata);
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
