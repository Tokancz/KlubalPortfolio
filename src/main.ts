import { createApp } from 'vue'
import './assets/styles/main.scss'
import App from './App.vue'
import { vReveal } from './directives/reveal'

createApp(App).directive('reveal', vReveal).mount('#app')
