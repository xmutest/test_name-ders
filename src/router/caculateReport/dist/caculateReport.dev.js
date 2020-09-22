"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _headerAside = _interopRequireDefault(require("@/layout/header-aside"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
var _import = require('@/libs/util.import.' + process.env.NODE_ENV);

var meta = {
  auth: true
};
var _default = {
  path: '/demo/caculateReport',
  name: 'demo-caculateReport',
  meta: meta,
  redirect: {
    name: 'demo-caculateReport-basicPoint'
  },
  component: _headerAside["default"],
  children: function (pre) {
    return [{
      path: 'basicPoint',
      name: "".concat(pre, "basicPoint"),
      component: _import('demo/caculateReport/basicPoint'),
      meta: _objectSpread({}, meta, {
        title: '基本指标'
      })
    }, {
      path: 'dxtj',
      name: "".concat(pre, "dxtj"),
      component: _import('demo/caculateReport/dxtj'),
      meta: _objectSpread({}, meta, {
        title: '单项符合情况统计'
      })
    }, {
      path: 'kzdhz',
      name: "".concat(pre, "kzdhz"),
      component: _import('demo/caculateReport/kzdhz'),
      meta: _objectSpread({}, meta, {
        title: '控制点符合情况汇总'
      })
    }, {
      path: 'safeTest',
      name: "".concat(pre, "safeTest"),
      component: _import('demo/caculateReport/safeTest'),
      meta: _objectSpread({}, meta, {
        title: '系统安全防护评估'
      })
    }, {
      path: 'zzfajh',
      name: "".concat(pre, "zzfajh"),
      component: _import('demo/caculateReport/zzfajh'),
      meta: _objectSpread({}, meta, {
        title: '制作评论方案和计划'
      })
    }, {
      path: 'makeAReport',
      name: "".concat(pre, "makeAReport"),
      component: _import('demo/caculateReport/makeAReport'),
      meta: _objectSpread({}, meta, {
        title: '制作报告'
      })
    }];
  }('demo-caculateReport-')
};
exports["default"] = _default;