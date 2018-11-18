export default class PartialResult {
  constructor ({acceptRanges, contentRange, nextRange, totalCount, payload}) {
    this.acceptRanges = acceptRanges
    this.contentRange = contentRange
    this.nextRange = nextRange
    this.totalCount = totalCount
    this.payload = payload
  }
}
