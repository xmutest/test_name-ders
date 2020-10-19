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
   * @description 模板导入
   * @param {Object} data 
   */
  SYS_USER_InputDoc(data = {}) {
    // 模拟数据
    // 接口请求
    return request({
      url: '/inputDoc',
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
      url: '/downLoadDoc',
      method: 'get',
      data,
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
      params:data,
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
      params:data,
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
      params:data,
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
      params:data,
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
      params:data,
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

})
