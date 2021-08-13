<!--测评答案详情review页面-->
<template>
  <div class="max-wrapper">
    <div class="detail-box">
      <div class="container-fluid">
        <div class="row assement-title">
          <div class="col-md-6">
            </div>
          <div class="col-md-6 assement-link">
            <a href="/exercisesPath">
              <span class="iconfont icon-icon-arrow-left2 header-icon-arrow"></span>返回题库列表
            </a>
          </div>
        </div>
        <div class="question-name">
          试卷答案解析：
          <span class="level">{{exexLevel}}</span>
        </div>
        <div class="detail-draw-img">
          <div class="clearfix">
            <!-- 左侧等级 -->
            <ul class="level-box">
              <li class="level-list level-list-1">
                <div>专家</div>
                <div class="leval-number">81-100</div>
              </li>
              <li class="level-list level-list-2">
                <div>精通</div>
                <div class="leval-number">61-80</div>
              </li>
              <li class="level-list level-list-3">
                <div>新手</div>
                <div class="leval-number">0-60</div>
              </li>
            </ul>
            <!-- 右侧绘画区 -->
            <div class="draw-box" :style={width:drawWidth}>
              <svg xmlns="http://www.w3.org/2000/svg" width="800"  height="190">
                <line
                  v-for="(item,index) in pos"
                  :key="index"
                  :x1="item.startX"
                  :y1="item.startY"
                  :x2="item.endX"
                  :y2="item.endY"
                  :style="{stroke:item.color}"
                />
              </svg>
            </div>
          </div>
          <!-- 对错 -->
          <ul class="question-answer clearfix">
            <li
              v-for="(item,index) in allExercise"
              :key="index"
              :class="{'question-error':!(item.completed*1),'question-right':!!(item.completed*1)}"
              @click="changeQuestion(index)"
            ></li>
          </ul>
          <!-- 题序号 -->
          <ul class="question-num-box clearfix">
            <li
              v-for="(val,index) in allExercise.length"
              :key="index"
              :class="{'question-number':true,'active':index == nowIndex}"
              @click="changeQuestion(index)"
            >{{val}}</li>
          </ul>
        </div>
        <div class="question-box">
            <ul class="nav-box clearfix">
                <li v-for="(obj,index) in tabList" :key="index" :class="{active:index == tab}" @click="tabFn(index)">{{obj.name}}</li>
            </ul>
            <!-- review 习题 -->
            <ExerReview :allExercise="allExercise" v-if="tab == 0" @changeIndex="changeIndex" :nowIndex="nowIndex"></ExerReview>
            <ReviewProgram v-if="tab == 1" :programList="program"></ReviewProgram>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExerReview from './ExerReview.vue';
import ReviewProgram from './ReviewProgram.vue';

