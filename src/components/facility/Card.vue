<template>
  <div class="col-sm-12 col-md-6 col-lg-4">
    <div class="card mb-3">
      <div class="card-body">
        <h4 class="card-title">
          {{ facility.description || '# ' + facility.id }}
          <font-awesome-icon v-if="isDisrupted" class="text-warning float-right" icon="exclamation-triangle" />
        </h4>

        <p v-if="isElevator"><img src="../../assets/img/elevator_2.png" class="mt-1 mr-1" height="24px" /> Aufzug</p>
        <p v-else><img src="../../assets/img/escalator_2.png" class="mt-1 mr-1" height="24px" /> Rolltreppe</p>

        <hr/>

        <h5>Note</h5>
        <facility-grade :downtime="facility.downtime"></facility-grade>

        <hr/>

        <p>Ausfall in den letzten 30 Tagen:</p>
        <p>
          <b>{{ facility.downtime | formatDuration }}</b>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import FacilityGrade from './Grade'

export default {
  name: 'FacilityCard',
  props: ['facility', 'isDisrupted'],
  components: { FacilityGrade },
  computed: {
    isElevator () {
      return this.facility.type === 'Elevator'
    }
  },
  filters: {
    formatDuration (dt) {
      if (dt < 60) {
        return '--'
      }

      let days = Math.floor(dt / 1440)
      let remainingHours = Math.floor((dt % 1440) / 60)
      let text = remainingHours + (remainingHours == 1 ? ' Stunde' : ' Stunden')

      if (days) {
        return days + (days == 1 ? ' Tag, ' : ' Tage, ') + text
      } else {
        return text
      }
    }
  }
}
</script>
