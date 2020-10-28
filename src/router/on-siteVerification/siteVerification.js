// 现场核查
import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true,
  project: true
}

export default {
  path: '/demo/siteVerification',
  name: 'demo-siteVerification',
  meta,
  redirect: {
    name: 'demo-siteVerification-safeEnviroment'
  },
  component: layoutHeaderAside,
  children: (pre => [{
      path: 'import_data',
      name: `${pre}import_data`,
      component: _import('demo/on-siteVerification/import_data'),
      meta: {
        ...meta,
        title: '导入测评调研表'
      }
    },
    {
      path: 'safeEnviroment',
      name: `${pre}safeEnviroment`,
      component: _import('demo/on-siteVerification/safeEnviroment'),
      meta: {
        ...meta,
        title: '安全物理环境'
      }
    },
    {
      path: 'safeNet',
      name: `${pre}safeNet`,
      component: _import('demo/on-siteVerification/safeNet'),
      meta: {
        ...meta,
        title: '安全通信网络'
      }
    },
    {
      path: 'aqqyb',
      name: `${pre}aqqyb`,
      component: _import('demo/on-siteVerification/aqqyb'),
      meta: {
        ...meta,
        title: '安全区域边界'
      }
    },
    {
      path: 'aqjshj',
      name: `${pre}aqjshj`,
      component: _import('demo/on-siteVerification/aqjshj'),
      meta: {
        ...meta,
        title: '安全计算环境'
      }
    },
    {
      path: 'managerCenter',
      name: `${pre}managerCenter`,
      component: _import('demo/on-siteVerification/managerCenter'),
      meta: {
        ...meta,
        title: '安全管理中心'
      }
    },
    {
      path: 'zdgl',
      name: `${pre}zdgl`,
      component: _import('demo/on-siteVerification/zdgl'),
      meta: {
        ...meta,
        title: '安全管理制度'
      }
    },
    {
      path: 'qjjg',
      name: `${pre}qjjg`,
      component: _import('demo/on-siteVerification/qjjg'),
      meta: {
        ...meta,
        title: '安全管理机构'
      }
    },
    {
      path: 'aqry',
      name: `${pre}aqry`,
      component: _import('demo/on-siteVerification/aqry'),
      meta: {
        ...meta,
        title: '安全管理人员'
      }
    },
    {
      path: 'buildManger',
      name: `${pre}buildManger`,
      component: _import('demo/on-siteVerification/buildManger'),
      meta: {
        ...meta,
        title: '安全建设管理'
      }
    },
    {
      path: 'ywgl',
      name: `${pre}ywgl`,
      component: _import('demo/on-siteVerification/ywgl'),
      meta: {
        ...meta,
        title: '安全运维管理'
      }
    }
  ])('demo-siteVerification-')
}
