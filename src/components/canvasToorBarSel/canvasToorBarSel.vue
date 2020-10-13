<template>
    <div class="container">
        <div class="selectArea">
            <img :src="require('@/views/demo/ControllerLink/img/close.png')" alt="" class="btnClose">
            <img :src="require('@/views/demo/ControllerLink/img/palntlsImg/ja1.png')" alt="" class="guidePic1">
            <img :src="require('@/views/demo/ControllerLink/img/palntlsImg/ja2.png')" alt="" class="guidePic2">
            <img :src="require('@/views/demo/ControllerLink/img/palntlsImg/ja3.png')" alt="" class="guidePic3">
            <img :src="require('@/views/demo/ControllerLink/img/palntlsImg/ja4.png')" alt="" class="guidePic4">
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
    methods: {
        
    },
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
        }
        .guidePic1,.guidePic3{
            width: 279px;
            position: absolute;
        }
        .guidePic2,.guidePic4{
            width:151px;
            position: absolute;
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