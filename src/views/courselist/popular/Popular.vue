<template>
  <div class="popular-container">
    <ul class="popular-content">
      <li v-for="(item,index) in popular" :key="index" class="popular-list">
        <a class="popular-list-img" @click="goClassDetail(item.courseId)">
          <img aria-hidden="true" :src="imgUrl+item.image" />
        </a>
        <div class="popular-list-info">
          <a @click="goClassDetail(item.courseId)" class="popular-listtitle">{{item.title}}</a>
          <p class="popular-list-tips">
            <a class="popular-list-text" v-if="item.teacher&&item.teacher.nickName" @click="goTeacherDetail(item.teacher.teaId)">
              {{item.teacher.nickName}}
            </a>
            <span class="popular-list-text" v-if="item.level">
              {{setLevel(item.level)}}
            </span>
            <span class="popular-list-text" v-if="item.createTime">
              {{item.createTime}}
            </span>
            <span class="popular-list-text" v-if="item.duration">
              {{formatDate(item.duration)}}
            </span>
            <span class="popular-list-text">
              <star-rating v-bind:increment="0.5" v-bind:max-rating="5" v-bind:rating="item.grade" :inline="true" inactive-color="rgb(153, 153, 153)" glow-color="rgb(255, 194, 0);" v-bind:star-size="12" read-only></star-rating>
            </span>
          </p>
        </div>
        <div v-if="tokenId" class="popular-list-bookmark">
          <img
            class="collection__img"
            @click="changeImg(item)"
            src="../../../assets/imgs/bookmarksfill.png"
            v-if="item.bookmarkStatus*1==1"
          />
          <img
            class="collection__img"
            src="../../../assets/imgs/bookmarks.png"
            v-else
            @click="changeImg(item)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import StarRating from "vue-star-rating";
import { formatDate, setLevel } from "@/assets/js/common.js";
export default {
  props: ["popular"],
  data() {
    return {
      imgUrl: window.CDN_URL,
      isShow: true,
      tokenId: localStorage.getItem('tokenId')
    };
  },

  methods: {
    ...{ formatDate, setLevel },
    changeImg(obj) {
      if (obj.bookmarkStatus == 1) {
        this.$post(
            BASE_API+"course/goBookmarkCourse",
          {
            courseId: obj.courseId,
            "token_id": localStorage.getItem('tokenId'),
          },
          {
            headers: {
              token:localStorage.getItem('token')
            }
          }
        ).then(res => {
          if (res.errno * 1 === 101) {
            obj.bookmarkStatus = 0;
          } else {
            this.$store.commit("showDialog", res.errsmg)
          }
        }).catch(err => {
          this.$store.commit("showDialog")
        });
      } else {
        this.$post(
            BASE_API + "course/cancelBookmarkCourse",
          {
            courseId: obj.courseId,
            "token_id": localStorage.getItem('tokenId'),
          },
          {
            headers: {
              token:localStorage.getItem('token')
            }
          }
        ).then(res => {
          if (res.errno * 1 === 101) {
            obj.bookmarkStatus = 1;
          } else {
            this.$store.commit("showDialog", res.errsmg)
          }
        }).catch( err => {
          this.$store.commit("showDialog")
        });
      }
    },
    //点击教师姓名传参
    goTeacherDetail(id) {
      this.$router.push({
        name: "teacherInformation",
        query: {
          id
        }
      });
    },
    //点击课程名称传参
    goClassDetail(id) {
      this.$router.push({
        name: "classdetail",
        query: {
          id
        }
      });
    }
  },

  created() {
    // console.log(this.comPropArr);
  },

  computed: {
    //分割数组
    preArr() {
      return Array.from(this.popular).slice(0, 10);
    },
    nextArr() {
      return Array.from(this.popular).slice(10);
    }
  },

  //点击显示所有的数据
  showAllData() {
    this.isShow = false;
  },

  components: {
    StarRating
  }
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/base.scss';
.popular-container{
  .popular-content{
    width: 100%;
  }
  .popular-list{
    display: flex;
    width: 100%;
    padding: 20px 16px;
    border-top: 1px solid rgb(54, 54, 54);
    transition: all 300ms ease 0s;

    &:hover{
      background: rgb(49, 49, 49) !important;
    }

    .popular-list-img{
      display: inline-block;
      width: 100px;

      img{
        width: 100%;
      }
    }
    .popular-list-info{
      flex-grow: 1;
      line-height: 1.5;
      padding-left: 20px;

      .popular-listtitle{
        display: block;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .popular-list-tips{
        margin-top: 10px;
        font-size: 12px;
        color: #aaa;
      }
      .popular-list-text{
        &:after{
          content: '·';
          margin: 0 5px;
        }
        &:last-child:after{
          display: none;
        }
      }
    }
    .popular-list-bookmark{
      width: 100px;
      height: 100%;

      img{
        width: 16px;
        height: 21px;
        margin-top: 20px;
      }
    }
  }
}
</style>