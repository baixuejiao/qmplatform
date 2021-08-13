  <!--注册页面的左边表单部分 logo 用户名 密码 确认密码 电话 注册-->
<template>
  <div class="reg-form">
  <!-- <form class="form" onsubmit="return checkForm()"> -->
    <img class="reg-form-logo" src="@/assets/imgs/logo.png">
    <div class="reg-form-step1" v-if="step=='step1'">
      <div class="reg-form-wrapper">
        <input type="tel" placeholder="请输入注册手机号" v-model="tel" maxlength="11" @blur="checkPhone()">
        <p class="reg-form-error">{{errorData.tel}}</p>
      </div>
      <div class="reg-form-wrapper">
        <input type="text" placeholder="请输入图片验证码" maxlength="4" v-model="vercode" @input="checkImgCode()">
        <span class="reg-form-img" @click="getImgCode" v-html="imgCode"></span>
        <p class="reg-form-error">{{errorData.vercode || ''}}</p>
      </div>
      <div class="reg-form-wrapper">
        <span :class="['reg-form-btn',imgCodeStatus && telStatus ? 'active' : 'none']" @click="regCodeSms">注册</span>
      </div>
    </div>
    <div class="reg-form-step2" v-if="step=='step2'">
      <div class="reg-form-wrapper">
        <p class="reg-form-tips">填写短信验证码密码完成注册</p>
        <p class="reg-form-tips">短信验证码已发送至 {{this.tel}}</p>
      </div>
      <div class="reg-form-wrapper">
        <div class="reg-form-content">
          <input type="tel" placeholder="请输入短信验证码" v-model="scode" maxlength="4" @blur="checkVertify()">
          <span :class="['reg-form-again', sendTag ? 'send': 'default']" @click="resendCode">{{sendText}}</span>
        </div>
        <p class="reg-form-error">{{ errorData.scode || '' }}</p>
      </div>
      <div class="reg-form-wrapper">
        <input type="password" placeholder="6-16位密码,区分大小写,不能用空格" v-model="pass" id="tel" maxlength="16" @input="checkPass()">
        <p class="reg-form-error">{{ errorData.pass || '' }}</p>
      </div>
      <div class="reg-form-wrapper">
        <span :class="['reg-form-btn',passStatus && vertifyStatus ? 'active' : 'none']" @click="subInfo()">完成</span>
      </div>
      <div class="reg-form-wrapper">
        <p class="reg-form-back" @click="changeStep('step1', true)">返回修改手机号</p>
      </div>
    </div>

    <div class="reg-form-step3" v-if="step=='step3'">
      <p class="reg-form-success">恭喜您注册成功</p>
      <span class="reg-form-study" @click="goHome()">去学习</span>
      <!-- <p class="reg-form-complete" @click="goPersonal">完善资料</p> -->
    </div>
  </div>
</template>


<script>
import {mapMutations} from 'vuex'

let Timer = null

export default {
  data() {
    return {
      sendTag: false,
      sendText: "重新发送",
      tel:"",
      vercode: '',
      scode: '',
      pass:"",
      step: 'step1',
      errorData: {
        tel: '',
        vercode: '',
        scode: '',
        pass: ''
      },
      imgCode: '', //图形验证码
      telStatus: false,
      imgCodeStatus: false,
      passStatus: false,
      vertifyStatus: false,
      sess: '',
      RequestId: ''
    }
  },
  components: {

  },
  methods: {
    ...mapMutations(['setUserInfo','setHeaderTag']),
    changeStep(_step, tag) {
      this.step = _step
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
        console.log(res)
        // handle success
        if( res.errno * 1 === 101) {
          this.imgCode = res.result
          this.sess = res.sess_id
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
    // 检验图片验证码
    checkImgCode() {
      if (this.vercode.length == 4) {
        this.imgCodeStatus = true

        // 校验图片验证码是否正确
        // this.$post(LOGIN_API+'send_verification_code',
        // {
        //   vercode: this.vercode,
        //   sess: this.sess
        // })
        // .then( res => {
        //   // handle success
        //   if( res.errno * 1 === 101) {
        //     this.errorData.vercode = ''
        //     this.imgCodeStatus = true
        //   } else if(res.errno * 1 === 1){
        //     //已经注册过
        //     this.errorData.vercode = '图片验证码错误'
        //     this.imgCodeStatus = false
        //     this.getImgCode()
        //   } else {
        //     this.$store.commit("showDialog", res.errmsg)
        //     this.imgCodeStatus = false
        //     this.getImgCode()
        //   }
        // })
        // .catch( err => {
        //   console.log(err);
        //   // handle error
        //   this.$store.commit("showDialog")
        //   this.imgCodeStatus = false
        //   this.getImgCode()
        // })
      } else {
        this.imgCodeStatus = false
        // return false
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
              this.errorData.tel = ''
              this.telStatus = true
            } else if(res.errno * 1 === 1){
              //已经注册过
              this.errorData.tel = '手机号已经注册过'
              this.telStatus = false
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
    regCodeSms() {
      if (this.telStatus && this.imgCodeStatus) {
        // 发送验证码
        this.$post(LOGIN_API+'send_verification_sms_code',
          {
            tel: this.tel,
            vercode: this.vercode,
            sess: this.sess
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
        this.errorData.pass = ''
        this.passStatus = true
      } else {
        // this.errorData.pass = '密码格式错误'
        this.passStatus = false;
      }
    },
    // 完成注册
    subInfo() {
      if (this.vertifyStatus && this.passStatus) {
        this.$post(LOGIN_API+'newReg',
          {
            tel: this.tel,
            pass: this.pass
          })
          .then( res => {
            // handle success
            if( res.errno * 1 === 101) {
              localStorage.setItem('token', res.userInfor.token)
              localStorage.setItem('tokenId', res.userInfor._id)
              this.setUserInfo(res.userInfor)
              this.setHeaderTag(1)
              this.changeStep('step3')
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
    //跳转到登录页面
    reg(){
      if (!this.allTag) return 
      let url = LOGIN_API+'reg'
      this.$post(url,
      {
        "name":this.name,
        "pass":this.pass,
        "tel":this.tel,
        "email": this.email
      })
      .then( res => {
        // handle success
        if( res.errno * 1 === 0) {
          //注册失败
          this.$store.commit("showDialog", res.errmsg)
        } else if(res.errno * 1 === 1){
          //已经存在
          this.$store.commit("showDialog", res.errmsg)
        }else if(res.errno * 1 === 101){
          //注册成功
          this.$router.push({ path: "/login" });
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
    goHome() {
      this.$router.push({
        name: 'login_home'
      })
    },
    goPersonal() {
      this.$router.push({
        name: 'personal'
      })
    }
  },
  created() {
    this.getImgCode()
  }
    
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/base.scss';
.reg-form{
  .reg-form-logo{
    display: block;
    margin:0 auto;
  }
  .reg-form-wrapper{
    width: 60%;
    min-width: 192px;
    margin: 10px auto 0;
    position: relative;

    .reg-form-img{
      display: block;
      width: 80px;
      height: 40px;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }
  .reg-form-content{
    width: 100%;
    height: 40px;
    position: relative;

    .reg-form-again{
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
  .reg-form-error{
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #f20d0d;
  }
  .reg-form-tips{
    font-size: 14px;
    text-align: center;
    color: #fff;
  }
  .reg-form-back{
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
  .reg-form-btn{
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
  .reg-form-success{
    margin: 30px auto;
    font-size: 18px;
    text-align: center;
    color: #fff;
  }
  .reg-form-study{
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
  .reg-form-complete{
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