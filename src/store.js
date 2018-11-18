import Vue from 'vue'
import Vuex from 'vuex'

import client from './api/client'
import OverallStats from './api/model/overal-stats'

Vue.use(Vuex)

const state = {
  overallStats: new OverallStats({}),
  mapMarkers: []
}

const mutations = {
  setOverallStats (state, stats) {
    state.overallStats = stats
  },
  setMapMarkers (state, markers) {
    state.mapMarkers = markers
  }
}

const actions = {
  fetchOverallStats ({ commit }) {
    return client.getOverallStats().then((stats) => {
      commit('setOverallStats', stats)
      return stats
    })
  },
  fetchAverageDisruptionsPerDay () {
    return client.getAverageDisruptionsPerDay()
  },
  fetchMapMarkers ({ commit }) {
    return client.getMapMarkers().then((markers) => {
      commit('setMapMarkers', markers)
      return markers
    })
  },
  fetchDisruptions (_, pagination) {
    return client.getDisruptions(pagination)
  },
  findObjects (_, search) {
    return client.findObjects(search)
  },
  fetchFacilityDetails (_, facilityId) {
    return client.getFacilityDetails(facilityId)
  },
  fetchFacilityDisruptions (_, {facilityId, pagination}) {
    return client.getFacilityDisruptions(facilityId, pagination)
  }
}

const getters = {
  overallStats: state => state.overallStats,
  mapMarkers: state => state.mapMarkers
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
