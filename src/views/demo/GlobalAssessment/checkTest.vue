<!--验证测试-->
<template>
  <d2-container>
    <div class="mude_is">
      <!-- 富文本输入框 -->
      <div class="mude_is_left">
        <el-card class="box-card">
          <div class="mude_text_item">
            <div class="descTItle">验证测试</div>
            <el-input
              style="min-height: 200px;  margin-bottom: 20px"
              type="textarea"
              :autosize="{ minRows: 10, maxRows: 15 }"
              placeholder="请输入内容"
              v-model="fromdatas.verificationTest"
            >
                          </el-input
            >
          </div>
          <div class="mude_text_item">
            <div class="descTItle">接入点描述</div>
            <el-input
              style="min-height: 200px;  margin-bottom: 20px"
              type="textarea"
              :autosize="{ minRows: 10, maxRows: 15 }"
              placeholder="请输入内容"
              v-model="fromdata.accessPointDescribe"
            >
            </el-input
            >
          </div>
          <div class="tijiaobaoc">
            <el-button type="primary" @click="submitReport">保存</el-button>
          </div>
          <div class="mude_text_item">
            <div class="descTItle">接入点图片</div>
            <div class="tijiaobaoc">
              <el-button type="primary" @click="openCanvasArea"
                >修改图片</el-button
              >
            </div>
            <div class="to_tim">
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

                    <el-button type="primary" @click="getlistdataImg()"
                      >使用网络结构图</el-button
                    >
                    <el-upload
                      class="avatar-uploader"
                      action=""
                      :before-upload="beforePicUpload"
                      :show-file-list="false"
                    >
                      <el-button type="primary">使用其他图片</el-button>
                    </el-upload>
                    <el-button type="danger" @click="delectObj"
                      >移除</el-button
                    >
                    <el-button type="primary" @click="saveNewCanvas"
                      >保存</el-button
                    >
                    <!-- <el-button type="primary" @click="drawRect"
                      >画正方形</el-button
                    > -->
                    <el-button type="primary" v-if="false" @click="selShapeArea = true"
                      >形状</el-button
                    >
                    <el-button type="primary" @click="showShapeFun($event)" 
                      v-for="(item,key) in designIcon"
                      :data-icon="item.value" 
                      :data-sort="item.value"
                      :data-nums="item.num"
                      :key=key
                      v-show="false"
                    >
                      {{item.name}}
                    </el-button>
                    <el-button type="primary" v-if="false" @click="inputWordArea = true"
                      >文字输入</el-button
                    >
                    <el-popover
                      width="400"
                      trigger="click"
                      v-if="false"
                    >
                      <div class="arrowArea">
                        <img :src="require('@/views/demo/GlobalAssessment/img/icon/top_arrow.png')" data-icon="top_arrow" @click="drawDesign($event)" class="iconPic"  alt="">
                        <img :src="require('@/views/demo/GlobalAssessment/img/icon/right_arrow.png')" data-icon="right_arrow" @click="drawDesign($event)" class="iconPic"  alt="">
                        <img :src="require('@/views/demo/GlobalAssessment/img/icon/down_arrow.png')" data-icon="down_arrow" @click="drawDesign($event)" class="iconPic"  alt="">
                        <img :src="require('@/views/demo/GlobalAssessment/img/icon/left_arrow.png')" data-icon="left_arrow" @click="drawDesign($event)" class="iconPic"  alt="">
                      </div>
                      <el-button slot="reference" type="primary" class="buttonStyle">箭头</el-button>
                    </el-popover>
                    <el-button type="danger" @click="canvasReset"
                      >清空</el-button
                    >
                    <img
                      :src="
                        require('@/views/demo/ControllerLink/img/close.png')
                      "
                      @click="showCanvas = false"
                      class="casClose"
                    />
                  </div>

                  <canvas
                    id="canvas"
                    width="1000"
                    height="500"
                    class="canvasObj"
                  ></canvas>
                </div>
              </div>

              <img :src="imgUrls" alt="" class="resPic" />
            </div>
            <!-- 形状选择 -->
            <el-dialog
              title="形状选择"
              :visible.sync="selShapeArea"
              width="50%"
            >
              <el-image
              v-for="(item,key) in shape"
              :key="key"
              :src="item.value"
              class="shapeStyle"
              :data-icon="item.name"
              @click="selShape($event)"
              fit="contain"></el-image>
              <span slot="footer" class="dialog-footer" v-show="false">
                <el-button @click="selShapeArea = false">取 消</el-button>
                <el-button type="primary" @click="rectPaint">确 定</el-button>
              </span>
            </el-dialog>
            
            <!-- 文字输入 -->
            <el-dialog
              title="文字输入"
              :visible.sync="inputWordArea"
              width="50%"
            >
              <el-input v-model="inputContent.content" placeholder="请输入内容"></el-input>
              <div class="wordSetting">
                字体大小:
                <el-input-number 
                  v-model="inputContent.size" 
                  @change="handleChange"
                  :min="16"
                  :max="60" label="描述文字"
                ></el-input-number>
                字体颜色:<el-color-picker v-model="inputContent.color"></el-color-picker>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="inputWordArea = false">取 消</el-button>
                <el-button type="primary" @click="wordInput">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-card>
        <canvasShapeSel
          :showControl="showShape"
          :selIndex="inputSort"
          :shapeNums="canvasShapeNums"
          @close="closeShapeArea"
          @addPic="shapeAdd"
        ></canvasShapeSel>
      </div>
      <!-- 图片 -->
    </div>
  </d2-container>
