
<template>
  <div id="personal-base-info">
    <div id="personal-skill">
      <h1 id="personal-skill-title">技能测试</h1>
      <ul id="personal-skill-content">
        <li class="personal-skill-list" v-for="(item, index) in skill_list" :key="index">
          <img :src="imgUrl+item.pathImg" alt="">
          <h3>{{item.pathName}}</h3>
          <!-- <span class="personal-skill-btn">查看测试详情</span> -->
          <p class="personal-skill-tips">
            <span>课程：{{item.courseCount}}</span>
            <span v-if="item.courseTime">时长：{{formatDate(item.courseTime)}}</span>
          </p>
          <div class="personal-skill-wrapper">
            <span class="personal-skill-btn" @click="goSkillDetails(item)">查看测试详情</span>
          </div>
          <!-- <span class="personal-skill-date">测试日期：{{item.skill_date}}</span> -->
          <!-- <div class="personal-skill-cover">
            <p>查看测试详情</p>
          </div> -->
        </li>
        <li class="personal-skill-more" @click="goSkill()">
          <img src="@/assets/imgs/personal/plus-icon.png" alt="">
          <p>添加更多的技能测试</p>
        </li>
      </ul>
    </div>
    <div id="personal-course" v-if="courselist.length>0">
      <h1 id="personal-course-title">我的课程</h1>
      <ul id="personal-course-content">
        <li class="personal-course-list" v-for="(item, index) in courselist" :key="index">
          <h4  @click="goCourse(item)">{{item.title}}</h4>
          <p>
            <img src="@/assets/imgs/personal/video-icon.png" alt="">
            <span v-if="item.teacher && item.teacher.nickName">{{item.teacher.nickName}}</span>
            <span v-if="item.level">{{setLevel(item.level)}}</span>
            <span v-if="item.duration">{{formatDate(item.duration)}}</span>
            <span v-if="item.createTime">创建期日：{{item.createTime}}</span>
          </p>
        </li>
        <li class="personal-course-all" @click="goHistory()">查看全部</li>
      </ul>
    </div>

    <div id="personal-blog" v-if="bloglist.length>0">
      <h1 id="personal-blog-title">我的博客</h1>
      <ul id="personal-blog-content">
        <li class="personal-blog-list" v-for="(item, index) in bloglist" :key="index" @click="goBlog(item)">
          <img :src="imgUrl+item.cover">
          <div class="personal-blog-info">
            <h4>{{item.title}}</h4>
            <p>{{item.intro}}</p>
            <p class="personal-blog-date">{{item.postDate}}</p>
          </div>
        </li>
        <li class="personal-blog-more" @click="goBlogList()"> 查看全部博客 ></li>
      </ul>
    </div>

      
  </div>
</template>

<script>
import {setLevel, formatDate} from '@/assets/js/common.js'

