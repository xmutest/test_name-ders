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
              v-model="access_point_describe"
              @text-change="textChangeHandler"
            />
          </div>

          <div class="mude_text_item">
            <div class="descTItle">接入点图片</div>
            <div class="to_tim">
              <el-tag>操作提示</el-tag>
              <span>点击图片后可打开标记JA,JB等标记的页面</span>
              <div class="canvasArea" ref="canvasArea">
                <div class="toorBar">

                </div>
                <easel-canvas :width="cas.width" :height="cas.height">
                  <!-- <easel-shape
                      :x="200"
                      :y="150"
                      form="circle"
                      fill="blue"
                      :dimensions="20"
                      :align="['center','center']"
                  >
                  </easel-shape> -->
                  <!-- 使用图片要用require获取 -->
                  <easel-bitmap
                    :image="require('@/views/demo/ControllerLink/img/structure01.jpg')"
                    :x="cas.width / 2"
                    :y="0"
                    :align="['center','top']"
                  >
                  </easel-bitmap>

                </easel-canvas>
              </div>
              
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
      access_point_describe: "",
      cas:{
        width:0,
        height:0
      },
      
    };
  },
  created() {
    
  },
  mounted() {
    this.casSize()
  },
  computed: {
    
  },
  methods: {
    textChangeHandler(delta, oldDelta, source) {
      // console.log(delta,oldDelta,source)
    },
    getStyle(obj, attr) {
      if (obj.currentStyle) {
        return obj.currentStyle[attr];
      } else {
        return document.defaultView.getComputedStyle(obj, null)[attr];
      }
    },
    casSize(){
      let that = this
      let casBox = this.$refs.canvasArea
      
      this.cas.width = parseInt(that.getStyle(casBox, 'width'));
      this.cas.height = parseInt(that.getStyle(casBox, 'height'));
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
    span{
      margin-bottom:20px;
    }
  }
  .descTItle {
    @extend %unable-border-left;
  }
}
.el-card__header {
  border-bottom: 0px solid #ebeef5;
}
.canvasArea{
  width:100%;
  height:400px;
  border:1px solid #ccc;
}
</style>