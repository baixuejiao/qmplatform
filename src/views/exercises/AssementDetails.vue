<template>
    <div class="max-wrapper">
        <div class="container">
          <div class="chart">
            <div class="title-container">
              <span class="title">测试 详情</span>
              <a href="javascript:;" class="goPath" @click="goPath()">
                <span class="iconfont icon-icon-arrow-left2 header-icon-arrow"></span>
                <span class="text">题库列表  &gt;</span>
              </a>
            </div>
            <div class="descrip">
              <span class="descrip-infor">{{detail.pathName?detail.pathName:'试卷答案解析：'}}</span>
              <span class="tag">{{exexLevel}}</span>
            </div>
            <!-- <div class="time">VERIFIED 8.22.2019</div> -->

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
                  <div :style="scoreContainer" class="score-container">
                    <div class="descrip">Skill IQ</div>
                    <div class="num">{{detail.score}} </div>
                    <div class="circle-container">
                      <img class="circle" src="@/assets/imgs/exercises/circle.png" alt />
                    </div>
                  </div>
                </ul>
                <!-- {{scoreContainer}} -->
                <!-- 右侧绘画区 -->
                <div class="draw-box">
                  <svg class="mysvg">
                    <path
                      style="fill:none"
                      stroke="#ffc200"
                      stroke-width="2"
                      d="M0,190L0.1600865,189.36666666666667L0.3269358,188.73333333333332L0.5007864000000001,188.1L0.681898,187.46666666666667L0.870472,186.83333333333334L1.066837,186.2L1.271152,185.56666666666666L1.483788,184.93333333333334L1.70501,184.3L1.93503,183.66666666666666L2.174166,183.03333333333333L2.422736,182.4L2.681005,181.76666666666665L2.9492909999999997,181.13333333333333L3.227912,180.5L3.517186,179.86666666666667L3.817431,179.23333333333335L4.128965,178.6L4.452159,177.96666666666667L4.787331,177.33333333333334L5.134799,176.7L5.49504,176.06666666666666L5.8681600000000005,175.43333333333334L6.254530000000001,174.8L6.65521,174.16666666666666L7.06967,173.53333333333333L7.49844,172.9L7.9425799999999995,172.26666666666665L8.40156,171.63333333333333L8.876439999999999,171L9.36775,170.36666666666667L9.875490000000001,169.73333333333332L10.39966,169.1L10.94132,168.46666666666667L11.501,167.83333333333334L12.078700000000001,167.2L12.674949999999999,166.56666666666666L13.290280000000001,165.93333333333334L13.92469,165.3L14.57924,164.66666666666666L15.25446,164.03333333333333L15.949819999999999,163.4L16.66691,162.76666666666665L17.4052,162.13333333333333L18.16575,161.5L18.94909,160.86666666666667L19.75469,160.23333333333332L20.584139999999998,159.6L21.43744,158.96666666666667L22.31512,158.33333333333334L23.21718,157.7L24.14468,157.06666666666666L25.09762,156.43333333333334L26.07653,155.8L27.08194,155.16666666666669L28.11385,154.53333333333333L29.173849999999998,153.9L30.26088,153.26666666666665L31.37653,152.63333333333333L32.5208,152L33.693690000000004,151.36666666666667L34.89573,150.73333333333335L36.12798,150.1L37.39044,149.46666666666667L38.68311,148.83333333333331L40.006519999999995,148.2L41.36173,147.56666666666666L42.74821,146.93333333333334L44.16649,146.3L45.61709999999999,145.66666666666666L47.100570000000005,145.03333333333333L48.6169,144.4L50.16662,143.76666666666665L51.7492,143.13333333333333L53.365700000000004,142.5L55.0193,141.86666666666667L56.699400000000004,141.23333333333335L58.421899999999994,140.6L60.1762,139.96666666666667L61.9623,139.33333333333334L63.7908,138.7L65.6511,138.06666666666666L67.5432,137.43333333333334L69.47240000000001,136.8L71.4387,136.16666666666669L73.4421,135.53333333333333L75.48259999999999,134.9L77.55489999999999,134.26666666666665L79.6643,133.63333333333333L81.8108,133L83.9944,132.36666666666667L86.2151,131.73333333333335L88.4676,131.1L90.7572,130.46666666666667L93.0839,129.83333333333334L95.4477,129.2L97.8433,128.56666666666666L100.27600000000001,127.93333333333334L102.7458,127.3"
                    />
                    <path
                      style="fill:none"
                      stroke="#86CE21"
                      stroke-width="2"
                      d="M105.25269999999999,126.66666666666667L107.7914,126.03333333333333L110.3619,125.39999999999999L112.9695,124.76666666666667L115.6142,124.13333333333333L118.2907,123.5L120.999,122.86666666666666L123.7444,122.23333333333333L126.52159999999999,121.60000000000001L129.3306,120.96666666666667L132.1714,120.33333333333334L135.044,119.7L137.9484,119.06666666666666L140.8846,118.43333333333334L143.8473,117.8L146.84709999999998,117.16666666666666L149.8681,116.53333333333333L152.92090000000002,115.89999999999999L156.0055,115.26666666666667L159.1113,114.63333333333334L162.24890000000002,114L165.41299999999998,113.36666666666667L168.5983,112.73333333333333L171.8101,112.10000000000001L175.04840000000002,111.46666666666667L178.30790000000002,110.83333333333333L181.58859999999999,110.2L184.8958,109.56666666666666L188.2189,108.93333333333332L191.5685,108.3L194.934,107.66666666666666L198.32070000000002,107.03333333333333L201.7233,106.4L205.14180000000002,105.76666666666667L208.5762,105.13333333333334L212.0265,104.5L215.4927,103.86666666666667L218.97480000000002,103.23333333333333L222.4622,102.6L225.9655,101.96666666666667L229.4794,101.33333333333333L233.00390000000002,100.7L236.539,100.06666666666666L240.0794,99.43333333333334L243.6251,98.8L247.1814,98.16666666666667L250.73770000000002,97.53333333333333L254.29930000000002,96.9L257.8662,96.26666666666667L261.43309999999997,95.63333333333334L265,95L268.56690000000003,94.36666666666667L272.1338,93.73333333333332L275.70070000000004,93.1L279.2623,92.46666666666667L282.8186,91.83333333333333L286.37489999999997,91.2L289.9206,90.56666666666666L293.46099999999996,89.93333333333334L296.9961,89.3L300.5206,88.66666666666667L304.0345,88.03333333333335L307.5378,87.39999999999999L311.02520000000004,86.76666666666667L314.5073,86.13333333333334L317.9735,85.49999999999999L321.42379999999997,84.86666666666666L324.8582,84.23333333333333L328.2767,83.6L331.6793,82.96666666666667L335.066,82.33333333333334L338.43149999999997,81.7L341.78110000000004,81.06666666666666L345.10420000000005,80.43333333333334L348.41139999999996,79.80000000000001L351.6921,79.16666666666666L354.9516,78.53333333333333L358.1899,77.9L361.4017,77.26666666666665L364.587,76.63333333333333L367.7511,76L370.88870000000003,75.36666666666666L373.9945,74.73333333333333L377.07910000000004,74.10000000000001L380.13190000000003,73.46666666666667L383.1529,72.83333333333333L386.1527,72.2L389.1154,71.56666666666668L392.0516,70.93333333333332L394.95599999999996,70.3L397.8286,69.66666666666667L400.6694,69.03333333333333L403.47839999999997,68.39999999999999L406.2556,67.76666666666667L409.00100000000003,67.13333333333334L411.7093,66.5L414.3858,65.86666666666667L417.0305,65.23333333333335L419.6381,64.6L422.2086,63.96666666666667"
                    />
                    <path
                      style="fill:none"
                      stroke="#26C1FB"
                      stroke-width="2"
                      d="M424.7473,63.33333333333334L427.25419999999997,62.69999999999999L429.724,62.06666666666666L432.1567,61.43333333333334L434.5523,60.79999999999998L436.91610000000003,60.16666666666666L439.24280000000005,59.53333333333333L441.5324,58.900000000000006L443.7849,58.26666666666665L446.0056,57.633333333333326L448.18919999999997,57L450.3357,56.366666666666674L452.4451,55.73333333333332L454.5174,55.099999999999994L456.5579,54.46666666666667L458.5613,53.83333333333334L460.5276,53.20000000000002L462.4568,52.56666666666666L464.34889999999996,51.93333333333334L466.2092,51.30000000000001L468.03770000000003,50.666666666666686L469.8238,50.03333333333333L471.57809999999995,49.400000000000006L473.30060000000003,48.76666666666668L474.9807,48.133333333333326L476.63430000000005,47.5L478.2508,46.866666666666674L479.83549999999997,46.23333333333332L481.3831,45.599999999999994L482.8989,44.96666666666667L484.3829,44.333333333333314L485.8351,43.69999999999999L487.2502,43.06666666666666L488.6388,42.43333333333334L489.9956,41.79999999999998L491.3153,41.16666666666666L492.6085,40.53333333333333L493.86990000000003,39.900000000000006L495.1048,39.26666666666668L496.3079,38.633333333333326L497.4792,38L498.62399999999997,37.366666666666674L499.73699999999997,36.73333333333335L500.8288,36.099999999999994L501.88349999999997,35.46666666666667L502.917,34.83333333333334L503.924,34.20000000000002L504.9045,33.56666666666666L505.85319999999996,32.93333333333334L506.78069999999997,32.30000000000001L507.687,31.666666666666657L508.5615,31.03333333333333L509.4148,30.400000000000006L510.2469,29.76666666666665L511.0525,29.133333333333326L511.83160000000004,28.5L512.5948,27.866666666666646L513.3315,27.23333333333332L514.0523000000001,26.599999999999994L514.7466,25.96666666666667L515.4197,25.333333333333314L516.0769,24.69999999999999L516.7076,24.066666666666663L517.3277,23.433333333333337L517.9213,22.80000000000001L518.499,22.166666666666686L519.0608,21.53333333333333L519.6014,20.900000000000006L520.1261,20.26666666666668L520.6349,19.633333333333354L521.1225,19L521.5995,18.366666666666674L522.0553,17.73333333333335L522.5005,17.099999999999994L522.9298,16.46666666666667L523.3432,15.833333333333343L523.746,15.199999999999989L524.1329,14.566666666666663L524.5039,13.933333333333337L524.8643,13.299999999999983L525.2141,12.666666666666657L525.548,12.033333333333331L525.8713,11.400000000000006L526.184,10.766666666666652L526.4808,10.133333333333326L526.7723,9.5L527.0532,8.866666666666674L527.3182,8.23333333333332L527.5779,7.599999999999994L527.827,6.966666666666669L528.0654999999999,6.333333333333343L528.2934,5.700000000000017L528.516,5.066666666666663L528.7280000000001,4.433333333333337L528.9347,3.8000000000000114L529.1308,3.1666666666666856L529.3163,2.5333333333333314L529.5018,1.9000000000000057L529.6714000000001,1.26666666666668L529.841,0.6333333333333258"
                    />
                  </svg>
                  <div class="percent-container" :style="{left:left}">
                    <div class="percent">{{detail.rightlevel}}%</div>
                    <div class="text">准确率</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="infor">
            <div class="left">
              <div class="descrip">继续做题：</div>
              <button class="btn-learn"  @click="goPath()">路径</button>
              <div class="line"></div>
              <div class="again-container">
                <div class="review">
                    <span class="review-btn" @click="$router.push('/assement-review?pathId='+$route.query.pathId)">回顾</span>你的问题，查看答案解析
                </div>
              </div>
            </div>
            <div class="right">
              <div class="recommend">推荐课程：</div>
              <div v-if="recommendCourse">
                <ul v-if="courseList.length>0">
                  <li class="recommend-list" v-for="(course,index) in courseList" :key="index" @click="govideo(course.courseId)">
                      <img :src="imgUrl+course.image" alt="">
                      <div class="course-info">
                          <h3 class="course-title">{{course.title}}</h3>
                          <div class="other">
                              <span class="course-teacher">{{course.teacher.nickName}}</span>
                              <span class="dott">·</span>
                              <span class="course-level">{{setLevel(course.level)}}</span>
                          </div>
                      </div>
                  </li>
                </ul>
                <div  v-if="courseList.length == 0" class="no-course">
                  暂无推荐课程
                </div>
              </div>
             
            </div>
          </div>
        </div>
    </div>
  





