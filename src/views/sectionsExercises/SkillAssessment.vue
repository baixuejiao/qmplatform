<!--技能测评页面--->
<template>
    <div>
        <div class="container-fluid">
            <div class="exam-wrapper">
                <!-- 单选 -->
                <div class="exam-type" v-if="questionType != 3 && questionType != 0"> 
                    <img src="@/assets/imgs/exercises/exam-type-logo.png"/> 
                    <span class="exam-type-text">{{examType}}</span>
                </div>
                <div>
                    <!-- 显示单选题组件 -->
                    <exam v-if="questionType == 1" 
                        :nowQuestion="nowQuestion" 
                        :questionNum = "single.length"
                        :goNextText = "multiple.length == 0 ?'完成':'去多选题'"
                        @insertAnswer="insertAnswer" 
                        @getNextSingle="getNextSingle"
                    ></exam>
                    <!-- 显示多选题 -->
                    <exam-multiple  v-if="questionType == 2" 
                        :nowQuestion="nowQuestion" 
                        :questionNum = "multiple.length"
                        @insertAnswer="insertAnswer"
                        @getNextMultiple="getNextMultiple"
                        ></exam-multiple>
                </div>
                <!-- <exam  :list="single" :pathId="$route.query.pathId" :singCount="$route.query.singleCount" :mulCount="$route.query.mulCount" v-if="questionType == 1" @goToMultiple="changeQuestionType()"></exam> -->
                <!-- 多选 -->
                <!-- <exam-multiple :list="multiple" :pathId="$route.query.pathId" :singCount="$route.query.singleCount" :mulCount="$route.query.mulCount" v-if="questionType == 2" @changeTitle="changeTitle"></exam-multiple> -->
                <no-exam v-if="questionType == 3" :title="title" :type="type"></no-exam>
            </div>
        </div>
    </div>
</template>
<script>
// import examHeader from './../components/ExamHeader';
import exam from './Exam';
import examMultiple from './ExamMultiple';
import NoExam from './NoExam';

export default {
    data(){
        return {
            nowIndex:0,
            single:[], //单选
            multiple:[], //多选
            title:"对不起! 没有可做的题了哦 (*^__^*) ",
            type:0,
            finishNumber:0,
            nowQuestion:{},
            questionType:0,//1单选 2 多选 3 没有题
            tokenId: localStorage.getItem('tokenId'),
            token: localStorage.getItem('token'),
            suitId:0,
            secList:[],
            list:[]
        }
    },
    components:{
        exam,
        examMultiple,
        NoExam
    },
    methods:{
        changeTitle(txt){
            this.title = txt;
            this.type = 1;
            this.questionType = 3;
        },
        // 获取path习题
        getSelExercises(){
            let secId = this.$route.query.secId;
            this.$post(BASE_API + "exercise/getAllExerciseBySecId",
			{
				secId,
				tokenId: this.tokenId
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
                        console.log(this.single);
                    }
                    if(res.data.mul.length > 0){
                        this.multiple = this.mapExercise(res.data.mul);
                    }
                    this.checkQuestionType();
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
                if(this.multiple.length>0){ //有多选题
                    this.getNextMultiple(0);
                    // 显示多选
                    this.questionType = 2;
                }else{ //没有多选题  跳转下一页面
		   	        this.$router.push({ path: '/assement-review/',query:{sections:1}})
                }
            }
        },
         // 获取多选下一题
        getNextMultiple(index){
            // 返回下一题
            if(index >= 0 ){
                this.nowQuestion = this.multiple[index];
            }else if(index == -1){ //多选题已完成  ->去详情页
                this.$router.push({ path: '/assement-review/',query:{sections:1}})
            }

        },
        //插入答案
        insertAnswer({userAnswer,status}){
            //自己生成答题列表
            this.createSecList(userAnswer,status);
        },
        //检查显示 单选 多选 还是没有题
        checkQuestionType(){
            if(this.single.length > 0){
                this.questionType = 1//单选
                this.nowQuestion = this.single[this.nowIndex];
            }else if(this.multiple.length > 0 ){
                this.questionType = 2;//多选
                this.nowQuestion = this.multiple[this.nowIndex];
            }else if(this.single.length == 0 && this.multiple.length == 0){
                this.questionType = 3; //没有题
            }
        },
        setTag(arr1,arr2){
            let newArr = arr1.concat(arr2);
            newArr.forEach((obj,index)=>{
                if(index == 0){
                    obj.tag = 1;
                }else if(index == newArr.length-1){
                    obj.tag = 2;
                }else{
                    obj.tag = -1;
                }
            })
        },
        //章节生成答题列表
        createSecList(x,status){
            let secQuestion = {...this.nowQuestion};
            secQuestion.userAnswer = x;
            secQuestion.choiceA = secQuestion.choiceA.options;
            secQuestion.choiceB = secQuestion.choiceB.options;
            secQuestion.choiceC = secQuestion.choiceC.options;
            secQuestion.choiceD = secQuestion.choiceD.options;
            secQuestion.completed = status;
            secQuestion.isSingle = true;
            this.$store.commit('insertAnsweredExercises',secQuestion);
        }
    },
    created(){
        this.getSelExercises();
        this.$store.commit('deleteAnsweredExercises'); 
    },
    computed:{
        examType(){
            let  msg = '';
            if(this.questionType == 1){
                msg = "单选题";
            }else if(this.questionType == 2){
                msg = "多选题";
            }else if(this.questionType == 3){
                msg = "没有可做的题";
            }
            return msg;
        },
        
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