<template>
  <el-dropdown size="small" class="d2-mr">
    <div class="btn-text infoArea">{{info.name ? `你好` : '未登录'}} <span class="myAccountName">{{info.name ? info.name : ''}} </span></div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        登出
      </el-dropdown-item>
      <el-dropdown-item @click.native="dialogVisible = true">
        <d2-icon name="power-off" class="d2-mr-5"/>
        修改密码
      </el-dropdown-item>
    </el-dropdown-menu>

    <div class="NO_password">
      <el-dialog title="修改密码" :visible.sync="dialogVisible" width="150">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="initPass">
            <el-input
              type="password"
              v-model="ruleForm.initPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkPass">
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
  </el-dropdown>
  
  
</template>


<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
  data(){
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
    return {
      dialogVisible: false,
      ruleForm: {
        initPass:"",
        pass: "",
        checkPass: "",
      },
      rules: {
        initPass:[ {validator: validatePass, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      }
    }
  },
  created() {
    console.log('用户信息',this.info)
  },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true
      })
    },
    submit_nopassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          console.log()
          this.changePass(valid)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async changePass(){
      
      // console.log(this.ruleForm.pass)
      let data = {
        loginName:this.info.user_info.loginName,
        userName:this.info.user_info.userName,
        userType:this.info.user_info.userType,
        userId:this.info.user_info.userId,
        password:this.ruleForm.pass,
        initPass:this.ruleForm.initPass
      }
      let res = await this.$api.SYS_USER_PASSWORD_CHANGE(data)

      // let res = request({
      //   url:'http://survey.iscn.org.cn/evaluation/user/update',
      //   method:'post',
      //   password:'hezhi127'
      // })

      if(res.code == 20000) return this.logout()
      
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style lang="scss">
  .theme-d2 .d2-theme-header .d2-header-right .infoArea{
    // background:#2D3A4B;
    // color:#2D3A4B!important;
    // font-weight:bold; 
  }
  .myAccountName{
    color:#08c!important;
    font-weight:bold; 
  }
  .myAccountName:hover{
    color:#2D3A4B!important;
  }
</style>
