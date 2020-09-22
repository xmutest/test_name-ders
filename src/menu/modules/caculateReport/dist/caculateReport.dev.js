"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//风险评估和评价
var _default = {
  path: '/demo/caculateReport',
  title: '统计和报告',
  icon: 'folder-o',
  children: function (pre) {
    return [{
      path: "".concat(pre, "basicPoint"),
      title: '基本指标'
    }, {
      path: "".concat(pre, "dxtj"),
      title: '单项符合情况统计'
    }, {
      path: "".concat(pre, "kzdhz"),
      title: '控制点符合情况汇总'
    }, {
      path: "".concat(pre, "safeTest"),
      title: '系统安全防护评估'
    }, {
      path: "".concat(pre, "zzfajh"),
      title: '制作评论方案和计划'
    }, {
      path: "".concat(pre, "makeAReport"),
      title: '制作报告'
    }];
  }('/demo/caculateReport/')
};
exports["default"] = _default;