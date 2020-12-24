<template>
    <div class="container" v-if="showControl">
        <div class="selectArea">
            <img :src="require('@/views/demo/ControllerLink/img/close.png')" alt="" class="btnClose" @click="closeTools">
            <img 
                :src="item" 
                v-for="(item,i) in picArr" 
                :key="i" 
                :data-id="`${selIndex + (i+1)}`" 
                class="guidePic" 
                @click="outputSel($event)"
            >

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:['showControl','selIndex','shapeNums'],
    created() {
        
    },
    mounted() {

    },
    computed: {
        picArr(){
            // console.log(`当前图片的数量${this.shapeNums}`)
            let arr = []
            // bug:数量不能大于等于9
            for(let i = 0 ;i < this.shapeNums;i++){
                // debugger
                arr.push(require(`@/views/demo/GlobalAssessment/img/icon/${this.selIndex}/${this.selIndex + (i+1)}.png`))
                // console.log(`数组${arr}`)
            }
            return arr
        }
    },
    methods: {
        closeTools(){
            this.$emit('close',false)
        },
        outputSel(e){
            let addPic = e.currentTarget.dataset.id
            this.$emit('close',false)
            this.$emit('addPic',addPic)
        }
    },
}
</script>

<style lang="scss" scoped>
    .container{
        position: fixed;
        top:0;
        left:0;
        width:100vw;
        height:100vh;
        background:rgba(0,0,0,.7);
        z-index:999;
        .selectArea{
            width: 600px;
            height: 500px;
            background: #fff;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            padding: 50px 40px 10px;
            box-sizing: border-box;
        }
        .btnClose{
            width: 30px;
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 10;
            cursor:pointer;
        }

        .guidePic{
            width:90px;
            margin-left:20px;
            margin-top:10px;
            cursor:pointer;
        }
        // .guidePic1,.guidePic3{
        //     width: 279px;
        //     position: absolute;
        //     cursor:pointer;
        // }
        // .guidePic2,.guidePic4{
        //     width:151px;
        //     position: absolute;
        //     cursor:pointer;
        // }
    }

    
</style>