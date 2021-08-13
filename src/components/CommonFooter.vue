<!-- 
  通用页面Footer
  author: bxj
  create-time: 2019-08-23
-->
<template>
  <footer id="footer" class="navbar navbar-default navbar-fixed-bottom">
    <div>
      <a href="javascript:void(0)" @click="goHome()">网站首页</a>
      <a href="javascript:void(0)" @click="goPage('/contact')">联系我们</a>
      <a href="javascript:void(0)" @click="goTx('http://qmtech.ke.qq.com')">青盟腾讯课堂</a>
      <a href="javascript:void(0)" @click="goTx('https://space.bilibili.com/472014514')">哔哩哔哩青盟课堂</a>
      <!-- <a href="javascript:void(0)" @click="goPage()">意见反馈</a> -->
    </div>
    <p> ©2019 qingmengtech.com All Rights Reserved | 黑ICP备19005607号-1</p>
  </footer>
  
</template>

<script>
export default {
  data() {
    return {
      tokenId: localStorage.getItem('tokenId')
    }
  },
  methods: {
    goPage(_url) {
      this.$router.push(_url)
    },
    goTx(_url) {
      window.open(_url)
    },
    goHome() {
      if (this.tokenId) {
        this.$router.push('/home')
      } else {
        this.$router.push('/')
      }
    }
  }
} 
</script>

<style lang="scss" scoped>
  @import '@/assets/css/base.scss';
  #footer{
    width: 100%;
    padding: 16px 24px;
    font-size: 14px;
    border-top: 1px solid rgb(54, 54, 54);
    color: #aaa;
    background-color: rgb(34, 34, 34);

    a{
      margin-right: 20px;
      color: #aaa;

      &:hover{
        text-decoration: none;
        color: #F96816;
      }
    }
  }
</style>