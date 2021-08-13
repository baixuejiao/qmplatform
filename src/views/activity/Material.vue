<template>
  <div id="activity-material">
    <div id="activity-material-container" v-if="list.length>0">
      <h3>资料列表</h3>
      <ul class="activity-material-content" >
        <li class="activity-material-list" v-for="item in list" :key="item.id">
          <h5>{{item.name}}</h5>
          <a :href="baseUrl+item.url" class="activity-material-download">下载</a>
        </li>
      </ul>
    </div>
    <div v-else class="activity-material-empty">
      <p>当前关暂无课程资料</p>
      <div>
        <img src="../../assets/imgs/activity/meng.png" alt="">
        <img src="../../assets/imgs/activity/qing.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: window.CDN_URL,
      passId: this.$route.query.id,
      list: []
    }
  },
  methods: {
    getMaterilaList() {
      this.$post(BASE_API+'pass/getMaterialListByPassId',
      {
        passId: this.passId
      })
      .then( res => {
        // handle success
        if( res.errno * 1 === 101) {
          // 处理成功
          this.list =  res.data;
        } else {
          this.$store.commit("showDialog", res.errsmg)
          // 处理其他错误码的情况
        }
      })
      .catch( err => {
        console.log(err);
        // handle error
        this.$store.commit("showDialog")
      })
    }
  },
  created() {
    this.getMaterilaList()
  }
}
</script>

<style lang="scss" scoped>

  #activity-material{
    padding: 50px;
  }
  #activity-material-container{
    color: #fff;
    h3{
      font-size: 24px;
      margin-bottom: 20px;
    }
  }
  .activity-material-list{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 20px;
    // height: 30px;
    background: #222;

    &:nth-child(1),
    &:nth-child(9) {
      border-bottom: 5px solid #0c9dbf;
    }
    &:nth-child(2),
    &:nth-child(10) {
      border-bottom: 5px solid #f8b721;
    }
    &:nth-child(3),
    &:nth-child(11) {
      border-bottom: 5px solid #9bc84d;
    }
    &:nth-child(4),
    &:nth-child(12) {
      border-bottom: 5px solid #90489a;
    }
    &:nth-child(5),
    &:nth-child(13) {
      border-bottom: 5px solid #23b45d;
    }
    &:nth-child(6),
    &:nth-child(14) {
      border-bottom: 5px solid #f04b51;
    }
    &:nth-child(7),
    &:nth-child(15) {
      border-bottom: 5px solid #68c5b2;
    }
    &:nth-child(8),
    &:nth-child(16) {
      border-bottom: 5px solid #dc1f26;
    }

    h5{
      height: 30px;
      font-size: 16px;
      line-height: 30px;
      font-weight: normal;
      color: #fff;
    }
    .activity-material-download{
      display: inline-block;
      height: 30px;
      padding: 0 15px;
      font-size: 14px;
      line-height: 30px;
      border: 1px solid #f96816;
      border-radius: 5px;
      color: #f96816;
    }
  }
  .activity-material-empty{
    text-align: center;
    color: #fff;

    p{
      font-size: 28px;
      margin-bottom: 70px;
    }
    img{
      width: 200px;
    }
  }
</style>