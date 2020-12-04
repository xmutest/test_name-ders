//风险评估和评价
export default {
    path: '/demo/caculateReport',
    title: '统计和报告',
    icon: 'folder-o',
    children: (pre => [
      {
        path: `${pre}basicPoint`,
        title: '基本指标',
        icon: '  iconfont icon-jibenzhibiao'
      },
      {
        path: `${pre}dxtj`,
        title: '单项符合情况统计',
        icon: '  iconfont icon-fuhe'
      },
      {
        path: `${pre}kzdhz`,
        title: '控制点符合情况汇总',
        icon: '  iconfont icon-jieguohuizong'
      },
      {
        path: `${pre}safeTest`,
        title: '系统安全防护评估',
        icon: '  iconfont icon-jielun-copy'
      },
      {
        path: `${pre}zzfajh`,
        title: '制作测评方案',
        icon: '  iconfont icon-zhizuofangan-'
      },
      {
        path: `${pre}makeAReport`,
        title: '制作测评报告',
        icon: '  iconfont icon-zhizuobaogao'
      },
    ])('/demo/caculateReport/')
  
  }