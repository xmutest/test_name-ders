"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//风险评估和评价
var _default = {
  path: '/demo/AssessmentAnd',
  title: '统计和报告',
  icon: 'folder-o',
  children: function (pre) {
    return [{
      path: "".concat(pre, "fxfx"),
      title: '风险分析和评价'
    }, {
      path: "".concat(pre, "fxxz"),
      title: '风险值修正'
    }, {
      path: "".concat(pre, "wthz"),
      title: '安全问题汇总'
    }, {
      path: "".concat(pre, "zgzt"),
      title: '整改状态调整'
    }];
  }('/demo/AssessmentAnd/')
};
exports["default"] = _default;