<template>
  <section class="pathlist">
    <div class="pathlist-info">
      <p class="pathlist-tag">
        <img src="@/assets/imgs/search/paths.png" alt="">
        PATH
      </p>
      <h4 class="pathlist-title" @click="goPaths(data)">{{data.pathName}}</h4>
      <p class="pathlist-info">
        <span>课程：{{data.courseCount}}</span>
        <span>时长：{{data.courseTime}}</span>
      </p>
    </div>
    <img class="pathlist-img" :src="imgUrl+data.pathImg" alt="">
  </section>
</template>

<script>
export default {
  data(){
    return{
      imgUrl: window.CDN_URL
    }
  },
  props: ['data'],
  methods: {
    goPaths(data) {
      this.$router.push({
        name: 'pathdetails',
        query: {
          id: data.pathId
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/base.scss';
  .pathlist{
    display: flex;
    justify-content: space-between;
    padding: 20px 0 22px;
    line-height: 2.0;
    border-bottom: 1px solid #363636;
    cursor: pointer;

    &:hover{
      .pathlist-title{
        text-decoration: underline;
      }
    }
    
    .pathlist-tag{
      font-size: 12px;
      vertical-align: middle;
      color: $grayColor;

      img{
        width: 12px;
      }
    }
    .pathlist-title{
      margin: 10px 0;
      font-size: 18px;
      color: $fontColorWhite;

    }
    .pathlist-info{
      font-size: 12px;
      color: $grayColor;
    }
    .pathlist-img{
      width: 80px;
      height: 80px;
    }

  }
</style>