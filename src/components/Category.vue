<template>
  <!-- <div class="browse_item_wrapper"> -->
    <!-- 上面两个大框 -->
    <div class="featured_items" v-if="categorys.length>0">
      <div
        class="featured_item"
        @click="skip(item)"
        v-for="(item,index) in categorys"
        :key="index"
      >
        <div class="featured_item_content">
          <div class="featured_item_text">
            <h2>{{item.cateName}}</h2>
          </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
export default {
  props: ['categorys'],
  methods: {
    //点击categorys板块 跳转
    skip(obj) {
      //本地存储cateName 防止刷新丢失数据
      this.categorys.filter((item) => {
        if(item == obj){
          window.localStorage.setItem('localData',obj.cateName)
        }
      })
      this.$router.push({
        name: "courselist",
        query: {
          id: obj.cateId
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.featured_items {
  // min-width: 260px;
  position: relative;
  flex: 1 0 100%;
  align-self: stretch;
  display: flex;
  flex-wrap: wrap;
}
.featured_item {
  flex: 1 0 31%;
  // flex-wrap:nowrap;
  max-width: 100%;
  height: 120px;
  margin-left: 15px;
  border-bottom: 10px solid rgb(255, 194, 0);
  background-color: #222;
  padding: 0 0 15px;
  margin-bottom: 15px;
  transition: all 300ms;
}
.featured_item:hover {
  cursor: pointer;
  background-color: rgb(49, 49, 49);
}
.featured_item_text {
  text-align: center;
  color: #ccc;
  font-size: 12px;
  max-width: inherit;
  margin: 50px auto 0 auto;
}
.featured_item_text > h2 {
  font-weight: 900;
  font-size: 28px;
  margin-top: -7px;
  color: rgb(255, 255, 255);
  line-height: 1;
}
</style>