import axios from 'axios'
import Adapter from 'axios-mock-adapter'
import router from '@/router'
import store from '@/store/index';
import {
  get
} from 'lodash'
import util from '@/libs/util'
import {
  errorLog,
  errorCreate
} from './tools'
import ElementUI from "element-ui";
import {
  MessageBox,
  Loading
} from "element-ui";

/**
 * @description 创建请求实例
 */
function createService() {
  // 创建一个 axios 实例
  const service = axios.create()
  // 请求拦截

  service.interceptors.request.use(
    config => config,
    error => {
      // 发送失败
      loading.close();
      return Promise.reject(error)
    }
  )
  // 响应拦截
  service.interceptors.response.use(
    async response => {
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data
        if (response.config.url == `${process.env.VUE_APP_API}/user/leadToAuthorize`) {
          return dataAxios
        }
        // 这个状态码是和后端约定的
        const {
          code
        } = dataAxios
        // 根据 code 进行判断
        if (code === undefined) {
          // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
          return dataAxios
        } else {
          // 有 code 代表这是一个后端接口 可以进行进一步的判断
          switch (code) {
            case 0:
              // [ 示例 ] code === 0 代表没有错误
              return dataAxios.data
            case 20000:
              // [ 示例 ] code === 0 代表没有错误
              return dataAxios
            case 401:
              // [ 示例 ] code === 0 代表没有错误
              return ElementUI.Message({
                title: '警告',
                message: `请求出错: ${dataAxios.message}`,
                type: 'error'
              });
            case 500:
              // [ 示例 ] code === 0 代表没有错误
              return ElementUI.Message({
                title: '警告',
                message: `请求出错: ${dataAxios.message}`,
                type: 'error'
              });
            case 555:

              // [ 示例 ] code === 0 代表没有错误
              return ElementUI.Message({
                title: '警告',
                message: `请求出错: ${dataAxios.message}`,
                type: 'error'
              });
            case 402:
              return MessageBox.alert(dataAxios.message, '警告', {
                confirmButtonText: '确定',
                showClose: false,
                type: 'error',
                callback: action => {
                  store.dispatch(
                    "d2admin/account/logouts", {
                      confirm: true
                    }
                  );
                }
              });
            case 403:
              // [ 示例 ] code === 0 代表没有错误
              return MessageBox.alert(dataAxios.message, '警告', {
                confirmButtonText: '确定',
                showClose: false,
                type: 'error',
                callback: action => {
                  // alert(dataAxios.message)
                  store.dispatch(
                    "d2admin/account/logouts", {
                      confirm: true
                    }
                  );
                }
              });

            default:
              ElementUI.Message({
                title: '警告',
                message: `请求出错: ${response.config.url}，请联系管理员`,
                type: 'error'
              });
              // 不是正确的 code
              errorCreate(`${dataAxios}: ${response.config.url}`)
              break
          }
        }
      },
      error => {
        const status = get(error, 'response.status')
        switch (status) {
          case undefined:
            error.message = '网络出错，请检查！！！';
            break
          case 400:
            error.message = '请求错误';
            break
          case 401:
            error.message = '未授权，请登录';
            break
          case 403:
            error.message = '拒绝访问';
            break
          case 404:
            error.message = `请求地址出错: ${error.response.config.url}`;
            break
          case 408:
            error.message = '请求超时';
            break
          case 500:
            error.message = '服务器内部错误';
            break
          case 501:
            error.message = '服务未实现';
            break
          case 502:
            error.message = '网关错误';
            break
          case 503:
            error.message = '服务不可用';
            break
          case 504:
            error.message = '网关超时';
            break
          case 505:
            error.message = 'HTTP版本不受支持';
            break
          default:
            break
        }
        errorLog(error)
        return Promise.reject(error)
      }
  )
  return service
}

/**
 * @description 创建请求方法
 * @param {Object} service axios 实例
 */
function createRequestFunction(service) {

  return function (config) {
    let token, baseURL;
    if (config.token) {
      token = config.token;
    } else {
      token = util.cookies.get('token')
    }
    if (config.base == 'VUE_APP_manage') {
      baseURL = process.env.VUE_APP_manage;
    } else {
      baseURL = process.env.VUE_APP_API
    }
    const configDefault = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': get(config, 'headers.Content-Type', 'application/json')
      },
      timeout: 600000,
      baseURL: baseURL,
      data: {}
    }
    return service(Object.assign(configDefault, config))
  }
}

function createRequestFunctionword(service) {
  return function (config) {
    const token = util.cookies.get('token')
    const configDefault = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': get(config, 'headers.Content-Type', 'application/json')
      },
      data: {}
    }
    return service(Object.assign(configDefault, config))
  }
}
// 用于真实网络请求的实例和请求方法
export const service = createService()
export const request = createRequestFunction(service)
export const requestword = createRequestFunctionword(service)
// 用于模拟网络请求的实例和请求方法
export const serviceForMock = createService()
export const requestForMock = createRequestFunction(serviceForMock)

// 网络请求数据模拟工具
export const mock = new Adapter(serviceForMock)
