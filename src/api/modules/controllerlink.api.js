import {
  find,
  assign
} from 'lodash'
import store from '@/store/index'
/**
 * @description 项目概述
 * @param {Object} data 携带的信息
 */
export default ({
  service,
  request,
  serviceForMock,
  requestForMock,
  mock,
  faker,
  tools
}) => ({
  /**
   * @description 项目概述
   * @param {Object} data 携带的信息
   */
  API_evaluationBasisFindAll(data = {}) {
    // 安全物理环境
    // 接口请求
    return request({
      url: '/evaluationBasis/findAll',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 项目概述修改
   * @param {Object} data 携带的信息
   */
  async API_evaluationBasis_updata(data = {}) {
    // 安全物理环境
    const xmu_info = await store.dispatch('d2admin/db/get', {
      dbName: 'sys',
      path: 'xmu.xmu_info',
      defaultValue: {},
      xmu: true
    }, {
      root: true
    });
    if (!xmu_info.projectId && xmu_info.projectId == 'undefined') {
      return alert('出错，项目选择失效，请重新选择！！！')
    }
    data.projectId = xmu_info.projectId;
    data.id=3;
    // 接口请求
    return request({
      url: '/projectOverview/updatePO',
      method: 'post',
      data
    })
  },
})
