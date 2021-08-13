<!-- tttttsssssssssss -->
<template>
  <div class="teacherInformation-background">
    <div class="teacherInformation-page">
      <section class="authorSidebar">
        <div class="teacher-picture">
          <div class="pic-content">
            <img :src="imgUrl+teacher_avatar" />
          </div>
        </div>
        <div class="teacher-name">
          <h1>
            {{teacher_name}}
            <span>
              <span class="SVGInline"><svg class="SVGInline-svg" width="19px" height="19px" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <linearGradient x1="83.5030476%" y1="83.4776509%" x2="16.5622581%" y2="15.4835043%" id="linearGradient-1">
            <stop stop-color="#E53184" offset="0%"></stop>
            <stop stop-color="#ED5539" offset="100%"></stop>
        </linearGradient>
    </defs>
    <g>
        <path d="M10.3967467,17.538356 C9.90148716,17.2962587 9.09180885,17.2995358 8.60325333,17.538356 L7.46108523,18.096681 C6.96582571,18.3387783 6.35138913,18.1336804 6.09651438,17.6533051 L5.50065619,16.5302611 C5.24228403,16.043294 4.58531429,15.5700283 4.04968959,15.4760721 L2.79748098,15.256417 C2.25450641,15.1611716 1.8779703,14.6340871 1.95412981,14.0956437 L2.13217911,12.8368454 C2.20938369,12.2910134 1.95606262,11.5219763 1.57795919,11.1311318 L0.694011182,10.2173973 C0.31071939,9.82118973 0.315907745,9.17344708 0.694011182,8.78260265 L1.57795919,7.86886816 C1.96125098,7.47266054 2.20833863,6.70159803 2.13217911,6.16315462 L1.95412981,4.90435629 C1.87692523,4.35852433 2.26185628,3.83753915 2.79748098,3.74358299 L4.04968959,3.52392786 C4.59266416,3.42868243 5.24578144,2.95011423 5.50065619,2.46973892 L6.09651438,1.34669492 C6.35488654,0.859727882 6.9725297,0.664498812 7.46108523,0.903318979 L8.60325333,1.461644 C9.09851284,1.70374127 9.90819115,1.70046417 10.3967467,1.461644 L11.5389148,0.903318979 C12.0341743,0.66122171 12.6486109,0.866319617 12.9034856,1.34669492 L13.4993438,2.46973892 C13.757716,2.95670596 14.4146857,3.4299717 14.9503104,3.52392786 L16.202519,3.74358299 C16.7454936,3.83882843 17.1220297,4.36591288 17.0458702,4.90435629 L16.8678209,6.16315462 C16.7906163,6.70898658 17.0439374,7.47802373 17.4220408,7.86886816 L18.3059888,8.78260265 C18.6892806,9.17881027 18.6840923,9.82655292 18.3059888,10.2173973 L17.4220408,11.1311318 C17.038749,11.5273395 16.7916614,12.298402 16.8678209,12.8368454 L17.0458702,14.0956437 C17.1230748,14.6414757 16.7381437,15.1624608 16.202519,15.256417 L14.9503104,15.4760721 C14.4073358,15.5713176 13.7542186,16.0498858 13.4993438,16.5302611 L12.9034856,17.6533051 C12.6451135,18.1402721 12.0274703,18.3355012 11.5389148,18.096681 L10.3967467,17.538356 Z" fill="url(#linearGradient-1)"></path>
        <g transform="translate(6.000000, 5.000000)" fill-rule="nonzero" fill="#FFFFFF">
            <path d="M3.5,6.31578947 C4.33,6.31578947 4.995,5.61052632 4.995,4.73684211 L5,1.57894737 C5,0.705263158 4.33,0 3.5,0 C2.67,0 2,0.705263158 2,1.57894737 L2,4.73684211 C2,5.61052632 2.67,6.31578947 3.5,6.31578947 Z M6.15,4.73684211 C6.15,6.31578947 4.88,7.42105263 3.5,7.42105263 C2.12,7.42105263 0.85,6.31578947 0.85,4.73684211 L0,4.73684211 C0,6.53157895 1.36,8.01578947 3,8.27368421 L3,10 L4,10 L4,8.27368421 C5.64,8.02105263 7,6.53684211 7,4.73684211 L6.15,4.73684211 Z"></path>
        </g>
    </g>
