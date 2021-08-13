<template>
    <div class="program-box">
        <h3 class="program-title">编程列表</h3>
        <ul class="program-content">
            <li class="program-list" v-for="(obj,index) in programList" :key="index"
                @click="goProgram(index)"
            >
                <span v-html="'第'+(index+1)+'题：&nbsp'+obj.title" class="list"></span>
                <span :class="{'list-btn':true,'answered':obj.active}">去做题</span>
            </li>
        </ul>
        <button class="comp" @click="complete()">交卷</button>

        <code-index  
            :isShow="isShow" 
            :propsExercise = "program"
            @subHandel="subHandel"
            ></code-index>
    </div>
</template>

<script>
    import CodeIndex from '@/views/coder/CoderIndex.vue';
    export default {
        data(){
            return {
                program:{},
                isShow:false,
                nowIndex:0,
            }
        },
        props:['programList','suitId'],
        components:{
            CodeIndex
        },
        methods:{
            goProgram(index){
                if(this.programList[index].active){
                    return;
                }
                let nowProgram = this.programList[index];
                this.program = {
                    id:nowProgram['id'],
                    title:nowProgram['title'],
                    content:nowProgram['content'],
                    userAnswer:!!nowProgram['userAnswer'],
                    js:nowProgram['jsAnswer'],
                    html:nowProgram['htmlAnswer'],
                    css:nowProgram['cssAnswer'],
                    notation:nowProgram['notation']
                }
                this.isShow = true;
                this.$emit('getProgram',index);
                this.nowIndex = index;
            },
            subHandel(res){
                if(res.cssAnswer == undefined && res.htmlAnswer == undefined && res.jsAnswer== undefined ){ // 未答题
                    this.isShow = false
                }else{//答题 调用答题接口
                    this.$emit('insertAnswer',{...res,status:-1,tag:this.isFinish()},()=>{
                        // 隐藏答题组件
                        this.isShow = false;
                        // 当前题答完
                        this.programList[this.nowIndex].active = true;
                    });
                    // 跳转
                }
            },
            isFinish(){
                this.programList[this.nowIndex].complete = 1;
                let tag = 0;
                this.programList.forEach((obj)=>{
                    if(!obj.complete){
                        tag = -1;
                    }
                });
                if(tag == 0){
                    tag = 2;
                }
                return tag;
            },
            complete(){
                this.$emit('complete')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .program-box{
        .program-title{
            color:#fff;
            margin: 20px 0;
            font-size: 24px;
            font-weight: 400;
        }
        .program-content{
            margin-top: 10px;
            font-size: 16px;
            line-height: 30px;
            font-weight: normal;
            color:#fff;
            .program-list{
                background: #222;
                display: flex;
                cursor: pointer;
                padding:20px;
                margin-top:10px;
                .list{
                    flex:1;
                }
                .list-btn{
                    // width:80px;
                    line-height: 30px;
                    height: 30px;
                    padding: 0 15px;
                    font-size: 14px;
                    border: 1px solid #f96816;
                    border-radius: 5px;
                    color: #f96816;
                    &.answered{
                         border: 1px solid #eee;
                         color: #eee;
                    }
                }
            }
        }
        .comp{
            height: 30px;
            padding: 0 23px;
            font-size: 14px;
            line-height: 30px;
            border-radius: 5px;
            color: #fff;
            margin-top: 30px;
            margin-right: 20px;
            float: right;
            cursor:pointer;
            background: #e80a89;
            outline:none;
        }
    }
</style>