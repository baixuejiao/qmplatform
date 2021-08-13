<!-- 忘记密码页面 -->
<template>
  <div id="forgot">
    <div id="forgot-content">
      <Forgot-form/>
    </div>
    <div id="forgot-bg">
      <p id="slogn">Let's create the future together.</p>
    </div>
  </div>
</template>

<script>
import ForgotForm from '@/components/ForgotForm.vue'
export default {
  data () {
    return {
    }
  },
  name: 'login',
  components: {
    ForgotForm
  }
}
</script>

<style lang="scss" scoped>
#forgot{
  display: flex;

  #forgot-content{
    width: 40%;
    background: rgb(24,24,24);
    float: left;
    height:100vh;
  }
  #forgot-bg{
    flex:1;
    // width: 60%;
    background:url("../../assets/imgs/login/login-bg.jpg");
    background-size: cover;
    position: relative;

    #slogn{
      color:#fff;
      width: 100%;
      font-size: 48px;
      margin-bottom: 24px;
      font-family: Gotham SSm A,Gotham SSm B,sans-serif;
      font-weight: 400;
      text-align: center;
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    } 
  }
}

@media screen and (max-width:1364px){
  #forgot{
    width: 100%;
  }
  #forgot-content{
    width: 50%;
  }
  #forgot-bg{
    width: 50%;
  }
}
@media screen and (max-width: 768px) {
  #forgot-content{
    width: 100%;
  }
  #forgot-bg{
    display: none;
  }
}
</style>
