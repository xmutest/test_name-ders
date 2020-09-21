// 现场核查
export default {
  path: '/demo/siteVerification',
  title: '现场核查',
  icon: 'folder-o',
  children: (pre => [
    {
      path: `${pre}safeEnviroment`,
      title: '安全物理环境'
    },
    {
      path: `${pre}safeNet`,
      title: '安全通信网络'
    },
    {
      path: `${pre}aqqyb`,
      title: '安全区域边界'
    },
    {
      path: `${pre}aqjshj`,
      title: '安全计算环境'
    },
    {
      path: `${pre}managerCenter`,
      title: '安全管理中心'
    },
    {
      path: `${pre}zdgl`,
      title: '安全管理制度'
    },
    {
      path: `${pre}qjjg`,
      title: '安全管理机构'
    },
    {
      path: `${pre}aqry`,
      title: '安全管理人员'
    },
    {
      path: `${pre}buildManger`,
      title: '安全建设管理'
    }
    ,
    {
      path: `${pre}ywgl`,
      title: '安全运维管理'
    }
  ])('/demo/siteVerification/')

}