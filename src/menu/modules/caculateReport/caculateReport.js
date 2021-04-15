//风险评估和评价
export default {
  path: '/demo/caculateReport',
  title: '统计和报告',
  icon: 'folder-o',
  children: (pre => [{
      path: `${pre}layout/grid`,
      title: '归档材料',
      icon: 'tasks',
      children: [{
          path: `/demo/SystemComposition/import_data`,
          title: '测评调研表'
        },
        {
          path: `/demo/GlobalAssessment/kssueList`,
          title: '测评现场记录表'
        },
        {
          path: `${pre}diffewt`,
          title: '问题确认单'
        },
        {
          path: `${pre}daochupinfsheng`,
          title: '导出评审记录'
        }
      ]
    },
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
      path: `${pre}projectList`,
      title: '项目计划书',
      icon: '  iconfont icon-zhizuofangan-'
    },
    {
      path: `${pre}makeAReport`,
      title: '制作测评报告',
      icon: '  iconfont icon-zhizuobaogao'
    },
    {
      path: `${pre}reportReview`,
      title: '方案/报告审核',
      icon: '  iconfont icon-zhizuobaogao'
    },
    {
      path: `${pre}agent`,
      title: '评审记录',
      icon: '  iconfont icon-zhizuobaogao',
      typeid: 2
    },
  ])('/demo/caculateReport/')

}
