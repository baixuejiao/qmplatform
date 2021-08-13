<template>
<section class="scourse-list">
  <span class="scourse-date">
    <!-- {{data.createTime}} -->
    <img :src="imgUrl+data.image" alt="">
  </span>
  <div>
    <p class="scourse-tips">
      <img src="@/assets/imgs/search/video.png" alt="">
      课程
    </p>
    <h4 @click="goDetails(data)">{{data.title}}</h4>
    <p class="scourse-desc">
      <span v-if="data.teacher&&data.teacher.nickName">{{data.teacher.nickName}}</span>
      <span v-if="data.level">{{setLevel(data.level)}}</span>
      <span v-if="data.duration">{{data.duration}}</span>
      <span v-if="data.createTime">{{data.createTime}}</span>
      <span v-if="data.grade"><star-rating :rating="data.grade" :star-size="12" :inline=true :read-only=true :increment="0.5" active-color="#ffc200" inactive-color="#aaa" border-color="transparent"></star-rating></span>
    </p>
  </div>
</section>
</template>

<script>
import { setLevel } from '@/assets/js/common.js'
import StarRating from 'vue-star-rating'

export default {
  data() {
    return {
      imgUrl: window.CDN_URL,
    }
  },
  props: ['data'],
  components: {
    StarRating
  },
  methods: {
    ...{setLevel},
    goDetails(_data) {
      this.$router.push({
        name: 'classdetail',
        query: {
          id: _data.courseId
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/base.scss';
  .scourse-list{
    display: flex;
    width: 100%;
    padding: 20px 12px 22px;
    border-bottom: 1px solid rgb(54, 54, 54);
    color: $fontColorWhite;
    cursor: pointer;

    &:hover{
      h4{
        text-decoration: underline;
      }
    }

    .scourse-date{
      display: block;
      width: 160px;
      height: 96px;
      margin-right: 20px;
      overflow: hidden;
      // width: 150px;
      // font-size: 12px;
      // color: $grayColor;
      img{
        display: block;
        width: 160px;
        height: 96px;
      }
    }
    .scourse-tips{
      font-size: 12px;
      line-height: 1.5;
      color: $grayColor;
      overflow: hidden;

      img{
        float: left;
        width: 14px;
        margin-top: 1px;
        margin-right: 5px;
      }
    }
    h4{
      margin: 10px 0;
      font-size: 18px;
      font-weight: 500;
    }
    .scourse-desc{
      font-size: 12px;
      color: $grayColor;
      span{

        &::after{
          content: '·';
          display: inline-block;
          margin: 0 5px;
        }
        &:last-child{
          &::after{
            display: none;
          }
        }
      }
    }
  }
</style>