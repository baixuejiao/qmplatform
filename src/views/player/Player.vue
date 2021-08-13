<!-- 
  个人信息主页
  author: bxj
  create-time: 2019-08-23
-->
<template>
  <div id="player">
    <div id="player-container">
      <player-tpl v-if="playerSrc" :src="playerSrc" width="100%" :height="cHeight"></player-tpl>
    </div>
  </div>
</template>

<script>
import playerTpl from '@/components/Player.vue';

export default {
  data() {
    return {
      playerSrc: this.$route.query.url,
      // playerSrc: 'https://player.bilibili.com/player.html?aid=42774142&cid=75019552&page=1'
    }
  },
  components: {
    playerTpl
  },
  computed: {
    /**
     * 获取屏幕高度
     */
    cHeight() {
      let _hei = 0
      if(localStorage.getItem('token')) {
        _hei = 64;
      } else {
        _hei = 85;
      }
      return document.documentElement.clientHeight - _hei;
    }
  },
  methods: {
  },
  created() {
  }

}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/base.scss';
  #player{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    #player-container{
      width: 80%;
      margin: 0 auto;
    }
  }
 
</style>