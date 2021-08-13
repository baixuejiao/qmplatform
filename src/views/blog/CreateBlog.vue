<template>
  <div class="container">
    <div class="create-blog">
      <div class="cb-header">
        <div class="cbh-left">
          <form>
            <div class="form-group">
              <label class="form-title">文章名称</label>
              <input
                type="text"
                v-model="title"
                class="form-input form-control col-form-label-lg"
                placeholder="输入您的标题..."
              />
            </div>
            <div class="form-group">
              <label class="form-title">文章简述</label>
              <textarea
                v-model="desc"
                placeholder="请输入文章简述..."
                class="form-input form-control"
                rows="3"
              ></textarea>
              <small id="emailHelp" class="form-text text-muted">文章简述会显示在文章列表中，尽量突出文章主题。</small>
            </div>
            <div class="form-group">
              <label class="form-title">选择文章标签</label>
              <div>
                <span
                  v-for="(item,index) in labelList"
                  :key="index"
                  @click="item.isCheck=!item.isCheck"
                  :class="item.isCheck?'badge badge-warning':'badge badge-light'"
                >{{item.title}}</span>
              </div>
            </div>
          </form>
        </div>
        <div class="cbh-right">
          <div class="img-bar" @click="uploadImg">
            <div class="img-ready" v-if="upImgInfo.accessPath">
              <img :src="upImgInfo.accessPath" />
            </div>
            <div class="up-img-icon" v-else>
              <input type="file" ref="uploadImg" @change="fileChange" class="upload-img" />
              <div class="center-bar">
                <i class="iconfont icon-xiangji"></i>
                <p>上传题图</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cb-content">
        <MarkDown @renderVal="submitBlog" :init-val="initValue" />
      </div>
    </div>
  </div>
</template>
<script>
import MarkDown from "@/components/MarkDown.vue";
import axios from "axios";
export default {
  data() {
    return {
      initValue: "",
      title: "",
      desc: "",
      upImgInfo: {
        accessPath: "",
        relativePath: ""
      },
      resCover:"",
      labelList: []
    };
  },
  created() {
    this.getPath();
  },
  methods: {
    getBlog(id) {
      //获取博客
      this.$post(BASE_API + "blog/getBlogDetail", { id }).then(res => {
        let thisLabel = this.labelList;
        let checkBabel = res.data.markId.split(",");
        this.title = res.data.title;
        this.desc = res.data.intro;
        this.resCover = res.data.cover;
        this.upImgInfo.accessPath = res.data.cover
          ? CDN_URL + res.data.cover
          : "";
        this.initValue = res.data.beforeContent;
        this.labelList = thisLabel.map(item => {
          return {
            title: item.title,
            isCheck: checkBabel.includes(item.id + ""),
            id: item.id
          };
        });
      });
    },
    getPath() {
      // 获取path
      let pathList = [];
      let thisUrl = `${BLOG_API}mark/getMarkList`;
      this.$get(thisUrl).then(res => {
        pathList = res.data.map((item, index) => {
          return {
            title: item.title,
            id: item.id,
            isCheck: false
          };
        });
        this.labelList = pathList;
        if (this.$route.query.id) {
          this.getBlog(this.$route.query.id);
        }
      });
    },
    fileChange(ev) {
      //选中图片后
      const files = ev.target.files;
      const formData = new FormData();
      if (!files) return;
      let postFiles = Array.prototype.slice.call(files);
      // postFiles.forEach(rawFile => {
      //   // this.upload(rawFile);
      //   console.log(rawFile)
      //   formData.append("imgFile", rawFile, rawFile.name);
      // });
      formData.append("imgFile", postFiles[0], postFiles[0].name);
      // let config = {
      //   headers:{'Content-Type':'multipart/form-data'}
      // };  //添加请求头
      axios.post(BLOG_API + "/path/addImg", formData).then(res => {
        this.upImgInfo.accessPath = res.data.data.accessPath;
        this.upImgInfo.relativePath = res.data.data.relativePath;
      });
    },
    uploadImg() {
      //点击触发上传
      this.$refs.uploadImg.value = null;
      this.$refs.uploadImg.click();
    },
    submitBlog(val, rVal) {
      this.$store.commit("showLoading");
      let labelStr = [];
      this.labelList.map(item => {
        if (item.isCheck) {
          labelStr.push(item.id);
        }
      });
      let options = {
        title: this.title,
        intro: this.desc,
        cover: this.upImgInfo.relativePath,
        content: val,
        beforeContent: rVal,
        markId: labelStr.join(","),
        tokenId: localStorage.getItem("tokenId")
      };
      if (this.$route.query.id) {
        this.updataBlog(this.$route.query.id,options);
      } else {
        this.$post(BASE_API + "blog/insertBlog", options).then(res => {
          setTimeout(() => {
            this.$store.commit("hideLoading");
            this.$router.push("/bloglist");
          }, 1000);
        });
      }
    },
    updataBlog(id,options) {
      options.cover = this.resCover;
      console.log(id,options);
      this.$post(BASE_API + "blog/updateBlog", options).then(res => {
        setTimeout(() => {
          this.$store.commit("hideLoading");
          this.$router.push("/bloglist");
        }, 1000);
      });
    }
  },
  components: {
    MarkDown
  }
};
</script>
<style lang="scss" scoped>
.create-blog {
  margin: 20px 0;
  .cb-header {
    display: flex;
    .cbh-left {
      flex-grow: 5;
      width: 0;
      margin-right: 15px;
    }
    .cbh-right {
      flex-grow: 2;
      width: 0;
      .img-bar {
        width: 100%;
        padding-bottom: 100%;
        border: 2px dashed #363636;
        border-radius: 10px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        .center-bar {
          position: absolute;
          top: 50%;
          left: 50%;
          color: #eee;
          font-size: 16px;
          transform: translate(-50%, -50%);
          text-align: center;
          line-height: 30px;
          i {
            font-size: 50px;
          }
        }
      }
    }
  }
}
.form-title {
  color: #eee;
  font-weight: bolder;
  font-size: 20px;
}
.form-input {
  background-color: #363636;
  border: none;
  color: #eee;
}
.badge {
  margin-right: 10px;
  cursor: pointer;
  input {
    margin-right: 5px;
  }
}
.upload-img {
  display: none;
}
.img-ready {
  position: absolute;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>