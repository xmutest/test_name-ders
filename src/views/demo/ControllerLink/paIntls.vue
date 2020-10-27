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
              style="min-height: 200px; margin-bottom: 20px"
              v-model="fromdata.accessPointDescribe"
              @text-change="textChangeHandler"
            />
          </div>

          <div class="mude_text_item">
            <div class="descTItle">接入点图片</div>
            <div class="to_tim">
              <el-tag>操作提示</el-tag>
              <span>点击图片后可打开标记JA,JB等标记的页面</span>

              <div class="openChangeMode">
                <el-button type="primary" @click="showCanvas = true"
                  >修改</el-button
                >
              </div>

              <canvasToorBarSel
                :showControl="showTools"
                :selIndex="inputIndex"
                @close="closeControl"
                @addPic="casAdd"
              ></canvasToorBarSel>

              <div class="casWindow" v-show="showCanvas">
                <div class="canvasArea" ref="canvasArea">
                  <div class="toorBar">
                    <el-button
                      type="primary"
                      data-index="a"
                      @click="showToolsFun($event)"
                      >JA</el-button
                    >
                    <el-button
                      type="primary"
                      data-index="b"
                      @click="showToolsFun($event)"
                      >JB</el-button
                    >
                    <el-button
                      type="primary"
                      data-index="c"
                      @click="showToolsFun($event)"
                      >JC</el-button
                    >
                    <el-button
                      type="primary"
                      data-index="d"
                      @click="showToolsFun($event)"
                      >JD</el-button
                    >
                    <el-button
                      type="primary"
                      data-index="e"
                      @click="showToolsFun($event)"
                      >JE</el-button
                    >
                    <el-button
                      type="primary"
                      data-index="f"
                      @click="showToolsFun($event)"
                      >JF</el-button
                    >

                    <el-button type="primary">使用网络结构图</el-button>
                    <el-button type="primary" @click="saveCanvas"
                      >保存</el-button
                    >
                    <img
                      :src="
                        require('@/views/demo/ControllerLink/img/close.png')
                      "
                      @click="showCanvas = false"
                      class="casClose"
                    />
                  </div>
                  <easel-canvas
                    :width="1000"
                    :height="500"
                    ref="canvaspic"
                    class="canvasObj"
                  >
                    <!-- 使用图片要用require获取 -->
                    <easel-bitmap
                      :image="
                        require('@/views/demo/ControllerLink/img/structure01.jpg')
                      "
                      :x="1000 / 2"
                      :y="500 / 2"
                      :align="['center', 'center']"
                    >
                    </easel-bitmap>

                    <easel-bitmap
                      :image="
                        require(`@/views/demo/ControllerLink/img/palntlsImg/${item}.png`)
                      "
                      :x="0"
                      :y="0"
                      :align="['left', 'top']"
                      @mousedown="objTouch($event)"
                      @pressmove.prevent="objMove($event)"
                      @mouseout="objOut($event)"
                      v-for="(item, key) in bitmapArr"
                      :key="key"
                    >
                    <!-- <easel-bitmap
                      :image="
                        require(`@/views/demo/ControllerLink/img/palntlsImg/${item}.png`)
                      "
                      :x="0"
                      :y="0"
                      :align="['left', 'top']"
                      @mousedown="objTouch($event)"
                      v-for="(item, key) in bitmapArr"
                      :key="key"
                    > -->
                    </easel-bitmap>
                  </easel-canvas>
                </div>
              </div>

              <img
                src="@/views/demo/ControllerLink/img/structure01.jpg"
                alt=""
                class="resPic"
              />
            </div>
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
import canvasToorBarSel from "@/components/canvasToorBarSel/canvasToorBarSel";
export default {
  data() {
    return {
      fromdata: {
        id: "",
        accessPointDescribe: "",
      },
      cas: {
        width: 0,
        height: 0,
      },
      mouseInfo: {
        startX: 0,
        startY: 0,
        moveX: 0,
        moveY: 0,
        startLocateX: 0,
        startLocateY: 0,
      },
      showTools: false,
      inputIndex: "",
      showCanvas: false,
      bitmapArr: [],
      imgUrl:''
    };
  },
  components: {
    canvasToorBarSel,
  },
  created() {
    this.getEtlist();
  },
  mounted() {
    let that = this;
    this.casSize();
    // setTimeout(function(){
    //   that.outputPic()
    // },1000)
  },
  computed: {},
  methods: {
    //  获取网络结构图片
     async getlistdataImg() {
      
      let res = await this.$api.API_findNetworkImg();
      if (res.code === 20000) {
        if (res.data !== null) {
          this.imgUrl =
            "/evaluation/static" + res.data.imgUrl + res.data.imgName;
        }
      }
      if (res.code !== 20000) {
        this.$message.error("图片获取失败，请联系管理员" + res.message);
      }
    },
    textChangeHandler(delta, oldDelta, source) {
      // console.log(delta,oldDelta,source)
    },
    async getEtlist() {
      let List = await this.$api.API_projectOverviewfindAccessPointDescribe();
      if (List.code === 20000) {
        this.fromdata = List.data;
        //查询列表
      } else {
        this.$message.error(List.message + "评测依据选项出差，请联系管理员");
      }
    },
    async submitReport() {
      let res = await this.$api.API_evaluationBasis_updata(this.fromdata);
      if (res.code === 20000) {
        this.$message.success("修改成功！！");
        this.getEtlist();
        //查询列表
      } else {
        this.$message.error("错误，请联系管理员" + res.message);
      }
    },
    getStyle(obj, attr) {
      if (obj.currentStyle) {
        return obj.currentStyle[attr];
      } else {
        return document.defaultView.getComputedStyle(obj, null)[attr];
      }
    },
    // 画布尺寸
    casSize() {
      let that = this;
      let casBox = this.$refs.canvasArea;
    },
    // 保存图片
    saveCanvas() {
      let parper = this.$refs.canvaspic.$el;
      var result = parper.toDataURL("image/png");

      // 获取获取图片
      let resPic = document.querySelector(".resPic");
      resPic.src = result;
    },
    // 移动元素
    objTouch(e) {
      let that = this
      let obj = e.currentTarget;
      this.mouseInfo.startLocateX = obj.x;
      this.mouseInfo.startLocateY = obj.y;

      this.mouseInfo.startX = e.stageX;
      this.mouseInfo.startY = e.stageY;
      
                      // @pressmove.prevent="objMove($event)"
                      // @mouseout="objOut($event)"

      // console.log(document.body)
      // console.log(this.objMove)
      // let body = document.body

      
      // console.log(that)
      this.$el.addEventListener('mousemove',this.objMove(e))

    },
    objMove(e) {
      
      // 触发事件对象
      let obj = e.currentTarget;
      
      // 获取图片宽高
      let imgWidth = obj.image.width;
      let imgHeight = obj.image.height;




      this.mouseInfo.moveX = e.stageX;
      this.mouseInfo.moveY = e.stageY;
      
      let diveceX = this.mouseInfo.moveX - this.mouseInfo.startX;
      let diveceY = this.mouseInfo.moveY - this.mouseInfo.startY;


      let judgeX = this.mouseInfo.startLocateX + diveceX
      let judgeY = this.mouseInfo.startLocateY + diveceY

      if (judgeX < 0 || judgeX + imgWidth > 1000) {
        if (judgeX < 0) {
          judgeX = 0;
        } else {
          judgeX = 1000 - imgWidth;
        }
        // this.mouseInfo.moveX = 0
        // this.objOut(e)
      }

      if (judgeY < 0 || judgeY + imgHeight > 500) {
        if (judgeY < 0) {
          judgeY = 0;
        } else {
          judgeY = 500 - imgHeight;
        }
        // this.mouseInfo.moveY = 0
        // this.objOut(e)
      }


      obj.x = judgeX;
      obj.y = judgeY;

      //超出做限制
      // if (obj.x < 0 || obj.x + imgWidth > 1000) {
      //   if (obj.x < 0) {
      //     obj.x = 0;
      //   } else {
      //     obj.x = 1000 - imgWidth;
      //   }
      //   // this.mouseInfo.moveX = 0
      //   // this.objOut(e)
      // }else{
        
      // }

      // if (obj.y < 0 || obj.y + imgHeight > 500) {
      //   if (obj.y < 0) {
      //     obj.y = 0;
      //   } else {
      //     obj.y = 500 - imgHeight;
      //   }
      //   // this.mouseInfo.moveY = 0
      //   // this.objOut(e)
      // }else{
        
      // }

      console.log('移动',parseInt(obj.x),parseInt(obj.y),parseInt(this.mouseInfo.moveX),parseInt(this.mouseInfo.moveY))



      // if (obj.x < 0 || obj.x + imgWidth > 1000){
      //   // 左右顶边
    
      // }

      // if(obj.x <= 0 && obj.y <= 0){
      //   obj.x = 0,obj.y = 0
      // }else if(obj.x <= 0 && obj.y + imgHeight > 500){
      //   obj.x = 0,obj.y = 500 - imgHeight;
      // }else if(obj.x <= 0 && obj.y > 0 && obj.y + imgHeight <= 500){
      //   obj.x = 0
      // }

      // if(obj.x + imgWidth > 1000 && obj.y <= 0){
      //   obj.x = 1000 - imgWidth,obj.y = 0
      // }else if(obj.x + imgWidth > 1000 && obj.y + imgHeight > 500){
      //   obj.x = 1000 - imgWidth,obj.y = 500 - imgHeight;
      // }else if(obj.x + imgWidth > 1000 && obj.y > 0 && obj.y + imgHeight <= 500){
      //   obj.x = 1000 - imgWidth
      // }
      

    },
    objOut(e) {
      // 触发事件对象
      let obj = e.currentTarget;

      this.mouseInfo.startLocateX = obj.x;
      this.mouseInfo.startLocateY = obj.y;
    },
    // 流程工具选择
    showToolsFun(e) {
      let flag = false;
      for (let i = 0; i < this.bitmapArr.length; i++) {
        if (this.bitmapArr[i].indexOf(e.currentTarget.dataset.index) != -1)
          flag = true;
      }

      if (flag) {
        return this.$message({
          message: `已经选过 j${e.currentTarget.dataset.index} 了`,
          type: "warning",
        });
      }

      this.showTools = true;
      this.inputIndex = e.currentTarget.dataset.index;
    },
    closeControl(e) {
      this.showTools = e;
    },
    // 动态往画布添加元素
    casAdd(e) {
      let pic = require(`@/views/demo/ControllerLink/img/palntlsImg/${e}.png`);
      // let picData = {
      //   src:pic,
      //   locateX:0,
      //   locateY:0,

      // }
      this.bitmapArr.push(e);
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
    span {
      margin-bottom: 20px;
    }
  }
  .descTItle {
    @extend %unable-border-left;
  }
}
.el-card__header {
  border-bottom: 0px solid #ebeef5;
}
.canvasArea {
  width: 1000px;
  height: 700px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 1px solid #ccc;
  background: #fff;
}
.resPic {
  border: 1px solid #ccc;
}

.casWindow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
}

.canvasObj {
  border:2px solid black;
  box-sizing:border-box;
  // margin:0 auto;
}

.openChangeMode {
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
}
.toorBar {
  width: 100%;
  padding: 20px 20px 0;
  margin-bottom: 20px;
  box-sizing: border-box;
}
.casClose {
  width: 30px;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  cursor: pointer;
}
</style>