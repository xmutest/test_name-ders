export default {
    namespaced: true,
    state: {
      // 项目信息
      xmu_info: {}
    },
    actions: {
      /**
       * @description 设置用户数据
       * @param {Object} context
       * @param {*} xmu_info xmu_info
       */
      async set ({ state, dispatch }, xmu_info) {
        console.log(xmu_info);
        // store 赋值
        state.xmu_info = xmu_info
        // 持久化
        await dispatch('d2admin/db/set', {
          dbName: 'sys',
          path: 'xmu.xmu_info',
          value: xmu_info,
          xmu: true
        }, { root: true })
      },
      /**
       * @description 从数据库取用户数据
       * @param {Object} context
       */
      async load ({ state, dispatch }) {
        // store 赋值
        state.xmu_info = await dispatch('d2admin/db/get', {
          dbName: 'sys',
          path: 'xmu.xmu_info',
          defaultValue: {},
          xmu: true
        }, { root: true })
      }
    }
  }
  