import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { 
        path: '/', 
        alias: '/login', 
        component:() => import('./views/LoginView.vue')
    },
    {
        path: '/auth-code',
        component:() => import('./views/AuthView.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

createApp(App).use(router).mount('#app')