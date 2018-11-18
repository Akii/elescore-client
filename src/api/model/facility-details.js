import Facility from './facility'
import Objekt from './objekt'

export default class FacilityDetails extends Facility {
  constructor ({id, type, name, object, downtime, geoCoordinates, isDisrupted}) {
    super({})

    this.id = id
    this.type = type
    this.name = name
    this.object = new Objekt(object)
    this.downtime = downtime
    this.geoCoordinates = geoCoordinates
    this.isDisrupted = isDisrupted
    this.source = id.indexOf('DB') != -1 ? 'DB' : 'BOG'
  }
}
