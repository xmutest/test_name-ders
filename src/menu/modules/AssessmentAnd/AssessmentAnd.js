//风险评估和评价
export default {
  path: '/demo/AssessmentAnd',
  title: '风险分析和评价',
  icon: 'heartbeat',
  children: (pre => [{
      path: `${pre}fxfx`,
      title: '风险分析和评价',
      icon: '  iconfont icon-fengxiantishi'
    },
    {
      path: `${pre}fxxz`,
      title: '风险值修正',
      icon: '  iconfont icon-fengxianzhi'
    },
    {
      path: `${pre}wthz`,
      title: '安全问题汇总',
      icon: '  iconfont icon-anquanwenti'
    },
    {
      path: `${pre}ztpj`,
      title: '总体评价',
      icon: '  iconfont icon-Overall-evaluation'
    },
    {
      path: `${pre}company`,
      title: '安全状况描述',
      icon: '  iconfont icon-Overall-evaluation'
    },
    {
      path: `${pre}djcpjl`,
      title: '等级测评结论',
      icon: '  iconfont icon-jielun-copy'
    }
  ])('/demo/AssessmentAnd/')

}
