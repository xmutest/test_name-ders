//系统构成
import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true,
  project:true
}

export default {
  path: '/demo/SystemComposition',
  name: 'demo-SystemComposition',
  meta,
  redirect: {
    name: 'demo-SystemComposition-import_data'
  },
  component: layoutHeaderAside,
  children: (pre => [

    {
      path: 'import_data',
      name: `${pre}import_data`,
      component: _import('demo/SystemComposition/import_data'),
      meta: {
        ...meta,
        title: '导入测评调研表'
      }
    },
    {
      path: 'jf',
      name: `${pre}jf`,
      component: _import('demo/SystemComposition/jf'),
      meta: {
        ...meta,
        title: '机房'
      }
    },
    {
      path: 'qybj',
      name: `${pre}qybj`,
      component: _import('demo/SystemComposition/qybj'),
      meta: {
        ...meta,
        title: '区域边界'
      }
    },
    {
      path: 'wlsb',
      name: `${pre}wlsb`,
      component: _import('demo/SystemComposition/wlsb'),
      meta: {
        ...meta,
        title: '网络设备'
      }
    },
    {
      path: 'aqsb',
      name: `${pre}aqsb`,
      component: _import('demo/SystemComposition/aqsb'),
      meta: {
        ...meta,
        title: '安全设备'
      }
    },
    {
      path: 'ywyyrj',
      name: `${pre}ywyyrj`,
      component: _import('demo/SystemComposition/ywyyrj'),
      meta: {
        ...meta,
        title: '业务应用软件/平台'
      }
    },
    {
      path: 'xtglpt',
      name: `${pre}xtglpt`,
      component: _import('demo/SystemComposition/xtglpt'),
      meta: {
        ...meta,
        title: '系统管理平台/全局扩展'
      }
    },
    {
      path: 'fwq',
      name: `${pre}fwq`,
      component: _import('demo/SystemComposition/fwq'),
      meta: {
        ...meta,
        title: '服务器/存储设备'
      }
    },
    {
      path: 'zd',
      name: `${pre}zd`,
      component: _import('demo/SystemComposition/zd'),
      meta: {
        ...meta,
        title: '终端/ 感知设备/现场设备'
      }
    },
    {
      path: 'dataStytem',
      name: `${pre}dataStytem`,
      component: _import('demo/SystemComposition/dataStytem'),
      meta: {
        ...meta,
        title: '数据库管理系统'
      }
    },
    {
      path: 'keySort',
      name: `${pre}keySort`,
      component: _import('demo/SystemComposition/keySort'),
      meta: {
        ...meta,
        title: '关键数据类别'
      }
    },
    {
      path: 'aqglzx',
      name: `${pre}aqglzx`,
      component: _import('demo/SystemComposition/aqglzx'),
      meta: {
        ...meta,
        title: '安全管理中心'
      }
    },
    {
      path: 'passProduct',
      name: `${pre}passProduct`,
      component: _import('demo/SystemComposition/passProduct'),
      meta: {
        ...meta,
        title: '密码产品'
      }
    },
    {
      path: 'aqxgry',
      name: `${pre}aqxgry`,
      component: _import('demo/SystemComposition/aqxgry'),
      meta: {
        ...meta,
        title: '安全相关人员'
      }
    },
    {
      path: 'aqglwd',
      name: `${pre}aqglwd`,
      component: _import('demo/SystemComposition/aqglwd'),
      meta: {
        ...meta,
        title: '安全管理文档'
      }
    },
  ])('demo-SystemComposition-')
}
