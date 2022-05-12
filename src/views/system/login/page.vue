<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>

    <div class="page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:stretch box:justify"
      >
        <div class="page-login--content-header">
          <!-- <p class="page-login--content-header-motto">时间是一切财富中最宝贵的财富</p> -->
        </div>
        <div
          class="page-login--content-main"
          flex="dir:top main:center cross:center"
        >
          <!-- logo -->
          <div
            style="font-size: 2.5em; font-weight: 700"
            class="page-login-logo_item"
          >
            华南测评报告管理系统
          </div>
          <img
            class="page-login--logo"
            src="http://static.iscn.org.cn/system/evaluate/img/logo2.c2ddc0ab.png"
          />
          <!-- form -->
          <div class="page-login--form">
            <el-card shadow="never">
              <el-form
                ref="loginForm"
                label-position="top"
                :rules="rules"
                :model="formLogin"
                size="default"
              >
                <el-form-item prop="username">
                  <el-input
                    type="text"
                    v-model="formLogin.username"
                    placeholder="用户名"
                  >
                    <i slot="prepend" class="fa fa-user-circle-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    v-model="formLogin.password"
                    placeholder="密码"
                  >
                    <i slot="prepend" class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input
                    type="text"
                    v-model="formLogin.code"
                    placeholder="验证码"
                  >
                    <template slot="append">
                      <div>
                        <!--验证码组件-->
                        <img
                          alt="验证码"
                          @click="createImatMsg"
                          class="login-code"
                          :src="imgCode.imageBase64"
                        />
                        <!-- <s-identify :identifyCode="identifyCode"></s-identify> -->
                      </div>
                    </template>
                  </el-input>
                </el-form-item>
                <el-button
                  size="default"
                  @click="submit"
                  type="primary"
                  class="button-login"
                  >登录</el-button
                >
              </el-form>
            </el-card>
            <p class="page-login--options" flex="main:justify cross:center">
              <!-- <span @click="nopassword">
                <d2-icon name="question-circle" />忘记密码
              </span> -->
              <!-- <span @click="register_add">注册用户</span> -->
            </p>
            <!-- quick login -->
            <!-- <el-button class="page-login--quick" size="default" type="info" @click="dialogVisible = true">
              快速选择用户（测试功能）
            </el-button>-->
          </div>
        </div>
        <div class="page-login--content-footer">
          <p class="page-login--content-footer-locales"></p>
          <p class="page-login--content-footer-copyright">
            <d2-icon name="copyright" />广州华南信息安全测评中心版权所有
            <d2-icon name="copyright" />粤ICP备19011520号-1
            <!-- <a href>@Fss</a> -->
          </p>
        </div>
      </div>
    </div>
    <div class="NO_password">
      <el-dialog
        title="忘记密码"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        width="150"
      >
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit_nopassword('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapActions } from "vuex";
import localeMixin from "@/locales/mixin.js";
export default {
  mixins: [localeMixin],

  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 验证码
    const validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      imgCode: "",
      srcColde: "",
      // 记住密码
      checked: true,
      identifyCodes: "1234567890",
      identifyCode: "",
      timeInterval: null,
      time: dayjs().format("HH:mm:ss"),
      dialogVisible: false,
      // 快速选择用户
      ruleForm: {
        pass: "",
        checkPass: "",
      },
      // 表单
      formLogin: {
        username: "",
        password: "",
        code: "",
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        code: [{ validator: validateCode, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  created() {
    // this.refreshCode();
    this.createImatMsg();
    this.srcColde = process.env.VUE_APP_API;
  },
  mounted() {
    this.timeInterval = setInterval(() => {
      this.refreshTime();
    }, 1000);
    window.addEventListener("keydown", this.keyDown);
    this.getCookie();
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
  methods: {
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        this.submit();
      }
    },
    ...mapActions("d2admin/account", ["login"]),
    refreshTime() {
      this.time = dayjs().format("HH:mm:ss");
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    },
    nopassword() {
      this.dialogVisible = true;
    },
    submit_nopassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register_add() {
      this.$message({
        message: "此功能未开放,如需请联系管理员开通账号",
        type: "warning",
      });
    },
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick(user) {
      this.formLogin.username = user.username;
      this.formLogin.password = user.password;
      this.submit();
    },
    async createImatMsg() {
      let res = await this.$api.createImatMsg();
      if (res.code === 20000) {
        this.imgCode = res.data;
        // this.imgCode.imageBase64 = `data:image/jpg;base64,${res.data.imageBase64}`;
      }
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log(this.imgCode);
          this.login({
            loginName: this.formLogin.username,
            password: this.formLogin.password,
            verificationCode: this.formLogin.code,
            verificationKey: this.imgCode.verificationKey,
          }).then(async (res) => {
            if (this.checked == true) {
              let res = await this.$api.API_leadToAuthorize({
                platformType: 3,
              });
              if (res.code == 20000) {
                window.sessionStorage.setItem("ms_token", res.data);
              }
              if (this.checked == true) {
                //传入账号名，密码，和保存天数3个参数
                this.setCookie(
                  this.formLogin.username,
                  this.formLogin.password,
                  7
                );
              } else {
                console.log("清空Cookie");
                //清空Cookie
                this.clearCookie();
              }
              window.removeEventListener("keydown", this.keyDown, false);
              // 重定向对象不存在则返回顶层路径
              this.$router.replace(this.$route.query.redirect || "/");
            }
          });
        } else {
          // 登录表单校验失败
          this.$message.error("表单校验失败，请检查");
        }
      });
    },
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            //  console.log(arr2[1])
            this.formLogin.username = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "password") {
            // console.log(arr2[1])
            this.formLogin.password = arr2[1];
          }
        }
        this.checked = true;
      }
    },
    //清除cookie
    clearCookie: function () {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
  },
};
</script>

<style lang="scss">
.page-login {
  @extend %unable-select;
  $backgroundColor: #f0f2f5;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
    }
  }
  // main
  .page-login--logo {
    width: 150px;
    // margin-bottom: 2em;
    margin-top: -2em;
  }
  .page-login-logo_item {
    margin-bottom: 35px;
  }
  // 登录表单
  .page-login--form {
    width: 280px;
    // 卡片
    .el-card {
      margin-bottom: 15px;
      border-radius: 8%;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 1px;
      width: 120px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .page-login--quick {
      width: 100%;
    }
  }
  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: $color-bg;
      i {
        color: $color-text-normal;
      }
      span {
        color: $color-text-normal;
      }
    }
    i {
      font-size: 36px;
      color: $color-text-sub;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-locales {
      padding: 0px;
      margin: 0px;
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
        margin: 0 0.5em;
        &:hover {
          color: $color-text-main;
        }
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
.wjmimaLis_top123 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .wjimima {
    color: #409eff;
    font-size: 14px;
  }
}
</style>
