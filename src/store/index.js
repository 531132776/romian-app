import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const state = {
    //要设置的全局访问的state对象
    changebleNum: 0,//要设置的初始属性值
    getCurrentRegisteredDevice:null
};
const getters = {   //实时监听state值的变化(最新状态)
    getChangedNum() {  //承载变化的changebleNum的值
        return state.changableNum
    },
};
const mutations = {
    newNum(state, sum) { //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.changebleNum += sum;
    },
    getDevice(state, n){
        // console.log(n)
        // console.log(n.deviceld)
    }
};
const actions = {
    getNewNum(context, num) {   //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
        context.commit('newNum', num)
    },
    getDeviceRe ({ commit }) {
        commit('getDevice')
    }
};
const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});

export default store;