export default {
  data() {
    return {
      imgUrl: window.CDN_URL,
    }
  },
  props: ['skill_list', 'courselist', 'bloglist'],
  computed: {
  },
  components: {
  },
  methods: {
    ...{setLevel, formatDate},
  
    /**
     * 进入history页面
     */
    goHistory() {
      this.$router.push('/history')
    },
    // 进入考试列表页面
    goSkill() {
      this.$router.push({
        name: "exercisesPath",
        // query: {
        //   tokenId: this.tokenId
        // }
      });
    },
    // 跳转到path考试页面
    goSkillDetails(item) {
      if (item.status&&item.status *1  === 2) {
        this.$router.push({
          path: "/assement-review",
          query: { 
            pathId: item.pathId,
          }
        });
      } else {
        this.$router.push({
          path: "/skill-assessment",
          query: { 
            pathId: item.pathId,
            isParts: 1,
            status: item.status
          }
        });
      }
    },
    goCourse(item) {
      // console.log(item);
      this.$router.push({
        name: 'classdetail',
        query: {
          id: item.courseId
        }
      })
    },
    goBlog(_data) {
      this.$router.push({
        name: 'blogdetail',
        query: {
          id: _data.blogId
        }
      })
    },
    goBlogList() {
      this.$router.push({
        path: '/bloglist',
        query: {
          status:2
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/base.scss';
    #personal-base-info{
      #personal-skill{
  
        #personal-skill-title{
          margin-bottom: 16px;
          font-size: 18px;
          font-weight: normal;
          color: $fontColorWhite;
        }
        .personal-skill-list{
          display: inline-block;
          width: 24%;
          min-width: 170px;
          height: 230px;
          margin-right: 1%;
          margin-bottom: 24px;
          vertical-align: top;
          position: relative;
          text-align: center;
          background: $fontColor;
          position: relative;

          &::before{
            content: '';
            display: block;
            width: 100%;
            height: 3px;
            background: -webkit-gradient(linear, left bottom, right bottom, color-stop(0%, #FFC200), color-stop(50%, #8BC53F), color-stop(100%, #26C1FB));
          }

          img{
            width: 60px;
            height: 60px;
            margin: 20px auto;
          }
          h3{
            padding: 0 16px;
            font-size: 18px;
            color: #bbb;
          }
          p{
            margin-top: 16px;
            font-size: 15px;
            color: #ffc200;
          }
          .personal-skill-wrapper{
            display: block;
            width: 100%;
            padding: 12px 6px;
            text-align: center;
            font-size: 14px;
            border-top: 1px solid #181818;
            color: #888;
            position: absolute;
            left: 0;
            bottom: 0;
          }
          .personal-skill-btn{
            display: inline-block;
            // margin-top: 25px;
            padding: 0 10px;
            height: 32px;
            line-height: 32px;
            font-size: 12px;
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
        .personal-skill-tips{
          span {
            margin-right: 8px;
          }
        }
        .personal-skill-more{
          display: inline-block;
          width: 24%;
          min-width: 170px;
          height: 230px;
          margin-right: 1%;
          margin-bottom: 24px;
          text-align: center;
          background: $fontColor;

          img{
            width: 49px;
            height: 49px;
            margin-top: 74px;
            cursor: pointer;
          }
          p{
            padding: 16px 0;
            font-size: 15px;
            color: #aaa;
          }
        }
      }
      #personal-course{
        margin-top: 20px;
        color: $fontColorWhite;
  
        #personal-course-title{
          margin-bottom: 16px;
          font-size: 18px;
          font-weight: normal;
          color: $fontColorWhite;
        }
        #personal-course-content{
          background: $fontColor;
        }
        .personal-course-list{
          margin: 0 20px;
          padding: 20px 0;
          border-bottom: 1px solid #181818;
  
          img{
            width: 15px;
            margin-right: 5px;
            vertical-align: middle;
          }
          h4{
            font-size: 16px;
            font-weight: normal;
            cursor: pointer;
            &:hover{
              text-decoration: underline;
            }
          }
          p{
            margin-top: 5px;
            font-size: 12px;
            line-height: 2.0;
            vertical-align: middle;
            color: #aaa;
          }
          span{
            display: inline-block;
            &::after{
              content: "·";
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
        .personal-course-all{
          margin: 0 20px;
          padding: 20px 0;
          font-size: 14px;
          color: #f96816;
          cursor: pointer;
        }
      }
      #personal-blog{
        margin-top: 20px;
        color: $fontColorWhite;
  
        #personal-blog-title{
          margin-bottom: 16px;
          font-size: 18px;
          font-weight: normal;
          color: $fontColorWhite;
        }
        #personal-blog-content{
          background: $fontColor;
        }
        .personal-blog-list{
          display: flex;
          margin: 0 20px;
          padding: 20px 0;
          border-bottom: 1px solid #181818;
  
          img{
            width: 120px;
            height: 120px;
          }
  
          .personal-blog-info{
            flex: 1;
            height: 120px;
            padding-left: 20px;
            line-height: 1.0;
            color: #aaa;
            position: relative;
  
            h4{
              color: #fff;
            }
          
            p{
              margin-top: 10px;
              font-size: 12px;
              cursor: pointer;
  
              &:hover{
                text-decoration: underline;
              }
            }
            .personal-blog-date{
              position: absolute;
              bottom: 0;
            }
          }
  
        }
        .personal-blog-more{
          padding: 20px;
          font-size: 14px;
          color: #f96816;
          cursor: pointer;
        }
      }
    }
  
</style>