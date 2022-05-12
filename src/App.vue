<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import util from "@/libs/util";
export default {
  name: "app",
  watch: {
    "$i18n.locale": "i18nHandle",
  },
  created() {
    this.i18nHandle(this.$i18n.locale);
  },
  methods: {
    i18nHandle(val, oldVal) {
      util.cookies.set("lang", val);
      document.querySelector("html").setAttribute("lang", val);
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/style/public-class.scss";
.el-popover {
  min-width: 400px !important;
  max-width: 600px;
  max-height: 600px;
  div {
    margin: 10px;
    p {
      max-width: 600px;
      max-height: 600px;
      overflow: auto;
      // margin-bottom: -15px;
    }
  }
}
</style>
