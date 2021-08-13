<template>
  <div class="browse_page_main">
    <div class="browse_main_left">
      <div class="main_left_wrapper" v-if="courses.length>0">
        <h2 class="browse_left_title">最新课程</h2>
        <!-- <div class="browse_left_item"> -->
        <Newest :newest="newCourse" :showBtn=true />
        <!-- </div> -->
      </div>
    </div>
    <div class="browse_main_right">
      <div class="main_right_wrapper" v-if="popularCourses.length>0">
        <h2 class="browse_right_title">热门课程</h2>
        <ol class="popular_course_list">
          <li class="popular_course_item" v-for="(item,index) in hotCourse" :key="index">
            <a @click="goClassDetail(item.courseId)">{{index+1}}.{{item.title}}</a>
            <p v-if="item.teacher && item.teacher.nickName">
              By
              <a
                class="teacher_name"
                @click="goTeacherDetail(item.teacher.teaId)"
              >{{item.teacher.nickName}}</a>
            </p>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import Newest from "./Newest.vue";
export default {
  computed: {
    newCourse() {
      return this.courses.slice(0,5)
    },
    hotCourse() {
      return this.popularCourses.slice(0,7)
    }
  },
  props: ['courses', 'popularCourses'],
  components: {
    Newest
  },
  methods: {
    //点击popular courses 传参
    goClassDetail(id) {
      this.$router.push({
        name: "classdetail",
        query: {
          id
        }
      });
    },

    //点击教师姓名 传参
    goTeacherDetail(teacherid) {
      this.$router.push({
        name: "teacherInformation",
        query: {
          teacherid
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.browse_page_main {
  padding: 0 0 16px 15px;
}
.browse_main_left {
  float: left;
  width: 75%;
}
.browse_main_right {
  float: right;
  width: 25%;
  display: inline-block;
  padding-left: 15px;
  vertical-align: top;
  margin-bottom: 15px;
}
.main_left_wrapper,
.main_right_wrapper {
  background-color: #222;
  padding: 30px;
  text-align: left;
}
.main_left_wrapper {
  padding-bottom: 0;
}
.browse_left_title,
.browse_right_title {
  font-size: 0.85714rem;
  line-height: 2;
  text-transform: uppercase;
  font-weight: 400;
  color: #efefef;
  margin-bottom: 24px;
  margin-left: 10px;
}
.popular_course_list {
  color: #efefef;
  padding-left: 0;
  text-align: left;
}
.popular_course_item {
  font-weight: 400;
  text-transform: capitalize;
  // list-style-type: decimal;
  // list-style-position: inside;
  text-align: left;
  margin-left: 10px;
}
.popular_course_item > a {
  display: block;
  color: #efefef;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.popular_course_item > p {
  font-size: 0.85714rem;
  line-height: 2;
  font-weight: 400;
  margin-bottom: 10px;
  color: #777;
}

.teacher_name {
  color: #aaaaaa;
}
.teacher_name:hover {
  color: #fff;
}
</style>