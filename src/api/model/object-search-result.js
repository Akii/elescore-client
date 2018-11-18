import { some } from 'lodash'

import Objekt from './objekt'
import Facility from './facility'

export default class ObjectSearchResult {
  constructor ({object, facilities}) {
    this.object = new Objekt(object)
    this.facilities = facilities.map(facility => new Facility(facility))
    this.isDisrupted = some(facilities, ['isDisrupted', true])
  }
}
