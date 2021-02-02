export default {
  path: '/demo/ControllerLink',
  title: '项目概述',
  icon: 'bookmark-o',
  children: (pre => [
    {
      path: `${pre}purpose`,
      title: '测评目的和依据',
      icon: '  iconfont icon-mudedi',
    },
    {
      path: `${pre}course`,
      title: '测评过程',
      icon: '  iconfont icon-guocheng'
    },
    {
      path: `${pre}conditio`,
      title: '被测单位信息',
      icon: '  iconfont icon-danweixinxi'
    },
    // {
    //   path: `${pre}situationBeing`,
    //   title: '承载的业务情况'
    // },
    {
      path: `${pre}structure`,
      title: '网络结构',
      icon: '  iconfont icon-wangluojiegou'
    },
    // {
    //   path: `${pre}paIntls`,
    //   title: '测评工具及接入点说明'
    // },
    // {
    //   path: `${pre}anquanfs`,
    //   title: '安全服务'
    // },
    // {
    //   path: `${pre}anquanhj`,
    //   title: '安全环境'
    // },
    // {
    //   path: `${pre}psduix`,
    //   title: '测评对象选择方法',
    //   icon: '  iconfont icon-zujianku-duixiangxuanze'
    // }
    // ,
    // {
    //   path: `${pre}pszdian`,
    //   title: '测评重点'
    // }
  ])('/demo/ControllerLink/')

}
