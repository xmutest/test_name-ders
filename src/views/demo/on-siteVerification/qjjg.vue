<template>
  <ston :queryType="queryType"></ston>
</template>

<script>
import ston from "./unification.vue";
export default {
  data() {
    return {
      queryType: {
        sceneCheckId: 7,
        name: "07_安全管理机构.xlsx",
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