</template>

<script>
import { constants } from 'crypto';
import {setLevel} from '@/assets/js/common.js';
export default {
  data() {
      return {
          num: 20,//正确题的个数 
          detail:{},
          tokenId: localStorage.getItem('tokenId'),
          token: localStorage.getItem('token'),
          left:'-275px',
          imgUrl: window.CDN_URL,
          courseList:[],
          recommendCourse:false
      };
  },
  computed:{
    exexLevel(){
        let level = '';
        if(this.detail.score){
          if(this.detail.score <=60){
              level = "新手";
          }else if(this.detail.score <=80 && this.detail.score >60){
              level = "精通";
          }else{
              level = "专家";
          }
        }
        return level;
    },
    scoreContainer(){
        // 断点 60 -> 102  62
        // 断点 80 -> 419  124  
        let x ,y;
        if(this.detail.score <= 60){
            if(this.detail.score == 0 ){
                y = 130 ;
                x = 58 ;
            }else if(this.detail.score >0 && this.detail.score <= 5){
                y = 111;
                x = 67;
            }
            else if(this.detail.score >5 && this.detail.score <= 10){
                y = 103;
                x = 70;
            }
            else if(this.detail.score >10 && this.detail.score <= 20){
                y = 103;
                x = 70;
            }
            else if(this.detail.score >20 && this.detail.score <= 25){
                y = 80;
                x = 94;
            }
            else if(this.detail.score >25 && this.detail.score <= 30){
                y = 92;
                x = 93;
            }
            else if(this.detail.score >30 && this.detail.score <= 40){
                y = 85;
                x = 100;
            }else{
              x = 100;
              y = 85;
              y =  y - this.detail.score/60*18 ;
              x =  x + this.detail.score/60*50;
            }
          
        }else if(this.detail.score >60 && this.detail.score<=80){
            let maxX = 419 -102;
            let maxY = 124-62;

            y =  67 - (this.detail.score-60)/(80-60)*maxY;
            x =  161 + (this.detail.score-60)/(80-60)*maxX;
        }else if(this.detail.score >80){
            if(this.detail.score >80 && this.detail.score <= 82){
                y = -1 ;
                x = 496 ;
            }else if(this.detail.score >82 && this.detail.score <= 85){
                y = -5;
                x = 510;
            }else if(this.detail.score >85 && this.detail.score <= 88){
                y = -13;
                x = 534;
            }else if(this.detail.score >88 && this.detail.score <= 90){
                y = -17;
                x = 542;
            }else if(this.detail.score >90 && this.detail.score <= 93){
                y = -23;
                x = 553;
            }else if(this.detail.score >93 && this.detail.score <= 96){
                y = -35;
                x = 568;
            }else if(this.detail.score >96 && this.detail.score <= 100){
                y = -57;
                x = 582;
            }
        }
        this.left = x -333+"px"
        return {
          "left": x +"px",
          "top": y+"px"
        }
    },
    percentContainer(){
      let x = -275+490*(this.num/24);
      return {
        "left": x+"px"
      }
    },
    courseLevel(){
       
    }
  },
  created() {
	  this.$store.commit("showLoading");
    this.$post(BASE_API + "exercise/getScore",
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
        this.recommendCourse = true;
        this.detail = res.data.score;
        this.num = res.data.count;
        this.courseList = res.data.course;
		} else {
			this.$store.commit("showDialog", res.errsmg);
			// 处理其他错误码的情况
		}
	})
	.catch(err => {
		this.$store.commit("showDialog");
	});
  },
  methods:{
    goPath(){
        this.$router.push('/exercisesPath');
      	// location.href=VUE_APP_FE_URL+'/paths?pathId='+this.$route.query.pathId;
    },
    setLevel,
    govideo(id) {
      this.$router.push({
        name: "classdetail",
        query: { id }
      });
    },
  }
};
</script>>

