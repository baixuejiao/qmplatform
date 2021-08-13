<!-- 分类题库列页面 -->
<template>
  <div class="exer-home">
    <div class="container-full">
      <!-- <video width="80%"  controls>
          <source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/mp4">
          <source src="movie.ogg" type="video/ogg">
          您的浏览器不支持Video标签。
      </video> -->
      <div class="row title-container">
        <div>
          <h1 class="exer-title">题库列表</h1>
        </div>
      </div>
      <!-- 套题列表 -->
      <div class="row suit-exercises">
          <ul>
              <li class="suit-list" v-for="(obj,index) in category" :key="index" 
              @click="goLogin(`/skill-assessment?cateId=${obj.cateId}&cateName=${obj.cateName}`)">
                  <svg viewBox="0 0 512 512" width="26px" height="26px" aria-label="Skill IQ" class="_3AaTpHcO"><title>Skill IQ</title><defs><linearGradient x1="23.812%" y1="22.445%" x2="100%" y2="100%" id="icon-datacamp-linearGradient-10"><stop stop-color="#F05A28" offset="0%"></stop><stop stop-color="#E80A89" offset="100%"></stop></linearGradient></defs><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill-rule="nonzero"><path d="M512,256 L512,512 L256,512 C114.615104,512 0,397.384896 0,256 C0,114.615104 114.615104,0 256,0 C397.384896,0 512,114.615104 512,256 Z" fill="url(#icon-datacamp-linearGradient-10)"></path><circle fill="#222222" cx="260.736" cy="260.736" r="132.736"></circle></g></g></svg>
                  <span>{{obj.cateName}}专项练习</span>
                  <button class="suit-test-btn">测试</button>
              </li>
          </ul>
      </div>
      <div class="row son-title-container">
        <div class="col-md-9 son-title">
          <button
            type="button"
            v-for="(obj,index) in allCategory"
            :key="index"
            :class="{'active':obj.active}"
            @click="changeCategory(obj)"
          >{{obj.cateName}}</button>
        </div>
        <div class="col-md-3 son-title">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Search for..."
              v-model="searVal"
              @keydown.enter="search()"
            />
            <span class="input-group-btn">
              <button class="btn btn-default search-btn" type="button" @click="search()">搜索</button>
            </span>
          </div>
        </div>
      </div>
      <div class="row course-container clearfix">
        <div class="course" v-for="(item,index) in pathList" :key="index">
          <div class="course-wrap">
            <img class="img" :src="CDN_URL+item.pathImg" alt />
            <div class="descrip">{{item.pathName}}</div>
            <button
              class="mybtn"
              v-if="item.status == 0 || item.status == undefined"
              @click="startExam(item)"
            >现在测试</button>
            <button
              class="mybtn"
              v-if="item.status == 1"
              @click="goExam(item)"
            >继续测试</button>
            <button
              class="active-btn"
              v-if="item.status == 2"
              @click="goReview(item.pathId)"
            >查看测试详情</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { constants } from "crypto";
export default {
	data() {
		return {
			pathList: [],
			searVal: "",
      allCategory: [],
      category:[],
      suitList:[],
			tokenId: localStorage.getItem('tokenId'),
			token: localStorage.getItem('token'),
			CDN_URL:CDN_URL
		};
	},
	methods: {
		changeCategory(obj){
			this.allCategory.forEach((item,index)=>{
				item.active = false;
			});
			obj.active = true;
			this.getPathList(obj.cateId);
		},
		// 获取Path列表
		getPathList(categoryId){
      let url = '';
      if(this.tokenId){ //已登录
        url="path/getPathListByCategoryId";
      }else{//未登录
        url="path/getPathListByCategoryIdNoLogin"
      }
			this.$post(BASE_API + url,
			{
				categoryId,
				tokenId: this.tokenId
			}, {
				headers: {
					token: this.token,
				}
			})
			.then(res => {
				if (res.errno * 1 === 101) {
					// 处理成功
					this.pathList = res.data;
				} else {
					this.$store.commit("showDialog", res.errsmg);
					// 处理其他错误码的情况
				}
			})
			.catch(err => {
				this.$store.commit("showDialog");
			});
      	},
		//搜索
		search() {
      let searchUrl = ""; 
      if(this.tokenId){ //已登录
        searchUrl="path/getPathListByKeyWord";
      }else{//未登录
        searchUrl="path/getPathListNoLoginByKeyWord"
      }
			this.$post(BASE_API + searchUrl,
			{
				keyword:this.searVal,
				tokenId: this.tokenId
			}, {
				headers: {
					token: this.token,
				}
			})
			.then(res => {
				if (res.errno * 1 === 101) {
					// 处理成功
					this.pathList = res.data;
				} else {
					this.$store.commit("showDialog", res.errmsg);
					// 处理其他错误码的情况
				}
			})
			.catch(err => {
				this.$store.commit("showDialog");
			});
    },
    // 开始做题页
		startExam(item) {
      // 验证是否登录
      this.setHistoryPath(item.pathId);
      this.goLogin(`tip?pathId=${item.pathId}&status=${item.status}&pathName=${item.pathName}`);
		},
		// 继续做题页
		goExam(item) {
      // 验证是否登录
      this.setHistoryPath(item.pathId);
      this.goLogin(`skill-assessment?pathId=${item.pathId}&status=${item.status}&isParts=1`);
		},
		goReview(pathId) {
			this.$router.push({
				path: "assement-review",
				query: { pathId: pathId }
			});
		},
		// 获取全部分类
		getAllCategory() {
      this.$post(BASE_API + "category/getAllCategory",
			{
				// token_id: this.tokenId
			}, {
				headers: {
					token: this.token,
				}
			})
			.then(res => {
				if (res.errno * 1 === 101) {
          this.category = [...res.data];
					// 处理成功
					this.allCategory = [...res.data];
					this.allCategory.unshift({cateId: -1, cateName: "All"});
					this.allCategory.forEach((item,index)=> {
						if(index == 0){
							item.active = true;
						}else{
						  item.active = false;
            }
					});
				} else {
					this.$store.commit("showDialog", res.errsmg);
					// 处理其他错误码的情况
				}
			})
			.catch(err => {
				this.$store.commit("showDialog");
			});
    },
    // 
    goLogin(redirect_url){
      if(this.token){//已登录
          this.$router.push(redirect_url);
      }else{//未登录
        this.$router.push({
          path: '/login',
          query: {
            redirect_url
          }
        })
      }
      
    },
    /**
     * 添加路径到个人中心记录
     */
    setHistoryPath(id) {
      if (!this.tokenId) return
      this.$post(BASE_API+"path/addBrowserHistoryPath",
        {
          token_id: this.tokenId,
          pathId: id
        },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      ).then(res => {
        if (res.errno * 1 === 101) {
          console.log(res.errmsg)
        } else {
          this.$store.commit("showDialog", res.errsmg)
        }
       }).catch( err => {
        this.$store.commit("showDialog")
      })
    },
	},
	created() {
    this.getAllCategory();
    this.getPathList(-1);
	}
};
</script>

