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
  // 测评目的查询
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
  // GET 查询项目概述的测评工具
  async API_projectOverviewEvaluationToolFindAll(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/evaluationTool/findAll',
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
  // 查询项目概述的安全环境
  async API_projectOThreatClassificationFindAll(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/threatClassification/findAll',
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
   * @description 项目概述-查询入点图片
   * @param {Object} data 携带的信息
   */
  async API_ImgFindAccessPointImg(data = {}) {
    data.projectId = await this.get_info();;
    // 接口请求
    return request({
      url: '/img/findAccessPointImg',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 项目概述-保存接入点图片
   * @param {Object} data 携带的信息
   */
  async API_ImgSaveAccessPointImg(data = {}) {
    let formData = new FormData();
    formData.append("projectId", await this.get_info()); // 额外参数
    formData.append("files", data.file);
    data = formData;
    // 接口请求
    return request({
      url: '/img/saveAccessPointImg',
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
      method: 'get',
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
      data
    })
  },
  /**
   * @description 项目概述-详细过程-查询
   */
  async API_TimeRecordFindTimeRecord(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/timeRecord/findTimeRecord',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 项目概述-详细过程-保存
   */
  async API_TimeRecordSaveTimeRecord(data = {}) {
    let projectId = await this.get_info();
    // 接口请求
    data.timeRecords.forEach(element => {
      element.projectId = projectId
    });
    return request({
      url: '/timeRecord/saveTimeRecord',
      method: 'post',
      data: [...data.timeRecords]
    })
  },
  /**
   * @description 项目概述-详细过程-修改
   */
  async API_TimeRecordUpdateTimeRecord(data = {}) {
    let projectId = await this.get_info();
    // 接口请求
    data.timeRecords.forEach(element => {
      element.projectId = projectId
    });
    return request({
      url: '/timeRecord/updateTimeRecord',
      method: 'post',
      data: [...data.timeRecords]
    })
  },
  /**
   * @description 查询被测评单位(委托单位)
   */
  async PassiveCompanyFindModel(data = {}) {
    let projectId = await this.get_info();
    data.projectId = projectId;
    return request({
      url: '/passiveCompany/findModel',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 更新被测评单位(委托单位)
   */
  async API_PassiveCompanyUpdate(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/passiveCompany/update',
      method: 'post',
      data
    })
  },
  /**
   * @description 查询项目概述的详细过程时间预览
   */
  async API_ProjectOverviewFindDetailTimePreview(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/projectOverview/findDetailTimePreview',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 查询项目概述的详细过程时间预览
   */
  async API_ProjectOverviewUpdateDetailTimePreview(data = {}) {

    // 接口请求
    return request({
      url: '/projectOverview/updateDetailTimePreview',
      method: 'post',
      params: data
    })
  },


  /**
   * @description 查询上次测评
   */
  async lastEvaluationetailTimePreview(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/lastEvaluation/findList',
      method: 'get',
      params: data
    })
  },


  /**
   * @description 新增上次测评
   */
  async lastEvaluatisaveview(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/lastEvaluation/save',
      method: 'post',
      data
    })
  },
  /**
   * @description 修改上次测评
   */
  async lastEvaluatupdateview(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/lastEvaluation/update',
      method: 'post',
      data
    })
  },
  /**
   * @description 删除上次测评
   */
  async lastEvaluadeleteew(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/lastEvaluation/delete',
      method: 'get',
      params: data
    })
  },
  /**
   * @description GET 
设置为是否首次
   */
  async lastEvaluseteew(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/lastEvaluation/set',
      method: 'get',
      params: data
    })
  },
})
