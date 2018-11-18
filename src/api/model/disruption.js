import moment from 'moment'

export default class Disruption {
  constructor ({id, facilityId, facilityName, objectId, objectName, reason, occurredOn, updatedOn, resolvedOn, duration}) {
    this.id = id
    this.facilityId = facilityId
    this.facilityName = facilityName === 'Unknown' ? facilityId : facilityName
    this.objectId = objectId
    this.objectName = objectName
    this.reason = reason
    this.duration = duration

    this.occurredOn = moment(occurredOn)
    this.updatedOn = updatedOn ? moment(updatedOn) : undefined
    this.resolvedOn = resolvedOn ? moment(resolvedOn) : undefined
  }
}
