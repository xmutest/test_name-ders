//总体评价
export default {
  path: '/demo/OverallEvaluation',
  title: '风险评估报告',
  icon: 'hospital-o',
  children: (pre => [
    {
  	  path: `${pre}summarize`,
  	  title: '评估报告概述'
	  },
    {
  	  path: `${pre}assetsList`,
  	  title: '资产赋值表'
  	},
    {
      path: `${pre}threatList`,
      title: '威胁赋值表'
    },
    {
      path: `${pre}fragilityList`,
      title: '脆弱性赋值表'
    },
    {
      path: `${pre}assetRiskList`,
      title: '资产风险计算表'
    },
    {
      path: `${pre}riskReport`,
      title: '制作风险评估报告'
    },
    
  ])('/demo/OverallEvaluation/')

}