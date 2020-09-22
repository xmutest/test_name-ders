"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuHeader = exports.menuAside = void 0;

var _lodash = require("lodash");

var _ControllerLink = _interopRequireDefault(require("./modules/ControllerLink/ControllerLink"));

var _SystemComposition = _interopRequireDefault(require("./modules/SystemComposition/SystemComposition"));

var _siteVerification = _interopRequireDefault(require("./modules/on-siteVerification/siteVerification"));

var _GlobalAssessment = _interopRequireDefault(require("./modules/GlobalAssessment/GlobalAssessment"));

var _AssessmentAnd = _interopRequireDefault(require("./modules/AssessmentAnd/AssessmentAnd"));

var _caculateReport = _interopRequireDefault(require("./modules/caculateReport/caculateReport"));

var _OverallEvaluation = _interopRequireDefault(require("./modules/OverallEvaluation/OverallEvaluation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath(menu) {
  return menu.map(function (e) {
    return _objectSpread({}, e, {
      path: e.path || (0, _lodash.uniqueId)('d2-menu-empty-')
    }, e.children ? {
      children: supplementPath(e.children)
    } : {});
  });
}

var menuAside = supplementPath([_ControllerLink["default"], _SystemComposition["default"], _siteVerification["default"], _GlobalAssessment["default"], _AssessmentAnd["default"], _OverallEvaluation["default"], _caculateReport["default"]]);
exports.menuAside = menuAside;
var menuHeader = supplementPath([{
  path: '/index',
  title: '首页',
  icon: 'home'
}, _ControllerLink["default"], _SystemComposition["default"], _siteVerification["default"], _GlobalAssessment["default"], _AssessmentAnd["default"], _OverallEvaluation["default"], _caculateReport["default"]]);
exports.menuHeader = menuHeader;