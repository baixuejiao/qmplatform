<!--技能测评页面--->
<template>
    <div class="max-wrapper">
        <div class="container-fluid">
            <div class="exam-wrapper">
                <!-- 单选 -->
                <div class="exam-type" v-if="questionType != 4 && questionType != 0"> 
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
                    <program-list v-if="questionType == 3"
                     @insertAnswer="insertAnswer" 
                     @getProgram="getProgram"
                     @complete="complete"
                     :programList="program"
                     :suitId="suitId"
                     ></program-list>
                </div>
                <no-exam v-if="questionType == 4" :title="title" :type="type"></no-exam>
            </div>
        </div>
        <Dialog ref="dialog"></Dialog>
    </div>
</template>
<script>
// import examHeader from './../components/ExamHeader';
import exam from './Exam';
import examMultiple from './ExamMultiple';
import NoExam from './NoExam';
import programList from '@/components/exercises/ProgramList.vue';
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
            exerType:['单选题','多选题','编程题','没有可做的题'],
            passScore:0,
        }
    },
    components:{
        exam,
        examMultiple,
        NoExam,
        programList,
        Dialog
    },
    methods:{
        // 获取path习题
        getPathExercises(){
             this.$post(BASE_API + "exercise/getExercise",
			{
				pathId:this.$route.query.pathId,
				tokenId: this.tokenId
			}, {
				headers: {
					token: this.token,
				}
			})
			.then(res => {
				if (res.errno * 1 === 101) {
                    // 标注tag 第一题:1  最后一题:2  其他题:-1
                    this.setPathTag(res.data.sing,res.data.mul,res.data.program);
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
        // 获取套题
        getSuitExercises(){
            this.$post(BASE_API + "exercise/getExerciseBycateId",
			{
				cateId:this.$route.query.cateId,
				tokenId: this.tokenId
			}, {
				headers: {
					token: this.token,
				}
			})
			.then(res => {
				if (res.errno * 1 === 101) {
                    // 存储suitId
                    this.suitId = res.data.suitId;
                    // 标注tag 第一题:1  最后一题:2  其他题:-1
                    this.setTag(res.data.sing,res.data.mul,res.data.program);
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
                    this.setTag(res.data.sing,res.data.mul,res.data.program);
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
                this.checkQuestionType(1);//设置下一题型
            }
        },
         // 获取多选下一题
        getNextMultiple(index){
            // 返回下一题
            if(index >= 0 ){
                this.nowQuestion = this.multiple[index];
            }else if(index == -1){
                this.checkQuestionType(2); //设置下一题型
            }
        },
        getProgram(index){
            this.nowQuestion = this.program[index];
        },
        /*  
            发送答案写入请求
            参数
                {userAnswer,htmlAnswer,cssAnswer,jsAnswer,status,tag}
                    tag交卷传tag = 2 
                callBack插入答案成功回调函数
        */
        insertAnswer({userAnswer,htmlAnswer,cssAnswer,jsAnswer,status,tag},callBack){
            if(this.$route.query.isParts){ //从partts 过来做题
                let params = {
                    tokenId: this.tokenId,
                    userAnswer,
                    htmlAnswer,
                    cssAnswer,
                    jsAnswer,
                    tag:tag?tag:this.nowQuestion.tag,
                    pathId:this.nowQuestion.pathId,
                    status,
                }
                if(status != undefined){ //(是做题 不是交卷）
                    params.exercisesId = this.nowQuestion.id;
                }
                this.postInsertAnswer("exercise/insertUserAnswerByTag",params,callBack);
            }else if(this.$route.query.cateId != undefined){ //做套题
                let params = {
                    tokenId: this.tokenId,
                    userAnswer,
                    htmlAnswer,
                    cssAnswer,
                    jsAnswer,
                    tag:tag==2?tag:this.nowQuestion.tag,
                    categoryId:this.$route.query.cateId,
                    status,
                    suitId:this.suitId
                }
                if(status != undefined){ ////做题 
                    params.exercisesId = this.nowQuestion.id;
                }
                this.postInsertAnswer("suit/insertSuitUserAnswerByTag",params,callBack);
            }else if(this.$route.query.passId != undefined){//闯关题
                let params = {
                    tokenId: this.tokenId,
                    userAnswer,
                    htmlAnswer,
                    cssAnswer,
                    jsAnswer,
                    tag:tag==2?tag:this.nowQuestion.tag,
                    count:this.$route.query.count,
                    passId:this.$route.query.passId,
                    status,
                }
                if(status != undefined){//做题 
                    params.passExercisesId = this.nowQuestion.id;
                }
                this.postInsertAnswer("pass/insertPassUserAnswerByTag",params,callBack);
            }
        },
        // 发送插入答案请求
        postInsertAnswer(url,params,callBack){
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
                this.nowIndex++;
                if(callBack){
                    callBack();
                }
                if(this.$route.query.passId != undefined && this.nowQuestion.tag == 2){
                    this.passScore = res.data.score;
                }
              } else {
                this.$store.commit("showDialog", res.errsmg);
                // 处理其他错误码的情况
              }
            })
            .catch(err => {
                console.log(err);
                this.$store.commit("showDialog");
            });
        },
        /*
            检查显示 单选 多选 还是没有题
            params num
            0 初始化数据显示
            1 单选下一个题型
            2 多选下一个题型
        */
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
                    this.complete();
                }
            }else if(num == 2){
                if(this.program.length > 0){ //有编程题
                    this.questionType = 3;
                }else{ //没有题  跳转下一页面
                    this.complete();
                }
            }
        },
        // 设置套题tag标识  1代表第一道题  2代表最后一道题  -1 其他题
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
            })
        },
        // 设置pathtag标识  1代表第一道题  2代表最后一道题  -1 其他题
        setPathTag(arr1,arr2,arr3){
            let newArr = arr1.concat(arr2,arr3);
            newArr.forEach((obj,index)=>{
                if(index == 0 && this.$route.query.status == 0){
                    obj.tag = 1;
                }else if(index == newArr.length-1){
                    obj.tag = 2;
                }else if(this.$route.query.status == 1){
                    obj.tag = -1;
                }else{
                    obj.tag = -1;
                }
            })
        },
        passSuccess(score){
            let status = score >= 80 ? 1:0;
            if(status == 1){
                this.$refs.dialog.show({content:score+'分，闯关成功',score,back:'继续闯关',type:'success'});
            }else{
                this.$refs.dialog.show({content:score+'分，闯关失败',score,back:'继续闯关',type:'error'});
            }
        },
        // 交卷方法
        complete(){
            this.insertAnswer({tag:2},()=>{
                if(this.$route.query.isParts){//path题
                    this.$router.push({ path: '/assement-details/', query: { pathId: this.$route.query.pathId}});
                }else if(this.$route.query.cateId != undefined){//套题
                    this.$router.push({ path: '/cateExerDetail/', query: { cateId: this.$route.query.cateId,cateName:this.$route.query.cateName,suitId:this.suitId}});
                }else if(this.$route.query.passId != undefined){
                    this.passSuccess(this.passScore);
                }
            }); 
            
        }
    },
    created(){
        if(this.$route.query.isParts){ //从partts 过来做题
            this.getPathExercises();
        }else if(this.$route.query.cateId != undefined){ //做套题
            this.getSuitExercises();
        }else if(this.$route.query.passId != undefined){ //闯关题
            this.getPassExercises();
        }
    },
    computed:{
        singNextText(){
            let msg = "";
            if(this.multiple.length > 0){
                msg = '去多选题';
            }else if(this.program.length > 0){
                msg = '去编程题';
            }else{
                msg = '交卷';
            }
            return msg;
        },
        mulNextText(){
            let msg = "";
            if(this.program.length > 0){
                msg = '去编程题';
            }else{
                msg = '交卷';
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