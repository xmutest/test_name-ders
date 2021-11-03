<template>
  <Kston :projectModel="projectModel"></Kston>
</template>

<script>
import Kston from '../konIndex/index.vue'
export default {
  data() {
    return {
      projectModel: {
        page: 1,
        pageSize: 20,
        projectName: "",
        queryType: 1,
        isInputUnion: "",
      },
    };
  },
  computed: {
   
  },
  components: {
    Kston
  },
  created() {

  },
 
};
</script>

<style lang="scss" scoped>
</style>
