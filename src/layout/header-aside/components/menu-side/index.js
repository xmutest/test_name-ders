import { mapState } from 'vuex'
import menuMixin from '../mixin/menu'
import { createMenu } from '../libs/util.menu'
import BScroll from 'better-scroll'

export default {
  name: 'd2-layout-header-aside-menu-side',
  mixins: [
    menuMixin
  ],
  render (h) {
    return <div class="d2-layout-header-aside-menu-side">
      <el-menu
        collapse={ this.asideCollapse }
        collapseTransition={ this.asideTransition }
        uniqueOpened={ true }
        defaultActive={ this.$route.fullPath }
        ref="menu"
        onSelect={ this.handleMenuSelect }>
        { this.aside.map(menu => createMenu.call(this, h, menu)) }
      </el-menu>
      {
        this.aside.length === 0 && !this.asideCollapse
          ? 
          <div class="d2-layout-header-aside-menu">
          <el-menu router defaultActive={ this.$route.fullPath }>
           
             <ul>
               <li>
                华南信息测评中心
               </li>   
               {
                   this.info.userTypeId?
                   this.info.userTypeId == 16?null: <el-menu-item index="/Jinxm"><d2-icon name="calendar-times-o items"/>进行中的项目</el-menu-item> 
                   :null
                 }
              
            
               {
                   this.info.userTypeId?
                   this.info.userTypeId == 10?null:this.info.userTypeId == 16?null:<el-menu-item  index="/woxmu"><d2-icon name="hourglass-o items1"/>我创建的项目</el-menu-item>
                   :null
                 }
                  {
                   this.info.userTypeId?
                   this.info.userTypeId == 10?null:this.info.userTypeId == 16?null:<el-menu-item index="/onxmu"><d2-icon name="power-off items2"/>已完成的项目</el-menu-item>
                   :null
                 }
                  {
                   this.info.userTypeId?
                   this.info.userTypeId != 10?null:<el-menu-item index="/todealwith"><d2-icon name="power-off items2"/>待我处理</el-menu-item>
                   :null
                 }
                 {
                   this.info.user_info?
                   this.info.user_info.userType===1?<el-menu-item index="/usercontrol"><d2-icon name="address-book-o item2"/>用户管理</el-menu-item>:null
                   :null
                 }
                  {
                   this.info.user_info?
                   this.info.user_info.userType===1?<el-menu-item index="/deptanage"><d2-icon name="address-book-o item2"/>部门管理</el-menu-item>:null
                   :null
                 }
             </ul>
          
          </el-menu>
          </div>
          : null
      }
    </div>
  },
  data () {
    return {
      asideHeight: 300,
      BS: null,
      getTimeDate:''
    }
  },
  computed: {
    ...mapState('d2admin/menu', [
      'aside',
      'asideCollapse',
      'asideTransition'
    ]),
    ...mapState("d2admin", {
      info: (state) => state.user.info,
    })
    
  },
  watch: {
    // '$route':'getPath',
    // $route:{
    //   handler(val,oldval){
    //     if(this.$route.path==this.$refs.axaxxa.dataset.index){
    //       console.log(5);
    //       this.$refs.axaxxa.style.backgroundColor  = "#fff";
    //     }else{

    //     }
    //   },
    //   // 深度观察监听
    //   deep: true
    // },
    // 折叠和展开菜单的时候销毁 better scroll
    asideCollapse (val) {
      this.scrollDestroy()
      setTimeout(() => {
        this.scrollInit()
      }, 500)
    }
  },
  mounted () {
    this.scrollInit();

  },
  beforeDestroy () {
    this.scrollDestroy()
  },
  methods: {
    getTiso(){ 
      this.$router.push({
        path: '/woxmu'
      }
      )
    },
    scrollInit () {
      this.BS = new BScroll(this.$el, {
        mouseWheel: true,
        click: true
        // 如果你愿意可以打开显示滚动条
        // scrollbar: {
        //   fade: true,
        //   interactive: false
        // }
      })
    },
    scrollDestroy () {
      // https://github.com/d2-projects/d2-admin/issues/75
      try {
        this.BS.destroy()
      } catch (e) {
        delete this.BS
        this.BS = null
      }
    }
  }
}
