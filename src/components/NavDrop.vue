<!--
    下拉框组件
    props:
    |------------------------------------------|
    | isShow  1-搜索列表 2-分类列表               |
    | searchList 未登陆搜索结果列表 接收对象类型数据 |
    |        |-  course 搜索返回的课程列表 接收数组 |
    |        |-  path 搜索返回的路径列表  接收数组  |
    |------------------------------------------|
    event:
    |----------------------|
    | closeHandle 关闭事件  |
    |----------------------|
-->
<template>
  <div>
    <div :class="['header_dropdown',{'active':ifShow==1}]">
      <div class="header_nav_search">
        <div class="header_tabs--search">
          <div class="close_button" @click="closeHandle">
            <font>X</font>
          </div>
          <div class="header_tabs_content--container">
            <div class="header_tabs_column">
              <div class="header_dropdown--resultList">
                <ul class="header_dropdown--lists">
                  <li class="first">
                    <font style="vertical-align: inherit;">
                      <font style="vertical-align: inherit;">课程</font>
                    </font>
                  </li>
                  <li
                    class="header_dropdown--resultInfo"
                    v-for="(item,index) in searchClass"
                    :key="index"
                  >
                    <a href="javascript:void(0);" @click="goCurse(item.courseId)">
                      <font>{{item.title}}</font>
                    </a>
                  </li>
                  <li v-if="searchClass.length==0">
                    <a href="javascript:void(0);">暂无结果</a>
                  </li> 
                  <li class="last">
                    <a href="javascript:void(0);" @click="goCurse(searchVal)">
                      <font>查看更多结果&gt;</font>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="header_tabs_column paths">
              <div id="header_dropdown--resultListPaths">
                <ul class="header_dropdown--lists">
                  <li class="first">
                    <font style="vertical-align: inherit;">
                      <font style="vertical-align: inherit;">路径</font>
                    </font>
                  </li>
                  <li v-if="searchParth.length==0"><a>暂无结果</a></li>
                  <li v-for="(item,index) in searchParth" :key="index">
                    <div class="item">
                      <a href="javascript:void(0);" @click="goPath(item.pathId)">
                        <div class="item-each">
                          <div class="item-image">
                            <img :src="imgUrl+item.pathImg" />
                          </div>
                          <div class="item-text">
                            <font style="vertical-align: inherit;">
                              <font style="vertical-align: inherit;">{{item.pathName}}</font>
                            </font>
                            <ul>
                              <li>
                                <span>
                                  <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">{{item.courseCount}}门</font>
                                  </font>
                                </span>
                                <font style="vertical-align: inherit;">
                                  <font style="vertical-align: inherit;">课程</font>
                                </font>
                              </li>
                              <li>
                                <span>
                                  <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">{{formatDate(item.courseTime)}}</font>
                                  </font>
                                </span>
                                <!-- <font style="vertical-align: inherit;">
                                  <font style="vertical-align: inherit;">小时</font>
                                </font> -->
                              </li>
                            </ul>
                          </div>
                        </div>
                      </a>
                    </div>
                  </li>
                  <li class="last">
                    <a href="javascript:void(0)" @click="goPath('more')">
                      <font style="vertical-align: inherit;">
                        <font style="vertical-align: inherit;">查看所有路径&gt;</font>
                      </font>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="headerTabsLink.length>0" :class="['header_dropdown',{'active':ifShow==2}]">
      <div class="header_tabs">
        <div class="close_button" @click="closeHandle">
          <font>X</font>
        </div>
        <ul>
          <li
            class="header_tabs_link"
            @mouseover="changeActive(index)"
            :class="index==activeItem?'active':''"
            v-for="(item,index) in headerTabsLink"
            :key="index"
          >
            <a href="javascript:void(0);">{{item.classify_name}}</a>
          </li>
        </ul>
        <div class="header_tabs_content">
          <div class="header_tabs_content--container">
            <div class="header_tabs_column">
              <div class="header_topics_menu">
                <ul>
                  <li class="first">
                    <font>课程</font>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0);"
                      v-for="(item,index) in headerTabsLink[activeItem].markList"
                      :key="item.title+index"
                      :data-id="item.id"
                      @click="goTag(item.id)"
                    >{{item.title}}</a>
                  </li>
                  <li class="last">
                    <a href="javascript:void(0);" @click="goTag('more',headerTabsLink[activeItem])">查看所有课程></a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="header_tabs_column paths">
              <ul>
                <li class="first">
                  <font>路径</font>
                </li>
                <li v-for="(item) in headerTabsLink[activeItem].path" :key="item.pathName">
                  <div class="item">
                    <a href="javascript:void(0);" @click="goPath(item.pathId)">
                      <div class="item-each">
                        <div class="item-image">
                          <img :src="imgUrl+item.pathImg" />
                        </div>
                        <div class="item-text">
                          <font>{{item.pathName}}</font>
                          <ul>
                            <li>
                              <span>{{item.courseCount}}门</span>
                              <font>课程</font>
                            </li>
                            <li>
                              <span v-text="formatDate(item.courseTime)"></span>
                              <!-- <font>小时</font> -->
                            </li>
                          </ul>
                        </div>
                      </div>
                    </a>
                  </div>
                </li>
                <li class="last">
                  <a href="javascript:void(0);" @click="goPath('more')">查看所有路径></a>
                </li>
              </ul>
            </div>
            <div class="header_tabs_column paths">
              <ul>
                <li class="first">
                  <font>测试</font>
                </li>
                <li
                  v-for="(item) in headerTabsLink[activeItem].assessents"
                  :key="item.assessentsName"
                >
                  <div class="item">
                    <a href="javascript:void(0);" @click="goAssessents(item.assessentsId)" :data-id="item.assessentsId">
                      <div class="item-each">
                        <div class="item-image">
                          <img :src="imgUrl+item.assessentsImg" />
                        </div>
                        <div class="item-text">
                          <font>{{item.assessentsName}}</font>
                          <ul>
                            <li>
                              <font>获取</font>
                              <span>测试</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </a>
                  </div>
                </li>
                <li class="last">
                  <a href="javascript:void(0);" @click="goAssessents('more')">查看所有测试></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {formatDate} from '@/assets/js/common.js'
