<template>
    <div class="no-exam">
        {{title}}
        <img src="@/assets/imgs/exercises/no.png" alt="" v-if="type==0">
        <img src="@/assets/imgs/exercises/ok.png" alt="" v-if="type==1">
    </div>
</template>

<script>
    export default {
        props:['title','type']
    }
</script>

<style lang="scss" scoped>
    .no-exam{
        margin-top:60px;
        color:#fff;
        text-align: center;
        height: 150px;
        line-height: 150px;
        img{
            width: 200px;
            margin-left:20px;
        }
    }
</style>