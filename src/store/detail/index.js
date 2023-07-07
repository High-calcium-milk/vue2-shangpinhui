import { requestDetailData } from '@/api'
const state = {
    detailData: {}
}
const actions = {
    async getDetailData({ commit }, id) {
        let result = await requestDetailData(id)
        commit('setDetailData', result)
    }
}
const mutations = {
    setDetailData(state, { data }) {
        state.detailData = data
    }
}
const getters = {
    categoryView(state) {
        return state.detailData.categoryView
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}