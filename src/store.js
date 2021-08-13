import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      headerTag: 2,
      userInfo: null,
      loadingShow:false,
      dialogStatus: false,
      dialogText: '',
      myCourse: [],
      myPath: [],
      answeredExercises:[]//记录答过的章节题状态
    }
  },
  
  mutations: {
    setUserInfo(state,value) {
      state.userInfo = value;
    },
    showLoading(state){
      state.loadingShow = true;
    },
    hideLoading(state){
      state.loadingShow = false;
    },
    showDialog(state, data){
      state.dialogStatus = true;
      state.dialogText = data || '服务器错误请稍后重试';
    },
    hideDialog(state){
      state.dialogStatus = false;
    },
    setHeaderTag(state, value) {
      state.headerTag = value;
    },
    setHistoryCourse(state, value) {
      state.myCourse.push(value);
    },
    setHistoryPath(state, value) {
      state.myPath.push(value);
    },
    insertAnsweredExercises(state,obj){
      state.answeredExercises.push(obj);
    },
    deleteAnsweredExercises(state){
      state.answeredExercises = [];
    }
  },
  actions: {

  }
})
