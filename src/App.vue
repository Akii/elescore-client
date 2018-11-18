<template>
  <v-app id="top">
    <v-toolbar fixed height="64" dark color="primary" style="z-index: 102">
      <v-toolbar-title class="brand">
        <router-link :to="{ name: 'index' }" class="white--text mr-4">
          <v-icon >ele-elevator</v-icon> Elescore
        </router-link>
      </v-toolbar-title>

      <v-toolbar-items class="hidden-sm-and-up">
        <v-btn flat icon :to="{ name: 'disruptions' }">
          <v-icon>warning</v-icon>
        </v-btn>
        <v-btn flat icon :to="{ name: 'map' }">
          <v-icon>map</v-icon>
        </v-btn>
        <v-btn flat icon :to="{ name: 'stats' }">
          <v-icon>assessment</v-icon>
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat :to="{ name: 'disruptions' }">
          <v-icon class="hidden-sm-and-down mr-2">warning</v-icon>
          {{ $t("app.toolbar.disruptions") }}
        </v-btn>
        <v-btn flat :to="{ name: 'map' }">
          <v-icon class="hidden-sm-and-down mr-2">map</v-icon>
          {{ $t("app.toolbar.map") }}
        </v-btn>
        <v-btn flat :to="{ name: 'stats' }">
          <v-icon class="hidden-sm-and-down mr-2">assessment</v-icon>
          {{ $t("app.toolbar.stats") }}
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-btn flat color="none" class="hidden-xs-only" :to="{ name: 'disruptions' }" active-class="some-not-active-class">
        <v-icon class="warning--text">warning</v-icon>
        <span class="font-weight-bold">&nbsp; {{ overallStats.activeDisruptions }}</span>
      </v-btn>

      <v-menu offset-y v-if="false">
        <v-btn slot="activator" icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile to="/favorites">
            <v-icon class="mr-2">star</v-icon>
            <v-list-tile-title>
              {{ $t("app.toolbar.favorites") }}
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/options">
            <v-icon class="mr-2">build</v-icon>
            <v-list-tile-title>
              {{ $t("app.toolbar.options") }}
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/">
            <v-icon class="mr-2">exit_to_app</v-icon>
            <v-list-tile-title>
              {{ $t("app.toolbar.logout") }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content v-scroll="onScroll" class="content">
      <router-view></router-view>
    </v-content>
    <v-footer class="pa-3" fixed>
      <div>&copy; 2017 <a href="https://twitter.com/AkiiZedd" target="_blank">Akii</a></div>
      <v-spacer></v-spacer>
      <div>
        <a href="https://github.com/Akii/elescore" target="_blank"><font-awesome-icon :icon="['fab', 'github']" /></a> |
        <a href="https://haskell-lang.org" target="_blank">λ</a> |
        <a href="https://vuetifyjs.com" target="_blank"><font-awesome-icon :icon="['fab', 'vuejs']" /></a> |&nbsp;
        <router-link :to="{ name: 'impress' }">{{ $t('app.impress') }}</router-link> |
        <router-link :to="{ name: 'privacy-policy' }">{{ $t('app.privacy-policy') }}</router-link>
      </div>
    </v-footer>
    <v-slide-x-reverse-transition>
      <v-btn v-if="showToTopButton" color="primary" class="to-top" fab fixed bottom right v-smooth-scroll="'top'">
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-slide-x-reverse-transition>
  </v-app>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'app',
    data () {
      return {
        showToTopButton: 0
      }
    },
    created () {
      this.updateOverallStats()
    },
    computed: mapGetters(['overallStats']),
    methods: {
      updateOverallStats () {
        this.fetchOverallStats()
        setTimeout(() => { this.updateOverallStats() }, 60000)
      },
      onScroll (e) {
        let offset = window.pageYOffset || document.documentElement.scrollTop
        this.showToTopButton = offset > window.innerHeight
      },
      ...mapActions(['fetchOverallStats'])
    }
  }
</script>
<style>
.brand a {
  text-decoration: none;
}
.pull-right {
  float: right;
}
.text--nowrap {
  white-space: nowrap;
}
.content {
  margin-top: 64px;
  margin-bottom: 36px;
}
.xx-large {
  font-size: 64px!important;
}
.v-btn--bottom.v-btn--fixed.to-top {
  bottom: 48px;
  z-index: 102;
}
.v-btn--bottom.v-btn--fixed.to-top i {
  display: inline-flex;
}
</style>