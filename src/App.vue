<!-- 页面功能 author date -->
<template>
  <div id="app">
    <common-header :type=type></common-header>
    <div id="app-container" :style="{paddingTop: height, minHeight: `calc(100vh - ${height})`}" class="clearfix">
      <router-view :key="$route.fullPath"></router-view>
    </div>
    <footer-tpl></footer-tpl>
    <Loading :show="showLoading"/>
    <Dialog :show="showDialog"/>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

import CommonHeader from '@/components/CommonHeader.vue'
import footerTpl from '@/components/CommonFooter.vue';
import Loading from '@/components/Loading.vue';
import Dialog from '@/components/Dialog.vue';

export default {
  data() {
    return {
      mockdata: {}
    }
  },
  computed: {
    type() {
      return this.$store.state.headerTag
    },
    showLoading(){
      return this.$store.state.loadingShow;
    },
    showDialog() {
      return this.$store.state.dialogStatus;
    },
    height() {
      let _height = ''
      if (this.type * 1 === 1) {
        _height = 64 + 'px'
      } else if (this.type * 1 === 2) {
        _height = 85 + 'px'
      }
      return _height
    }
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setHeaderTag']),
    /**
     * fn名称
     * 参数说明
     * 功能的说明
     */
    getUserInfo() {
      let url = LOGIN_API + 'getUserInfor'
      this.$upost(url,
      {
        "tokenIdArr": [
          {
            "tokenId": localStorage.getItem('tokenId')
          }
        ]
      }, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then( res => {
        // handle success
        if( res.code * 1 === 1) {
          this.setUserInfo(res.data[0])
        } else {
          this.$store.commit("showDialog", res.message)
          localStorage.clear()
          this.setHeaderTag(2)
          this.$router.push('/')
        }
      })
      .catch( err => {
        console.log(err);
        // handle error
        this.$store.commit("showDialog", '服务器错误请稍后重试。。。')
      })
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.setHeaderTag(1)
      // this.$router.replace('/home')
      this.getUserInfo()
    } else {
      this.setHeaderTag(2)
    }

    // 请求调用示例
    /*
    this.$get('/user?ID=12345')
    .then(function (res) {
      // handle success
      let data = res.data;
      //根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值
      // this.$request.commit('token_id', data["Authentication-Token"]);
      if( res.data.errno * 1 === 0) {
        // 处理成功
        // res.data.data
        // "errno":101
      } else {
        // "errmsg": null,
        alert(errsmg)
        // 处理其他错误码的情况
      }
    })
    .catch(function (err) {
      // handle error
      // alert('服务器错误请稍后重试。。。')
    })
    */
  },
  components: {
    CommonHeader,
    footerTpl,
    Loading,
    Dialog
  }
}
</script>


<style lang="scss" scoped>
  #app-container{
    padding-bottom: 50px;
    // min-height: calc(100vh - 64px);
  }
</style>
