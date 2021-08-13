<template>
  <section class="search-course">
    <!-- <div class="search-course-date">{{data.createTime}}</div> -->
    <div class="search-course-date">
      <img :src="imgUrl+data.image" alt="">
    </div>
    <div class="search-course-info">
      <span class="search-course-icon">
        <img src="../../../assets/imgs/search/video.png" />课程
      </span>
      <h4 class="search-course-title" @click="goCourse(data.courseId)">{{data.title}}</h4>
      <p class="search-course-tips">
        <a @click.stop="goTeacher(data.teacher.teaId)" v-if="data.teacher && data.teacher.nickName">{{data.teacher.nickName}}</a>
        <span v-if="data.level">{{setLevel(data.level)}}</span>
        <span v-if="data.duration">{{formatDate(data.duration)}}</span>
        <span v-if="data.createTime">{{data.createTime}}</span>
        <span v-if="data.grade!=null">
          <star-rating v-bind:increment="0.5" v-bind:max-rating="5" v-bind:rating="data.grade" :inline="true" inactive-color="rgb(153, 153, 153)" glow-color="rgb(255, 194, 0);" v-bind:star-size="12" read-only></star-rating>
        </span>
      </p>
    </div>
  </section>
</template>

<script>
import StarRating from "vue-star-rating";
import { formatDate, setLevel } from "@/assets/js/common.js";

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
    formatDate,
    setLevel,
    goTeacher(teacherid) {
      this.$router.push({
        name: 'teacherInformation',
        query: {
          teacherid
        }
      })
    },
    goCourse(id) {
      this.$router.push({
        path: '/courselist',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .search-course{
    display: flex;
    padding: 20px 12px 22px;
    color: rgb(170, 170, 170);
    border-bottom: 1px solid rgb(54, 54, 54);

    .search-course-date{
      width: 160px;
      height: 96px;

      img{
        display: block;
        width: 160px;
        height: 96px;
      }
    }
    .search-course-info{
      padding-left: 18px;
      line-height: 1.0;

      .search-course-icon{
        display: inline-block;
        font-size: 12px;
        line-height: 1.0;

        img{
          width: 14px;
          margin-right: 5px;
          vertical-align: middle;
          position: relative;
          top: -1px;
        }
      }
      .search-course-title{
        margin: 10px 0;
        font-size: 18px;
        line-height: 1.5;
        font-weight: 500;
        color: #fff;
        cursor: pointer;

        &:hover{
          text-decoration: underline;
        }
      }
      .search-course-tips{
        font-size: 12px;

        a{
          color: rgb(170, 170, 170);
        }
        span{
          &::before{
            content: '·';
            margin: 0 8px;
          }
        }
      }
    }
    .vue-star-rating-star{
      margin-top: 3px;
    }
  }
</style>