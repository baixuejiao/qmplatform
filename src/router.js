import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/login/Login.vue'
import Register from './views/login/Register.vue'
import forgot from './views/forgot/Forgot.vue'
import unloggedHome from './views/login/unloggedHome.vue'
import ClassDetail from './views/class_detail/ClassDetail.vue'
import history from './views/history/History.vue'

import Personal from './views/personal/Personal.vue'
import Search from './views/search/Search.vue'
import Player from './views/player/Player.vue'
import Employ from './views/vip/Employment.vue'
import Vclass from './views/vip/VipClass.vue'
import PathsClassification from './views/pathsClassification/PathsClassification.vue'
import TeacherInformation from './views/teacherInformation/TeacherInformation.vue'

import Contact from './views/contact/Contact.vue'
import ExercisesPath from './views/exercises/ExercisesPath'
import SkillAssessment from './views/exercises/SkillAssessment.vue';
import SectionsSkillAssessment from './views/sectionsExercises/SkillAssessment.vue'
import AssementReview from './views/exercises/AssementReview.vue';
import AssementDetails from "./views/exercises/AssementDetails.vue";
import CateExerDetail from './views/exercises/CateExerDetail.vue'
import BarrierSkillAssessment from './views/exercises/barrier/SkillAssessment.vue';
import TagDetails from './views/tagDetails/tagDetails.vue'
import ProgramList from './components/exercises/ProgramList.vue';
import ErrorPage from './views/error/Error.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/courselist',
      name: 'courselist',
      component: () => import('@/views/courselist/Courselist.vue'),
      children: [{
          path: '/courselist',
          name: 'newest',
          component: () => import('@/components/Newest.vue')
        },
        {
          path: '/courselist/popular',
          name: 'popular',
          component: () => import('@/views/courselist/popular/Popular.vue')
        }
      ]
    },
    {
      path: '/browse',
      name: 'browse',
      component: () => import('@/views/unloggedsearch/Unloggedsearch.vue')
    },
    {
      path: '/home',
      name: 'login_home',
      component: () => import('./views/login_home/Login_Home.vue')
    },
    {
      path: '/classdetail',
      name: 'classdetail',
      component: ClassDetail
    },
    {
      path: '/bookmarks',
      name: 'bookmarks',
      component: () => import("./views/bookmarks/BookMarks.vue")
    },
    {
      path: '/pathdetails',
      name: 'pathdetails',
      component: () => import("./views/path/PathDetails.vue")
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component:Register
    },
    {
      path: '/forgot',
      name: 'forgot',
      component:forgot
    },
    {
      path: '/',
      name: 'index',
      component:unloggedHome
    },

    {
      path: '/personal',
      name: 'personal',
      component: Personal
    },
    {
      path: '/player',
      name: 'player',
      component: Player
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/employ',
      name: 'employ',
      component: Employ
    },
    {
      path: '/vclass',
      name: 'vclass',
      component: Vclass
    },
    {
      path: '/paths',
      name: 'paths',
      component: PathsClassification
    },
    {
      path: '/teacherInformation',
      name: 'teacherInformation',
      component: TeacherInformation
    },
    {
      path: '/history',
      name: 'history',
      component:history
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path:'/exercisesPath',
      name:'exercisesPath',
      component:ExercisesPath
    },
    {
      path: '/skill-assessment',
      name: 'skill-assessment',
      component: SkillAssessment

    },{
      path: '/assement-details',
      name: 'assement-details',
      component: AssementDetails
    },
    ,{
      path: '/assement-review',
      name: 'assement-review',
      component: AssementReview
    },
    ,{
      path: '/sections-skill-assessment',
      name: 'sections-skill-assessment',
      component: SectionsSkillAssessment
    },{ 
      path:'/cateExerDetail',
      name:'cateExerDetail',
      component:CateExerDetail
    },{
      path:'/barrier/skill-assessment',
      name:'BarrierSkillAssessment',
      component:BarrierSkillAssessment
    },
    {
      path:'/program-list',
      name:'programList',
      component:ProgramList
    },
    {
      path:'/program',
      name:'program',
      component:() => import("./views/coder/CoderIndex.vue")
    },
    {
      path:'/tip',
      name:'tip',
      component:() => import("./views/exercises/Tip.vue")
    }
    ,{
      path: '/bloglist',
      name: 'bloglist',
      component: () => import("./views/blog/BlogList.vue")
    },
    ,{
      path: '/createblog',
      name: 'createblog',
      component: () => import("./views/blog/CreateBlog.vue")
    },
    {
      path: '/blogdetail',
      name: 'blogdetail',
      component: () => import("./views/blog/BlogDetail.vue")
    },
    { 
      path:'/tagDetails',
      name:'tagDetails',
      component: TagDetails
    },
    { 
      path:'/tagDetails',
      name:'tagDetails',
      component:TagDetails
    },
    { 
      path:'/coderIndex',
      name:'coderIndex',
      component: () => import("./views/coder/CoderIndex.vue")
    },
    {
      path: '/searchClassify',
      name: 'searchClassify',
      component: () => import('@/views/searchClassify/searchClassify.vue')
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('@/views/activity/Activity.vue')
    },
    {
      path: '/activityMaterial',
      name: 'activityMaterial',
      component: () => import('@/views/activity/Material.vue')
    },
    {
      path: '*',
      name: 'error',
      component: ErrorPage
    }
  ]
})