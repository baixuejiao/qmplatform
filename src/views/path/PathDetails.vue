<!-- path详情页-->
<template>
  <div id="pathDetails">
    <!-- 课程名称 -->
    <div class="course-name">
      <h1>{{path.pathName}}</h1>
    </div>
    <!-- 课程介绍、所学技能、查看成绩入口 -->
    <div class="concent-part">
      <div class="courseleft">
        <!-- 所学技能块 换成图片 -->
        <div class="related-topics">
          <img v-if="path&&path.pathImg" :src="imgUrl+path.pathImg" />
        </div>
        <!-- 课程介绍 -->
        <div class="course-introduction">
          <span>{{path.pathIntro}}</span>
        </div>
      </div>
      <!-- 查看成绩入口 （下面添加蒙版）-->
      <div class="courseright">
        <div class="cr-content">
          <h3>我们建议从：初级课程开始学习</h3>
          <div class="course-grade">
            <div class="grade-mask">
              <img class="mask-img" :src="scroeImg" />
            </div>
            <div class="skip-score">
              <p class="clickscore">想知道你对本路径掌握的程度吗？</p>
              <a title="查看" @click="goSkill()" class="skip-btn">技能测试</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 课程列表、相关信息切换tab（通过v-bind class索引赋值切换） -->
    <div class="click-tabs">
      <ul class="click-tabs-tablist">
        <li
          :class="[{tabActive:curtab==index},'click-tab']"
          v-for="(item,index) in tabList"
          :key="index"
          @click="tabChange(index)"
        >{{item.name}}</li>
      </ul>
      <!-- 课程列表 -->
      <div :class="[{clicktabpanel:curtab==1},'click-tab-panel']">
        <div>
          <section class="sec" id="accordion" v-for="(item,index) in courseList" :key="index">
            <article class="panel-content card">
              <!-- 信息头部 -->
              <header
                class="panel-header card-header"
                @click="openPanel(index)"
                data-toggle="collapse"
                :data-target="item.datatarget"
                aria-expanded="true"
                :id="item.id"
              >
                <!-- 点击显示 isTrue布尔值 切换headname左侧尖号图形-->
                <!-- <div class="mb-0"> -->
                <span :class="[item.isTrue?'span1':'panel-icon']"></span>
                <p class="paneltitles">{{item.headname}}
                  <!-- < class="panel-title">{{item.headname}}</h2> -->
                </p>
                <!-- </div> -->
              </header>
              <div :id="item.cid" class="collapse show" data-parent="#accordion">
                <div class="card-body">
                  <!-- 描述headname-->
                  <p v-html="item.headintroduce"></p>
                  <!-- 视频播放跳转 -->
                  <div class="videoPlay" v-for="item in item.videoList" :key="item.index">
                    <!-- 一个标准区域 -->
                    <div class="oneplayJump">
                      <div class="play-jump-content">
                        <!-- 背景图片 -->
                        <div class="play-jump-img">
                          <div class="play-img" :style="{backgroundImage:'url('+ imgUrl + item.image+')'}"></div>
                          <div class="play-jump-mask">
                            <!-- 点击跳转player学习页 -->
                            <!-- <a @click.prevent="playDetails(item.price,item.courseId,item.courseUrl)"> -->
                            <a>
                              <svg viewBox="0 0 512 512" role="img" aria-label="Play">
                                <title>Play</title>
                                <g>
                                  <!-- 移入svg填充渐变色 有动画效果 -->
                                  <defs>
                                    <linearGradient
                                      id="orange_red"
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
                        <!-- 点击跳转课程详情 -->
                        <div class="video-name">
                          <span>
                            <a @click.prevent="studyDetails(item.courseId)">{{item.title}}</a>
                          </span>
                        </div>
                        <!-- 点击跳转教师信息页 -->
                        <div class="play-jump-teacher">
                          <span>
                            <a
                              @click.prevent="teacherDetaiils(item.teacher.teaId)"
                              v-if="item.teacher&&item.teacher.nickName"
                            >{{item.teacher.nickName}}</a>
                          </span>
                        </div>
                        <!-- 课程上线时间 -->
                        <div class="videoTime">{{item.createTime}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </div>
      </div>
      <!-- 相关信息页 -->
      <div :class="[{clicktabpanel:curtab==0},'click-tab-panel']">
        <div class="related-information">
          <!-- 本课将学习到的内容 -->
          <div class="related-left">
            <h2>先决条件</h2>
            <p>
              A minimal understanding of basic programming concepts needed to start this path.
              No previous JavaScript experience needed.
            </p>
            <div class="willLearn">
              <span>
                <h3>你将学习到</h3>
                <ul>
                  <li class="learnList">Basics of programming and the JavaScript syntax</li>
                  <li>JavaScript operators</li>
                  <li>Exception handling</li>
                </ul>
              </span>
            </div>
          </div>
          <!-- 老师简介 跳转老师详情页 -->
          <div class="related-right">
            <h2>老师介绍</h2>
            <ul>
              <!-- 循环老师数据li -->
              <li>
                <a href class="teacherImg">
                  <img src="https://pluralsight.imgix.net/author/lg/mark-zamoyta-v1.jpg" />
                </a>
                <div class="teacher-related">
                  <a href>Barry Luijbregts</a>
                  <div class="teacherIntrouce" style="overflow:hidden;text-overflow:ellipsis;">
                    <span>
                      Barry Luijbregts is an independent architect and software developer focused
                      on preparing business applications and solutions for the cloud cloud for the cloud cloud
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgUrl: window.CDN_URL,
      tokenId: localStorage.getItem('tokenId'),
      scroeImg: require('@/assets/imgs/path-img/skill-bg.png'),
      path: {},
      curtab: 0,
      tabList: [
        {
          name: "课程"
        }
        // {
        //   name: "相关信息"
        // }
      ],
      courseList: [
        {
          headname: "初学者",
          headintroduce: "",
          datatarget: "#collapseOne",
          id: "headingOne",
          cid: "collapseOne",
          isTrue: true,
          videoList: []
        },
        {
          headname: "中级课程",
          headintroduce:"",
          datatarget: "#collapseTwo",
          id: "headingTwo",
          cid: "collapseTwo",
          isTrue: true,
          videoList: []
        },
        {
          headname: "高级课程",
          headintroduce:"",
          datatarget: "#collapseThree",
          id: "headingThree",
          cid: "collapseThree",
          isTrue: true,
          videoList: []
        }
      ]
    };
  },
  computed: {
    historyPath() {
      return this.$store.state.myPath
    }
  },
  created() {
    this.$post(
      BASE_API+"path/getPathPageDataApi",
      {
        token_id: this.tokenId,
        pathId: this.$route.query.id
      },
      {
        headers: {
          token: localStorage.getItem('token')
        }
      }
    )
      .then(res => {
        // handle success
        if (res.errno === 101) {
          // 处理成功
          this.path = res.data.path;
          this.courseList[0].videoList = res.data.beginner_course;
          this.courseList[0].headintroduce = res.data.path.primaryIntro;
          this.courseList[1].videoList = res.data.intermediate_course;
          this.courseList[1].headintroduce = res.data.path.middleIntro;
          this.courseList[2].videoList = res.data.advanced_course;
          this.courseList[2].headintroduce = res.data.path.seniorIntro;
        } else {
          this.$store.commit("showDialog", res.errsmg)
          // 处理其他错误码的情况
        }
      })
      .catch((err) => {
        // handle error
        // alert('服务器错误请稍后重试。。。')
      });
    this.setHistoryPath();
  },
  methods: {
    /**
     * tabChange(index)传入tab索引，点击给curtab切换赋值，
     * v-bind双向数据绑定，通过动态改变tabActive类的布尔值，达到切换tab目的
     */
    tabChange(index) {
      this.curtab = index;
    },
    /**
     * 点击openPanel()切换每个courseList中isTrue的布尔值，从而切换headname左侧的尖号图形
     */
    openPanel(index) {
      this.courseList[index].isTrue = !this.courseList[index].isTrue;
    },
    /**
     * 跳转player页
     */
    playDetails(price,courseId,courseUrl){
      if(price==0){
        // this.$router.push(`/classdetail/${courseId}`);
        this.$router.push({
          name:"player",
          query:{
            courseId:courseId,
            courseUrl:courseUrl
          }
        })
      }
      else if(price==1){
        window.location.href=`courseUrl`;
      }
    },
    /**
     * 跳转课程详情
     */
    studyDetails(courseId){
      // this.$router.push(`/classdetail/${courseId}`);
      this.$router.push({
        name: 'classdetail',
        query: {
          id: courseId
        }
      })
    },
    /**
     * 跳转老师详情页
     */
    teacherDetaiils(teacherId){
      // this.$router.push(`/teacherInformation/${teacherId}`)
      this.$router.push({
        name: 'teacherInformation',
        query: {
          teacherid: teacherId
        }
      })
    },
    /**
     * 添加浏览路径
     */
    setHistoryPath() {
      if (this.historyPath.includes(this.$route.query.id * 1) || !this.tokenId) return
      this.$post(BASE_API+"path/addBrowserHistoryPath",
        {
          token_id: this.tokenId,
          pathId: this.$route.query.id
        },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      ).then(res => {
        if (res.errno * 1 === 101) {
          console.log(res.errmsg)
        } else {
          this.$store.commit("showDialog", res.errsmg)
        }
       }).catch( err => {
        this.$store.commit("showDialog")
      })
    },
    goSkill() {
      // 跳转到考试页面
      // let url = `${SKILL_URL}skill-assessment?isParts=1&partsid=${this.$route.query.id}&tokenId=${localStorage.getItem('tokenId')}`
      // window.open(url)

      if (this.tokenId) {
        if (this.path.status && this.path.status * 1 === 2) {
          this.$router.push({
            path: "/assement-review",
            query: { 
              pathId: this.$route.query.id,
            }
          });
        } else {
          this.$router.push({
            path: "/skill-assessment",
            query: { 
              pathId: this.$route.query.id,
              isParts: 1,
              status: this.path.status
            }
          });
        }
      } else {
        let _url = ''
        if(this.path.status && this.path.status * 1 === 2) {
          _url = `/assement-review?pathId=${this.$route.query.id}`
        } else {
          _url = `/skill-assessment?pathId=${this.$route.query.id}&isParts=1&status=${this.path.status}`
        }
        this.$router.push({
          path: '/login',
          query: {
            redirect_url: _url
          }
        })
      }
    }
  }
};
</script>
<style lang="scss" scoped>
// .body {
//   color: #fff;
//   min-width: 1200px;
//   margin: 0 20px;
//   padding: 0px 0 20px;
// }

