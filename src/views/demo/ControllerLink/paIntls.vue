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
              
              <div class="toorBar">
                  <el-button type="primary">JA</el-button>
                  <el-button type="primary">JB</el-button>
                  <el-button type="primary">JC</el-button>
                  <el-button type="primary">JD</el-button>
                  <el-button type="primary">JE</el-button>
                  <el-button type="primary">JF</el-button>
              </div>

              <canvasToorBarSel></canvasToorBarSel>

              <div class="canvasArea" ref="canvasArea">
                <easel-canvas :width="cas.width" :height="cas.height" ref="canvaspic">
                <!-- <canvas :width="cas.width" :height="cas.height" ref="canvaspic"> -->
                  
                  <!-- 使用图片要用require获取 -->
                  <easel-bitmap
                    :image="require('@/views/demo/ControllerLink/img/structure01.jpg')"
                    :x="cas.width / 2"
                    :y="0"
                    :align="['center','top']"
                  >
                  </easel-bitmap>
                  <easel-bitmap
                    :image="require('@/views/demo/ControllerLink/img/palntlsImg/ja1.png')"
                    :x="0"
                    :y="0"
                    :align="['left','top']"
                    @mousedown="pointEvent($event)"
                    @pressmove.prevent="objMove($event)"
                    @mouseout="objOut($event)"
                  >
                  </easel-bitmap>
                  <!-- <easel-shape
                      :x="200"
                      :y="150"
                      form="circle"
                      fill="blue"
                      :dimensions="20"
                      :align="['center','center']"
                      @mousedown="pointEvent($event)"
                      @pressmove.prevent="objMove($event)"
                      @mouseout="objOut($event)"
                  >
                  </easel-shape> -->
                <!-- </canvas> -->
                </easel-canvas>
              </div>
              导出的结果图:
              <img src="" alt="" class="resPic">
            </div>
          </div>
        </el-card>
      </div>
      <!-- 图片 -->
    </div>
  </d2-container>
</template>

<script>
import canvasToorBarSel from '@/components/canvasToorBarSel/canvasToorBarSel'
export default {
  data() {
    return {
      access_point_describe: "",
      cas:{
        width:0,
        height:0
      },
      mouseInfo:{
        startX:0,
        startY:0,
        moveX:0,
        moveY:0,
        startLocateX:0,
        startLocateY:0
      }
    };
  },
  components:{
    canvasToorBarSel
  },
  created() {
    
  },
  mounted() {
    let that = this
    this.casSize()
    setTimeout(function(){
      that.outputPic()
    },1000)
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
    outputPic(){
      // console.log('canvaspic',this.$refs.canvaspic.$el)
      // canvas转base64图片
      let parper = this.$refs.canvaspic.$el
      var result = parper.toDataURL("image/png");

      // 获取获取图片
      let resPic = document.querySelector('.resPic')
      resPic.src = result
      // console.log(result)
    },
    pointEvent(e){

      // 触发事件对象
      let obj = e.currentTarget
      console.log('对象',obj)
      
      // 对象的位置
      // obj.x = 400
      // obj.y = 100

      this.mouseInfo.startLocateX = obj.x
      this.mouseInfo.startLocateY = obj.y

      this.mouseInfo.startX = e.stageX
      this.mouseInfo.startY = e.stageY

    },
    objMove(e){
      // console.log('mouseMove',e)
      this.mouseInfo.moveX = e.stageX
      this.mouseInfo.moveY = e.stageY

      let diveceX = this.mouseInfo.moveX - this.mouseInfo.startX
      let diveceY = this.mouseInfo.moveY - this.mouseInfo.startY


      // console.log('距离变化',diveceX,diveceY)

      // 触发事件对象
      let obj = e.currentTarget
      console.log('对象',e)

      
      

      // 获取图片宽高
      let imgWidth = obj.image.width
      let imgHeight = obj.image.height

      // console.log(obj.x,obj.y)

      // if(obj.x < 0 ){
      //   obj.x = 0
      // }else if(obj.x + imgWidth > this.cas.width){
      //   obj.x = this.cas.width - imgWidth
      // }else{
      //   obj.x = this.mouseInfo.startLocateX + diveceX
      // }

      // console.log(this.cas.width)

      // console.log(this.cas)

      obj.x = this.mouseInfo.startLocateX + diveceX
      obj.y = this.mouseInfo.startLocateY + diveceY

      if(obj.x < 0 || obj.x + imgWidth > this.cas.width){
        if(obj.x < 0){
          obj.x = 0
        }else{
          obj.x = this.cas.width - imgWidth
        }
      }

      // consoe.log(obj.x,obj.y)

      if(obj.y < 0 || obj.y + imgHeight > this.cas.height){
        if(obj.y < 0){
          obj.y = 0
        }else{
          obj.y = this.cas.height - imgHeight
        }
      }


      // console.log(this.mouseInfo)

      // this.mouseInfo.moveX
    },
    objOut(e){
      // 触发事件对象
      let obj = e.currentTarget
      console.log('对象',obj)

      this.mouseInfo.startLocateX = obj.x
      this.mouseInfo.startLocateY = obj.y
    }
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
.toorBar{
  width:100%;
  padding:0 20px;
  margin-bottom:20px;
}
</style>