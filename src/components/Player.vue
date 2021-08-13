<!--
    播放器组件
    props:
    |------------------|
    | width   播放器宽度 |
    | height  播放器高度 |
    | src     播放器地址 |   
    |------------------|
-->
<template>
    <div class="aspect-ratio" :style="{width:width+'px',height:height+'px'}">
        <iframe :src="src" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
    </div>
</template>
<script>
export default {
    props:["src","width","height"]
}
</script>
<style scoped>
.aspect-ratio {
  position: relative;
}

.aspect-ratio iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>