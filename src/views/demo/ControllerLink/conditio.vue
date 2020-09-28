<!--被测信息系统情况-->
<template>
  <d2-container>
    <div class="mude_is">
      
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">被测信息系统情况</div>
            <d2-quill
              style="min-height: 200px; margin-bottom: 20px;"
              v-model="jrdPoint"
              @text-change="textChangeHandler"
            />
          </div>

          <div class="mude_text_item">
            <div class="descTItle">前次测评情况</div>
            <div class="to_tim">
              <d2-quill
                style="min-height: 200px; margin-bottom: 20px;"
                v-model="qianc_ko"
                @text-change="textChangeHandler"
              />
            </div>
          </div>
          <div class="tijiaobaoc">
            <el-button style="float: right;" type="text">保存</el-button>
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
      jrdPoint: "",
      qianc_ko: "",
    };
  },
  methods: {
    textChangeHandler(delta, oldDelta, source) {
      // console.log(delta,oldDelta,source)
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