<template>
  <div>
    <div v-if="station.facilities.length < 6" class="row">
      <facility-card :facility="f" :is-disrupted="isDisrupted(f.id)" v-for="f in station.facilities" :key="f.id"></facility-card>
    </div>
    <div v-else class="row mb-3">
      <facility-table :facilities="station.facilities" :is-disrupted="isDisrupted"></facility-table>
    </div>
    <div v-if="relevantDisruptions.length" class="row d-none d-md-block mt-3">
      <div class="col">
        <h5>Aktuelle Störungen</h5>
        <table class="table">
          <thead>
          <tr>
            <th>#</th>
            <th>Aufzug / Rolltreppe</th>
            <th>Status</th>
            <th>Beginn</th>
            <th>Dauer bisher</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="d in relevantDisruptions" :key="d.id">
              <td>{{ d.id }}</td>
              <td>{{ d.facilityDescription || '# ' + d.facilityId }}</td>
              <td>{{ d.reason | translateReason }}</td>
              <td>{{ d.since | date }}</td>
              <td>{{ d.since | calculateDuration }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import FacilityCard from '../facility/Card'
import FacilityTable from '../facility/Table'

import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'StationDetails',
  props: ['station'],
  components: { FacilityCard, FacilityTable },
  computed: {
    disruptedFacilityIds () {
      return this.disruptionMarker.map((a) => { return a.facilityId })
    },
    relevantDisruptions () {
      return this.disruptionMarker.filter((m) => m.stationId === this.station.id)
    },
    ...mapGetters(['disruptionMarker'])
  },
  methods: {
    isDisrupted (id) {
      return this.disruptedFacilityIds.includes(id)
    }
  },
  filters: {
    translateReason (r) {
      const reasons = {
        'under construction': 'In Reparatur',
        'monitoring disrupted': 'Fernüberwachung gestört',
        'under maintenance': 'In Wartung',
        'not available': 'Nicht verfügbar',
        'monitoring not available': 'Fernüberwachung nicht verfügbar'
      }
      return reasons[r] || r
    },
    calculateDuration (d) {
      return moment(d).fromNow(true)
    },
    date (d) {
      return moment(d).format('lll')
    }
  }
}
</script>