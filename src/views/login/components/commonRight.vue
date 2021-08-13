<!--登录页面的左半部分-->
<template>
  <div class="common-wraper">
    <p id="slogn">{{msg}}</p>
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
}
</script>

<style lang="scss" scoped>
.common-wraper{
  width: 100%;
  height: 100%;
  position: relative;

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
}
</style>