</template>

<script>
import canvasToorBarSel from "@/components/canvasToorBarSel/canvasToorBarSel";
import canvasShapeSel from "@/components/canvasShapeSel/canvasShapeSel";

import { mapState } from "vuex";
export default {
  data() {
    return {
      fromdatas: {
        verificationTest: "",
        id: "",
      },
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
      showShape: false,
      inputIndex: "",
      inputSort: "",
      showCanvas: false,
      bitmapArr: [],
      // 网络结构图
      imgUrl: "",
      // 接入点图片
      imgUrls: "",
      imgUrlsid: "",
      designIcon:[
        {
          value:'database',
          name:'数据库',
          num:9
        },
        {
          value:'safeDefend',
          name:'安全防护',
          num:9
        },
        {
          value:'computer',
          name:'计算机',
          num:7,
        },
        {
          value:'serve',
          name:'服务器',
          num:7,
        },
        {
          value:'network',
          name:'网络',
          num:7,
        },
        {
          value:'frame',
          name:'机架',
          num:6,
        },
        {
          value:'user',
          name:'用户',
          num:6,
        },
        {
          value:'firewall',
          name:'防火墙',
          num:5,
        },
        {
          value:'switchboard',
          name:'交换机',
          num:7,
        },
      ],
      shape:[
        {
          value:require(`@/views/demo/GlobalAssessment/img/icon/square.png`),
          name:'square',
          desc:'正方形'
        },
        {
          value:require(`@/views/demo/GlobalAssessment/img/icon/rect.png`),
          name:'rect',
          desc:'矩形'
        },
        {
          value:require(`@/views/demo/GlobalAssessment/img/icon/line.png`),
          name:'line',
          desc:'直线'
        },
        {
          value:require(`@/views/demo/GlobalAssessment/img/icon/dottedLine.png`),
          name:'dottedLine',
          desc:'虚线'
        },
        {
          value:require(`@/views/demo/GlobalAssessment/img/icon/dottedSqure.png`),
          name:'dottedSqure',
          desc:'虚线正方形'
        },
        {
          value:require(`@/views/demo/GlobalAssessment/img/icon/dottedRect.png`),
          name:'dottedRect',
          desc:'虚线矩形'
        },
        {
          value:require(`@/views/demo/GlobalAssessment/img/icon/cloud.png`),
          name:'cloud',
          desc:'云框'
        },
      ],
      selShapeArea:false,
      rectWidth:0,
      rectLength:0,
      inputWordArea:false,
      inputContent:{
        content:'',
        size:26,
        color:'#000000',
      },  //输入的内容
      canvasShapeNums:0,  //拓补图当前选择图案的数量
    };
  },
  created() {
    this.getEtlist();
  },
  computed: {
    ...mapState("d2admin", {
      xmu_info: (state) => state.xmu.xmu_info,
    }),
  },
  mounted() {
    let that = this;
    this.casSize();
    this.getimgUrls();

    // fabric
    this.initCanvas();

  },
  components: {
    canvasToorBarSel,
    canvasShapeSel
  },
  methods: {
    // 使用其他图片
    async beforePicUpload(file) {
      if (this.imgUrlsid == "") {
        let res = await this.$api.API_ImgSaveAccessPointImg({
          file,
        });
        if (res.code === 20000) {
          this.$message.success("保存图片成功！！");
          this.getimgUrls();
          //查询列表
        } else {
          this.$message.error("错误，请联系管理员" + res.message);
        }
      } else {
        let res = await this.$api.API_imgupdateImg({
          file,
          id: this.imgUrlsid,
        });
        if (res.code === 20000) {
          this.$message.success("更新图片成功！！");
          this.getimgUrls();
          //查询列表
        } else {
          this.$message.error("错误，请联系管理员" + res.message);
        }
      }
    },
    //  获取接入点图片
    async getimgUrls() {
      let res = await this.$api.API_ImgFindAccessPointImg();
      if (res.code === 20000) {
        if (res.data !== null) {
          let that = this
          this.imgUrls = res.data.imgUrl + res.data.imgName;
          this.imgUrlsid = res.data.id;

          setTimeout(function(){
            that.setBg(that.imgUrls)
          },500)
          
        } else {
          this.getlistdataImg();
        }
      }
      if (res.code !== 20000) {
        this.$message.error("图片获取失败，请联系管理员" + res.message);
      }
    },
    //  获取网络结构图片
    async getlistdataImg() {
      let res = await this.$api.API_findNetworkImg();
      if (res.code === 20000) {
        if (res.data !== null) {
          this.imgUrl = res.data.imgUrl + res.data.imgName;
          this.imgUrls = this.imgUrl;
          
          this.setBg(this.imgUrl);
        }
      }
      if (res.code !== 20000) {
        this.$message.error("图片获取失败，请联系管理员" + res.message);
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
    // 图片转换成二进制
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {
        type: mime,
      });
    },

    // 保存接入点图片
    async saveCanvas(result) {
      // 获取获取图片
      let resPic = document.querySelector(".resPic");
      let file = this.dataURLtoBlob(result);
      // console.log(result);
      if (this.imgUrlsid == "") {
        let res = await this.$api.API_ImgSaveAccessPointImg({
          file,
        });
        if (res.code === 20000) {
          this.$message.success("保存图片成功！！");
          this.getimgUrls();
          //查询列表
        } else {
          this.$message.error("错误，请联系管理员" + res.message);
        }
      } else {
        let res = await this.$api.API_imgupdateImg({
          file,
          id: this.imgUrlsid,
        });
        if (res.code === 20000) {
          this.$message.success("更新图片成功！！");
          this.getimgUrls();
          //查询列表
        } else {
          this.$message.error("错误，请联系管理员" + res.message);
        }
      }
      this.canvas.clear();
      this.showCanvas = false;
      resPic.src = result;
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

      this.bitmapArr.push(e);
      // 填入画布
      this.createPic(pic,e);
    },
    async getEtlist() {
      let List = await this.$api.API_WholeEvaluationFindWholeEvaluation();
      if (List.code === 20000) {
        this.getEtlists();
        if (List.data == null || List.data.verificationTest == null) {
          this.fromdatas.verificationTest = `    对${this.xmu_info.data.systemName}进行测评，涉及到漏洞扫描工具、渗透性测试工具集等多种测试工具。为了发挥测评工具的作用，达到测评的目的，各种测评工具需要接入到被测系统网络中，并配置合法的网络IP地址。`;
        } else {
          this.fromdatas.verificationTest = List.data.verificationTest;

          this.fromdatas.id = List.data.id;
        }

        //查询列表
      } else {
        this.$message.error(List.message + "测评依据选项出差，请联系管理员");
      }
    },
    async getEtlists() {
      let List = await this.$api.API_projectOverviewfindAccessPointDescribe();
      if (List.code === 20000) {
        this.fromdata = List.data;
        if (!List.data.accessPointDescribe) {
          this.fromdata.accessPointDescribe = `    通过使用绿盟远程安全评估系统V6.0R03F01SP02对网络设备、安全设备、应用服务器、数据库服务器、应用系统等进行了漏洞扫描。
    针对被测系统的网络边界和抽查设备、主机和业务应用系统的情况，需要在被测系统及其互联网络中设置各测试工具接入点，如图3.1所示。
    接入点JA：在xxxx接入，主要目的是：模拟XX恶意用户发现操作系统、数据库、应用系统等安全漏洞的过程。`;
        }
        //查询列表
      } else {
        this.$message.error(List.message + "测评依据选项出差，请联系管理员");
      }
    },
    async submitReport() {
      let res = "";
      if (this.fromdatas.id) {
        // 修改
        res = await this.$api.API_WholeEvaluationUpdateWholeEvaluation(
          this.fromdatas
        );
      } else {
        // 保存
        res = await this.$api.API_WholeEvaluationSaveWholeEvaluation(
          this.fromdatas
        );
      }
      if (res.code === 20000) {
         this.$message({
            type: "success",
            message: "修改成功！！",
            duration: 1000
          });
        this.getEtlist();
        //查询列表
      } else {
        this.$message.error("错误，请联系管理员" + res.message);
      }
      this.submitReports();
    },
    async submitReports() {
      let res = await this.$api.API_evaluationBasis_updata(this.fromdata);
      if (res.code === 20000) {
        this.getEtlist();
        //查询列表
      } else {
        this.$message.error("错误，请联系管理员" + res.message);
      }
    },
    openCanvasArea() {
      this.showCanvas = true;

      this.setBg(this.imgUrls);
      // this.setBg();
    },
    initCanvas() {
      
      let that = this;
      that.canvas = new fabric.Canvas("canvas");
      let casWidth = that.canvas.width,
          casHeight = that.canvas.height
        
    },
    setBg(src) {
      if (!src) return this.$message.error("暂无图片,请上传图片");
      let that = this;
      // 清空画布
      that.canvas.clear()
      this.bitmapArr = []

      let bg = new Image();
      // bg.crossOrigin = "Anonymous";  //跨域

      bg.src = src;
      // 测试
      // bg.src = require("@/views/demo/GlobalAssessment/img/t1.png")
      let bili;

      if (bg.width > bg.height) {
        if(that.canvas.width <= bg.width){
          bili = that.canvas.width / bg.width;
        }else{
          bili = bg.width / that.canvas.width ;
        }
      } else {
        if(that.canvas.height <= bg.height){
          bili = that.canvas.height / bg.height;
        }else{
          bili = bg.height / that.canvas.height
        }
      }

      this.bgPic = {
        width: bg.width,
        height: bg.height,
        bili: bili,
      };

      let Shape;

      bg.onload = function () {
        Shape = new fabric.Image(bg, {
          scaleX: bili,
          scaleY: bili,
          originX: "left",
          originY: "top",
          crossOrigin: 'anonymous'
        });
        that.canvas.setBackgroundImage(
          Shape,
          that.canvas.renderAll.bind(that.canvas)
        );
        that.canvas.renderAll();

        let lineWidth = bg.width * bili
        var line = new fabric.Line([lineWidth + 1, 0, lineWidth + 1, that.canvas.height], {
          fill: 'green',
          stroke: 'green',
          selectable:false,
        });
        that.canvas.add(line);
      };

      // var line = new fabric.Line([100, 0, 100,that.canvas.height], {
      //     fill: 'green',
      //     stroke: 'green'
      //   });
      //   that.canvas.add(line);
    },
    createPic(src,name) {
      let that = this;
      let manSrc = src;

      fabric.Image.fromURL(manSrc, function (obj) {
        obj.objectName = name
        that.canvas.add(obj);
      });
    },
    saveNewCanvas() {
      // this.bgPic = {
      //   width:bg.width,
      //   height:bg.height
      // }
      let that = this
  
      this.clipWidth = this.bgPic.width * this.bgPic.bili,
      this.clipHeight = this.bgPic.height * this.bgPic.bili

      var result = this.canvas.toDataURL({
        width: that.clipWidth,
        height: that.clipHeight,
        left: 0,
        top: 0,
        format: "png",
      })
      
      this.saveCanvas(result)
    },
    delectObj(){
      let item = this.canvas.getActiveObject()
      // item存在则删除,且删除数组元素
      if(item != null){
        this.canvas.remove(item)
        let delectName = item.objectName,
            delectIndex = null
        // 找到数组内需要删除的元素下标
        for(let i = 0;i < this.bitmapArr.length;i++){
          if(this.bitmapArr[i].indexOf(delectName) != -1){
            delectIndex = i
          }
        }
        if(delectIndex != null) this.bitmapArr.splice(delectIndex,1)
      }else{
        this.$message({
          showClose: true,
          message: '未选中要移除的图片',
          type: 'warning'
        })
      }
    },
    rectPaint(){
      // 点击确定后
      this.selShapeArea = true
      
    },
    drawRect(w=80,h=80){
      let rect = new fabric.Rect({
        left: 0,
        top: 0,
        stroke: 'black',
        fill:'transparent',
        width: 100,
        height: 100,
      })
      this.canvas.add(rect);
    },
    selShape(e){
      this.selShapeArea = false

      let name = e.currentTarget.dataset.icon,
      src = require(`@/views/demo/GlobalAssessment/img/icon/${name}.png`)

      this.createPic(src,name)
    },
    drawDesign(e){
      console.log(e.currentTarget.dataset.icon)

      let name = e.currentTarget.dataset.icon,
          src = require(`@/views/demo/GlobalAssessment/img/icon/${name}.png`)

      this.createPic(src,name)
    },
    wordInput(){
      // console.log(`输入的文字${this.inputContent.content}`)
      let that = this
      let content = that.inputContent.content
      console.log(`颜色${this.inputContent.color}`)
      this.inputWordArea = false

      //字体大小
      let word = new fabric.Text(content, {
        fontSize: that.inputContent.size,
        // stroke: that.inputContent.color,
        fill:that.inputContent.color,
        transparentCorners: false,
        textAlign:"center",
        left:0,
        top:0
      });
      
      this.canvas.add(word)
      that.inputContent.content = ''
    },
    handleChange(value) {
        console.log(value);
    },
    closeShapeArea(e){
      this.showShape = e
    },
    showShapeFun(e){
      this.showShape = true;
      this.canvasShapeNums = e.currentTarget.dataset.nums
      this.inputSort = e.currentTarget.dataset.sort
    },
    shapeAdd(e){
      let pic = require(`@/views/demo/GlobalAssessment/img/icon/${this.inputSort}/${e}.png`);

      // 填入画布
      this.createPic(pic,e);
    },
    // 画布重置
    canvasReset(){
      this.canvas.clear()
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
  border: 2px solid black;
  box-sizing: border-box;
}

.openChangeMode {
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
}
.toorBar {
  width: 97%;
  padding: 20px 20px 0;
  margin-bottom: 20px;
  box-sizing: border-box;
  .el-button{
    margin-top:10px;
    margin-left:10px;
  }
}
.casClose {
  width: 30px;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  cursor: pointer;
}
.resPic {
  max-width: 900px;
  max-height: 600px;
}
.resPics {
  max-width: 900px;
  max-height: 600px;
}
.avatar-uploader {
  display: inline-block;
  margin: 0 5px;
}
.el-popper{
  background:#fff!important;
}
.el-popover{
  background:#fff!important;
  margin-left:10px;
  .buttonStyle{
    // margin-left:10px;
  }
}
.arrowArea{
  width:100%;
  height:100%;
  display:-webkit-flex;
  display:flex;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  // background:#fff;
  .iconPic{
    width:30px;
    height:100%;
    cursor: pointer;
  }
}

.shapeStyle{
  cursor:pointer;
  width: 80px;
  height: 80px;
  margin-left:10px;
}

.el-dialog{
  width:600px;
}

.el-input-number {
  margin:20px 0;
}

.el-color-picker{

}

.wordSetting{
  display:-webkit-flex;
  display:flex;
  -webkit-align-items: center;
  align-items: center;
  .el-input-number {
    margin-right:15px;
  }
}

</style>
