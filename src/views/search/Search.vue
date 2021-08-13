<!-- 
  搜索结果页面
  author: bxj
  create-time: 2019-08-23
-->
<template>
  <div id="search">
    <h1 id="search-title">{{ keyword == '' ? '搜索结果' : `'${keyword}'的搜索结果` }}</h1>
    <ul id="search-type">
      <li :class="['search-type-list', item.status ? 'active' : '']" v-for="(item, index) in typeList" :key="index" @click="changeType(item)">
        <a href="javascript:void(0)">
          {{item.name}}
          <span></span>
        </a>
      </li>
    </ul>

    <div class="all-view" v-if="tag == 'all'">
      <path-tpl :path_list="path_list" :changeType="changeType"></path-tpl>
      <course-tpl :new_course_list="new_course_list" :course_list="course_list"></course-tpl>
    </div>

    <div v-if="tag=='paths'">
      <path-view :path_list="path_list"></path-view>
    </div>

    <div v-if="tag=='courses'">
      <course-view :course_list="course_list"></course-view>
    </div>
  </div>
</template>

<script>
import pathTpl from './components/Path.vue'
import courseTpl from './components/Course.vue'

import pathView from './components/PathView.vue'
import courseView from './components/CourseView.vue'

export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      tag: this.$route.query.tag || 'all',
      keyword: this.$route.query.keyword,
      typeList: [
        {
          name: '全部',
          tag: 'all',
          status: true,
        },
        {
          name: '学习路径',
          tag: 'paths',
          status: false
        },
        {
          name: '课程',
          tag: 'courses',
          status: false
        }
      ],
      path_list: [],
      new_course_list:[],
      course_list:[]
    }
  },
  components: {
    pathTpl,
    courseTpl,
    pathView,
    courseView
  },
  methods: {
    /**
     * 切换分类修改分类标签样式
     * params: _item 当前点击的标签 
     */
    changeType(_item) {
      this.typeList.forEach(item => {
        item.status = false
      })
      _item.status = true;
      this.tag = _item.tag
    },
    changeTypeByTag() {
      this.typeList.forEach(item => {
        if(item.tag === this.tag) {
          item.status = true;
        } else {
          item.status = false
        }
      })
    },
    getSearchResult() {
      if (this.keyword == 'all') {
        this.keyword = ''
      }
      this.$store.commit("showLoading")
      this.$post(BASE_API+'homeLogin/getSearchPageList',
      {
        keyword: this.keyword
      }, {
        headers: {
          token: this.token,
        }
      })
      .then( res => {
        this.$store.commit("hideLoading")
        console.log(res);
        // handle success
        if( res.errno * 1 === 101) {
          // 处理成功
          // res.data.data
          // let _data = res.data.data;
          this.path_list = res.data.path_list || [];
          this.course_list = res.data.course_list || [];
          this.new_course_list =  res.data.new_course_list || [];
          
        } else {
          this.$store.commit("hideLoading")
          this.$store.commit("showDialog", res.errsmg)
          // 处理其他错误码的情况
        }
      })
      .catch( err => {
        console.log(err);
        // handle error
        // alert('服务器错误请稍后重试。。。')
        this.$store.commit("showDialog")
      })
    }
    
  },
  created() {
    if(this.keyword) {
      this.getSearchResult()
    }
    if(this.$route.query.tag) {
      this.changeTypeByTag()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/base.scss';
  #search{
    // padding-top: 64px;
    padding: 15px 60px 0px;
    margin: 0;

    #search-title{
      margin-bottom: 6px;
      margin-top: 36px;
      font-size: 24px;
      font-weight: 300;
      color: $fontColorWhite;
    }
    #search-type{
      height: 64px;
      line-height: 64px;
      border-bottom: 1px solid rgb(54, 54, 54);
      
      .search-type-list{
        display: inline-block;
        padding: 0 24px;
        color: $grayColor;
        cursor: pointer;

        a{
          display: inline-block;
          color: $grayColor;
          position: relative;

        
          span{
            display: inline-block;
            width: 100%;
            height: 0;
            transition: height 300ms ease-in-out 0s, opacity 300ms ease-in-out 0s;
            position: absolute;
            left: 0;
            bottom: 0;
          }
          
          &:hover{
            color: $fontColorWhite;
            text-decoration: none;

            span{
              height: 4px;
              background: $grayColor;
            }
          }
        }
        
        &:first-child{
          padding-left: 0;
        }
      }
      .active{
        a{
          color: $fontColorWhite;

          span{
            height: 4px;
            background: $orangeColor;
          }
          &:hover{
            color: $fontColorWhite;

            span{
              height: 4px;
              background: $orangeColor;
            }
          }
        }
      }
    }
    .all-view{
      padding-bottom: 40px;
    }
  }

</style>