<template>
  <div id="scourse">
    <h4 id="scourse-title">课程</h4>
    <div id="scourse-content">
      <!-- 最新课程 -->
      <!-- 使用 better scroll -->
      <div id="scourse-container" ref="scroll">
        <!-- <ul id="scourse-wrapper" ref="oWrapper">
          <li class="new-list" v-for="(item, index) in new_course_list" :key="index" ref="list">
            <p class="new-list-tips">
              <img src="@/assets/imgs/search/video.png" alt="">
              课程
              <span>NEW!</span>
            </p>
            <h4 @click="goCourseDetails(item)">{{item.title}}</h4>
            <p v-if="item.teacher&&item.teacher.nickName">{{item.teacher.nickName}}</p>
            <p>
              <span>{{item.createTime}}</span>
              <span>{{setLevel(item.level)}}</span>
            </p>
          </li>
        </ul>
        <span v-show="leftTag" id="scourse-prev" class="scourse-arrow" @click="scrollLeft">
          <img src="@/assets/imgs/search/left-icon.png" alt="">
        </span>
        <span v-show="rightTag" id="scourse-next" class="scourse-arrow" @click="scrollRight">
          <img src="@/assets/imgs/search/right-icon.png" alt="">
        </span> -->
       
        <swiper id="scourse-wrapper" :options="swiperOption" ref="mySwiper">
          <swiper-slide class="new-list" v-for="(item, index) in new_course_list" :key="index">
            <div  >
              <p class="new-list-tips">
                <img src="@/assets/imgs/search/video.png" alt="">
                课程
                <span>NEW!</span>
              </p>
              <h4 @click="goCourseDetails(item)">{{item.title}}</h4>
              <p v-if="item.teacher&&item.teacher.nickName">{{item.teacher.nickName}}</p>
              <p>
                <span>{{item.createTime}}</span>
                <span>{{setLevel(item.level)}}</span>
              </p>
            </div>
          </swiper-slide>

          <div id="scourse-prev" class="swiper-button-prev scourse-arrow" slot="button-prev">
            <img src="@/assets/imgs/search/left-icon.png" alt="">
          </div>
          <div id="scourse-next" class="swiper-button-next scourse-arrow" slot="button-next">
            <img src="@/assets/imgs/search/right-icon.png" alt="">
          </div>
        </swiper>  
      </div>

      
      <!-- 课程列表 -->
      <div>
        <course-list v-for="item in course_list" :key="item.courseId" :data="item"></course-list>
      </div>
    </div>

    <div v-if="course_list.length>10" id="scourse-more">查看全部{{course_list.length}}个课程 ></div>

  </div>
</template>

<script>
import courseList from './CourseListTpl.vue'
import { setLevel } from '@/assets/js/common.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper' 

export default {
  data() {
    return {
      // courseList: this.course_list.slice(0,10),
      courseList: this.course_list,
      leftTag: false,
      rightTag: this.new_course_list.length > 3,
      swiperOption: {  
        scrollbar: {
          hide: true,
          scrollbarHide: true,
          scrollbarDraggable: false,
        },
        slidesPerView: 3,
          notNextTick: true,
          //循环
          loop:true,
          //设定初始化时slide的索引
          initialSlide:0,
          scrollbarHide: true,
          scrollbarDraggable: false,
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
  props: ['course_list', 'new_course_list', 'total_count'],
  components: {
    courseList,
    swiper,  
    swiperSlide
  },
  computed: {
    // 计算滚动条整体的宽度
    scrollWidth() {
      if(this.$refs.list.length > 0){
        return this.$refs.list[0].offsetWidth * this.$refs.list.length;
      } else {
        return 0;
      }
    },
    clientWidth(){
      return this.$refs.oWrapper.clientWidth
    },
    width() {
      if(this.$refs.list.length > 0){
        return this.$refs.list[0].offsetWidth;
      } else {
        return 0;
      }
    }
  },
  methods: {
    ...{setLevel},
    scrollRight() {
      this.leftTag = true;
      let i = 0;
      let timer = setInterval(() => {
        i += 1;
        if(i === 10){    
          window.clearInterval(timer);    
        }
        this.$refs.oWrapper.scrollBy(this.width/10,0);
      }, 30)
    },
    scrollLeft() {
      let left = this.$refs.oWrapper.scrollLeft
      if(left === 0) {
        return
      }
      let i = 0;
      var timer = setInterval(() => {
        i += 1;
        if(i === 10){    
          window.clearInterval(timer);    
        }
        this.$refs.oWrapper.scrollBy(-this.width/10,0);

      }, 30)
      if(left < this.width) {
        this.leftTag = false
      }
    },
    goCourseDetails(_data) {
      this.$router.push({
        name: 'classdetail',
        query: {
          id: _data.courseId
        }
      })
    }
  },
  created() {
    
  },
  mounted() {
    // this.init()
    // console.log(this.$refs.list[0].offsetWidth * this.$refs.list.length)
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/base.scss';
  // .swiper-wrapper{
  //   margin: 0 30px!important;
  //   width: auto!important;
  //   padding: 0 30px;
  // }
  .swiper-container{
    padding: 0 30px;
  }
  #scourse{
    color: $fontColorWhite;
    .swiper-container::-webkit-scrollbar {
      display:none
    }
    .swiper-container::-moz-scrollbar {
      display:none
    }
    .swiper-container::-ms-scrollbar {
      display:none
    }

    #scourse-title{
      margin: 24px 0px 12px;
      font-size: 14px;
      font-weight: normal;
    }
    #scourse-content{

      #scourse-container{
        width: 100%;
        position: relative;
        transition: all 0.5s ease;
        // overflow: hidden;
        // white-space: nowrap;
      
      .scourse-arrow{
          display: inline-block;
          width: 40px;
          height: 40px;
          margin-top: -20px;
          border-radius: 50%;
          background: #555555;
          position: absolute;
          top: 50%;
          cursor: pointer;
  
          &:hover{
            background: rgba(85,85,85,0.8);
          }
          img{
            width: 14px;
            margin: 12px;
          }
        }
        #scourse-prev{
          left: 0;
        }
        #scourse-next{
          right: 0;
        }
      }

      #scourse-wrapper{
        // display: inline-block;
        display: flex;
        width: 100%;
        overflow-x: scroll;
        transition: all 0.5s ease;

        .new-list{
          // display: inline-block;
          // min-width: calc(33.3333%);
          width: 33.3%;
          padding: 20px 18px 22px;
          margin-right: 1px;
          background: $fontColor;
          cursor: pointer;

          &:hover{
            h4{
              text-decoration: underline;
            }
          }

          .new-list-tips{
            font-size: 12px;
            line-height: 1.5;
            // vertical-align: middle;
            color: $grayColor;
            overflow: hidden;

            img{
              float: left;
              width: 14px;
              margin-top: 3px;
              margin-right: 5px;
            }
            span{
              margin-left: 6px;
              padding: 1px 6px;
              line-height: 22px;
              font-size: 10px;
              font-weight: 500;
              font-style: italic;
              font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
              border: 1px solid rgb(255, 194, 0);
              border-radius: 2px;
              color: rgb(255, 194, 0);
            }
          }
          h4{
            margin-top: 8px;
            font-size: 18px;
            font-weight: 500;
          }
          p{
            margin-top: 8px;
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
      }
    }

    #scourse-more{
      padding: 10px 0 0;
      font-size: 12px;
      color: $fontColorWhite;

      &:hover{
        text-decoration: underline;
      }
    }
  }
</style>