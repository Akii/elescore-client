import MapMarker from './model/map-marker'

import OverallStats from './model/overal-stats'
import DisruptionsPerDay from './model/disruptions-per-day'
import Disruption from './model/disruption'
import PartialResult from './model/partial-result'
import FacilityDetails from './model/facility-details'
import ObjectSearchResult from './model/object-search-result'

import axios from 'axios'

class Client {

  async getOverallStats () {
    return axios.get('/api/stats').then(response => new OverallStats(response.data))
  }

  async getAverageDisruptionsPerDay () {
    return axios.get('/api/stats/averageDisruptionsPerDay').then(response =>
      response.data.map(dpd => new DisruptionsPerDay(dpd)))
  }

  async getMapMarkers () {
    return axios.get('/api/disruptions/markers').then(response =>
      response.data.map(marker => new MapMarker(marker)))
  }

  async getDisruptions (pagination) {
    return axios.get('/api/disruptions', {headers: {'Range': pagination.toRange()}}).then(response => {
      return new PartialResult({
        payload: response.data.map(disruption => new Disruption(disruption)),
        totalCount: Number.parseInt(response.headers['total-count'])
      })
    })
  }

  async getActiveDisruptions (pagination) {
    return axios.get('/api/disruptions/active', {headers: {'Range': pagination.toRange()}}).then(response => {
      return new PartialResult({
        payload: response.data.map(disruption => new Disruption(disruption)),
        totalCount: Number.parseInt(response.headers['total-count'])
      })
    })
  }

  async findObjects (search) {
    if (search.length < 3) {
      return []
    }

    return axios.get('/api/objects', {params: {search: search}}).then(response =>
      response.data.map(result => new ObjectSearchResult(result)))
  }

  async getFacilityDetails (facilityId) {
    return axios.get(`/api/facilities/${facilityId}`).then(response => new FacilityDetails(response.data))
  }

  async getFacilityDisruptions (facilityId, pagination) {
    return axios.get(`/api/facilities/${facilityId}/disruptions`, {headers: {'Range': pagination.toRange()}}).then(response => {
      return new PartialResult({
        payload: response.data.map(disruption => new Disruption(disruption)),
        totalCount: Number.parseInt(response.headers['total-count'])
      })
    })
  }
}

export default new Client()
