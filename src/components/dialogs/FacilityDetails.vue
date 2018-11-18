<template>
  <v-layout row justify-center>
    <v-dialog :width="102" v-bind:value="loading" hide-overlay>
      <v-card>
        <v-card-text>
          <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog :max-width="500" v-bind:value="!loading && notFound" v-on:input="closeDialog">
      <v-card>
        <v-card-title class="headline" primary-title>
          <v-icon>help</v-icon> &nbsp; {{ $t('facilityDetails.notFound.title') }}
        </v-card-title>
        <v-card-text>
          {{ $t('facilityDetails.notFound.text', { id: value }) }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="closeDialog">
            {{ $t('facilityDetails.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-bind:value="value != undefined"
      v-on:input="closeDialog"
      :max-width="900"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
      :transition="$vuetify.breakpoint.xsOnly ? 'dialog-bottom-transition' : 'dialog-transition'"
    >
      <v-card v-if="facility">
        <v-card-title v-if="$vuetify.breakpoint.xsOnly" class="title" primary-title>
          <v-icon v-if="facility.isDisrupted" large class="facility-icon-left warning--text">warning</v-icon>
          <v-icon v-else large class="facility-icon-left">{{ facility.getIcon() }}</v-icon>
          <span class="facility-title">{{ facility.name }}</span>
        </v-card-title>
        <v-card-title v-else class="headline" primary-title>
          <v-icon large class="facility-icon-left">{{ facility.getIcon() }}</v-icon>
          <span class="facility-title with-right-icon">
            <template v-if="facility.object">{{ facility.object.name }} &raquo;</template> {{ facility.name }}
          </span>

          <v-icon large class="facility-icon-right warning--text">warning</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container grid-list-md class="pa-0 ma-0 dialog-container">
            <v-layout row wrap>
              <v-flex sm12 md6>
                <h5 class="headline">{{ $t('facilityDetails.generalInfo.title') }}</h5>
                <v-layout row fill-height>
                  <v-flex xs12>
                    <table class="v-table facts-table">
                      <tbody>
                        <tr>
                          <td><b>{{ $t('facilityDetails.generalInfo.facilityId') }}</b></td>
                          <td>{{ facility.id }}</td>
                        </tr>
                        <tr v-if="facility.object">
                          <td><b>{{ $t('facilityDetails.generalInfo.place') }}</b></td>
                          <td>{{ facility.object.name}} ({{ facility.object.id }})</td>
                        </tr>
                        <tr>
                          <td><b>{{ $t('facilityDetails.generalInfo.type') }}</b></td>
                          <td>{{ $t('facilityDetails.generalInfo.facilityType.' + facility.type) }}</td>
                        </tr>
                        <tr>
                          <td><b>{{ $t('facilityDetails.generalInfo.dataSource') }}</b></td>
                          <td>{{ $t('general.sources.' + facility.source) }}</td>
                        </tr>
                        <tr>
                          <td><b>{{ $t('facilityDetails.generalInfo.noDisruptions') }}</b></td>
                          <td>{{ totalCount }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex sm12 md6>
                <h5 class="headline">{{ $t('facilityDetails.grading.title') }}</h5>
                <v-layout v-if="$vuetify.breakpoint.xsOnly" align-center justify-space-around column fill-height>
                  <v-flex xs12 sm3 md4>
                    <v-card>
                      <v-card-text>
                        <grade :downtime="facility.downtime"></grade>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 sm9 md8 class="width-100">
                    <table class="v-table facts-table">
                      <tbody>
                        <tr>
                          <td colspan="2"><b>{{ $t('facilityDetails.grading.downTimeLast30Days') }}</b></td>
                        </tr>
                        <tr>
                          <td colspan="2">{{ formatDuration(facility.downtime) }}</td>
                        </tr>
                        <tr>
                          <td colspan="2">
                            <b>{{ $t('facilityDetails.grading.explanation') }}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>{{ $t('facilityDetails.grading.grade') }} 1: &lt; 1 {{ $t('general.day') }}</td>
                          <td>{{ $t('facilityDetails.grading.grade') }} 4: &lt; 4 {{ $t('general.days') }}</td>
                        </tr>
                        <tr>
                          <td>{{ $t('facilityDetails.grading.grade') }} 2: &lt; 1.5 {{ $t('general.days') }}</td>
                          <td>{{ $t('facilityDetails.grading.grade') }} 5: &lt; 5 {{ $t('general.days') }}</td>
                        </tr>
                        <tr>
                          <td>{{ $t('facilityDetails.grading.grade') }} 3: &lt; 2.5 {{ $t('general.days') }}</td>
                          <td>{{ $t('facilityDetails.grading.grade') }} 6: &gt; 5 {{ $t('general.days') }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </v-flex>
                </v-layout>
                <v-layout v-if="!$vuetify.breakpoint.xsOnly" row>
                  <v-flex sm3 md4>
                    <v-card>
                      <v-card-text>
                        <grade :downtime="facility.downtime"></grade>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex sm9 md8>
                    <table class="v-table facts-table">
                      <tbody>
                        <tr>
                          <td colspan="2"><b>{{ $t('facilityDetails.grading.downTimeLast30Days') }}</b></td>
                        </tr>
                        <tr>
                          <td colspan="2">{{ formatDuration(facility.downtime) }}</td>
                        </tr>
                        <tr>
                          <td colspan="2">
                            <b>{{ $t('facilityDetails.grading.explanation') }}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>{{ $t('facilityDetails.grading.grade') }} 1: &lt; 1 {{ $t('general.day') }}</td>
                          <td>{{ $t('facilityDetails.grading.grade') }} 4: &lt; 4 {{ $t('general.days') }}</td>
                        </tr>
                        <tr>
                          <td>{{ $t('facilityDetails.grading.grade') }} 2: &lt; 1.5 {{ $t('general.days') }}</td>
                          <td>{{ $t('facilityDetails.grading.grade') }} 5: &lt; 5 {{ $t('general.days') }}</td>
                        </tr>
                        <tr>
                          <td>{{ $t('facilityDetails.grading.grade') }} 3: &lt; 2.5 {{ $t('general.days') }}</td>
                          <td>{{ $t('facilityDetails.grading.grade') }} 6: &gt; 5 {{ $t('general.days') }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-flex xs12>
                <h5 class="headline mt-3 mb-3">{{ $t('facilityDetails.disruptions') }}</h5>
                <facility-disruptions :facilityId="facility.id" @totalCountUpdated="updateTotalCount"></facility-disruptions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="closeDialog"
          >
            {{ $t('facilityDetails.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  import { mapActions } from 'vuex'

  import FacilityDisruptions from './FacilityDisruptions'
  import Grade from './Grade'

  export default {
    props: ['value'],
    data () {
      return {
        loading: false,
        notFound: false,
        facility: undefined,
        totalCount: 0
      }
    },
    created () {
      this.fetchFacility()
    },
    watch: {
      value () {
        this.fetchFacility()
      }
    },
    methods: {
      updateTotalCount (count) {
        this.totalCount = count
      },
      fetchFacility () {
        if (this.value === undefined) {
          return
        }

        this.loading = true
        this.notFound = false
        this.facility = undefined
        this.fetchFacilityDetails(this.value).then(facility => {
          this.loading = false
          this.notFound = !facility
          this.facility = facility
        })
      },
      formatDuration (dt) {
        if (dt < 60) {
          return '--'
        }
        let days = Math.floor(dt / 1440)
        let daysText = days + (days == 1 ? ' ' + this.$t('general.day') : ' ' + this.$t('general.days'))
        let remainingHours = Math.floor((dt % 1440) / 60)
        let remainingHoursText = remainingHours + (remainingHours == 1 ? ' ' + this.$t('general.hour') : ' ' + this.$t('general.hours'))
        if (days && remainingHours) {
          return daysText + ', ' + remainingHoursText
        } else if (days) {
          return daysText
        } else if (remainingHours) {
          return remainingHoursText
        }
      },
      closeDialog () {
        this.$emit('input', undefined)
      },
      ...mapActions(['fetchFacilityDetails'])
    },
    computed: {
      dialogTransition () {
        return this.$vuetify.breakpoint.name === 'xs' ? 'dialog-bottom-transition' : undefined
      }
    },
    components: { FacilityDisruptions, Grade }
  }
</script>
<style>
.facility-icon-left {
  position: absolute;
}
.facility-icon-right {
  position: absolute;
  right: 12px;
}
.facility-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 32px;
  padding-left: 12px;
}
.facility-title.with-right-icon {
  margin-right: 48px;
  padding-right: 12px;
}
.width-100 {
  width: 100%;
}
.facts-table {
  margin: 12px;
}
table.facts-table tbody tr > td {
  padding: 2px!important;
  height: 24px;
}
</style>