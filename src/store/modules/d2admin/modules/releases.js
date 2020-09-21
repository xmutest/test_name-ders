import util from '@/libs/util.js'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state state
     */
    versionShow () {
      util.log.capsule('评测工具', `v${process.env.VUE_APP_VERSION}`)
      console.log('评测工具错误请联系开发人员');
    }
  }
}
