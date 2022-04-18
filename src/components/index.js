import Vue from 'vue'

import d2Container from './d2-container'

// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', d2Container)
Vue.component('d2-icon', () => import('./d2-icon'))
Vue.component('d2-icon-svg', () => import('./d2-icon-svg/index.vue'))
Vue.component('d2-quill', () => import('./d2-quill'))
Vue.component('upload-qu', () => import('./daoru'))
Vue.component('upload-dachu', () => import('./daochu'))
Vue.component('upload-city', () => import('./cityList/index.vue'))
Vue.component('upload-wushu', () => import('./wusjv'))
Vue.component('s-identify', () => import('./SIdentify/SIdentify.vue'))
// Vue.component('pagination', () => import('./pagination'))