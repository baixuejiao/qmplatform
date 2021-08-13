<!--忘记密码页面-->
<template>
  <div id="container">
    <img src="@/assets/imgs/logo.png">
    <h1>Forgot Password</h1>
    <div class="msg">输入您的电子邮件地址，我们将向您发送一个链接以重置您的密码。</div>
    <div class="msg">邮箱</div>
    <input id="Email" type="email">
    <a href="./login" >取消</a>
    <button type="submit" class="send">发送</button>
  </div>
</template>

<script>

export default {
  name: 'forgot',
  components: {
   
  }
}
</script>

<style lang="scss" scoped>
#nav{
  display: none
}
html{
  background: rgb(24, 24, 24);
}
#container{
  margin:80px auto;
  width: 380px;
  color:white;
}

h1{
  font-family: Gotham SSm A,Gotham SSm B,sans-serif;
  font-weight: 300;
  font-size: 2.25rem;
  line-height: 1.4;
  font-style: normal;
  text-align: center;
  margin-top: .2rem;
  margin-bottom: .5rem;

}
input{
  display: block;
  border: #f2f2f2 solid 1px;
  position: relative;
  padding:8px 16px;
  height: 40px;
  min-width: 192px;
  width: 280px;
  margin:0 auto;
  border-radius: 2px;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  margin-bottom:24px;
  box-sizing: border-box;//其他浏览器
  -webkit-box-sizing: border-box;//谷歌
 -moz-box-sizing: border-box;//火狐
}
input:focus{
  border: #127fc9 solid 2px;
}
.msg{
  font-weight: 100;
  font-size: .75rem;
  margin-bottom: 1.25rem;
  line-height: 1.6;
  margin-top:10px;
  text-align: left;
  margin-left: 50px;
  width: 280px;
  letter-spacing:1px;
}
.send{
  height:40px;
  width: 140px;
  display: inline;
  border-radius: 2px;
  font-size: 14px;
  min-width: 130px;
  border: 1px solid transparent;
  cursor: pointer;
  font-family: Gotham SSm A,Gotham SSm B,sans-serif;
  font-weight: 400;
  line-height: normal;
  position: relative;
  text-decoration: none;
  text-align: center;
  background-color: #f96816;
  border: 0 solid #ff7b39;
  color: #fff;
  transition: background-color .3s ease-out;
  top:2px;
  left:5px;
}
a{
  color:#fff;
  width: 140px;
  border: 1px solid #ccc;
  background-color: transparent;
  border-radius: 2px;
  font-size: 14px;
  height: 40px;
  padding: 9px 47px;
  cursor: pointer;
  font-family: Gotham SSm A,Gotham SSm B,sans-serif;
  font-weight: 400;
  line-height: normal;
  position: relative;
  right:5px;
  text-align: center;
  transition: all .3s;

}
a:hover {
  border: #127fc9 solid 1px;
  background: rgba(255,255,255,0.1);
}
.send:hover {
  border: #127fc9 solid 1px;
  opacity: 0.9;
}

#Email {
    background-color: transparent;
    border-color: #363636;
    color: #aaa;
}
</style>