export default {
    data(){
        return {
            single:[], //单选
            multiple:[], //多选
            allExercise:[], //所有题目数组
            nowIndex:0,//当前显示题的索引
            lineStartY:0,
            lineEndY:0,
            pos:[],
            tab:-1, //0 选择显示  1 编程显示
            drawWidth:0,
            tokenId: localStorage.getItem('tokenId'),
            token: localStorage.getItem('token'),
            tabList:[
              {
                  name:'选择题',
                  active:true
              }
            ],
            program:[],
            score:0
        }
    },
    components:{
        ExerReview,
        ReviewProgram
    },
    created(){
        // 如果从章节过来查看结果
        if(this.$route.query.sections != undefined){ 
            this.allExercise = this.$store.state.answeredExercises;
            this.tab = 0;
            this.computePos();
        }else if(this.$route.query.suitId != undefined){ // 如果从套题过来查看结果
            this.getSuitExercise();
        }else if(this.$route.query.passId != undefined){// 如果从闯关过来查看结果
            this.getPassExercise();
        }else if(this.$route.query.pathId != undefined){// 如果从path过来查看结果
            this.getPathExercise();
        }
    },
    methods:{
        changeIndex(index){
            this.nowIndex = index;
        },
        // 点击图中1 2 3数组按钮切换子组件中的题
        changeQuestion(index){
            this.nowIndex = index;
            this.tab = 0;
        },
        // 计算位置坐标
        computePos(){
          let maxPosY = 190;  // Y轴起始纵坐标
          let spaceX = 32;  // x轴间隙
          let posY = maxPosY;
          let startY,endY,startX,endX,color;
          let iHeight = maxPosY/this.allExercise.length; // 一道题坐标下滑的高度 总的纵轴高度/个数
          let centerX ;//中间断点 
          this.allExercise.forEach((item,index) => {
            startY = posY;
            endY = item.completed==1?posY-=iHeight:posY;
            startX = index*32;
            endX = (index+1)*32;
            if(startY <= maxPosY/5 && endY <= maxPosY/5){ //专家
              color = '#26c1fb';
              this.pos.push({startX,endX,startY,endY,color}); 
            }else if(startY >= maxPosY/5 && endY >= maxPosY/5 && startY <= maxPosY/5*2 && endY <= maxPosY/5*2 ){ //精通
              color = '#86ce21';
              this.pos.push({startX,endX,startY,endY,color}); 
            }else if(startY >= maxPosY/5*2 && endY >= maxPosY/5*2){  //新手

              color = '#ffc200';
              this.pos.push({startX,endX,startY,endY,color}); 
            }else if(startY >= maxPosY/5*2 && endY <= maxPosY/5*2){  //新手 -> 精通
              //从 startY -> maxPosY/5*2  新手
              color = "#ffc200";
              centerX = startX + spaceX * ((maxPosY/5*2 -startY)/(endY-startY));
              this.pos.push({startX,endX:centerX,startY,endY: maxPosY/5*2,color}); 
              //从 maxPosY/5*2 -> endY  精通
              color = '#86ce21';
              this.pos.push({startX:centerX,endX,startY:maxPosY/5*2,endY,color}); 
            }else if(startY >= maxPosY/5 && endY <= maxPosY/5){  //精通 -> 专家
              //startY -> maxPosY/3 精通
              color = "#86ce21";
              centerX = startX + spaceX * ((maxPosY/5 -startY)/(endY-startY));
              this.pos.push({startX,endX:centerX,startY,endY: maxPosY/5,color}); 
              //maxPosY/3 -> endY 专家
              color = '#26c1fb';
              this.pos.push({startX:centerX,endX,startY:maxPosY/5,endY,color}); 
            }
          });
        },
        //根据pathId获取习题
        getPathExercise(){
          this.$store.commit("showLoading");
          this.$post(BASE_API + "exercise/getScoreAndExercise",
            {
              pathId:this.$route.query.pathId,
              tokenId: this.tokenId
            }, {
              headers: {
              token: this.token,
              }
            }
          ).then(res => {
            this.$store.commit("hideLoading");
            if (res.errno * 1 === 101) {
              this.score = res.data.score.score;
              this.single = res.data.sing;
              this.multiple = res.data.mul;
              if(res.data.program.length > 0){ //有编程题
                  this.tabList.push({
                    name:'编程题',
                    active:false
                  })
                  this.program = res.data.program;
              }
              this.single.forEach(function(item,index){
                item.isSingle = true;
              });
              this.multiple.forEach(function(item,index){
                item.isMultiple = true;
              });
              this.allExercise = [...this.single,...this.multiple];
              this.drawWidth = 100 + this.allExercise.length * 32 +"px";
              this.computePos();
              this.tab = 0;
            } else {
              this.$store.commit("showDialog", res.errsmg);
              // 处理其他错误码的情况
            }
          })
          .catch(err => {
            this.$store.commit("showDialog");
          });
        },
        getSuitExercise(){
          this.$store.commit("showLoading");
          this.$post(BASE_API + "suit/getSuitData",
            {
              suitId:this.$route.query.suitId,
              tokenId: this.tokenId
            }, {
              headers: {
              token: this.token,
              }
            }
          ).then(res => {
            this.$store.commit("hideLoading");
            if (res.errno * 1 === 101) {
              this.score = res.data.score.score;

              this.single = res.data.sing;
              this.multiple = res.data.mul;
              if(res.data.program.length > 0){ //有编程题
                  this.tabList.push({
                    name:'编程题',
                    active:false
                  })
                  this.program = res.data.program;
              }
              this.single.forEach(function(item,index){
                item.isSingle = true;
              });
              this.multiple.forEach(function(item,index){
                item.isMultiple = true;
              });
              this.allExercise = [...this.single,...this.multiple];
              this.drawWidth = 100 + this.allExercise.length * 32 +"px";
              this.computePos();
              this.tab = 0;
            } else {
              this.$store.commit("showDialog", res.errsmg);
              // 处理其他错误码的情况
            }
          })
          .catch(err => {
            this.$store.commit("showDialog");
          });
        },
        getPassExercise(){
          this.$store.commit("showLoading");
          this.$post(BASE_API + "pass/getPassExerciseByTokenIdAndPassId",
            {
              passId:this.$route.query.passId,
              tokenId: this.tokenId
            }, {
              headers: {
              token: this.token,
              }
            }
          ).then(res => {
            this.$store.commit("hideLoading");
            if (res.errno * 1 === 101) {
              this.score = res.data.score.score;
              this.single = res.data.sing;
              this.multiple = res.data.mul;
              if(res.data.program.length > 0){ //有编程题
                  this.tabList.push({
                    name:'编程题',
                    active:false
                  })
                  this.program = res.data.program;
              }
              this.single.forEach(function(item,index){
                item.isSingle = true;
              });
              this.multiple.forEach(function(item,index){
                item.isMultiple = true;
              });
              this.allExercise = [...this.single,...this.multiple];
              this.drawWidth = 100 + this.allExercise.length * 32 +"px";
              this.computePos();
              this.tab = 0;
            } else {
              this.$store.commit("showDialog", res.errsmg);
              // 处理其他错误码的情况
            }
          })
          .catch(err => {
            this.$store.commit("showDialog");
          });
        },
        tabFn(idx){
            this.tabList.forEach((obj,index)=>{
                if(index == idx){
                    obj.active = true;
                    this.tab = index;
                }else{
                    obj.active = false;
                }
            })
        }
    },
    computed:{
        exexLevel(){
          let level = '';
          if(this.score){
            if(this.score <=60){
                level = "新手";
            }else if(this.score <=80 && this.score >60){
                level = "精通";
            }else{
                level = "专家";
            }
          }
          return level;
      }
  }
};

