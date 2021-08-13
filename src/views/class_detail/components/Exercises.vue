<!-- 练习题 -->
<template>
  <div class="top-none" v-if="skillList.length>0">
    <section
      class="exercises-list"
      v-for="(item,index) in skillList"
      :key="index">
      <span class="exercises-list-title" v-if="item&&item.title">{{item.title}}练习题</span>
      <button :class="[tokenId ?'exercises-list-btn' : 'exercises-list-button-gray']" @click="goSkill(item.secId)">去练习</button>
    </section>

    <div class="modal fade" id="mydialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">温馨提示</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">报名本课程后才可以做题喔～</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="singUp">报名</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    本课程暂无练习题
  </div>
  
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      secId: -1,
      tokenId: localStorage.getItem('tokenId') || '',
    }
  },
  props: ['skillList', 'Localcourse'],
  methods: {
    // 报名课程
    singUp() {
      $("#mydialog").modal("toggle");
      // $("#mydialog").modal("toggle");
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
          this.goToSkill();
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
    // 跳转到考试页面
    goToSkill() {
      this.$router.push({
        path: '/sections-skill-assessment',
        query: {
          secId: this.secId
        }
      })
    },
    goSkill(secId) {
      this.secId = secId
      // let url = `${SKILL_URL}skill-assessment?qtitle=${_title}&tokenId=${localStorage.getItem('tokenId')}`
      // window.open(url)
      if (this.tokenId) {
        if (this.Localcourse.userStatus * 1 === 1 || this.Localcourse.userStatus * 1 === 2) {
          this.goToSkill();
        } else {
          $("#mydialog").modal("toggle");
        }
      } else {
        this.$router.push({
          path: '/login',
          query: {
            redirect_url: `/sections-skill-assessment?secId=${secId}`
          }
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.exercises-list {
  display: flex;

  justify-content: space-between;
  padding: 12px 8px;
  overflow: hidden;
  border-bottom: 1px solid rgb(84, 84, 84);
  position: relative;

  .exercises-list-title {
    flex-grow: 2;
  }
  .exercises-list-btn {
    width: 80px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid transparent;
    background-color: #f96816;
    color: #efefef;
    font-weight: 500;
  }
  .exercises-list-button-gray {
    width: 80px;
    height: 30px;
    border-radius: 5px;
    font-weight: 500;
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
</style>