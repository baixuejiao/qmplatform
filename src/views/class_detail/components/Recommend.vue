<!-- 推荐课程 -->
<template>
  <ul>
    <li v-for="(item,index) in Localcourses" :key="index" class="detail-li">
      <div class="detail-img">
        <img v-if="item.image" :src="imgUrl+item.image" />
      </div>
      <div>
        <a class="detail-name" href="javascript:void(0)" @click="goDetails(item)">{{item.title}}</a>
        <div class="detail-info">
          <a class="detail-teacher point" v-if="item.teacher&&item.teacher.nickName" @click="pushteacher(item.teacher.teaId)">{{item.teacher.nickName}}</a>
          <span class="point" v-if="item.level">{{setLevel(item.level)}}</span>
          <span class="point" v-if="item.createTime">{{item.createTime}}</span>
          <span class="point" v-if="item.duration">{{formatDate(item.duration)}}</span>
          <star-rating
            :star-size="13"
            :inline="true"
            :rating="item.grade * 1"
            :read-only="true"
          ></star-rating>
        </div>
      </div>
      <div class="detail-btn" v-if="tokenId">
        <span v-if="item.bookmarkStatus*1==1">已收藏</span>
        <span v-else>未收藏</span>
        <!-- <button v-if="item.bookmarkStatus" @click="toggle(item.bookmarkStatus,item.courseId,index)">已收藏</button>
        <button v-if="!item.bookmarkStatus" @click="toggle(item.bookmarkStatus,item.courseId,index)">收藏</button> -->
      </div>
      <div class="detail-describe"></div>
    </li>
  </ul>
</template>

<script>
import { formatDate, setLevel } from "@/assets/js/common.js";
import StarRating from "vue-star-rating";
export default {
  data() {
    return {
      imgUrl: window.CDN_URL,
      tokenId: localStorage.getItem('tokenId') || '',
    }
  },
  props: ['Localcourses', 'togglebook', 'goCourseDetails'],
  components: {
    StarRating
  },
  methods: {
    formatDate,
    setLevel,
    toggle() {
      this.togglebook(_status, _id, _index)
    },
    goDetails(item) {
      this.goCourseDetails(item)
    },
    pushteacher(teacherid){  //跳转教师信息页面
      console.log(12313)
      if (this.tokenId) {
        this.$router.push({
          name:"teacherInformation",
          query:{
            teacherid
          }
        })
      } else {
        this.$router.push('/login')
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.detail-li {
  border-top: 1px solid rgb(54, 54, 54);
  position: relative;
  padding: 12px 0;
  display: flex;
}
.detail-img {
  margin-right: 24px;
  img {
    width: 96px;
    height: 54px;
  }
}
.detail-name {
  font-weight: 700;
  text-align: left;
  font-size: 18px;
  line-height: 24px;
  color: #fff;
}
.detail-info{
  a {
    color: rgb(170, 170, 170);

    &:hover {
      cursor: pointer;
    }
  }
}
.detail-info {
  margin-top: 2px;
  font-weight: 600;
  line-height: 20px;
  color: rgb(170, 170, 170);
  font-size: 12px;
}
.point::after{
  content: '·';
  margin: 0 8px;
  font-weight: 700;
  display: inline-block;
}
.detail-btn {
  color: white;
  position: absolute;
  right: 0;
  top: 30px;
}
.detail-btn span {
  color: white;
  font-size: 13px;
}
</style>