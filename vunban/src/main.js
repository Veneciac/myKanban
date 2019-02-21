import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMaterial from 'vue-material'
import vueKanban from 'vue-kanban'
import 'vue-material/dist/vue-material.min.css'
import '@/style/style.css'

Vue.use(VueMaterial)
Vue.use(vueKanban)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
