import moment from 'moment'

export default class MapMarker {
  constructor ({id, objectId, objectName, facilityId, facilityType, facilityName, reason, since, geoCoordinates}) {
    this.id = id
    this.objectId = objectId
    this.objectName = objectName
    this.facilityId = facilityId
    this.facilityType = facilityType
    this.facilityName = facilityName
    this.reason = reason
    this.since = moment(since)
    this.geoCoordinates = geoCoordinates
  }
}
