<!--登录页面的左半部分-->
<template>
<div>
  <p id="slogn">{{msg}}</p>
  <!-- <button>Start a FREE 10-day trial</button> -->
</div>
  
</template>

<script>

export default {
  data () {
    return {
      msg: "Let's create the future together."
    }
  },
  name: 'loginRight',
  components: {
   
  }
}
</script>

<style lang="scss" scoped>
div{
  width: 100%;
  height: 100%;
  position: relative;
}
#nav{
  display: none
}
#slogn{
  // margin-top: 50px;
  color:#fff;
  width: 100%;
  font-size: 48px;
  margin-bottom: 24px;
  font-family: Gotham SSm A,Gotham SSm B,sans-serif;
  font-weight: 400;
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
} 

button{
  height: 40px;
  min-width: 192px;
  position: relative;
  width: 30%;
  padding: 4px 16px;
  border: 0;
  border-radius: 2px;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  text-align: center;
  color: #fff;
  border:#fff solid 1px;
  margin-bottom: 48px;
  cursor: pointer;
  transition: all .3s;
  display: block;
  margin:0 auto;
}
button:hover{
  color: #f96816;
  border:#f96816 solid 1px;
}
</style>
