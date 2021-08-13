<template>
  <div class="coder-aside">
    <div class="desc-bar">
      <p>习题描述</p>
      <div class="db-title">
        <!-- 1.2 <span class="util-border"/>  -->
        {{exerciseInfo.title}}
      </div>
      <p class="bd-desc">
        {{exerciseInfo.content}}
      </p>
    </div>
    <div class="opinion-bar" v-if="exerciseInfo.userAnswer">
      <div class="desc-bar">
        <div class="db-title">教师批注</div>
        <div>
          {{exerciseInfo.notation}}
        </div>
        <!-- <ul class="bd-desc"> -->
          <!-- <li>1、尽量使用es6语法</li>
          <li>2、注意事件复杂度</li>
          <li>3、注意代码备注</li> -->
        <!-- </ul> -->
      </div>
    </div>
    <div class="close-bar">
      <button @click="$emit('closeEditor','exit')" type="button" class="btn btn-secondary btn-lg btn-block">放弃答题并关闭</button>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    exercise:{
      type:Object,
      default:()=>{}
    }
  },
  computed:{
    exerciseInfo(){
      return this.exercise;
    }
  }
}
</script>
<style lang="scss" scoped>
  .coder-aside{
    position: relative;
    color:#aaa;
    height: 100%;
    .desc-bar{
      padding:20px;
      border-bottom:1px solid #171717;
      .bd-desc{
        color: #ddd;
        li{
          margin:5px 0;
        }
      }
      .db-title{
        margin:15px 0;
        font-size: 18px;
        font-weight: bolder;
        color: #ffc107;
        .util-border{
          border-right: 1px solid #ffc107;
          margin: 0 7px 0 5px;
        }
      }
    }
  }
  .close-bar{
    position: absolute;
    bottom: 20px;
    left: 0;
    padding: 0 20px;
    width: 100%;
    button{
      border-radius: 0 !important;
    }
  }
</style>