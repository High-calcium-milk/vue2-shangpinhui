import { requestCategoryList, requestBannerData, requestfloorData } from "@/api";
const state = {
    typeNavList: [],
    bannerData: [],
    floorData: []
}
const actions = {
    async getTypeNavList({ commit }) {
        let data = await requestCategoryList()
        if (data.code == 200) commit('setTypeNavList', data)
    },
    async getBannerData({ commit }) {
        let data = await requestBannerData()
        if (data.code == 200) commit('setBannerData', data)
    },
    async getFloorData({ commit }) {
        let data = await requestfloorData()
        if (data.code == 200) commit('setFloorData', data)
    },
}
const mutations = {
    setTypeNavList(state, { data }) {
        state.typeNavList = data
    },
    setBannerData(state, { data }) {
        state.bannerData = data
    },
    setFloorData(state, { data }) {
        state.floorData = data
    }
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}