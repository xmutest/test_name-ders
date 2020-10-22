import {
  find,
  assign
} from 'lodash'
import store from '@/store/index'
export default ({
  service,
  request,
  serviceForMock,
  requestForMock,
  mock,
  faker,
  tools
}) => ({
  // 获取信息
  async get_info() {
    const xmu_info = await store.dispatch('d2admin/db/get', {
      dbName: 'sys',
      path: 'xmu.xmu_info',
      defaultValue: {},
      xmu: true
    }, {
      root: true
    });
    if (!xmu_info.projectId && xmu_info.projectId == 'undefined') {
      alert('出错，项目选择失效，请重新选择！！！')
      return '';
    } else {
      return xmu_info.projectId;
    }
  },
  /**
   * @description 查询整体评测
   * @param {Object} data 携带的信息
   */
 async API_WholeEvaluationFindWholeEvaluation(data = {}) {
  data.projectId = await this.get_info();  
  // 接口请求
    return request({
      url: '/wholeEvaluation/findWholeEvaluation',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 保存整体评测
   * @param {Object} data 携带的信息
   */
 async API_WholeEvaluationSaveWholeEvaluation(data = {}) {
    // 接口请求
    data.projectId = await this.get_info();
    return request({
      url: '/wholeEvaluation/saveWholeEvaluation',
      method: 'post',
      data
    })
  },
  /**
   * @description 修改整体评测
   * @param {Object} data 携带的信息
   */
 async API_WholeEvaluationUpdateWholeEvaluation(data = {}) {
    // 接口请求
    data.projectId = await this.get_info();
    return request({
      url: '/wholeEvaluation/updateWholeEvaluation',
      method: 'post',
      data
    })
  }
})