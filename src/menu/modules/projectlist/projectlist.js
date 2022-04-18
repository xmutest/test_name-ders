export default {
    path: '/Jinxm',
    title: '风险评估和评价',
    icon: 'folder-o',
    children: (pre => [
      {
        path: `${pre}Jinxm`,
        title: '风险分析和评价'
      },
      {
        path: `${pre}woxmu`,
        title: '风险值修正'
      },
      {
        path: `${pre}onxmu`,
        title: '安全问题汇总'
      }
    ])('/')
  
  }