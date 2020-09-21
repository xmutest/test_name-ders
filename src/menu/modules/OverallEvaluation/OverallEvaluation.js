//总体评价
export default {
  path: '/demo/OverallEvaluation',
  title: '总体评价',
  icon: 'folder-o',
  children: (pre => [
    {
      path: `${pre}ztpj`,
      title: '总体评价'
    },
    {
      path: `${pre}djcpjl`,
      title: '等级测评结论'
    }
  ])('/demo/OverallEvaluation/')

}