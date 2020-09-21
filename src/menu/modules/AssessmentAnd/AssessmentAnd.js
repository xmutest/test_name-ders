//风险评估和评价
export default {
  path: '/demo/AssessmentAnd',
  title: '风险评估和评价',
  icon: 'folder-o',
  children: (pre => [
    {
      path: `${pre}fxfx`,
      title: '风险分析和评价'
    },
    {
      path: `${pre}fxxz`,
      title: '风险值修正'
    },
    {
      path: `${pre}wthz`,
      title: '安全问题汇总'
    },
    {
      path: `${pre}zgzt`,
      title: '整改状态调整'
    },
  ])('/demo/AssessmentAnd/')

}