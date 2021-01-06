import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Main from "../views/Main"
import Home from "../views/Home"
import Batch from "../views/Batch"
import Task from "../views/Task"
import Loading from '../views/Loading'

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
    },
    {
        // Task页面
        path: '/task',
        name: 'Task',
        component: Task
    },
    {
        // Loading页面
        path: '/loading',
        name: 'Loading',
        component: Loading
    }]
})