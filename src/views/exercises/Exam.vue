 <!-- 单选题组件 
    Attributes
        :nowQuestion   当前显示单选题
        :questionNum   单选题数量
        :goNextText    多选题  编程题或 完成 
    event  
        @insertAnswer  插入答案 
        @getNextSingle 下一题 
-->
<template>
    <div class="clearfix">
        <div class="exam-box">
            <div class="exam-title">
                <span>技能评估：</span>
                <!-- <span class="exam-info">学员所学技能进行评估测试</span> -->
                <div class="rest-questions">剩余未答{{questionNum-finishNum}}个单选题</div>
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
                <div>
                    <!-- 回答正确 -->
                </div>
                <div class="exam-btn-box">
                    <button :class="{'exam-btn':true,active:nextActive}" v-show="showNextBtn" @click="nextQuestion()">下一题</button>
                    <button :class="{'exam-btn':true,active:nextActive}" v-show="!showNextBtn" @click="nextQuestion()">{{goNextText}}</button>
                </div>
            </div>
        </div>
        <div class="count-down">
            <div class="count-pos">
                <CountdownShow @checkAnswer="checkAnswer" class="" ref="countTimer"></CountdownShow>
            </div>
        </div>
    </div>
</template>

<script>
import CountdownShow from './../../components/exercises/CountdownShow';
export default {
    data(){
        return {
            isChoice:true ,//是否触发点击事件，如果有选项被点击了 就不再点击,
            status:0,//记录题的对错 0错 1对
            showNextBtn:true,//true  下一题  false  去多选
            nextActive:false,
            nowIndex:0,
            finishNum:0,
            slide:false, //滑动显示下一题
            tokenId: localStorage.getItem('tokenId'),
            token: localStorage.getItem('token')
        }
    },
    components:{
        CountdownShow
    },
    props:['nowQuestion','questionNum','goNextText'],
    watch:{     //监听value的变化，进行相应的操作即可
        nowQuestion: function(){     //a是value的新值，b是旧值
            this.isChoice = true;
            this.slide = true;
        }
    },
    methods:{
        // 点击某个选项按钮时 
        checkAnswer(x){
            if(this.isChoice){
                /*
                    发送答案写入请求  发送成功执行回调函数
                */
                // 停止倒计时   
                this.$refs.countTimer.stopTimeCount();
                this.slide = false;
                // x为当前选中的选项  拼接正确选项 choiceA
                let answer = this.nowQuestion.answer;
                if(x && x == answer){//如果当前选中的选项 == 正确答案  当前选项的样式success
                    this.nowQuestion['choice'+x].success = true;
                    this.status = 1;
                    // this.$refs.countTimer.stopTimeCount();
                }else if(x && x != answer){//不是正确答案
                    this.nowQuestion['choice'+x].wrong = true;
                    this.nowQuestion['choice'+answer].right = true;
                    this.status = 0;
                    // this.$refs.countTimer.stopTimeCount();
                }else if(x == ""){
                    this.nowQuestion['choice'+answer].success = true;
                    this.status = 0;
                }
                this.isChoice = false;
                this.$emit('insertAnswer',{userAnswer:x,status:this.status},()=>{
                    this.nextActive = true;
                    //完成个数+1
                    this.finishNum++;   
                });
            }
        },
        nextQuestion(){
            if(this.nextActive){ //如果当前题答完，下一个按钮是可点击状态，再进入下一题
                this.nowIndex++;
                if(this.nowIndex < this.questionNum-1){//有单选题
                    this.showNextBtn = true;
                }else if(this.nowIndex == this.questionNum-1){//单选题显示完成  
                    this.showNextBtn = false;
                }else{//最后一道完成
                    this.nowIndex = -1;
                }
                this.$emit('getNextSingle',this.nowIndex);
                 // 下一步按钮编程不可点击状态
                this.nextActive = false;
                this.isChoice = true;
                this.slide = true;
                // 开启下一倒计时
                this.$refs.countTimer.openTimeCount(45);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.exam-box {
  width: 78%;
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
        cursor: pointer;
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
            width:250px;
            margin-top:25px;
            outline: none;
            &.active{
                background: rgb(249, 104, 22);
                color: #f2f2f2;
                cursor: pointer;
            }
        }
    } 
  }
}
.count-down{
    width:22%;
    padding:0px 0 0 33px;
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