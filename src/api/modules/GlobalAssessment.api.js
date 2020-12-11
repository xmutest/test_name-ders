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
   * @description 查询整体评测
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
   * @description 保存整体评测
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
   * @description 修改整体评测
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
   * @description 模板导入
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
  // 模拟数据
  data.projectId = await this.get_info();
  // 接口请求
  return request({
    url: '/reviseManifest/update',
    method: 'post',
    data
  })
},
})
