<template>
  <div class="app-container">
    <div class="ele-header-container d-none d-sm-block">
      <div class="container app-header">
        <header class="blog-header py-3 ele-header">
          <div class="row flex-nowrap justify-content-between align-items-center">
            <div class="col-6">
              <router-link to="current" class="btn btn-text">Elescore</router-link>
            </div>
            <div class="col-6 d-flex justify-content-end align-items-center">
              <span v-if="disruptionMarker" class="text-warning">
                <font-awesome-icon icon="exclamation-triangle" /> {{ disruptionMarker.length }}
              </span>
            </div>
          </div>
        </header>
      </div>
    </div>
    <b-navbar toggleable="sm" type="dark" class="ele-bar">
      <div class="container">
        <b-navbar-toggle class="ele-bar-item" target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item to="current">Aktuelle Störungen</b-nav-item>
            <b-nav-item to="stations">Stationen</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>

    <div class="ele-content">
      <router-view></router-view>
    </div>

    <footer class="ele-bar ele-footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-12 text-center text-lg-left">
            © 2017 <a href="https://twitter.com/AkiiZedd" target="_blank">Akii</a>
          </div>
          <div class="col-lg-6 col-md-12 text-center text-lg-right">
            <a href="https://github.com/Akii/elescore" target="_blank"><font-awesome-icon :icon="['fab', 'github']" /> Projekt</a> |
            <a href="https://haskell-lang.org" target="_blank">λ made with Haskell</a> |
            <router-link to="impress">Attributionen</router-link> |
            <router-link to="impress">Impressum</router-link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Page',
    created () {
      this.updateNumberOfDisruptions()
    },
    computed: mapGetters(['disruptionMarker']),
    methods: {
      updateNumberOfDisruptions () {
        this.fetchDisruptionMarker()
        setTimeout(() => { this.updateNumberOfDisruptions() }, 60000)
      },
      ...mapActions(['fetchDisruptionMarker'])
    }
  }
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  background-color: rgb(239, 243, 248);
}

.app-container {
  --side-padding: calc(1rem + 1vw);
  --non-content-height: 95px;
  box-sizing: border-box;
  min-height: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-template-columns: 100%;
  grid-template-areas:
    'header'
    'nav'
    'content'
    'footer';
}

.ele-header-container {
  grid-area: header;
  box-sizing: border-box;
  display: flex;
  padding-left: var(--side-padding, 16px);
  padding-right: var(--side-padding, 16px);
}

.ele-nav {
  grid-area: nav;
  display: flex;
  background-color: gray;
  padding-left: var(--side-padding, 16px);
}

.ele-content {
  grid-area: content;
  height: 100%;
}

.ele-footer {
  grid-area: footer;
  display: flex;
  justify-content: center;
  background-color: gray;
}

.ele-header-container {
  background-color: white;
}

.ele-header, .ele-header a {
  font-size: 32px;
}

.ele-bar {
  padding: 0;
  background-color: #444d58;
  color: rgb(241, 241, 241);
}

.ele-bar .navbar-nav .nav-link {
  padding: 1em;
}

.ele-bar .navbar-nav .nav-link.active {
  background-color: rgb(85, 97, 111);
}

.ele-bar .navbar-nav .nav-link:hover {
  background: #55616f;
}

.ele-bar .ele-bar-item {
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 15px;
}

.ele-bar .ele-warn {
  color: yellow;
}

.ele-footer {
  padding-top: 15px;
  padding-bottom: 15px;

  font-size: 13px;
  color: #a2abb7;
}

.ele-footer a {
  color: #f2f2f2;
}
</style>