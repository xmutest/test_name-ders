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
   * @description 模板上传
   * @param {Object} data 
   */
  SYS_USER_InputDoc(data = {}) {
    // 模拟数据
    // 接口请求
    return request({
      url: '/input/inputDoc',
      method: 'post',
      data
    })
  },
  /**
   * @description 模板下载
   * @param {Object} data 
   */
  SYS_USER_DownLoadDoc(data = {}) {
    // 模拟数据
    // 接口请求
    return request({
      url: '/input/downLoadDoc',
      method: 'get',
      data,
      responseType: 'blob',
    })
  },
  /**
   * @description 数据模板下载
   * @param {Object} data 
   */
  async SYS_USER_DownLoadDocLisks(data = {}) {
    // 模拟数据
    // 接口请求
    return request({
      url: '/input/downLoadAssets',
      method: 'get',
      params: data,
      responseType: 'blob',
    })
  },
  /**
   * @param {Object} data 
   * GET 查询项目的机房
   */
  async API_JF_ComputerRoomFindComputerRoom(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/computerRoom/findComputerRoom',
      method: 'get',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * post 
保存机房
   */
  async API_JF_ComputerRoomFindSaveRoom(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/computerRoom/saveRoom',
      method: 'post',
      data,
    })
  },
  /**
   * @param {Object} data 
   * 
删除机房
   */
  async API_JF_ComputerRoomFindDelComputerRoom(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/computerRoom/delComputerRoom',
      method: 'delete',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * POST 
修改机房
   */
  async API_JF_ComputerRoomFindUpdateRoom(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/computerRoom/updateRoom',
      method: 'post',
      data,
    })
  },

  // 区域边界
  /**
   * @param {Object} data 
   * GET 查询项目的区域边界
   */
  async API_JF_RegionBoundaryFndRegionBoundary(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/regionBoundary/findRegionBoundary',
      method: 'get',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * post 
保存区域边界
   */
  async API_RegionBoundarySaveRegionBoundary(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/regionBoundary/saveRegionBoundary',
      method: 'post',
      data,
    })
  },
  /**
   * @param {Object} data 
   * 
删除区域边界
   */
  async API_RegionBoundaryDelRegionBoundary(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/regionBoundary/delRegionBoundary',
      method: 'post',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * POST 
修改区域边界
   */
  async API_RegionBoundaryUpdateRegionBoundary(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/regionBoundary/updateRegionBoundary',
      method: 'post',
      data,
    })
  },

  // 网络设备
  /**
   * @param {Object} data 
   * GET 查询项目的网络设备
   */
  async API_EquipmentFindEquipment(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/equipment/findEquipment',
      method: 'get',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * post 
保存网络设备
   */
  async API_EquipmentSaveEquipment(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/equipment/saveEquipment',
      method: 'post',
      data,
    })
  },
  /**
   * @param {Object} data 
   * 
删除网络设备
   */
  async APIEquipmentDelEquipment(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/equipment/delEquipment',
      method: 'post',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * POST 
修改网络设备
   */
  async API_EquipmentUpdateEquipment(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/equipment/updateEquipment',
      method: 'post',
      data,
    })
  },

  // 业务应用软件接口
  /**
   * @param {Object} data 
   * GET 查询项目的业务应用软件接口
   */
  async APISoftwarePlatformFindsoftwarePlatform(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/softwarePlatform/findsoftwarePlatform',
      method: 'get',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * post 
保存业务应用软件接口
   */
  async API_SoftwarePlatformSaveSoftwarePlatformt(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/softwarePlatform/saveSoftwarePlatform',
      method: 'post',
      data,
    })
  },
  /**
   * @param {Object} data 
   * 
删除业务应用软件接口
   */
  async APISoftwarePlatformDelSoftwarePlatform(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/softwarePlatform/delSoftwarePlatform',
      method: 'post',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * POST 
修改业务应用软件接口
   */
  async API_SoftwarePlatformUpdateSoftwarePlatform(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/softwarePlatform/updateSoftwarePlatform',
      method: 'post',
      data,
    })
  },

  // 系统管理平台/全局扩展接口 
  /**
   * @param {Object} data 
   * GET 查询项目的系统管理平台/全局扩展接口 
   */
  async PlatformExtendFindPlatformExtend(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/platformExtend/findPlatformExtend',
      method: 'get',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * post 
保存系统管理平台/全局扩展接口 
   */
  async API_PlatformExtendSavePlatformExtend(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/platformExtend/savePlatformExtend',
      method: 'post',
      data,
    })
  },
  /**
   * @param {Object} data 
   * 
删除系统管理平台/全局扩展接口 
   */
  async APIPlatformExtendDelPlatformExtend(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/platformExtend/delPlatformExtend',
      method: 'post',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * POST 
修改系统管理平台/全局扩展接口 
   */
  async API_PlatformExtendUpdatePlatformExtend(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/platformExtend/updatePlatformExtend',
      method: 'post',
      data,
    })
  },

  // 服务器或存储设备接口
  /**
   * @param {Object} data 
   * GET 查询项目的服务器或存储设备接口
   */
  async APIServerStorageFindServerStorage(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/serverStorage/findServerStorage',
      method: 'get',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * post 
保存服务器或存储设备接口
   */
  async API_ServerStorageSaveServerStorage(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/serverStorage/saveServerStorage',
      method: 'post',
      data,
    })
  },
  /**
   * @param {Object} data 
   * 
删除服务器或存储设备接口
   */
  async APIServerStorageDelServerStorage(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/serverStorage/delServerStorage',
      method: 'post',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * POST 
修改服务器或存储设备接口
   */
  async API_ServerStorageUpdateServerStorage(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/serverStorage/updateServerStorage',
      method: 'post',
      data,
    })
  },

  // 终端/感知设备/现场设备接口 
  /**
   * @param {Object} data 
   * GET 查询项目的终端/感知设备/现场设备接口 
   */
  async APITerminalFindTerminal(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/terminal/findTerminal',
      method: 'get',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * post 
保存终端/感知设备/现场设备接口 
   */
  async API_TerminalSaveTerminal(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/terminal/saveTerminal',
      method: 'post',
      data,
    })
  },
  /**
   * @param {Object} data 
   * 
删除终端/感知设备/现场设备接口 
   */
  async APITerminalDelTerminal(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/terminal/delTerminal',
      method: 'post',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * POST 
修改终端/感知设备/现场设备接口 
   */
  async API_ServerTerminalUpdateTerminal(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/terminal/updateTerminal',
      method: 'post',
      data,
    })
  },


  // 数据库管理系统
  /**
   * @param {Object} data 
   * GET 查询数据库管理系统接口 
   */
  async APIDbManageSysFindDbManageSys(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/dbManageSys/findDbManageSys',
      method: 'get',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * post 
保存数据库管理系统接口 
   */
  async API_DbManageSysSaveDbManageSys(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/dbManageSys/saveDbManageSys',
      method: 'post',
      data,
    })
  },
  /**
   * @param {Object} data 
   * 
删除数据库管理系统接口 
   */
  async APIDbManageSysDelDbManageSys(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/dbManageSys/delDbManageSys',
      method: 'delete',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * POST 
修改数据库管理系统
   */
  async API_DbManageSysUpdateDbManageSys(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/dbManageSys/updateDbManageSys',
      method: 'post',
      data,
    })
  },



  // 关键数据类型接口
  /**
   * @param {Object} data 
   * GET 查询关键数据类型接口
   */
  async APICruxDataTypeFindCruxDataType(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/cruxDataType/findCruxDataType',
      method: 'get',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * post 
保存关键数据类型接口
   */
  async API_CruxDataTypeSaveCruxDataType(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/cruxDataType/saveCruxDataType',
      method: 'post',
      data,
    })
  },
  /**
   * @param {Object} data 
   * 
删除关键数据类型接口
   */
  async APICruxDataTypeDelCruxDataType(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/cruxDataType/delCruxDataType',
      method: 'post',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * POST 
修改关键数据类型接口
   */
  async API_CruxDataTypeUpdateCruxDataType(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/cruxDataType/updateCruxDataType',
      method: 'post',
      data,
    })
  },


  // 安全管理中心接口
  /**
   * @param {Object} data 
   * GET 查询安全管理中心接口
   */
  async APISafeManageCenterFindSafeManageCenter(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/safeManageCenter/findSafeManageCenter',
      method: 'get',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * post 
保存安全管理中心接口
   */
  async API_SafeManageCenterSaveSafeManageCenter(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/safeManageCenter/saveSafeManageCenter',
      method: 'post',
      data,
    })
  },
  /**
   * @param {Object} data 
   * 
删除安全管理中心接口
   */
  async APISafeManageCenterDelSafeManageCenter(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/safeManageCenter/delSafeManageCenter',
      method: 'post',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * POST 
修改安全管理中心接口
   */
  async API_SafeManageCenterUpdateSafeManageCenter(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/safeManageCenter/updateSafeManageCenter',
      method: 'post',
      data,
    })
  },


  //密码产品接口接口
  /**
   * @param {Object} data 
   * GET 查询密码产品接口接口
   */
  async APPwdProductFindPwdProduct(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/pwdProduct/findPwdProduct',
      method: 'get',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * post 
保存密码产品接口
   */
  async API_PwdProductSavePwdProduct(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/pwdProduct/savePwdProduct',
      method: 'post',
      data,
    })
  },
  /**
   * @param {Object} data 
   * 
删除密码产品接口
   */
  async APIPwdProductDelPwdProductr(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/pwdProduct/delPwdProduct',
      method: 'post',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * POST 
修改密码产品接口
   */
  async API_PwdProductUpdatePwdProduct(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/pwdProduct/updatePwdProduct',
      method: 'post',
      data,
    })
  },


  //安全相关人员接口
  /**
   * @param {Object} data 
   * GET 查询安全相关人员接口
   */
  async APISecurityPersonnelFindSecurityPersonnel(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/securityPersonnel/findSecurityPersonnel',
      method: 'get',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * post 
保存安全相关人员接口
   */
  async API_SecurityPersonnelSaveSecurityPersonnel(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/securityPersonnel/saveSecurityPersonnel',
      method: 'post',
      data,
    })
  },
  /**
   * @param {Object} data 
   * 
删除安全相关人员接口
   */
  async APISecurityPersonnelDelSecurityPersonnel(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/securityPersonnel/delSecurityPersonnel',
      method: 'post',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * POST 
修改安全相关人员接口
   */
  async API_SecurityPersonnelUpdateSecurityPersonnel(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/securityPersonnel/updateSecurityPersonnel',
      method: 'post',
      data,
    })
  },


  //安全管理文档接口
  /**
   * @param {Object} data 
   * GET 查询安全管理文档接口
   */
  async APISecurityManageFileFindSecurityManageFile(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/securityManageFile/findSecurityManageFile',
      method: 'get',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * post 
保存安全管理文档接口
   */
  async API_SecurityManageFileSaveSecurityManageFile(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/securityManageFile/saveSecurityManageFile',
      method: 'post',
      data,
    })
  },
  /**
   * @param {Object} data 
   * 
删除安全管理文档接口
   */
  async APISecurityManageFileDelSecurityManageFile(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/securityManageFile/delSecurityManageFile',
      method: 'post',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * POST 
修改安全管理文档接口
   */
  async API_SecurityManageFileUpdateSecurityManageFile(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/securityManageFile/updateSecurityManageFile',
      method: 'post',
      data,
    })
  },


  //其他设备接口
  /**
   * @param {Object} data 
   * GET 查询其他设备接口
   */
  async otherEquipmentanageFile(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/otherEquipment/find',
      method: 'get',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * post 
保存其他设备接口
   */
  async otherEquipmentyManageFile(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/otherEquipment/save',
      method: 'post',
      data,
    })
  },
  /**
   * @param {Object} data 
   * 
删除其他设备接口
   */
  async otherEquidel(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/otherEquipment/del',
      method: 'post',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * POST 
修改其他设备接口
   */
  async otherEquipupdateFile(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/otherEquipment/update',
      method: 'post',
      data,
    })
  },
  /**
   * @param {Object} data 
   * POST 
更新安全状况描述
   */
  async updateSafetyStatusDescriptiongeFile(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/project/updateSafetyStatusDescription',
      method: 'post',
      data,
      params: data
    })
  },
  /**
   * @param {Object} data 
   * POST 
查询安全状况描述
   */
  async updafindSafetyStatusDescriptioniongeFile(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/project/findSafetyStatusDescription',
      method: 'get',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * POST 
删除和重新生成安全管理文档
   */
  async deleteAndGenerateusDescriptioniongeFile(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/securityManageFile/deleteAndGenerate',
      method: 'get',
      params: data,
    })
  },
  /**
   * @param {Object} data 
   * POST 
查询项目指导书
   */
  async sysCompositiongeFile(data = {}) {
    data.projectId = await this.get_info();
    return request({
      url: '/sysComposition/findBook',
      method: 'get',
      params: data,
    })
  },
})
