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
   * @description 获取项目token
   * @param {Object} data 
   */
  API_leadToAuthorize(data = {}) {
    // 接口请求
    return request({
      url: '/user/leadToAuthorize',
      method: 'get',
      params: data
    })
  },
  // 查询项目
  /**
   * @description 查询 项目
   * @param {Object} data 携带的信息
   */
  async API_findListoFndList_men(data = {}) {
    // 接口请求
    return request({
      url: '/project/findList2',
      method: 'post',
      data,
      token: data.token,
      base: 'VUE_APP_manage'
    })
  },
  /**
   * @description 查询 项目系统
   * @param {Object} data 携带的信息
   */
  async API_findListofindSystem(data = {}) {
    // 接口请求
    return request({
      url: '/systemInfo/findSystem',
      method: 'post',
      data,
      params: data,
      token: data.token,
      base: 'VUE_APP_manage'
    })
  },
  /**
   * @description 查询 项目系统
   * @param {Object} data 携带的信息
   */
  async API_findLisupdatem(data = {}) {
    // 接口请求
    return request({
      url: '/systemInfo/update',
      method: 'post',
      data,
      params: data,
      token: data.token,
      base: 'VUE_APP_manage'
    })
  },
  /**
   * @description 项目提交审核
   * @param {Object} data 携带的信息
   */
  async API_reportFirstdatem(data = {}) {
    // 接口请求
    return request({
      url: '/task/reportFirst',
      method: 'post',
      data,
      params: data,
      token: data.token || window.sessionStorage.getItem('ms_token'),
      base: 'VUE_APP_manage'
    })
  },
  /**
   * @description 项目初稿
   * @param {Object} data 携带的信息
   */
   async API_reporreviewFirst(data = {}) {
    // 接口请求
    return request({
      url: '/task/reviewFirst',
      method: 'post',
      data,
      params: data,
      token: data.token || window.sessionStorage.getItem('ms_token'),
      base: 'VUE_APP_manage'
    })
  },
})
