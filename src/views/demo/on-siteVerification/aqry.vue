<template>
  <ston :queryType="queryType"></ston>
</template>

<script>
import ston from "./unification.vue";
export default {
  data() {
    return {
      queryType: {
        sceneCheckId: 8,
        name: "08_安全管理人员.xlsx",
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
