<template>
  <div id="activity">
    <div v-if="courseList">
      <h3 class="activity-title">课程列表</h3>
      <section v-for="(list, index) in courseList" :key="index" class="activity-course-container">
        <h4 class="activity-course-title">{{list.level}}</h4>
        <!-- <ul class="course-content">
          <li v-for="(item, index) in list.course" :key="index" class="course-list">
            <div class="course-list-header" @click="goVideo(item.url)">
              <img :src="item.image" alt="">
              <span class="course-list-cover">
                <svg viewBox="0 0 512 512" role="img" aria-label="Play">
                  <title>Play</title>
                  <g>
                    <defs>
                      <linearGradient id="orange_red" x1="0%" y1="0%" x2="100%" y2="50%" >
                        <stop offset="0%" stop-color="#f05a28" stop-opacity="1" />
                        <stop offset="100%" stop-color="#e80a89" stop-opacity="1" />
                      </linearGradient>
                    </defs>
                    <path d="M255.5,512c-141.2,0-256-114.8-256-256S114.3,0,255.5,0s256,114.8,256,256S396.7,512,255.5,512z M255.5,24.4 C127.8,24.4,23.9,128.3,23.9,256s103.9,231.6,231.6,231.6c127.7,0,231.6-103.9,231.6-231.6S383.2,24.4,255.5,24.4z M194.5,134.1 v243.8L365.2,256L194.5,134.1z"/>
                  </g>
                </svg>
              </span>
            </div>
            <div class="course-list-footer">
              {{item.name}}
            </div>
          </li>
        </ul> -->
        <swiper class="course-content" :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item, index) in list.course" :key="index">
            <div class="course-list">
              <div class="course-list-header" @click="goVideo(item.url)">
                <img :src="item.image" alt="">
                <span class="course-list-cover">
                  <svg viewBox="0 0 512 512" role="img" aria-label="Play">
                    <title>Play</title>
                    <g>
                      <!-- 移入svg填充渐变色 有动画效果 -->
                      <defs>
                        <linearGradient id="orange_red" x1="0%" y1="0%" x2="100%" y2="50%" >
                          <stop offset="0%" stop-color="#f05a28" stop-opacity="1" />
                          <stop offset="100%" stop-color="#e80a89" stop-opacity="1" />
                        </linearGradient>
                      </defs>
                      <path d="M255.5,512c-141.2,0-256-114.8-256-256S114.3,0,255.5,0s256,114.8,256,256S396.7,512,255.5,512z M255.5,24.4 C127.8,24.4,23.9,128.3,23.9,256s103.9,231.6,231.6,231.6c127.7,0,231.6-103.9,231.6-231.6S383.2,24.4,255.5,24.4z M194.5,134.1 v243.8L365.2,256L194.5,134.1z"/>
                    </g>
                  </svg>
                </span>
              </div>
              <div class="course-list-footer">
                {{item.name}}
              </div>
            </div>
          </swiper-slide>

          <div class="swiper-button-prev swiper-button-white" slot="button-prev">
          </div>
          <div class="swiper-button-next swiper-button-white" slot="button-next">
          </div>
        </swiper>  
      </section>
    </div>
    
    <div id="activity-barrier">
      <h3 class="activity-title">闯关列表</h3>
      <ul class="activity-barrier-content" v-if="tokenId">
        <li class="activity-barrier-list" v-for="(item, index) in data" :key="item.id">
          <h5>第 {{index+1}} 关 <span>{{item.title}}</span></h5>
          <div>
            <span class="activity-barrier-material" @click="goMateril(item.id)">下载本关课程资料</span>
            <span class="activity-barrier-unfinshed" v-if="item.isPass == 0 && item.count<2" @click="goSkill(item,index)">去闯关</span>
            <span class="activity-barrier-finshed" v-if="item.isPass == 1">
              已完成
              <span class="activity-barrier-details" @click="goDetails(item.id)">查看答题详情</span>
            </span>
            <span class="activity-barrier-finshed" v-if="item.isPass == 0 && item.count==2">
              无剩余闯关次数
              <span class="activity-barrier-details" @click="goDetails(item.id)">查看答题详情</span>
            </span>
          </div>
        </li>
      </ul>
      <div v-else id="activity-null">
        <p>请登录后查看闯关任务</p>
        <div class="activity-null-img">
          <img src="../../assets/imgs/activity/meng.png" alt="">
          <img src="../../assets/imgs/activity/qing.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {courseList} from '@/assets/js/activityConfig.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper' 
