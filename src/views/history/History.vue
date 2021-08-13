<template>
  <div id="history-page" > 
    <div class="history-header">学习历史</div>
    <div class="history-back" @click="historyReturn"> &lt; 返回首页</div>
    <div id="history-table">
      <div class="history-title-bar">
        <div class="history-title" style="flex: 4 1 0%;"></div>
        <div class="history-title" style="flex: 40 1 0%;">标题</div>
        <div class="history-title" style="flex: 9 1 0%;">分类</div>
        <div class="history-title" style="flex: 9 1 0%;">播放时间</div>
        <div class="history-title" style="flex: 10 1 0%;">上次观看时间</div>
        <div class="history-title" style="flex: 4 1 0%;"></div>
      </div>
      <div class="history-text-content" v-for="(item,index) in history_arr" :key="index">
        <div class="history-icon" style="flex: 4 1 0%;" >
          <a href="javascript:void(0)">
            <span class="history-playIcon">
              <svg viewBox="0 0 512 512" role="img" aria-label="Play" class="reduced-icon">
                <title>Play</title>
                <g class="history-playIcon">
                  <path d="M255.5,512c-141.2,0-256-114.8-256-256S114.3,0,255.5,0s256,114.8,256,256S396.7,512,255.5,512z M255.5,24.4C127.8,24.4,23.9,128.3,23.9,256s103.9,231.6,231.6,231.6c127.7,0,231.6-103.9,231.6-231.6S383.2,24.4,255.5,24.4z M194.5,134.1v243.8L365.2,256L194.5,134.1z"></path>
                </g>
              </svg>
            </span>
          </a>
        </div>
        <div class="history-content-item" @click="historyCourse(item.courseId)" id="content-title" style="flex: 40 1 0%;">
          <a href="javascript:void(0)" class="tableCourseLink---1pW0K">{{item.title}}</a>
        </div>
        <div class="history-content-item" style="flex: 9 1 0%;">{{item.mark}}</div>
        <div class="history-content-item" style="flex: 9 1 0%;" id="content-duration">{{formatDate(item.duration)}}</div>
        <div class="history-content-item" style="flex: 10 1 0%;" id="content-lastViewed">{{item.courseLastTime}}</div>
        <div data-css-uunkbn="" class="history-more-content" style="flex: 4 1 0%;">
          <div class="history-futher">
            <button class="history-more-btn" title="More Options">
              <div class="history-more-options" aria-label="More Options">
                <svg class="history-more-sv" role="img" aria-label="more icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 14.5c-1.1046 0-2-.8954-2-2s.8954-2 2-2 2 .8954 2 2-.8954 2-2 2zm12 0c-1.1046 0-2-.8954-2-2s.8954-2 2-2 2 .8954 2 2-.8954 2-2 2zm-6 0c-1.1046 0-2-.8954-2-2s.8954-2 2-2 2 .8954 2 2-.8954 2-2 2z"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/assets/js/common.js'
export default {
  name:'history',
  data() {
    return {
      history_arr:[],
    }
  },
  methods: {
    ...{formatDate},
    historyReturn(){
      this.$router.push('/home')
    },
    historyCourse(_id){
      this.$router.push({
        name: 'classdetail',
        query: {
          id: _id
        }  
      })
    },
    historyPlayer(){
      this.$router.push('/player')
    }
  },
  created() {
    var that = this;
    this.$post(
      BASE_API+"homeLogin/getBrowseHistoryCourse",
      {
        "token_id": localStorage.getItem('tokenId'),
      },
      {
        headers: {
          token:localStorage.getItem('token')
        }
      }
    ).then((res)=>{
       if (res.errno == 101) {
            // 处理成功
            // res.data.data
            console.log(res)
            this.history_arr = res.data.history_list;
            console.log(this.history_arr);
          } else {
            // alert(errsmg);
            // 处理其他错误码的情况
            this.$store.commit("showDialog", res.errsmg)
          }
    }).catch( err => {
      this.$store.commit("showDialog")
    })
     
  },
  beforeRouteEnter (to, from, next) {
    // 路由守卫 当在本地能够获取用户登录信息后，进入个人主页
    if (!localStorage.getItem('tokenId')) {
      next({path: '/'})
    } else {
      next();
    }
  },
}
</script>
<style lang="scss" scoped>
  #history-page{
    padding:20px;
    background:#181818;
    font-family: Gotham SSm A,Gotham SSm B,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
    font-size:14px;
  }
  .history-header{
    font-size: 1.71429rem;
    line-height: 1;
    color: #fff;
    font-weight: 300;
    display: inline-block;
    margin:0px 0px 24.0001px;
    font-family: Gotham SSm A,Gotham SSm B,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
    font-size:24px;
    position: absolute;
    left: 3%;
  }
  .history-back{
    float: right;
    right: 0;
    text-align: right;
    font-size: 12px;
    font-weight: 600;
    font-family: Gotham SSm A,Gotham SSm B,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
    color:#efefef;
    padding:20px;
    cursor:pointer;
  }
 .history-back:hover{
    color: #F96816
  }
 .history-icon a {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
}

.history-content-item a {
    background-color: transparent;
    text-decoration: none;
    color: #aaa;
    padding-left:17px;
}
.history-playIcon{
  display:table-cell;
  width:38px;
  height:21px;
  color:white;
  padding: 15px 8px 12px 8px;
  
  
}
  #content-duration{
  padding-right:3px;
}
  #content-lastViewed{
  padding-right:20px;
}
  .reduced-icon{
  transition: all 0.3s;
  fill: #AAAAAA;
}
  .reduced-icon:hover{
  transform: scale(1.1);
  fill:#fff;
}

  .history-title-bar:first-child{
    border-top-width: initial;
    border-top-style: none;
    border-top-color: initial;
}
  .history-title-bar{
    width: 100%;
    display: flex;
    border-top: 1px solid rgb(54, 54, 54);
}
  .history-title{
    display: flex;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
    color: rgb(170, 170, 170);
    text-align: left;
    align-items: flex-end;
    justify-content: left;
    padding: 12px calc(8px);
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    background: none;
  }
  .history-text-content{
    width: 100%;
    display: flex;
    border-top: 1px solid rgb(54, 54, 54);
  }
  .history-content-item{
    color:#AAAAAA;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    text-align: left;
    -webkit-box-align: center;
    align-items: center;
    justify-content: left;
    padding: 12px calc(5px);
    overflow: hidden;
    flex: 1 1 0%;
  }
  .history-content-item a:hover{
    cursor:pointer;
    color:#ffffff;
    text-decoration:underline;
  }
  .history-more-content {
    text-align: left;
    overflow: visible;
    padding-top:12px;
}
  .history-futher{
    position: relative;
    cursor: pointer;
}
  .history-more-btn{
    pointer-events: all;
    font-size: 12px;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.8);
    padding: 0px;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    background: none;
    transition: all 300ms ease 0s;
}
  .history-more-options{
    display: inline-block;
    height: 24px;
    width: 24px;
    line-height:24px;
}
  .history-more-sv{
    fill:#fff;
    display: none
}

</style>