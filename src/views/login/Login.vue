<!--登录页面 左半部分表单调用loginForm组件 右边文字调用loginRight组件-->
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
import Form from './components/LoginForm.vue'
import Right from './components/commonRight'
export default {
  data () {
    return {
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

.btn{
  min-width: 192px;
  height: 40px;
  position: relative;
  width: 60%;
  padding: 4px 16px;
  border: 0;
  border-radius: 2px;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  text-align: center;
  color: #fff;
  background: #f96816;
  margin-bottom: 48px

}


</style>
