<template>
  <div class="container pt-3 pb-3">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <input v-model="currentSearch" @keyup.esc="clearSearch" type="text" class="form-control input-lg" placeholder="Nach Stationen suchen..." style="width: 100%!important" autocomplete="off" name="the-search">
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <h3 v-if="currentSearch && !displayedStations.length" class="text-center" style="margin-bottom: 15px;">Keine Ergebnisse</h3>
            <div class="panel-group accordion" style="margin-bottom: 5px">
              <accordion v-for="s in displayedStations" :key="s.id" v-if="hasFacilities(s)" :should-be-open="accordionsShouldBeOpen">
                <template slot="title">
                  {{ s | stationName }}
                  <font-awesome-icon v-if="isDisrupted(s.id)" class="text-warning float-right" icon="exclamation-triangle" />
                </template>
                <template slot="body">
                  <table class="table table-bordered table-striped" style="margin: 0px;">
                    <thead>
                    <tr>
                      <th width="10%">#</th>
                      <th width="25%">Art</th>
                      <th>Beschreibung</th>
                      <th width="15%"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="f in s.facilities" :key="f.id">
                      <td>{{ f.id }}</td>
                      <td>
                        <div v-if="isElevator(f.type)">
                          <img src="../assets/img/elevator_2.png" height="24px" /> Aufzug
                        </div>
                        <div v-else>
                          <img src="../assets/img/escalator_2.png" height="24px" /> Rolltreppe
                        </div>
                      </td>
                      <td>{{ f.description }}</td>
                      <td class="text-right">
                        <font-awesome-icon v-if="isDisrupted(f.id)" class="text-warning" icon="exclamation-triangle" />
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </template>
              </accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Accordion from './layout/Accordion'

  import { mapGetters, mapActions } from 'vuex'
  import _ from 'lodash'

  export default {
    name: 'Stations',
    components: { Accordion },
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
      this.currentSearch = this.search
    },
    filters: {
      stationName (s) {
        if (s.name) {
          return s.name
        } else {
          return `Unbekannt (${s.id})`
        }
      }
    },
    computed: {
      disruptedStationIds () {
        return this.disruptionMarker.map((a) => { return a.stationId })
      },
      disruptedFacilityIds () {
        return this.disruptionMarker.map((a) => { return a.facilityId })
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
      search (newSearch) {
        this.currentSearch = newSearch
      }
    },
    methods: {
      hasFacilities (s) {
        return !_.isEmpty(s.facilities)
      },
      isElevator (t) {
        return t === 'Elevator'
      },
      isDisrupted (id) {
        return this.disruptedStationIds.includes(id) || this.disruptedFacilityIds.includes(id)
      },
      matchesSearch (s) {
        return this.currentSearch == s.sId ||
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
