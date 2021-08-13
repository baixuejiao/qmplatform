<!-- 标签详情 -->
<template>
  <div id="tagDetails">
    <div id="tagDetails-intro">
      <img v-if="markInfo&&markInfo.url"  :src="imgUrl + markInfo.url" alt="">
      <!-- <img v-if="markInfo.url" :src="imgUrl + markInfo.url" alt=""> -->
      <!-- <img v-else src="../../assets/imgs/tagDetails/software-dev.jpg" alt=""> -->
      <div id="tagDetails-intro-info">
        <img src="../../assets/imgs/tagDetails/software-dev.png" alt="">
        <h1>提升你的 {{markInfo.title}} <span>技能</span> </h1>
        <p> {{markInfo.description}} </p>
      </div>
      <!-- <div class="tagDetails-intro-cover"></div> -->
    </div>
    <div id="tagDetails-desc" class="clearfix">
      <section>
        <img src="../../assets/imgs/tagDetails/timeline-icon.svg" alt="">
        <span>根据你的时间线学习</span>
      </section>
      <section>
        <img src="../../assets/imgs/tagDetails/master-craft-icon.svg" alt="">
        <span>精通你的技能</span>
      </section>
      <section>
        <img src="../../assets/imgs/tagDetails/emerging-trends-icon.svg" alt="">
        <span>跟上流行趋势</span>
      </section>
    </div>

    <div id="tagDatails-container">
      <section>
        <h4 class="tagDatails-container-title">热门 {{markInfo.title}} 路径</h4>
        <ul class="tagDatails-path-content">
          <li class="tagDatails-path-list" v-for="(item, index) in pathList" :key="index" @click="goPath(item)">
            <img v-if="item.pathImg" :src="imgUrl + item.pathImg" alt="">
            <div class="tagDatails-path-info">
              <span class="tagDatails-path-type">Path</span>
              <h6 class="tagDatails-path-title">{{ item.pathName }}</h6>
              <ul class="tagDatails-path-desc">
                <li>
                  <span>{{item.courseCount}}</span> Course
                </li>
                <li>
                  <span>{{formatDate(item.courseTime)}}</span>
                </li>
                <li>
                  <svg viewBox="0 0 512 512"><title>Skill IQ available</title><defs><linearGradient x1="23.812%" y1="22.445%" x2="100%" y2="100%" id="icon-datacamp-linearGradient"><stop stop-color="#F05A28" offset="0%"></stop><stop stop-color="#E80A89" offset="100%"></stop></linearGradient></defs><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill-rule="nonzero"><path d="M512,256 L512,512 L256,512 C114.615104,512 0,397.384896 0,256 C0,114.615104 114.615104,0 256,0 C397.384896,0 512,114.615104 512,256 Z" fill="url(#icon-datacamp-linearGradient)"></path><circle fill="#222222" cx="260.736" cy="260.736" r="132.736"></circle></g></g></svg>
                  获取你的技能测试
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </section>

      <section>
        <h4 class="tagDatails-container-title">热门 {{markInfo.title}} 课程</h4>
        <ul class="tagDetails-course-content clearfix">
          <li class="tagDetails-course-list" v-for="(item, index) in courseList" :key="index" @click="goCourse(item)">
            <div class="tagDetails-course-img" :style="{backgroundImage: 'url('+imgUrl+item.image+')'}">
              <!-- <img :src="imgUrl+item.image" alt=""> -->
              <span></span>
            </div>
            <div class="tagDeatils-course-info">
              <span class="tagDeatils-course-type">Course</span>
              <h6 class="tagDeatils-course-title"> {{item.title}} </h6>
              <p class="tagDeatils-course-desc">
                <span> {{item.teacher.nickName}} </span>
                <span>{{setLevel(item.level)}}</span>
                <span>{{formatDate(item.duration)}}</span>
              </p>
            </div>
          </li>
        </ul>
      </section>

    </div>
  </div>
</template>