</svg></span>
            </span>
          </h1>
          <h2 v-show="false">Pluralsight Author</h2>
        </div>
        <div class="teacher-follow" v-show="false">
          <button>Follow</button>
          <div class="followers-count">
            <span>803</span>
            Followers
          </div>
        </div>
        <div class="teacher-intro">{{teacher_intro}}</div>
        <a href class="teacher-more" v-show="false">Show more...</a>
        <ul class="teacher-link" v-show="false">
          <li>
            <a href>jonathanfimlls.com</a>
          </li>
          <li>
            <a href>Linkedln</a>
          </li>
        </ul>
      </section>
      <div class="authorCourse">
        <div class="course-summary" v-show="false">
          <div class="summary-box" >
            <h3>编写内容</h3>
            <div class="summary-count">9</div>
            <div class="countlabel">天</div>
          </div>
          <div class="summary-box" >
            <h3>总评分</h3>
            <div class="summary-count">1,633</div>
          </div>
          <div class="summary-box">
            <h3>平均内容分级</h3>
            <div class="summary-count">4.5</div>
          </div>
        </div>
        <div class="courseList">
          <h2 class="courstList-title">{{teacher_name}}的课程</h2>
          <div class="courseList-box">
            <ul class="courseList-boxUl">
              <li v-for="(item,index) in course_list" :key="index" class="courseList-boxLi">
                <a href="javascript:void(0)" @click="goClassDetail(item,item.courseId)" class="boxLi-title">{{item.title}}</a>
                <div class="courseIntroduce">
                  <div>
                    <div class="crouse-icon">
                      <span class="iconfont icon-iconfontplay2"></span>
                    </div>
                    <div>课程</div>
                  </div>
                  <div v-if="item.level==1" class="spacing">
                    {{setLevel(item.level)}}
                  </div>
                    <!-- <div v-else-if="item.level==2">
                     <div class="spacing">.</div>
                    中级学者</div>
                    <div v-else-if="item.level==3">
                     <div class="spacing">.</div>
                    高级学者</div> -->
                  <div class="spacing" v-if="item.duration">{{formatDate(item.duration)}}</div>
                  <div class="spacing" v-if="item.createTime">{{item.createTime}}</div>
                  <star-rating class="spacing score-star" :star-size="15" :read-only="true" :rating="item.grade"></star-rating>
                  <!-- <div class="course_score">{{item.grade}}</div> -->
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
import StarRating from 'vue-star-rating'
import {formatDate, setLevel} from '@/assets/js/common.js'
export default {
  data() {
    return {
      imgUrl: window.CDN_URL,
      teacher_avatar:
        "https://pluralsight.imgix.net/author/lg/jonathan-mills-v2.jpg",
      teacher_name: "",
      teacher_intro:"",
      course_list: [],
      classUrl:"#"
    };
  },
  components: {
  StarRating
},
  created(){
    this.getTeacherdata(this.$route.query.teacherid)
  },
  methods:{
    ...{setLevel, formatDate},
    goClassDetail(item,id){
      if(item.price==0){
        this.$router.push({
              name:"classdetail",
              query:{
                  id
              }
          })
      }else{
        this.classUrl=item.courseUrl
      }
    },
   getTeacherdata(teacherid) {
      this.$post(
          window.BASE_API+"teacher/information",
        {
          "token_id": localStorage.getItem('tokenId'),
          "teacherId":teacherid
        },
        {
          headers: {
            token:localStorage.getItem('token')
          }
        }
      )
        .then((res)=> {
          console.log(res);
          // handle success
          if (res.errno == 101) {
            // 处理成功
            // res.data.data
            console.log(res);
            this.course_list=res.data.listCourse;
            this.teacher_avatar=res.data.teacherAvatar;
            this.teacher_name=res.data.teacherName;
            this.teacher_intro=res.data.intro;

            // this.changeDuration()
          } else {
            this.$store.commit("showDialog", res.errsmg)
            // 处理其他错误码的情况
          }
        })
        .catch(function(err) {
          console.log(err)
          // handle error
          // alert('服务器错误请稍后重试。。。')
          this.$store.commit("showDialog")
        });
    },
    changeDuration(){
      this.course_list.map(function(item){
          item.duration=formatDate(item.duration)
            })
    }
  }
};
</script>

