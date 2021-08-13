<template>
  <div v-show="skillListArr.length">
    <div class="carouselHeader">
      <div>
        <h2 class="headerTitle">
          选择你感兴趣的领域进行技能测试
          <span class="screenReaderText"></span>
        </h2>
        <span>
          <a class="headerLink" @click="goSkillList">浏览全部 ></a>
        </span>
      </div>
    </div>
    <section class="carousel">
      <!-- 引入的是bootstrap中的Carousel组件 -->
      <div class="designSystemCarousel">
        <div
          id="carouselExampleControls_iq"
          class="carousel slide"
          data-ride="carousel"
          data-interval="false"
        >
          <ul class="carousel-inner">
            <li
              :class="['carousel-item',{'active':index==0}]"
              v-for="(items,index) in skillListArr"
              :key="index"
            >
              <ul class="carousel-ul">
                <li class="contentTitleCard" v-for="(item,index) in items" :key="index">
                  <div class="tile">
                    <div class="imageContainer">
                      <img v-if="item.image" :src="imgUrl+item.image" alt @click="goskill(item)" />
                    </div>
                    <div class="titleWrapper">
                      <h3 class="title" v-if="item.title" @click="goskill(item)">{{item.title}}</h3>
                    </div>
                    <div class="skill_footer" v-if="item.status">
                      <a href>
                        <button class="status_button">{{item.status}}</button>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls_iq"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls_iq"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "CarouselSkillIQ",
  props: ["skillListArr"],
  data() {
    return {
      imgUrl: window.CDN_URL
    };
  },
  methods: {
    goSkillList() {
      let url = `${SKILL_URL}?tokenId=${localStorage.getItem('tokenId')}`
      window.open(url)
    },
    goskill(data) {
      console.log(data)
      let url = `${SKILL_URL}skill-assessment?isParts=1&partsid=${data.pathId}&tokenId=${localStorage.getItem('tokenId')}`
      window.open(url)
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/home.scss';
.carousel-ul li {
  margin-right: 20px;
}
.carousel-ul li:last-child {
  margin-right: 0;
}
.tile {
  padding: 20px;
  text-align: center;
  height: 220px;
  width: 100%;
  background-color: #222;
  color: #efefef;
  position: relative;
}
.imageContainer {
  margin: 15px 0;
}
.imageContainer img {
  width: 130px;
  vertical-align: middle;
}
.titleWrapper {
  position: relative;
  height: 50px;
}
.title {
  font-size: 18px;
  font-weight: 300;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: white;
  position: absolute;
  left: 0;
  right: 0;
  line-height: 1.33333;
  margin-top: 5px;
}
.skill_footer .status_button {
  font-size: 14px;
  color: #f96816;
  height: 30px;
  white-space: nowrap;
  line-height: 30px;
  padding: 0 20px;
  border: 0.5px solid #f96816;
}
</style>