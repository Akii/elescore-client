// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import vuetifyLocaleDe from 'vuetify/es5/locale/de'
import 'chart.js'
import VueChart from 'vue-chartjs'
import VueSmoothScroll from './directives/smooth-scroll'
import store from './store'
import App from './App'
import { router, i18n } from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faVuejs } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './assets/css/elescore.css'

library.add(faGithub)
library.add(faVuejs)

Vue.config.productionTip = false

Vue.use(Vuetify, {
  lang: {
    locales: { 'de': vuetifyLocaleDe }
  },
  theme: {
    primary: '#1E88E5',
    secondary: '#64B5F6',
    accent: '#2979FF'
  }
})
Vue.use(VueChart)
Vue.use(VueSmoothScroll)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  template: '<App/>',
  components: { App }
})
