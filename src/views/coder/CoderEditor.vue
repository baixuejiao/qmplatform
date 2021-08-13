<template>
  <div class="editor-content">
    <div class="ec-top">
      <div :class="['directory',{'hide-style':directoryHide}]">
        <div class="directory-title">资源管理器</div>
        <div class="directory-desc">所有文件</div>
        <div class="directory-file">
          <ul>
            <li @click="changeFile(index)" v-for="(item,index) in codeList" :key="index">
              <SvgIcon :iconName="item.type" iconColor="#f4ea2a" viewBox="0 0 1024 1024" width="16" height="16"/>
              {{item.name+"."+item.type}}
            </li>
          </ul>
        </div>
        <div :class="['toggle-btn',{'hide-style':directoryHide}]">
          <span @click="directoryToggle">
            <i :class="'iconfont '+(directoryHide?'icon-arrowrightdl':'icon-arrowleftdl')"></i>
          </span>
        </div>
      </div>
      <div class="editor">
        <div class="file-name">
          <ul>
            <li @click="changeFile(index)" v-for="(item,index) in codeList" :key="index" :class="item.isSelected?'active':''">
              <SvgIcon :iconName="item.type" iconColor="#f4ea2a" viewBox="0 0 1024 1024" width="16" height="16"/>
              {{item.name+"."+item.type}}
              <!-- <i>
                <SvgIcon iconName="close" iconColor="#aaa" viewBox="0 0 1024 1024" width="8" height="8"/>
              </i> -->
            </li>
          </ul>
          <div class="full-btn" @click="fullScreen">
            <i :class="'iconfont '+(isFull?'icon-fullscreenexit':'icon-fullscreen')"></i>
          </div>
        </div>
        <div class='editor-code'>
          <coder-commponent @codeInput="getCodeVal" :mode="nowCode.mode" :codes="nowCode"/>
        </div>
      </div>
    </div>
    <div class="ec-bottom">
      <button v-show="!exerciseInfo.userAnswer" type="button" @click="submitCode" class="float-right mr-3 btn btn-warning">提交</button>
      <button type="button" @click="runCode" class="float-right mr-3 btn btn-light">运行</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .editor-content{
    position: relative;
    height: 100%;
    .ec-top{
      height: 100%;
      padding-bottom: 50px;
      display: flex;
      .directory{
        position: relative;
        background-color: #555;
        width: 25%;
        overflow: hidden;
        color: #aaa;
        font-size: 14px;
        transition: all .3s ease;
        .toggle-btn{
          position: absolute;
          width: 30px;
          right: 0;
          top:0;
          height: 100%;
          span{
            display: block;
            margin: 8px auto;
            cursor: pointer;
            text-align: center;
          }
        }
        .toggle-btn.hide-style{
          background-color: #555;
        }
        .directory-title{
          min-width: 200px;
          overflow: hidden;
          padding: 0 20px;
          height: 38px;
          text-align: left;
          line-height: 38px;
        }
        .directory-desc{
          min-width: 200px;
          overflow: hidden;
          padding: 0 20px;
          height: 26px;
          text-align: left;
          line-height: 26px;
          background-color: #363636;
        }
        .directory-file{
          min-width: 200px;
          overflow: hidden;
          padding: 10px 0;
          li{
            padding: 5px 20px;
            cursor: pointer;
            color: #eee;
            div{
              display: inline;
            }
            &:hover{
              background-color: rgba(19,123,194,.8);
              cursor: col-resize;
            }
          }
        }
      }
      .directory.hide-style{
        width: 30px;
      }
      .editor{
        padding-left:5px;
        flex-grow: 1;
        .file-name{
          height: 40px;
          background-color: #363636;
          ul{
            float: left;
          }
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
        .editor-code{
          height: calc(100% - 40px);
        }
      }
    }
    .ec-bottom{
      position: absolute;
      width: 100%;
      bottom: 0;
      left:0;
      height: 50px;
      border-top:1px solid #171717;
      background-color: #363636;
      button{
        margin-top:5px;
        border-radius: 0 !important;
      }
    }
  }
  .full-btn{
    float: right;
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
<script>
import SvgIcon from "@/components/SvgIcon.vue"
import CoderCommponent from './CoderCommponent.vue';
export default {
  data() {
    return {
      indexKey:0,
      directoryHide:false,
      nowCode:{},
      codeValue:{},
      isFull:false,
      codeList:[
        {
          type:"js",
          code:"//请输入js语句",
          name:"main",
          mode:"text/javascript",
          isSelected:true
        },
        {
          type:"css",
          code:"/*请输入css语句*/",
          name:"main",
          mode:"css",
          isSelected:false
        },
        {
          type:"html",
          code:"<!-- 请输入html语法 -->",
          name:"main",
          mode:"htmlmixed",
          isSelected:false
        }
      ]
    }
  },
  props:{
    exercise:{
      type:Object,
      default:()=>{}
    }
  },
  mounted(){
    this.resetCodeList(this.exercise);
    this.initCoder()
  },
  computed:{
    exerciseInfo(){
      //监听exercise的变化
      return this.exercise
    }
  },
  watch:{
    exerciseInfo:{
      //对exercise变化作出响应处理  深度监听对象属性及数组值
      handler(val){
        if(val.userAnswer){
          this.resetCodeList(val)
        }else{
          this.resetCodeList(val);
        }
      },
      deep:true
    }
  },
  methods:{
    getDefaultCode(type){
      let code = ""
      this.codeList.map((item,thisIndex)=>{
        if(item.type == type){
          code = item.code
        }
      })
      return code
    },
    resetCodeList(code){
      //重置编程列表
      let thisList = [];
      thisList = this.codeList.map((item,index)=>{
        return {
          type:item.type,
          code:code.userAnswer?code[item.type]:this.getDefaultCode(item.type),
          name:item.name,
          mode:item.mode,
          isSelected:item.isSelected
        }
      })
      this.codeList = thisList;
      this.initCoder();
    },
    submitCode(){
      //提交当前代码
      this.$emit('subCode',this.codeValue)
    },
    directoryToggle(){
      //资源管理器缩放切换
      this.directoryHide = !this.directoryHide;
    },
    fullScreen(){
      //控制编辑器是否全屏
      this.$emit('propsFull','coder');
      this.isFull = !this.isFull
    },
    runCode(){
    //运行代码
    let lastLog;
    let resList = [];
    console.oldLog = console.log;
    console.log = (str) => {
      resList.push(str)
      lastLog = str;
    }
    try {
      eval(this.codeValue.js)
    } catch (error) {
      resList = ["error"]
    }
    
    console.log = console.oldLog;
    this.$emit("resultVal",resList,this.codeValue)
    },
    getCodeVal(val,type){
      //当编辑代码编辑器时触发
      this.codeList.map((item)=>{
        if(item.mode == type){
          this.codeValue[item.type] = val;
        }
      })
    },
    initCoder(){
      //初始化编辑器
      this.codeList.map((item)=>{
        this.codeValue[item.type] = item.code;
        if(item.isSelected){
          this.nowCode = {...item};
        }
      })
      this.nowCode.index = ++this.indexKey;
    },
    changeFile(index){
      //切换文件时触发
      let thisCodeList =[];
      this.codeList.map((item,thisIndex)=>{
        let isSelect = index == thisIndex ? true : false;
        thisCodeList.push({
          type:item.type,
          code:item.code,
          name:item.name,
          mode:item.mode,
          isSelected:isSelect
        })
      })
      this.nowCode = {
        mode:thisCodeList[index].mode,
        code:this.codeValue[thisCodeList[index].type]
      }
      this.codeList = thisCodeList;
    }
  },
  components:{
    CoderCommponent,
    SvgIcon
  }
}
</script>