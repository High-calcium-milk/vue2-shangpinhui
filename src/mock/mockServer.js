import Mock from 'mockjs'
import banner from '@/mock/banner.json'
import floor from '@/mock/floor.json'

Mock.mock('/mock/getbannerdata', () => {
    return {
        data: banner,
        code: 200
    }
})
Mock.mock('/mock/getfloordata', () => {
    return {
        data: floor,
        code: 200
    }
})
