//风险评估和评价
import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true,
  project:true
}

export default {
  path: '/demo/AssessmentAnd',
  name: 'demo-AssessmentAnd',
  meta,
  redirect: {
    name: 'demo-AssessmentAnd-fxfx'
  },
  component: layoutHeaderAside,
  children: (pre => [{
      path: 'fxfx',
      name: `${pre}fxfx`,
      component: _import('demo/AssessmentAnd/fxfx'),
      meta: {
        ...meta,
        title: '风险分析和评价'
      }
    },
    {
      path: 'fxxz',
      name: `${pre}fxxz`,
      component: _import('demo/AssessmentAnd/fxxz'),
      meta: {
        ...meta,
        title: '风险值修正'
      }
    },
    {
      path: 'wthz',
      name: `${pre}wthz`,
      component: _import('demo/AssessmentAnd/wthz'),
      meta: {
        ...meta,
        title: '安全问题汇总'
      }
    }
  ])('demo-AssessmentAnd-')
}
