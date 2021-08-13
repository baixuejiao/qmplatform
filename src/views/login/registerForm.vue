  <!--注册页面的左边表单部分 logo 用户名 密码 确认密码 电话 注册-->
<template>
  <div class="form">
  <!-- <form class="form" onsubmit="return checkForm()"> -->
    <img src="@/assets/imgs/logo.png">
    <div class="text">用户名</div>
    <input type="text" v-model="name" id="uname" @input="checkAll()">
    <div class="text">邮箱</div>
    <input type="text" v-model="email" id="uname" @input="checkAll()" @blur="checkEmail">
    <div class="text">密码</div>
    <input type="password" v-model="pass" id="pass"  @input="checkAll()">
    <div class="text" >确认密码</div>
    <input type="password" v-model="cpass" id="cpass" @input="checkAll()" @blur="checkCPass()">
    <div class="text" >手机号</div>
    <input type="tel" v-model="tel" id="tel" maxlength="11" @input="checkAll()" @blur="checkPhone()">
    <button :class="[allTag ? 'sub' : 'subnone']" @click="reg">注 &nbsp;&nbsp;册</button>
  </div>
</template>


<script>

export default {
  data() {
    return {
      allTag: false,
      name:"",
      email: "",
      pass:"",
      cpass: '',
      tel:""
    }
  },
  components: {

  },
  methods: {
    checkAll() {
      if (this.name && this.email && this.pass && this.cpass && this.tel) {
        this.allTag = true
      } else {
        this.allTag = false
      }
    },
    checkEmail() {
      var reg=new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
      if(!(reg.test(this.email))){ 
        this.$store.commit("showDialog", '邮箱格式错误')
        return false; 
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
    checkCPass() {
      /**校验确认密码*/ 
      if(this.cpass !== this.pass){  
        this.$store.commit("showDialog", '两次密码输入不一致!')
        return false;   
      }  
    },
    checkPhone(){
      /*校验电话*/ 
      if(!(/^1[3456789]\d{9}$/.test(this.tel))){ 
        this.$store.commit("showDialog", '手机号格式错误')
        return false; 
      }    
    }  
  }

    
}
</script>
<style lang="scss" scoped>
img{
  display: block;
  margin:0 auto;
}
input{
  display: block;
  margin: 0 auto;
  position: relative;
  padding:8px 16px;
  height: 40px;
  min-width: 192px;
  width: 60%;
  border-radius: 2px;
  background: #f2f2f2;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  color: #555;
  border: none;
  margin-bottom:24px;
  box-sizing: border-box;//其他浏览器
  -webkit-box-sizing: border-box;//谷歌
 -moz-box-sizing: border-box;//火狐
}
.sub{
  height: 40px;
  min-width: 192px;
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
  margin-bottom: 48px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  outline: none;

}
.subnone{
  height: 40px;
  min-width: 192px;
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
  background: #aaa;
  margin-bottom: 48px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  outline: none;
}

.text{
  text-align: left;
  color:#f2f2f2;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  padding-bottom: 8px;
  font-family: Gotham SSm A,Gotham SSm B,sans-serif;
  margin-left: 20%;
}


</style>