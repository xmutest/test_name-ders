<template>
  <div class="ks_sjv">
    <div class="ks_sjis"><i class="el-icon-edit"></i><span>暂无数据,请添加数据后再查看</span></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.ks_sjv {
    // position: relative;
    .ks_sjis{
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        align-items: center;
        i{
            font-size: 45px;
            margin: 0 10px 0 0;
        }
    }
}
</style>