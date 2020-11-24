//总体评价
export default {
  path: '/demo/OverallEvaluation',
  title: '总体评价',
  icon: 'hospital-o',
  children: (pre => [
    {
      path: `${pre}ztpj`,
      title: '总体评价',
      icon: '  iconfont icon-Overall-evaluation'
    },
    {
      path: `${pre}djcpjl`,
      title: '等级测评结论',
      icon: '  iconfont icon-jielun-copy'
    }
  ])('/demo/OverallEvaluation/')

}