import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Main from "../views/Main"
import Home from "../views/Home"
import Batch from "../views/Batch"

Vue.use(Router)

export default new Router({
    routes: [{
        // 登录页
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        // 首页
        path: '/main',
        name: 'Main',
        component: Main
    },
    {
        // 测试首页
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        // Batch页面
        path: '/batch',
        name: 'Batch',
        component: Batch
    }]
})