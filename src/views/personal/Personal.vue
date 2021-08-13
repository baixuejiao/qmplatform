<!-- 
  个人信息主页
  author: bxj
  create-time: 2019-08-23
-->
<template>
  <div id="personal" class="row">
    <section id="personal-slider" class="col-3">
      <span  v-if="userInfo && userInfo.image" id="personal-avatar" :style="{backgroundImage:`url(${userInfo.image})`}" alt=""></span>
      <p id="personal-name" v-if="userInfo&&userInfo.name">{{userInfo.name}}</p>
      <ul class="personal-infolist">
        <li v-if="course_list&&course_list.length>0">
          <img src="../../assets/imgs/personal/course-icon.png">
          我的课程：{{course_list.length}}
        </li>
        <li v-if="skill_list&&skill_list.length>0">
          <img src="../../assets/imgs/personal/path-icon.png">
          我的路径： {{skill_list.length}}
        </li>
        <li v-if="blog_list&&blog_list.length">
          <img src="../../assets/imgs/personal/blog-icon.png">
          我的文章：{{blog_list.length}}
        </li>
      </ul>
      <p class="personal-myskill" v-if="tag != 'info'" @click="changeTag('info')">
        <img src="../../assets/imgs/personal/personal-icon.png">
        个人信息
      </p>
      <p class="personal-myskill" v-if="tag != 'result'" @click="changeTag('result')">
        <svg viewBox="0 0 512 512" aria-label="Skill IQ" class="_3AaTpHcO"><title>Skill IQ</title><defs><linearGradient x1="23.812%" y1="22.445%" x2="100%" y2="100%" id="icon-datacamp-linearGradient-10"><stop stop-color="#F05A28" offset="0%"></stop><stop stop-color="#E80A89" offset="100%"></stop></linearGradient></defs><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill-rule="nonzero"><path d="M512,256 L512,512 L256,512 C114.615104,512 0,397.384896 0,256 C0,114.615104 114.615104,0 256,0 C397.384896,0 512,114.615104 512,256 Z" fill="url(#icon-datacamp-linearGradient-10)"></path><circle fill="#222222" cx="260.736" cy="260.736" r="132.736"></circle></g></g></svg>
        我的技能测试报告
      </p>
      <p class="personal-myskill" v-if="tag !='base'" @click="changeTag('base')">
        <img src="../../assets/imgs/personal/info-icon.png">
        查看我的学习信息
      </p>
      
    </section>
    <section id="personal-container" class="col-9">
      <baseInfo v-if="tag=='base'" :skill_list="skill_list" :courselist="courselist" :bloglist="blog_list" />
      <skillResult v-if="tag=='result'" :skill_list="skill_list" />
      <information v-if="tag=='info'" :userInfo="userInfo" />
    </section>
  </div>
</template>

<script>
import {setLevel, formatDate} from '@/assets/js/common.js'

import baseInfo from './components/baseInfo.vue'
import skillResult from './components/skillResult.vue'
import information  from './components/information.vue'

export default {
  data() {
    return {
      tag: 'base',
      imgUrl: window.CDN_URL,
      user_avatar: '',
      user_name: 'shan wei',
      course_list: [],//课程列表
      blog_list: [],//博客文章列表
      skill_list: [],//考试列表
      tokenId: localStorage.getItem('tokenId'),
      token: localStorage.getItem('token'),
      classifySkill: [],
    }
  },
  computed: {
    courselist() {
      if(this.course_list.length > 0) {
        return this.course_list.slice(0, 10);
      } else {
        return []
      }
    },
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  components: {
    baseInfo,
    skillResult,
    information
  },
  methods: {
    ...{setLevel, formatDate},
    changeTag(_tag) {
      this.tag = _tag
    },
    /**
     * 获取用户信息
     */
    getUserData() {
      this.$post(BASE_API+'user/information',
      {
        token_id: this.tokenId
      }, {
        headers: {
          token: this.token,
        }
      })
      .then( res => {
        // handle success
        if( res.errno * 1 === 101) {
          // 处理成功
          this.course_list = res.data.course_list;
          this.blog_list = res.data.blog_list.slice(0, 10);
          this.skill_list = res.data.skill_list;
        } else {
          this.$store.commit("showDialog", res.errsmg)
          // 处理其他错误码的情况
        }
      })
      .catch( err => {
        console.log(err);
        // handle error
        this.$store.commit("showDialog")
      })
    },
    getSuit() {
      this.$post(BASE_API+'suit/getSuit',
      {
        tokenId: this.tokenId
      }, {
        headers: {
          token: this.token,
        }
      })
      .then( res => {
        // handle success
        if( res.errno * 1 === 101) {
          // 处理成功
          this.classifySkill = res.data.reverse().slice(0,10);
          this.date = this.classifySkill.map( item => {
            return item.createTime
          })
          this.score = this.classifySkill.map( item => {
            return item.score
          })
          this.createDrow();

        } else {
          this.$store.commit("showDialog", res.errsmg)
          // 处理其他错误码的情况
        }
      })
      .catch( err => {
        console.log(err);
        // handle error
        this.$store.commit("showDialog")
      })
    },
    /**
     * 进入history页面
     */
    goHistory() {
      this.$router.push('/history')
    },
    // 进入考试列表页面
    goSkill() {
      this.$router.push({
        name: "exercisesPath",
        query: {
          tokenId: this.tokenId
        }
      });
    },
    // 跳转到path考试页面
    goSkillDetails(item) {
      this.$router.push({
				path: "/skill-assessment",
				query: { 
          pathId: item.pathId,
          isParts: 1
        }
			});
    },
    goCourse(item) {
      // console.log(item);
      this.$router.push({
        name: 'classdetail',
        query: {
          id: item.courseId
        }
      })
    },
    goBlog(_data) {
      this.$router.push({
        name: 'blogdetail',
        query: {
          id: _data.blogId
        }
      })
    },
    goBlogList() {
      this.$router.push({
        path: '/bloglist',
        query: {
          status:2
        }
      })
    },
    createDrow() {
      let option = {
        xAxis: {
          type: 'category',
          data: this.date
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.score,
          type: 'line'
        }]
       }

      let chart = echarts.init(this.$refs.chart);
      chart.setOption(option);
    }
  },
  mounted(){
    // this.$nextTick(() => {
    //   this.getSuit()
    // })
  },
  created() {
    this.getUserData()
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
  @import '@/assets/css/base.scss';
  #personal{
    padding-top: 64px;
    margin: 0;

    #personal-slider{
      padding: 24px 16px 24px 24px;
      font-weight: 200;

      #personal-avatar{
        display: block;
        width: 160px;
        height: 160px;
        border-radius: 50%;
        background-color: rgb(154, 23, 27);
        background-size: contain;
      }
      #personal-name{
        margin-top: 16px;
        font-size: 22px;
        color: $fontColorWhite;
      }
      .personal-myskill{
        margin-top: 16px;
        font-size: 16px;
        color: $fontColorWhite;
        cursor: pointer;

        &:hover{
          text-decoration: underline;
        }
        svg{
          width: 14px;
          height: 14px;
          position: relative;
          top: -1px;
        }
        img{
          width: 14px;
        }
      }
      .personal-infolist{
        padding: 10px 0;
        color: #fff;
        font-size: 14px;
        line-height: 1.7;
        border-bottom: 1px solid #aaa;

        img{
          width: 14px;
        }
      }
    }

    #personal-container{
      padding: 24px 24px 24px 8px;
    }
  }
</style>