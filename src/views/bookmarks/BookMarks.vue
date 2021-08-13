<template>
  <div id="bookmarks">
    <div class="main">
      <main>
        <h1 class="title">收藏列表</h1>
        <div class="tablist">
          <button
            class="courses"
            v-for="(item,index) in tabList"
            :key="index"
            @click="tabChange(index)"
          >
            <div :class="[{tabnames: curtab==index},'tabname']">
              {{item.tabname}} ({{count}})
              <span :class="[{tablines: curtab==index },'tabline']"></span>
            </div>
          </button>
        </div>
        <div class="tableMargins">
          <div class="tabPanel">
            <div class="bookmarkTitle">
              <div class="bookmarkContainer">
                <div class="marktitle" style="flex:3 1 0%">课程名称</div>
                <div class="marktitle">级别</div>
                <div class="marktitle">时间</div>
                <div class="marktitle">老师</div>
                <div class="marktitle">创建时间</div>
              </div>
            </div>
            <div v-if="count>0">
              <div class="bookmarkContainer" v-for="item in bookmarks_list" :key="item.index">
                <div class="container" style="flex:3 1 0%">
                  <span class="containerspan">
                    <!-- 播放器 点击跳转player -->
                    <!-- <a class="containerlink" @click.prevent="playDetails(item[index].courseId,item[index].price,item[index].courseUrl)" > -->
                    <a class="containerlink">
                      <svg viewBox="0 0 512 512" role="img" aria-label="Play">
                        <title>Play</title>
                        <g>
                          <path
                            d="M255.5,512c-141.2,0-256-114.8-256-256S114.3,0,255.5,0s256,114.8,256,256S396.7,512,255.5,512z M255.5,24.4
C127.8,24.4,23.9,128.3,23.9,256s103.9,231.6,231.6,231.6c127.7,0,231.6-103.9,231.6-231.6S383.2,24.4,255.5,24.4z M194.5,134.1
v243.8L365.2,256L194.5,134.1z"
                          />
                        </g>
                      </svg>
                    </a>
                  </span>
                  <div class="courseTitleCell">
                    <a @click.prevent="studyDetails(item.courseId)">{{item.title}}</a>
                  </div>
                </div>
                <div class="container" >{{setLevel(item.level) || ''}}</div>
                <div class="container" >{{formatDate(item.duration) || ''}}</div>
                <div class="container">
                  <span class="teacherSpan">
                    <a
                      @click.prevent="teacherDetaiils(item.teacher.teaId)"
                      class="teacherLink"
                      v-if="item.teacher&&item.teacher.nickName"
                    >{{item.teacher.nickName || ''}}</a>
                  </span>
                </div>
                <div class="container" >{{item.createTime || ''}}</div>
              </div>
            </div>

            <div class="emptyState" v-else>
              <span class="defaultStyle">
                <svg viewBox="0 0 512 512" role="img">
                  <title>收藏夹</title>
                  <g>
                    <path
                      d="M371.2,25.6c28.3,0.1,51.2,23.2,51.2,51.1v25.7h-77V128H448V77c0-42.6-34.4-77-76.9-77H140.9 C98.4,0,64,34.5,64,77v435l128-128l128,128l0.1-435.3C320.1,48.6,343,25.8,371.2,25.6z M294.5,77v25.4L294.4,448L192,345.6 L89.6,448V76.7c0-28.2,23.1-51.1,51.4-51.1h173.1C301.9,39.2,294.5,57.3,294.5,77z"
                    />
                  </g>
                </svg>
              </span>
              <p>这里是空的。</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import { formatDate, setLevel } from "@/assets/js/common.js";
