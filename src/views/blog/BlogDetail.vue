<template>
  <div class="blog-detail">
    <div class="bd-title">
      <div class="container">
        <div class="back-btn" @click="$router.push('/bloglist')">返回博客</div>
        <div class="blog-title">{{blogData.title}}</div>
        <div class="info">
          <div class="info-left">
            <span class="badge badge-warning" v-for="item in labelList" :key="item.id">{{item.title}}</span>
            <span>{{regTime(blogData.postDate)}}</span>
          </div>
          <div class="info-right" v-if="showStatusBtn">
            <button
              @click="likeHandle"
              type="button"
              :class="isLike?'btn btn-sm btn-light':'btn btn-sm btn-outline-light'"
            >
              <span
                v-if="likePadding"
                class="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <i :class="isLike?'like-icon iconfont icon-xin2':'like-icon iconfont icon-xin'"></i>
              赞
            </button>
            <button
              @click="fellowHandle"
              type="button"
              :class="isFellow?'btn btn-sm btn-light':'btn btn-sm btn-outline-light'"
            >
              <span
                v-if="fellowPadding"
                class="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              {{isFellow?'已收藏':'收藏'}}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="bd-content">
      <div class="container">
        <mavon-editor v-model="blogData.beforeContent" :subfield="false" defaultOpen="preview"
     :toolbarsFlag="false" :boxShadow="false" />
      </div>
      <!-- <div class="container markdown-body" v-html="blogData.content">
      </div> -->
    </div>
    <div class="bd-comment">
      <div class="container">
        <form v-if="showStatusBtn">
          <div class="comment-form form-group clearfix">
            <label>发表评论</label>
            <textarea v-model="commentText" class="form-control" rows="3" placeholder="请输入评论内容..."></textarea>
            <button @click="subComment" type="button" class="btn btn-sm btn-outline-light">发布</button>
          </div>
        </form>
        <div class="comment-list" v-for="item in blogData.commentList" :key="item.commId">
          <div class="media">
            <img
              :src="item.user.image"
              class="mr-3 com-avatar"
              alt="..."
            />
            <div class="media-body">
              <h5 class="mt-0">{{item.user.name}}</h5>
              {{item.content}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  components:{
    mavonEditor
  },
  data() {
    return {
      showStatusBtn:localStorage.getItem("tokenId"),
      commentText:"",
      isFellow: false,
      fellowPadding: false,
      isLike:false,
      likePadding:false,
      blogData:{},
      labelList:[]
    };
  },
  created() {
    if(this.$route.query.id){
      this.getBlog()
    }
  },
  methods: {
    subComment(){
      //发表评论
      this.$post(BASE_API+"blog/addBlogComment",{
        tokenId:localStorage.getItem("tokenId"),
        content:this.commentText,
        blogId:this.$route.query.id
      }).then((res)=>{
        this.commentText = "";
        this.getBlog();
      })
    },
    likeHandle(){
      //点赞处理
      this.likePadding = true;
      let url = BASE_API;
      if(this.isLike){
        url+="blog/cancelGood"
      }else{
        url+="blog/good"
      }
      this.$post(url,{
        blogId:this.$route.query.id,
        tokenId:localStorage.getItem("tokenId")
      }).then((res)=>{
        this.isLike = !this.isLike;
        this.likePadding = false;
      })
    },
    fellowHandle(){
      //收藏处理
      this.fellowPadding = true;
      let url = BASE_API;
      if(this.isFellow){
        url+="blog/cancelCollect"
      }else{
        url+="blog/collect"
      }
      this.$post(url,{
        blogId:this.$route.query.id,
        tokenId:localStorage.getItem("tokenId")
      }).then((res)=>{
        this.isFellow = !this.isFellow;
        this.fellowPadding = false;
      })
    },
    getLabelList(str){
      // 获取标签（path）
      let thisId = str.split(",");
      let pathList = [];
      let thisUrl = `${BLOG_API}mark/getMarkList`;
      this.$get(thisUrl).then((res)=>{
        pathList = res.data.filter((item,index)=>{
          if(thisId.indexOf(item.id+"")!=-1){
            return item
          }
        })
        this.labelList = pathList;
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
    getBlog(){
      // 获取博客详情
      let id = this.$route.query.id
      if(localStorage.getItem("tokenId")){
        this.$post(BASE_API+"blog/isGiveLike",{
          blogId:id,
          tokenId:localStorage.getItem("tokenId")
        }).then((res)=>{
          this.isFellow = res.data.collection;
          this.isLike = res.data.giveLike;
        })
      }
      
      this.$post(BASE_API+"blog/getBlogDetail",{id:id})
      .then((res)=>{
        this.blogData = res.data
        this.getLabelList(res.data.markId)
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.bd-title {
  min-height: 200px;
  background-color: #2b2b2b;
  .blog-title {
    margin-top: 20px;
    margin-bottom: 45px;
    font-size: 30px;
    color: #fff;
  }
  .back-btn {
    color: #e80a89;
    text-align: left;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    color: #eee;
    font-size: 14px;
  }
}
.bd-content {
  min-height: 300px;
  background-color: #fff;
  position: relative;
  z-index: 10;
}
.container {
  padding: 15px 100px;
}
/deep/ .v-show-content{
  background-color: #fff !important;
}
/deep/ .markdown-body{
  border:0;
}
.comment-form {
  color: #eee;
  border-bottom: 1px solid #363636;
  padding-bottom: 15px;
  textarea {
    resize: none;
    background-color: #363636;
    border: 0;
    color: #eee;
  }
  .btn {
    float: right;
    margin-top: 15px;
  }
}
.comment-list{
  color: #eee;
  .media{
    padding-bottom: 15px;
    border-bottom: 1px solid #363636;
  }
}
.info-right .btn{
  margin-right: 15px;
}
.like-icon{
  font-size: 14px;
}
.badge{
  margin-right: 10px;
}
.com-avatar{
  width: 64px;
  border-radius: 50%;
}
</style>