<template>
  <div class="browse_paths" v-if="paths.length>0">
    <h2 class="browse_paths_head">热门路径</h2>
    <div>
      <ul class="popular_paths_items">
        <li
          class="paths_item_wrapper"
          v-for="(item,index) in paths"
          :key="index"
          @click="goPathDetail(item.pathId)"
        >
          <div>
            <a class="paths_item">
              <div v-if="item && item.pathImg">
                <img class="paths_item_img" :src="imgUrl+item.pathImg" alt />
              </div>
              <div class="paths_item_title" v-if="item && item.pathName">{{item.pathName}}</div>
            </a>
          </div>
        </li>
      </ul>
    </div>
    <a @click="goPath" class="browse_path_link">
      <span>浏览全部路径 ></span>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: window.CDN_URL,
    }
  },
  props: ['paths'],
  methods: {
    //点击paths 传参
    goPathDetail(id) {
      console.log(id);
      this.$router.push({
        name: "pathdetails",
        query: {
          id
        }
      });
    },
    goPath() {
      this.$router.push('/paths')
    }
  }
}
</script>

<style lang="scss" scoped>
.browse_paths {
  padding: 0 0 16px 15px;
}
.browse_paths_head {
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: #fff;
  margin: 12px 0 16px 0;
  text-align: left;
}
.popular_paths_items {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-right: calc(-1 * 24px);
}
.paths_item_wrapper {
  width: calc(33% - 24px);
  margin: 0 24px 24px 0;
}
.paths_item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #222;
  border-radius: 2px;
  overflow: hidden;
  text-decoration: none;
  transition: all 300ms;
}
.popular_course_item {
  transition: all 300ms;
}
.paths_item:hover,
.popular_course_item:hover {
  background-color: rgb(49, 49, 49);
}
.paths_item_img {
  background-size: auto;
  height: 95px;
  flex: 0 0 auto;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  margin-right: 16px;
}
.paths_item_title {
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  color: #fff;
  white-space: nowrap;
}
.browse_path_link {
  span{
    color: #aaa;  
    cursor: pointer;
  }
  display: block;
  text-decoration: none;
  color: #aaa;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  width: 105px;
}
.browse_path_link:hover {
  span{
   color: #fff;
  }
}
// a {
//   display: block;
//   padding: 7px 0;
//   line-height: 16px;
//   cursor: pointer;
//   color: #7c7c7d;
//   text-align: left;
// }
</style>