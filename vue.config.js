const loginData = require('./public/mock/login.json');
const regData = require('./public/mock/reg.json');
const infoData = require('./public/mock/getUserInfor.json');

module.exports={
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  devServer: {
    proxy: {
      "/baseUrl": {
        target: "http://login.superlanlanlan.cn/", // 域名
        ws: true, // 是否启用websockets
        changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRequiresRewrite: {
        "^/baseUrl": "/"
        }
      }
    },
    before(app){
      app.post('/baseUrl/login',(req,res,next)=>{
        res.json(loginData);
      })
      app.post('/baseUrl/reg',(req,res,next)=>{
        res.json(regData);
      })
      app.post('/baseUrl/getUserInfor',(req,res,next)=>{
        res.json(infoData);
      })
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/css/global.scss";
        `
      }
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        //这个是加上自己的路径，
        //注意：试过不能使用别名路径
        // path.resolve(__dirname, "./src/assets/variable.less")
      ]
    }
  }
}

