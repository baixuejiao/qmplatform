<template>
  <div class="newest-container">
    <ul class="newest-content">
      <li v-for="(item,index) in preArr" :key="index" class="newest-list">
        <a class="newest-list-img" @click="goClassDetail(item.courseId)">
          <img aria-hidden="true" :src="imgUrl+item.image" />
        </a>
        <div class="newest-list-info">
          <a @click="goClassDetail(item.courseId)" class="newest-listtitle">{{item.title}}</a>
          <p class="newest-list-tips">
            <a class="newest-list-text" v-if="item.teacher&&item.teacher.nickName" @click="goTeacherDetail(item.teacher.teaId)">
              {{item.teacher.nickName}}
            </a>
            <span class="newest-list-text" v-if="item.level">
              {{setLevel(item.level)}}
            </span>
            <span class="newest-list-text" v-if="item.createTime">
              {{item.createTime}}
            </span>
            <span class="newest-list-text" v-if="item.duration">
              {{formatDate(item.duration)}}
            </span>
            <span class="newest-list-text">
              <star-rating v-bind:increment="0.5" v-bind:max-rating="5" v-bind:rating="item.grade" :inline="true" inactive-color="rgb(153, 153, 153)" glow-color="rgb(255, 194, 0);" v-bind:star-size="12" read-only></star-rating>
            </span>
          </p>
        </div>
        <div v-if="tokenId" class="newest-list-bookmark">
          <img
            class="collection__img"
            @click="changeImg(item)"
            src="../assets/imgs/bookmarksfill.png"
            v-if="item.bookmarkStatus*1==1"
          />
          <img
            class="collection__img"
            src="../assets/imgs/bookmarks.png"
            v-else
            @click="changeImg(item)"
          />
        </div>
      </li>
    </ul>
    <div class="newest-footer" v-if="tokenId&&showBtn">
      <a class="newest-footer-btn" @click="showAllData">查看全部课程</a>
    </div>
  </div>
</template>
<script>
import StarRating from "vue-star-rating";
import { formatDate, setLevel } from "@/assets/js/common.js";
export default {
  props: ["newest",'showBtn'],
  data() {
    return {
      isShow: true,
      imgUrl: window.CDN_URL,
      tokenId: localStorage.getItem('tokenId')
    };
  },

  methods: {
    ...{ formatDate, setLevel },
    changeImg(obj) {
      if (obj.bookmarkStatus == 0) {
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
          if (res.errno *1 === 101 ) {
            obj.bookmarkStatus = 1;
          } else {
            this.$store.commit("showDialog", res.errsmg)
          }
        }).catch(err => {
          this.$store.commit("showDialog")
        });
      } else {
        this.$post(
          BASE_API+"course/cancelBookmarkCourse",
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
          console.log(res);
          if (res.errno * 1 === 101) {
            obj.bookmarkStatus = 0;
          } else {
            this.$store.commit("showDialog", res.errsmg)
          }
        }).catch(err => {
          this.$store.commit("showDialog")
        });
      }
    },
    //点击课程名称传参
    goClassDetail(id) {
      console.log(id);
      this.$router.push({
        name: "classdetail",
        query: {
          id
        }
      });
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
    //点击显示所有的数据
    showAllData() {
      this.$router.push({
        path: 'search',
        query: {
          keyword: 'all'
        }
      })
    }
  },

  computed: {
    preArr() {
      return Array.from(this.newest).slice(0, 10);
    },
    nextArr() {
      return Array.from(this.newest).slice(10);
    }
  },

  components: {
    StarRating
  }
};
</script>
<style lang="scss"  scoped>
@import '@/assets/css/base.scss';
.newest-container{
  .newest-content{
    width: 100%;
  }
  .newest-list{
    display: flex;
    width: 100%;
    padding: 20px 16px;
    border-top: 1px solid rgb(54, 54, 54);
    transition: all 300ms ease 0s;

    &:hover{
      background: rgb(49, 49, 49) !important;
    }

    .newest-list-img{
      display: inline-block;
      width: 100px;

      img{
        width: 100%;
      }
    }
    .newest-list-info{
      flex-grow: 1;
      line-height: 1.5;
      padding-left: 20px;

      .newest-listtitle{
        display: block;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .newest-list-tips{
        margin-top: 10px;
        font-size: 12px;
        color: #aaa;
      }
      .newest-list-text{
        &:after{
          content: '·';
          margin: 0 5px;
        }
        &:last-child:after{
          display: none;
        }
      }
    }
    .newest-list-bookmark{
      width: 100px;
      height: 100%;

      img{
        width: 16px;
        height: 21px;
        margin-top: 20px;
      }
    }
  }
  .newest-footer{
    width: 100%;
    padding: 30px 0 60px;
    a {
      display: block;
      width: 200px;
      margin: 0 auto;
      padding: 5px 0;
      text-align: center;
      font-size: 14px;
      border: 1px solid $orangeColor;
      border-radius: 5px;
      color: $orangeColor;
      cursor: pointer;

      &:hover{
        border: 1px solid $orangeColorHover;
        color: $orangeColorHover;
      }
    }
  }
}
</style>