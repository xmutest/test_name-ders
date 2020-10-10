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
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN(data = {}) {
    // 模拟数据
    // 接口请求
    return request({
      url: '/user/login',
      method: 'post',
      data
    })
  },

  /**
   * @description 项目创建
   * @param {Object} data 项目创建携带的信息
   */
  API_Project_Creation(data = {}) {
    // 接口请求
    return request({
      url: '/project/save',
      method: 'post',
      data: JSON.stringify(data)
    })
  },
  /**
   * @description 项目查询
   * @param {Object} data 项目创建携带的信息
   */
  API_Project_Query(data = {}) {
    // 接口请求
    return request({
      url: '/project/findList',
      method: 'post',
      data: JSON.stringify(data)
    })
  },
  /**
   * @description 项目部门人查询
   * @param {Object} data 项目部门人查询
   */
  API_department_List(data = {}) {
    // 接口请求
    return request({
      url: '/department/findList',
      method: 'get',
      data: JSON.stringify(data)
    })
  },
   /**
   * @description 项目删除
   * @param {Object} data 项目删除
   */
  API_department_delete(data = {}) {
    // 接口请求
    console.log(data);
    return request({
      url: '/project/delete',
      method: 'get',
      params:data
    })
  },
  /**
   * @description 项目修改
   * @param {Object} data 项目创建携带的信息
   */
  API_Project_updata(data = {}) {
    // 接口请求
    return request({
      url: '/project/update',
      method: 'post',
      data: JSON.stringify(data)
    })
  },
    /**
   * @description 项目详细
   * @param {Object} data 
   */
  API_Project_detail(data = {}) {
    // 接口请求
    return request({
      url: '/project/detail',
      method: 'get',
      params:data
    })
  }
})