<style lang="scss" scoped>
.title-container {
  margin-top:10px;
  padding: 20px 0px 10px ;
  display: flex;
  justify-content: space-between;
  .title {
    color: #ccc;
    font-size: 12px;
    font-weight: 500;
  }
  .text {
    color: #f96816;
  }
  .goPath{
    outline: none;
    &:hover{
      text-decoration: none;
    }
  }
}

.descrip {
  font-size: 24px;
}
.descrip .tag {
  color: #ffc200;
}
.descrip .descrip-infor {
  color: #fff;
}
.time {
  color: #aaa;
  margin-top: 8px;
  font-size: 12px;
}
.infor {
  display: flex;
  width: 100%;
  border-top: 1px solid #555;
  color: #ccc;
  margin-bottom: 40px;
}
.left {
  font-size: 18px;
  line-height: 24px;
  font-weight: 200;
  max-width: 520px;
  color: #ccc;
  padding-right: 48px;
  padding-left: 6px;
  padding-top: 24px;
  border-right: 1px solid #555;
  flex-grow: 1;
  .btn-learn {
    width: 250px;
    height: 40px;
    border: 1px solid #f96816;
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    background-color: #f96816;
    outline: none;
    font-size: 14px;
    &:hover{
      background-color: #FF7B39;
      color:#ccc;
    }
  }
  .review{
      color:#CCC;
      font-size: 14px;
      .review-btn{
          color: #f96816;
          letter-spacing: 2px;
          text-decoration: underline;
          font-weight: 400;
          cursor: pointer;
          margin-right: 2px;
      }
  }
}
.left .descrip {
  margin-top: 0;
  padding: 0;
  display: block;
  font-size: 18px;
  line-height: 24px;
  font-weight: 200;
  width: 240px;
  color: #ccc;
  margin-bottom: 32px;
}
.line {
  border-bottom: 1px solid #363636;
  margin-top: 25px;
  margin-bottom: 23px;
  width: 100%;
}
.left .again {
  margin-top: 4.5%;
  margin-left: 5px;
  font-size: 14px;
  line-height: 24px;
  font-weight: 300;
  color: #2d2d2d;
}
.left .profile {
  margin-top: 38px;
  margin-left: 5px;
  font-size: 12px;
  line-height: 12px;
  font-weight: 300;
  color: #ccc;
}
.left .profile a {
  color: #fff;
  text-decoration: underline;
}
.right {
  height: 100%;
  margin: 24px 0 48px 43px;
  padding: 0 0 0 0;
  justify-content: flex-start;
  flex-grow: 2;
  .recommend{
    margin-bottom:10px;
  }
  .recommend-list{
      overflow: hidden;
      transition: all 300ms ease 0s;
      padding: 12px 0px;
      border-bottom: 1px solid rgb(54, 54, 54);
      cursor: pointer;
      &:hover{
        background: rgb(49, 49, 49)
      }
      img{
          width: 96px;
          height: 55px;
          float: left;
          margin-right:20px;
          padding-left: 5px;
      }
      .course-info{
          float: left;
          .course-title{
              font-weight: 500;
              text-align: left;
              font-size: 18px;
              line-height: 22px;
              letter-spacing: 0.03em;
              color: #fff !important;
              &:hover{
                  text-decoration: underline;
              }
          }
          .other{
              color:#aaaaaa;
              font-size: 12px;
              margin-top:12px;
              span{
                  margin-right:8px;
              }
          }
      }
  }
  .no-course{
    font-size: 12px;
    padding: 20px 0;
    border-top:1px solid #363636;
  }
}


