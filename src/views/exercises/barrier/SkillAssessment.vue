<!--闯关测评页面--->
<template>
    <div>
        <div class="container-fluid">
            <div class="exam-wrapper">
                <!-- 单选 -->
                <div class="exam-type" v-if="questionType != 3 && questionType != 0"> 
                    <img src="@/assets/imgs/exercises/exam-type-logo.png"/> 
                    <span class="exam-type-text">{{exerType[questionType-1]}}</span>
                </div>
                <div>
                    <!-- 显示单选题组件 -->
                    <exam v-if="questionType == 1" 
                        :nowQuestion="nowQuestion" 
                        :questionNum = "single.length"
                        :goNextText = "singNextText"
                        @insertAnswer="insertAnswer" 
                        @getNextSingle="getNextSingle"
                    ></exam>
                    <!-- 显示多选题 -->
                    <exam-multiple  v-if="questionType == 2" 
                        :nowQuestion="nowQuestion" 
                        :questionNum = "multiple.length"
                        :goNextText = "mulNextText"
                        @insertAnswer="insertAnswer"
                        @getNextMultiple="getNextMultiple"
                        ></exam-multiple>
                    <!-- 显示编程题 -->
                    <program-list 
                        v-if="questionType == 3" 
                        :programList="program"
                        @insertAnswer="insertAnswer"
                        @getProgram="getProgram" 
                    ></program-list>
                </div>
               <no-exam v-if="questionType == 4" :title="title" :type="type"></no-exam>
            </div>
            <Dialog ref="dialog"></Dialog>
        </div>
    </div>
</template>
<script>
// import examHeader from './../components/ExamHeader';
import Exam from './../Exam';
import ExamMultiple from './../ExamMultiple';
import NoExam from './../NoExam';
import ProgramList from '@/components/exercises/ProgramList.vue';

import Dialog from '@/components/exercises/Dialog.vue'

