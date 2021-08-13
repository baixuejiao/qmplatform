<template>
  <div v-show="bookmarksList.length">
    <section class="bookmarks">
      <div class="bookmarksHeader">
        <div>
          <h2 class="headerTitle">
            收藏
            <span class="screenReaderText"></span>
          </h2>
          <span>
            <a class="headerLink" href @click.prevent="goallbookmarks">浏览全部 ></a>
          </span>
        </div>
      </div>
      <div class="bookmarks_list">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">课程名称</th>
              <th scope="col">课程等级</th>
              <th scope="col">课程时长</th>
              <th scope="col">教师</th>
              <th scope="col">创建时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in bookmarksList" :key="index">
              <td>
                <a @click="goCourseDetails(item)">{{item.title}}</a>
              </td>
              <td>{{setLevel(item.level)}}</td>
              <td>{{formatDate(item.duration)}}</td>
              <td>{{item.teacher.nickName}}</td>
              <td>{{item.createTime}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
<script>
import { formatDate, setLevel } from "@/assets/js/common.js";

export default {
  name: "TableBookmarks",
  props: ["bookmarksList"],
  data() {
    return {};
  },
  methods: {
    ...{ formatDate, setLevel },
    goallbookmarks() {
      this.$router.push(`/bookmarks`);
    },
    goCourseDetails(data) {
      this.$router.push({
        name: 'classdetail',
        query: {
          id: data.courseId
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/home.scss';
.bookmarks {
  margin-top: 20px;
}
.bookmarksHeader {
  display: flex;
  justify-content: space-between;
  margin: 20px 0 0 0;
}
.carousel-ul li {
  margin-right: 20px;
}
.carousel-ul li:last-child {
  margin-right: 0;
}
.tile {
  padding: 20px;
  text-align: center;
  height: 220px;
  width: 100%;
  background-color: #222;
  color: #efefef;
  position: relative;
}
.imageContainer {
  margin: 15px 0;
}
.imageContainer img {
  max-width: 100%;
  vertical-align: middle;
}
.titleWrapper {
  position: relative;
  height: 52px;
}
.title {
  font-size: 18px;
  font-weight: 300;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: white;
  margin-top: 25px;
  position: absolute;
  left: 0;
  right: 0;
  line-height: 1.33333;
}
.bookmarks_list .table {
  margin-top: 20px;
  color: #fff;
  text-align: left;
  font-style: normal;
}
.table thead th {
  padding: 0.15rem;
  vertical-align: top;
  border-top: none;
  border-bottom: 0.1px solid #aaaaaa;
  color: #aaaaaa;
  font-size: 12px;
  font-weight: 200;
}
.table tbody tr {
  border-bottom: 0.1px solid #aaaaaa;
}
.table tbody tr:last-child {
  border-bottom: none;
}
.table tbody td {
  font-size: 14px;
  padding: 10px 0.15rem;
  vertical-align: top;
  border: none;
  font-weight: 200;
  color: #efefef;
}
.table tbody td a {
  color: #efefef;
}
.footer {
  margin-top: 20px;
  font-size: 14px;
  background-color: transparent;
  border-color: #f96816;
  color: #f96816;
}
</style>