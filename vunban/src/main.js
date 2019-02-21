import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import VueDraggable from 'vue-draggable'
import '@/style/style.css'

Vue.use(VueMaterial)
Vue.use(VueDraggable)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
