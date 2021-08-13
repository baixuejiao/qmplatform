<!--review 习题-->
<template>
  <div class="exam-review-box clearfix max-wrapper">
    <div class="exam-box">
      <div class="exam-title">
        <span>问题回顾：</span>
        <span class="exam-info">学员所学技能进行评估测试</span>
        <div class="rest-questions"></div>
      </div>
      <!-- 进度条 -->
      <!-- <div class="exam-progress">
        <div class="current-progress" :style="{width:(this.finishNumber/this.list.length)*100+'%'}"></div>
      </div> -->
      <div class="question-box clearfix">
          <div class="question-content" v-html="nowQuestion.title"></div>
          <ul class="answer-list" v-if="nowQuestion.isSingle">
              <!-- 答案分为三种状态 answer-right  answer-success  answer-wrong-->
              <li  v-for="(option,index) in ['A','B','C','D']" :key="index" 
              :class="{
                  'answer-success':option ==nowQuestion.answer && option == nowQuestion.userAnswer,
                  'answer-right':option == nowQuestion.answer && option!=nowQuestion.userAnswer,
                  'answer-wrong':option != nowQuestion.answer &&  option==nowQuestion.userAnswer
              }"  
              >{{option+"."+nowQuestion['choice'+option]}}</li>
          </ul> 
          <ul class="answer-list" v-if="nowQuestion.isMultiple">
              <li v-for="(option,index) in ['A','B','C','D']" :key="index" 
              :class="{
                'answer-right':!!(nowQuestion.completed*1) && nowQuestion.userAnswer.includes(option) ,
                'answer-wrong':!(nowQuestion.completed*1)&& nowQuestion.userAnswer.includes(option)
              }"
              v-html="option+'.'+nowQuestion['choice'+option]"
              >
              </li>
          </ul>     
        <!-- active为激活class名 -->
        <div class="clearfix">
            <!-- <span :class="{'right-answer-btn':true,error:!(nowQuestion.completed*1)}">{{rightAnswer}}</span> -->
            <div class="exam-btn-box">
                <button :class="{'exam-btn':true,'active':nowIndex>0}" @click="prevQuestion()">上一题</button>
                <button :class="{'exam-btn':true,'active':nowIndex<allExercise.length-1}" @click="nextQuestion()">下一题</button>
            </div>
        </div>
      </div>
    </div>
    <div class="exam-analysis">
      <div class="exam-position">
        <Message ref="message" ></Message>
      </div>
    </div>
  </div>
  
</template>

<script>
import Message from './../../components/exercises/Message'

export default {
    components:{
      Message
    },
    data(){
        return {
          
        }
    },
    props:['title','list','allExercise','nowIndex'],
    computed:{
        // 计算当前显示的题
        nowQuestion(){
          return this.allExercise[this.nowIndex];
        }
    },
    watch:{
        nowIndex(){//检测父组件传的nowIndex发生变化 才显示答案解析
            this.$refs.message.hide();
            setTimeout(() => {
                this.showMessage();
            }, 0);
        }
    },
    methods:{
        nextQuestion(){
            if(this.nowIndex < this.allExercise.length-1){
                // 修改父组件中nowIndex
                let idx = this.nowIndex+1;
                this.$emit('changeIndex',idx);
            }
        },
        prevQuestion(){
            if(this.nowIndex > 0){
                // 修改父组件中nowIndex
                let idx = this.nowIndex-1;
                this.$emit('changeIndex',idx);
            }
        },
        showMessage(){
            if(this.nowQuestion.completed == 1){
                this.$refs.message.show({
                    message:{title:'恭喜你回答正确，正确答案是：'+this.nowQuestion.answer.replace(/\|/g,''),content:this.nowQuestion.answerDesc},
                    type:'success'
                });
            }else{
                this.$refs.message.show({
                    message:{title:'对不起回答错误，正确答案是：'+this.nowQuestion.answer.replace(/\|/g,''),content:this.nowQuestion.answerDesc},
                    type:'error'
                });
            }
        }

    },
    mounted(){
      this.showMessage();
    }
};
</script>

<style lang="scss" >
.exam-review-box{
  position: relative;
  .exam-box {
    width: 75%;
    float: left;
    background: #ffffff;
    border-radius: 5px;
    .exam-title {
      background: #f2f2f2;
      padding: 0 20px;
      height: 50px;
      border-radius: 5px 5px 0 0;
      font-size: 14px;
      line-height: 50px;
      color: #aaaaaa;
      .exam-info {
        font-weight: 500;
      }
      .rest-questions {
        float: right;
      }
    }
    .exam-progress {
      width: 100%;
      background-color: #e5e5e5;
      .current-progress {
        width: 44%;
        height: 2px;
        background: #ababab;
      }
    }
    .question-box {
      padding: 30px 40px;
      .question-content {
        font-size: 24px;
        line-height: 1.5;
        font-weight: 300;
        margin-bottom: 30px;
        color: #222222;
        text-size-adjust: 100%;
      }
      .answer-list {
        li {
          margin-bottom: 5px;
          border: 2px solid rgba(215, 215, 214, 0.7);
          border-radius: 6px;
          padding: 15px 20px 15px 15px;
          color: #2d2d2d;
          font-size: 18px;
          font-weight: 200;
          position: relative;
          &.answer-right{
              border-color:#86ce21;
              &::after{
                  content:"";
                  position:absolute;
                  right:7px;
                  top:50%;
                  margin-top:-6px;
                  width: 12px;
                  height: 12px;
                  background: url(./../../assets/imgs/exercises/right.png);
                  background-size:12px 12px;
                  animation: show .3s ease;
              }
          }
          &.answer-wrong {
            background: #ea3939;
            border-color: #ea3939;
            color: #fff;
              &::after{
                  content:"";
                  position:absolute;
                  right:14px;
                  top:50%;
                  margin-top:-8px;
                  width: 12px;
                  height: 12px;
                  background: url(./../../assets/imgs/exercises/wrong.png);
                  background-size: 16px 16px;
                  animation: show .3s ease;
              }
          }
          &.answer-success {
              background-color:#86ce21;
              border-color:#86ce21;
              color:#fff;
              &::after{
                  content:"";
                  position:absolute;
                  right:7px;
                  top:50%;
                  margin-top:-6px;
                  width: 12px;
                  height: 12px;
                  background: url(./../../assets/imgs/exercises/answer-right-white.png);
                  background-size:12px 12px;
                  animation: show .3s ease;
              }
          }
        }
      }
      .right-answer-btn{
        float: left;
        margin-top: 28px;
        margin-left: 5px;
        color:#86ce21;
        font-weight: 600;
        &.error{
          color:red;
        }
      }
      .exam-btn-box{
          float:right;
          .exam-btn {
              display: inline-block;
              background-color: #ccc;
              border: none;
              border-radius: 3px;
              color: #fff;
              font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
              font-size: 16px;
              font-weight: 300;
              line-height: 3.125;
              text-align: center;
              text-decoration: none;
              width:200px;
              margin-top:25px;
              outline: none;
              margin-left: 10px;
              cursor: not-allowed;
              &.active{
                  background: rgb(249, 104, 22);
                  color: #f2f2f2;
                  cursor: pointer;
              }
          }
      }
    }
  }
  .exam-analysis{
    float: left;
    width:25%;
    .exam-position{
      margin-left:20px;
      .message{
        position: absolute;
        bottom: 110px;
      }
    }
  }
}


</style>
