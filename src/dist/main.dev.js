"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _App = _interopRequireDefault(require("./App"));

var _d2admin = _interopRequireDefault(require("@/plugin/d2admin"));

var _index = _interopRequireDefault(require("@/store/index"));

var _axios = _interopRequireDefault(require("axios"));

var _router = _interopRequireDefault(require("./router"));

var _vCharts = _interopRequireDefault(require("v-charts"));

var _menu = require("@/menu");

var _routes = require("@/router/routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Vue
// 核心插件
// store
_vue["default"].prototype.$http = _axios["default"]; // 菜单和路由设置

_vue["default"].use(require('vue-easeljs'));

_vue["default"].use(_vCharts["default"]); // Vue.use(require('echarts'))
// 核心插件


_vue["default"].use(_d2admin["default"]);

new _vue["default"]({
  router: _router["default"],
  store: _index["default"],
  i18n: _i18n["default"],
  render: function render(h) {
    return h(_App["default"]);
  },
  created: function created() {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', _routes.frameInRoutes); // 设置顶栏菜单

    this.$store.commit('d2admin/menu/headerSet', _menu.menuHeader); // 设置侧边栏菜单

    this.$store.commit('d2admin/menu/asideSet', _menu.menuAside); // 初始化菜单搜索功能

    this.$store.commit('d2admin/search/init', _menu.menuHeader);
  },
  mounted: function mounted() {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow'); // 用户登录后从数据库加载一系列的设置

    this.$store.dispatch('d2admin/account/load'); // 获取并记录用户 UA

    this.$store.commit('d2admin/ua/get'); // 初始化全屏监听

    this.$store.dispatch('d2admin/fullscreen/listen');
  },
  watch: {
    // 检测路由变化切换侧边栏内容 
    '$route.matched': {
      handler: function handler(matched) {
        if (matched.length > 0) {
          var _side = _menu.menuAside.filter(function (menu) {
            return menu.path === matched[0].path;
          });

          this.$store.commit('d2admin/menu/asideSet', _side.length > 0 ? _side[0].children : []);
        }
      },
      immediate: true
    }
  }
}).$mount('#app');