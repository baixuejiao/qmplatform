import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Router from 'vue-router'

import Pagination from 'vue-pagination-2'
Vue.component('pagination', Pagination)

// iview
import 'view-design/dist/styles/iview.css';
import '@/assets/css/my-theme.scss'
import { Modal } from 'view-design';
Vue.component('Modal', Modal)
Vue.prototype.$Modal = Modal

import {get, post, userpost} from '@/assets/js/request.js'
// import {formatDate, setLevel} from '@/assets/js/common.js'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@/assets/css/reset.scss'


Vue.config.productionTip = false

// 请求直接调用 this.$get 或者 this.$post
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$upost = userpost

/**
 * 解决路由点击保报错问题
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

window.BLOG_API = process.env.VUE_APP_BLOG_API
window.BASE_API = process.env.VUE_APP_BASE_API
window.LOGIN_API = process.env.VUE_APP_LOGIN_API
window.SKILL_URL = process.env.VUE_APP_SKILL_URL
window.CDN_URL = process.env.VUE_APP_CDN_URL
window.EXERCISES_URL = process.env.VUE_APP_EXERCISES_URL

router.afterEach(() => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})

// document.domain = 'superlanlanlan.cn'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
