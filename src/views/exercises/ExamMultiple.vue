<!--多选题组件-->
<template>
    <div class="clearfix">
        <div class="exam-box">
            <div class="exam-title">
                <span>技能评估：</span>
                <!-- <span class="exam-info">学员所学技能进行评估测试</span> -->
                <div class="rest-questions">剩余未答{{questionNum-finishNum}}个多选题</div>
            </div>
            <div class="exam-progress">
                <div class="current-progress" :style="{width:(finishNum/(questionNum))*100+'%'}"></div>
            </div>
            <div :class="{'question-box':true,'slide':slide,'clearfix':true}">
                <div class="question-content" v-html="nowQuestion.title"></div>
                <ul class="answer-list">
                    <!-- 答案分为三种状态 answer-right  answer-success  answer-wrong-->
                    <li :class="{'answer-right':nowQuestion.choiceA.right,'answer-success':nowQuestion.choiceA.success,'answer-wrong':nowQuestion.choiceA.wrong}"  @click="checkAnswer('A')" >{{'A.'+nowQuestion.choiceA.options}}</li>
                    <li :class="{'answer-right':nowQuestion.choiceB.right,'answer-success':nowQuestion.choiceB.success,'answer-wrong':nowQuestion.choiceB.wrong}"  @click="checkAnswer('B')" >{{'B.'+nowQuestion.choiceB.options}}</li>
                    <li :class="{'answer-right':nowQuestion.choiceC.right,'answer-success':nowQuestion.choiceC.success,'answer-wrong':nowQuestion.choiceC.wrong}"  @click="checkAnswer('C')" >{{'C.'+nowQuestion.choiceC.options}}</li>
                    <li :class="{'answer-right':nowQuestion.choiceD.right,'answer-success':nowQuestion.choiceD.success,'answer-wrong':nowQuestion.choiceD.wrong}"  @click="checkAnswer('D')" >{{'D.'+nowQuestion.choiceD.options}}</li>
                </ul>   
                <div class="clearfix">
                    <span :class="{'right-answer-btn':true,error:!status}">{{rightAnswer}}</span>
                    <div class="exam-btn-box">
                        <button :class="{'exam-btn':true,active:isAnswerd}"  @click="confirmAnswer()">确定</button>
                        <button :class="{'exam-btn':true,active:!isAnswerd}" @click="nextQuestion()">{{next}}</button>
                    </div>
                </div>   
            </div>
        </div>
        <div class="count-down">
            <div class="count-pos">
                <CountdownShow @checkAnswer="confirmAnswer" class="" ref="countTimer"></CountdownShow>
            </div>
        </div>
    </div>
</template>

<script>
import {isArrayEqual} from '@/assets/js/common.js'
import CountdownShow from './../../components/exercises/CountdownShow';

export default {
    data(){
        return {
            allAnswers:[],
            rightAnswer:'',
            status:1, //记录当前题是否正确 1正确 0错误
			isAnswerd:true,  //true  未答  false 已答
			finishNum:0,
            nowIndex:0,
            slide:true,//滑动显示下一题
            tokenId: localStorage.getItem('tokenId'),
            token: localStorage.getItem('token')
        }
    },
    components:{
        CountdownShow
    },
    props:['nowQuestion','questionNum','goNextText'],
    methods:{
        // 点击li选择某项答案 （记录当前答案值）
        checkAnswer(x){
            if(this.isAnswerd){ //判断是否未答
                // 当前选项勾选状态取非
                this.nowQuestion['choice'+x].right = !this.nowQuestion['choice'+x].right;
                //答案数组中包含当前选择的答案就移除 不包含添加进去 
                if(this.allAnswers.includes(x)){
                    this.allAnswers.remove(x);
                }else{
                    this.allAnswers.push(x);
                }

            }
        },
        // 点击确定答案判断答案是否正确
        confirmAnswer(){  
            if(this.isAnswerd){  // 未答题
                // 停止定时器
                this.$refs.countTimer.stopTimeCount();
                this.slide = false;
                // 正确答案数组
                let arr = this.nowQuestion.answer.split("|")
                // 判断是都为正确答案 
                if(!isArrayEqual(this.allAnswers,arr)){
                    this.rightAnswer = "对不起回答错误，正确答案是："+arr.join('');
                    this.status = 0;
                }else{
                    this.rightAnswer = "恭喜你回答正确，正确答案是："+arr.join('');
                    this.status = 1;
                }
                //调用父组件插入多选题答案
                this.$emit('insertAnswer',{userAnswer:this.allAnswers.join('|'),status:this.status},()=>{
                    // 当前题已答
                    this.isAnswerd = false;
                    this.finishNum++;
                });
            }
        },
        // 点击下一题
        nextQuestion(){
            if(!this.isAnswerd){ //如果当前题答完
                this.nowIndex++;
                if(this.nowIndex == this.questionNum){ //判断最后一道题（点击完成）
                    this.nowIndex = -1;
                }
                this.rightAnswer = '';
                // 获取下一题
                this.$emit('getNextMultiple',this.nowIndex);
                 // 当前题未答
                this.isAnswerd = true;
                // 清空上一题的答案
                this.allAnswers = [];
                // 重新开启定时器
                this.$refs.countTimer.openTimeCount(45);
                this.slide = true;
            }
           
        }
    },
    computed:{
        // 下一题 还是完成
        next(){
            return this.nowIndex == this.questionNum - 1 ? this.goNextText:'下一题';
        }
    }
};
</script>

<style lang="scss" scoped>
.exam-box {
  width: 75%;
  float: left;
  background: #ffffff;
  border-radius: 5px;
  overflow: hidden;
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
    background: #fff;
    &.slide{
        animation: run 0.7s ease forwards;
    }
    @keyframes run {
        from{
            transform: translateX(100%);
        }
        to{
            transform: translateX(0);
        }
    }
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
            // background-position:;
        }
        &.answer-wrong {
          background: #ea3939;
          border-color: #ea3939;
          color: #fff;
            &::after{
                content:"";
                position:absolute;
                right:7px;
                top:50%;
                margin-top:-6px;
                width: 12px;
                height: 12px;
                background: url(./../../assets/imgs/exercises/wrong.png);
                background-size:12px 12px;
                animation: show .3s ease;
            }
        }
        &.answer-success {
            background-color:#86ce21;
            border-color:#86ce21;
            color:#fff;
        }
      }
    }
    .right-answer-btn{
      float: left;
      margin-top: 28px;
      margin-left: 5px;
      // font-size:
      color:#86ce21;
      font-weight: 600;
      &.error{
        color:red;
      }
    }
    .exam-btn-box{
        float:right;
        .exam-btn {
            cursor: pointer;
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
            margin-left:10px;
            &.active{
                background: rgb(249, 104, 22);
                color: #f2f2f2;
            }
        }
    }
  }
}
.count-down{
    width:25%;
    padding:20px 0 0 33px;
    float: left;
    .count-pos{
        position: fixed;
    }
}
@keyframes show {
    from{
        right:0px;
    }
}
</style>