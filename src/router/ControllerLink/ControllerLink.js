// 项目概述
import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true,
  project:true
}

export default {
  path: '/demo/ControllerLink',
  name: 'demo-ControllerLink',
  meta,
  redirect: {
    name: 'demo-ControllerLink-page1'
  },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'purpose',
      name: `${pre}purpose`,
      component: _import('demo/ControllerLink/purpose'),
      meta: {
        ...meta,
        title: '评测目的和依据'
      }
    },
    {
      path: 'course',
      name: `${pre}course`,
      component: _import('demo/ControllerLink/course'),
      meta: {
        ...meta,
        title: '评测过程'
      }
    },
    {
      path: 'conditio',
      name: `${pre}conditio`,
      component: _import('demo/ControllerLink/conditio'),
      meta: {
        ...meta,
        title: '被测信息系统情况'
      }
    }
    ,
    {
      path: 'situationBeing',
      name: `${pre}situationBeing`,
      component: _import('demo/ControllerLink/situationBeing'),
      meta: {
        ...meta,
        title: '承载的业务情况'
      }
    }
    ,
    {
      path: 'structure',
      name: `${pre}structure`,
      component: _import('demo/ControllerLink/structure'),
      meta: {
        ...meta,
        title: '网络结构'
      }
    }
    ,
    {
      path: 'paIntls',
      name: `${pre}paIntls`,
      component: _import('demo/ControllerLink/paIntls'),
      meta: {
        ...meta,
        title: '测评工具及接入点说明'
      }
    }
    ,
    {
      path: 'anquanfs',
      name: `${pre}anquanfs`,
      component: _import('demo/ControllerLink/anquanfs'),
      meta: {
        ...meta,
        title: '安全服务'
      }
    }
    ,
    {
      path: 'anquanhj',
      name: `${pre}anquanhj`,
      component: _import('demo/ControllerLink/anquanhj'),
      meta: {
        ...meta,
        title: '安全环境'
      }
    }
    ,
    {
      path: 'psduix',
      name: `${pre}psduix`,
      component: _import('demo/ControllerLink/psduix'),
      meta: {
        ...meta,
        title: '测评对象选择方法'
      }
    }
    ,
    {
      path: 'pszdian',
      name: `${pre}pszdian`,
      component: _import('demo/ControllerLink/pszdian'),
      meta: {
        ...meta,
        title: '测评重点'
      }
    }
  ])('demo-ControllerLink-')
}
