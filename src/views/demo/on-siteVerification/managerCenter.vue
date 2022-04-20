<template>
  <ston :queryType="queryType"></ston>
</template>

<script>
import ston from "./unification.vue";
export default {
  data() {
    return {
      queryType: {
        sceneCheckId: 5,
        name: "05_安全管理中心.xlsx",
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
