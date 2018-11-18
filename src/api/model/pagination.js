export default class Pagination {
  constructor ({page, perPage, sortBy, order}) {
    this.page = page
    this.perPage = perPage
    this.sortBy = sortBy
    this.order = order
  }

  toRange () {
    let offset = (this.page - 1) * this.perPage
    return `${this.sortBy}; offset ${offset}; limit ${this.perPage}; order ${this.order}`
  }
}
