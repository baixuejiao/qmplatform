<!-- 评论模块 -->
<template>
  <div class="comment-box">
    <div class="comment-publish" v-if="userInfo&&tokenId">
      <div class="comment-publish-wrapper">
        <div class="comment-publish-info">
          <img v-if="userInfo.image" :src="userInfo.image"/>
          <p>{{userInfo.name}}</p>
        </div>
        <div class="comment-publish-main">
          <textarea v-model="msg" placeholder="请输入评价"></textarea>
        </div>
      </div>
      <div class="comment-publish-container">
        <star-rating
          @rating-selected ="setRating"
            :star-size="13"
            :inline="true"
            style="margin-bottom:25px;margin-left:10px;"
          ></star-rating>
        <span class="submitt" @click="showDialog">提交</span>
      </div>
    </div>
    <div class="comment-unlogin" v-else>
      登录后可评论
    </div>
    <!-- 评论列表 -->
    <div class="comment-list">
      <ul style="margin-bottom:40px;">
        <li v-for="(item,index) in LocalcourseComments" :key="index" class="pinglun-line">
          <img v-if="item.commentUser&&item.commentUser.image"
            class="pinglun-line-avatar"
            :src="item.commentUser.image"
            alt
          />
          <div class="pinglun-line-content">
            <p class="pinglun-line-wrapper">
              <span class="pinglun-line-name" v-if="item.commentUser&&item.commentUser.name">{{item.commentUser.name}}</span>
              <star-rating
                class="content-rating"
                :rating="item.appraise*1"
                :read-only="true"
                :star-size="13"
                :inline="true"
              ></star-rating>
            </p>
            <div class="pinglun-line-inner">{{item.content}}</div>
          </div>
        </li>
      </ul>
    </div>

    <div class="modal fade" id="CommitDialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">温馨提示</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">是否提交评论？</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="submit()">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import Vue from "vue";
import $ from "jquery";

export default {
  data() {
    return{
      tokenId: localStorage.getItem('tokenId') || '',
      appraise: '',
      msg: '',
    }
  },
  props: ['userInfo', 'LocalcourseComments', 'subcomment'],
  components: {
    StarRating
  },
  methods: {
    setRating(rating) {
      this.appraise = rating;
    },
    showDialog() {
      $("#CommitDialog").modal("toggle");
    },
    submit() {
      this.subcomment(this.msg, this.appraise)
      this.msg = '';
      this.setRating(0);
      $("#CommitDialog").modal("toggle");
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-box {
  width: 100%;
  position: relative;
}
.comment-publish {
  .comment-publish-wrapper{
    display: flex;
    width: 100%;

    .comment-publish-info{
      width: 100px;
      text-align: center;
      img{
        display: block;
        width: 50px;
        height: 50px;
        margin: 0 auto;
        border-radius: 50%;
      }
    }
    .comment-publish-main{
      padding-left: 20px;
      flex-grow: 1;

      textarea{
        width: 100%;
        display: block;
        height: 80px;
        resize: none;
        padding: 5px 20px;
        color: #FFF;
        background: #4D4D4D;
      }
    }
  }
  .comment-publish-container{
    text-align: right;
    .submitt{
      display: inline-block;
      width: 100px;
      height: 40px;
      margin-top: 12px;
      margin-left: 10px;
      border-radius: 5px;
      text-align: center;
      line-height: 40px;
      border: 1px solid #f96816;
      background-color: #f96816;
      color: #efefef;
      font-weight: 600;
    }
  }
}

.comment-unlogin{
  padding-bottom: 20px;
  color: #aaa;
}

.comment-list {
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  border-color: #545454;
  color: rgb(170, 170, 170);
  background-color: #222;

  .pinglun-line {
    display: flex;
    padding: 12px 8px;
    border-top: 1px solid #555;
    position: relative;
  
    .pinglun-line-avatar {
      width: 50px;
      height: 50px;
      border: 1px solid transparent;
      border-radius: 50%;
    }
    .pinglun-line-content{
      flex-grow: 1;
      padding-left: 20px;
    }
    .pinglun-line-wrapper{
      display: flex;
      height: 30px;
      line-height: 30px;
      justify-content: space-between;
    }
    .pinglun-line-name {
      font-size: 14px;
      color: #f96816;
    }
    .pinglun-line-inner {
      text-align: left;
      font-size: 16px;
    }
  }
}
  .modal-content{
    color: #fff !important;
    background: #222  !important;
  }
  .modal-header,
  .modal-footer{
    border-color: #545454 !important;
  }
  .close{
    color: #fff !important;
  }
  .btn-primary{
    transition: box-shadow .3s ease-in-out !important; 
    border:none !important;
    outline:none !important;
    background:#e80a89 !important;
  }
  .btn-default{
    border:none !important;
    outline:none;
    color: #e80a89 !important;
  }

</style>