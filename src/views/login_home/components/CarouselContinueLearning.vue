<template>
  <div class="com_wrap" v-show="historyListArr.length">
    <div class="carouselHeader">
      <div>
        <h2 class="headerTitle">
          继续学习
          <span class="screenReaderText"></span>
        </h2>
        <span>
          <a class="headerLink" href @click.prevent="goallhistory">浏览全部 ></a>
        </span>
      </div>
    </div>
    <section class="carousel">
      <!-- 引入的是bootstrap中的Carousel组件 -->
      <div class="designSystemCarousel">
        <div
          id="carouselExampleControls_cl"
          class="carousel slide"
          data-ride="carousel"
          data-interval="false"
        >
          <ul class="carousel-inner">
            <li
              :class="['carousel-item',{'active':index==0}]"
              v-for="(items,index) in historyListArr"
              :key="index"
            >
              <div>
                <ul class="carousel-ul">
                  <li class="contentTitleCard" v-for="(item,index) in items" :key="index">
                    <div class="contentTitleCardWrapper">
                      <div v-if="item.image" class="cover_img_wrapper">
                        <div class="mosk">
                          <img class="cover_img" :src="imgUrl+item.image" alt />
                          <a href class="svg_play" @click.prevent="govideo(item.courseId)">
                            <svg viewBox="0 0 512 512" role="img" aria-label="Play">
                              <title>Play</title>
                              <g>
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
                          <button class="bookmarks_btn">
                            <img
                              v-if="item.bookmarkStatus==0"
                              src="../imgs/bookmarks.png"
                              class="img_icon"
                              alt
                              @click="changeIcon(item)"
                            />
                            <img
                              v-if="item.bookmarkStatus==1"
                              ref="img_icon_fill"
                              src="../imgs/bookmarks_fill.png"
                              class="img_icon_fill"
                              alt
                              @click="changeIcon(item)"
                            />
                          </button>
                        </div>
                      </div>
                      <div class="course_name">
                        <a
                          href
                          v-if="item.title"
                          @click.prevent="govideo(item.courseId)"
                        >{{item.title}}</a>
                      </div>
                      <div
                        v-if="item.teacher&&item.teacher.nickName"
                        class="course_teacher"
                        @click="goteacher(item.teacher.teaId)"
                      >{{item.teacher.nickName}}</div>
                      <!-- <div
                        v-if="item.duration"
                        class="course_schedule"
                      >{{formatDate(item.duration)}}</div> -->
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls_cl"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls_cl"
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
  name: "CarouselContinueLearning",
  props: ["historyListArr"],
  data() {
    return {
      imgUrl: window.CDN_URL
    };
  },
  methods: {
    ...{ formatDate },
    govideo(id) {
      this.$router.push({
        name: "classdetail",
        query: { id }
      });
    },
    goteacher(teacherid) {
      this.$router.push({
        name: "teacherInformation",
        query: { teacherid }
      });
    },
    changeIcon(obj) {
      if (obj.bookmarkStatus == 0) {
        this.$post(
          BASE_API+"course/goBookmarkCourse",
          {
            courseId: obj.courseId,
            token_id: localStorage.getItem("tokenId")
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        ).then(res => {
          console.log(res);
          if (res.errno == 101) {
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
          if (res.errno == 101) {
            obj.bookmarkStatus = 0;
          } else {
            this.$store.commit("showDialog", res.errsmg)
          }
        }).catch(err => {
          this.$store.commit("showDialog")
        });
      }
    },
    goallhistory() {
      this.$router.push(`/history`);
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/home.scss';
.com_wrap{
  
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
    width: 100%;
    font-size: 12px;
    line-height: 20px;
    display: block;
    padding-top: 8px;
    font-weight: 500;
    color: rgb(255, 255, 255);
    overflow: hidden;
    flex-wrap: wrap;
    text-overflow:ellipsis;//文本溢出显示省略号
    white-space:nowrap;
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
  .course_teacher {
    cursor: pointer;
  }
  .bookmarks_btn {
    pointer-events: all;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    padding: 0px;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    background: none;
    transition: all 300ms ease 0s;
  }

  .bookmarks_btn .img_icon,
  .bookmarks_btn .img_icon_fill {
    position: absolute;
    right: 10px;
    top: 10px;
    height: 20px;
    z-index: 2;
    display: none;
  }
  .mosk:hover .bookmarks_btn .img_icon {
    display: block;
  }
  .mosk:hover .bookmarks_btn .img_icon_fill {
    display: block;
  }
}
</style>