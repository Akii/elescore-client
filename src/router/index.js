import Vue from 'vue'
import Router from 'vue-router'

import CurrentDisruptions from '@/components/CurrentDisruptions'
import Stations from '@/components/Stations'
import Impress from '@/components/Impress'
import PrivacyPolicy from '@/components/PrivacyPolicy'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    { path: '/', redirect: '/current' },
    { path: '/current', component: CurrentDisruptions },
    { path: '/stations', component: Stations, props: (route) => ({ search: route.query.search }) },
    { path: '/impress', component: Impress },
    { path: '/privacy-policy', component: PrivacyPolicy }
  ]
})