<style lang="scss" scoped>
.is-show {
  display: none;
}
.exer-home {
  background-color: #181818;
  margin-top: 25px;
  
}
.container-full {
  width: 85%;
  margin: 0 auto;
  // text-align: center
  video{
     display: block;
      margin:0 auto;
  }
}
.title-container {
  border-bottom: 1px solid #2d2d2d;
  margin-bottom: 15px;
}
.title-container .exer-title {
  color: #fff;
  padding-bottom: 10px;
  font-weight: 300;
  /* margin-bottom: 10px; */
  float: left;
  font-size: 24px;
}

.son-title-container {
  border-bottom: 1px solid #555;
}
.son-title {
  margin-top: 40px;
  text-align: left;
  margin-bottom: 10px;
}
.son-title > button {
  font-weight: 400;
  padding: 25px 4px;
  font-size: 14px;
  color: #aaa;
  border-radius: 5%;
  outline: none;
  margin-right:62px
}
.son-title > button:hover {
  color: #fff;
  border-bottom: solid #aaa 4px;
  outline: none;
}
.son-title > button.active {
  border-bottom: solid #f96816 4px;
  color: #fff;
}
.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.focus,
.btn:active.focus,
.btn.active.focus {
  outline: none;
  border-color: transparent;
  box-shadow: none;
}
.son-title .form-control {
  background-color: transparent;
  color: rgb(170, 170, 170);
  outline: none;
}
.son-title .search-btn {
  color: rgb(170, 170, 170);
}
.son-title .input-group {
  margin-top: 17px;
}
.row .text {
  font-size: 14px;
  font-weight: 400;
  float: left;
}

.course-container {
  display: flex;
  justify-content: flex-start;
}
.course {
  width: 50%;
  padding: 0 10px;
}
.course-wrap {
  padding: 15px 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-bottom: 1px solid #363636;
}
.course-wrap img{
	width: 60px;
	height: 60px;
}
.course .descrip {
  font-size: 14px;
  color: #fff;
  font-weight: 500;
  flex: 1;
  margin-left: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  // white-space: nowrap;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.course .mybtn {
  color: #f96816;
  font-size: 12px;
  line-height: 32px;
  min-width: 100px;
  border: 1px solid #f96816;
  border-radius: 2px;
  width: 100px;
  height: 32px;
  margin: 7px 16px 8px 16px;
  outline: none;
  cursor: pointer;
}
.course .active-btn {
  height: 40px;
  line-height: 40px;
  min-width: 112px;
  font-size: 13px;
  text-align: center;
  color: rgb(170, 170, 170);
  margin-right: 16px;
  outline: none;
}
.course .active-btn:hover {
  background-color: #363636;
}
@media screen and (max-width: 768px) {
  .course {
    width: 100%;
  }
}
.suit-exercises{
    overflow: hidden;
    ul{
        width:100%;
        overflow: hidden;
        display: flex;
        .suit-list{
            flex:1;
            float: left;
            background: #222;
            color:#fff;
            height:100px;
            line-height: 105px;
            padding-left:20px;
            position: relative;
            cursor: pointer;
            transition: all 300ms ease 0s;
            // border-bottom:6px solid #f04b51;
            svg{
                width: 25px;
                height: 25px;
                margin-right: 10px;
                margin-top:-10px;
            }
            &:hover{
                background:#363636;
            }
            &:nth-child(2n+1){
                margin-right:20px;
            }
            .suit-test-btn{
                float: right;
                border-radius: 2px;
                width:85px;
                height: 30px;
                line-height: 30px;
                margin-top:38px;
                margin-right:25px;
                background-color: transparent;
                color: #f96816;
                border: 1px solid #f96816;
                border-radius: 3px;
                font-size: 12px;
                outline: none;
                // &:hover{
                //   background: rgb(249, 104, 22);
                //   color: rgb(255, 255, 255);
                // }

            }
            
        }

    }
   
}
</style>

