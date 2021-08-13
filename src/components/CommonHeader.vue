<!-- 通用header  
    props:
    |------------------------------|
    | type  1-登陆后状态 2-为登陆状态  |
    |------------------------------|
-->
<template>
<div class="login-nav" v-if="witchType==1">
  <div class="ln-content">
    <a href="javascript:void(0);" @click="navHandle('0')" :class="['ln-icon',{'active':activeNav=='0'}]">
      <span class="icon">
        <SvgIcon iconName="home" iconColor="#fff"/>
      </span>
      <span class="text">首页</span>
    </a>
    <a href="javascript:void(0);" @click="navHandle('1')" :class="['ln-icon',{'active':activeNav=='1'}]">
      <span class="icon">
        <SvgIcon iconName="browse" iconColor="#fff"/>
      </span>
      <span class="text">浏览</span>
    </a>
    <div class="ln-search-bar">
      <input @keyup.13="searchHandle" v-model="loginSearchText" type="text" class="form-control ln-search" placeholder="搜索...">
    </div>
    <div class="ln-icons">
      <a href="javascript:void(0);" @click="navHandle('2')" :class="['ln-icon',{'active':activeNav=='2'}]">
      <span class="icon">
        <SvgIcon iconName="path" iconColor="#fff"/>
      </span>
      <span class="text">路径</span>
    </a>
    <a href="javascript:void(0);" @click="navHandle('3')" :class="['ln-icon',{'active':activeNav=='3'}]">
      <span class="icon">
        <SvgIcon iconName="bookmark" iconColor="#fff"/>
      </span>
      <span class="text">收藏</span>
    </a>
    <a href="javascript:void(0);" @click="navHandle('4')" :class="['ln-icon',{'active':activeNav=='4'}]">
      <span class="icon">
        <SvgIcon iconName="vip" iconColor="#fff" viewBox="0 0 1024 1024"/>
      </span>
      <span class="text">vip</span>
    </a>
    <a href="javascript:void(0);" @click="navHandle('6')" :class="['ln-icon',{'active':activeNav=='6'}]">
      <span class="icon">
        <SvgIcon iconName="blog" iconColor="#fff" viewBox="0 0 1024 1024"/>
      </span>
      <span class="text">博客</span>
    </a>
    </div>
    <div class="ln-user">
      <a href="javascript:void(0);" @click="navHandle('5')" class="profile-btn">
        <div class="avatar">
          <div>
            <img style="height:100%" :src="avatarImg" alt="">
          </div>
        </div>
        <SvgIcon iconName="darr" iconColor="rgb(170,170,170)"/>
      </a>
      <div class="menu-bar">
        <div class="menu">
          <a href="javascript:void(0);" @click="signOut">
            <span><SvgIcon iconName="out" iconColor="rgb(34, 34, 34)" viewBox="0 0 1024 1024"/></span>
            退出
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
<div v-else>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <a class="navbar-brand" href="javascript:void(0)" @click="$router.push('/')">
      <img src="@/assets/imgs/logo_2.png" alt class="logo" />
      青盟
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#common-header"
      aria-controls="common-header"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="common-header">
      <form class="form-inline mr-auto search-form" @submit.prevent>
        <div :class="['course-btn',{'open':opCourse}]" @click="openCourse">
          <font>课程</font>
          <i class="icons" icon="down-arrow"></i>
        </div>
        <input
          class="mr-sm-2 search-ipt"
          type="search"
          placeholder="你想学习什么？"
          aria-label="Search"
          v-model="searchText"
          v-on:keyup="getSeatch()"
        />
      </form>
      <ul class="navbar-nav">
        <li class="nav-item active" @click="$router.push('/bloglist')">
          <a class="nav-link" href="javascript:void(0)">博客</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="javascript:void(0)" @click="$router.push('/login')">登录</a>
        </li>
        <li class="nav-item active register">
          <a class="nav-link" href="javascript:void(0)" @click="$router.push('/register')">注册</a>
        </li>
      </ul>
    </div>
  </nav>
   <NavDrop :searchText="searchText" :isShow="showType" :searchList="searchList" @closeHandle="closeDrop"/>
