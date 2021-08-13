<!--注册页面 左边表单调用registerForm组件 右边调用loginRight组件-->
<template>
  <div id="content">
    <div id="left">
      <Form></Form>
    </div>
    <div id="right">
      <Right></Right>
    </div>
  </div>
</template>

<script>
import Form from './components/RegForm.vue'
import Right from './components/commonRight.vue'
export default {
  data () {
    return {
      msg: "Let's create the future together."
    }
  },
  name: 'login',
  components: {
   Form,
   Right
  }
}
</script>

<style lang="scss" scoped>
#nav{
  display: none
}
#content{
  display:flex;
}
#left{
  width: 40%;
  background: rgb(24,24,24);
  float: left;
  height:100vh;
}
#right{
  flex:1;
  background:url("../../assets/imgs/login/login-bg.jpg");
  background-size: cover
}

@media screen and (max-width:1364px){
  #content{
    width: 100%;
  }
  #left{
    width: 50%;
  }
  #right{
    width: 50%;
  }
}
@media screen and (max-width: 768px) {
  #left{
    width: 100%;
  }
  #right{
    display: none;
  }
}
</style>
