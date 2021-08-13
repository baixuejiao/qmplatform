
<template>
  <div id="skill-result">
    <div class="score-map" ref="map" style="width: 100%;height:300px;" v-if="skill_list.length>0"></div>
 
    <div class="score-chart" ref="chart" style="width: 100%;height:500px;"></div>
    <ul class="classify-content" v-if="classifySkill.length>0">
      <li class="classify-header">
        近十次专项技能测试详情
      </li>
      <li class="classify-title">
        <span>测试分类</span>
        <span>测试日期</span>
        <span>测试分数</span>
        <span>成绩评定</span>
        <span>答题详情回顾</span>
      </li>
      <li class="classify-list" v-for="item in classifySkill" :key="item.id">
        <span>{{item.cateName}}</span>
        <span>{{formatTime(item.createTime)}}</span>
        <span>{{item.score}}</span>
        <span>{{formatScore(item.score)}}</span>
        <span class="classify-list-details" @click="checkDetails(item.id)">查看详情</span>
      </li>
    </ul>

  </div>
</template>

<script>
import {formatTime, formatScore} from '@/assets/js/common.js'
import echarts from 'echarts';


export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      tokenId: localStorage.getItem('tokenId'),
      date: [],
      score: [],
      classifySkill: []
    }
  },
  props: ['skill_list', ],
  computed: {
    indicator() {
      return this.skill_list.map(item => {
        return {
          name: item.pathName,
          max: 300
        }
      })
    },
    skillScore() {
      return this.skill_list.map(item => {
        return item.score
      })
    }
  },
  components: {
  },
  methods: {
    formatTime,
    formatScore,
    createMap() {
      let myMap = echarts.init(this.$refs.map);
      let option = {
        title : {
          text: '路径技能测试成绩图谱',
          textStyle: {
            marginBottom: '20px',
            color: '#fff', //标题颜色
            fontSize: 16,
            lineHeight: 20,
            left: 'center',
          },
        },
        tooltip : {
          trigger: 'axis'
        },
        // calculable : true,
        polar : [
          {
            name: { show: true,textStyle:{fontSize:16,color:"#32cd32"}},
            indicator : this.indicator,
            center : ['50%','50%'],
            radius : 100 //半径，可放大放小雷达图
          }
        ],
        series : [
          {
            name:'路径测试分数',
            type: 'radar',//图表类型 radar为雷达图
            tooltip: {
							trigger: 'item'
						},
            itemStyle: {
              normal: {
                lineStyle: {
                  color :"#87cefa",
                  width : 2
                },
                areaStyle: {
                  color:"#87cefa",
                  type: 'default'
                }
              }
            },
            symbolSize :6,
            data : [{
              value: this.skillScore
            }]
          }
        ]
      };
      myMap.setOption(option);
    },
    createChat() {
      console.log(this.$refs.chart)

      let option = {
        color: '#e80a89',
        title : {
          text: '近十次专项技能测试图谱',
          textStyle: {
            marginBottom: '20px',
            color: '#fff', //标题颜色
            fontSize: 16,
            lineHeight: 20,
            left: 'center',
          },
        },
        tooltip: {//提示框信息
          trigger : 'axis',
          position : 'top',
          axisPointer : {
            type : 'cross',
            label : {
              backgroundColor : '#6a7985'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: this.date,
          axisLabel : {
            show : true,
            fontSize : 12,
            color : 'white'
          },
          boundaryGap : true,
          // axisLine : {
          //   show : true,
          //   //x轴线样式
          //   lineStyle : {
          //     color : '#17273B',
          //     width : 1,
          //     type : 'solid'
          //   }
          // },
        },
        yAxis: {
          type: 'value',
          min: 0,//坐标起始值
          max: 100 , //坐标最大值
          axisLabel : {
            show : true,
            color : 'white',
            fontSize : 12
          },
        },
        series: [{
          data: this.score,
          type: 'line',
          label: {//线条上的数字提示信息
            normal: {
              show: true,
              position: 'top'
            }
          },
          smooth : true,
          symbol : 'circle',
          symbolSize : 6,
        }]
       }

      let chart = echarts.init(this.$refs.chart);
      chart.setOption(option);
    },
    getSuit() {
      this.$post(BASE_API+'suit/getSuit',
      {
        tokenId: this.tokenId
      }, {
        headers: {
          token: this.token,
        }
      })
      .then( res => {
        // handle success
        if( res.errno * 1 === 101) {
          // 处理成功
          let list = res.data.reverse()
          this.classifySkill = list.length>0 ? list.slice(0,10) : list;
          this.date = this.classifySkill.map( item => {
            let date = new Date(item.createTime)
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
          })
          this.score = this.classifySkill.map( item => {
            return item.score
          })
          this.createChat();

        } else {
          this.$store.commit("showDialog", res.errsmg)
          // 处理其他错误码的情况
        }
      })
      .catch( err => {
        console.log(err);
        // handle error
        this.$store.commit("showDialog")
      })
    },
    // 查看套题详情
    checkDetails(id) {
      this.$router.push({
        path: '/assement-review',
        query: {
          suitId: id  
        }
      })
    }
  },
  mounted () {
    this.createMap();
    this.getSuit();
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/base.scss';
  #skill-result{
    .classify-content{
     margin-top: 40px;
    }
    .classify-header{
      font-size: 16px;
      text-align: center;
      color: #fff;
    }
    .classify-title{
      display: flex;
      justify-content: space-around;
      padding: 10px 0;
      font-size: 12px;
      border-bottom: 1px solid #aaa;
      color: #aaa;

      span{
        display: inline-block;
        width: 20%;
      }
    }
    .classify-list{
      display: flex;
      justify-content: space-around;
      padding: 10px 0;
      font-size: 14px;
      border-bottom: 1px solid #aaa;
      color: #efefef;

      span{
        display: inline-block;
        width: 20%;
      }
      .classify-list-details{
        color: #f96816;
        cursor: pointer;

        &:hover{
          color: #ff7b2b;
        }
      }
    }
  }
  
</style>