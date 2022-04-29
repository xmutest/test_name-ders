//风险评估报告
import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true,
  project: true
}

export default {
  path: '/demo/OverallEvaluation',
  name: 'demo-OverallEvaluation',
  meta,
  redirect: {
    name: 'demo-OverallEvaluation-ztpj'
  },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'summarize',
      name: `${pre}summarize`,
      component: _import('demo/OverallEvaluation/summarize'),
      meta: {
        ...meta,
        title: '评估报告概述'
      }
    },
    {
      path: 'assetsList',
      name: `${pre}assetsList`,
      component: _import('demo/OverallEvaluation/assetsList'),
      meta: {
        ...meta,
        title: '资产赋值表'
      }
    },
    {
      path: 'threatList',
      name: `${pre}threatList`,
      component: _import('demo/OverallEvaluation/threatList'),
      meta: {
        ...meta,
        title: '威胁赋值表'
      }
    },
    {
      path: 'fragilityList',
      name: `${pre}fragilityList`,
      component: _import('demo/OverallEvaluation/fragilityList'),
      meta: {
        ...meta,
        title: '脆弱性赋值表'
      }
    },
    {
      path: 'assetRiskList',
      name: `${pre}assetRiskList`,
      component: _import('demo/OverallEvaluation/assetRiskList'),
      meta: {
        ...meta,
        title: '资产风险计算表'
      }
    },
    {
      path: 'riskReport',
      name: `${pre}riskReport`,
      component: _import('demo/OverallEvaluation/riskReport'),
      meta: {
        ...meta,
        title: '制作风险评估报告'
      }
    },
  ])('demo-OverallEvaluation-')
}
