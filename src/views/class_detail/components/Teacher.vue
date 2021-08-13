<template>
  <aside class="pannel-aside">
    <div class="aside-section">
      <h2 class="aside-section-title">授课老师</h2>
      <div class="teacher">
        <div class="teacher-avatar">
          <img v-if="Localcourse.teacher&&Localcourse.teacher.portrait" :src="imgUrl+Localcourse.teacher.portrait" alt />
        </div>
        <div class="teacher-name" v-if="Localcourse.teacher&&Localcourse.teacher.nickName">
          <a v-if="Localcourse" href="javascript:void(0)" @click="pushteacher(Localcourse.teacher.teaId)">{{Localcourse.teacher.nickName}}</a>
        </div>
      </div>
      <p v-if="Localcourse.teacher&&Localcourse.teacher.intro" class="teacher-intro">{{Localcourse.teacher.intro}}</p>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: window.CDN_URL,
      tokenId: localStorage.getItem('tokenId') || '',
    }
  },
  props: ['Localcourse'],
  methods: {
    pushteacher(teacherid){  //跳转教师信息页面
      // console.log()
      if (this.tokenId) {
        this.$router.push({
          name:"teacherInformation",
          query:{
            teacherid
          }
        })
      } else {
        this.$router.push({
          name: 'login',
          query: {
            redirect_url: `/teacherInformation?teacherid=${teacherid}`
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pannel-aside {
  background-color: rgb(32, 32, 32);
  width: 250px;
  min-height: 100vh;
  float: left;
  .aside-section {
    padding: 24px 30px;
    text-align: start;
    color: white;
  }
  .aside-section-title {
    font-size: 1rem;
    line-height: 1em;
    font-weight: 300;
    margin: 0 0 24px;
  }
  .teacher {
    display: flex;
    margin-bottom: 12px;
  }
  .teacher-avatar {
    padding-right: 10px;
  }
  .teacher-avatar img {
    width: 50px;
    border: 1px solid transparent;
    border-radius: 50%;
  }
  .teacher-name {
    float: left;
  }
  .teacher-name a {
    font-size: 1rem;
    line-height: 1.2em;
    display: block;
    color: #f96816;
    margin-top: 18px;
  }
  .teacher-intro {
    word-wrap: break-word;
    font-size: 0.85714rem;
    line-height: 1.5em;

  }
}

</style>