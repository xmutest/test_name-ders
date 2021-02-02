import util from '@/libs/util.js'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state state
     */
    versionShow () {
      util.log.capsule('测评工具', `v${process.env.VUE_APP_VERSION}`)
      console.log('测评工具错误请联系开发人员');
    }
  }
}
