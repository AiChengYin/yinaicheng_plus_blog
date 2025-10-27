import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'

import App from './App.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('./views/HomeView.vue') },
    { path: '/japanese', component: () => import('./views/JapaneseView.vue') },
    { path: '/projects', component: () => import('./views/ProjectsView.vue') },
    { path: '/blog', component: () => import('./views/BlogView.vue') },
    { path: '/interview', component: () => import('./components/InterviewModule.vue') },
    { path: '/speakingPractice', component: () => import('./components/SpeakingPracticeModule.vue') }
    // 暂时移除CMS模块路由
  ]
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')