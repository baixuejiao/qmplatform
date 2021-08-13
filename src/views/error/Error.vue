<template>
  <div class="error">
    <img :src="img" alt="">
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
  .error{
    text-align: center;

    img{
      margin: 50px auto 0;
      width: 860px;
    }
  }
</style>