<template>
  <div class="codemirror-editor">
  <codemirror ref="myCm"
              :value="code"
              :options="cmOptions"
              @ready="onCmReady"
              @focus="onCmFocus"
              @input="onCmCodeChange">
  </codemirror>
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/mode/css/css.js'
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
      type:Object,
      default:()=>{}
    },
    mode:{
      type:String,
      default:"text/javascript"
    }
  },
  data () {
    return {
      resList:[],
      code:this.codes.code,
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: this.mode,
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
      // console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      // console.log('the editor is focus!', cm)
    },
    onCmCodeChange(newCode) {
      this.code = newCode
      this.$emit("codeInput",newCode,this.mode)
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    },
    propsCode(){
      return this.codes
    },
    propsMode(){
      return this.mode
    }
  },
  watch:{
    propsMode(val){
      this.cmOptions.mode = val
    },
    propsCode:{
      handler(val){
        this.code = val.code
      },
      deep:true
    }
  },
  mounted() {
    // you can use this.codemirror to do something...
  },
  components: {
    codemirror
  }
}
</script>
<style lang="scss" scoped>
/deep/ .vue-codemirror{
  height: 100%;
}
.codemirror-editor{
  height: 100%;
  padding:0;
}
/deep/ .CodeMirror {
  height: 100%;
}
</style>