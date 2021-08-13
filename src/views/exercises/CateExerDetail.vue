<!--分类套题详情页-->
<template>
    <div class="suit-container max-wrapper">
		<div class="suit-wrap clearfix">
			<div class="score-info">
				<div class="score-count">
					<img src="@/assets/imgs/exercises/score.png" alt="">
					<span>得分：{{score}}</span>
				</div>
				<div class="exercises-name">试卷： 计算机-{{$route.query.cateName}}专项练习</div>
				<div class="right-num">正确题数： {{rightNum}}/{{total}}</div>
				<div>得分： {{score}}</div>
				<div class="score-btns">
					<!-- <button>查看答案解析</button> -->
					<button @click="$router.push({path:'/skill-assessment/',query:{cateId:$route.query.cateId,cateName:$route.query.cateName}})">再练一套</button>
				</div>
			</div>
			<div class="score-chart" ref="chart" style="width: 60%;height:300px;">
			</div>
		</div>
		<div class="recommend-box">
			<div class="recommend-title">
				<!-- <img src="@/assets/imgs/exercises/tip.png" alt=""> -->
				<span>推荐课程：</span>
			</div>
			<CateExerRecommend :courseList="courseList" v-if="recommend"></CateExerRecommend>
		</div>
        
    </div>
</template>

<script>
import echarts from 'echarts';
import CateExerRecommend from './CateExerRecommend.vue';

export default {
	data() {
		return {
			tokenId: localStorage.getItem('tokenId'),
			token: localStorage.getItem('token'),
			score:0,
			indicator:[],
			showScore:{},
			total:0,
			rightNum:0,
			courseList:[],
			recommend:false //是否推荐
		};
	},
	components:{
		CateExerRecommend
	},
	created() {
		this.getSuitDataAnalysis();
	},
	mounted(){
	},
	methods:{
		getEcharts(){
			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(this.$refs.chart);
			let option = {
				title: {
					text: ' '
				},
				tooltip: {
					trigger: 'axis'
				},
				radar: [
					{
						indicator:this.indicator,
						center: ['25%','40%'],
						radius: 80
					},
				],
				series: [
					{
						type: 'radar',
						tooltip: {
							trigger: 'item'
						},
						itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: [
							this.showScore
						]
					},
					
				
				]
			};
			// 绘制图表
			myChart.setOption(option);
		},
		getSuitDataAnalysis(){
			this.$post(
				BASE_API + 'suit/getSuitDataAnalysis',
				{
					categoryId:this.$route.query.cateId,
					suitId:this.$route.query.suitId,
                    tokenId: this.tokenId,
				}, 
				{
					headers: {
						token: this.token,
					}
				}
				).then(res => {
					if (res.errno * 1 === 101) {
						// 处理成功
						this.score = res.data.suitAnalyses.score;
						let val = [];
						
						res.data.suitAnalyses.suitPathList.forEach((obj)=>{
							this.indicator.push({text: obj.pathName, max: obj.answerCount});
							this.total += obj.answerCount;
							this.rightNum += obj.answerYes;
							val.push(obj.answerYes);
						});
						this.showScore = {
							value: val,
							name: "计算机-"+this.$route.query.cateName+"专项练习"
						}
						this.getEcharts();
						this.courseList = res.data.suitAnalyses.course.filter((course,index)=>{
							return index < 4;
						});
						this.recommend = true;
					} else {
						this.$store.commit("showDialog", res.errsmg);
						// 处理其他错误码的情况
					}
				})
				.catch(err => {
					this.$store.commit("showDialog");
				});
		}
	}
};
</script>>

<style lang="scss" scoped>
.suit-container{
    padding: 30px 90px 0 90px;
	color:#fff;
	.suit-wrap{
		height:280px;
		overflow: hidden;
		// border-bottom: 1px solid #363636;
		.score-info{
			width:40%;
			float: left;
			color:#aaa;
			line-height: 52px;
			.score-count{
				img{
					width:25px;
					margin-right: 10px;
				}
				span{
					color:#fff;
					vertical-align: middle;
				}
			}
			.score-btns{
				margin-top:10px;
				button{
					display: inline-block;
					text-align: center;
					padding: 10px 0;
					width: 110px;
					color: #fff;
					font-size: 14px;
					border-radius: 3px;
					border: none 0;
					cursor: pointer;
					line-height: normal;
					outline: 0;
					white-space: nowrap;
					background:#e80a89;
					margin-right: 20px;
				}
			}
		}
		.score-chart{
			height:250px;
			width:60%;
			float: right;
			margin-top:20px;
		}
	}
    
	.recommend-box{
		margin:30px 0;
		.recommend-title{
			color: #efefef;
			font-size: 18px;
			font-weight: 500;
			line-height: 1;
			margin-bottom: 20px;
			img{
				width: 25px;
				margin-right: 10px;
				vertical-align: middle;
			}
			span{
				vertical-align: middle;
			}
		}
	}
}
</style>