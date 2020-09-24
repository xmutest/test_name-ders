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
          ? <div class="d2-layout-header-aside-menu">
             <ul>
               <li>
                华南信息评测中心
               </li>
               <li>
               <d2-icon name="calendar-times-o items"/>
               <router-link to="">进行中的项目</router-link>
               </li>
               <li>
               <d2-icon name="hourglass-o items1"/>
                 <router-link to="">我创建的项目</router-link></li>
               <li>
               <d2-icon name="power-off items2"/>
                 <router-link to="">已完成的项目</router-link></li>
             </ul>
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
    ])
  },
  watch: {
    // 折叠和展开菜单的时候销毁 better scroll
    asideCollapse (val) {
      this.scrollDestroy()
      setTimeout(() => {
        this.scrollInit()
      }, 500)
    }
  },
  mounted () {
    this.scrollInit()
  },
  beforeDestroy () {
    this.scrollDestroy()
  },
  methods: {
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
