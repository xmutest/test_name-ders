//风险评估和评价
export default {
    path: '/demo/caculateReport',
    title: '统计和报告',
    icon: 'folder-o',
    children: (pre => [
      {
        path: `${pre}basicPoint`,
        title: '基本指标'
      },
      {
        path: `${pre}dxtj`,
        title: '单项符合情况统计'
      },
      {
        path: `${pre}kzdhz`,
        title: '控制点符合情况汇总'
      },
      {
        path: `${pre}safeTest`,
        title: '系统安全防护评估'
      },
      {
        path: `${pre}zzfajh`,
        title: '制作评论方案和计划'
      },
      {
        path: `${pre}makeAReport`,
        title: '制作报告'
      },
    ])('/demo/caculateReport/')
  
  }