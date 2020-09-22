"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.frameInRoutes = void 0;

var _headerAside = _interopRequireDefault(require("@/layout/header-aside"));

var _ControllerLink = _interopRequireDefault(require("./ControllerLink/ControllerLink.js"));

var _SystemComposition = _interopRequireDefault(require("./SystemComposition/SystemComposition"));

var _siteVerification = _interopRequireDefault(require("./on-siteVerification/siteVerification"));

var _GlobalAssessment = _interopRequireDefault(require("./GlobalAssessment/GlobalAssessment"));

var _AssessmentAnd = _interopRequireDefault(require("./AssessmentAnd/AssessmentAnd"));

var _caculateReport = _interopRequireDefault(require("./caculateReport/caculateReport"));

var _OverallEvaluation = _interopRequireDefault(require("./OverallEvaluation/OverallEvaluation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
var _import = require('@/libs/util.import.' + process.env.NODE_ENV);
/**
 * 在主框架内显示
 */


var frameIn = [{
  path: '/',
  redirect: {
    name: 'index'
  },
  component: _headerAside["default"],
  children: [// 首页
  {
    path: 'index',
    name: 'index',
    meta: {
      auth: true
    },
    component: _import('system/index')
  }, // 演示页面
  // 系统 前端日志
  {
    path: 'log',
    name: 'log',
    meta: {
      title: '前端日志',
      auth: true
    },
    component: _import('system/log')
  }, // 刷新页面 必须保留
  {
    path: 'refresh',
    name: 'refresh',
    hidden: true,
    component: _import('system/function/refresh')
  }, // 页面重定向 必须保留
  {
    path: 'redirect/:route*',
    name: 'redirect',
    hidden: true,
    component: _import('system/function/redirect')
  }]
}, _ControllerLink["default"], _SystemComposition["default"], _siteVerification["default"], _GlobalAssessment["default"], _AssessmentAnd["default"], _OverallEvaluation["default"], _caculateReport["default"]];
/**
 * 在主框架之外显示
 */

var frameOut = [// 登录
{
  path: '/login',
  name: 'login',
  component: _import('system/login')
}];
/**
 * 错误页面
 */

var errorPage = [{
  path: '*',
  name: '404',
  component: _import('system/error/404')
}]; // 导出需要显示菜单的

var frameInRoutes = frameIn; // 重新组织后导出

exports.frameInRoutes = frameInRoutes;

var _default = [].concat(frameIn, frameOut, errorPage);

exports["default"] = _default;