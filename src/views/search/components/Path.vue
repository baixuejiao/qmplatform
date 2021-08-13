<template>
  <div id="spath">
    <h4 id="spath-title">
      学习路径
      <a href="javascript:void(0)" v-if="path_list.length>2" @click="allPath">查看全部学习路径></a>
    </h4>
    <div id="spath-content">
      <section class="spath-list" v-for="(item, index) in path" :key="index">
        <span class="spath-img">
          <img :src="imgUrl+item.pathImg" alt="">
        </span>
        <div>
          <h4 @click="goPaths(item)">{{item.pathName}}</h4>
          <p>
            课程数量：{{item.courseCount}}
            <span> · </span>
            课程时长：{{formatDate(item.courseTime)}}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {formatDate} from '@/assets/js/common.js'

export default {
  data(){
    return{
      imgUrl: window.CDN_URL
    }
  },
  computed: {
    path() {
      return this.path_list.slice(0,2);
    }
  },
  props: ['path_list', 'changeType'],
  methods: {
    ...{formatDate},
    goPaths(data) {
      this.$router.push({
        name: 'pathdetails',
        query: {
          id: data.pathId
        }
      })
    },
    allPath() {
      this.changeType({
        name: '学习路径',
        tag: 'paths',
        status: false
      })
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/base.scss';
  #spath{
    color: $fontColorWhite;

    #spath-title{
      display: flex;
      justify-content: space-between;
      margin: 24px 0px 12px;
      font-size: 14px;
      font-weight: normal;

      a{
        color: $fontColorWhite;
      }
    }
    #spath-content{
      display: flex;

      .spath-list{
        display: flex;
        // width: calc(100%-1px);
        width: 50%;
        margin-right: 1px;
        padding: 15px 0;
        background: $fontColor;
        cursor: pointer;

        &:hover{
          h4{
            text-decoration: underline;
          }
        }

        .spath-img{
          display: block;
          width: 55px;
          height: 55px;
          margin: auto 16px;
          border-radius: 50%;
          background: #181818;
          overflow: hidden;
        
          img{
            width: 100%;
            height: 100%;
          }
        }
        h4{
          font-size: 14px;
          font-weight: normal;
          line-height: 2.0;
        }
        p{
          font-size: 12px;
          line-height: 2.0;
          color: $grayColor;
          span{
            margin: 0 6px;
          }
        }
      }
    }

  }
</style>