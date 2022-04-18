
import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true,
  project:true
}

export default {
  path: '/demo/projectlist',
  name: 'demo-projectlist',
  meta,
  redirect: {
    name: 'demo-projectlist-Jinxm'
  },
  component: layoutHeaderAside,
  children: (pre => [{
      path: 'Jinxm',
      name: `${pre}Jinxm`,
      component: _import('demo/projectlist/Jinxm'),
      meta: {
        ...meta,
        title: '进行中的项目'
      }
    },
    {
      path: 'woxmu',
      name: `${pre}woxmu`,
      component: _import('demo/projectlist/woxmu'),
      meta: {
        ...meta,
        title: '我创建的项目'
      }
    }
    ,
    {
      path: 'onxmu',
      name: `${pre}onxmu`,
      component: _import('demo/projectlist/onxmu'),
      meta: {
        ...meta,
        title: '已完成的项目'
      }
    }
  ])('demo-projectlist-')
}
