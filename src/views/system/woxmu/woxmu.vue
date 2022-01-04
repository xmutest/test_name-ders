<template>
  <Kston :queryType="queryType"></Kston>
</template>

<script>
import Kston from "../konIndex/index.vue";
export default {
  data() {
    return {
      queryType: 2,
    };
  },
  computed: {},
  components: {
    Kston,
  },
  created() {},
};
</script>

<style lang="scss" scoped>
</style>
