<!-- 就业班 -->
<template>
  <div id="employ">
    <!-- banner -->
    <div id="employ-banner">
      <div id="employ-banner-wrapper">
        <section class="employ-banner-list">
          <h3 class="employ-banner-title">线下课程</h3>
          <p class="employ-banner-intro underline">专业团队面授 / 手把手指导 / 笔试面试模拟 <br/> 内推 / 保就业</p>
          <p class="employ-banner-fit">适合人群：在校学生、时间充裕社会人士</p>
          <span class="employ-banner-btn pink" @click="goDetails('/vclass')">了解详情</span>
        </section>
        <section class="employ-banner-list">
          <h3 class="employ-banner-title">线上课程</h3>
          <p class="employ-banner-intro online">自由灵活，不受时间和空间限制 <br/> BAT一线工程师线上指导 <br/> 费用低</p>
          <p class="employ-banner-fit">适合人群：在职人士、自学能力较强的学生</p>
          <span class="employ-banner-btn green" @click="goTx()">了解详情</span>
        </section>
      </div>
    </div>

    <!-- 课程介绍 -->
    <div id="employ-course">
      <section class="employ-course-list">
        <img src="@/assets/imgs/vip/icon_employ.png" alt="" class="employ-course-icon">
        <h2 class="employ-course-title">Web全栈工程师</h2>
        <p class="employ-course-intro">一个全能的职位，可以独立完成网站、WebApp、小程序 等Web程序的所有工作。 </p>
        <ul class="employ-course-content">
          <li class="employ-course-item">
            <span>知识体系：</span>
            <p>Web前端：用户UI界面+用户体验</p>
            <p>Web后端：数据增删改查+业务处理</p>
          </li>
          <li class="employ-course-item">
            <span>课程特点：</span>
            简单易学、生动有趣、直观明了
          </li>
          <li class="employ-course-item">
            <span>适合人群：</span>
            对用户界面、用户体验、后端数据及业务操作感兴趣的人士。
          </li>
        </ul>
        <p class="employ-course-tips">总时长197小时·4175人学习</p>
      </section>
      <section class="employ-course-list">
        <img src="@/assets/imgs/vip/icon_employ.png" alt="" class="employ-course-icon">
        <h2 class="employ-course-title">Java Web及大数据工程师</h2>
        <p class="employ-course-intro">目前国内需求量最高的职位，可以完成Web程序的后端及 大数据分析、挖掘等工作。 </p>
        <ul class="employ-course-content">
          <li class="employ-course-item">
            <span>知识体系：</span>
            <p>Java Web：使用Java语言完成数据增删改查+业务处理</p>
            <p>大数据：数据采集、清洗、分析挖掘、可视化等</p>
          </li>
          <li class="employ-course-item">
            <span>课程特点：</span>
            技术难度相对复杂，但应用范围广泛
          </li>
          <li class="employ-course-item">
            <span>适合人群：</span>
            对后端数据处理、业务操作及对数据分析挖掘感兴趣的人士。
          </li>
        </ul>
        <p class="employ-course-tips">总时长197小时·4175人学习</p>
        
      </section>
    </div>

    <!-- 主内容+金字塔  -->
    <div id="employ-container">
      <div id="employ-main">
        <div id="employ-video">
          <section id="employ-video-media">
            <img src="@/assets/imgs/vip/video-img.png" alt="">
            <p>观看视频介绍</p>
          </section>
          <section id="employ-video-intro">
            <h3>如何选择适合自己的技术方向？</h3>
            <p>本视频用通俗易懂的语言和大量的数据论证来为大家介绍当下主流的技术方向，各个方向的差异以及各个方向未来的职业发展，希望通过本视</p>
          </section>
          <img id="employ-video-img" src="@/assets/imgs/vip/sw.png" alt="">
        </div>
        <div id="employ-qa">
          <section class="employ-qa-list">
            <h2 class="employ-qa-title">学习过程中常遇到的问题</h2>
            <p class="employ-qa-question">理论听不懂的可能性比较小，只要能坚持下来，可以保证90%以上的内容能听懂，最大的问题在于：</p>
            <ul class="employ-qa-wrapper">
              <li class="employ-qa-item">听懂了，但不动手练习</li>
              <li class="employ-qa-item">做练习不会举一反三，死记硬背</li>
              <li class="employ-qa-item">遇到问题，不愿意动脑思考，总是爱问别人</li>
              <li class="employ-qa-item">懒，很容易坚持不下来</li>
            </ul>
          </section>
          <section class="employ-qa-list">
            <h2 class="employ-qa-title">成功学习下来重要的条件</h2>
            <p>自身条件：</p>
            <ul class="employ-qa-wrapper">
              <li class="employ-qa-item">坚持就是胜利，你不是一个人在战斗，有很多其他的同学一起，更何况还有老师一直陪着</li>
              <li class="employ-qa-item">多练习，少说话</li>
              <li class="employ-qa-item">学会自我调节心态</li>
            </ul>
            <p class="employ-qa-tips">外在条件：</p>
            <ul class="employ-qa-wrapper">
              <li class="employ-qa-item">老师的责任心，这个至关重要</li>
              <li class="employ-qa-item">科学合理的学习方法</li>
            </ul>
          </section>
        </div>
        <div id="employ-pyramid">
          
          <img src="@/assets/imgs/vip/pyramid.png" alt="">
        </div>
      </div>
    </div>

    <div id="employ-show" class="clearfix">
      <p id="employ-show-title">876名同学与你一起学习</p>
      <div id="employ-show-content">
        <section class="employ-show-list">
          <p class="employ-show-name">
            <img src="@/assets/imgs/vip/user_default.png" alt="">
            菜鸟
          </p>
          <p class="employ-show-content">
            讲的很不错，每结都有自己独有的知识点，每个章节可以覆盖很多知识点，总体来讲真的很全面。其实我还是有一定基础的，现在来看看，正好可以巩固自己以前看书漏掉的知识，最有特点的就是课后习题，这一点我个人很喜欢。可能是习惯了吧，习惯听完课有题做的感觉，这样可以迅速的发现哪里自己存在问题，进行查漏补缺，总之课程很棒!
          </p>
        </section>
        <section class="employ-show-list">
          <p class="employ-show-name">
            <img src="@/assets/imgs/vip/avatar_3_01.png" alt="">
            写代码的小猴子
          </p>
          <p class="employ-show-content">
            老师讲得很好，真的很棒！
          </p>
        </section>
        <section class="employ-show-list">
          <p class="employ-show-name">
            <img src="@/assets/imgs/vip/avatar_betacat_01.png" alt="">
            起早写代码
          </p>
          <p class="employ-show-content">
            简直不能更好，讲师讲解的非常言简意赅，条理清晰
          </p>
        </section>
        <section class="employ-show-list">
          <p class="employ-show-name">
            <img src="@/assets/imgs/vip/avatar_betacat_05.png" alt="">
            好好学习
          </p>
          <p class="employ-show-content">
            老师讲的非常好，通俗易懂，内容详细，重点突出。
          </p>
        </section>
        <section class="employ-show-list">
          <p class="employ-show-name">
            <img src="@/assets/imgs/vip/avatar_4_09.png" alt="">
            搬砖的
          </p>
          <p class="employ-show-content">
            讲的确实好，深入浅出，很有收获
          </p>
        </section>
        <section class="employ-show-list">
          <p class="employ-show-name">
            <img src="@/assets/imgs/vip/avatar_betacat_21.png" alt="">
            某某某
          </p>
          <p class="employ-show-content">
            说的非常好啊，简单易懂！第一次学习到100% 哈哈


          </p>
        </section>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    components: {
     
    },
    methods: {
      goDetails(_path) {
        this.$router.push({ path: _path});
      },
      goTx() {
        window.open('http://qmtech.ke.qq.com')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/base.scss';
  #employ{
    margin: 0;

    #employ-banner{
      width: 100%;
      height: 450px;
      #employ-banner-wrapper{
        display: flex;
        width: 87.847731%;
        max-width: 1200px;
        margin: 0 auto;
      }
      .employ-banner-list{
        width: 50%;
        padding: 50px 0;
        text-align: center; 
        position: relative;
        &:first-child::after{
          content: '';
          display: inline-block;
          width: 2px;
          height: 320px;
          background: #fff;
          position: absolute;
          top: 85px;
          right: 0;
        }
      }
      .employ-banner-title{
        line-height: 1.0;
        font-size: 28px;
        color: #fff;
      }
      .employ-banner-intro{
        font-size: 18px;
        color: #fff;

        &.underline{
          margin: 55px auto 40px;
        }
        &.online{
          margin: 38px auto 25px;
        }
      }
      .employ-banner-fit{
        font-size: 20px;
        color: #fff;
      }
      .employ-banner-btn{
        display: inline-block;
        width: 160px;
        height: 50px;
        margin-top: 39px;
        font-size: 18px;
        line-height: 50px;
        text-align: center;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;

        &.pink{
          background: #fb5c5e;
        }
        &.green{
          background: #57ceb1;
        }
      }
    }
    #employ-course{
      display: flex;
      width: 87.847731%;
      max-width: 1200px;
      margin: 20px auto 0;
      .employ-course-list{
        width: 49%;
        height: 360px;
        padding: 30px 0;
        border-radius: 10px;
        box-shadow:0px 3px 7px 0px rgba(8,1,3,0.1);
        background: #fff;
        position: relative;
        overflow: hidden;
        background:rgba(34,34,34,1);
        color:rgba(255,255,255,1);
        &:first-child{
          margin-right: 1%;
        }
        &:last-child{
          margin-left: 1%;
        }
        .employ-course-icon{
          width: 100px;
          position: absolute;
          top: 30px;
          right: 30px;
        }
        .employ-course-title{
          padding: 0 30px;
          font-size: 24px;
          font-weight: bold;
          line-height: 1.0;
          color:rgba(255,255,255,1)
        }
        .employ-course-intro{
          width: 67%;
          margin: 20px 0 0 30px;
          font-size: 16px;
          line-height: 1.8;
        }
        .employ-course-tips{
          padding: 0 30px;
          font-size: 12px;
          color: #999;
          position: absolute;
          left: 0;
          bottom: 30px;
        }
        .employ-course-content{
          padding: 0 30px;
          margin-top: 30px;
          font-size: 14px;
        }
        .employ-course-item{
          margin-bottom: 5px;
          font-size: 14px;
          span{
            font-weight: bold;
          }
          p{
            margin-left: 80px;
          }
        }
      }
    }
    #employ-container{
      width: 100%;
      margin: 30px auto 0;
      background:linear-gradient(-36deg,rgba(24,24,24,1),rgba(34,34,34,1),rgba(24,24,24,1));
      #employ-main{
        width: 87.847731%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px 0;
        position: relative;
      }
      #employ-video{
        display: flex;
        height: 200px;
        
        #employ-video-media{
          width: 250px;
          text-align: center;
          
          img{
            width: 100%;
          }
          p{
            font-size: 14px;
            color:rgba(51,51,51,1);
          }
          
        }
        #employ-video-intro{
          margin-left: 20px;
          margin-right: 230px;
         
          h3{
            margin-top: 20px;
            font-size: 24px;
            line-height: 1.0;
            font-weight: bold;
            color:rgba(255,255,255,1);
          }
          p{
            margin-top: 25px;
            font-size: 18px;
            color:rgba(255,255,255,1);
          }
        }
        #employ-video-img{
          width: 200px;
          position: absolute;
          right: 0;
          top: -11px;
        }
      }
      #employ-qa{
        display: flex;
        margin: 20px auto 0;
        padding-bottom: 40px;
        border-bottom: 1px solid #ddd;
        color:rgba(255,255,255,1);
        .employ-qa-list{
          width: 50%;
          padding-top: 20px;
         
        }
        .employ-qa-title{
          margin-bottom: 20px;
          font-size: 24px;
          text-align: center;
          font-weight: bold;
          
        }
        .employ-qa-question{
          width: 88.52%;
          margin-bottom: 40px;
          font-size: 18px;
         
          line-height:30px;
        }
        .employ-qa-tips{
          margin-top: 40px;
        }
        .employ-qa-wrapper{
          padding-left: 40px;

          li{
            font-size: 18px;
            list-style-type: disc;
           
          }
        }
      }
      #employ-pyramid{
        padding-top: 40px;
        font-size: 24px;
        line-height: 1.0;
        text-align: center;
        font-weight: bold;
        color:#FFFFFF;
        img{
          width:100%
        }
      }
    }
    #employ-show{
      width: 87.847731%;
      max-width: 1200px;
      margin: 0 auto 20px;

      #employ-show-title{
        padding: 20px 0;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        color:rgba(255,255,255,1);
      }
      #employ-show-content{
        // column-count: 3;
        // column-width: 31.63%;
        // column-gap: 20px;
        // break-inside: avoid;
        -moz-column-count: 3;
        /* Firefox */
        -webkit-column-count: 3;
        /* Safari 和 Chrome */
        column-count: 3;
        -moz-column-width: 31.63%;
        -webkit-column-width: 31.63%;
        column-width: 31.63%;
        -moz-column-gap: 20px;
        -webkit-column-gap: 20px;
        column-gap: 20px;
      }
      .employ-show-list{
        // float: left;
        // display: inline-block;
        // width: 31.63%;
        // margin-right: 20px;
        margin-bottom: 20px;
        border-radius: 20px;
        background: #222222;
        -moz-page-break-inside: avoid;
        -webkit-column-break-inside: avoid;
        break-inside: avoid;

        .employ-show-name{
          padding: 20px;
          font-size: 20px;
          color: #FB8552;

          img{
            width: 48px;
            margin-left: 10px;
            border: 2px solid #fb8552;
            border-radius: 50%;
            vertical-align: middle;
          }
        }
        .employ-show-content{
          padding: 0 20px 20px;
          font-size: 14px;
          color:rgba(255,255,255,1);
          background:rgba(34,34,34,1);
        }
      }
    }
  }
</style>

