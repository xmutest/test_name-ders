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
   * @description 查询查看风险分析和评价
   * @param {Object} data 携带的信息
   */
  async API_RiskFindAmendAnalysis(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/risk/findAmendAnalysis',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 查询查看风险值修正
   * @param {Object} data 携带的信息
   */
  async API_RiskFindRiskCorrections(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/risk/findRiskCorrection',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 查询查看风险值修正
   * @param {Object} data 携带的信息
   */
  async API_RiskFindRiskKnowledge(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/risk/findRiskKnowledge',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 修改风险值修正
   * @param {Object} data 携带的信息
   */
  async API_RiskUpdateAmendAnalysis(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/risk/updateAmendAnalysis',
      method: 'post',
      data:JSON.stringify(data)
    })
  },
})
