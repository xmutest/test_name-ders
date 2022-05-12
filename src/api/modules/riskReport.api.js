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
  /**
   * @description 获取projectId
   * @param {Object} data 携带的信息
   */
  async rickReport_ProjectId(data = {}) {
    data.projectId = await this.get_info();
    // data.projectId = 3757;
    return data.projectId
  },
  // ===============================概述tab========================= //
  /**
   * @description 获取概述详情
   * @param {Object} data 携带的信息
   */
  async rickReport_ProjectDetail(data = {}) {
    data.projectId = await this.get_info();
    // data.projectId = 3757;
    return request({
      url: '/project/detail',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 保存概述详情
   * @param {Object} data 携带的信息
   */
  async rickReport_SaveProjectDetail(data = {}) {
    data.projectId = await this.get_info();
    // data.projectId = 3757;
    return request({
      url: '/project/evaluateReport',
      method: 'post',
      data: data
    })
  },
  
  /**
   * @description 获取重点人员列表
   * @param {Object} data 携带的信息
   */
  async rickReport_EvaluateUser(data = {}) {

    data.projectId = await this.get_info();
    // data.projectId = 3757;
    return request({
      url: '/evaluateUser/findAll',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 获取重点评估人员列表
   * @param {Object} data 携带的信息
   */
  async rickReport_EvaluateUser(data = {}) {

    data.projectId = await this.get_info();
    // data.projectId = 3757;
    return request({
      url: '/evaluateUser/findAll',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 保存重点评估人员
   * @param {Object} data 携带的信息
   */
  async rickReport_EvaluateUserSave(data = {}) {

    // data.projectId = await this.get_info();
    // data.projectId = 3757;
    return request({
      url: '/evaluateUser/save',
      method: 'post',
      data: data
    })
  },
  /**
   * @description 新增重点评估人员
   * @param {Object} data 携带的信息
   */
  async rickReport_EvaluateUserUpdate(data = {}) {

    // data.projectId = await this.get_info();
    // data.projectId = 3757;
    return request({
      url: '/evaluateUser/update',
      method: 'post',
      data: data
    })
  },
  /**
   * @description 删除重点评估人员
   * @param {Object} data 携带的信息
   */
  async rickReport_EvaluateUserDel(data = {}) {

    // data.projectId = await this.get_info();
    // data.projectId = 3757;
    return request({
      url: '/evaluateUser/delete',
      method: 'get',
      params: data
    })
  },
  // ===============================重要资产tab========================= //
  /**
   * @description 重要资产清单
   * @param {Object} data 携带的信息
   */
  async rickReport_findAssetsList(data = {}) {

    data.projectId = await this.get_info();
    // data.projectId = 3757;
    return request({
      url: '/assets/findAssetsList',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 更新重要资产清单
   * @param {Object} data 携带的信息
   */
  async rickReport_updateAssetsList(data = {}) {

    data.projectId = await this.get_info();
    // data.projectId = 3757;
    return request({
      url: '/assets/update',
      method: 'post',
      data: data
    })
  },
  // ===============================威胁tab========================= //
  /**
   * @description 查询威胁识别
   * @param {Object} data 携带的信息
   */
  async rickReport_findThreat(data = {}) {

    data.projectId = await this.get_info();
    // data.projectId = 3757;
    return request({
      url: '/assets/findThreat',
      method: 'get',
      params: data
    })
  },
  // ===============================脆弱tab========================= //
  /**
   * @description 查询威胁识别
   * @param {Object} data 携带的信息
   */
  async rickReport_findReviseManifest(data = {}) {

    data.projectId = await this.get_info();
    // data.projectId = 3757;
    return request({
      url: '/assets/findReviseManifest',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 更新威胁识别
   * @param {Object} data 携带的信息
   */
  async rickReport_updateWeakGrade(data = {}) {

    data.projectId = await this.get_info();
    // data.projectId = 3757;
    return request({
      url: '/assets/updateWeakGrade',
      method: 'post',
      data: data
    })
  },
  // ===============================风险计算tab========================= //
  /**
   * @description 查询风险计算表
   * @param {Object} data 携带的信息
   */
  async rickReport_amendCount(data = {}) {

    data.projectId = await this.get_info();
    // data.projectId = 3757;
    return request({
      url: '/assets/amendCount',
      method: 'get',
      params: data
    })
  },
    /**
   * @description 安全文档下载
   * @param {Object} data 携带的信息
   */
  // async API_woutPutModel2(data = {}) {
  //   // 接口请求
  //   data.projectId = await this.get_info();
  //   return request({
  //     url: '/securityManageFile/outPut',
  //     method: 'post',
  //     params: data,
  //     responseType: 'blob',
  //   })
  // },
  // ===============================风险报告tab========================= //
    /**
   * @description 风险数量计算
   * @param {Object} data 携带的信息
   */
  async rickReport_amendNumCount(data = {}) {
    // 接口请求
    data.projectId = await this.get_info();
    return request({
      url: '/assets/amendNumCount',
      method: 'get',
      params: data,
    })
  },

    /**
   * @description 风险报告导出
   * @param {Object} data 携带的信息
   */
  async rickReport_amendReview(data = {}) {
    // 接口请求
    data.projectId = await this.get_info();
    return request({
      url: '/word/amendReview',
      method: 'post',
      data: data,
      responseType: 'blob',
    })
  },
    /**
   * @description 风险报告历史
   * @param {Object} data 携带的信息
   */
  async rickReport_findWordList(data = {}) {
    // 接口请求
    data.projectId = await this.get_info();
    return request({
      url: '/word/findList',
      method: 'get',
      params: data,
    })
  },
    /**
   * @description 风险报告历史 删除
   * @param {Object} data 携带的信息
   */
  async rickReport_wordDel(data = {}) {
    // 接口请求
    // data.projectId = await this.get_info();
    return request({
      url: '/word/delete',
      method: 'get',
      params: data,
    })
  },
  // reportDate，报告日期，riskImgBase64 风险图片

})