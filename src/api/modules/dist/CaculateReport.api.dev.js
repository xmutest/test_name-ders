"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("@/store/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var service = _ref.service,
      request = _ref.request,
      serviceForMock = _ref.serviceForMock,
      requestForMock = _ref.requestForMock,
      mock = _ref.mock,
      faker = _ref.faker,
      tools = _ref.tools;
  return {
    // 获取信息
    get_info: function get_info() {
      var xmu_info;
      return regeneratorRuntime.async(function get_info$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_index["default"].dispatch('d2admin/db/get', {
                dbName: 'sys',
                path: 'xmu.xmu_info',
                defaultValue: {},
                xmu: true
              }, {
                root: true
              }));

            case 2:
              xmu_info = _context.sent;

              if (!(!xmu_info.projectId && xmu_info.projectId == 'undefined')) {
                _context.next = 8;
                break;
              }

              alert('出错，项目选择失效，请重新选择！！！');
              return _context.abrupt("return", '');

            case 8:
              return _context.abrupt("return", xmu_info.projectId);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      });
    },

    /**
     * @description 查询整体评测
     * @param {Object} data 携带的信息
     */
    API_CalculateFractionControlStatistics: function API_CalculateFractionControlStatistics() {
      var data,
          _args2 = arguments;
      return regeneratorRuntime.async(function API_CalculateFractionControlStatistics$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              data = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
              //   data.projectId = await this.get_info();
              data.projectId = 5; // 接口请求

              return _context2.abrupt("return", request({
                //   url: '/project/findOverallEvaluation',
                url: '/calculateFraction/controlStatistics',
                method: 'get',
                params: data
              }));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      });
    },

    /**
     * @description 保存整体评测
     * @param {Object} data 携带的信息
     */
    API_WholeEvaluationSaveWholeEvaluation: function API_WholeEvaluationSaveWholeEvaluation() {
      var data,
          _args3 = arguments;
      return regeneratorRuntime.async(function API_WholeEvaluationSaveWholeEvaluation$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              data = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.get_info());

            case 3:
              data.projectId = _context3.sent;
              return _context3.abrupt("return", request({
                url: '/wholeEvaluation/saveWholeEvaluation',
                method: 'post',
                data: data
              }));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    },

    /**
     * @description 修改整体评测
     * @param {Object} data 携带的信息
     */
    API_ProjectupdateOverallEvaluation: function API_ProjectupdateOverallEvaluation() {
      var data,
          _args4 = arguments;
      return regeneratorRuntime.async(function API_ProjectupdateOverallEvaluation$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              data = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
              _context4.next = 3;
              return regeneratorRuntime.awrap(this.get_info());

            case 3:
              data.projectId = _context4.sent;
              return _context4.abrupt("return", request({
                url: '/project/updateOverallEvaluation',
                method: 'post',
                params: data
              }));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  };
};

exports["default"] = _default;