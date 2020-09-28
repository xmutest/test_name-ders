<!-- 测评工具及接入点说明 -->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">接入点描述</div>
            <d2-quill
              style="min-height: 200px; margin-bottom: 20px;"
              v-model="jrdPoint"
              @text-change="textChangeHandler"
            />
          </div>

          <div class="mude_text_item">
            <div class="descTItle">接入点图片</div>
            <div class="to_tim">
              <el-tag>操作提示</el-tag>
              <span>点击图片后可打开标记JA,JB等标记的页面</span>
            </div>
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