export default {
  data() {
    return {
      tabList: [
        {
          tabname: "课程"
        }
        //注释取消可恢复tablist切换，有过渡动画效果
        // {
        //   tabname: "模块",
        //
        // }
      ],
      curtab: 0,
      bookmarks_list: [],
      count: ""
    };
  },
  created() {
    var that = this;
    this.$post(
      BASE_API+"homeLogin/getBookmarkCourse",
      {
        "token_id": localStorage.getItem('tokenId'),
      },
      {
        headers: {
          token:localStorage.getItem('token')
        }
      }
    )
      .then(function(res) {
        // handle success
        console.log(res);
        if (res.errno === 101) {
          // 处理成功
          that.bookmarks_list = res.data.bookmarks_list;
          that.count = res.data.bookmarks_list.length;
        } else {
          this.$store.commit("showDialog", res.errsmg)
          // 处理其他错误码的情况
        }
      })
      .catch(function(err) {
        // handle error
        console.log(err);
        this.$store.commit("showDialog", '服务器错误请稍后重试。。。')
      });
    if (this.count == 0) {
    }
  },
  methods: {
    tabChange(index) {
      this.curtab = index;
    },
    ...{ formatDate, setLevel },
     /**
     * 跳转player页
     */
    playDetails(courseId,price,courseUrl){
      if(price==0){
        this.$router.push({
          name: "player",
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
      // console.log(courseId)
      this.$router.push({name: 'classdetail', query: {id: courseId}});
    },
     /**
     * 跳转老师详情页
     */
    teacherDetaiils(teacherId){
      this.$router.push({name: 'teacherInformation', query: {teacherid: teacherId}});
    }
  },
  beforeRouteEnter (to, from, next) {
    // 路由守卫 当在本地能够获取用户登录信息后，进入个人主页
    if (!localStorage.getItem('tokenId')) {
      next({path: '/'})
    } else {
      next();
    }
  },
};
</script>   
<style lang="scss" scoped>
#bookmarks{

  .main {
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    main {
      margin: 15px 30px 0 30px;
      font-size: 14px;
    }
  }
  .title {
    display: inline-block;
    font-size: 26px;
    margin: 0;
    padding: 0;
    color: #fff;
    line-height: 1.2;
    letter-spacing: -0.015em;
    font-weight: 300;
  }
  .tablist {
    display: flex;
    width: 100%;
    height: 64px;
    border-bottom: 1px solid rgb(54, 54, 54);
    button {
      font-size: 100%;
      line-height: 1.15;
      outline: none;
    }
  }
  .courses {
    height: 100%;
    cursor: pointer;
    color: rgb(170, 170, 170);
    padding: 0px calc(24px);
    font-size: 100%;
  }
  .courses:first-child {
    padding-left: 0;
  }
  .tabname {
    position: relative;
    display: flex;
    height: calc(100% + 1px);
    align-items: center;
    margin-bottom: -1px;
    padding: 0px 0px 4px;
    transition: color 100ms linear 0s;
    .tablines {
      position: absolute;
      left: 0px;
      right: 0px;
      bottom: 0px;
      width: 100%;
      display: block;
      height: 4px;
      opacity: 1;
      background-color: #f96816;
    }
  }

  .tabline {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    width: 100%;
    display: block;
    height: 0px;
    opacity: 0;
    transition: height 300ms ease-in-out 0s, opacity 300ms ease-in-out 0s;
  }
  .courses:hover span {
    height: 4px;
    opacity: 1;
    background-color: rgb(170, 170, 170);
  }
  .courses:hover .tabname {
    font-weight: 500;
    color: rgb(255, 255, 255);
  }
  .courses:hover .tablines {
    height: 4px;
    opacity: 1;
    background-color: #f96816;
  }

  .courses .tabnames {
    color: rgb(255, 255, 255);
  }
  .tableMargins {
    margin: 0 30px 0 30px;
  }
  .bookmarkTitle {
    width: 100%;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: rgb(170, 170, 170);
  }
  .bookmarkContainer:first-child {
    border-top: none;
  }
  .bookmarkContainer {
    display: flex;
    width: 100%;
    border-top: 1px solid rgb(54, 54, 54);
  }
  .marktitle {
    display: flex;
    flex: 1 1 0%;
    font-size: 12px;
    line-height: 16px;
    color: rgb(170, 170, 170);
    align-items: flex-end;
    justify-content: left;
    padding: 12px calc(8px);
    border-style: none;
  }
  .marktitle:first-child {
    padding-left: 0;
  }
  .container {
    letter-spacing: 0.06rem;
    color: #fff;
    display: flex;
    text-align: left;
    align-items: center;
    justify-content: left;
    padding: 12px calc(8px);
    overflow: hidden;
    flex: 1 1 0%;
    .containerlink {
      cursor: pointer;
      text-decoration: none;
    }
  }
  .container:first-child {
    padding-left: 0;
  }
  .containerspan {
    transition: all 0.2s ease-in-out;
    display: block;
    margin: 0 24px 0 2px;
    height: 21px;
    width: 21px;
    line-height: 1em;
    svg {
      height: 21px;
      width: 21px;
      fill: rgb(170, 170, 170);
    }
  }
  .containerspan:hover svg {
    fill: #fff;
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out, fill 0.2s ease;
  }
  .courseTitleCell {
    display: flex;
    flex-direction: column;
    outline: none;
  }
  .courseTitleCell a {
    outline: none;
    color: #fff;
    cursor: pointer;
  }
  .teacherSpan a{
      outline: none;
      color: #fff;
      cursor: pointer;
  }
  .emptyState {
    padding-top: 100px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    margin: 0 20px auto;
    color: #fff;
    span {
      display: block;
      margin-bottom: 20px;
    }
    svg {
      height: 50px;
      width: 50px;
      fill: #f96816;
    }
  }
}
</style>