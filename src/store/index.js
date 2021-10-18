import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: "light",
    user: null,
    requestErr: false,
    uid: null,
    isLoading: false,
    cookie: null,
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
      localStorage.setItem("theme", theme);
    },
    addUser(state, obj) {
      state.user = obj;
      state.uid = state.user.profile.userId;
      state.cookie = obj.cookie;
    },
    // 清除用户
    clearUser(state) {
      state.user = null;
      state.uid = null;
      state.cookie = null;
    },
    /**显示隐藏loading */
    showLoading(state) {
      state.isLoading = true;
    },
    hiddenLoading(state) {
      state.isLoading = false;
    },
  },
  getters: {
    getTheme(state) {
      if (localStorage.getItem("theme")) {
        state.theme = localStorage.getItem("theme");
      }
      return state.theme;
    },
    getAvatar(state) {
      let avatar = "";
      if (localStorage.getItem("avatar")) {
        avatar = localStorage.getItem("avatar");
        return avatar;
      }
      avatar = state.user && state.user.profile.avatarUrl;
      return avatar;
    },
    //获取昵称
    getNickname(state) {
      let nickname = "";
      if (localStorage.getItem("nickname")) {
        nickname = localStorage.getItem("nickname");
        return nickname;
      }
      nickname = state.user && state.user.profile.nickname;
      return nickname;
    },
    /**获取网络请求状态 */
    getRequestType(state) {
      return state.requestErr;
    },
    getUserId(state) {
      if (localStorage.getItem("uid")) {
        state.uid = localStorage.getItem("uid"); //localStorage.getItem是自带的方法
      }
      return state.uid;
    },
    getCookie(state) {
      if (localStorage.getItem("cookie")) {
        state.cookie = localStorage.getItem("cookie");
      }
      return state.cookie;
    },
  },
  actions: {},
  modules: {},
});
