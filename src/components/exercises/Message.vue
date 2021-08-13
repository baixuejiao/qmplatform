<template>
    <div class="message-box">
        <div :class="['message',type]" ref="message" v-if="isShow">
            <div class="message-title">{{message.title}}</div>
            <div :class="{'message-content':true,'active':message.content}">
                {{message.content?"答案解析："+message.content:""}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                isShow:false,
                type:'success',
                message:{}
            }
        },
        methods:{
            // type  success成功  error失败
            show({message,type}){
                this.isShow = true;
                this.type=type;
                this.message = message;
            },
            hide(){
                this.isShow = false;
            }
        }
        
    }
</script>

<style lang="scss" scoped>
    .message{
        border-radius: 3px;
        max-height: 404px;
        // overflow:scroll;
        background: #f00;
        position: fixed;
        font-size: 15px;
        padding:15px 10px;
        box-sizing: border-box;
        animation: run 1s ease;
        margin-top:40px;
        @keyframes run {
            from{
                transform: translateX(100%);
            }
        }
        &.success{
            background-color: #f0f9eb;
            border-color: #e1f3d8;
            color:#67c23a;
        }
        &.error{
            color:#f56c6c;
            background-color: #fef0f0;
            border-color: #fde2e2;
        }
        .message-content{
            &.active{
                margin-top:5px;
            }
        }
    }
</style>