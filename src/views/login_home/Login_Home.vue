<template>
  <div id="home">
    <div class="home-activity" @click="goActivity">
      <!-- <img src="../../assets/imgs/home/activity.jpg"> -->
    </div>
    <section class="top_wrapper">
      <div class="userProfile">
        <div class="avatar">
          <a @click.prevent="gopersonal" href>
            <div class="avatar_inner">
              <img v-if="userInfo&&userInfo.image" :src="userInfo.image" alt />
              <img v-else src alt />
            </div>
          </a>
        </div>
        <div class="userTextInfo">
          <div class="userTextContainer">
            <a
              @click.prevent="gopersonal"
              v-if="userInfo&&userInfo.name"
              href
              class="userHeading underline_a"
            >Hello,{{userInfo.name}}</a>
            <a @click.prevent="gopersonal" v-else href class="userHeading underline_a">Hello, 青青&萌萌</a>
          </div>
          <span class="roleIQHeading underline_a home-skill-entry" @click="goSkill()">
            <svg viewBox="0 0 512 512" aria-label="Skill IQ" class="_3AaTpHcO"><title>Skill IQ</title><defs><linearGradient x1="23.812%" y1="22.445%" x2="100%" y2="100%" id="icon-datacamp-linearGradient-10"><stop stop-color="#F05A28" offset="0%"></stop><stop stop-color="#E80A89" offset="100%"></stop></linearGradient></defs><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill-rule="nonzero"><path d="M512,256 L512,512 L256,512 C114.615104,512 0,397.384896 0,256 C0,114.615104 114.615104,0 256,0 C397.384896,0 512,114.615104 512,256 Z" fill="url(#icon-datacamp-linearGradient-10)"></path><circle fill="#222222" cx="260.736" cy="260.736" r="132.736"></circle></g></g></svg>
            获取你的技能
          </span>
        </div>
      </div>
      <span class="home-activity-entry" @click="goActivity">
        查看最新活动
      </span>
    </section>

    <div id="home-container">
      <CarouselContinueLearning :historyListArr="historyListArr" />

      <CarouselRecommendedCourses :recommendListArr="recommendListArr" />

      <CarouselPath :pathListArr="pathListArr" />

      <TableBookmarks :bookmarksList="bookmarks_list" />

      <!-- <CarouselSkillIQ :skillListArr="skillListArr" /> -->

      <CarouselNewestCourses :newListArr="newListArr" />
      <!-- <router-view /> -->
    </div>
  </div>
</template>
<script>
import CarouselContinueLearning from "./components/CarouselContinueLearning.vue";
import CarouselRecommendedCourses from "./components/CarouselRecommendedCourses.vue";
import CarouselPath from "./components/CarouselPath.vue";
import CarouselSkillIQ from "./components/CarouselSkillIQ.vue";
import CarouselNewestCourses from "./components/CarouselNewestCourses.vue";
import TableBookmarks from "./components/TableBookmarks.vue";

import store from "@/store.js";

import { mapMutations } from 'vuex';