export default {
    data(){
        return {
            nowIndex:0,
            single:[], //单选
            multiple:[], //多选
            program:[],//编程题
            title:"对不起! 没有可做的题了哦 (*^__^*) ",
            type:0,
            finishNumber:0,
            nowQuestion:{},
            questionType:0,//1单选 2 多选 3编程 4 没有题
            tokenId: localStorage.getItem('tokenId'),
            token: localStorage.getItem('token'),
            suitId:0,
            exerType:['单选题','多选题','编程题','没有可做的题']
        }
    },
    components:{
        Exam,
        ExamMultiple,
        NoExam,
        ProgramList,
        Dialog
    },
    methods:{
        // 获取闯关习题
        getPassExercises(){
             this.$post(BASE_API + "pass/getPassExercise",
			{
				passId:this.$route.query.passId,
			}, {
				headers: {
					token: this.token,
				}
			})
			.then(res => {
				if (res.errno * 1 === 101) {
                    // 标注tag 第一题:1  最后一题:2  其他题:-1
                    this.setTag(res.data.sing,res.data.mul);
                    // 处理成功  映射出包含状态的试题列表
                    if(res.data.sing.length > 0){
                        this.single = this.mapExercise(res.data.sing);
                    }
                    if(res.data.mul.length > 0){
                        this.multiple = this.mapExercise(res.data.mul);
                    }
                    if(res.data.program.length > 0){
                        this.program = res.data.program;
                    }
                    this.checkQuestionType(0);
				} else {
					this.$store.commit("showDialog", res.errsmg);
					// 处理其他错误码的情况
				}
			})
			.catch(err => {
				this.$store.commit("showDialog");
			});
        },
        // 映射出包含状态的试题列表
        mapExercise(exercisesList){
            let list = exercisesList.map(function(item,index){
                return {
                    id:item.id, 
                    title:item.title, //单选题题目
                    choiceA:{
                        options:item.choiceA,
                        success:false,
                        right:false,
                        wrong:false
                    },
                    choiceB:{
                        options:item.choiceB,
                        success:false,
                        right:false,
                        wrong:false
                    },
                    choiceC:{
                        options:item.choiceC,
                        success:false,
                        right:false,
                        wrong:false
                    },
                    choiceD:{
                        options:item.choiceD,
                        success:false,
                        right:false,
                        wrong:false
                    },
                    answer:item.answer,  //单选题答案
                    answerDesc:item.answerDesc,
                    secId:item.secId,  
                    pathId:item.pathId,
                    status:item.status,
                    tag:item.tag
                }
            });
            return list;
        },
        // 获取单选下一题
        getNextSingle(index){
            if(index >=0){
                // 返回下一题
                this.nowQuestion = this.single[index];
            }else if(index == -1){ //单选题已完成-> 去多选题
                this.checkQuestionType(1)
            }
        },
         // 获取多选下一题
        getNextMultiple(index){
            // 返回下一题
            if(index >= 0 ){
                this.nowQuestion = this.multiple[index];
            }else if(index == -1){ //多选题已完成  ->去详情页
                this.checkQuestionType(2)               
            }
        },
        getProgram(index){
            this.nowQuestion = this.program[index];
        },
        //插入答案
        insertAnswer({userAnswer,htmlAnswer,cssAnswer,jsAnswer,status,complete}){
            /*
              发送答案写入请求
            */
            if(complete == 1){ //未做编程直接完成
                this.nowQuestion.id = "";
            }
            this.postInsertAnswer("pass/insertPassUserAnswerByTag",{
                tokenId: this.tokenId,
                userAnswer,
                htmlAnswer,
                cssAnswer,
                jsAnswer,
                tag:this.nowQuestion.tag,
                passId:this.$route.query.passId,
                passExercisesId:this.nowQuestion.id,
                status,
            });
        },
        // 发送插入答案请求
        postInsertAnswer(url,params){
            this.$post(
              BASE_API + url,
              params, 
              {
                headers: {
                  token: this.token,
                }
              }
            ).then(res => {
              if (res.errno * 1 === 101) {
                // 处理成功
                if(this.nowQuestion.tag == 2){ //答完题
                    this.passSuccess(res.data.score);
                }else{
                    this.nowIndex++;
                }
              } else {
                this.$store.commit("showDialog", res.errsmg);
                // 处理其他错误码的情况
              }
            })
            .catch(err => {
              this.$store.commit("showDialog");
            });
        },
        //检查显示 单选 多选 还是没有题
        checkQuestionType(num){
            if(num == 0){
                if(this.single.length > 0){
                    this.questionType = 1//单选
                    this.nowQuestion = this.single[this.nowIndex];
                }else if(this.multiple.length > 0 ){
                    this.questionType = 2;//多选
                    this.nowQuestion = this.multiple[this.nowIndex];
                }else if(this.program.length > 0){
                    this.questionType = 3;//编程
                }else if(this.single.length == 0 && this.multiple.length == 0 && this.program.length == 0){
                    this.questionType = 4; //没有题
                }
            }else if( num == 1 ){
                if(this.multiple.length>0){ //有多选题
                    this.getNextMultiple(0);
                    // 显示多选
                    this.questionType = 2;
                }else if(this.program.length > 0){ //有编程题
                    this.questionType = 3;
                }else{ //没有题  跳转下一页面
                    this.passSuccess();   
                }
            }else if(num == 2){
                if(this.program.length > 0){ //有编程题
                    this.questionType = 3;
                }else{ //没有题  跳转下一页面
                    this.passSuccess();   
                }
            }
        },
        setTag(arr1,arr2,arr3){
            let newArr = arr1.concat(arr2,arr3);
            newArr.forEach((obj,index)=>{
                if(index == 0){
                    obj.tag = 1;
                }else if(index == newArr.length-1){
                    obj.tag = 2;
                }else{
                    obj.tag = -1;
                }
            });
        },
        passSuccess(score){
            // this.$refs.dialog.show();
            let status = score >= 80 ? 1:0;
            if(status == 1){
                this.$refs.dialog.show({content:score+'分，闯关成功',score,back:'继续闯关',type:'success'});
            }else{
                this.$refs.dialog.show({content:score+'分，闯关失败',score,back:'继续闯关',type:'error'});
            }

        }
    },
    created(){
        this.getPassExercises();
    },
    computed:{
        singNextText(){
            let msg = "";
            if(this.multiple.length > 0){
                msg = '去多选题';
            }else if(this.program.length > 0){
                msg = '去编程题';
            }else{
                msg = '完成';
            }
            return msg;
        },
        mulNextText(){
            let msg = "";
            if(this.program.length > 0){
                msg = '去编程题';
            }else{
                msg = '完成';
            }
            return msg;
        }
        
    }
};
</script>

<style lang="scss" scoped>
.exam-wrapper{
    margin-bottom: 28px;
    .exam-type{
        color:#fff;
        height: 70px;
        line-height: 70px;
        img{
            width:28px;
        }
        .exam-type-text{
            vertical-align: middle;
            margin-left:10px;
        }
    }
    .exam-box {
//   width: 90%;
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
                background: url(./../../../assets/imgs/exercises/right.png);
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
                background: url(./../../../assets/imgs/exercises/wrong.png);
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
                background: url(./../../../assets/imgs/exercises/answer-right-white.png);
                background-size:12px 12px;
                animation: show .3s ease;
            }
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
@keyframes show {
    from{
        right:0px;
    }
}
}
@media screen and (min-width: 375px){
    .exam-wrapper {
        padding: 0 20px;
    }
}
@media screen and (min-width: 600px){
    .exam-wrapper {
        padding: 0 50px;
    }
}


</style>