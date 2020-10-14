<template>
    <div class="container" v-if="showControl">
        <div class="selectArea">
            <img :src="require('@/views/demo/ControllerLink/img/close.png')" alt="" class="btnClose" @click="closeTools">
            <img :src="item" v-for="(item,i) in picArr" :key="i" :data-id="`j${selIndex + (i+1)}`" :class="'guidePic' + (i+1)" @click="outputSel($event)">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    created() {
        
    },
    mounted() {

    },
    computed: {
        picArr(){
            let arr = []
            for(let i = 0 ;i < 4;i++){
                arr.push(require(`@/views/demo/ControllerLink/img/palntlsImg/j${this.selIndex + (i+1)}.png`))
            }
            return arr
        }
    },
    methods: {
        closeTools(){
            this.$emit('close',false)
        },
        showselTools(){
            this.picArr = []
            for(let i = 0 ;i < 4;i++){
                this.picArr.push(require(`@/views/demo/ControllerLink/img/palntlsImg/j${this.selIndex + (i+1)}.png`))
            }
        },
        outputSel(e){
            let addPic = e.currentTarget.dataset.id
            this.$emit('close',false)
            this.$emit('addPic',addPic)
        }
    },
    props:['showControl','selIndex']
}
</script>

<style lang="scss">
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
        }
        .btnClose{
            width: 30px;
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 10;
            cursor:pointer;
        }
        .guidePic1,.guidePic3{
            width: 279px;
            position: absolute;
            cursor:pointer;
        }
        .guidePic2,.guidePic4{
            width:151px;
            position: absolute;
            cursor:pointer;
        }
        .guidePic1{
            top: 100px;
            left: 50px;
        }
        .guidePic2{
            top: 20px;
            right: 50px;
        }
        .guidePic3{
            top: 400px;
            left: 50px;
        }
        .guidePic4{
            top: 270px;
            right: 50px;
        }
    }

    
</style>