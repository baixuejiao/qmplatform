<template>
  <div class="path-view">
    <h4 class="path-view-title">学习路径</h4>
    <path-list v-for="(item, index) in path_list" :key="index" :data="item"></path-list>
  </div>
</template>

<script>
import pathList from './PathListTpl.vue'
export default {
  props: ['path_list'],
  components: {
    pathList
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/base.scss';
  .path-view{
    padding-bottom: 40px;
  }
  .path-view-title{
    padding: 24px 0px 12px;
    font-size: 12px;
    color: $fontColorWhite;
    border-bottom: 1px solid #363636;
  }
</style>