export default {
  name: "login_home",
  data() {
    return {
      errno: 0,
      errmsg: "",
      user_name: "XX",
      user_avatar: "", //头像地址
      isShow: false,
      historyListArr: [],
      recommendListArr: [],
      pathListArr: [],
      skillListArr: [],
      newListArr: [],
      bookmarks_list: []
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  created() {
    function sliceArray(array, size) {
      var result = [];
      for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(array.slice(start, end));
      }
      return result;
    }
    this.$store.commit("showLoading")
    this.$post(
      BASE_API+"homeLogin/getHomePersonalInfo",
      {
        token_id: localStorage.getItem("tokenId")
      },
      {
        headers: {
          token: localStorage.getItem("token")
        }
      }
    ).then(res => {
      this.$store.commit("hideLoading")
      if (res.errno == 101) {
        this.historyListArr = sliceArray(res.data.history_list, 5);
        this.recommendListArr = sliceArray(res.data.recommend_list, 5);
        this.pathListArr = sliceArray(res.data.path_list, 5);
        this.skillListArr = sliceArray(res.data.skill_list, 5);
        this.newListArr = sliceArray(res.data.new_list, 5);
        this.bookmarks_list = res.data.bookmarks_list;

        let course_arr = res.data.history_list.filter((element, index) => {
          this.setHistoryCourse(element.courseId)
          return element.courseId
        })

        let path_arr = res.data.path_list.filter((element, index) => {
          this.setHistoryPath(element.pathId)
          return element.pathId
        })

      } else {
        this.$store.commit("hideLoading")
        this.$store.commit("showDialog", res.errmsg)
      }
    }).catch (err => {
      this.$store.commit("showDialog")
    });
  },
  methods: {
    ...mapMutations(['setHistoryCourse', 'setHistoryPath']),
    gopersonal() {
      this.$router.push(`/personal`);
    },
    goSkill() {
      this.$router.push({
        name: "exercisesPath",
        query: {
          tokenId: localStorage.getItem('tokenId')
        }
      });
    },
    goActivity() {
      this.$router.push('/activity')
    }
  },
  components: {
    CarouselContinueLearning,
    CarouselRecommendedCourses,
    CarouselPath,
    CarouselSkillIQ,
    CarouselNewestCourses,
    TableBookmarks
  },
  beforeRouteEnter (to, from, next) {
    // 路由守卫 当在本地能够获取用户登录信息后，进入个人主页
    if (!localStorage.getItem('tokenId')) {
      next({path: '/'})
    } else {
      next();
    }
  },
};
</script>
<style lang="scss" scoped>
#home {
  display: flex;
  flex-direction: column;
  background-color: #181818;
  height: 100%;
  #home-container{
    padding: 0 90px;
  }
  .top_wrapper {
    //最顶部紫色部分
    width: 100vw;
    background: #65316b;
    // margin: 0 -90px 0;
    padding: 18px 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .userProfile {
    //头像
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .avatar {
    cursor: pointer;
    height: 96px;
    margin-right: 24px;
    position: relative;
    width: 96px;
    z-index: 9;
  }
  .avatar_inner {
    width: auto;
    height: 100%;
    display: flex;
    color: rgb(255, 255, 255);
    font-weight: 400;
    background-color: rgb(170, 170, 170);
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
  }
  .avatar_inner img {
    height: 100%;
  }
  .userTextInfo {
    //头像右侧的字
    align-items: flex-start;
    display: flex;
    flex-direction: column;
  }
  .userTextContainer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .userHeading {
    text-decoration: none;
    cursor: pointer;
    font-size: 24px;
    line-height: 24px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 4px;
  }
  .underline_a {
    position: relative;
  }
  .underline_a::after,
  .underline_a::before {
    content: "";
    width: 0;
    height: 1px;
    display: block;
    background-color: #fff;
    position: absolute;
    top: 100%;
    left: 50%;
    transition: all 0.5s;
  }
  .underline_a:hover::before {
    left: 0%;
    width: 50%;
  }
  .underline_a:hover::after {
    left: 50%;
    width: 50%;
  }
  .userHeading:hover {
    text-decoration: none;
    color: #fff;
  }

  .svg_path {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    margin: 0px;
    display: inline-block;
    height: 24px;
    width: 24px;
    fill: #ccc;
  }
  .svg_path svg {
    position: relative;
    top: -2px;
  }
  .svg_path:hover {
    fill: #fff;
  }
  .roleIQHeading {
    align-items: center;
    display: flex;
    margin-top: 0;
    font-weight: 300;
    font-size: 16px;
    vertical-align: middle;
    color: #aaa;
    cursor: pointer;
    // &:hover{
    //   text-decoration: underline;
    // }
    svg{
      height: 14px;
      width: 14px;
      margin-right: 4px;
      flex: 1;
      color: #aaa;
      font-size: 14px;
      font-weight: 300;
      overflow: hidden;
      vertical-align: middle;
      position: relative;
      top: 1px; 
    }
  }
  
  .home-activity-entry{
    color: #fff;
    cursor: pointer;
    position: relative;
    &::after,
    &::before {
      content: "";
      width: 0;
      height: 1px;
      display: block;
      background-color: #f96816;
      position: absolute;
      top: 100%;
      left: 50%;
      transition: all 0.5s;
    }
    &:hover{
      color: #f96816;

      &::before{
        left: 0%;
        width: 50%;
        color: #f96816;
      }
      &::after{
        left: 50%;
        width: 50%;
        color: #f96816;
      }
    }

  }
  .home-activity{
    width: 100%;
    // max-width: 1280px;
    height: 130px;
    // margin: 0 -90px;
    background: url('../../assets/imgs/home/activity.jpg') no-repeat center;
    background-size: cover;
    cursor: pointer;
  }
}
</style>