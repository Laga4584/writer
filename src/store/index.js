import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userSeq:1, //default 0
    basicFolder:2, //default -1
    startFolder:0,  //default -1
    sbText:'',
    showSb: false,
    snackbar: { active: false, color: "", message: "", timer: 4000 },
    novelType: [{name:'남성향', color: 'folder1'}, {name:'여성향', color:'folder5'}]
  },
  getters: {
    getUser: function(state){
      return state.userSeq;
    },
    getBasicFolder: function(state){
      return state.basicFolder;
    },
    getStartFolder: function(state){
      return state.startFolder;
    }
  },
  mutations: {
    editUser: function(state, data){
      state.userSeq=data;
    },
    editBasicFolder: function(state, data){
      state.basicFolder=data;
    },
    editStartFolder: function(state, data){
      state.startFolder=data;
    },
    editSbText: function(state, data){
      state.sbText=data;
    },
    editShowSb: function(state, data){
      state.showSb=data;
    },
    UPDATE_SNACKBAR(state, snackbar) {
      state.snackbar = snackbar;
    }
  },
  actions: {
    showSnack({ commit }, { message, color, timer }) {
      commit("UPDATE_SNACKBAR", {
        active: true,
        color: color,
        message: message,
        timer: timer
      });
    }
  },
  modules: {
  }
})
