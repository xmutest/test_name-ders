<!-- 测评对象选择方法 -->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">评测对象选择方法</div>
            <d2-quill
              style="min-height: 200px; margin-bottom: 20px"
              v-model="fromdata.obj_selection_method"
              @text-change="textChangeHandler"
            />
          </div>
           <div class="mude_text_item">
            <div class="descTItle">评测方法</div>
            <d2-quill
              style="min-height: 200px; margin-bottom: 20px"
              v-model="fromdata.evaluation_method"
              @text-change="textChangeHandler"
            />
          </div>
           <div class="mude_text_item">
            <div class="descTItle">评测工具</div>
            <div class="pc_gonjv">
              
            </div>
          </div>
         <div class="tijiaobaoc">
            <el-button  type="primary" @click="submitReport">保存</el-button>
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
        //测评对象选择方法
        obj_selection_method: "",
        //测评方法
        evaluation_method: "",
        //评测工具
        evaluation_tool: [],
      },
    };
  },
  methods: {
      textChangeHandler(delta, oldDelta, source) {
      // console.log(delta,oldDelta,source)
    },
    submitReport(){
      console.log(this.fromdata);
    }
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