<template>
  <Kston :queryType="queryType"></Kston>
</template>

<script>
import Kston from "../konIndex/index.vue";
export default {
  data() {
    return {
      queryType: 3,
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