.review-container .text1 {
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  color: #ccc;
  text-align: left;
  margin-bottom: 0px;
}
.review-container .text2 {
  width: 329px;
}
.review-container .btn {
  width: 200px;
  height: 40px;
  border: 1px solid #f96816;
  color: #f96816;
  display: inline-block;
  vertical-align: middle;
} 
.header-icon-arrow {
  font-size: 12px;
  color: #f96816;
}
.detail-draw-img {
  margin: 25px 0px 80px 0px;
  .level-box {
    float: left;
    position: relative;
    .level-list {
      font-size: 14px;
      font-weight: 400;
      text-align: right;
      border-right-width: 2px;
      border-right-style: solid;
      padding-right: 20px;
      width: 80px;
      // height: 58px;
      padding-top: 12px;
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
        height: 62px;
      }
      &.level-list-2 {
        color: #86ce21;
        height: 65px;
      }
      &.level-list-3 {
        color: #ffc200;
        height: 63px;
      }
    }
  }
  .draw-box {
    width: 550px;
    height: 190px;
    float: left;
    border-bottom: 1px solid #333;
    position: relative;

  }
}

// 需要做动画
.score-container{
  position: absolute;
  z-index: 1;
  width: 45px;
  color: #fff;
  right: -22px;
  text-align: center;
  line-height: 20px;
  .descrip {
    font-size: 12px;
    color: #aaa;
    background: #181818;
  }
  .num {
    font-size: 24px;
    background: #181818;
  }
  .circle-container {
    width: 32px;
    height: 32px;
    margin-left: 6px;
    margin-top: 4px;
    .circle {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid rgb(255, 194, 0);
      background: #181818;
    }
  }
}

.draw-box .mysvg {
  position: absolute;
  width: 100%;
  left: -1px;
  top: 0px;
  height: 191px;
}

.draw-box .percent-container {
  position: relative;
  top: 204px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
}

.percent-container .percent {
  font-size: 12px;
  font-weight: 500;
}
.percent-container .text {
  font-size: 12px;
  font-weight: 100;
}
</style>