<template>
  <div
    class="d2-layout-header-aside-group"
    :style="styleLayoutMainGroup"
    :class="{ grayMode: grayActive }"
  >
    <!-- 半透明遮罩 -->
    <div class="d2-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="d2-layout-header-aside-content" flex="dir:top">
      <!-- 顶栏 -->
      <div
        class="d2-theme-header"
        :style="{ opacity: this.searchActive ? 0.5 : 1 }"
        flex-box="0"
        flex
      >
        <router-link
          to="/index"
          :class="{ 'logo-group': true, 'logo-transition': asideTransition }"
          :style="{ width: asideCollapse ? asideWidthCollapse : asideWidth }"
          flex-box="0"
        >
          <img
            v-if="asideCollapse"
            src="http://survey.iscn.org.cn/system/evaluate/img/logo2.c2ddc0ab.png"
          />
          <img
            v-else
            src="http://survey.iscn.org.cn/system/evaluate/img/logo2.c2ddc0ab.png"
          />
        </router-link>
        <div class="toggle-aside-btn" @click="handleToggleAside" flex-box="0">
          <d2-icon name="bars" />
        </div>
        <d2-menu-header flex-box="1" />
        <!-- 顶栏右侧 -->
        <div class="d2-header-right" flex-box="0">
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          <d2-header-fullscreen />
          <d2-header-user />
        </div>
      </div>
      <!-- 下面 主体 -->

      <div class="d2-theme-container" flex-box="1" flex>
        <!-- 主体 侧边栏 -->
        <div
          flex-box="0"
          ref="aside"
          :class="{
            'd2-theme-container-aside': true,
            'd2-theme-container-transition': asideTransition,
          }"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth,
            opacity: this.searchActive ? 0.5 : 1,
          }"
        >
          <d2-menu-side />
        </div>

        <!-- 主体 -->
        <div class="d2-theme-container-main" flex-box="1" flex>
          <!-- 内容 -->

          <transition name="fade-scale">
            <div
              v-if="!searchActive"
              class="d2-theme-container-main-layer"
              flex="dir:top"
            >
              <!-- tab -->
              <div style="margin: 10px 5px">
                <span style="margin: 15px; font-size: 14px">
                  当前测评项目：</span
                >

                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="xmu_info.name"
                  placement="right-end"
                >
                  <el-button
                    v-if="xmu_info.name"
                    style="color: red"
                    size="mini"
                  >
                    <span v-if="xmu_info.name.length > 50"
                      >{{ xmu_info.name.substring(0, 50) }}....</span
                    >
                    <span v-else>{{ xmu_info.name }}</span>
                  </el-button>
                  <el-button v-else size="mini"> 当前无项目选择 </el-button>
                </el-tooltip>
                <span style="margin: 15px; font-size: 14px"
                  >综合得分：<span
                    v-if="totalscore && this.totalscore.projectId !== undefined"
                    >{{ totalscore.totalFraction }}
                    <span style="margin-left: 15px"
                      >评级：{{ totalscore.fractionResult }}</span
                    ></span
                  >
                  <span v-else>无</span>
                </span>
                <!-- <span
                  class="er_ms_name"
                  style="margin: 15px; font-size: 14px; color: purple"
                >
                  <span style="font-weight: bold">报告模版：</span>
                  <el-radio-group
                    @change="xuanzheradiomstjisfen"
                    v-model="radiomstjisfen"
                  >
                    <el-radio :label="0">2019年旧版</el-radio>
                    <el-radio :label="1">2021年新版</el-radio>
                  </el-radio-group>
                </span> -->
              </div>
              <div class="d2-theme-container-main-header" flex-box="0">
                <d2-tabs />
              </div>

              <!-- 页面 -->
              <div class="d2-theme-container-main-body" flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    <router-view :key="routerViewKey" />
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import d2MenuSide from "./components/menu-side";
import d2MenuHeader from "./components/menu-header";
import d2Tabs from "./components/tabs";
import d2HeaderFullscreen from "./components/header-fullscreen";
import WaterMark from "./waterMark";
import d2HeaderUser from "./components/header-user";

import { mapState, mapGetters, mapActions } from "vuex";
import mixinSearch from "./mixins/search";
export default {
  name: "d2-layout-header-aside",
  mixins: [mixinSearch],
  components: {
    d2MenuSide,
    d2MenuHeader,
    d2Tabs,
    d2HeaderFullscreen,

    d2HeaderUser,
  },
  data() {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: "200px",
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: "65px",
      radiomstjisfen: window.sessionStorage.getItem("radiomstjisfen")
        ? Number(window.sessionStorage.getItem("radiomstjisfen"))
        : 1,
    };
  },
  created() {},
  mounted() {
    let user_info = this.$store.state.d2admin.user.info.user_info;
    console.log(this.$store.state.d2admin)
    WaterMark(`${user_info.userName}`);
  },
  computed: {
    ...mapState("d2admin", {
      keepAlive: (state) => state.page.keepAlive,
      grayActive: (state) => state.gray.active,
      transitionActive: (state) => state.transition.active,
      asideCollapse: (state) => state.menu.asideCollapse,
      asideTransition: (state) => state.menu.asideTransition,
      xmu_info: (state) => state.xmu.xmu_info,
      totalscore: (state) => state.totalscore.totalscore.data,
    }),
    ...mapGetters("d2admin", {
      themeActiveSetting: "theme/activeSetting",
    }),
    /**
     * @description 用来实现带参路由的缓存
     */
    routerViewKey() {
      // 默认情况下 key 类似 __transition-n-/foo
      // 这里的字符串操作是为了最终 key 的格式和原来相同 类似 __transition-n-__stamp-time-/foo
      const stamp = this.$route.meta[`__stamp-${this.$route.path}`] || "";
      return `${stamp ? `__stamp-${stamp}-` : ""}${this.$route.path}`;
    },
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup() {
      return this.themeActiveSetting.backgroundImage
        ? {
            backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`,
          }
        : {};
    },
  },
  methods: {
    xuanzheradiomstjisfen() {
      if (!this.xmu_info.name)
        return this.$message.error("请选择项目在进行操作");
      window.sessionStorage.setItem(
        "radiomstjisfen",
        Number(this.radiomstjisfen)
      );
      this.$api.CalculateFractionTotalFraction();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    ...mapActions("d2admin/menu", ["asideCollapseToggle"]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside() {
      this.asideCollapseToggle();
    },
  },
};
</script>

<style lang="scss" >
// 注册主题
@import "~@/assets/style/theme/register.scss";
.d2-layout-header-aside-group
  .d2-layout-header-aside-content
  .d2-theme-header
  .el-menu
  .el-submenu
  .el-submenu__title {
  padding: 0 10px;
}
.er_ms_name {
  // 添加颜色类
  .el-radio__input.is-checked + .el-radio__label {
    color: purple !important;
  }
  .el-radio__input.is-checked .el-radio__inner {
    background: purple !important;
    border-color: purple !important;
  }
}
.water-mark-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
  top: 0;
  left: 0;
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
}
.water-word {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: rgba(8, 8, 8, 0.1);
  transform: rotate(-45deg);
  user-select: none;
}
</style>
