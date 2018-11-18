export default class Objekt {
  constructor ({id, name}) {
    this.id = id
    this.name = name
  }

  getIcon () {
    if (this.id.indexOf('BOG') != -1) {
      return 'place'
    } else {
      return 'train'
    }
  }
}
