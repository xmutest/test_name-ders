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
   * @description 查询整体测评
   * @param {Object} data 携带的信息
   */
  async API_ProjectfindOverallEvaluation(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      //   url: '/project/findOverallEvaluation',
      url: '/project/findOverallEvaluation',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 保存整体测评
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
   * @description 修改整体测评
   * @param {Object} data 携带的信息
   */
  async API_ProjectupdateOverallEvaluation(data = {}) {
    // 接口请求
    data.projectId = await this.get_info();
    return request({
      url: '/project/updateOverallEvaluation',
      method: 'post',
      data
    })
  },
  /**
   * @description 查询 等级测评统计图数据
   * @param {Object} data 携带的信息
   */
  async API_CalculateFractionSummaryGraph(data = {}) {
    // 接口请求
    data.projectId = await this.get_info();
    return request({
      url: '/calculateFraction/summaryGraph',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 查询  等级测评结论 分数
   * @param {Object} data 携带的信息
   */
  async API_CalculateFractionInConclusionFraction(data = {}) {
    // 接口请求
    data.fractionVersion = window.sessionStorage.getItem("radiomstjisfen") ?
      Number(window.sessionStorage.getItem("radiomstjisfen")) :
      1;
    data.projectId = await this.get_info();
    return request({
      url: '/calculateFraction/inConclusionFraction',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 查询 风险总数统计
   * @param {Object} data 携带的信息
   */
  async API_CalculateriskTotalNum(data = {}) {
    data.fractionVersion = window.sessionStorage.getItem("radiomstjisfen") ?
      Number(window.sessionStorage.getItem("radiomstjisfen")) :
      1;
    data.projectId = await this.get_info();
    // console.log(window.sessionStorage.getItem('radiomstjisfen'));
    return request({
      url: '/calculateFraction/totalFraction',
      method: 'get',
      params: data
    });
  },
})
