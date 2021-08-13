<template>
    <div class="program-box max-wrapper">
        <h3 class="program-title">编程列表</h3>
        <ul class="program-content">
            <li class="program-list" v-for="(obj,index) in programList" :key="index"
                @click="goProgram(index)"
            >
                <span v-html="'第'+(index+1)+'题：&nbsp'+obj.title" class="list"></span>
                <span class="list-btn">查看详情</span>
            </li>
        </ul>
         <coder-index  
            :isShow="isShow" 
            :propsExercise = "program"
            @subHandel="subHandel"
            ></coder-index>
    </div>
</template>

<script>
    import CoderIndex from '@/views/coder/CoderIndex.vue';
    export default {
           data(){
            return {
                program:{},
                isShow:false,
                nowIndex:0,
            }
        },
        props:['programList'],
        components:{
            CoderIndex
        },
        methods:{
            goProgram(index){
                let nowProgram = this.programList[index];
                this.program = {
                    id:nowProgram['id'],
                    title:nowProgram['title'],
                    content:nowProgram['content'],
                    userAnswer:true,
                    js:nowProgram['jsAnswer'],
                    html:nowProgram['htmlAnswer'],
                    css:nowProgram['cssAnswer'],
                    notation:nowProgram['notation']
                }
                this.isShow = true;
            },
            subHandel(res){
                this.isShow = false;
                // if(res.cssAnswer == undefined && res.htmlAnswer == undefined && res.jsAnswer== undefined ){ // 未答题
                //     this.isShow = false
                // }else{//答题 调用答题接口
                //     this.$emit('insertAnswer',{...res,status:-1,tag:-1});
                //     this.isShow = false;
                //     this.programList[this.nowIndex].active = true;
                //     // 跳转
                // }
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
            padding:10px 0;
            font-size: 16px;
            line-height: 30px;
            font-weight: normal;
            color:#fff;
            .program-list{
                margin-top: 10px;
                padding: 20px 20px ;
                display: flex;
                background: #222;

                cursor: pointer;
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
                }
            }
        }
    }
</style>