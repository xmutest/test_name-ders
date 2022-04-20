<template>
  <ston :queryType="queryType"></ston>
</template>

<script>
import ston from "./unification.vue";
export default {
  data() {
    return {
      queryType: {
        sceneCheckId: 2,
        name: "02_安全通信网络.xlsx",
      },
    };
  },
  computed: {},
  components: {
    ston,
  },
  created() {},
};
</script>

<style lang="scss" scoped>
</style>
