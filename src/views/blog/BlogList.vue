<template>
  <div class="container">
    <div class="blog-content">
      <div class="bc-left">
        <ul class="blog-list">
          <li v-for="item in blogList" :key="item.blogId" @click="goDetail(item.blogId)">
            <div class="bl-left">
              <div class="bll-img" :style="{'background-image':'url('+getBlogImg(item.cover)+')'}"></div>
            </div>
            <div class="bl-right">
              <article>
                <a class="blog-title" href="javascript:void(0);">{{item.title}}</a>
                <div
                  class="blog-desc"
                >{{item.intro}}</div>
                <div class="blog-info">
                  <span class="view">
                    <i class="mr-1 iconfont icon-xin2"/>{{item.good}}
                  </span>
                  <span class="ml-3 mr-1">{{item.author.name}}</span>
                  <span>
                    <i class="iconfont icon-auth"></i>
                  </span>
                  <span class="ml-3">{{regTime(item.postDate)}}</span>
                  <div class="control-btn">
                    <div v-if="listType == 1">
                      <span @click.stop="delBlog(item.blogId)">删除</span>|
                      <span @click.stop="editBlog(item.blogId)">修改</span>
                    </div>
                    <div v-if="listType == 2">
                      <span>取消收藏</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </li>
        </ul>
        <div v-if="isEnd" class="bottom-loading end-text">没有更多了</div>
        <div v-else class="bottom-loading" v-show="showLoading">
          
          <div class="spinner-grow text-light" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
      <div class="bc-right">
        <div class="control-card" v-if="showStatusBtn">
          <ul>
            <li @click="statusBtn('create')">
              <div>
                <i class="iconfont icon-Writetext"></i>
              </div>
              <p>创建博客</p>
            </li>
            <li @click="statusBtn(1)" :class="{'active':listType==1}">
               <div>
                <i class="iconfont icon-wenzhangguanli"></i>
              </div>
              <p>我的博客</p>
            </li>
            <li @click="statusBtn(2)" :class="{'active':listType == 0}">
              <div>
                <i class="iconfont icon-ziyuan"></i>
              </div>
              <p>查看收藏</p>
            </li>
          </ul>
        </div>
        <ul class="label-list">
          <li @click="getBlog('label','all')" :class="{'active':!listInfo.markId}">全部</li>
          <li @click="getBlog('label',item.id)" :class="{'active':listInfo.markId == item.id}" v-for="(item) in labelList" :key="item.id">{{item.title}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showStatusBtn:localStorage.getItem("tokenId"),
      listType:3,
      labelList:[],
      blogList:[],
      checkLabel:"all",
      pageInfo:{
        maxCount:10,
        page:1,
      },
      listInfo:{
        maxCount:10,
        page:1,
      },
      showLoading:false,
      isEnd:false,
    }
  },
  mounted() {
    this.scrollFun();
    this.getPath();
    if(this.$route.query.keyword){
      this.getBlog("search",this.$route.query.keyword)
    }else if(this.$route.query.status){
      this.statusBtn(1)
    }else{
      this.getBlog();
    }
  },
  beforeDestroy(){
    window.onscroll = null;
  },
  methods: {
    getBlogImg(img){
      //获取博客题图地址
      return CDN_URL+img
    },
    editBlog(id){
      //修改博客
      this.$router.push({path:"/createblog",query:{id}})
    },
    delBlog(id){
      //删除博客
      this.$post(BASE_API+'blog/delBlog',{id})
      .then((res)=>{
        this.getBlog("label","all");
      })
    },
    regTime(val){
      //格式化时间
      if(!val) return "无"
      let reg = /(?<year>\d{4})-(?<date>\d{2})-(?<month>\d{2})/
      let str = val.split(" ")[0];
      let timeStr = str.replace(reg,"$1年$2月$3日")
      return timeStr
    },
    resetListInfo(obj){
      //重置当前列表筛选项
      this.pageInfo = {
        page:1,
        maxCount:10
      }
      this.blogList = [];
      this.isEnd = false;
      this.checkLabel = 'all';
      let thisInfo = Object.assign(this.pageInfo,obj)
      this.listInfo = thisInfo;
    },
    getBlog(type,key){
      this.$store.commit("showLoading");
      let options = {};
      // 获取博客列表
      if(type=='label' && key!='all'){
        //根据标签查看 
        this.resetListInfo({markId:key});
        this.listType = 3;
      }else if(type=='search' && key!=''){
        //根据搜索结果展示
        this.resetListInfo({keyword:key});
        this.listType = 3;
      }else if(type=='status' && key){
        //根据用户信息查看博客
        if(key == 1){
          this.resetListInfo({
            tokenId:localStorage.getItem("tokenId")
          });
        }else{
          this.resetListInfo({
            status:key,
            tokenId:localStorage.getItem("tokenId")
          });
        }
      }else if(type=='label' && key=='all'){
        this.resetListInfo({});
        this.listType = 3;
      }
      this.$post(BASE_API+"blog/getBlogListByKey",this.listInfo)
      .then((res)=>{
        this.blogList = this.blogList.concat(res.data.pageData.list);
        this.$store.commit("hideLoading");
        this.showLoading = false;
        if(res.data.pageData.list.length == 0 && res.data.pageData.list.length < this.pageInfo.maxCount ){
          this.isEnd = true
        }
      })
    },
    getPath(){
      // 获取博客标签（path）
      let pathList = [];
      let thisUrl = `${BLOG_API}mark/getMarkList`;
      this.$get(thisUrl).then((res)=>{
        pathList = res.data.map((item,index)=>{
          return {
            title:item.title,
            id:item.id
          }
        })
        this.labelList = pathList
      })
    },
    goDetail(id){
      this.$router.push({path:"/blogdetail",query:{id:id}})
    },
    statusBtn(key){
      this.listType = key==1?1:0;
      if(key == 'create'){
        this.$router.push("/createblog")
      }else{
        this.getBlog("status",key)
      }
    },
    throttle(func, wait) {
      //节流函数
      let timeout;
      return function() {
        let context = this;
        let args = arguments;
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
          }, wait);
        }
      };
    },
    scrollFun() {
      //判断滚动底部
      let ele = document.documentElement;
      let isScrollEnd = () => {
        let cHeight = ele.clientHeight;
        let sHeight = ele.scrollHeight;
        let sTop = ele.scrollTop;
        if (sHeight - sTop <= cHeight + 10) {
          if(!this.isEnd){
            this.showLoading = true;
            this.listInfo.page = this.listInfo.page+1;
            this.getBlog()
          }
        }
      }
      window.onscroll = this.throttle(isScrollEnd, 1000);
    }
  },
  watch:{
    listInfo(val,old){
      if(old && val.type!=old.type){
        this.isEnd = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.blog-content {
  margin: 20px 0;
}
.blog-content {
  display: flex;
  .bc-left {
    flex-grow: 5;
    background-color: #222;
  }
  .bc-right {
    flex-grow: 2;
    width: 0;
  }
}
.blog-list {
  li {
    border-bottom: 1px solid #363636;
    padding: 20px;
    display: flex;
    transition: all 0.3s ease 0s;
    &:hover {
      cursor: pointer;
      background-color: #363636;
    }
    &:last-child {
      border-bottom: 0;
    }
    .bl-left {
      flex: 1;
      background-image: url("http://pic.qingmengtech.com:8080/qingmeng/20190923173706001.png");
      background-size:cover;
      .bll-img {
        width: 150px;
        height: 150px;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        
      }
    }
    .bl-right {
      position: relative;
      border-radius: 0 5px 5px 0;
      flex: 15;
      width: 0;
      overflow: hidden;

      .blog-title {
        display: block;
        color: #eee;
        font-weight: bolder;
        font-size: 18px;
        margin: 5px 20px;
      }
      .blog-desc {
        color: #aaa;
        font-size: 13px;
        margin-left: 20px;
      }
      .blog-info {
        color: #aaa;
        font-size: 13px;
        position: absolute;
        bottom: 0;
        left: 20px;
        width: 90%;
      }
    }
  }
}
.iconfont {
  font-size: 10px;
}
.icon-auth {
  color: #f5a623;
}
.view {
  color: #fff;
}
.label-list {
  background-color: #222;
  color: #ddd;
  padding: 20px;
  margin-left: 15px;
  font-size: 14px;
  .active {
    font-weight: bold;
    color: #f5a623;
  }
  li {
    margin: 10px 0;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
.control-card {
  background-color: #222;
  color: #ddd;
  margin-left: 15px;
  font-size: 14px;
  margin-bottom: 15px;
  .active{
    color:#f5a623;
  }
  ul {
    display: flex;
    li {
      flex: 1;
      padding: 20px 0;
      text-align: center;
      line-height: 30px;
      transition: all 0.3s ease 0s;
      &:hover {
        cursor: pointer;
        background-color: #363636;
      }
      i {
        font-size: 20px;
        font-weight: bolder;
      }
    }
  }
}
.control-btn{
  float: right;
  span{
    margin:0 10px;
    color:#fff;
    &:hover{
      text-decoration: underline;
      cursor: pointer;
      color:#f96816;
    }
  }
}
.bottom-loading{
  background-color: #171717;
  text-align: center;
  padding:15px 0;
}
.end-text{
  text-align: center;
  color:#999;
}
</style>