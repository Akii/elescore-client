export default class Facility {
  constructor ({id, type, name, isDisrupted}) {
    this.id = id
    this.type = type
    this.name = name
    this.isDisrupted = isDisrupted
  }

  isElevator () {
    return this.type === 'Elevator'
  }

  isEscalator () {
    return !this.isElevator()
  }

  getIcon () {
    if (this.isElevator()) {
      return 'ele-elevator'
    } else {
      return 'ele-escalator'
    }
  }
}
