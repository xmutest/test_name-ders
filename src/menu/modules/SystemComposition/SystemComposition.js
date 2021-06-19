//系统构成
export default {
  path: '/demo/SystemComposition',
  title: '系统构成',
  icon: 'book',
  children: (pre => [{
      path: `${pre}import_data`,
      title: '导入测评调研表'
    },
    {
      path: `${pre}jf`,
      title: '物理机房',
      icon: '  iconfont icon-jifang'
    },
    {
      path: `${pre}qybj`,
      title: '区域边界',
      icon: '  iconfont icon-quyubianjiechakan'
    },
    {
      path: `${pre}wlsb`,
      title: '网络设备',
      icon: '  iconfont icon-wangluoshebei'
    },
    {
      path: `${pre}aqsb`,
      title: '安全设备',
      icon: '  iconfont icon-anquanshebei'
    },
    {
      path: `${pre}ywyyrj`,
      title: '业务应用软件/平台',
      icon: '  iconfont icon-Drgspingtairuanjianxitong'
    },
    {
      path: `${pre}xtglpt`,
      title: '系统管理软件/平台',
      icon: '  iconfont icon-layui-myicon-guanli'
    },
    {
      path: `${pre}dataStytem`,
      title: '数据库管理系统',
      icon: '  iconfont icon-shujuku'
    },
    {
      path: `${pre}fwq`,
      title: '服务器/存储设备',
      icon: '  iconfont icon-fuwuqi'
    },
    {
      path: `${pre}zd`,
      title: '终端设备',
      icon: '  iconfont icon-xianchangshebei'
    },
    {
      path: `${pre}restsList`,
      title: '其他设备',
      icon: '  iconfont icon-xianchangshebei'
    },
    {
      path: `${pre}keySort`,
      title: '数据资源',
      icon: '  iconfont icon-guanjianshuju-shuzi'
    },
    {
      path: `${pre}aqglzx`,
      title: '安全管理中心',
      icon: '  iconfont icon-anquanguanli'
    },
    {
      path: `${pre}passProduct`,
      title: '密码产品',
      icon: '  iconfont icon-mima1'
    },
    {
      path: `${pre}aqxgry`,
      title: '安全相关人员',
      icon: '  iconfont icon-anquanguanlirenyuan'
    },
    {
      path: `${pre}aqglwd`,
      title: '安全管理文档',
      icon: '  iconfont icon-anquanwendangkux'
    }
  ])('/demo/SystemComposition/')
}
