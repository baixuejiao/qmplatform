<!-- 代码编辑器  
    props:
    |----------------------|
    | codes  显示的代码内容  |
    |----------------------|
    even:
    |---------------------------|
    | subCode  抛出编辑器中的代码  |
    |---------------------------|
-->

<template>
  <div>
    <!-- or to manually control the datasynchronization（或者手动控制数据流，需要像这样手动监听changed事件） -->
  
  <codemirror ref="myCm"
              :value="codes" 
              :options="cmOptions"
              @ready="onCmReady"
              @focus="onCmFocus"
              @input="onCmCodeChange">
  </codemirror>
  <div class="res">
    <div>输出结果：</div>
    <ul>
      <li v-for="(item,index) in resList" :key="index">{{item}}</li>
    </ul>
  </div>
  <button type="button" class="btn" @click="subCode">提交代码</button>
  <button type="button" class="btn run" @click="runCode">运行</button>
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
  // theme css
  import 'codemirror/theme/monokai.css'
  // require active-line.js
  import'codemirror/addon/selection/active-line.js'
  // styleSelectedText
  import'codemirror/addon/selection/mark-selection.js'
  import'codemirror/addon/search/searchcursor.js'
  // hint
  import'codemirror/addon/hint/show-hint.js'
  import'codemirror/addon/hint/show-hint.css'
  import'codemirror/addon/hint/javascript-hint.js'
  import'codemirror/addon/selection/active-line.js'
  // highlightSelectionMatches
  import'codemirror/addon/scroll/annotatescrollbar.js'
  import'codemirror/addon/search/matchesonscrollbar.js'
  import'codemirror/addon/search/searchcursor.js'
  import'codemirror/addon/search/match-highlighter.js'
  // keyMap
  import'codemirror/mode/clike/clike.js'
  import'codemirror/addon/edit/matchbrackets.js'
  import'codemirror/addon/comment/comment.js'
  import'codemirror/addon/dialog/dialog.js'
  import'codemirror/addon/dialog/dialog.css'
  import'codemirror/addon/search/searchcursor.js'
  import'codemirror/addon/search/search.js'
  import'codemirror/keymap/sublime.js'
  // foldGutter
  import'codemirror/addon/fold/foldgutter.css'
  import'codemirror/addon/fold/brace-fold.js'
  import'codemirror/addon/fold/comment-fold.js'
  import'codemirror/addon/fold/foldcode.js'
  import'codemirror/addon/fold/foldgutter.js'
  import'codemirror/addon/fold/indent-fold.js'
  import'codemirror/addon/fold/markdown-fold.js'
  import'codemirror/addon/fold/xml-fold.js'
export default {
  props:{
    codes:{
      type:String,
      default:"console.log('hello world!')"
    }
  },
  data () {
    return {
      resList:[],
      code:"",
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'monokai',
        lineNumbers: true,
        line: true, 
        extraKeys: {"Ctrl": "autocomplete"},
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    }
  },
  methods: {
    onCmReady(cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      console.log('the editor is focus!', cm)
    },
    onCmCodeChange(newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
    },
    runCode(){
      var lastLog;
      this.resList = [];
      console.oldLog = console.log;
      console.log = (str) => {
        this.resList.push(str)
        lastLog = str;
      }
      eval(this.code)
      console.log = console.oldLog;
    },
    subCode(){
      this.$emit('subCode',this.code)
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    }
  },
  mounted() {
    console.log('this is current codemirror object', this.codemirror)
    // you can use this.codemirror to do something...
  },
  components: {
    codemirror
  }
}
</script>
<style scoped lang="scss">
  .res{
    border-top:.5px solid #666;
    position: relative;
    height: 60px;
    background: #262822;
    color: #f2f2f2;
    padding:5px 0;
    div{
      position: absolute;
      left: 10px;
      top:5px;
    }
    ul{
      margin-left: 100px;
      height: 50px;
      overflow: scroll;
    }
  }
  .btn{
    width: 100px;
    float: right;
    border:0;
    margin-top:10px;
    background: #F96816;
    color:#f2f2f2;
    &:hover{
      background: darken(#F96816,5%);
      color:#f2f2f2;
    }
    
  }
  .run{
    width: 50px;
    margin-right: 10px;
  }
</style>