</div>
  
</template>

<script>
import NavDrop from "@/components/NavDrop.vue"
import SvgIcon from "@/components/SvgIcon.vue"
import { setTimeout, clearTimeout } from 'timers';
import { mapMutations } from 'vuex'
export default {
  props:["type"],
  data() {
    return {
      navChild:{
        "/":["/"],
        "/browse":["browse"],
        "/paths":["paths","pathdetails"],
        "/bookmarks":["bookmarks"],
        "/employ":["employ"],
        '/personal':['personal'],
        "/bloglist":["bloglist","blogdetail","createblog"]
      },
      navLink:["/home","/browse","/paths","/bookmarks","/employ",'/personal',"/bloglist"],
      activeNav:"0",
      showType:0,
      opCourse:false,
      searchText:"",
      timer:null,
      searchList:{course:[],path:[]},
      loginSearchText: '',
      searchType:1
    }
  },
  components:{
    NavDrop,
    SvgIcon
  },
  created() {
    this.checkNavLink()
  },
  methods:{
    ...mapMutations(['setHeaderTag']),
    checkNavLink(){
      /**
       * 刷新后仍保持当前导航按钮状态
       * 在不增加导航按钮的情况下 只需要在navChild对应的导航的数组内填入响应的路径名称（去除‘/’） 
       */
      let nowPath = "";
      let thisNav = "";
      if(location.pathname=="/"){
        nowPath = "/";
      }else{
        nowPath = location.pathname.split("/")[1];
      }
      for(let item in this.navChild){
        if(this.navChild[item].indexOf(nowPath)!=-1){
          thisNav = item;
          break;
        }
      }
      this.activeNav = this.navLink.indexOf(thisNav)
    },
    setSearchType(val){
      //设置搜索状态
      if(val == 6){
        this.searchType = 2;
      }else{
        this.searchType = 1;
      }
      
    },
    signOut(){
      // 退出登陆
      localStorage.clear()
      this.setHeaderTag(2)
      this.$router.push('/')
    },
    searchHandle(){
      let routerPath = ""
      if(this.searchType == 1){
        routerPath = "search";
      }else if(this.searchType == 2){
        routerPath = "bloglist";
      }
      this.$router.push({path:routerPath,query:{keyword:this.loginSearchText}})
      this.loginSearchText = "";
    },
    navHandle(index){
      // if(this.activeNav != index){
        this.activeNav = index
        index = parseInt(index);
        this.$router.push(this.navLink[index])
      // }
    },
    closeDrop(){
      this.showType = 0;
      this.opCourse = false;
    },
    openCourse(){
      let witchType = this.showType!=2?2:0;
      this.opCourse = !this.opCourse;
      this.showType = witchType;
    },
    getSeatch() {
      if(this.searchText.length && this.searchText.length>0){
        this.showType = 1;
        this.opCourse = false;
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
          if(this.searchText.length == 0) return false
          this.$post(
            BASE_API+"homeNoLogin/getSearchResultList",
            {
              keyword:this.searchText
            }
          )
            .then((res)=>{
              if (res.errno * 1 === 101) {
                if(res.data) {
                  this.searchList = res.data
                } else {
                  this.searchList = []
                }
              } else {
                this.$store.commit("showDialog", res.errsmg)

              }
            }).catch(err => {
              console.log(err)
              // this.$store.commit("showDialog")
            })
        },500)
      }else{
        this.showType = 0;
      }
    }
  },
  computed: {
    witchType(){
      return this.type
    },
    avatarImg(){
      if(this.$store.state.userInfo){
        return this.$store.state.userInfo.image
      }else{
        return "http://login.superlanlanlan.cn/images/1.png"
      }
    }
  },
  watch: {
    activeNav(val){
      this.setSearchType(val)
    }
    // 未登陆搜索
    // searchText(val){
    //   if(val.length && val.length>0){
    //     this.showType = 1;
    //     this.opCourse = false;
    //     clearTimeout(this.timer);
    //     this.timer = setTimeout(()=>{
    //       console.log('length:', val)
    //       this.$post(
    //         BASE_API+"homeNoLogin/getSearchResultList",
    //         {
    //           keyword:this.searchText
    //         }
    //       )
    //         .then((res)=>{
    //           if (res.errno * 1 === 101) {
    //             if(res.data) {
    //               this.searchList = res.data
    //             } else {
    //               this.searchList = []
    //             }
    //           } else {
    //             // this.$store.commit("showDialog", res.errsmg)
    //             this.$store.commit("showDialog", '1234567')

    //           }
    //         }).catch(err => {
    //           console.log(err)
    //           // this.$store.commit("showDialog")
    //         })
    //     },500)
    //   }else{
    //     this.showType = 0;
    //   }
    // }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/base.scss';
$header-bg-color: #343a40;
$nav-bg-color:rgba(33,33,33,.9);

.ln-user:hover{
  background: #363636;
  cursor: pointer;
}
.ln-user:hover .menu{
  display: inline-block;
  animation: droprun .2s ease;
}

@keyframes droprun{
  from{
    top:-10px;
    opacity: 0;
  }
  to{
    top:-2px;
    opacity: 1;
  }
}

.menu-bar{
  bottom: -2px;
  position: absolute;
  right: 12px;
}
.menu-bar .menu{
  display: none;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 4px;
  font-size: 14px;
  margin-left: 0px;
  max-width: 320px;
  min-width: 160px;
  opacity: 1;
  position: absolute;
  right: 0px;
  top:-2px;
  visibility: visible;
  z-index: 1000;
  transform: translateX(0px);
  background: rgb(255, 255, 255);
  border-radius: 2px;
  list-style: none;
  padding: 12px 0px 8px;
  transition: all 300ms ease-in-out 0s;
  span{
    display: flex;
    font-weight: 500;
    line-height: 24px;
    padding-bottom: 8px;
    padding-left: 16px;
    padding-right: 15px;
    padding-top: 5px;
    text-align: left;
  }
  a{
    color: rgb(34, 34, 34);
    cursor: pointer;
    display: flex;
    font-weight: 500;
    line-height: 24px;
    padding:0 5px;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    -webkit-box-align: center;
    align-items: center;
    background: none;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    overflow: hidden;
    text-decoration: none;
    transition: all 300ms ease 0s;
  }
  &::after{
    background-color: rgb(255, 255, 255);
    content: " ";
    display: block;
    height: 14px;
    line-height: 0;
    position: absolute;
    right: 14px;
    top: calc(-7px);
    white-space: pre;
    width: 14px;
    transform: rotate(45deg);
  }
}


.ln-user{
  height: 64px;
  display: flex;
  align-items: center;
  a{
    padding:0 24px;
    display: flex;
    position: relative;
    vertical-align: middle;
    div{
      width: 16px;
    }
    .avatar{
      background-color: rgb(154, 23, 27);
      display: inline-block;
      font-size: 12px;
      height: 32px;
      position: relative;
      text-align: center;
      width: 32px;
      border-radius: 100%;
      overflow: hidden;
      div{
        color: rgb(255, 255, 255);
        display: flex;
        font-weight: 400;
        height: 100%;
        width: auto;
        flex-direction: column;
        justify-content: center;
      }
    }
    &:hover{
      text-decoration: none;
    }
  }
}
.login-nav{
  background-color: rgb(34, 34, 34);
  box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 4px 0px;
  height: 65px;
  left: 0px;
  position: fixed;
  top: 0px;
  width: 100vw;
  z-index: 950;
  border-bottom: 1px solid rgb(54, 54, 54);
}
.ln-content{
  display: flex;
  max-width: 1600px;
  -webkit-box-align: center;
  align-items: center;
  background: rgb(34, 34, 34);
  margin: 0px auto;
  padding: 0px;
}
.ln-icons .ln-icon,.login-nav .ln-icon{
  width: 76px;
  display: flex;
  height: 64px;
  position: relative;
  vertical-align: middle;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: transparent;
  margin: 0px;
  overflow: visible;
  padding: 0px 16px;
  text-decoration: none;
  transition: all 0.15s ease-in-out 0s;
  color: rgb(170, 170, 170);
}
.ln-icons .ln-icon:hover,.login-nav .ln-icon:hover{
  background: #363636;
  color: #fff;
}
.login-nav .ln-icon.active{
  color: #fff;
}
.login-nav .ln-icon.active::after{
  bottom: -1px;
  content: " ";
  display: block;
  height: 4px;
  left: 50%;
  line-height: 0;
  position: absolute;
  white-space: pre;
  width: 100%;
  transform: translateX(-50%);
  background: linear-gradient(to right, rgb(240, 90, 40), rgb(232, 10, 137));
  transition: width 100ms ease-out 0s;
}
.login-nav .ln-icon .img-svg{
  fill:red !important;
}
.login-nav .ln-icon .icon{
  display: inline-block;
    height: 24px;
    vertical-align: middle;
    width: 24px;
    margin: 4px 0;
}
.login-nav .ln-icon .text{
  display: block;
  font-size: 10px;
  font-weight: bold;
}

.ln-content > a{
  padding: 0px 16px; 
}
.ln-search-bar{
  flex: 1 1 0%;
  margin: 0 20px;
}
.ln-search{
  background: rgb(54, 54, 54);
  color:#fff;
  border:none;
  height: 43px;
  padding: .5845em 3em;
  background-image: url("../assets/imgs/search.svg");
  background-size: 32px 32px;
  background-repeat: no-repeat;
  background-position: 4px 10px;
  &:focus{
    background-color: rgb(54, 54, 54);
    border-color:rgb(19, 123, 194);
    color:#fff;
  }
}
.ln-icons{
  display: flex;
}
// 
.logo {
  width: 50px;
}
.navbar.bg-dark{
  position: fixed;
  top:0;
  width: 100%;
  background-color: $nav-bg-color !important;
  z-index: 999;
}
.course-category {
  margin-right: 30px;
  &:hover {
    background-color: $header-bg-color;
    color: #fff;
  }
}
.search {
  &-form {
    display: flex;
    justify-content: center;
  }
  &-ipt {
    width: 360px !important;
    color: #fff;
    background-color: #1a1a1a;
    border-radius: 5px;
    border: 1px solid #555;
    font-weight: 300;
    line-height: 24px;
    letter-spacing: 0;
    padding: .5845em 3em;
    font-size: 12px;
    transition: opacity .3s ease;
    outline: none;
    background-color: transparent;
    background-image: url("../assets/imgs/search.svg");
    background-size: 32px 32px;
    background-repeat: no-repeat;
    background-position: 3px 7px;
    &:focus{
      background-color: #1a1a1a;
      outline: none;
      border: 1px solid #555;
    }
  }
}
.course-btn{
  color: #fff;
  text-align: left;
  width: 100px;
  background-color: #1a1a1a;
  border-radius: 5px;
  border: 1px solid #555;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0;
  padding: .5845em 1em;
  font-size: 12px;
  transition: opacity .3s ease;
  outline: 0;
  margin-right: 10px;
}
.course-btn:hover{
  opacity: .6;
}
.course-btn .icons {
  display: inline-block;
  height: 6px;
  position: relative;
  transform: rotate(45deg);
  border: solid #fff;
  border-width: 0 2px 2px 0;
  padding: 4px;
  float: right;
  top: 4px;
  transition: all .3s ease;
}
.course-btn.open .icons{
  transform: scaleY(-1) rotate(45deg);
  top: 9px;
}
.search-ipt::-webkit-input-placeholder {
    color: #fff;
    font-size: 14px;
    font-weight: 1000;
}
.nav-item{
  margin: 0 5px;
  font-size: 15px;
}
.register{
  font-weight: 700;
  font-size: 15px;
  line-height: 1.1;
  padding: 3px 15px;
  border-radius: 5px;
  color: #fff;
  background: #e80a89;
  position: relative;
  text-align: center;
  transition: box-shadow .3s ease-in-out;
}
.register:hover{
  box-shadow: 0 10px 30px rgba(0,0,0,.2);
  background: linear-gradient(to right,#f05a28 0,#e80a89 100%);
  color: #fff
}
</style>