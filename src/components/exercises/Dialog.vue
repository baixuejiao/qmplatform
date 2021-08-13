<template>
    <div class="dialog-box" v-show="isShow">
        <div class="dialog" >
            <div class="dialog-content">
                <img class="dialog-img" v-if="showImg" src="@/assets/imgs/exercises/pass.png" alt="">
                <img class="dialog-img" v-if="!showImg" src="@/assets/imgs/exercises/unpass.png" alt="">
                {{message.content}}
            </div>
            <div><button @click="bachHome()">{{message.back}}</button></div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                isShow:false,
                message:{
                    content:'',
                    back:'/'
                },
                showImg:true,
            }
        },
        methods:{
            // type  success成功  error失败
            show(msg){
                this.isShow = true;
                this.message = msg;
                this.showImg = this.message.type == "success"?true:false;
            },
            hide(){
                this.isShow = false;
            },
            bachHome(){
                this.$router.push({
                    path:'/activity'
                })
            }
        }
        ,created(){
            // this.show({content:'闯关成功',back:'继续闯关',type:'success'});
        }
    }
</script>

<style lang="scss" scoped>
    .dialog-box{
        // width:80%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
        z-index:999;
        .dialog{
            background: #222;
            width: 280px;
            height: 180px;
            border-radius: 5px;
            position: absolute;
            left:50%;
            top:50%;
            transform: translate(-50%,-50%);
            color:#fff;
            text-align: center;
            .dialog-content{
                margin:50px 0;
            }
            button{
                display: block;
                width: 100px;
                height: 30px;
                margin: 0 auto;
                font-size: 15px;
                line-height: 30px;
                text-align: center;
                border-radius: 5px;
                color: #fff;
                background: #e80a89;
            }
            .dialog-img{
                width: 30px;
            }
        }
    }
</style>