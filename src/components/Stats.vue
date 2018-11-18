<template>
  <div>
    <section>
      <v-layout row wrap>
        <v-container grid-list-xl>
          <v-flex xs12>
            <h1 class="display-2">{{ $t('stats.header') }}</h1>
          </v-flex>
          <v-flex xs12 class="mt-3 mb-5">
            <v-card>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ $t('stats.graph.headline') }}</div>
                  <div class="subheading">{{ $t('stats.graph.subheading') }}</div>
                </div>
              </v-card-title>
              <v-card-text>
                <disruptions-per-day v-if="showGraph" :height="300" :chart-labels="labels" :chart-data="disruptions"></disruptions-per-day>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-divider />

          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-start>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon class="xx-large primary--text">warning</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">{{ overallStats.disruptions.toLocaleString() }} {{ $t('stats.disruptions') }}</div>
                    </v-card-title>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon class="xx-large primary--text">ele-elevator</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">{{ overallStats.facilities.toLocaleString() }} {{ $t('stats.facilities') }}</div>
                    </v-card-title>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon class="xx-large primary--text">place</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">{{ overallStats.objects.toLocaleString() }} {{ $t('stats.places') }}</div>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>

          <v-divider />

          <v-flex xs12 class="pt-4">
            <v-layout row wrap align-start>
              <v-flex xs12 lg6 class="pa-0">
                <v-card class="elevation-0 transparent">
                  <v-card-title primary-title>
                    <div class="headline">{{ $t('stats.longesDisruptions') }}</div>
                  </v-card-title>
                  <v-card-text>
                    <v-card>
                      <v-card-text class="pa-0">
                        <v-data-table
                          :headers="longesDisruptionHeaders"
                          :items="longestDisruptions"
                          :pagination.sync="pagination"
                          :total-items="10"
                          must-sort
                          hide-actions
                          class="elevation-1"
                        >
                          <template slot="items" slot-scope="props">
                            <td class="hidden-xs-only">{{ props.item.id }}</td>
                            <td>
                              {{ props.item.objectName }}<br/>
                              <a @click="showFacilityDetailsFor = props.item.facilityId">{{ props.item.facilityName }}</a>
                            </td>
                            <td class="text--nowrap">{{ props.item.duration | convertToDuration }}</td>
                          </template>
                        </v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 lg6 class="pa-0">
                <v-card class="elevation-0 transparent">
                  <v-card-title primary-title>
                    <div class="headline">{{ $t('stats.recentlyResolved') }}</div>
                  </v-card-title>
                  <v-card-text>
                    <v-card>
                      <v-card-text class="pa-0">
                        <v-data-table
                          :headers="recentlyResolvedDisruptionHeaders"
                          :items="recentlyResolvedDisruptions"
                          :pagination.sync="pagination"
                          :total-items="10"
                          must-sort
                          hide-actions
                          class="elevation-1"
                        >
                          <template slot="items" slot-scope="props">
                            <td class="hidden-xs-only">{{ props.item.id }}</td>
                            <td>
                              {{ props.item.objectName }}<br/>
                              <a @click="showFacilityDetailsFor = props.item.facilityId">{{ props.item.facilityName }}</a>
                            </td>
                            <td class="text--nowrap">{{ props.item.resolvedOn | convertToCalendar }}</td>
                          </template>
                        </v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-container>
      </v-layout>
    </section>
    <facility-details v-model="showFacilityDetailsFor"></facility-details>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import moment from 'moment'

  import Pagination from '@/api/model/pagination'
  import FacilityDetails from './dialogs/FacilityDetails'
  import DisruptionsPerDay from './charts/DisruptionsPerDay'

  export default {
    data () {
      return {
        showGraph: false,
        labels: [],
        disruptionsPerDay: {},
        showFacilityDetailsFor: undefined,
        longesDisruptionHeaders: [
          { text: this.$t('stats.tableHeaders.disruptionId'), value: 'id', sortable: false, class: 'hidden-xs-only' },
          { text: this.$t('stats.tableHeaders.placeFacility'), value: 'facilityName', sortable: false },
          { text: this.$t('stats.tableHeaders.duration'), value: 'duration', sortable: false }
        ],
        longestDisruptions: [],
        recentlyResolvedDisruptionHeaders: [
          { text: this.$t('stats.tableHeaders.disruptionId'), value: 'id', sortable: false, class: 'hidden-xs-only' },
          { text: this.$t('stats.tableHeaders.placeFacility'), value: 'facilityName', sortable: false },
          { text: this.$t('stats.tableHeaders.resolvedOn'), value: 'resolvedOn', sortable: false }
        ],
        recentlyResolvedDisruptions: [],
        pagination: {}
      }
    },
    created () {
      let day = moment().subtract(1, 'day')
      let days = []

      for (var i = 31; i > 0; i--) {
        days.push(day.format('Y-MM-DD'))
        day = day.subtract(1, 'day')
      }

      this.labels = days.reverse()

      this.fetchAverageDisruptionsPerDay().then(disruptionsPerDay => {
        disruptionsPerDay.forEach(dpd => {
          this.disruptionsPerDay[dpd.day] = dpd.disruptions
        })
        this.showGraph = true
      })
      this.fetchDisruptions(new Pagination({
        page: 1,
        perPage: 10,
        sortBy: 'duration',
        order: 'desc'
      })).then((partialResult) => {
        this.longestDisruptions = partialResult.payload
      })
      this.fetchDisruptions(new Pagination({
        page: 1,
        perPage: 10,
        sortBy: 'resolvedOn',
        order: 'desc'
      })).then((partialResult) => {
        this.recentlyResolvedDisruptions = partialResult.payload
      })
    },
    computed: {
      disruptions () {
        let lastKnownDisruptions = 0
        return this.labels.map(l => {
          lastKnownDisruptions = this.disruptionsPerDay[l] || lastKnownDisruptions
          return lastKnownDisruptions
        })
      },
      ...mapGetters(['overallStats'])
    },
    filters: {
      convertToCalendar (d) {
        return d ? d.calendar() : ''
      },
      convertToDuration (i) {
        return moment().add(i, 'seconds').fromNow(true)
      }
    },
    methods: mapActions(['fetchDisruptions', 'fetchAverageDisruptionsPerDay']),
    components: { DisruptionsPerDay, FacilityDetails }
  }
</script>