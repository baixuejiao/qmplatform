<template>
  <div class="course-view">
    <div class="course-view-title">课程</div>
    <div>
      <course-list v-for="(item, index) in list" :key="index" :data="item"></course-list>
    </div>

    <pagination :records="total" @paginate="paginate" :per-page="maxCount" v-model="page"></pagination>

  </div>
</template>

<script>
import courseList from './CourseListTpl.vue'
export default {
  data() {
    return {
      keyword: '',
      categoryId: this.$route.query.id,
      maxCount: 10,
      page: 1,
      list: [],
      total: 0
    }
  },
  props: ['course_list'],
  components: {
    courseList
  },
  methods: {
    getData() {
      this.$store.commit("showLoading")
      this.$post(
        BLOG_API + "course/getCourseList",
        {
          maxCount: this.maxCount,
          page: this.page,
          keyword: this.keyword
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
  create() {
    this.keyword = this.$route.query.keyword == 'all' ? '' : this.$route.query.keyword
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/base.scss';
  .course-view{
    padding-bottom: 40px;
  }
  .course-view-title{
    padding: 24px 0px 12px;
    font-size: 12px;
    color: $fontColorWhite;
    border-bottom: 1px solid #363636;
  }
</style>