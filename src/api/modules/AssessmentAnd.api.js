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
   * @description 获取项目总分数
   * @param {Object} data 携带的信息
   */
  async CalculateFractionTotalFraction(data = {}) {
    data.projectId = await this.get_info();
    let res = await request({
      url: '/calculateFraction/totalFraction',
      method: 'get',
      params: data
    });
    if (res.code === 20000) {
      await store.dispatch(
        "d2admin/totalscore/set", {
          data: res.data,
        }, {
          root: true,
        }
      );
    } else {
      ElementUI.Message({
        title: '警告',
        message: `请求总分数出错，请联系管理员`,
        type: 'error'
      });
    }
  },
  /**
   * @description 查询查看风险分析和评价
   * @param {Object} data 携带的信息
   */
  async API_RiskFindAmendAnalysis(data = {}) {
    data.projectId = await this.get_info();
    this.CalculateFractionTotalFraction();
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
    this.CalculateFractionTotalFraction();
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
      method: 'post',
      data
    })
  },
  /**
   * @description 查看安全问题汇总
   * @param {Object} data 携带的信息
   */
  async API_RiskFindSummary(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/risk/findSummary',
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
      data: JSON.stringify(data)
    })
  },
  /**
   * @description 风险值修正
   * @param {Object} data 携带的信息
   */
  async API_RiskUpdateRiskCorrection(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/risk/updateRiskCorrection',
      method: 'post',
      data: JSON.stringify(data)
    })
  },
  /**
   * @description 更新修正后风险值
   * @param {Object} data 携带的信息
   */
  async API_RiskUpdateAfterAmendRisk(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/risk/updateAfterAmendRisk',
      method: 'post',
      data: JSON.stringify(data)
    })
  },
  // 获取
  /**
   * @description 获取风险值
   * @param {Object} data 携带的信息
   */
  async API_RiskFindKnowledge(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/risk/findKnowledge',
      method: 'post',
      data
    })
  },
  /**
   * @description 纳入自定义风险知识库
   * POST 
   * @param {Object} data 携带的信息
   */
  async API_saveRiskKnowledge(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/risk/saveRiskKnowledge',
      method: 'post',
      data
    })
  },
  /**
   * @description 删除风险知识库
   * POST 
   * @param {Object} data 携带的信息
   */
  async API_delRiskKnowledge(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/risk/delRiskKnowledge',
      method: 'post',
      params:data
    })
  },
})
