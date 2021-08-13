<template>
  <div id="searchClassify">
    <h1 id="searchClassify-title">{{name}}</h1>
    <p id="searchClassify-type">课程</p>
    <div>
      <Course v-for="item in list" :key="item.courseId" :data="item"></Course>
    </div>

    <pagination :records="total" @paginate="paginate" :per-page="maxCount" v-model="page"></pagination>
  </div>
</template>

<script>
import Course from './components/course.vue'
export default {
  data() {
    return {
      name: this.$route.query.keyword,
      categoryId: this.$route.query.id,
      maxCount: 10,
      page: 1,
      list: [],
      total: 0
    }
  },
  components: {
    Course
  },
  methods: {
    getData() {
      this.$store.commit("showLoading")
      this.$post(
        BLOG_API + "course/getCourseList",
        {
          maxCount: this.maxCount,
          page: this.page,
          categoryId: this.categoryId
        }
      )
      .then(res => {
        this.$store.commit("hideLoading")
        if (res.errno * 1 === 101) {
          this.list = res.data.pageData.list;
          this.total = res.data.pageData.total;
        } else {
          this.$store.commit("showDialog", res.errsmg)
        }
      })
      .catch(() => {
        this.$store.commit("hideLoading")
        this.$store.commit("showDialog")
      });
    },
    paginate(page) {
      this.page = page;
      this.getData();
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
  #searchClassify{
    padding: 15px 60px 0;
    color: #fff;

    #searchClassify-title{
      margin: 36px auto 6px;
      font-size: 24px;
      font-weight: 300;
    }
    #searchClassify-type{
      padding: 24px 0 12px;
      font-size: 12px;
      border-bottom: 1px solid rgb(54, 54, 54);
    }
    .VuePagination {
      margin-top: 20px;
    }
    
  }
</style>