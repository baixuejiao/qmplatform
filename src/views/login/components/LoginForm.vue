  <!--页面功能：登录页面的左边表单部分 logo 用户名 密码 登陆按钮 注册-->
<template>
  <section class="login-form">
    <img class="login-form-logo" src="@/assets/imgs/logo.png" />
    <div v-if="loginType=='pass'">
      <div class="login-form-wrapper">
        <input type="text" @blur="checkPhone" v-model="tel" maxlength="11" placeholder="请输入登录手机号" />
        <p class="login-form-error">{{errorData.tel}}</p>
      </div>
      <div class="login-form-wrapper">
        <input type="password" @input="checkPass" v-model="pass" maxlength="16" placeholder="请输入登录密码"/>
        <p class="login-form-error">{{errorData.pass}}</p>
      </div>
      <div class="login-form-wrapper">
        <span :class="['login-form-btn', telStatus && passStatus ? 'active' : 'none']" @click="loginByPass">登录</span>
      </div>
      <div class="login-form-wrapper clearfix">
        <span class="login-form-forgot" @click="goForgot" >忘记密码?</span>
        <span class="login-form-code" @click="changeType('code')">短信验证码登录</span>
      </div>
    </div>
    <div v-if="loginType=='code'">
      <div class="login-form-wrapper">
        <input type="text" @blur="checkPhone" v-model="tel" maxlength="11" placeholder="请输入登录手机号" /> 
        <p class="login-form-error">{{errorData.tel}}</p>
      </div>
      <div class="login-form-wrapper">
        <input type="password" @input="checkVertify" v-model="scode" placeholder="请输入短信验证码"/>
        <span :class="['login-form-getcode', codeStatus ? 'send' : 'default']" @click="sendCode()">{{codeText}}</span>
        <p class="login-form-error">{{errorData.scode}}</p>

      </div>
      <div class="login-form-wrapper">
        <span :class="['login-form-btn', telStatus && codeStatus ? 'active' : 'none']" @click="loginByCode">登录</span>
      </div>
      <div class="login-form-wrapper">
        <p class="login-form-other" @click="changeType('pass', true)">账号密码登录</p>
      </div>
    </div>
    <div class="line"></div>
    <span class="login-form-reg" @click="create">创建一个新账户</span>
  </section>
</template>


<script>
import {mapMutations} from 'vuex'

let Timer = null

