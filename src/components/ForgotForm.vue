<template>
  <div class="forgot-form">

    <img class="forgot-form-logo" src="@/assets/imgs/logo.png">
    <div class="forgot-form-step1" v-if="step=='step1'">
      <div class="forgot-form-wrapper">
        <p class="forgot-form-title">{{text}}</p>
      </div>
      <div class="forgot-form-wrapper">
        <input type="tel" placeholder="请输入注册手机号" v-model="tel" maxlength="11" @blur="checkPhone()">
        <p class="forgot-form-error">{{errorData.tel}}</p>
      </div>
      <div class="forgot-form-wrapper">
        <input type="text" placeholder="请输入图片验证码" maxlength="4" v-model="vercode" @input="checkImgCode()">
        <span class="forgot-form-img" @click="getImgCode" v-html="imgCode"></span>
        <p class="forgot-form-error">{{errorData.vercode || ''}}</p>
      </div>
      <div class="forgot-form-wrapper">
        <span :class="['forgot-form-btn',imgCodeStatus && telStatus ? 'active' : 'none']" @click="regCode">下一步</span>
        <p class="forgot-form-error">{{errorData.code || ''}}</p>
      </div>
    </div>
    <div class="forgot-form-step2" v-if="step=='step2'">
      <div class="forgot-form-wrapper">
        <p class="forgot-form-title">{{text}}</p>
      </div>
      <div class="forgot-form-wrapper">
        <p class="forgot-form-tips">短信验证码已发送至 {{this.tel}}</p>
      </div>
      <div class="forgot-form-wrapper">
        <div class="forgot-form-content">
          <input type="tel" placeholder="请输入短信验证码" v-model="scode" maxlength="4" @blur="checkVertify()">
          <span :class="['forgot-form-again', sendTag ? 'send': 'default']" @click="resendCode">{{sendText}}</span>
        </div>
        <p class="forgot-form-error">{{ errorData.scode || '' }}</p>
      </div>
      <div class="forgot-form-wrapper">
        <input type="password" placeholder="6-16位密码,区分大小写,不能用空格" v-model="pass" id="tel" maxlength="16" @input="checkPass()">
        <p class="forgot-form-error">{{ errorData.pass || '' }}</p>
      </div>
      <div class="forgot-form-wrapper">
        <span :class="['forgot-form-btn',passStatus && vertifyStatus ? 'active' : 'none']" @click="resetPass()">完成</span>
      </div>
      <div class="forgot-form-wrapper">
        <p class="forgot-form-back" @click="changeStep('step1',true)">返回修改手机号</p>
      </div>
    </div>

    <div class="forgot-form-step3" v-if="step=='step3'">
      <p class="forgot-form-success">密码重设成功</p>
      <p class="forgot-form-success">请谨慎保管和记忆你的密码，以免泄漏和丢失</p>
      <span class="forgot-form-study" @click="goLogin()">去登录</span>
    </div>
  </div>
</template>


<script>

let Timer = null

