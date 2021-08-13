<template>
  <div class="browsePage">
    <!-- 上面部分 -->
    <div class="browse_item_wrapper">
      <!-- 上面两个大框 -->
     
      <category :categorys="categorys"></category>
      <Skill-Entry></Skill-Entry>
     
      <!-- 中间八个小框 -->
      <!-- <div class="midlle_items">
        <div class="midlle_item">
          <a href>
            <span></span>
          </a>
        </div>
        <div class="midlle_item">
          <a href>
            <span></span>
          </a>
        </div>
        <div class="midlle_item">
          <a href>
            <span></span>
          </a>
        </div>
        <div class="midlle_item">
          <a href>
            <span></span>
          </a>
        </div>
        <div class="midlle_item">
          <a href>
            <span></span>
          </a>
        </div>
        <div class="midlle_item">
          <a href>
            <span></span>
          </a>
        </div>
        <div class="midlle_item">
          <a href>
            <span></span>
          </a>
        </div>
        <div class="midlle_item">
          <a href>
            <span></span>
          </a>
        </div>
      </div>-->
      <!-- 下面两个大框 -->
      <!-- <div class="roleIQ_items">
        <div class="roleIQ_item">
          <a href>
            <div class="roleIQ_item_content">
              <div class="roleIQ_item_title">
                <span></span>
              </div>
              <div class="roleIQ_item_text">
                Welcome to the standard for measuring
                <br />success in technology roles.
              </div>
            </div>
          </a>
        </div>

        <div class="roleIQ_item">
          <a href>
            <div class="roleIQ_item_content">
              <div class="roleIQ_item_title">
                <span></span>
              </div>
              <div class="roleIQ_item_text">
                Welcome to the standard for measuring
                <br />success in technology roles.
              </div>
            </div>
          </a>
        </div>
      </div>-->
    </div>
    <!-- Popular paths -->
    <popular-path :paths="paths"></popular-path>
   
    <!-- 下面部分 -->
    <course :courses="courses" :popularCourses="popularCourses"></course>

  </div>
</template>
<script>
import Category from '@/components/Category.vue'
import SkillEntry from '@/components/SkillEntry.vue'
import PopularPath from '@/components/PopularPath.vue'
import Course from '@/components/Course.vue'

export default {
  data() {
    return {
      imgUrl: window.CDN_URL,
      categorys: [],
      courses: [],
      paths: [],
      popularCourses: []
    };
  },

  methods: {
    //页面加载获取数据
    getData() {
      this.$get(BASE_API+"browse/getBrowse", {
        headers: {
          token:localStorage.getItem('token')
        }
      }).then(res => {
        if (res.errno * 1 === 101) {
          console.log(res);
          this.categorys = res.data.categorys;
          this.courses = res.data.courses;
          this.paths = res.data.paths;
          this.popularCourses = res.data.popularCourses;
        } else {
          this.$store.commit("showDialog", res.errsmg)
        }
      }).catch(err => {
        this.$store.commit("showDialog")
      });
    },
  },

  created() {
    this.getData();
  },

  components: {
    SkillEntry,
    Category,
    PopularPath,
    Course
  }
};
</script>
<style lang="scss" scoped>
.browsePage{
  a:hover {
    // text-decoration: none;
    cursor: pointer;
    text-decoration: underline !important;
  }
  .browsePage {
    min-height: calc(100vh - 62px);
    margin-left: -15px;
    min-width: 1140px;
    padding: 20px;
  }
  
  // 上面部分
  .browse_item_wrapper {
    display: flex;
    flex-wrap: wrap;
    min-width: 260px;
    position: relative;
    flex: 1 0 21%;
    align-self: stretch;
  }
}
</style>