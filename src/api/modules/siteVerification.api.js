import {
  find,
  assign
} from 'lodash'
import store from '@/store/index';
import ElementUI from "element-ui";
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
   * @description 模板下载
   * @param {Object} data 
   */
  async SYS_OutputSceneCheck(data = {}) {
    data.projectId = await this.get_info();
    // 模拟数据
    // 接口请求
    return request({
      url: '/output/sceneCheck',
      method: 'get',
      params: data,
      responseType: 'blob',
    })
  },
  /**
   * @description 获取项目总分数
   * @param {Object} data 携带的信息
   */
  async CalculateFractionTotalFraction(data = {}) {
    data.fractionVersion = window.sessionStorage.getItem("radiomstjisfen") ?
      Number(window.sessionStorage.getItem("radiomstjisfen")) :
      1;
    data.projectId = await this.get_info();
    let res = await request({
      url: '/calculateFraction/totalFraction',
      method: 'get',
      params: data
    });
    if (res.code === 20000) {
      await store.dispatch(
        "d2admin/totalscore/set", {
          data: res.data,
        }, {
          root: true,
        }
      );
    } else {
      ElementUI.Message({
        title: '警告',
        message: `请求总分数出错，请联系管理员`,
        type: 'error'
      });
    }
  },
  // 获取信息
  /**
   * @description 查询安全物理环境
   * @param {Object} data 携带的信息
   */
  async SYS_FieldSurveyFindAssetsList(data = {}) {
    data.projectId = await this.get_info();
    let versions =
      window.sessionStorage.getItem("radiomstjisfen") == 0 ? 2019 : 2021;
    data.versions = versions;
    this.CalculateFractionTotalFraction();
    // 安全物理环境
    // 接口请求
    return request({
      url: '/fieldSurvey/findAssetsList',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 删除现场核查控制项
   * @param {Object} data 携带的信息
   */
  async SYS_FieldSurveyDelete(data = {}) {
    // 删除现场核查控制项
    // 接口请求
    return request({
      url: '/fieldSurvey/delete',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 生成现场核查控制项
   * @param {Object} data 携带的信息
   */
  async SYS_FieldSurveyActive(data = {}) {
    return request({
      url: '/fieldSurvey/active',
      method: 'get',
      params: data
    })
  },

  /**
   * @description 修改现场核查控制项
   * @param {Object} data 携带的信息
   */
  async SYS_FieldSurveYUpdate(data = {}) {
    return request({
      url: '/fieldSurvey/update',
      method: 'post',
      data
    });
  },

  /**
   * @description 批量更新保护措施
   * @param {Object} data 携带的信息
   */
  async SYSFieldSurveyUpdateList(data = {}) {
    return request({
      url: '/fieldSurvey/updateList',
      method: 'post',
      data
    })
  },
  /**
   * @description 生成保护措施
   * @param {Object} data 携带的信息
   */
  async SYS_fieldSurveySyncProtective(data = {}) {
    let versions =
      window.sessionStorage.getItem("radiomstjisfen") == 0 ? 2019 : 2021;
    data.versions = versions;
    return request({
      url: '/fieldSurvey/syncProtective',
      method: 'get',
      params: data
    })
  },

})
