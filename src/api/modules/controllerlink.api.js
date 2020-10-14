import {
  find,
  assign
} from 'lodash'
import store from '@/store/index'
/**
 * @description 项目概述
 * @param {Object} data 携带的信息
 */
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
   * @description 项目概述
   * @param {Object} data 携带的信息
   */
  API_evaluationBasisFindAll(data = {}) {
    // 安全物理环境
    // 接口请求
    return request({
      url: '/evaluationBasis/findAll',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 项目概述修改
   * @param {Object} data 携带的信息
   */
  async API_evaluationBasis_updata(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/projectOverview/updatePO',
      method: 'post',
      data
    })
  },
  // 评测目的查询
  async API_projectOverviewObjective(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/projectOverview/findEvaluationObjective',
      method: 'get',
      params: data
    })
  },
  // 查询项目概述的测评工具及接入点说明
  async API_projectOverviewfindAccessPointDescribe(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/projectOverview/findAccessPointDescribe',
      method: 'get',
      params: data
    })
  },
  // GET 查询项目概述的测评过程
  async API_projectOverviewfindBriefIntroduction(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/projectOverview/findBriefIntroduction',
      method: 'get',
      params: data
    })
  },
  // 查询项目概述的承载的业务情况
  async API_projectOverviewfindBusinessSituation(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/projectOverview/findBusinessSituation',
      method: 'get',
      params: data
    })
  },
  // GET 查询项目概述的测评重点
  async API_projectOverviewfindEvaluationFocus(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/projectOverview/findEvaluationFocus',
      method: 'get',
      params: data
    })
  },
  // 查询项目概述的网络结构
  async API_projectOverviewStructureDescribe(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/projectOverview/findNetworkStructureDescribe',
      method: 'get',
      params: data
    })
  },
  // 查询项目概述的测评对象选择方法
  async API_projectOverviewdObjSelectionMethod(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/projectOverview/findObjSelectionMethod',
      method: 'get',
      params: data
    })
  },
  // 查询项目概述的系统情况
  async API_projectOverviewdObjfindSystemSituation(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/projectOverview/findSystemSituation',
      method: 'GET',
      params: data
    })
  },
  /**
   * @description 项目概述-网络结构-图片查询
   * @param {Object} data 携带的信息
   */
  async API_findNetworkImg(data = {}) {
    data.projectId = await this.get_info();
    data.id = 3;
    // 接口请求
    return request({
      url: '/img/findNetworkImg',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 项目概述-网络结构-图片保存
   * @param {Object} data 携带的信息
   */
  async API_imgSaveNetworkImg(data = {}) {
    let formData = new FormData();
    formData.append("projectId", await this.get_info()); // 额外参数
    formData.append("files", data.file);
    data = formData;
    // 接口请求
    return request({
      url: '/img/saveNetworkImg',
      method: 'post',
      data
    })
  },
  /**
   * @description 项目概述-网络结构-图片修改
   * @param {Object} data 携带的信息
   */
  async API_imgupdateImg(data = {}) {
    let formData = new FormData();
    formData.append("projectId", await this.get_info()); // 额外参数
    formData.append("file", data.file);
    formData.append("id", data.id);
    data = formData;
    // 接口请求
    return request({
      url: '/img/updateImg',
      method: 'post',
      data
    })
  },
  /**
   * @description 项目概述-网络结构-查询系统边界
   * @param {Object} data 携带的信息
   */
  async API_sysBoundaryFindSysBoundary(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/sysBoundary/findSysBoundary',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 项目概述-网络结构-新增系统边界
   * @param {Object} data 携带的信息
   */
  async API_sysBoundarySave(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/sysBoundary/save',
      method: 'post',
      data
    })
  },
  /**
   * @description 项目概述-网络结构-删除系统边界
   * @param {Object} data 携带的信息
   */
  async API_sysBoundaryDelSysBoundary(data = {}) {
    // data.projectId = await this.get_info();
    // 接口请求
    console.log(data);
    return request({
      url: '/sysBoundary/delSysBoundary',
      method: 'post',
      params: data
    })
  },
  /**
   * @description 项目概述-网络结构-修改系统边界
   * @param {Object} data 携带的信息
   */
  async API_sysBoundaryUpdate(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/sysBoundary/update',
      method: 'post',
      data
    })
  },

  // 安全服务
  /**
   * @description 项目概述-安全服务-查询
   * @param {Object} data 携带的信息
   */
  async API_securityServicesFindAll(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/securityServices/findAll',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 项目概述-安全服务-删除
   * @param {Object} data 携带的信息
   */
  async API_securityServicesdelService(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/securityServices/delService',
      method: 'delete',
      params: data
    })
  },
  /**
   * @description 项目概述-安全服务-修改
   * @param {Object} data 携带的信息
   */
  async API_securityServicesupdateService(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/securityServices/updateService',
      method: 'post',
      data
    })
  },
  /**
   * @description 项目概述-安全服务-新增
   */
  async API_securityServicessaveService(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/securityServices/saveService',
      method: 'post',
      params: data
    })
  },
})
