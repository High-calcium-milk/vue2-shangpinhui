import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter)
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import Register from '@/pages/register'
import notFind from "@/pages/404";

let oldPush = VueRouter.prototype.push
let oldReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, reject = () => { }, resolve = () => { }) {
    oldPush.call(this, location, reject, resolve)
}
VueRouter.prototype.replace = function (location, reject = () => { }, resolve = () => { }) {
    oldReplace.call(this, location, reject, resolve)
}

export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
            meta: { notFind: true, footerShow: true }
        },
        {
            path: '/login',
            component: Login,
            meta: { notFind: true, footerShow: false }
        },
        {
            name: 'search',
            // params后面+？表示可传可不传
            path: '/search/:keyword?',
            component: Search,
            meta: { notFind: true, footerShow: true }
        },
        {
            name: 'detail',
            path: '/detail/:skuId',
            component: Detail,
            meta: { notFind: true, footerShow: true }
        },
        {
            path: '/register',
            component: Register,
            meta: { notFind: true, footerShow: false }
        },
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '*',
            component: notFind,
            meta: {
                notFind: false,
                footerShow: false
            }
        }
    ]
})