import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const state = {
  //用户添加对话框的显示隐藏
  addDialogVisible: false
}

const store = new Vuex.Store({
  state
})
export default store