#pathDetails{
  color: #fff;
  min-width: 1200px;
  margin: 0 20px;
  padding: 0px 0 20px;
  .course-name {
    display: flex;
    margin: 10px 0;
    padding-left: 50px;
  
    h1 {
      height: 40px;
      line-height: 40px;
      font-size: 24px;
      font-weight: 100;
      color: #f2f2f2;
      letter-spacing: 0.05em;
    }
  }
  .concent-part {
    display: flex;
    min-height: 400px;
    margin-bottom: 20px;
    .courseleft {
      padding: 30px;
      color: #aaa;
      background: #222;
      font-size: 14px;
      margin-bottom: 0;
      flex: 34;
      span {
        display: block;
        margin-top: 0;
        margin-bottom: 24px;
      }
    }
    h2,
    h3 {
      margin-top: 0;
      margin-bottom: 24px;
      display: block;
      font-weight: 300;
    }
    .related-topics {
      img {
        width: 150px;
      }
      .skill {
        color: #fff;
        font-size: 18px;
        font-weight: 200;
      }
      ul {
        list-style: none;
      }
    }
    li {
      display: inline;
      a {
        color: #aaa;
      }
      a::after {
        content: ", ";
      }
    }
    .course-introduction {
      margin-top: 30px;
    }
    .courseright {
      background: #222;
      margin-left: 4px;
      flex: 66;
      color: #fff;
      .cr-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 30px 45px;
        h3 {
          font-size: 18px;
          flex: 0;
        }
        .course-grade {
          flex: 1 1 270px;
          display: flex;
          position: relative;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin-bottom: 30px;
        }
      }
      .grade-mask {
        position: absolute;
        top: auto;
        left: auto;
        opacity: 0.5;
        .mask-img {
          justify-content: center;
          width: 680px;
          height: 270px;
        }
        img {
          max-width: 100%;
          vertical-align: middle;
        }
      }
      .skip-score {
        position: relative;
        margin: 40px 0 0 70px;
        text-align: center;
        .clickscore {
          color: #fff;
          font-size: 22px;
          margin-bottom: 10px;
        }
        .skip-btn {
          font-size: 14px;
          line-height: 40px;
          display: inline-block;
          background-color: #f96816;
          border: 1px solid #f96816;
          border-radius: 3px;
          color: #fff;
          cursor: pointer;
          margin: 0 0 18px;
          min-width: 120px;
          padding: 0 20px;
          position: relative;
          height: 40px;
          text-align: center;
          text-decoration: none;
          font-weight: 300;
        }
      }
    }
  }
  .click-tabs-tablist {
    margin: 0;
    border-bottom: 1px solid #2d2d2d;
    position: relative;
    top: -3px;
  }
  .click-tab {
    display: inline-block;
    border: 1px solid transparent;
    border-bottom: none;
    bottom: -1px;
    position: relative;
    list-style: none;
    color: #aaa;
    padding: 5px 4px 15px;
    margin: 0 15px 0 5px;
    cursor: pointer;
  }
  .click-tabs ul .tabActive {
    color: #fff;
    border: none;
    border-bottom: 5px solid #f05a28;
  }
  .click-tab-panel {
    display: block;
  }
  .clicktabpanel {
    display: none;
  }
  .sec {
    margin-bottom: 20px;
  }
  .panel-content {
    position: relative;
    margin-bottom: 5px;
    .panel-header {
      position: relative;
      padding: 20px 0 20px 22px;
      cursor: pointer;
      span {
        height: 10px;
        width: 10px;
        display: inline-block;
        border: 1px solid #fff;
        border-right: none;
        position: absolute;
        top: 47%;
        left: 0;
      }
      .span1 {
        border-bottom: none;
        transform: rotate(45deg);
      }
      .panel-icon {
        border-top: none;
        transform: rotate(-45deg) translateY(-6px) translateX(6px);
      }
      .paneltitles {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 0;
        .panel-title {
          font-size: 16px;
          line-height: 1.5em;
          letter-spacing: 0.05em;
        }
      }
    }
  }
  .card {
    background-color: #171717;
  }
  .card-body {
    padding-left: 0;
    padding-top: 0;
    p {
      color: #aaa;
      width: 800px;
      margin-bottom: 24px;
    }
  }
  .videoPlay {
    display: flex;
    display: inline;
  }
  .oneplayJump {
    display: inline-block;
    padding-right: 20px;
    vertical-align: top;
    margin-bottom: 20px;
    width: 25%;
    .paly-jump-content {
      width: 100%;
      text-align: left;
    }
  }
  
  .play-jump-img {
    position: relative;
    display: flex;
    height: 144px;
    justify-content: center;
    .play-jump-mask {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.5);
      z-index: 20;
      a {
        list-style: none;
        fill: #fff;
      }
      a:hover {
        fill: url(#orange_red);
        transform: scale(1.1);
        transition: transform 0.2s ease-in-out, fill 0.2s ease;
      }
      &:hover {
        opacity: 1;
        transition: opacity 300ms ease 0s;
      }
      svg {
        height: 48px;
        width: 48px;
      }
    }
  }
  .play-img {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
  .video-name {
    display: flex;
  
    a {
      color: rgb(255, 255, 255);
      max-width: 100%;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
    }
  }
  .play-jump-teacher a,
  .videoTime {
    font-weight: 400;
    line-height: 20px;
    color: rgb(170, 170, 170);
    font-size: 12px;
    list-style: none;
    letter-spacing: 0.07em;
  }
  .related-information {
    padding-top: 30px;
    display: flex;
  }
  p,
  h2,
  h3,
  ul {
    margin-top: 0;
    margin-bottom: 24px;
  }
  .related-left {
    flex: 50;
    padding-right: 20px;
    h2 {
      font-size: 18px;
      font-weight: 200;
    }
    p {
      color: #aaa;
    }
  }
  .willLearn {
    h3 {
      font-size: 18px;
      font-weight: 200;
      color: #fff;
    }
    ul {
      margin-left: 5px;
      list-style-position: inside;
      color: #aaa;
      padding-left: 16px;
      li {
        margin-bottom: 12px;
        list-style: disc;
      }
    }
  }
  .related-right {
    flex: 50;
    h2 {
      font-weight: 200;
      font-size: 18px;
    }
    ul {
      margin-left: 0;
      padding-left: 0;
      li {
        display: flex;
        border-bottom: 1px solid #2d2d2d;
        margin-bottom: 15px;
        .teacherImg {
          flex: 14;
          padding-right: 10px;
        }
        img {
          max-width: 100%;
          height: 75px;
          width: 75px;
          border-radius: 100%;
          margin-bottom: 15px;
        }
      }
    }
  }
  .teacher-related {
    flex: 86;
    a {
      color: #fff;
    }
  }
  .teacherIntrouce {
    color: #aaa;
    height: 48px;
    text-overflow: ellipsis;
  }

}
</style>