export default {
  props:{
    isShow:{
      type:Number,
      default:0
    },
    searchText:{
      type:String,
      default:""
    },
    searchList:{
      type:Object,
      default:()=>{
        return {
          course:[],
          path:[]
        }
      }
    }
  },
  data() {
    return {
      activeItem: 0,
      headerTabsLink: [],
      imgUrl: window.CDN_URL
    };
  },
  created() {
    this.getCourse();
  },
  computed: {
    searchVal(){
      return this.searchText;
    },
    ifShow() {
      // console.log(this.isShow)
      return this.isShow;
    },
    searchParth(){
      return Array.from(this.searchList.path) 
    },
    searchClass(){
      return Array.from(this.searchList.course) 
    }
  },
  methods: {
    formatDate,
    goPath(val){
      console.log(val)
      this.$emit("closeHandle");
      if(val!="more"){
        this.$router.push({path:"pathdetails",query:{id:val}})
      }else{
        this.$router.push("/paths")
      }
    },
    goTag(val,_data){
      console.log(_data)
      // this.$router.push("/login")
      this.$emit("closeHandle");
      if(val!="more"){
        this.$router.push({path:"/tagDetails",query:{id:val}})
      }else{
        this.$router.push({
          path: '/courselist',
          query: {
            id: _data.classify_id
          }
        })
      }
    },
    goCurse(val,){
      // this.$router.push("/login")
      this.$emit("closeHandle");
      if(val!="more"){
        this.$router.push({
          path:"/search",
          query: {
            keyword: this.searchVal,
            tag: 'courses'
          }
        })
      }else{
        this.$router.push({
          path: '/classdetail',
          query: {
            id: _data.val
          }
        })
      }
    },
    goAssessents(val){
      this.closeHandle()
      if(val!="more"){
        this.$router.push({
          path: '/login',
          query: {
            redirect_url: `/skill-assessment?pathId=${val}&isParts=1`
          }
        })
      }else{
        this.$router.push({
          path:"/login",
          query: {
            redirect_url: `/exercisesPath`
          }
        })
      }
    },
    getCourse() {
      var that = this;
      console.log(window.BASE_API)
      this.$get(
        BASE_API+"homeNoLogin/getTopNavigationList",
      )
        .then(function(res) {
          if (res.errno === 101) {
            console.log(res);
            that.headerTabsLink = res.data.list
          } else {
            this.$store.commit("showDialog", res.errsmg)
          }
        }).catch(err => {
          console.log(err)
          // this.$store.commit("showDialog")
        })
    },
    changeActive(index) {
      this.activeItem = index;
    },
    closeHandle() {
      this.$emit("closeHandle");
    }
  }
};
</script>
<style lang="scss" scoped>
.header_tabs {
  position: relative;
}
.close_button {
  position: absolute;
  color: #fff;
  font-size: 18px;
  padding: 5px 10px;
  right: 15px;
  font-weight: 700;
  top: 10px;
  cursor: pointer;
  z-index: 999;
}
.header_tabs_link.active {
  position: relative;
}
.header_tabs ul .header_tabs_link.active a {
  color: #fff;
}
.header_tabs_link.active::after {
  content: "";
  width: 2px;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  background: linear-gradient(to bottom, #f15a29 0, #e80a89 100%);
}
.header_dropdown {
  display: none;
  opacity: 0;
  position: fixed;
  top: 76px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  // transition: all .3s ease;
}
.header_dropdown.active {
  display: block;
  opacity: 1;
  z-index: 10;
  animation: runs 0.3s ease;
}
@keyframes runs {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.header_tabs {
  display: flex;
  background: #181818;
  margin: 0 auto;
  max-width: 1230px;
  max-height: 75vh;
  min-height:50vh
}
.header_tabs ul {
  min-width: 25%;
  background: #222;
}
.header_tabs_link {
  text-align: right;
}
.header_tabs ul .header_tabs_link a {
  color: #aaa;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  display: block;
  padding: 29px 30px;
  border-bottom: 1px solid #363636;
}
.header_tabs_content {
  width: 100%;
}
.header_tabs_content--container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-height: 75vh;
  overflow-y: auto;
}
.header_tabs_column:nth-of-type(1) {
  flex: 0 0 28%;
}
.header_tabs_column {
  flex: 1;
}
.header_tabs_column ul {
  background: 0 0;
  min-width: inherit;
  padding: 28px 15px 0;
}
.header_tabs_column ul li {
  padding-left: 0;
  margin-bottom: 0;
  text-align: left;
  font-size: 14px;
}
.header_tabs_column ul li a {
  color: #ccc;
  padding: 8px 12px;
  display: block;
  font-weight: 500;
}
.header_tabs_column ul li a:hover {
  color: #fff;
  text-decoration: none;
}
.header_tabs_column ul li.first {
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 15px;
  padding: 0 12px;
  position: relative;
}
.header_tabs_column ul li.first:after {
  content: "";
  width: 120px;
  height: 1px;
  background: #363636;
  position: absolute;
  bottom: -5px;
  left: 12px;
}
.header_tabs_column ul li.last a {
  color: rgba(232, 10, 137, 0.8);
  padding: 8px 12px;
  font-weight: 700;
}
.header_tabs_column.paths ul li {
  margin-bottom: 10px;
}
.header_tabs_column.paths ul li a {
  padding-top: 0;
  padding-bottom: 0;
}
.header_tabs_column.paths .item .item-each {
  background-color: #222;
  width: 100%;
  position: relative;
  padding: 0.85em 0.25em 0.45em 60px;
}
.header_tabs_column.paths .item .item-image {
  height: 60px;
  width: 60px;
  position: absolute;
  top: 50%;
  left: 0;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.header_tabs_column.paths .item .item-text {
  color: #fff;
  font-weight: 500;
  margin-left:10px;
}
.header_tabs_column.paths .item .item-text > ul {
  padding: 0;
}
.header_tabs_column.paths .item .item-text > ul li {
  text-transform: none;
  color: #aaa;
  font-weight: 200;
  font-size: 12px;
  display: inline-block;
  margin-bottom: 0;
  padding-left: 0;
  padding-right: 20px;
}
.header_tabs_column.paths .item .item-text > ul li > span {
  color: #fff;
  font-weight: 500;
}
.header_tabs_column.paths ul li.first {
  margin-bottom: 30px;
}

//
.header_nav_search {
  position: relative;
  margin: 0 20%;
  background-color: #181818;
}
.item-image img{
  width: 100%;
  height: 100%;
}
// .header_nav_search .item-image img {
//   width: 100%;
// }
// .header_nav_search .header_tabs_column.paths ul li{
//   margin-bottom: 10px;
// }
</style>