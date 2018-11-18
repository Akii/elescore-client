export default class OverallStats {
  constructor ({disruptions, activeDisruptions, facilities, objects}) {
    this.disruptions = disruptions || 0
    this.activeDisruptions = activeDisruptions || 0
    this.facilities = facilities || 0
    this.objects = objects || 0
  }
}
