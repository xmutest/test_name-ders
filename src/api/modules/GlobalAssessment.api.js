import {
  find,
  assign
} from 'lodash'
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
   * @description 分页查询整体测评结果汇总 
   * @param {Object} data 携带的信息
   */
  async APIwholeEvaluationFindResults(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/wholeEvaluation/findResults',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 查询整体测评
   * @param {Object} data 携带的信息
   */
  async API_WholeEvaluationFindWholeEvaluation(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/wholeEvaluation/findWholeEvaluation',
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
  async API_WholeEvaluationUpdateWholeEvaluation(data = {}) {
    // 接口请求
    data.projectId = await this.get_info();
    return request({
      url: '/wholeEvaluation/updateWholeEvaluation',
      method: 'post',
      data
    })
  },
  /**
   * @description 模板上传
   * @param {Object} data 
   */
  SYS_loudong_InputDoc(data = {}) {
    // 模拟数据
    // 接口请求
    return request({
      url: '/parsingHtml/analyzeHtml',
      method: 'post',
      data
    })
  },
  // 漏洞查询
  // 
  async SYS_findDetails_InputDoc(data = {}) {
    // 模拟数据
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/parsingHtml/findDetails',
      method: 'get',
      params: data
    })
  },
  // 漏洞添加
  // 
  async SYS_saveDetails_InputDoc(data = {}) {
    // 模拟数据
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/parsingHtml/saveDetails',
      method: 'post',
      data
    })
  },
  // 漏洞修改
  // 
  async SYS_updateDetails_InputDoc(data = {}) {
    // 模拟数据
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/parsingHtml/updateDetails',
      method: 'post',
      data
    })
  },
  // 漏洞删除
  // 
  async SYS_delVulnerbility_InputDoc(data = {}) {
    // 模拟数据
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/parsingHtml/delVulnerbility',
      method: 'delete',
      data
    })
  },
    // 漏洞删除单个
  // 
  async ParsingHtmlDelSingleVulnerbility(data = {}) {
    // 模拟数据
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/parsingHtml/delSingleVulnerbility',
      method: 'delete',
      params:data
    })
  },
  //  获取测评问题清单列表
  // 
  //
  async SYS_reviseManifest_InputDoc(data = {}) {
    // 模拟数据
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/reviseManifest/findList',
      method: 'get',
      params: data
    })
  },
  //  修改测评问题清单列表
  // 
  //
  async SYS_reviseMupdate_InputDoc(data = {}) {
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/reviseManifest/update',
      method: 'post',
      data
    })
  },
  // 导出问题清单列表excol
  async SYS_reviseMupdareviseManifest(data = {}) {
    // 模拟数据
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/word/reviseManifest',
      method: 'get',
      params: data
    })
  },
  //  获取主机扫描统计
  //
  async SYSparsingHtmlFindHost(data = {}) {
    // 模拟数据
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/parsingHtml/findHost',
      method: 'get',
      params: data
    })
  },
  //  获取应用扫描统计
  //
  async SYSParsingHtmlFindApp(data = {}) {
    // 模拟数据
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/parsingHtml/findApp',
      method: 'get',
      params: data
    })
  },
  //  

  //查询渗透授权书
  async SYSParsingHfindBook(data = {}) {
    // 模拟数据
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/penetration/findBook',
      method: 'get',
      params: data
    })
  },

  /**
     * @description 
  上传渗透授权书
     * @param {Object} data 
     */
  SYS_loudouploadBook(data = {}) {
    // 模拟数据
    // 接口请求
    return request({
      url: data.point,
      method: 'post',
      data
    })
  },
  ///查询渗透部门人员

  async SYSParsifindPenetrationUserk(data = {}) {
    // 模拟数据
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: 'user/findPenetrationUser',
      method: 'post',
      params:data
    })
  },
//  删除渗透授权书
  //
  async SYSParsinationDelBook(data = {}) {
    // 模拟数据
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/penetration/delBook',
      method: 'post',
      data
    })
  },
  //  
   ///查询渗透统计表

   async SYSParsifindfindTotalk(data = {}) {
    // 模拟数据
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/penetration/findTotal',
      method: 'get',
      params:data
    })
  },
  //  删除渗透报告
  //
  async SYSParsinationdelPenetrationReport(data = {}) {
    // 模拟数据
    data.projectId = await this.get_info();
    // 接口请求
    return request({
      url: '/penetration/delPenetrationReport',
      method: 'post',
      data
    })
  },
})