</script>

<style lang="scss" scoped>
.detail-box {
  padding: 20px 40px;
  .assement-title {
    color: #ccc;
    line-height: 38px;
    .assement-link {
      padding-right: 30px;
      font-size: 12px;
      text-align: right;
      .header-icon-arrow {
        font-size: 12px;
        margin-right: 10px;
      }
      a {
        color: $orange-color;
      }
    }
  }
  .question-review {
    font-size: 12px;
    font-weight: 300;
    margin: 0;
    color: #aaaaaa;
    text-transform: uppercase;
  }
  .question-name {
    font-size: 24px;
    font-weight: 400;
    line-height: 28px;
    color: #fff;
    margin: 0;
    .level {
      color: #ffc200;
    }
  }
  .question-date {
    margin-top: 8px;
    font-size: 12px;
    line-height: 12px;
    font-weight: 300;
    color: #aaa;
  }

  .question-img {
    width: 955px;
    height: 288px;
    margin-bottom: 15px;
  }
  .detail-draw-img {
    margin: 25px 0;
    .level-box {
      float: left;
      .level-list {
        font-size: 14px;
        font-weight: 400;
        text-align: right;
        border-right-width: 2px;
        border-right-style: solid;
        padding-right: 10px;
        width: 80px;
        // height: 63px;
        padding-top: 2px;
        line-height: 18px;
        -webkit-box-direction: normal;
        .leval-number {
          font-size: 12px;
          font-weight: 200;
          color: #aaa;
          margin: 0px;
        }
        &.level-list-1 {
          color: #26c1fb;
          height:38px;
        }
        &.level-list-2 {
          color: #86ce21;
          height:38px;
        }
        &.level-list-3 {
          color: #ffc200;
          height:114px;
          padding-top: 40px;
        }
      }
    }
    .draw-box {
      width: 800px;
      height: 190px;
      // background: #ff0000;
      float: left;
      border-bottom: 1px solid #777777;
    }
    .question-answer {
      margin-left: 94px;
      margin-top: 10px;
      li {
        float: left;
        width: 24px;
        margin: 4px;
        height: 10px;
        &.question-right {
          background: url(./../../assets/imgs/exercises/answer-right.png) center center
            no-repeat;
          background-size: 10px 10px;
        }
        &.question-error {
          background: url(./../../assets/imgs/exercises/answer-error.png) center center
            no-repeat;
          background-size: 10px 10px;
        }
      }
    }
    .question-num-box {
      margin-left: 94px;
      margin-top: 10px;
      .question-number {
        color: #aaa;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1px solid transparent;
        text-align: center;
        line-height: 24px;
        float: left;
        margin: 4px;
        cursor: pointer;
        &:hover {
          border-color: #aaa;
        }
        &.active {
          border-color: #fff;
          color: #fff;
        }
      }
    }
  }
  .question-box{
      margin-bottom: 24px;
      .nav-box{
          border-bottom: 1px solid #545454;
          margin-bottom:8px;
          li{ 
              float: left;
              font-size: 1rem;
              line-height: 1.71429;
              color: #efefef;
              font-weight: 100;
              display: block;
              padding: 15px 10px;
              margin-right:15px;
              cursor: pointer;
              border-bottom: 5px solid transparent;
              &.active{
                  border-bottom: 5px solid #f96816;
                  font-weight: 400;
              }
          }
      }
  }

}
</style>