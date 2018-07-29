export default class Facility {
  constructor (id, type, description, geoCoordinates, downtime) {
    this.id = id
    this.type = type
    this.description = description
    this.geoCoordinates = geoCoordinates
    this.downtime = downtime
  }
}
