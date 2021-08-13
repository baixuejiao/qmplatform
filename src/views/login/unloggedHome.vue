<!--未登录的首页 导航栏占位 三个图片占位 最下面是footer-->
<template>
  <div id="container">

    <!-- 轮播图 -->
    <div id="banner" v-if="bannerList.length>0">
      <div id="banner-content">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(slide, index) in bannerList" :key="index">
            <!-- <img :src="imgUrl+slide.url" alt="" > -->
            <div class="banner-image" @click="goBannerDetails(slide)" :style="{backgroundImage: 'url('+imgUrl+slide.url+')'}"></div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>

    <div id="main" class="clearfix">
      <Skill-entry></Skill-entry>
      <Category :categorys="categorys"></Category>
      <popular-path :paths="paths"></popular-path>
      <Course :courses="courses" :popularCourses="popularCourses"></Course>
    </div>

    <footer v-if="tag">
      <div class="footer">
        <div class="footerlist">
          <div class="footerlisttop">SOLTIONS</div>
          <a href>Personal</a>
          <a href>Team</a>
          <a href>Enterprise</a>
          <a href>Gift of Prualsight</a>
          <a href>Pricing</a>
        </div>
        <div class="footerlist">
          <div class="footerlisttop">SOLTIONS</div>
          <a href>Personal</a>
          <a href>Team</a>
          <a href>Enterprise</a>
          <a href>Gift of Prualsight</a>
          <a href>Pricing</a>
        </div>
        <div class="footerlist">
          <div class="footerlisttop">SOLTIONS</div>
          <a href>Personal</a>
          <a href>Team</a>
          <a href>Enterprise</a>
          <a href>Gift of Prualsight</a>
          <a href>Pricing</a>
        </div>
        <div class="footerlist">
          <div class="footerlisttop">SOLTIONS</div>
          <a href>Personal</a>
          <a href>Team</a>
          <a href>Enterprise</a>
          <a href>Gift of Prualsight</a>
          <a href>Pricing</a>
        </div>
        <div class="footerlist">
          <div class="footerlisttop">SOLTIONS</div>
          <a href>Personal</a>
          <a href>Team</a>
          <a href>Enterprise</a>
          <a href>Gift of Prualsight</a>
          <a href>Pricing</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import SkillEntry from "@/components/SkillEntry.vue";
import Category from '@/components/Category.vue';
import PopularPath from '@/components/PopularPath.vue'
import Course from '@/components/Course.vue'


export default {
  data() {
    return {
      tag: false,
      bannerList: [],
      imgUrl: window.CDN_URL,
      swiperOption: {
        autoplay:true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      categorys: [],
      courses: [],
      paths: [],
      popularCourses: []
    };
  },
  name: "unloggedHome",
  components: {
    swiper,
    swiperSlide,
    SkillEntry,
    Category,
    PopularPath,
    Course
  },
  computed: {
  },
  created(){
    this.getBannerList()
    this.getData()
  },
  mounted() {
  },
  methods:{
    getBannerList(){
      this.$store.commit("showLoading")
      this.$get(BASE_API+'banner/getBannerList')
      .then( res => {
        this.$store.commit("hideLoading")
        // handle success
        if( res.errno * 1 === 101) {
          this.bannerList = res.data;
        } else {
          this.$store.commit("showDialog", res.message)
        }
      })
      .catch( err => {
        console.log(err);
        this.$store.commit("hideLoading")
        // handle error
        this.$store.commit("showDialog")
      })
    },
    getData() {
      this.$store.commit("showLoading")
      this.$get(BASE_API+"browse/getBrowse", {
        headers: {
          token:localStorage.getItem('token')
        }
      }).then(res => {
        this.$store.commit("hideLoading")
        if (res.errno * 1 === 101) {
          this.categorys = res.data.categorys;
          this.courses = res.data.courses;
          this.paths = res.data.paths;
          this.popularCourses = res.data.popularCourses;
        } else {
          this.$store.commit("showDialog", res.errsmg)
        }
      }).catch(err => {
        this.$store.commit("hideLoading")
        this.$store.commit("showDialog")
      });
    },
    // 点击轮播图跳转
    goBannerDetails(data) {
      window.open(data.turnUrl);
    },
    more(_data){
      console.log(_data)
      this.$router.push({path: '/classdetail', query: {id: _data.courseId}})
    }
  },
  beforeRouteEnter (to, from, next) {
    // 路由守卫 当在本地能够获取用户登录信息后，进入个人主页
    if (localStorage.getItem('tokenId')) {
      next({path: '/home'})
    } else {
      next();
    }
  },
};
</script>

<style lang="scss" scoped >
@import '@/assets/css/base.scss';
#banner{
  width: 100%;
  height: 510px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden; 
  
  #banner-content{
    width: 100%;
    // max-width: 1280px;
    height: 100%;
    margin: 0 auto;
  }

  .swiper-container{
    width: 100%;
    height: 100%;
  }
  img{
    width: 100%;

  }
  .banner-image{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
}
#main{
  padding-bottom: 40px;
}
.footer {
  width: 100;
  display: flex;
  height: 500px;
}
.footerlist {
  flex: 1;
  padding: 0 100px;
}
.footerlisttop {
  margin: 77px, 0px;
  width: 130px;
  height: 19px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 40px;
  text-transform: uppercase;
  margin-top: 77px;
  text-align: left;
}


</style>