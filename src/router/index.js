import Vue from 'vue'
import Router from 'vue-router'
import VueI18n from 'vue-i18n'
import moment from 'moment'
import { messages } from '../i18n'

import Index from '@/components/Index'
import Disruptions from '@/components/Disruptions'
import Map from '@/components/Map'
import Stats from '@/components/Stats'
import Impress from '@/components/Impress'
import PrivacyPolicy from '@/components/PrivacyPolicy'
import NotFound from '@/components/NotFound'

Vue.use(VueI18n)
Vue.use(Router)

const supportedLocales = ['en', 'de']

let getBrowserLocale = () => {
  let preferredLocale = navigator.language || navigator.userLanguage
  return preferredLocale.indexOf('de') != -1 ? 'de' : 'en'
}

export const i18n = new VueI18n({
  // fallbackLocale: 'en',
  messages
})

export let router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: (to) => {
        return `/${getBrowserLocale()}${to.path}`
      }
    },
    {
      path: '/:locale',
      component: {
        template: '<router-view></router-view>',
        beforeRouteEnter (to, from, next) {
          next(vm => {
            vm.$vuetify.lang.current = to.params.locale
          })
        }
      },
      beforeEnter: (to, from, next) => {
        let locale = to.params.locale

        if (!supportedLocales.includes(locale)) {
          let preferredLocale = getBrowserLocale()
          return next(`/${preferredLocale}${to.path}`)
        }

        i18n.locale = locale
        moment.locale(locale)

        next()
      },
      children: [
        {
          path: '',
          component: Index,
          name: 'index'
        },
        {
          path: 'disruptions',
          component: Disruptions,
          name: 'disruptions'
        },
        {
          path: 'map',
          component: Map,
          name: 'map'
        },
        {
          path: 'stats',
          component: Stats,
          name: 'stats'
        },
        {
          path: 'impress',
          component: Impress,
          name: 'impress'
        },
        {
          path: 'privacy-policy',
          component: PrivacyPolicy,
          name: 'privacy-policy'
        },
        {
          path: '(.*)',
          component: NotFound
        }
      ]
    }
  ]
})

router.afterEach((to, from) => {
  document.title = 'Elescore - ' + (i18n.te(`${to.name}.meta.title`) ? i18n.t(`${to.name}.meta.title`) : i18n.t('app.meta.title'))
})
