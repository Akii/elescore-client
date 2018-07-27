export default class DisruptionMarker {
  constructor (id, stationId, stationName, facilityId, facilityType, facilityDescription, reason, since, geoCoordinates) {
    this.id = id
    this.stationId = stationId
    this.stationName = stationName
    this.facilityId = facilityId
    this.facilityType = facilityType
    this.facilityDescription = facilityDescription
    this.reason = reason
    this.since = since
    this.geoCoordinates = geoCoordinates
  }
}
