<template>
    <div class="recommend-container clearfix max-wrapper">
        <div class="clearfix" v-if="courseList.length>0">
            <ul class="recommend-box ">
                <li class="list" v-for="(course,index) in courseList" :key="index">
                    <div class="img-box">
                        <img class="imgs" :src="imgUrl+course.image" alt="">
                    </div>
                    <div class="title">{{course.title}}</div>
                    <div class="info"><span>{{course.teacher.nickName}}</span><span>·</span><span>{{setLevel(course.level)}}</span></div>
                </li>
                <!-- <li class="list">
                    <img class="imgs" src="http://pic.qingmengtech.com:8080/qingmeng/20190925113237405.jpg" alt="">
                    <div class="title">web前端开发系列之html/css/页面制作/小米官网项目实践</div>
                    <div class="info"><span>董老师</span><span>·</span><span>level</span></div>
                </li> -->
            </ul>
            <div class="more-btn" @click="goCourseList()">
                <img src="@/assets/imgs/exercises/more.png" alt="">
                <p>查看更多</p>
            </div>
        </div>
        <div class="no-course" v-if="courseList.length == 0">暂无推荐课程</div>
    </div>
</template>

<script>
    import {setLevel} from '@/assets/js/common.js';

    export default {
        data(){
            return {
                imgUrl: window.CDN_URL,
            }
        },
        props:['courseList'],
        methods:{
            goCourseList(){
                this.$router.push({
                    path: '/search',
                    query: {
                        keyword: 'all'
                    }
                });
            },
            setLevel
        }
    }
</script>

<style lang="scss" scoped>
    .recommend-box{
        float: left;
        .list{
            width: 210px;
            float: left;
            margin-right:20px;
            margin-bottom:20px;
            .img-box{
                width:100%;
                height:115px;
                overflow: hidden;
                .imgs{
                    width:100%;
                // height: 126px;
                }
            }
            .title{
                font-size: 12px;
                line-height: 20px;
                height: 20px;
                margin-top: 8px;
                font-weight: 500;
                color: white;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .info{
                span{
                    font-weight: 400;
                    line-height: 20px;
                    font-size: 12px;
                    color: #aaaaaa;
                    margin-right: 5px;
                }
            }

        }
    }
    .more-btn{
        float: left;
        width:62px;
        text-align: center;
        cursor: pointer;
        img{
            width: 35px;
            margin:62px 0 10px 0;
        }
        p{
            color:#aaa;
            font-size: 12px;
        }
    }
    .no-course{
        font-size:12px;
        border-top:1px solid #363636;
        padding:20px 0;
    }

</style>