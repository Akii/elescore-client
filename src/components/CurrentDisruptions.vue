<template>
  <div id="mappu" ref="mappu">
    <div v-show="mapLoaded" id="popup" ref="popup" class="ol-popup">
      <a href="#" id="popup-closer" ref="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content" ref="popup-content">
        <table>
          <tbody>
          <tr>
            <td><b>Störungs-ID:</b></td>
            <td>{{ activeDisruption.id }}</td>
          </tr>
          <tr>
            <td><b>Station:</b></td>
            <td>
              <router-link :to="{path: '/stations', query: {search: activeDisruption.stationName}}">
                {{ activeDisruption.stationName || activeDisruption.stationId }}
              </router-link>
            </td>
          </tr>
          <tr>
            <td><b>{{ activeDisruption.facilityType === 'Elevator' ? 'Aufzug' : 'Rolltreppe' }}:</b></td>
            <td>
                {{ activeDisruption.facilityDescription || '# ' + activeDisruption.facilityId }}
            </td>
          </tr>
          <tr>
            <td><b>Dauer bisher:</b></td>
            <td>{{ activeDisruption.since | calculateDuration }}</td>
          </tr>
          <tr v-if="activeDisruption.reason">
            <td><b>Status:</b></td>
            <td>{{ activeDisruption.reason | translateReason }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-new */

  import { mapActions, mapGetters } from 'vuex'
  import moment from 'moment'

  import 'ol/ol.css'
  import elevatorImg from '../assets/img/elevator_2.png'
  import escalatorImg from '../assets/img/escalator_2.png'

  import proj from 'ol/proj'
  import Map from 'ol/map'
  import View from 'ol/view'
  import TileLayer from 'ol/layer/tile'
  import OSMSource from 'ol/source/osm'
  import Overlay from 'ol/overlay'
  import Feature from 'ol/feature'
  import Point from 'ol/geom/point'
  import VectorLayer from 'ol/layer/vector'
  import VectorSource from 'ol/source/vector'
  import Style from 'ol/style/style'
  import Icon from 'ol/style/icon'

  export default {
    name: 'CurrentDisruptions',
    data () {
      return {
        mapLoaded: false,
        disruptions: [],
        map: undefined,
        layer: undefined,
        activeDisruption: {}
      }
    },
    mounted () {
      this.map = this.loadMap()
      this.updateMapMarker()
    },
    filters: {
      translateReason (r) {
        const reasons = {
          'UnderConstruction': 'In Reparatur',
          'MonitoringDisrupted': 'Fernüberwachung gestört',
          'UnderMaintenance': 'In Wartung',
          'NotAvailable': 'Nicht verfügbar',
          'MonitoringNotAvailable': 'Fernüberwachung nicht verfügbar'
        }
        return reasons[r] || r
      },
      calculateDuration (d) {
        return moment(d).fromNow(true)
      }
    },
    watch: {
      disruptionMarker () {
        this.updateMapMarker()
      }
    },
    computed: mapGetters(['station', 'facility', 'disruptionMarker']),
    methods: {
      ...mapActions(['fetchDisruptionMarker']),
      loadMap () {
        // overlay
        let container = this.$refs.popup
        let closer = this.$refs['popup-closer']

        let overlay = new Overlay(({
          element: container,
          autoPan: true,
          autoPanAnimation: {
            duration: 250
          }
        }))

        closer.onclick = function () {
          overlay.setPosition(undefined)
          closer.blur()
          return false
        }

        let map = new Map({
          target: 'mappu',
          layers: [
            new TileLayer({
              source: new OSMSource()
            })
          ],
          view: new View({
            center: proj.transform([10.448, 51.358], 'EPSG:4326', 'EPSG:3857'),
            zoom: 6
          }),
          overlays: [overlay]
        })

        map.on('click', (evt) => {
          let feature = map.forEachFeatureAtPixel(evt.pixel, (f) => { return f })

          if (feature) {
            overlay.setPosition(feature.getGeometry().getCoordinates())
            this.activeDisruption = this.disruptionMarker[feature.get('disruptionId')]
          } else {
            overlay.setPosition(undefined)
            this.activeDisruption = {}
          }
        })

        map.on('pointermove', function (e) {
          let pixel = map.getEventPixel(e.originalEvent)
          let hit = map.hasFeatureAtPixel(pixel)
          map.getViewport().style.cursor = hit ? 'pointer' : ''
        })

        this.mapLoaded = true

        return map
      },
      updateMapMarker () {
        this.map.removeLayer(this.layer)

        // map markers
        let markers = []

        let mkPoint = ({lat, lng}) => {
          return new Point(proj.transform([lat, lng], 'EPSG:4326', 'EPSG:3857'))
        }

        for (let i = 0; i < this.disruptionMarker.length; i++) {
          let disruption = this.disruptionMarker[i]

          let f = new Feature({
            type: 'icon',
            geometry: mkPoint(disruption.geoCoordinates)
          })

          f.setStyle(new Style({
            image: new Icon({
              scale: 0.5,
              offset: [2.5, 0],
              src: disruption.facilityType === 'Elevator' ? elevatorImg : escalatorImg
            })
          }))

          f.set('disruptionId', i)

          markers.push(f)
        }

        this.layer = new VectorLayer({
          source: new VectorSource({
            features: markers
          })
        })

        this.map.addLayer(this.layer)
      }
    }
  }
</script>
<style>
  #mappu {
    height: calc(100vh - 199px);
  }

  @media (max-width: 575.98px) {
    #mappu {
      height: calc(100vh - 124px);
    }
  }

  @media (min-width: 576px) and (max-width: 991.98px) {
    #mappu {
      height: calc(100vh - 218px);
    }
  }

  /* todo: fix iPhones :S */
  @supports (-webkit-overflow-scrolling: touch) {
    /* CSS specific to iOS devices */ 
  }

  .ol-popup {
    position: absolute;
    background-color: white;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    padding: 15px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 280px;
    white-space: nowrap;
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    line-height: 19px;
  }
  .ol-popup:after, .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }
  .ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
  .ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
  }
  .ol-popup-closer:after {
    content: "✖";
  }
  .ol-popup table tr > td b {
    margin-right: 10px;
  }
</style>
