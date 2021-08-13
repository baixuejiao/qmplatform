<!---  star  ---->
<template>
  <div>
    <div class="clear">
      <section class="pannel">
        <div class="pannel-image">
          <div class="pannel-image-top">
            <div class="pannel-content">
              <h1 class="content-title" v-if="Localcourse">{{Localcourse.title}}</h1>
              <p class="content-second" v-if="Localcourse.teacher&&Localcourse.teacher.nickName">
                <span>
                  by
                  <a href="javascript:void(0)" v-if="Localcourse" @click="pushteacher(Localcourse.teacher.teaId)">{{Localcourse.teacher.nickName}}</a>
                </span>
              </p>
              <p v-if="Localcourse" class="content-last">{{Localcourse.describe}}</p>
              <div class="pannel-content-footer" style="display:flex" v-if="tokenId">
                <button class="likebutton" v-if="this.Localcourse.bookmarkStatus*1==1" @click="togglebook(Localcourse.bookmarkStatus,Localcourse.courseId)">已收藏</button>
                <button class="likebutton" v-else @click="togglebook(Localcourse.bookmarkStatus,Localcourse.courseId)">收藏</button>
              </div>
            </div>
            <div class="bottom-bar">
              <div class="white-bar"></div>
            </div>
          </div>
        </div>
        <div class="main-bar">
          <ul class="nav">
            <li class="nav-item" v-for="(item, index) in barlist" :key="index"  @click="clickNav(index)">
              <a :class="['nav-link',{select:tab==index}]" href="javascript:void(0)" >{{item}}</a>
            </li>
          </ul>
        </div>
        <div class="main-content">
          <div v-show="tab == 0">
            <div v-if="Localcourse.preCourseIntro" v-html="Localcourse.preCourseIntro"></div>
            <p v-else>暂无课程介绍</p>
          </div>
          <CourseList v-show="tab==1" :Localcourse="Localcourse" :Localchapters="Localchapters" :changes="changes"></CourseList>
          <Metrail v-show="tab==2" :Localcourse="Localcourse"></Metrail>
          <Comment v-show="tab==3" :userInfo="userInfo" :LocalcourseComments="LocalcourseComments" :subcomment="subcomment"></Comment>
          <Exercises v-show="tab==4" :skillList="skillList" :Localcourse="Localcourse"></Exercises>
          <Recommend v-show="tab==5" :Localcourses="Localcourses" :goCourseDetails="goCourseDetails"></Recommend>
        </div>
      </section>
      <Teacher :Localcourse="Localcourse"></Teacher>
    </div>
    
  </div>
</template>
<script>
import { formatDate, setLevel } from "@/assets/js/common.js";
import StarRating from "vue-star-rating";
// import $ from "jquery";
// import Vue from "vue";

import Recommend from './components/Recommend.vue';
import Comment from './components/CommentTpl.vue';
import Exercises from './components/Exercises.vue';
import Metrail  from './components/Metrail.vue';
import CourseList from './components/CourseList.vue';
import Teacher from './components/Teacher.vue'

