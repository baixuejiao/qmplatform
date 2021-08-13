<template>
  <div>
    <ul v-if="Localcourse.materialList&&Localcourse.materialList.length>0">
      <li class="metrail-list" v-for="(item ,index) in Localcourse.materialList" :key="index">
        <span class="metrail-list-title">{{item.name}}</span>
        <a v-if="tokenId" :href="baseUrl+item.url" @click="statistics(item)" class="metrail-list-btn">下载</a>
        <a v-else class="metrail-list-btn-gray" @click="goLogin">下载</a>
      </li>
    </ul>
    <!-- <div class="metrail-list" v-if="Localcourse.resId&&Localcourse.resName">
    </div> -->
    <div class="metrail-none" v-else>
      本课程暂无相关资料
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: window.CDN_URL,
      tokenId: localStorage.getItem('tokenId') || '',
      token: localStorage.getItem('token') || '',
    }
  },
  props: ['Localcourse'],
  methods: {
    // 跳转到资料页面
    goMetrial(url) {
      if (this.tokenId) {

        window.open(this.baseUrl+url)
      } else {
        this.$router.push({
          path: '/login',
          query: {
            redirect_url: `/classdetail?id=${this.$route.query.id}`
          }
        })
      }
    },
    // 下载统计
    statistics(item) {
      this.$post(
        BASE_API + "user/userMaterial",
        {
          "tokenId": this.tokenId,
          "courseId": item.courseId,
          "materialId": item.id,
          "name": item.name
        },
        {
          headers: {
            token: this.token
          }
        }
      )
      .then(res => {
        console.log(res.errmsg)
      })
      .catch((err) => {
        console.log(Z_ERRNO)
      });
    },
    goLogin() {
      this.$router.push({
        path: '/login',
        query: {
          redirect_url: `/classdetail?id=${this.$route.query.id}`
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  .metrail-list {
    display: flex;

    justify-content: space-between;
    padding: 12px 8px;
    overflow: hidden;
    border-bottom: 1px solid rgb(84, 84, 84);
    position: relative;

    .metrail-list-title {
      flex-grow: 2;
    }
    .metrail-list-btn {
      display: inline-block;
      width: 80px;
      height: 30px;
      border-radius: 5px;
      line-height: 30px;
      text-align: center;
      border: 1px solid transparent;
      background-color: #f96816;
      color: #efefef;
      font-weight: 500;
    }
    .metrail-list-btn-gray{
      display: inline-block;
      width: 80px;
      height: 30px;
      border-radius: 5px;
      line-height: 30px;
      text-align: center;
      border: 1px solid transparent;
      color: #efefef;
      font-weight: 500;
      background-color: rgba(170, 170, 170, 0.2);
    }
  }
  .metrail-none{
    padding-bottom: 20px;
  }
</style>