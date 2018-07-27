<template>
  <page>
    <router-view></router-view>
  </page>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  import Page from './components/layout/Page'

  export default {
    name: 'app',
    components: { Page }
  }
</script>