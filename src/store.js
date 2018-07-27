import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import client from './api/client'

Vue.use(Vuex)

const state = {
  stations: {},
  facilities: {},
  disruptionMarker: []
}

const mutations = {
  setStations (state, ss) {
    state.stations = ss
  },
  setFacilities (state, fs) {
    state.facilities = fs
  },
  setDisruptionMarker (state, diss) {
    state.disruptionMarker = diss
  }
}

const actions = {
  fetchStations ({ commit }) {
    return client.stations().then((ss) => {
      var stations = {}
      var facilities = {}

      ss.forEach(s => {
        stations[s.id] = s

        s.facilities.forEach(f => {
          facilities[f.id] = f
        })
      })

      commit('setStations', stations)
      commit('setFacilities', facilities)
    })
  },
  fetchDisruptionMarker ({ commit }) {
    return client.disruptionMarker().then((diss) => {
      commit('setDisruptionMarker', diss)
      return diss
    })
  }
}

const getters = {
  stations: state => _.values(state.stations),
  station: state => sid => { return state.stations[sid] },
  facilities: state => _.values(state.facilities),
  facility: state => fid => { return state.facilities[fid] },
  disruptionMarker: state => state.disruptionMarker
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
