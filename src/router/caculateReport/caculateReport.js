//风险评估和评价
import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true,
  project:true
}

export default {
  path: '/demo/caculateReport',
  name: 'demo-caculateReport',
  meta,
  redirect: {
    name: 'demo-caculateReport-basicPoint'
  },
  component: layoutHeaderAside,
  children: (pre => [{
      path: 'basicPoint',
      name: `${pre}basicPoint`,
      component: _import('demo/caculateReport/basicPoint'),
      meta: {
        ...meta,
        title: '基本指标'
      }
    },
    {
      path: 'dxtj',
      name: `${pre}dxtj`,
      component: _import('demo/caculateReport/dxtj'),
      meta: {
        ...meta,
        title: '单项符合情况统计'
      }
    },
    {
      path: 'kzdhz',
      name: `${pre}kzdhz`,
      component: _import('demo/caculateReport/kzdhz'),
      meta: {
        ...meta,
        title: '控制点符合情况汇总'
      }
    },
    {
      path: 'safeTest',
      name: `${pre}safeTest`,
      component: _import('demo/caculateReport/safeTest'),
      meta: {
        ...meta,
        title: '系统安全防护评估'
      }
    },
    {
      path: 'zzfajh',
      name: `${pre}zzfajh`,
      component: _import('demo/caculateReport/zzfajh'),
      meta: {
        ...meta,
        title: '制作测评方案'
      }
    },
    {
      path: 'projectList',
      name: `${pre}projectList`,
      component: _import('demo/caculateReport/projectList'),
      meta: {
        ...meta,
        title: '项目计划书'
      }
    },
    {
      path: 'makeAReport',
      name: `${pre}makeAReport`,
      component: _import('demo/caculateReport/makeAReport'),
      meta: {
        ...meta,
        title: '制作测评报告'
      }
    },
  ])('demo-caculateReport-')
}
