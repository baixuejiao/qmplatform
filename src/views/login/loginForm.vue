  <!--页面功能：登录页面的左边表单部分 logo 用户名 密码 登陆按钮 注册-->
<template>
  <section class="form">
    <img src="@/assets/imgs/logo.png" />
    <div class="text" >邮箱</div>
    <input type="text" @input="checkAll" v-model="email" placeholder="请输入登录邮箱" />
    <div class="text">密码</div>
    <input type="password" @input="checkAll" v-model="pass" placeholder="请输入登录密码"/>
    <button :class="[status ? 'sub' : 'subnone']" @click="login">登 &nbsp;&nbsp;录</button>
    <!-- <a :href="'./forgot'" target="_blank" >忘记密码?</a> -->
    <div class="or">
      <hr class="bar" />
      <span>OR</span>
      <hr class="bar" />
    </div>
    <button class="reg" @click="create">创建一个新账户</button>
  </section>
</template>


<script>
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      status: false,
      email: "",
      pass: "",
      redirect_url: this.$route.query.redirect_url
    };
  },
  components: {},
  methods: {
    ...mapMutations(['setUserInfo','setHeaderTag']),
    checkAll() {
      if (this.email && this.pass) {
        this.status = true
      } else {
        this.status = false
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
    }
  }
};
</script>
<style lang="scss" scoped>
img{
  display: block;
  margin:0 auto;
}
input {
  display: block;
  margin:0 auto;
  position: relative;
  padding: 8px 16px;
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
  margin-bottom: 24px;
  box-sizing: border-box; //其他浏览器
  -webkit-box-sizing: border-box; //谷歌
  -moz-box-sizing: border-box; //火狐
}
.sub {
  display: block;
  margin:0 auto;
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
}
.subnone{
  display: block;
  margin:0 auto;
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
}
.text {
  margin-left:20%;
  color: #f2f2f2;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  padding-bottom: 8px;
  font-family: Gotham SSm A, Gotham SSm B, sans-serif;
}
a {
  width: 200px;
  color: #fff;
  text-align: center;
  display: block;
  margin: 0 auto;
}
a:hover {
  color: #f96816;
  text-decoration: underline;
}

.or {
  position: relative;
  margin: 20px auto;
  margin-bottom: 24px;
  width: 50%;
  display: flex;
  box-sizing: inherit;
  color: #ccc;
}
hr {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}
.bar {
  flex: auto;
  border: none;
  height: 1px;
  background-color: #aaa;
  margin: 10px;
}
.reg {
  height: 40px;
  min-width: 192px;
  position: relative;
  width: 47%;
  padding: 4px 16px;
  border-radius: 2px;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  text-align: center;
  color: #fff;
  border: #fff solid 1px;
  margin-bottom: 48px;
  cursor: pointer;
  transition: all 0.3s;
  display: block;
  margin:0 auto;
}
.reg:hover {
  color: #f96816;
  border: #f96816 solid 1px;
}
</style>