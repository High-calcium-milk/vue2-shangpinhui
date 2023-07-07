import requests from '@/api/request'
import mockRequest from "@/api/mockRequest";
// api统一管理
export let requestCategoryList = () => requests({
    method: 'GET',
    url: '/product/getBaseCategoryList'
})
export let requestfloorData = () => mockRequest({
    method: 'GET',
    url: '/getfloordata'
})

export let requestBannerData = () => mockRequest({
    method: 'GET',
    url: '/getbannerdata'
})
export let requestSearchList = (data) => requests({
    method: 'POST',
    url: '/list',
    data
})
export let requestDetailData = (id) => requests({
    method: 'GET',
    url: `/item/${id}`,
})