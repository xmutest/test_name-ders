let userInfo
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
   * @description 文件上传
   * @param {Object} data 携带的信息
   */
  SYS_checkUpload(data = {}) {
    // 模拟数据
    // 接口请求
    return request({
      url: '/input/sceneCheck',
      method: 'post',
      data
    })
  },
   /**
   * @description 安全文档上传
   * @param {Object} data 携带的信息
   */
    securityManageFileUpload(data = {}) {
      // 模拟数据
      // 接口请求
      return request({
        url: '/securityManageFile/upload',
        method: 'post',
        data
      })
    },
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

  async SYS_USER_PASSWORD_CHANGE(data = {}) {
    // 模拟数据
    // 接口请求

    return request({
      url: '/user/update',
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
      data: JSON.stringify(data),
      params: {
        page: data.page,
        pageSize: data.pageSize
      }
    })
  },
  /**
   * @description 项目查询
   * @param {Object} data 项目创建携带的信息
   */
  API_Project_findAllList(data = {}) {
    // 接口请求
    return request({
      url: '/project/findAllList',
      method: 'post',
      data: JSON.stringify(data),
      params: {
        page: data.page,
        pageSize: data.pageSize
      }
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
      params: data
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
      params: data
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
   * @description 项目复制
   * @param {Object} data 复制携带的信息
   */
  APICopyCopyProject(data = {}) {
    // 接口请求
    return request({
      url: '/copy/copyProject',
      method: 'post',
      params: data
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
      params: data
    })
  },
  /**
   * @description 获取sag等级
   * @param {Object} data 
   */
  API_SagFindSagByLevel(data = {}) {
    // 接口请求
    return request({
      url: '/sag/findSagByLevel',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 用户列表获取
   * @param {Object} data 
   */
  API_DepartmentFindListe(data = {}) {
    // 接口请求
    return request({
      url: '/user/findList',
      method: 'post',
      data
    })
  },
  /**
   * @description 用户添加
   * @param {Object} data 
   */
  API_UserSave(data = {}) {
    // 接口请求
    return request({
      url: '/user/save',
      method: 'post',
      data
    })
  },
  /**
   * @description 用户删除
   * @param {Object} data 
   */
  API_Userdelete(data = {}) {
    // 接口请求
    return request({
      url: '/user/delete',
      method: 'get',
      params: data
    })
  },

  /**
   * @description 用户编辑
   * @param {Object} data 
   */
  API_Userupdate(data = {}) {
    // 接口请求
    return request({
      url: '/user/update',
      method: 'post',
      data
    })
  },
  /**
   * @description 时间设置保存
   * @param {Object} data 
   */
  API_reportTimepdate(data = {}) {
    // 接口请求
    return request({
      url: '/reportTime/detail',
      method: 'get',
      params: data
    })
  },
  // 获取人员
  /**
   * @param {Object} data 
   */
  findTechnologypdate(data = {}) {
    // 接口请求
    return request({
      url: '/user/findTechnology',
      method: 'post',
      data
    })
  },
  // 初终审刷新
  /**
   * @param {Object} data 
   */
  nishReviewdate(data = {}) {
    // 接口请求
    return request({
      url: 'review/finishReview',
      method: 'post',
      data
    })
  },
  // 查询部门树
  /**
   * @param {Object} data 
   */
  departmentewdate(data = {}) {
    // 接口请求
    return request({
      url: '/department/tree',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 部门新增或修改
   */
  API_deptSave(data = {}) {
    return request({
      url: '/department/save',
      method: 'post',
      data
    })
  },
})
