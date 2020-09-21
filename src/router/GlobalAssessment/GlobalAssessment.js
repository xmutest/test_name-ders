//整体评价
import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true
}

export default {
  path: '/demo/GlobalAssessment',
  name: 'demo-GlobalAssessment',
  meta,
  redirect: {
    name: 'demo-GlobalAssessment-page1'
  },
  component: layoutHeaderAside,
  children: (pre => [{
      path: 'ztcp',
      name: `${pre}ztcp`,
      component: _import('demo/GlobalAssessment/ztcp'),
      meta: {
        ...meta,
        title: '整体测评结果汇总'
      }
    },
    {
      path: 'aqkzjaqcp',
      name: `${pre}aqkzjaqcp`,
      component: _import('demo/GlobalAssessment/aqkzjaqcp'),
      meta: {
        ...meta,
        title: '安全控制间安全测评'
      }
    },
    {
      path: 'cmjaqcp',
      name: `${pre}cmjaqcp`,
      component: _import('demo/GlobalAssessment/cmjaqcp'),
      meta: {
        ...meta,
        title: '层面间安全测评'
      }
    },
    {
      path: 'qyjaqcp',
      name: `${pre}qyjaqcp`,
      component: _import('demo/GlobalAssessment/qyjaqcp'),
      meta: {
        ...meta,
        title: '区域间安全测评'
      }
    },
    {
      path: 'checkTest',
      name: `${pre}checkTest`,
      component: _import('demo/GlobalAssessment/checkTest'),
      meta: {
        ...meta,
        title: '验证测试'
      }
    }
  ])('demo-GlobalAssessment-')
}
