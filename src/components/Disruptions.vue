<template>
  <div>
    <section>
      <v-layout row wrap>
        <v-container grid-list-xl>
          <v-flex xs12>
            <h1 class="display-2">{{ $t('disruptions.header') }}</h1>
          </v-flex>
          <v-flex xs12 class="mt-3 mb-3">
            <v-card>
              <v-card-text class="pa-0">
                <v-data-table
                  :loading="loading"
                  :headers="headers"
                  :items="disruptions"
                  :pagination.sync="pagination"
                  :rows-per-page-items="[50, 100, 250, 500]"
                  :total-items="totalCount"
                  must-sort
                  class="elevation-1"
                >
                  <template slot="items" slot-scope="props">
                    <td class="hidden-xs-only">{{ props.item.id }}</td>
                    <td class="text--nowrap">
                      {{ props.item.objectName }}<br/>
                      <a @click="showFacilityDetailsFor = props.item.facilityId">{{ props.item.facilityName }}</a>
                    </td>
                    <td class="text--nowrap">{{ $t('disruptions.reasons.' + props.item.reason) }}</td>
                    <td class="text--nowrap">{{ props.item.occurredOn | convertToCalendar }}</td>
                    <td class="text--nowrap">{{ props.item.resolvedOn | convertToCalendar }}</td>
                    <td class="text--nowrap">{{ props.item.duration | convertToDuration }}</td>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-container>
      </v-layout>
    </section>
    <facility-details v-model="showFacilityDetailsFor"></facility-details>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import Pagination from '@/api/model/pagination'
  import FacilityDetails from './dialogs/FacilityDetails'
  import moment from 'moment'

  export default {
    data () {
      return {
        pagination: {
          descending: true,
          page: 1,
          rowsPerPage: 50,
          sortBy: 'id',
          totalItems: 0
        },
        headers: [
          { text: this.$t('disruptions.tableHeaders.disruptionId'), value: 'id', class: 'hidden-xs-only' },
          { text: this.$t('disruptions.tableHeaders.placeFacility'), value: 'facilityName', sortable: false },
          { text: this.$t('disruptions.tableHeaders.reason'), value: 'reason', sortable: false },
          { text: this.$t('disruptions.tableHeaders.disruptedOn'), value: 'occurredOn' },
          { text: this.$t('disruptions.tableHeaders.resolvedOn'), value: 'resolvedOn' },
          { text: this.$t('disruptions.tableHeaders.duration'), value: 'duration' }
        ],
        totalCount: 0,
        disruptions: [],
        loading: false,
        showFacilityDetailsFor: undefined
      }
    },
    watch: {
      pagination (nextPagination) {
        this.loading = true
        let direction = this.pagination.descending ? 'desc' : 'asc'

        this.fetchDisruptions(new Pagination({
          page: this.pagination.page,
          perPage: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          order: direction
        })).then((partialResult) => {
          this.totalCount = partialResult.totalCount
          this.disruptions = partialResult.payload
          this.loading = false
        })
      }
    },
    filters: {
      convertToCalendar (d) {
        return d ? d.calendar() : ''
      },
      convertToDuration (i) {
        return moment().add(i, 'seconds').fromNow(true)
      }
    },
    methods: mapActions(['fetchDisruptions']),
    components: { FacilityDetails }
  }
</script>