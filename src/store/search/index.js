import { requestSearchList } from '@/api'
const state = {
    searchList: {}
}
const actions = {
    async getSearchList({ commit }, params = {}) {
        let data = await requestSearchList(params)
        if (data.code == 200) {
            commit('setSearchList', data)
        }
    }
}
const mutations = {
    setSearchList(state, { data }) {
        state.searchList = data
    }
}
// 简化数据
const getters = {
    goodsList(state) {
        return state.searchList.goodsList
    },
    attrsList(state) {
        return state.searchList.attrsList
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}