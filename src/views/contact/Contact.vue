<!-- 联系我们页面 -->
<template>
  <div class="contact">
    <h1 class="contact-title">联系我们</h1>
    <ul class="">
      <li class="contact-list">
        <img src="../../assets/imgs/contact/zl.jpg" alt="">
        <div class="contact-info">
          <p>青盟课堂·张老师</p>
          <p>微信号：weichuangwx</p>
        </div>
      </li>
      <li class="contact-list">
        <img src="../../assets/imgs/contact/z.jpg" alt="">
        <div class="contact-info">
          <p>青盟课堂·朱老师</p>
          <p>微信号：weichuangwx11</p>
        </div>
      </li>
      <li class="contact-list">
        <img src="../../assets/imgs/contact/kk.jpg" alt="">
        <div class="contact-info">
          <p>青盟课堂·康康老师</p>
          <p>微信号：staystrong-lu</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: require('@/assets/imgs/404.png')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/base.scss';
  .contact{
    padding: 50px 100px;
    color: $fontColorWhite;

    .contact-title{
      font-size: 24px;
    }
    .contact-list{
      display: flex;
      padding: 20px 0;
      // margin-bottom: 20px;
      border-bottom: 1px solid #363636;
      // background: #aaa;
      
      img{
        width: 120px;
      }
      .contact-info{
        margin-left: 20px;

        p{
          font-size: 14px;
          margin-top: 20px;
        }
      }
    }
  }
</style>