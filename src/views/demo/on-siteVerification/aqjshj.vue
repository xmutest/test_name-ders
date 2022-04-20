<template>
  <ston :queryType="queryType"></ston>
</template>

<script>
import ston from "./unification.vue";
export default {
  data() {
    return {
      queryType: {
        sceneCheckId: 4,
        name: "04_安全计算环境.xlsx",
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
