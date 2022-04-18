export default {
    namespaced: true,
    state: {
      // 项目信息
      totalscore: {}
    },
    actions: {
      /**
       * @description 设置用户数据
       * @param {Object} context
       * @param {*} totalscore
       */
      async set ({ state, dispatch }, totalscore) {
        // store 赋值
        state.totalscore = totalscore
        // 持久化
        await dispatch('d2admin/db/set', {
          dbName: 'sys',
          path: 'sco.totalscore',
          value: totalscore,
          sco: true
        }, { root: true })
      },
      /**
       * @description 从数据库取用户数据
       * @param {Object} context
       */
      async load ({ state, dispatch }) {
        // store 赋值
        state.totalscore = await dispatch('d2admin/db/get', {
          dbName: 'sys',
          path: 'sco.totalscore',
          defaultValue: {},
          sco: true
        }, { root: true })
      }
    }
  }
  