export default {
  data() {
    return {
      data: [],
      tokenId: localStorage.getItem('tokenId'),
      token: localStorage.getItem('token'),
      courseList,
      swiperOption: {  
        touchMoveStopPropagation: true,
        slidesPerView: 4,
        // notNextTick: true,
        //循环
        loop:false,
        //设定初始化时slide的索引
        // initialSlide:0,
        // scrollbarHide: true,
        // scrollbarDraggable: false,
        //自动播放
        // autoplay:true,
        // autoplay: {
        //     delay: 3000,
        //     stopOnLastSlide: false,
        //     disableOnInteraction: true,
        // },
        // 设置轮播
        // effect : 'flip',
        //滑动速度
        speed:800,
        //滑动方向
        direction : 'horizontal',
        //小手掌抓取滑动
        // grabCursor : true,
        //滑动之后回调函数
        on: {
          slideChangeTransitionEnd: function(){
            // console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
          },
        },
        //左右点击
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        //分页器设置         
        pagination: {
          el: '.swiper-pagination',
          clickable :true
        }
      }
    }
  },
  components: {
    swiper,  
    swiperSlide
  },
  methods: {
    getData() {
      this.$post(BASE_API+'pass/getPassList',
      {
        tokenId: this.tokenId
      }, {
        headers: {
          token: this.token,
        }
      })
      .then( res => {
        // handle success
        if( res.errno * 1 === 101) {
          // 处理成功
          this.data =  res.data;
        } else {
          this.$store.commit("showDialog", res.errsmg)
          // 处理其他错误码的情况
        }
      })
      .catch( err => {
        console.log(err);
        // handle error
        this.$store.commit("showDialog")
      })
    },
    goSkill(data, index) {
      if (index>0 && this.data[index-1].isPass == 0) {
        this.$store.commit("showDialog", '请先完成上一关')
        return
      }
      this.$router.push({
        path: '/skill-assessment',
        query: {
          passId: data.id,
          count: data.count
        }
      })
    },
    goDetails(id) {
      this.$router.push({
        path: '/assement-review',
        query: {
          passId: id  
        }
      })
    },
    goVideo(url) {
      console.log(url)
      this.$router.push({  //免费课程跳转
        name: 'player',
        query:{
          url
        }
      })
      // if (this.tokenId) {
      // } else {
      //   this.$router.push({
      //     path: '/login',
      //     query: {
      //       redirect_url: `/player?url=${url}`
      //     }
      //   })
      // }
    },
    goMateril(id) {
      this.$router.push({
        name: 'activityMaterial',
        query: {
          id
        }
      })
    }
  },
  created() {
    if (this.tokenId) {
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
  #activity{
    padding: 20px 60px 0;
    color: #fff;

    .swiper-wrapper{
      position: relative;
      z-index: 1;
    }

    .swiper-button-prev,
    .swiper-button-next{
      z-index: 99;
    }

    .activity-title{
      margin: 20px 0;
      font-size: 24px;
      font-weight: 400;
    }

    .activity-course-container{
      margin-top: 20px;
    }
    .activity-course-title{
      padding: 5px 0;
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 300;
    }
    .course-content{
      display: flex;
    }
    .course-list{
      width: 240px;
      // padding: 20px 20px 0;
      margin-right: 10px;
      cursor: pointer;
      background: #222;

      .course-list-header{
        width: 240px;
        height: 160px;
        padding: 20px;
        margin: 0 auto;
        position: relative;

        .course-list-cover{
          display: inline-block;
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          bottom: 20px;
          background: rgba(0,0,0,0.3);
          transition: all 0.3s ease;
          z-index: 1;
            
          svg{
            width: 60px;
            height: 60px;
            margin: 30px 0 0 70px;
            fill: #fff;

            &:hover {
              fill: url(#orange_red);
              transform: scale(1.1);
              transition: transform 0.2s ease-in-out, fill 0.2s ease;
            }
          }

        }

      }
      .course-list-footer{
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        font-size: 14px;
        border-top: 3px solid hsla(0,0%,100%,.3);
        background: #333;
      }
      img{
        width: 100%;
      }
      // p{
      //   padding: 0 5px;
      //   font-size: 14px;
      //   margin-top: 5px;
      // }
    }
    .activity-barrier-list{
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      padding: 20px;
      // height: 30px;
      background: #222;

      &:nth-child(1),
      &:nth-child(9) {
        border-bottom: 5px solid #0c9dbf;
      }
      &:nth-child(2),
      &:nth-child(10) {
        border-bottom: 5px solid #f8b721;
      }
      &:nth-child(3),
      &:nth-child(11) {
        border-bottom: 5px solid #9bc84d;
      }
      &:nth-child(4),
      &:nth-child(12) {
        border-bottom: 5px solid #90489a;
      }
      &:nth-child(5),
      &:nth-child(13) {
        border-bottom: 5px solid #23b45d;
      }
      &:nth-child(6),
      &:nth-child(14) {
        border-bottom: 5px solid #f04b51;
      }
      &:nth-child(7),
      &:nth-child(15) {
        border-bottom: 5px solid #68c5b2;
      }
      &:nth-child(8),
      &:nth-child(16) {
        border-bottom: 5px solid #dc1f26;
      }

      h5{
        height: 30px;
        font-size: 16px;
        line-height: 30px;
        font-weight: normal;
      }

      .activity-barrier-material{
        display: inline-block;
        height: 30px;
        padding: 0 15px;
        margin-right: 20px;
        font-size: 14px;
        line-height: 30px;
        border: 1px solid #f96816;
        border-radius: 5px;
        color: #f96816;
        cursor: pointer;
      }
      .activity-barrier-unfinshed{
        display: inline-block;
        height: 30px;
        padding: 0 15px;
        font-size: 14px;
        line-height: 30px;
        border: 1px solid #f96816;
        border-radius: 5px;
        color: #f96816;
        cursor: pointer;
      }
      .activity-barrier-finshed{
        display: inline-block;
        height: 30px;
        padding: 0 15px;
        font-size: 14px;
        line-height: 30px;
        color: rgb(170, 170, 170);
      }
      .activity-barrier-details{
        margin-left: 5px;
        color: #f96816;
        cursor: pointer;
        cursor: pointer;

        &:hover{
          color: #ff7b2b;
        }
      }
    }
    
    #activity-null{
      margin-top: 40px;
      font-size: 18px;
      color: #aaa;

      p{
        text-align: center;
      }
      .activity-null-img{
        margin-top: 20px;
        text-align: center;
        img{
          width: 100px;
        }
      }
    }
  }
</style>