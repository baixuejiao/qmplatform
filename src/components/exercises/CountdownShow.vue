<!--倒计时组件-->
<template>
	<div class="progress-circle" :class="{delay:delay}">
		<svg width="130" height="130" viewbox="0 0 440 440">
			<circle cx="65" cy="65" r="50" stroke-width="6" stroke="#D1D3D7" fill="none"></circle>
			<circle cx="65" cy="65" r="50" stroke-width="6" id="dark-circle" stroke="#9a171b" fill="none" :stroke-dasharray="perimeter * percent + ' ' + perimeter * (1- percent)"></circle>
		</svg>
		<div class="time-count">
			{{startTime}}
		</div>
	</div>
</template>
 
<script>
	export default {
		data(){
			return {
				timer:null,
				percent:1,
				perimeter:314,
				delay:false,
				startTime:45
			}
		},
		methods:{
			/*
				开启定时器 
				params  倒计时秒数
			*/
			openTimeCount(num){
				this.delay = false;//背景色恢复
				this.startTime = 45;
				let R = 50;
				this.percent = 1;
				this.perimeter = 314;
				if (this.timer) { 
					clearInterval(this.timer);
				} 
				this.timer = setInterval(()=>{
					this.startTime--;
					this.percent = this.startTime / num;
					this.perimeter = Math.PI * 2 * R;
					// 倒计时 时间到
					if (this.startTime <= 0) {
						this.closeTimeCount();
					} 
				},1000)
			},
			closeTimeCount(){
				clearInterval(this.timer);
				this.timer = null;
				// 延迟 并且 显示0
				this.delay = true;
				this.startTime = 0;
				this.$emit('checkAnswer','',1);
			},
			stopTimeCount(){
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		created(){
			this.openTimeCount(45);
		}
	}
</script>
 
<style lang="scss" scoped >
	.progress-circle{
		width:130px;
		height:130px;
		background: transparent;
		position: relative;
		circle {
			-webkit-transition: stroke-dasharray .25s;
			transition: stroke-dasharray .25s;
		}
		#dark-circle{
			transform: rotate(-90deg);
			transform-origin: 65px 65px;
		}
		&.delay{
			background:rgb(154, 23, 27);
		}
		.time-count{
			position: absolute;
			left: 19px;
			top: 19px;
			width: 92px;
			height: 92px;
			line-height: 92px;
			text-align: center;
			border-radius: 50%;
			font-size: 45px;
			color: #fff;
			// background: #eee;
		}
	}
	
</style>
 