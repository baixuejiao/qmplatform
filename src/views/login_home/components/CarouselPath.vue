<template>
  <div v-show="pathListArr.length">
    <div class="carouselHeader">
      <div>
        <h2 class="headerTitle">
          学习路径
          <span class="screenReaderText"></span>
        </h2>
        <span>
          <a class="headerLink" href @click.prevent="goallpath">浏览全部 ></a>
        </span>
      </div>
    </div>
    <section class="carousel">
      <!-- 引入的是bootstrap中的Carousel组件 -->
      <div class="designSystemCarousel">
        <div
          id="carouselExampleControls_p"
          class="carousel slide"
          data-ride="carousel"
          data-interval="false"
        >
          <ul class="carousel-inner">
            <li
              :class="['carousel-item',{'active':index==0}]"
              v-for="(items,index) in pathListArr"
              :key="index"
            >
              <div>
                <ul class="carousel-ul">
                  <li class="contentTitleCard" v-for="(item,index) in items" :key="index">
                    <div class="contentTitleCardWrapper">
                      <div v-if="item.pathImg" class="cover_img_wrapper">
                        <div class="mosk path-mosk" :style="{backgroundImage:`url(${imgUrl+item.pathImg})`}">
                          <!-- <img class="cover_img" :src="imgUrl+item.pathImg" alt /> -->
                          <a href class="svg_play">
                            <svg
                              viewBox="0 0 512 512"
                              role="img"
                              aria-label="Play"
                              @click.prevent="gopath(item.pathId)"
                            >
                              <title>Play</title>
                              <g>
                                <!-- 移入svg填充渐变色 有动画效果 -->
                                <defs>
                                  <linearGradient
                                    class="orange_red"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="50%"
                                  >
                                    <stop offset="0%" stop-color="#f05a28" stop-opacity="1" />
                                    <stop offset="100%" stop-color="#e80a89" stop-opacity="1" />
                                  </linearGradient>
                                </defs>
                                <path
                                  d="M255.5,512c-141.2,0-256-114.8-256-256S114.3,0,255.5,0s256,114.8,256,256S396.7,512,255.5,512z M255.5,24.4 C127.8,24.4,23.9,128.3,23.9,256s103.9,231.6,231.6,231.6c127.7,0,231.6-103.9,231.6-231.6S383.2,24.4,255.5,24.4z M194.5,134.1 v243.8L365.2,256L194.5,134.1z"
                                />
                              </g>
                            </svg>
                          </a>
                        </div>
                      </div>
                      <div class="course_name">
                        <a
                          href
                          v-if="item.pathName"
                          @click.prevent="gopath(item.pathId)"
                        >{{item.pathName}}</a>
                      </div>
                      <p class="course_schedule">
                        <span v-if="item.courseCount != null">{{item.courseCount}} course</span>
                        <span v-if="item.courseTime != null">{{formatDate(item.courseTime) || '0s'}}</span>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls_p"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls_p"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { formatDate } from "@/assets/js/common.js";
export default {
  name: "CarouselPath",
  props: ["pathListArr"],
  data() {
    return {
      imgUrl: window.CDN_URL
    };
  },
  methods: {
    ...{ formatDate },
    goallpath() {
      this.$router.push(`/paths`);
    },
    gopath(id) {
      this.$router.push({
        name: "pathdetails",
        query: {
          id
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/home.scss';

.path-mosk{
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: #222;
}
.course_name {
  width: 200px;
  margin-left: 5px;
  position: relative;
  max-height: 39px;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
}
.course_name a {
  font-size: 12px;
  line-height: 20px;
  display: block;
  padding-top: 8px;
  font-weight: 500;
  color: rgb(255, 255, 255);
  overflow: hidden;
  flex-wrap: wrap;
}
.course_teacher,
.course_schedule {
  margin-left: 5px;
  display: flex;
  font-weight: 400;
  line-height: 20px;
  max-width: 100%;
  font-size: 12px;
  color: rgb(170, 170, 170);
  -webkit-box-align: center;
  align-items: center;
}
.course_schedule{
  span{

    &:after{
      content: '·';
      margin: 0 5px;
    }
    &:last-child:after{
      display: none;
    }
  }
}
</style>