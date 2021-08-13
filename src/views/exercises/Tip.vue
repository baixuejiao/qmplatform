<template>
    <div class="tip-container">
        <h3 class="tip-title">
            <span class="txt">{{$route.query.pathName}}</span> 技能测试
            <div class="back" @click="back()">
                返回题库列表页
                <img src="@/assets/imgs/exercises/back.png" />
            </div>
        </h3>
        <div class="tip-wrap clearfix">
            <div class="tip-left">
                <div class="tip-notice">我们将根据考试成绩评为新手、精通、专家三个等级；希望大家认真对待，好好发挥。</div>
                <div class="tip-know">在做题之前你需要了解:</div>
                <ul class="tip-content">
                    <li class="tip-list">
                        <img src="@/assets/imgs/exercises/time.svg" />
                        <div class="tip-list-title">时间限制</div>
                        <div class="tip-list-desc">选择题有45秒的作答时间</div>
                    </li>
                    <li class="tip-list">
                        <img src="@/assets/imgs/exercises/free.svg" />
                        <div class="tip-list-title">次数限制</div>
                        <div class="tip-list-desc">每人只有一次测试机会</div>
                    </li>
                </ul>
            </div>
            <div class="tip-right">
                <!-- {{JSON.parse($route.query.item).pathIntro}} -->
            </div>
        </div>
        
        <button class="got-it" @click="doExam()">我知道了，继续做题</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
            }
        },
        methods:{
            doExam(){
                this.$router.push({
                    path:"/skill-assessment",
                    query:{
                        pathId:this.$route.query.pathId,
                        status:this.$route.query.status,
                        isParts:1
                    }
                })
            },
            back(){
                this.$router.push('/exercisesPath')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tip-container{
        width:860px;
        margin:0 auto;
        .tip-title{
            font-weight: 300;
            color:#fff;
            margin:50px 0 30px 0;
            font-size: 36px;
            .txt{
                font-weight: 700;
            }
            .back{
                float:right;
                color: #f96816;
                font-size:14px;
                cursor:pointer;
                &:hover{
                    text-decoration:underline;
                }
                img{
                    width:18px;
                }
            }
        }
        .tip-wrap{
            .tip-left{
                width:70%;
                float:left;
                .tip-notice{
                    font-size: 24px;
                    font-weight: 300;
                    line-height: 1.4;
                    margin-bottom: 24px;
                    color:#fff;
                }
                .tip-know{
                    font-size:13px;
                    font-weight: 400;
                    line-height: 1.4;
                    text-transform: uppercase;
                    margin-bottom: 4px;
                    color:#fff;
                }
                .tip-content{
                    .tip-list{
                        width: calc(50% - 44px);
                        margin-right: 44px;
                        padding-left: 0;
                        float:left;
                        color:#fff;
        
                        img{
                            display: block;
                            margin-top: 20px;
                            margin-bottom: 12px;
                            width: 20px;
                        }
                        .tip-list-title{
                            vertical-align: baseline;
                            font-size: 14px;
                            font-weight: 700;
                            line-height: 1.14;
                            margin-bottom:3px;
                        }
                        .tip-list-desc{
                            font-weight: 300;
                            font-size: 14px;
                            line-height: 1.9;
                        }

                    }
                }
            }
            .tip-right{
                color:#fff;
                float:right;
                width:35%;
                line-height: 1.8;
                color: #aaa;
                font-size:14px;
            }
        }
        
        .got-it{
            font-size: 18px;
            max-width: 440px;
            margin: 10px 0;
            cursor: pointer;
            display: block;
            background-color: #f96816;
            border-radius: 2px;
            color: #ffffff;
            font-size: 14px;
            font-weight: 500;
            line-height: 2.78;
            text-align: center;
            text-decoration: none;
            padding:6px 0;
            width: 100%;
            margin-top:48px;
            &:hover{
                color: #f2f2f2;
                background-color: #ff7b39;
                text-decoration: none;
            }
        }

    }

</style>