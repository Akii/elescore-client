<template>
  <v-card>
    <v-card-text class="pa-0">
      <v-data-table
        v-if="!$vuetify.breakpoint.xsOnly"
        :loading="loading"
        :headers="headers"
        :items="disruptions"
        :pagination.sync="pagination"
        :rows-per-page-items="[5, 10, 25]"
        :total-items="totalCount"
        must-sort
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td>{{ $t('disruptions.reasons.' + props.item.reason) }}</td>
          <td>{{ props.item.occurredOn | convertToCalendar }}</td>
          <td>{{ props.item.resolvedOn | convertToCalendar }}</td>
          <td>{{ props.item.duration | convertToDuration }}</td>
        </template>
      </v-data-table>
      <v-list v-else>
        <template v-for="(disruption, index) in disruptions">
          <v-list-tile :key="disruption.id">
            <v-list-tile-content>
              <v-list-tile-title>{{ disruption.occurredOn | convertToCalendar }} ({{ $t('disruptions.reasons.' + disruption.reason) }})</v-list-tile-title>
              <v-list-tile-sub-title>
                {{ disruption.duration | convertToDuration }}<template v-if="disruption.resolvedOn">, {{ $t('facilityDetails.resolved') }} ({{ disruption.resolvedOn | convertToCalendar }})</template>
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="!disruption.resolvedOn">
              <v-icon color="orange">warning</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="index != disruptions.length - 1" :key="'divider-' + disruption.id" />
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
  import { mapActions } from 'vuex'
  import Pagination from '@/api/model/pagination'
  import moment from 'moment'

  export default {
    props: ['facilityId'],
    data () {
      return {
        pagination: {
          descending: true,
          page: 1,
          rowsPerPage: 5,
          sortBy: 'id',
          totalItems: 0
        },
        headers: [
          { text: this.$t('facilityDetails.tableHeaders.disruptionId'), value: 'id' },
          { text: this.$t('facilityDetails.tableHeaders.reason'), value: 'reason', sortable: false },
          { text: this.$t('facilityDetails.tableHeaders.disruptedOn'), value: 'occurredOn' },
          { text: this.$t('facilityDetails.tableHeaders.resolvedOn'), value: 'resolvedOn' },
          { text: this.$t('facilityDetails.tableHeaders.duration'), value: 'duration', class: 'hidden-xs-only' }
        ],
        totalCount: 0,
        disruptions: [],
        loading: false
      }
    },
    created () {
      // otherwise watching pagination will be triggered
      if (this.$vuetify.breakpoint.xsOnly) {
        this.fetchDisruptions()
      }
    },
    watch: {
      pagination () {
        this.fetchDisruptions()
      }
    },
    methods: {
      fetchDisruptions () {
        this.loading = true
        let direction = this.pagination.descending ? 'desc' : 'asc'
        let pagination = new Pagination({
          page: this.pagination.page,
          perPage: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          order: direction
        })

        this.fetchFacilityDisruptions({
          facilityId: this.facilityId,
          pagination: pagination
        }).then((partialResult) => {
          this.totalCount = partialResult.totalCount
          this.disruptions = partialResult.payload
          this.loading = false
          this.$emit('totalCountUpdated', partialResult.totalCount)
        })
      },
      ...mapActions(['fetchFacilityDisruptions'])
    },
    filters: {
      convertToCalendar (d) {
        return d ? d.calendar() : ''
      },
      convertToDuration (i) {
        return moment().add(i, 'seconds').fromNow(true)
      }
    }
  }
</script>