export default {
  data() {
    return {
      tag: this.$route.query.tag,
      sendTag: false,
      sendText: "重新发送",
      tel:"",
      vercode: '',
      scode: '',
      pass:"",
      step: 'step1',
      errorData: {
        tel: ''
      },
      imgCode: '', //图形验证码
      telStatus: false,
      imgCodeStatus: false,
      passStatus: false,
      vertifyStatus: false,
      sess: '',
      RequestId: '',
      imgTag: false
    }
  },
  computed: {
    text() {
      if (this.tag == 'change') {
        return '修改密码'
      } else {
        return '找回密码'
      }
    }
  },
  methods: {
    changeStep(_step,tag) {
      this.step = _step
      // 返回第一步
      if (tag) {
        // 清除定时器
        clearInterval(Timer)
        this.sendText = "重新发送"

        // 重置页面内容
        this.tel = '';
        this.telStatus = false
        this.imgCodeStatus = false
        this.vercode = ''
        this.getImgCode()
      }
    },
    // 获取图片验证码
    getImgCode() {
      this.$get(LOGIN_API+'get_img_verify')
      .then( res => {
        if( res.errno * 1 === 101) {
          this.imgCode = res.result
          this.sess = res.sess_id
        } else {
          this.$store.commit("showDialog", res.errmsg)
        }
      })
      .catch( err => {
        console.log(err);
        this.$store.commit("showDialog")
      })
    },
    // 检验图片验证码
    checkImgCode() {
      if (this.vercode.length == 4) {
        
        // if (this.imgTag == false) return
        // 校验图片验证码是否正确
        this.$post(LOGIN_API+'send_verification_code',
        {
          vercode: this.vercode,
          sess: this.sess
        })
        .then( res => {
          // handle success
          if( res.errno * 1 === 101) {
            this.errorData.vercode = ''
            this.imgCodeStatus = true
          } else if(res.errno * 1 === 1){
            //图片验证码错误
            this.errorData.vercode = '图片验证码错误'
            this.imgCodeStatus = false
            this.getImgCode()
          } else {
            this.$store.commit("showDialog", res.errmsg)
            this.imgCodeStatus = false
            this.getImgCode()
          }
        })
        .catch( err => {
          console.log(err);
          this.getImgCode()
          this.$store.commit("showDialog")
          this.imgCodeStatus = false
        })
      } else {
        return false
      }
    },
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
              this.errorData.tel = '手机号未注册过，请先注册'
              this.telStatus = false
            } else if(res.errno * 1 === 1){
              //已经注册过
              this.errorData.tel = ''
              this.telStatus = true              
            } else {
              this.telStatus = false
              this.$store.commit("showDialog", res.errmsg)
            }
          })
          .catch( err => {
            console.log(err);
            // handle error
            this.telStatus = false
            this.$store.commit("showDialog")
          })
        } 
      } else {
        return false
      }
    },
    // 发送短信验证码
    regCode() {
      if (this.telStatus && this.imgCodeStatus) {
        // 发送验证码
        this.$post(LOGIN_API+'sedsms',
          {
            phone: this.tel
          })
          .then( res => {
            // handle success
            if( res.errno * 1 === 101) {
              this.RequestId = res.RequestId
              this.changeStep('step2')
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
    // 重新发送验证码
    resendCode() {
      if (this.sendTag) {
        this.regCode()
      } else {
        return false
      }
    },
    // 倒计时
    countdown() {
      let num = 60;
      Timer = setInterval(() => {
        num--;
        if (num == 0) {
          clearInterval(Timer)
          this.sendText = '重新发送'
          this.sendTag = true
        } else if (num >0) {
          this.sendText = `重新发送 ${num}`
          this.sendTag = false
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
              this.vertifyStatus = true
            } else if (res.errno * 1 === 1) {
              this.errorData.scode = '验证码错误，请重新输入'
              this.vertifyStatus = false
            } else {
              this.vertifyStatus = false
              this.$store.commit("showDialog", res.errmsg)
            }
          })
          .catch( err => {
            console.log(err);
            this.vertifyStatus = false

            // handle error
            this.$store.commit("showDialog")
          })
      } else {
        return false
      }
    },
    // 校验密码
    checkPass() {
      if (this.pass && this.pass.length >= 6 && this.pass.length <= 16) {
        this.passStatus = true
      } else {
        // this.errorData.pass = '密码格式错误'
        this.passStatus = false;
      }
    },
    // 重置密码
    resetPass() {
      // 重置密码
      this.$post(LOGIN_API+'newsmsLogin',
        {
          tel: this.tel,
          scode: this.scode
        })
        .then( res => {
          // handle success
          if( res.errno * 1 === 101) {
            this.changeStep('step3')
          }else {
            this.$store.commit("showDialog", res.errmsg)
          }
        })
        .catch( err => {
          console.log(err);
          this.$store.commit("showDialog")
        })
    },
    goLogin() {
      this.$router.push({
        name: 'login'
      })
    },
  },
  created() {
    this.getImgCode()
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/base.scss';
.forgot-form{
  .forgot-form-logo{
    display: block;
    width: 140px;
    margin:0 auto;
  }
  .forgot-form-wrapper{
    width: 60%;
    min-width: 192px;
    margin: 10px auto 0;
    position: relative;

    .forgot-form-title{
      font-size: 18px;
      text-align: left;
      color: #fff;
    }
    .forgot-form-img{
      display: block;
      width: 80px;
      height: 40px;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }
  .forgot-form-content{
    width: 100%;
    height: 40px;
    position: relative;

    .forgot-form-again{
      display: inline-block;
      height: 40px;
      padding: 0 20px;
      font-size: 14px;
      line-height: 40px;
      text-align: center;
      border-radius: 2px;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
    }
    .send{
      color: #f96816
    }
    .default{
      color: #aaa;
    }
  }
  .forgot-form-error{
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #f20d0d;
  }
  .forgot-form-tips{
    font-size: 14px;
    text-align: left;
    color: #fff;
  }
  .forgot-form-back{
    font-size: 12px;
    text-align: center;
    color: $orangeColor;
    cursor: pointer;

    &:hover{
      color: $orangeColorHover;
    }
  }
  input{
    display: block;
    width: 100%;
    height: 40px;
    padding:8px 16px;
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    border: none;
    border-radius: 2px;
    box-sizing: border-box;//其他浏览器
    color: #555;
    background: #f2f2f2;
  }
  .forgot-form-btn{
    display: block;
    width: 100%;
    height: 40px;
    min-width: 192px;
    margin: 10px auto 0;
    font-size: 14px;
    line-height: 40px;
    font-weight: 600;
    text-align: center;
    border-radius: 2px;
    color: #fff;
    cursor: pointer;
  }
  .active{
    background: #f96816;

    &:hover{
      background: #ff7b2b;
    }
  }
  .none{
    background: #aaa;
  }
  .forgot-form-success{
    margin: 30px auto;
    font-size: 18px;
    text-align: center;
    color: #fff;
  }
  .forgot-form-study{
    display: block;
    width: 120px;
    height: 40px;
    margin: 0 auto 0;
    font-size: 14px;
    line-height: 40px;
    font-weight: 600;
    text-align: center;
    border-radius: 2px;
    color: #fff;
    background: #e80a89;
    cursor: pointer;

    &:hover{
      background: linear-gradient(to right, rgb(240, 90, 40), rgb(232, 10, 137));
    }
  }
  .forgot-form-complete{
    margin: 20px auto 0; 
    font-size: 14px;
    text-align: center;
    color: $orangeColor;
    cursor: pointer;

    &:hover{
      color: $orangeColorHover;
    }
  }
}


</style>