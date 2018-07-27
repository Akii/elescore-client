<template>
  <div>
    <div class="ele-header-container d-none d-sm-block">
      <div class="container">
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
    <b-navbar toggleable="md" type="dark" class="ele-bar">
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
          <div class="col-lg-6 col-md-12 text-center text-lg-left d-none d-lg-block">
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
      async updateNumberOfDisruptions () {
        await this.fetchDisruptionMarker()
        setTimeout(() => { this.updateNumberOfDisruptions() }, 60000)
      },
      ...mapActions(['fetchDisruptionMarker'])
    }
  }
</script>

<style>
body {
  height: 100%;
  background-color: rgb(239, 243, 248);
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

.ele-content {
  min-height: calc(100vh - 199px);
}

@media (max-width: 575.98px) {
  .ele-content {
    min-height: calc(100vh - 105px);
  }
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