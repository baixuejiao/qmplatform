<template>
    <div>
        <coder-index :isShow="true" 
            propsExercise = "{
              id:1,
              title:'1222',
              content:'习题介绍',
              userAnswer:'是否为已经答过的题 布尔值',
              js:'',
              html:'',
              css:'',
              notation:'老师评语 没有可以不填写'
            }"
        ></coder-index>
    </div>
</template>

<script>
    import CoderIndex from '@/views/coder/CoderIndex.vue'
    export default {
        components:{
            CoderIndex
        }

    }
</script>

<style lang="scss" scoped>

</style>