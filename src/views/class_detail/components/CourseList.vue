<template>
  <div class="course-list">
    <div class="chapter-list" v-for="(item,index) in Localchapters" :key="index" @click="change(index)">
      <div :class="['chapter-list-copy',{copycolor:item.isshow}]">
        <span class="one iconfont icon-iconfontplay2"></span>
        <p class="chapter-list-title"  v-if="item.title">{{item.title}}</p>
        <span class="chapter-list-time">{{item.chapterTime}}</span>
        <span class="chapter-list-icon">
          <svg role="img" aria-label="caret down icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
            <path d="M12 15.41l-5-5L8.41 9 12 12.58 15.59 9 17 10.41" />
          </svg>
        </span>
      </div>
      <ul class="section" v-if="Localchapters[index].sections">
        <li
          v-for="(val,ind) in Localchapters[index].sections"
          :key="ind"
          v-show="item.isshow"
          class="section-list"
        >
          <span  v-if="val.title">{{val.title}}</span>
          <span 
            @click="dialog(val)"
            :class="[tokenId ? 'section-list-button' : 'section-list-button-gray']"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >去学习</span>
        </li>
      </ul>
    </div>
    <!-- modle -->
    <!-- <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">温馨提示</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">您选择的课程为收费课程，需要跳转到腾讯课堂，点击确定跳转</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" style="backgroundColor:#e80a89;transition: box-shadow .3s ease-in-out; border:none" @click="gocourse">确定</button>
          </div>
        </div>
      </div>
    </div> -->
    <div class="modal fade" id="Dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">温馨提示</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">{{dialogText}}</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" v-if="dialogTag == 1" @click="singUp">报名</button>
            <button type="button" class="btn btn-primary" v-else-if="dialogTag == 3" @click="goreload">确定</button>
            <button type="button" class="btn btn-primary" v-else @click="gocourse">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Vue from "vue";
export default {
  data() {
    return {
      tokenId: localStorage.getItem('tokenId') || '',
      token: localStorage.getItem('token') || '',
      url: '',
      dialogTag: 1,
      dialogText: ''
    }
  },
  computed: {
    isSignUp() {
      if (this.Localcourse.userStatus * 1 === 1 || this.Localcourse.userStatus * 1 === 2) {
        return true
      } else {
        return false
      }
    }
  },
  props: ['Localcourse','Localchapters', 'changes'],
  methods: {
    change(index) {
      this.changes(index)
    },
    dialog(data) {   //章节点击跳转
      this.dialogTag = 1
      this.dialogText = '报名后才可以观看哦～'
      this.url = data.courseUrl
      console.log(this.dialogTag)
      if(this.tokenId) {
        if (this.Localcourse.userStatus * 1 === 1 || this.Localcourse.userStatus * 1 === 2) {
          this.goStudy();
        } else {
          $("#Dialog").modal("toggle");
        }
      } else {
        this.$router.push({
          path: '/login',
          query: {
            redirect_url: `/classdetail?id=${this.$route.query.id}`
          }
        })
      }
    },
    goStudy() {
      this.dialogTag = 2
      this.dialogText = '您选择的课程为收费课程，需要跳转到腾讯课堂，点击确定跳转'
      if(this.Localcourse.price != 0){  //收费课程
        $("#exampleModalCenter").modal("toggle");  //点击弹框
      }else{
        this.$router.push({  //免费课程跳转
          name: 'player',
          query:{
            url: this.url
          }
        })
      }
    },
    gocourse(){  //收费课程弹框 跳转
      location.href = this.url;
    },
    // 报名课程
    singUp() {
      $("#Dialog").modal("toggle");
      this.$post(
        BASE_API + "course/insertVipCourse",
        {
          "tokenId": this.tokenId,
          "courseId": this.$route.query.id
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
          this.dialogTag = 3
          this.dialogText = '报名成功～'
          // $("#Dialog").modal("toggle");
          this.goStudy()

        } else {
          this.$store.commit("showDialog", res.errsmg)
          // 处理其他错误码的情况
        }
      })
      .catch(() => {
        this.$store.commit("hideLoading")
        this.$store.commit("showDialog")
      });
    },
    goreload() {
      window.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.course-list{

  .chapter-list{
    .chapter-list-copy {
      display: flex;
      text-align: start;
      flex-wrap: wrap;
      position: relative;

      /* -webkit-box-align: center; */
      align-items: center;
      justify-content: space-between;
      padding: 12px 8px;

      overflow: hidden;
      border-top: 1px solid rgb(84, 84, 84);
    }
    .chapter-list-title {
      position: absolute;
      left: 40px;
      /* flex-grow: 2; */
    }
    .chapter-list-time {
      position: absolute;
      right: 85px;
    }
    .chapter-list-icon svg {
      fill: rgb(171, 171, 171);
      display: inline-block;
      height: 24px;
      width: 24px;
    }
    .copycolor {
      background-color: rgba(170, 170, 170, 0.2);
    }
  }
  .section {
    display: block;
    background-color: rgb(58, 58, 58);
    .section-list {
      display: flex;
      flex-basis: 100%;
      margin-left: 32px;
      padding: 12px 8px;
      position: relative;
      justify-content: space-between;
    }
    .section-list-button{
      display: inline-block;
      height: 30px;
      padding: 0 10px;
      font-size: 14px;
      line-height: 30px;
      text-align: center;
      border-radius: 5px;
      border: 1px solid transparent;
      color: #efefef;
      background-color: #f96816;
    }
    .section-list-button-gray {
      display: inline-block;
      height: 30px;
      padding: 0 10px;
      font-size: 14px;
      line-height: 30px;
      text-align: center;
      border-radius: 5px;
      border: 1px solid transparent;
      color: #efefef;
      background-color: rgba(170, 170, 170, 0.2);
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
}
</style>