export default {
  data() {
    return {
      imgUrl: window.CDN_URL,
      appraise:'0', //评论模块星星评分
      msg:'',  //评论模块文本框内容
      Localskill_list: [],  //练习题
      Localchapters: [], //章节
      Localcourse: false, //当前页面课程
      LocalcourseComments: [], //课程评论
      Localcourses: [], //推荐课程
      barlist: ["课程概述","目录", "下载", "讨论", "练习题", "推荐课程"],  //
      tab: 0,  
      LocalcourseUrl:"",  //收费课程地址
      tokenId: localStorage.getItem('tokenId') || '',
      token: localStorage.getItem('token') || ''
    };
  },
  components: {
    StarRating,
    Comment,
    Recommend,
    Exercises,
    Metrail,
    CourseList,
    Teacher
  },
  created() {
    this.getcoursedata();   //获取课程数据
    this.setHistoryCourse(); // 添加历史课程 
  },
  computed: {
    /**
     * 过滤出含有考试题章节列表展示在习题列表tab上
     */
    skillList() {
      let list = [];
      if(this.Localchapters.length>0) {
        this.Localchapters.forEach((item, index) => {
          if (item.sections&&item.sections!=null) {
            let result = item.sections.filter(element => {
              return element.status * 1 === 1
            });
            list = list.concat(result);
          }
        })
      } else {
        list = []
      }
      return list
    },
    historyCourse() {
      return this.$store.state.myCourse
    },
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    ...{ formatDate }, //引入格式化时间函数
    ...{ setLevel },  //引入格式化等级函数
    changes(index) {   //章节点击弹出下拉列表
      let newArr = this.Localchapters;
      newArr[index].isshow = !newArr[index].isshow;
      newArr = Array.from(newArr);
      this.Localchapters = newArr;
    },
    clickNav(_index) {
      this.tab = _index
    },
    addshow() {  //为章节列表添加isshow属性
      this.Localchapters.map(function(item, index, arr) {
        item.isshow = false;
        item.chapterTime = formatDate(item.chapterTime);
        // Vue.set(arr[i],item.isshow,false)
      });
    },
    // dialog(url) {   //章节点击跳转
    //   console.log(this.Localcourse.price, url);
    //   if(this.Localcourse.price!=0){  //收费课程
    //     this.LocalcourseUrl = url  //腾讯课堂地址
    //     $("#exampleModalCenter").modal("toggle");  //点击弹框
    //   }else{
    //     this.$router.push({  //免费课程跳转
    //           name: 'player',
    //           query:{
    //               url
    //           }
    //       })
    //   }
    // },
    setRating(rating){
      this.appraise = rating;
    },
    subcomment(_msg, _appraise){  //提交评论
      this.$store.commit("showLoading")
      this.$post(
        BASE_API + "course/addComment",
        {
          "courseId": this.Localcourse.courseId,
          "tokenId": localStorage.getItem('tokenId'),
          "content": _msg,
          "appraise": _appraise
        },
        {
          headers: {
            token:localStorage.getItem('token')
          }
        }
      ).then(res => {
        this.$store.commit("hideLoading")
        // handle success
        if (res.errno * 1 == 101) {
          // 处理成功
          // res.data.data
          // this.appraise = ""; //清空评分
          // this.msg = "";  //文本框内文字清空
          console.log(res);
          this.LocalcourseComments = res.data.reverse();  //将返回数据转换成数组，并倒序
          this.$forceUpdate();
          // console.log(_data)
          // this.$set(this, LocalcourseComments, _data)
        } else {
          this.$store.commit("showDialog", res.errsmg)
          // 处理其他错误码的情况
        }
      }).catch(function(err) {
        this.$store.commit("hideLoading")
        // handle error
        console.log(err)
        this.$store.commit("showDialog")
      });
    },
    togglebook(bookstate,courseId,index){  //收藏
      if(bookstate == 0){  //当前元素未收藏
        // 调用收藏接口
        this.$post(
          BASE_API+"course/goBookmarkCourse",
        {
          "token_id": localStorage.getItem('tokenId'),
          courseId
        },
        {
          headers: {
            token:localStorage.getItem('token')
          }
        }
      )
        .then(res => {
          // handle success
          if (res.errno * 1 === 101) {
            // 处理成功
            // res.data.data
            if(arguments.length == 3){  //推荐课程点击收藏
              this.Localcourses[index].bookmarkStatus = 1  //将收藏状态变为1
              console.log(res.errmsg);
                if(courseId == this.Localcourse.courseId){  //判断当前点击收藏的课程是否是本页面课程
                  this.Localcourse.bookmarkStatus = 1  //本页面课程状态变为1
                }
              
            } else {  //本页面课程点击收藏
              this.Localcourse.bookmarkStatus = 1;  //收藏状态变为1
              console.log(this.Localcourses);
              this.Localcourses.map((item)=>{  //将推荐课程列表对应课程收藏状态变为1
                if(item.courseId == this.Localcourse.courseId){
                  item.bookmarkStatus = 1
                }
              })
              
            }
            
          } else {
            // 处理其他错误码的情况
            this.$store.commit("showDialog", res.errsmg)
          }
        })
        .catch(function(err) {
          // handle error
          this.$store.commit("showDialog")
        });
      }
      else{  //已收藏课程，同上
        this.$post(
          BASE_API + "course/cancelBookmarkCourse",
        {
          "token_id": localStorage.getItem('tokenId'),
          courseId
        },
        {
          headers: {
            token:localStorage.getItem('token')
          }
        }
      )
        .then(res => {
          // handle success
          if (res.errno * 1 === 101) {
            // 处理成功
            // res.data.data
            if(arguments.length == 3){
              this.Localcourses[index].bookmarkStatus = 0
              console.log(res.errmsg);
              if(courseId == this.Localcourse.courseId){
                  this.Localcourse.bookmarkStatus = 0
                }
            }else{
              this.Localcourse.bookmarkStatus = 0;
              this.Localcourses.map((item)=>{
                if(item.courseId == this.Localcourse.courseId){
                  item.bookmarkStatus = 0
                }
              })
              console.log(this.Localcourses); 
            } 
          } else {
            // 处理其他错误码的情况
            this.$store.commit("showDialog", res.errsmg)
          }
        })
        .catch(function(err) {
          // handle error
          console.log(err)
          this.$store.commit("showDialog")          
        });
      }
    },
    toggleAll() {
      this.Localchapters.map(function(item) {
        item.isshow = !item.isshow;
      });
    },
    pushteacher(teacherid){  //跳转教师信息页面
      if (this.tokenId) {
        this.$router.push({
          name:"teacherInformation",
          query:{
            teacherid
          }
        })
      } else {
        this.$router.push('/login')
      }
    },
    getcoursedata(_id) {  //获取课程数据
      this.$store.commit("showLoading")
      this.$post(
          BASE_API + "course/getCourseDetail",
        {
          "tokenId": this.tokenId,
          "courseId": _id || this.$route.query.id
        },
        {
          headers: {
            token: this.token
          }
        }
      )
        .then(res => {
          this.$store.commit("hideLoading")
          if (res.errno * 1 === 101) {
            // 处理成功
            //将数据转换成数组，存到data
            this.Localchapters = Array.from(res.data.chapters);
            this.Localcourse = res.data.course;
            this.LocalcourseComments = Array.from(res.data.courseComments).reverse();
            this.Localcourses = Array.from(res.data.courses);
            this.addshow(); //添加isshow属性
          } else {
            this.$store.commit("showDialog", res.errsmg)
            // 处理其他错误码的情况
          }
        })
        .catch(() => {
          this.$store.commit("hideLoading")
          // alert('服务器错误请稍后重试。。。')
          this.$store.commit("showDialog")
        });
    },
    goCourseDetails(data) {
      this.getcoursedata(data.courseId)
      this.setHistoryCourse(data.courseId)
    },
    /**
     * 添加浏览历史课程
     */
    setHistoryCourse(_id) {
      if (!this.tokenId) return
      let courseid = _id || this.$route.query.id * 1
      // if (this.historyCourse.includes(courseid)) return
      this.$post(BASE_API+"course/addBrowserHistory",
        {
          token_id: localStorage.getItem('tokenId'),
          courseId: courseid
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
        console.log(err)
        this.$store.commit("showDialog")
      })
    },
    
  },
  
};
</script>
<style lang="scss" scoped>
:focus {
  outline: none;
}
button {
  color: white;
}
a {
  color: white;
}
a:hover {
  color: white;
}
.clear {
  height: calc(100vh - 62px);
  
}
.clear::after {
  display: block;
  clear: both;
  content: "";
}
.header {
  position: fixed;
  background-color: red;
  width: 100%;
  height: 64px;
}
.pannel {
  width: calc(100% - 250px);
  min-height: 100vh;
  /* height: calc(100vh - 62px); */
  background-color: rgb(51, 51, 51);
  float: left;
  border-right: 1px solid #2d2d2d;
  /* padding: 48px 40px 23px 40px; */
}
.pannel-image {
  position: relative;
  height: 356px;
  background-position: 50% 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../assets/imgs/course/bg.jpg");
  overflow: hidden;
}
.pannel-image-top {
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.3) 0%, black 100%);
  height: 356px;
  padding: 48px 40px 23px 40px;
}
.pannel-content {
  opacity: 1;
  color: white;
  // display: table-cell;
  // text-align: start;
}
.content-title {
  display:-webkit-box; //将对象作为弹性伸缩盒子
  font-size: 48px;
  line-height: 1.2;
  margin-bottom: 12px;
  overflow:hidden; //超出文本隐藏
  text-overflow:ellipsis; //溢出省略号显示
  -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式-从上到下垂直排列
  -webkit-line-clamp:2; 
  // text-overflow: ellipsis;
  // white-space: nowrap;
  // overflow: hidden;
}
.content-second {
  font-size: 1.28571rem;
  line-height: 1.33333;
  margin-bottom: 24px;
}
.content-second a {
  color: white;
}
.content-last {
  font-size: 1rem;
  line-height: 1.7em;
  padding-right: 100px;
  padding-bottom: 35px;
  margin: 0 0 24px;
}
.pannel-content-footer{
  position: absolute;
  bottom: 10px;
  left: 40px;
}
.likebutton {
  display: block;
  background-color: #f05a28;
  margin: 0 0 24px;
  height: 40px;
  width: 160px;
  padding: 0 25px;
  text-align: center;
  font-size: 1rem;
  border: 1px solid #f96816;
  border-radius: 4%;
}
.likebutton span {
  color: #efefef;
  font-weight: 700;
  margin-top: 7px;
  display: inline-block;
}
#content-rating{
  position: absolute;
  right: 24px;
  top: 24px;
}
.content-link {
  /* position: absolute;t
  
  display: block; */
  display: block;
  margin-left: 50px;
  margin-top: 9px;
}
.bookbtn {
  background-color: transparent;
  color: white;
}
.bottom-bar {
  background-color: rgb(77, 77, 77);
  width: 100%;
  height: 4px;
  position: absolute;
  left: 0;
  bottom: 0;
}
.white-bar {
  background-color: white;
  width: 7%;
  height: 4px;
  position: absolute;
  left: 0;
  bottom: 0;
}
.main-bar {
  border-bottom: 1px solid rgb(84, 84, 84);
  margin-bottom: 24px;
}
.nav-link {
  font-size: 1rem;
  line-height: 1.71429;
  color: #efefef;
  font-weight: 100;
  display: block;
  padding: 15px 0;
  margin-left: 30px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}
.select {
  color: #efefef;
  font-weight: 500;
  border-bottom-color: #f05a28;
}
.main-content {
  
  color: #efefef;
  text-align: start;
  padding: 0 25px 50px;
}
.course-godownload {
  border-radius: 10%;
  width: 50px;
  border: 1px solid #f96816;
  background-color: #f96816;
  color: #efefef;
  font-weight: 500;
}
.rating-detail svg {
  fill: rgb(255, 194, 0);
  display: inline-block;
  height: 12px;
  width: 12px;
}
.rating svg {
  fill: rgb(255, 194, 0);
  display: inline-block;
  height: 14px;
  width: 14px;
}
</style>