import axios from 'axios'
import _ from 'lodash'

import DisruptionMarker from './model/disruption-marker'
import Station from './model/station'
import Facility from './model/facility'

function mkDisruptionMarker (json) {
  return new DisruptionMarker(
    json.id,
    json.stationId,
    json.stationName,
    json.facilityId,
    json.facilityType,
    json.facilityDescription,
    json.reason,
    json.since,
    json.geoCoordinates
  )
}

function mkStation (json) {
  let facilities = _.map(json.facilities, mkFacility)
  return new Station(json.id, json.name, facilities)
}

function mkFacility (json) {
  return new Facility(
    json.id,
    json.type,
    json.description,
    json.geoCoordinates,
    json.downtime
  )
}

class Client {
  async disruptionMarker () {
    return axios.get('/api/disruptions/marker').then(({data}) => {
      return data.map(mkDisruptionMarker)
    })
  }
  async stations () {
    return axios.get('/api/stations').then(({data}) => {
      return data.map(mkStation)
    })
  }
}

export default new Client()
