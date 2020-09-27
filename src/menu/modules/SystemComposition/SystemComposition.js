//系统构成
export default {
  path: '/demo/SystemComposition',
  title: '系统构成',
  icon: 'folder-o',
  children: (pre => [
    {
      path: `${pre}import_data`,
      title: '导入测评调研表'
    },
    {
      path: `${pre}jf`,
      title: '机房'
    },
    {
      path: `${pre}qybj`,
      title: '区域边界'
    },
    {
      path: `${pre}wlsb`,
      title: '网络设备'
    },
    {
      path: `${pre}aqsb`,
      title: '安全设备'
    },
    {
      path: `${pre}ywyyrj`,
      title: '业务应用软件/平台'
    },
    {
      path: `${pre}xtglpt`,
      title: '系统管理平台/全局扩展'
    },
    {
      path: `${pre}fwq`,
      title: '服务器/存储设备'
    },
    {
      path: `${pre}zd`,
      title: '终端/ 感知设备/现场设备'
    },
    {
      path: `${pre}dataStytem`,
      title: '数据库管理系统'
    },
    {
      path: `${pre}keySort`,
      title: '关键数据类别'
    }
    ,
    {
      path: `${pre}aqglzx`,
      title: '安全管理中心'
    }
    ,
    {
      path: `${pre}passProduct`,
      title: '密码产品'
    }
    ,
    {
      path: `${pre}aqxgry`,
      title: '安全相关人员'
    }
    ,
    {
      path: `${pre}aqglwd`,
      title: '安全管理文档'
    }
  ])('/demo/SystemComposition/')
}
