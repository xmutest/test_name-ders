import layoutHeaderAside from '@/layout/header-aside'
import controllerlink from './ControllerLink/ControllerLink.js';
import SystemComposition from './SystemComposition/SystemComposition';
import siteVerification from './on-siteVerification/siteVerification';
import GlobalAssessment from './GlobalAssessment/GlobalAssessment';
import AssessmentAnd from './AssessmentAnd/AssessmentAnd';
import caculateReport from './caculateReport/caculateReport';
import OverallEvaluation from './OverallEvaluation/OverallEvaluation';
// import projectlist from './projectlist/projectlist';
// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [{
    path: '/',
    redirect: {
      name: 'index'
    },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      {
        path: 'Jinxm',
        name: 'Jinxm',
        meta: {
          auth: true,
          title: '进行中的项目'
        },
        component: _import('system/Jinxm/Jinxm')
      },
      {
        path: 'onxmu',
        name: 'onxmu',
        meta: {
          auth: true,
          title: '已完成的项目'
        },
        component: _import('system/onxmu/onxmu')
      },
      {
        path: 'woxmu',
        name: 'woxmu',
        meta: {
          auth: true,
          title: '我创建的项目'
        },
        component: _import('system/woxmu/woxmu')
      },
      {
        path: 'usercontrol',
        name: 'usercontrol',
        meta: {
          auth: true,
          title: '用户管理'
        },
        component: _import('system/userControl/index')
      },
      {
        path: 'deptanage',
        name: 'deptanage',
        meta: {
          auth: true,
          title: '部门管理'
        },
        component: _import('system/deptanage/index')
      },
      // 演示页面
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      },
      {
        path: 'todealwith',
        name: 'todealwith',
        meta: {
          auth: true,
          title: '待我处理'
        },
        component: _import('system/todealwith/todealwith')
      }
    ]
  },
  controllerlink,
  SystemComposition,
  siteVerification,
  GlobalAssessment,
  AssessmentAnd,
  OverallEvaluation,
  caculateReport
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [{
  path: '*',
  name: '404',
  component: _import('system/error/404')
}]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
