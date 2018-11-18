export default class DisruptionsPerDay {
  constructor ({day, disruptions}) {
    this.day = day
    this.disruptions = Math.round(disruptions)
  }
}