<style lang="scss" scoped>
.course_score {
  margin-left: 4px;
  line-height: 20px;
}
.teacherInformation-background {
  background-color: #181818;
  box-sizing: border-box;
  text-size-adjust: 100%;
  line-height: 1.71429;
}
.crouse-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
}
.iconfont{
  fill: currentcolor;
  width: 16px;
  height: 16px;
  font-size: 13px;
}
.spacing {
  margin: 0 8px;
  &:after{
    content: '·';
    margin-left: 5px;
  }
  &:last-child:after{
    display: none;
  }
}
.score-star {
  line-height: 11px;
  margin-top: 2px;
}
.courseIntroduce{
  vertical-align: middle;
}
.courseIntroduce div {
  float: left;
  vertical-align: middle;
}
.courseIntroduce::after {
  content: "";
  display: block;
  clear: both;
}
.courseIntroduce {
  color: #aaaaaa;
  font-size: 14px;
  margin-top: 5px;
}
.courseList-boxLi a {
  font-size: 16px;
  font-weight: normal;
  color: white !important;
  margin-right: 30px;
}
.boxLi-title:hover {
  text-decoration: underline !important;
}
.courseList-boxLi {
  padding: 20px 0;
  border-bottom: 1px solid #181818;
}
.courseList-boxUl {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: start;
}
.courseList-box {
  padding: 0px 24px 16px 24px;
  background-color: #222;
}
.courstList-title {
  text-align: start;
  margin-bottom: 24px;
  font-size: 18px;
  font-weight: 300;
}
.authorCourse {
  padding: 24px 24px 24px 8px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 300px);
  float: left;
}
.course-summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  min-height: 178px;
}
.course-summary .summary-box {
  border-left: 1px solid #5b5b5b;
  flex: 1;
  text-align: start;
  padding: 0 24px;
}
.course-summary h3{
  color: #9b9b9b;
  font-size: 17px;
  margin-bottom: 24px;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 18px;
  line-height: 1;
}
.countlabel{
  color: #626262;
    font-weight: 550;
    margin: 2px 0;
    line-height: 1;
}
.summary-count {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
}
.course-summary p {
  color: #626262;
  font-weight: 500;
  margin: 2px 0;
  line-height: 1;
}
.teacher-link {
  margin-top: 48px;
  text-align: start;
}
.teacher-link a {
  color: #ffffff !important;
}
.teacher-more {
  text-decoration: none;
  color: #f96816;
  position: absolute;
  left: 24px;
  display: block;
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 300;
}
.teacher-intro {
  font-size: 15.84px;
  font-weight: 450;
  line-height: 1.5;
  margin: 0 0 8px;
  text-align: start;
}
.teacher-follow {
  margin-bottom: 24px;
  position: relative;
  height: 72px;
  width: 150px;
}
.teacher-follow button {
  margin: 0 0 8px;
  width: 130px;
  height: 40px;
  color: #fff;
  font-weight: 600;
  background-color: #ff7b39;
  position: absolute;
  left: 0;
}
.followers-count {
  display: block;
  font-size: 15.84px;
  position: absolute;
  left: 0;
  bottom: 0;
}
.followers-count span {
  font-weight: 600;
}
.teacher-name {
  margin-bottom: 16px;
  width: 160px;
}
.teacher-name h1 {
  font-size: 25px;
  margin-bottom: 2px;
  font-weight: 100;
  line-height: 1.1;
  text-align: center;
}
.teacher-name h2 {
  font-size: 15.84px;
  text-align: start;
}
.teacherInformation-page {
  width: 1440px;
  height: 1500px;
  padding-top: 14px;
  color: #fff;
}
.authorSidebar {
  font-weight: 200;
  flex: 0 0 300px;
  width: 300px;
  padding: 24px 16px 24px 24px;
  color: #fff;
  height: 1139px;
  float: left;
}

.teacher-picture {
  margin-bottom: 16px;
  position: relative;
  height: 160px;
}
.pic-content {
  display: inline-block;
  text-align: center;
  width: 160px;
  height: 160px;
  font-size: 30px;
  overflow: hidden;
  border-radius: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
.pic-content img {
  max-width: 100%;
  vertical-align: middle;
}
</style>