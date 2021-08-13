<template>
  <div class="course__container">
    <section class="content-top">
      <h1 class="content-top-title">{{cateName}}</h1>
    </section>
    <div class="content-moke"></div>
    <div class="clearance"></div>
    <section class="curriculums-table">
      <h2 class="curriculums-table-title">路径</h2>
      <div class="trending-items">
        <ul class="clearfix">
          <li class="trending-item" v-for="(item,index) in paths" :key="index">
            <a @click="goPathDetail(item.pathId)">{{item.pathName}}</a>
          </li>
        </ul>
      </div>
    </section>
    <div class="content-box">
      <ul class="tab-list clearfix">
        <li class="tab-newest">
          <!-- <router-link
            :class="[{tabListItemSelected: shows == '1'},'tabListNewestItem']"
            to="/courselist"
            @click.native="newestShow"
          >Newest</router-link> -->
          <a
            :class="[{tabListItemSelected: shows == '1'},'tabListNewestItem']"
            @click="newestShow"
          >最新课程</a>
        </li>
        <li class="tab-popular">
          <a
            :class="['tabListNewestItem', 'single',{tabListItemSelected: shows == '2'}]"
            @click="popularShow"
          >热门课程</a>
        </li>
        <li class="tab-all" v-if="tokenId">
          <a @click="goSearch">浏览全部课程</a>
        </li>
      </ul>
      <div class="conten-main">
        <newest-tpl v-if="shows == 1" :newest="newCourses" :showBtn=false></newest-tpl>
        <popular-tpl v-if="shows == 2" :popular="popularCourses"></popular-tpl>
      </div>
    </div>
  </div>
</template>
<script>
import newestTpl from '@/components/Newest.vue'
import popularTpl from '@/views/courselist/popular/Popular.vue'
export default {
  data() {
    return {
      cateName: "",
      newCourses: [],
      paths: [],
      popularCourses: [],
      shows: "1",
      tokenId: localStorage.getItem('tokenId')
    };
  },
  components: {
    newestTpl,
    popularTpl
  },
  methods: {
    //添加动态标识
    newestShow() {
      this.shows = "1";
    },
    popularShow() {
      this.shows = "2";
    },
    goSearch() {
      this.$router.push({
        name: "searchClassify",
        query: {
          keyword: this.cateName,
          id: this.$route.query.id
        }
      });
    },
    //点击课程名称传参
    goClassDetail(id) {
      this.$router.push({
        name: "classdetail",
        query: {
          id
        }
      });
    },
    //点击paths传参
    goPathDetail(id) {
      this.$router.push({
        name: "pathdetails",
        query: {
          id
        }
      });
    },
    //判断path 添加动态类
    addActiveClass() {
      if (location.pathname == "/courselist/popular") {
        this.shows = "2";
      } else {
        this.shows = "1";
      }
    },
    //发送请求
    getData() {
      this.$post(
          BASE_API+"category/getCategory",
        {
          cateId: this.$route.query.id
        },
        {
          headers: {
            token:localStorage.getItem('token')
          }
        }
      ).then(res => {
        console.log(res);
        if (res.errno * 1 === 101) {
          this.newCourses = res.data.newCourses;
          this.paths = res.data.paths;
          this.cateName = res.data.cateName;
          this.popularCourses = res.data.popularCourses;
        } else {
          this.$store.commit("showDialog", res.errsmg)
        }
      }).catch( err => {
        console.log(err)
        this.$store.commit("showDialog")
      });
    },
    // 获取本地存储数据
    getLocalData(){
      this.cateName = window.localStorage.getItem('localData');
    }
  },

  created() {
    this.addActiveClass();
    this.getData();
    // this.getLocalData();
  },

};
</script>
<style scoped>
* {
  box-sizing: inherit;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
li {
  list-style: none;
}
body {
  font-family: Gotham SSm A, Gotham SSm B, Helvetica Neue, Helvetica, Roboto,
    Arial, sans-serif;
}
h2 {
  letter-spacing: -0.015em;
  margin-bottom: 1.71429rem;
  display: block;
}
h1 {
  letter-spacing: -0.015em;
  display: block;
  margin-bottom: 1.71429rem;
}
ul {
  margin-left: 0;
  padding-left: 0;
  margin-bottom: 1.71429rem;
}
.course__container {
  height: 100%;
  min-width: 1010px;
  position: relative;
}
.content-top {
  background-image: url("../../assets/imgs/head.jpg");
  background-repeat: no-repeat;
  background-position: top left;
  background-size: cover;
  height: 190px;
  position: relative;
}
.content-top::before {
  bottom: 0;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  box-sizing: inherit;
}
.content-top-title {
  font-size: 2.57143rem;
  line-height: 1.2em;
  position: absolute;
  font-weight: 100;
  top: 111px;
  left: 15px;
  text-transform: capitalize;
  color: #f2f2f2;
}
.clearance {
  width: 100%;
  height: 10px;
  margin-bottom: 15px;
  background-color: #0c9dbf;
}
.curriculums-table {
  margin-left: 15px;
}
.curriculums-table-title {
  font-size: 1.42857rem;
  line-height: 1.5em;
  font-weight: 100;
  color: #efefef;
  text-align: left;
  margin-bottom: 1.71429rem;
}
.content-box {
  margin: 0 15px;
  background-color: #222;
}
.trending-items {
  margin-left: -15px;
}
.trending-item {
  border-radius: 2px;
  background: #222;
  padding: 10px;
  margin-left: 15px;
  float: left;
  list-style-type: none;
}
.trending-item a {
  text-decoration: none;
  color: #777;
}
.tab-list {
  height: 65px;
  position: relative;
  margin-bottom: 0;
  padding-right: 15px;
  border-bottom: 1px solid rgb(54, 54, 54);
}
.tab-list li {
  float: left;
  height: 65px;
  line-height: 65px;
}
.tab-list .tab-newest {
  padding-left: 15px;
}
.tab-list .tab-popular {
  padding-left: 15px;
}
.tab-list a{
  color: #fff;
}
.tabListNewestItem,
.tab-list__popularItem {
  color: #fff;
  text-decoration: none;
}
a:link {
  cursor: pointer;
}
.tabListItemSelected {
  color: #efefef;
  font-weight: 500;
  border-bottom-color: #f05a28 !important;
  cursor: default;
}
.tab-list__popularItem {
  font-size: 1rem;
  line-height: 1.71429;
  color: #efefef;
  font-weight: 100;
  display: block;
  padding: 23px 0;
  margin-left: 30px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}
.tab-list .tab-all {
  float: right;
  margin-right: 15px;
}
.tab-list .tab-all a {
  color: #f96816;
}
.tabListNewestItem {
  font-size: 1rem;
  line-height: 0.71429;
  height: 65px;
  color: #efefef;
  font-weight: 100;
  display: block;
  padding: 23px 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}
.single {
  margin-left: 30px;
}
.content-moke {
  position: absolute;
  top: 0;
  left: 0;
  height: 190px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
a:hover{
  color: #fff !important;
  cursor: pointer;
}
.trending-item a:hover{
  text-decoration: none !important;
}
</style>