<script>
import { setLevel, formatDate} from '@/assets/js/common.js'
export default {
  data() {
    return {
      imgUrl: window.CDN_URL,
      markId: this.$route.query.id,
      markInfo: {},
      pathList: [],
      courseList: []
    }
  },
  methods: {
    setLevel,
    formatDate,
    getData() {
      this.$store.commit("showLoading")
      this.$post(
        BASE_API + "homeNoLogin/getMarkResultListById",
        {
          markId: this.markId
        }
      )
      .then(res => {
        this.$store.commit("hideLoading")
        if (res.errno * 1 === 101) {
          this.pathList = res.data.path.slice(0,2);
          this.courseList = res.data.course;
          this.markInfo = res.data.mark
        } else {
          this.$store.commit("showDialog", res.errsmg)
        }
      })
      .catch(() => {
        this.$store.commit("hideLoading")
        this.$store.commit("showDialog")
      });
    },
    goPath(data) {
      this.$router.push({
        name: 'pathdetails',
        query: {
          id: data.pathId
        }
      })
    },
    goCourse(data) {
      this.$router.push({
        name: 'classdetail',
        query: {
          id: data.courseId
        }
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/base.scss';
  #tagDetails{
    width: 100%;

    #tagDetails-intro{
      width: 100%;
      position: relative;

      img{
        display: block;
        width: 100%;
      }
      #tagDetails-intro-info{
        width: 50%;
        padding: 120px 60px 0;
        color: #fff;
        position: absolute;
        top: 0;
        left: 0;

        img{
          width: 65px;
        }
        h1{
          margin: 10px 0;
          font-size: 40px;
          line-height: 1.2;

          span{
            display: inline-block;
            position: relative;

            &:after{
              content: '';
              display: inline-block;
              width: 100%;
              height: 10px;
              background: url('../../assets/imgs/tagDetails/line-pink.png') center no-repeat;
              background-size: contain;
              position: absolute;
              left: 0;
              bottom: 0;
            }
          }
        }
        p{
          font-size: 16px;
        }
      }
      .tagDetails-intro-cover{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0,0,0,0.3);
      }
    }
    #tagDetails-desc{
      // display: flex;
      padding: 30px 10px;
      font-size: 18px;
      color: #fff;

      section{
        // display: flex;
        float: left;
        width: 33.3333%;
        text-align: center;
        margin: 20px 0;
        line-height: 40px;
        vertical-align: middle;

        img{
          width: 40px;
          margin-right: 16px;
        }
      }
    }
    #tagDatails-container{
      overflow: hidden;
      padding: 0 60px 120px;
      background: #1f1f1f;

      .tagDatails-container-title{
        margin: 80px 0 10px;
        color: #fff;
      }
      .tagDatails-path-content{
        display: flex;
        justify-content: space-between;
      }
      .tagDatails-path-list{
        display: flex;
        width: 49%;
        padding: 5px;
        color: #fff;
        background: #181818;
        cursor: pointer;

        img{
          width: 75px;
          height: 75px;
        }
        .tagDatails-path-info{
          padding: 0 20px;
          padding-left: 20px;
          line-height: 1.0;
        }
        .tagDatails-path-type{
          font-size: 12px;
          font-weight: 700;
          color: #e6078f;
        }
        .tagDatails-path-title{
          margin: 5px 0;
          font-size: 18px;
          font-weight: 700;
        }
        .tagDatails-path-desc{
          display: flex;
          font-size: 12px;
          font-weight: 200;
          color: #858585;

          li{
            margin-right: 15px;

            span{
              font-weight: normal;
              color: #fff;
            }
          }
        }
        svg {
          width: 12px;
          height: 12px;
          margin-top: -1px;
        }
      }
      .tagDetails-course-content{
        color: #fff;
      }
      .tagDetails-course-list{
        display: flex;
        float: left;
        width: 49%;
        padding: 10px 5px;
        margin-bottom: 12px;
        background: #181818;
        cursor: pointer;

        &:nth-child(2n-1) {
          margin-right: 1%;
        }
        .tagDetails-course-img{
          width: 124px;
          height: 70px;
          overflow: hidden;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;

          span{
            display: block;
            width: 50px;
            height: 50px;
            margin: 10px auto;
            background: url('../../assets/imgs/tagDetails/playbutton@2x.png') center no-repeat;
            background-size: contain;
            
          }
        }
        .tagDeatils-course-info{
          padding-left: 15px;
          line-height: 1.0;

          .tagDeatils-course-type{
            font-size: 12px;
            font-weight: 700;
            color: #e6078f;
          }
          .tagDeatils-course-title{
            margin: 5px 0;
            font-size: 18px;
            line-height: 1.5;
            font-weight: 700;
          }
          .tagDeatils-course-desc{
            font-size: 12px;
            color: #aaa;

            span{
              &:after{
                content: '·';
                margin: 0 10px;
              }
              &:last-child:after{
                display: none;
              }
            }
          }
        }
      }
    }
  }
</style>