export default {
  data() {
    return {
      telStatus: false,
      codeText: '获取验证码',
      codeStatus: true,
      loginType: 'pass', //pass code
      passStatus: false,
      ctelStatus: false,
      pass: "",
      scode: "",
      tel: "",
      errorData: {
        tel: '',
        pass: '',
        scode: '',
      },
      redirect_url: this.$route.query.redirect_url
    };
  },
  components: {},
  methods: {
    ...mapMutations(['setUserInfo','setHeaderTag']),
    changeType(_type,tag) {
      this.tel = ''
      this.telStatus = false
      this.loginType = _type

      if (tag) {
        clearInterval(Timer)
        this.codeText = '获取验证码'
        this.pass = ''
        this.passStatus = false
      } else {
        this.codeStatus = ''
        this.scode = ''
      }
    },
    // 校验手机号格式
    checkPhone() {
      if (this.tel.length == 11) {
        if(!(/^1[3456789]\d{9}$/.test(this.tel))){  // 校验手机号格式
          this.errorData.tel = '手机号码格式错误'
          this.telStatus = false
        } else {
          // 校验手机号是否注册过
          this.$post(LOGIN_API+'checkphone',
          {
            phone: this.tel
          })
          .then( res => {
            // handle success
            if( res.errno * 1 === 101) {
              this.errorData.tel = '手机号未注册，请先注册'
              this.telStatus = false
            } else if(res.errno * 1 === 1){
              //已经注册过
              this.errorData.tel = ''
              this.telStatus = true
            } else {
              this.$store.commit("showDialog", res.errmsg)
              this.telStatus = false
            }
          })
          .catch( err => {
            console.log(err);
            // handle error
            this.$store.commit("showDialog")
            this.telStatus = false
          })
        } 
      } else {
        return false
      }
    },
    // 校验密码
    checkPass() {
      if(this.pass.length >= 6) {
        this.passStatus = true
      } else {
        return false
      }
    },
    // 手机号密码登录
    loginByPass() {
      if(this.passStatus && this.telStatus) {
        this.$post(LOGIN_API+'newLogin',
          {
            tel: this.tel,
            pass: this.pass
          })
          .then( res => {
            // handle success
            if( res.errno * 1 === 101) {
              this.setInfo(res)
            } else {
              this.$store.commit("showDialog", res.errmsg)
            }
          })
          .catch( err => {
            console.log(err);
            this.$store.commit("showDialog")
          })
      } else {
        return false
      }
    },
    // 发送短信验证码
    sendCode() {
      if (this.telStatus) {
        this.$post(LOGIN_API+'sedsms',
        {
          phone: this.tel
        })
        .then( res => {
          // handle success
          if( res.errno * 1 === 101) {
            this.RequestId = res.RequestId
            this.countdown()
          } else {
            this.$store.commit("showDialog", res.errmsg)
          }
        })
        .catch( err => {
          console.log(err);
          // handle error
          this.$store.commit("showDialog")
        })
      } else {
        return false
      }
    },
    // 倒计时
    countdown() {
      let num = 6;
      Timer = setInterval(() => {
        num-- 
        if (num == 0) {
          clearInterval(Timer)
          this.codeText = '获取验证码'
          this.codeStatus = true
        } else {
          this.codeText = `获取验证码 ${num}`
          this.codeStatus = false
        }
      }, 1000)
    },
    // 校验短信验证码
    checkVertify() {
      if (this.scode.length === 4) {
        // 校验短信码是否正确
        this.$post(LOGIN_API+'checksmscode',
          {
            RequestId: this.RequestId,
            scode: this.scode
          })
          .then( res => {
            // handle success
            if( res.errno * 1 === 101) {
              this.errorData.scode = ''
              this.codeStatus = true
            } else if (res.errno * 1 === 1) {
              this.errorData.scode = '验证码错误，请重新输入'
              this.codeStatus = false
            } else {
              this.codeStatus = false
              this.$store.commit("showDialog", res.errmsg)
            }
          })
          .catch( err => {
            console.log(err);
            this.codeStatus = false

            // handle error
            this.$store.commit("showDialog")
          })
      } else {
        return false
      }
    },
    // 手机号验证码登录
    loginByCode() {
      if(this.codeStatus && this.telStatus) {
        this.$post(LOGIN_API+'newsmsLogin',
          {
            tel: this.tel
          })
          .then( res => {
            // handle success
            if( res.errno * 1 === 101) {
              this.setInfo(res)
            } else {
              this.$store.commit("showDialog", res.errmsg)
            }
          })
          .catch( err => {
            console.log(err);
            this.$store.commit("showDialog")
          })
      } else {
        return false
      }
    },
    // 登录成功处理
    setInfo(res) {
      localStorage.setItem('token', res.userInfor.token)
      localStorage.setItem('tokenId', res.userInfor._id)
      this.setUserInfo(res.userInfor)
      this.setHeaderTag(1)

      if (this.redirect_url && this.redirect_url.length>0) {
        this.$router.push(this.redirect_url);
      } else {
        this.$router.push({ path: "/home" });
      }
    },
    //跳转到注册页面
    create() {
      this.$router.push({ path: "/register" });
    },
    login() {
      if (!this.status) return
      let url = LOGIN_API + 'login';
      this.$post(url,
      {
        email:this.email,
        pass:this.pass,
        token: localStorage.getItem('token')//去localstorage取
      }, {
        headers: {
          //去localstorage取
          token: localStorage.getItem('token'), 
        }
      })
      .then( res => {
        // handle success
        if( res.errno * 1 === 0) {
          //登陆失败
          this.$store.commit("showDialog", res.errmsg)
        } else if(res.errno * 1 === 1){
          //已经登录
          this.$store.commit("showDialog", res.errmsg)
        }else if(res.errno * 1 === 101){
          //登陆成功 token tokenid存到local storage userinfo全部信息存到vuex
          
          localStorage.setItem('token', res.userInfor.token)
          localStorage.setItem('tokenId', res.userInfor._id)

          // localStorage.setItem('userinfo', JSON.stringify(res.userinfor))

          this.setUserInfo(res.userInfor)
          this.setHeaderTag(1)
          
          if (this.redirect_url && this.redirect_url.length>0) {
            this.$router.push(this.redirect_url);
          } else {
            this.$router.push({ path: "/home" });
          }
        } else {
          this.$store.commit("showDialog", res.errmsg)
        }
      })
      .catch( err => {
        console.log(err);
        // handle error
        this.$store.commit("showDialog")
      })
    },
    // 跳转到忘记密码页面
    goForgot() {
      this.$router.push({
        name: 'forgot'
      })
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '@/assets/css/base.scss';
  .login-form{
    .login-form-logo{
      display: block;
      margin:0 auto;
    }
    .login-form-wrapper{
      width: 60%;
      min-width: 192px;
      margin: 10px auto 0;
      position: relative;
      
      input {
        display: block;
        width: 100%;
        height: 40px;
        padding: 8px 16px;
        border-radius: 2px;
        background: #f2f2f2;
        font-size: 14px;
        line-height: 24px;
        font-weight: 400;
        color: #555;
        border: none;
        box-sizing: border-box; //其他浏览器
        -webkit-box-sizing: border-box; //谷歌
        -moz-box-sizing: border-box; //火狐
      }
      .login-form-getcode{
        display: inline-block;
        height: 40px;
        padding: 0 20px;
        font-size: 14px;
        line-height: 40px;
        color: #aaa;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
      }
      .send{
        color: #f96816
      }
      .default{
        color: #aaa;
      }
    }
    .login-form-error{
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #f20d0d;
    }
    .login-form-btn{
      display: block;
      width: 100%;
      height: 40px;
      margin:0 auto;
      font-size: 14px;
      line-height: 40px;
      font-weight: 600;
      text-align: center;
      border-radius: 2px;
      color: #fff;
      cursor: pointer;
    }
    .active {
      background: #f96816;
    }
    .none{
      background: #aaa;
    }
    .login-form-other{
      font-size: 14px;
      text-align: center;
      color: $orangeColor;
      cursor: pointer;

      &:hover{
        color: $orangeColorHover;
      }
    }
    .login-form-code{
      float: left;
      width: 50%;
      font-size: 14px;
      text-align: center;
      color: $orangeColor;
      cursor: pointer;

      &:hover{
        color: $orangeColorHover;
      }
    }
    .login-form-forgot{
      float: left;
      width: 50%;
      font-size: 14px;
      color: #fff;
      text-align: center;
      cursor: pointer;

      &:hover{
        color: #f96816;
        text-decoration: underline;
      }
    }
    .line {
      width: 50%;
      margin: 20px auto;
      text-align: center;
      position: relative;

      &:after{
        content: '';
        display: block;
        width: 100%;
        border-top: 1px solid #aaa;
        position: absolute;
        top: 50%;
        left: 0;
      }
      &:before{
        content: 'OR';
        padding: 0 10px;
        display: inline-block;
        color: #fff;
        background: #181818;
        position: relative;
        z-index: 2;

      }
    }
    .login-form-reg {
      display: block;
      width: 47%;
      height: 40px;
      min-width: 192px;
      margin:0 auto;
      border-radius: 2px;
      text-align: center;
      font-size: 14px;
      line-height: 40px;
      font-weight: 400;
      color: #fff;
      border: #fff solid 1px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover{
        color: #f96816;
        border: #f96816 solid 1px;
      }
    }
  }
</style>