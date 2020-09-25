import {
  find,
  assign
} from 'lodash'

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
   * @description 安全物理环境
   * @param {Object} data 携带的信息
   */
  SYS_USER_ANQUAN_WU(data = {}) {
    // 安全物理环境
    // 接口请求
    return request({
      url: '/safetyControl/findSpotByBookId',
      method: 'get',
      params:data
    })
  }
})
