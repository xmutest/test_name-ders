//整体评价
export default {
  path: '/demo/GlobalAssessment',
  title: '整体测评',
  icon: 'sliders',
  children: (pre => [
    {
      path: `${pre}ztcp`,
      title: '整体测评结果汇总',
      icon: '  iconfont icon-jieguohuizong'
    },
    {
      path: `${pre}issuelist`,
      title: '测评问题清单',
      icon: '  iconfont icon-jieguohuizong'
    },
    {
      path: `${pre}aqkzjaqcp`,
      title: '安全控制间安全测评',
      icon: '  iconfont icon-ceping'
    },
    {
      path: `${pre}cmjaqcp`,
      title: '层面间安全测评',
      icon: '  iconfont icon-ceping'
    },
    {
      path: `${pre}qyjaqcp`,
      title: '区域间安全测评',
      icon: '  iconfont icon-ceping'
    },
    {
      path: `${pre}checkTest`,
      title: '验证测试和接入点',
      icon: '  iconfont icon-jierudian'
    },
    {
      path: `${pre}leakList`,
      title: '漏洞扫描结果统计',
      icon: '  iconfont icon-jierudian'
    },
    {
      path: `${pre}permeate`,
      title: '漏洞扫描结果统计',
      icon: '  iconfont icon-jierudian'
    }
  ])('/demo/GlobalAssessment/')

}