import store from '@/store/index'
export default ({
  service,
  request,
  requestword,
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
   * @description 查询基本测评指标统计
   * @param {Object} data 携带的信息
   */
  async API_CalculateFractionControlStatistics(data = {}) {
    data.projectId = await this.get_info();
    // data.projectId = 5;
    // 接口请求
    return request({
      //   url: '/project/findOverallEvaluation',
      url: '/calculateFraction/controlStatistics',
      method: 'get',
      params: data
    })
  },
  /** 
   * @description 查询单项符合情况统计
   * @param {Object} data 携带的信息
   */
  async API_CalculateFractionAccordSituationStatistics(data = {}) {
    // 接口请求
    data.projectId = await this.get_info();
    // data.projectId = 5;
    return request({
      url: '/calculateFraction/accordSituationStatistics',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 查询控制点符合情况汇总  
   * @param {Object} data 携带的信息
   */
  async API_CalculateFractionCalculateControlSpotFraction(data = {}) {
    // 接口请求
    data.projectId = await this.get_info();
    // data.projectId = 5;
    return request({
      url: '/calculateFraction/calculateControlSpotFraction',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 查询系统安全防护评估 
   * @param {Object} data 携带的信息
   */
  async API_CalculateFractionSafetyClassStatistics(data = {}) {
    // 接口请求
    data.projectId = await this.get_info();
    // data.projectId = 5;
    return request({
      url: '/calculateFraction/safetyClassStatistics',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 生成测评报告
   * @param {Object} data 携带的信息
   */
  async API_wordGenerGate(data = {}) {
    // 接口请求
    data.projectId = await this.get_info();
    // data.projectId = 5;
    return request({
      url: '/word/generate',
      method: 'post',
      data
    })
  },
  /**
   * @description 测评报告记录列表
   * @param {Object} data 携带的信息
   */
  async API_wordFindList(data = {}) {
    // 接口请求
    data.projectId = await this.get_info();
    // data.projectId = 5;
    return request({
      url: '/word/findList',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 删除测评报告记录
   * @param {Object} data 携带的信息
   */
  async API_wordDelete(data = {}) {
    // 接口请求
    data.projectId = await this.get_info();
    // data.projectId = 5;
    return request({
      url: '/word/delete',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 测评报告记录详情
   * @param {Object} data 携带的信息
   */
  async API_wordfindModel(data = {}) {
    // 接口请求
    data.projectId = await this.get_info();
    // data.projectId = 5;
    return request({
      url: '/word/findModel',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 模板下载
   * @param {Object} data 
   */
  SYS_reportWord_DownLoadDoc(data = {}) {
    // 模拟数据
    // 接口请求
    return requestword({
      url: data.url,
      method: 'get',
      data,
      responseType: 'blob',
    })
  },
})
