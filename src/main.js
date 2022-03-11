// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
// import VueVirtualScroller from "vue-virtual-scroller";
// Vue.use(VueVirtualScroller);
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'
import axios from 'axios'
Vue.prototype.$http = axios
// 菜单和路由设置
import router from './router'
import {
  menuHeader,
  menuAside
} from '@/menu'
import {
  frameInRoutes
} from '@/router/routes'
import {
  fabric
} from 'fabric'
Vue.directive('throttle', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      el.style.pointerEvents = 'none';
      if (!el.disabled) {
        setTimeout(() => {
          el.style.pointerEvents = 'auto';
        }, binding.value || 2000);
      }
    });
  }
});
// 画布插件
Vue.use(require('vue-easeljs'))
Vue.use(fabric);
// Vue.use(require('echarts'))
function qvList(date) {
  if (date == '' || date == undefined) {
    return '----'
  }
  let k = date == 1 ?
    "关键" :
    date == 0.7 ?
    "重要" :
    date == 0.4 ?
    "一般" :
    "无";
  return k;
}
Vue.prototype.qvList = qvList;
// 核心插件
Vue.use(d2Admin)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    let menuHeaderList = [];
    setTimeout(() => {
      let userType = store.state.d2admin.user.info.userTypeId
      if (userType == 10 || userType == 16) {
        menuHeader.forEach(item => {
          if (item.typeid) {
            menuHeaderList.push(item)
          } else {
            if (item.children) {
              item.children.forEach(is => {
                if (is.typeid) {
                  menuHeaderList.push(is)
                }
              })
            }
          }
        });

      } else {
        menuHeader.forEach(item => {
          if (item.title == "统计和报告") {
            item.children.pop()
          }
        })
        menuHeaderList = menuHeader
      }
      if (userType == 16) {
        menuHeaderList = [menuHeaderList[0]]
      }
      // 设置顶栏菜单
      this.$store.commit('d2admin/menu/headerSet', menuHeaderList)
    }, 50)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted() {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  },
  watch: {
    // 检测路由变化切换侧边栏内容 
    '$route.matched': {
      handler(matched) {
        setTimeout(() => {
          let userType = store.state.d2admin.user.info.userTypeId
          if (matched.length > 0) {
            const _side = menuAside.filter(menu => menu.path === matched[0].path);
            console.log(userType);
            let _sideList = [];
            if (userType == 10) {
              if (_side.length !== 0) {
                _side[0].children.forEach(item => {
                  if (item.title == '评审记录') {
                    _sideList.push(item)
                  }
                })
              }
              console.log(11111);
              this.$store.commit('d2admin/menu/asideSet', _sideList.length > 0 ? _sideList : [])
            } else if (userType == 16) {
              console.log(_sideList, 333);
              this.$store.commit('d2admin/menu/asideSet', _sideList.length > 0 ? _sideList : [])
            } else {
              console.log(2222);
              if (_side.length != 0) {
                if (_side[0].title == "统计和报告") {
                  _side[0].children = _side[0].children.filter(item => item.title != "评审记录")
                }
              }

              this.$store.commit('d2admin/menu/asideSet', _side.length > 0 ? _side[0].children : [])
            }
            // const _hide = menuHeader.filter(menu => menu.path === matched[0].path)
            // console.log(_hide);
            // _hide.filter(item => {
            //   item.children = item.children.filter(it => it.lit != true);
            //   console.log(item.children);
            // })
            // const ks = _side.filter(item => {
            //   item.children = item.children.filter(it => it.lit != true);
            //   // console.log(item.children);
            // })

            // this.$store.commit('d2admin/menu/headerSet', _side.length > 0 ? _side[0].children : [])
          }
        }, 50)

      },
      immediate: true
    }
  }
}).$mount('#app')
