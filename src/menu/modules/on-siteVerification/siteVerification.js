// 现场核查
export default {
  path: '/demo/siteVerification',
  title: '现场核查',
  icon: 'odnoklassniki',
  children: (pre => [{
      path: `${pre}import_data`,
      title: '导入现场记录表'
    },
    {
      path: `${pre}safeEnviroment`,
      title: '安全物理环境',
      icon: '  iconfont icon-huanjing1'
    },
    {
      path: `${pre}safeNet`,
      title: '安全通信网络',
      icon: '  iconfont icon-wangluo'
    },
    {
      path: `${pre}aqqyb`,
      title: '安全区域边界',
      icon: '  iconfont icon-bianjiefanghu'
    },
    {
      path: `${pre}aqjshj`,
      title: '安全计算环境',
      icon: '  iconfont icon-huanjing1'
    },
    {
      path: `${pre}managerCenter`,
      title: '安全管理中心',
      icon: '  iconfont icon-guanlizhongxin'
    },
    {
      path: `${pre}zdgl`,
      title: '安全管理制度',
      icon: '  iconfont icon-iconfonticon'
    },
    {
      path: `${pre}qjjg`,
      title: '安全管理机构',
      icon: '  iconfont icon-anquanguanlijigou1'
    },
    {
      path: `${pre}aqry`,
      title: '安全管理人员',
      icon: '  iconfont icon-anquanguanlirenyuan'
    },
    {
      path: `${pre}buildManger`,
      title: '安全建设管理',
      icon: '  iconfont icon-jichujiansheguanli'
    },
    {
      path: `${pre}ywgl`,
      title: '安全运维管理',
      icon: '  iconfont icon-anquanyunweiguanli'
    }
  ])('/demo/siteVerification/')

}
