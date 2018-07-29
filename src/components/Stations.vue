<template>
  <div class="container pt-3 pb-3">
    <div class="card mb-3 sticky-top">
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <div class="form-group mb-0">
              <input v-model="currentSearch" @keyup.esc="clearSearch" type="text" class="form-control input-lg" placeholder="Nach Stationen suchen..." style="width: 100%!important" autocomplete="off" name="the-search">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h3 v-if="currentSearch && !displayedStations.length" class="text-center" style="margin-bottom: 15px;">Keine Ergebnisse</h3>
        <div class="panel-group" style="margin-bottom: 5px">
          <accordion v-for="s in displayedStations" :key="s.id" v-if="hasFacilities(s)" :should-be-open="accordionsShouldBeOpen">
            <template slot="title">
              {{ s | stationName }}
              <font-awesome-icon v-if="isDisrupted(s.id)" class="text-warning float-right" icon="exclamation-triangle" />
            </template>
            <station-details :station="s" slot="body"></station-details>
          </accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Accordion from './layout/Accordion'
  import StationDetails from './station/Details'

  import { mapGetters, mapActions } from 'vuex'
  import _ from 'lodash'

  export default {
    name: 'Stations',
    components: { Accordion, StationDetails },
    props: { search: { default: '' } },
    data () {
      return {
        currentSearch: ''
      }
    },
    created () {
      if (!this.stations.length) {
        this.fetchStations()
      }
    },
    mounted () {
      this.currentSearch = this.search.toString() || ''
    },
    filters: {
      stationName (s) {
        if (s.name) {
          return s.name
        } else {
          return `Unbekannt (# ${s.id})`
        }
      }
    },
    computed: {
      disruptedStationIds () {
        return this.disruptionMarker.map((a) => { return a.stationId })
      },
      displayedStations () {
        if (this.currentSearch.length < 2) {
          return this.stations.filter((s) => {
            return this.disruptedStationIds.includes(s.id)
          })
        } else {
          return this.stations.filter((s) => {
            return this.matchesSearch(s)
          })
        }
      },
      accordionsShouldBeOpen () {
        return this.displayedStations.length < 5
      },
      stations () {
        return this.currentStations.map((s) => {
          s.name = s.name || 'Unbekannt (' + s.id + ')'
          return s
        })
      },
      ...mapGetters(['stations', 'disruptionMarker'])
    },
    watch: {
      currentSearch (newSearch) {
        this.$router.push({ path: 'stations', query: { search: newSearch } })
      }
    },
    methods: {
      hasFacilities (s) {
        return !_.isEmpty(s.facilities)
      },
      isDisrupted (id) {
        return this.disruptedStationIds.includes(id)
      },
      matchesSearch (s) {
        return this.currentSearch == s.id ||
          _.some(s.facilities, (f) => { return this.currentSearch == f.id }) ||
          s.name.toLowerCase().indexOf(this.currentSearch.toLowerCase()) != -1
      },
      clearSearch: function () {
        this.currentSearch = ''
      },
      ...mapActions(['fetchStations'])
    }
  }
</script>