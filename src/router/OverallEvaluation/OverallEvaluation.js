//总体评价
import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true,
  project:true
}

export default {
  path: '/demo/OverallEvaluation',
  name: 'demo-OverallEvaluation',
  meta,
  redirect: {
    name: 'demo-OverallEvaluation-ztpj'
  },
  component: layoutHeaderAside,
  children: (pre => [{
      path: 'ztpj',
      name: `${pre}ztpj`,
      component: _import('demo/OverallEvaluation/ztpj'),
      meta: {
        ...meta,
        title: '总体评价'
      }
    },
    {
      path: 'djcpjl',
      name: `${pre}djcpjl`,
      component: _import('demo/OverallEvaluation/djcpjl'),
      meta: {
        ...meta,
        title: '等级测评结论'
      },
      
    }
  ])('demo-OverallEvaluation-')
}
