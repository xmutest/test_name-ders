//整体评价
export default {
  path: '/demo/GlobalAssessment',
  title: '整体测评',
  icon: 'sliders',
  children: (pre => [
    {
      path: `${pre}ztcp`,
      title: '整体测评结果汇总'
    },
    {
      path: `${pre}aqkzjaqcp`,
      title: '安全控制间安全测评'
    },
    {
      path: `${pre}cmjaqcp`,
      title: '层面间安全测评'
    },
    {
      path: `${pre}qyjaqcp`,
      title: '区域间安全测评'
    },
    {
      path: `${pre}checkTest`,
      title: '验证测试'
    }
  ])('/demo/GlobalAssessment/')

}