<!-- 代码编辑器  
    props:
    |--------------------------------------------|
    | isShow          是否弹出编辑器 类型：布尔      |
    | propsExercise   习题内容  类型：对象          |
    |
    |  示例：propsExercise = {
    |          id:习题ID 或者答案ID,
    |          title:习题标题,
    |          content:习题介绍,
    |          userAnswer:是否为已经答过的题 布尔值,
    |          js:编程题的js内容 没有时为空即可,
    |          html:编程题的html内容 没有时为空即可,
    |          css:编程题的css内容 没有时为空即可,
    |          notation:老师评语 没有可以不填写
    |        }
    |
    |----------------------------------------------|
    even:
    |------------------------------------|
    | subHandel  提交答题内容可接收一个参数  |
    |------------------------------------|
-->
<template>
  <div :class="['coder-content',{'coder-show':editorToggle}]">
    <div class="cc-left">
      <coder-aside @closeEditor="submitHandle({})" :exercise="exerciseInfo" v-if="exerciseInfo.id"/>
    </div>
    <div class="cc-right">
      <div :class="['coder-editor',{'full':codeHide},{'unfull':resultHide}]">
        <coder-editor @subCode="submitHandle" @resultVal="showResult" @propsFull="fullScreen" :exercise="exerciseInfo" v-if="exerciseInfo.id"/>
      </div>
      <div :class="['coder-result',{'full':resultHide}]">
        <div class="cr-header">
          <ul>
            <li @click="changeResTab(2)" :class="{'active':resultType=='html'}">Elements</li>
            <li @click="changeResTab(1)" :class="{'active':resultType=='js'}">Console</li>
          </ul>
          <div @click="fullScreen('result')" class="full-btn">
            <i :class="'iconfont ' + (resultHide?'icon-fullscreenexit':'icon-fullscreen')"></i>
          </div>
        </div>
        <div class="cr-content" >
          <div class="result-bar result-js" v-show="resultType=='js'">
            <ul>
              <li v-for="(item,index) in resultVal" :key="index">{{item}}</li>
            </ul>
          </div>
          <div class="result-bar" v-show="resultType=='html'">
            <iframe ref="codeiframe" class="iframe" id="iframe" sandbox="allow-forms allow-popups allow-scripts allow-same-origin allow-modals" name="iframe" frameborder="0">
        </iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CoderEditor from './CoderEditor.vue';
import CoderAside from './CoderAside.vue';
export default {
  data() {
    return {
      codeHide:false,//判断是否将编辑器全屏
      resultHide:false,//判断是否将控制台全屏
      resultType:"html",//控制编辑器当前文档模式
      resultVal:"",//编辑器内容
      type:1,//答题状态 1:普通题 2:闯关题
      exerciseInfo:this.propsExercise//根据id获取的习题内容
    }
  },
  props:{
    isShow:{
      type:Boolean,
      default:false
    },
    propsExercise:{
      type:Object,
      default:()=>{}
    }
  },
  mounted(){
  },
  computed:{
    editorToggle(){
      return this.isShow
    },
    propsExerciseInfo(){
      return this.propsExercise
    }
  },
  watch:{
    propsExerciseInfo:{
      //对exercise变化作出响应处理  深度监听对象属性及数组值
      handler(val){
        this.exerciseInfo = val
      },
      deep:true
    }
  },
  methods:{
    submitHandle(val){
      //提交当前习题
      let options = {
        jsAnswer:val.js,
        cssAnswer:val.css,
        htmlAnswer:val.html
      }
      this.$emit('subHandel',options);
    },
    fullScreen(type){
      //切换视口是否全屏
      if(type == "coder"){
        this.codeHide = !this.codeHide;
      }else if(type == "result"){
        this.resultHide = !this.resultHide;
      }
    },
    showResult(val,code){
      //显示输出结果
      var html = code.html;
      var css = '<style>'+code.css+'</style>';
      var js = code.js;
      this.resultVal = val
      let codeiframe = this.$refs.codeiframe.contentWindow;
      codeiframe.document.getElementsByTagName('body')[0].innerHTML=(html+css);
      window.frames['iframe'].eval(js)
    },
    changeResTab(val){
      this.resultType = val==1?'js':'html';
    }
  },
  components:{
    CoderEditor,
    CoderAside
  }
}
</script>
<style lang="scss" scoped>
  .coder-content{
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100vh;
    display: flex;
    top:0;
    left:100vw;
    transition: all .4s ease;
    .cc-left{
      width: 25%;
      height: 100%;
      background-color: #363636;
    }
    .cc-right{
      padding-left: 5px;
      height: 100%;
      flex-grow: 1;
      background-color: #171717;
      .coder-editor{
        height: 60%;
        padding-bottom: 5px;
        transition: all .3s ease;
      }
      .coder-editor.full{
        height: calc(100% - 100px);
      }
      .coder-editor.unfull{
        height: 93px;
        overflow: hidden;
      }
      .coder-result{
        height: 40%;
        .cr-header{
          position: relative;
          height: 40px;
          background-color: #363636;
          li{
            float: left;
            height: 40px;
            line-height: 40px;
            padding: 0 15px;
            color: #eee;
            font-size: 14px;
            cursor: pointer;
            i:hover{
              cursor: pointer;
            }
            div{
              display: inline;
            }
          }
          li.active{
            display: block;
            border-bottom: 2px solid #f96816;
          }
        }
        .cr-content{
          height: calc(100% - 40px);
          background-color: #fff;
          color: #666;
          .result-bar{
            padding:15px 0;
          }
        }
      }
      .coder-result.full{
        height: calc(100% - 100px);
      }
    }
  }
  .coder-content.coder-show{
    left:0;
  }
  .result-js{
    li{
      padding: 5px 15px;
      border-bottom: 1px solid #ddd;
    }
  }
  .full-btn{
    position: absolute;
    right: 0;
    top:0;
    height: 40px;
    width: 45px;
    color: #aaa;
    line-height: 40px;
    text-align: center;
    font-weight: bolder;
    border-left: 1px solid #171717;
    cursor: pointer;
    transition: all .3s ease;
    &:hover{
      color: #eee;
    }
  }
</style>