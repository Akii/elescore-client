<template>
  <div class="col">
    <table class="table">
      <thead>
      <tr>
        <th>Beschreibung</th>
        <th>Art</th>
        <th>Note</th>
        <th>Ausfalldauer / Monat</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="f in facilities" :key="f.id">
        <td>
          <font-awesome-icon v-if="isDisrupted(f.id)" class="text-warning mr-1" icon="exclamation-triangle" />
          {{ f.description || '# ' + f.id }}</td>
        <td>
          <div v-if="isElevator(f.type)" class="d-none d-lg-block">
            <img src="../../assets/img/elevator_2.png" height="24px" /> Aufzug
          </div>
          <div v-else class="d-none d-lg-block">
            <img src="../../assets/img/escalator_2.png" height="24px" /> Rolltreppe
          </div>

          <div class="d-lg-none">
            <img v-if="isElevator(f.type)" src="../../assets/img/elevator_2.png" height="24px" />
            <img v-else src="../../assets/img/escalator_2.png" height="24px" />
          </div>
        </td>
        <td>
          <facility-grade :downtime="f.downtime" small></facility-grade>
        </td>
        <td>{{ f.downtime | formatDuration }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import FacilityGrade from './Grade'

export default {
  name: 'FacilityTable',
  props: ['facilities', 'isDisrupted'],
  components: { FacilityGrade },
  methods: {
    isElevator (t) {
      return t === 'Elevator'
    }
  },
  filters: {
    formatDuration (dt) {
      if (dt < 60) {
        return '--'
      }

      let days = Math.floor(dt / 1440)
      let daysText = days + (days == 1 ? ' Tag' : ' Tage')
      let remainingHours = Math.floor((dt % 1440) / 60)
      let remainingHoursText = remainingHours + (remainingHours == 1 ? ' Stunde' : ' Stunden')

      if (days && remainingHours) {
        return daysText + ', ' + remainingHoursText
      } else if (days) {
        return daysText
      } else if (remainingHours) {
        return remainingHoursText
      }
    }
  }
}
</script>
