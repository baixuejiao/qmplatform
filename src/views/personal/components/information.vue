<template>
  <div id="info">
    <ul class="info-content">
      <li class="info-list clearfix">
        <span class="info-list-icon">
          <img src="@/assets/imgs/personal/name-icon.png">
        </span>
        <!-- "@/assets/imgs/exercises/exam-type-logo.png" -->
        <div class="info-list-inner">昵称： {{userInfo.name}}</div>
        <span class="info-list-edit" @click="changeCoverTag(true)">修改</span>
      </li>
      <li class="info-list clearfix">
        <span class="info-list-icon">
          <img src="@/assets/imgs/personal/photo-icon.png">
        </span>
        <div class="info-list-inner">手机号：{{userInfo.tel}}</div>
        <!-- <span class="info-list-edit"></span> -->
      </li>
      <li class="info-list clearfix">
        <span class="info-list-icon">
          <img src="@/assets/imgs/personal/pass-icon.png">
        </span>
        <div class="info-list-inner">密码：{{'***'}}</div>
        <span class="info-list-edit" @click="ChangePass">修改</span>
      </li>
    </ul>

    <div id="info-cover" v-show="coverTag">
      <div id="info-cover-content">
        <h4 class="info-cover-title">修改昵称</h4>
        <div class="info-cover-wrapper">
          <input type="text" placeholder="请输入昵称" v-model="nickName">
        </div>
        <div class="info-cover-footer">
          <span class="info-cover-cancel" @click="changeCoverTag(false)">取消</span>
          <span class="info-cover-confirm" @click="submit()">提交</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  data() {
    return {
      tokenId: localStorage.getItem('tokenId'),
      token: localStorage.getItem('token'),
      nickName: '',
      coverTag: false
    }
  },
  props: ['userInfo'],
  methods: {
    ...mapMutations(['setUserInfo']),
    changeCoverTag(_tag) {
      this.coverTag = _tag
    },
    ChangePass(){
      this.$router.push({
        name: 'forgot',
        query: {
          tag: 'change'
        }
      })
    },
    // 提交修改昵称
    submit() {
      
      this.$post(LOGIN_API+'updateNickname',
      {
        tokenId: this.tokenId,
        nickname: this.nickName
      }, {
        headers: {
          token: this.token,
        }
      })
      .then( res => {
        this.changeCoverTag(false)
        // handle success
        if( res.errno * 1 === 101) {
          // 处理成功
          this.$Modal.info({
            title: '温馨提示',
            content: '用户名修改成功～',
            onOk: () => {
              location.reload()
            }
          });
        } else {
          this.$store.commit("showDialog", res.errsmg)
          // 处理其他错误码的情况
        }
      })
      .catch( err => {
        console.log(err);
        this.changeCoverTag(false)
        // handle error
        this.$store.commit("showDialog")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/base.scss';
  #info{
    color: #fff;
    position: relative;

    .info-content{
      padding: 0 50px;
    }
    .info-list{
      padding: 20px 0;
      line-height: 1.5;
      vertical-align: middle;
      border-bottom: 1px solid #aaa;
      color:  #fff;

      &:first-child{
        border-top: 1px solid #aaa;
      }
      .info-list-icon{
        float: left;
        width: 20px;
        margin-right: 5px;
        text-align: center;
        img{
          // display: block;
          margin: 0 auto;
          width: 16px;
          line-height: 1.5;
          vertical-align: middle;
        }
      }
      .info-list-inner{
        float: left;
        // flex: 1;
      }
      .info-list-edit{
        float: right;
        width: 60px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        text-align: center;
        border: 1px solid $orangeColor;
        border-radius: 4px;
        color: $orangeColor;
        cursor: pointer;

        &:hover{
          border: 1px solid $orangeColorHover;
          color: $orangeColorHover;
        }
      }
    }
    #info-cover{
      background: rgba(0,0,0,0.5);
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      #info-cover-content{
        width: 400px;
        height: 200px;
        padding: 20px;
        border-radius: 4px;
        color: #fff;
        background: #222;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
      .info-cover-title{
        font-size: 18px;
        color: #fff;
      }
      .info-cover-wrapper{
        width: 100%;
        margin-top: 30px;

        input{
          width: 100%;
          height: 30px;
          padding: 5px 0;
          font-size: 14px;
          line-height: 30px;
          text-indent: 10px;
        }
      }
      .info-cover-footer{
        width: 100%;
        text-align: right;
        position: absolute;
        right: 20px;
        bottom: 20px;

        span{
          display: inline-block;
          width: 80px;
          height: 30px;
          margin-left: 10px;
          line-height: 30px;
          text-align: center;
          font-size: 15px;
          border-radius: 4px;
          color: #fff;
          cursor: pointer;
        }
        .info-cover-confirm{
          background: #e80a89;

          &:hover{
            box-shadow: 0 10px 30px rgba(0,0,0,.2);
            background: linear-gradient(to right,#f05a28 0,#e80a89 100%);
          }
        }
      }
    }
  }
</style>