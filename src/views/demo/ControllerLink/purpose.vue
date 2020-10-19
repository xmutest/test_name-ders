<!--评测目的-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">评测目的</div>
            <d2-quill
              style="min-height: 200px; margin-bottom: 20px"
              v-model="fromdata.evaluationObjective"
              @text-change="textChangeHandler"
            />
          </div>

          <div class="mude_text_item">
            <div class="descTItle">评测依据选项</div>
            <div class="to_tims">
              <el-checkbox-group v-model="fromdata.otherEvaluationBasis">
                <el-checkbox
                  v-for="item in evaluation_list"
                  :label="item.evaluationBasisName"
                  :key="item.evaluationBasisName"
                ></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">其他评测依据</div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请以逗号隔开"
              v-model="fromdata.evaluationBasis"
              @text-change="textChangeHandler"
            ></el-input>
            <div
              data-v-231d5a32=""
              style="font-size: 12px; margin: 10px; color: red"
            >
              <span data-v-231d5a32="" style="/* font-size: 12px; */"
                >请以逗号分割多个依据</span
              >
            </div>
          </div>
          <div class="tijiaobaoc">
            <el-button type="primary" @click="submitReport">保存</el-button>
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
      fromdata: {
        //评测目的
        evaluationObjective: "",
        //其他依据
        evaluationBasis: "",
        id: "",
        // 依据选项
        otherEvaluationBasis: [],
      },
      evaluation_list: [],
    };
  },
  created() {
    this.getevaluationBasisFindAll();
    this.getEtlist();
  },
  computed: {
    ...mapState("d2admin", {
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  methods: {
    async getEtlist() {
      let List = await this.$api.API_projectOverviewObjective();
      let data = "";
      if (List.code === 20000) {
        if (List.data.evaluationObjective != null) {
          data = List.data.evaluationObjective;
        } else {
          data = `安全等级测评的目的是通过对目标系统在安全技术及管理方面的测评，对目标系统的安全技术状态及安全管理状况做出初步判断，给出目标系统在安全技术及安全管理方面与其相应安全等级保护要求之间的差距。测评结论作为委托方进一步完善系统安全策略及安全技术防护措施依据。
         <br>
        为进一步提高信息系统的保障能力，根据《信息安全等级保护管理办法》（公通字2007【43】号）的精神，${this.xmu_info.data.evaluatedUnit}委托广州华南信息安全测评中心（广州市中邦信息工程有限公司）（DJCP2010440126）对${this.xmu_info.data.systemName}实施等级测评，以期发现信息系统和等级保护标准的差距以及存在的安全隐患，为后续的安全整改工作提供参考依据。`;
        }
        if (List.data.otherEvaluationBasis != null) {
          this.fromdata.otherEvaluationBasis = List.data.otherEvaluationBasis.split(
            ","
          );
        }
        if (List.data.evaluationBasis == null) {
          this.fromdata.evaluationBasis = `${this.xmu_info.data.systemName}定级报告`;
        } else {
          this.fromdata.evaluationBasis = List.data.evaluationBasis;
        }

        this.fromdata.evaluationObjective = data;
        this.fromdata.id = List.data.id;
        //查询列表
      } else {
        this.$message.error(List.message + "评测依据选项出差，请联系管理员");
      }
    },
    async getevaluationBasisFindAll() {
      let res = await this.$api.API_evaluationBasisFindAll();
      if (res.code === 20000) {
        this.evaluation_list = res.data;
        //查询列表
      } else {
        this.$message.error(res.message + "评测依据选项出差，请联系管理员");
      }
    },
    textChangeHandler(delta, oldDelta, source) {
      // console.group('QuillEditor textChangeHandler')
      // console.log(delta, oldDelta, source)
      // console.groupEnd()
    },
    async submitReport() {
      this.fromdata.otherEvaluationBasis = this.fromdata.otherEvaluationBasis.join(
        ","
      );
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
  .mude_is_right > div {
    margin: 20px 0;
  }
  .to_tims {
    height: 300px;
    overflow: auto;
    margin: 5px 0 15px 0;
    .el-checkbox-group {
      .el-checkbox {
        display: block;
        margin: 5px 0;
      }
    }
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

