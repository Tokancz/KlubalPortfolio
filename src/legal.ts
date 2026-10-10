import { createApp } from 'vue'
import './assets/styles/main.scss'
import LegalPage from './LegalPage.vue'
import { vReveal } from './directives/reveal'

// Second Vite entry (legal.html) — the usage terms + privacy policy page.
createApp(LegalPage).directive('reveal', vReveal).mount('#app')
