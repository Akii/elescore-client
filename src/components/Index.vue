<template>
<div>
  <section>
    <v-layout class="title-search" @click.self="searchDismissed = true" align-center justify-center row>
      <v-flex xs12 sm8>
        <div class="display-3 font-weight-bold black--text text-xs-center my-5 brand-header">
          <v-icon class="display-3 font-weight-bold black--text brand-header-icon">ele-elevator</v-icon>
          <span>Elescore</span>
        </div>

        <v-card class="elevation-3 card-search mr-2 ml-2">
          <v-card-text>
            <v-text-field
              solo
              v-model="search"
              autofocus
              hide-details
              :placeholder="$t('index.search.placeholder')"
              :loading="isLoading"
              @keyup.esc="search = ''"
              @focus="searchDismissed = false"
              :append-icon="search != '' ? 'clear' : undefined"
              @click:append="() => search = ''"
              ></v-text-field>
          </v-card-text>
        </v-card>

        <v-card class="elevation-3 mt-2 mr-2 ml-2 mb-5" v-if="!searchDismissed && performedSearch && noResults">
          <v-card-text>
            <template v-if="performedSearch.length < 3">
              {{ $t('index.search.errors.notEnoughCharacters') }}
            </template>
            <template v-else>
              {{ $t('index.search.errors.noResults') }}
            </template>
          </v-card-text>
        </v-card>

        <v-card class="elevation-3 mt-2 mr-2 ml-2 mb-5" v-if="!searchDismissed && searchResult.length > 0">
          <v-card-text>
            <v-list expand>
              <v-list-group
                v-for="result in searchResult"
                :key="result.object.id"
                :value="searchResult.length <= 3"
                :prepend-icon="result.object.getIcon()"
                lazy
                class="sticky-top"
              >
                <v-list-tile slot="activator">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ result.object.name }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon v-if="result.isDisrupted" class="warning--text pull-right">warning</v-icon>
                  </v-list-tile-action>
                </v-list-tile>

                <v-list-tile
                  v-for="facility in result.facilities"
                  :key="facility.id"
                  no-action
                  @click="showFacilityDetails(facility.id)"
                >
                  <v-list-tile-avatar>
                    <v-icon>{{ facility.getIcon() }}</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ facility.name || facility.id }}
                      <v-icon v-if="facility.isDisrupted" class="warning--text pull-right">warning</v-icon>
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-parallax :src="require('../assets/img/elescore_parallax_upper.jpg')"></v-parallax>
  </section>
  <section>
    <v-layout row wrap>
      <v-container grid-list-xl>
        <v-flex xs12>
          <v-card class="elevation-0 transparent">
            <v-card-title primary-title>
              <h2 class="display-2">{{ $t('index.about.title') }}</h2>
            </v-card-title>
            <v-card-text>
              <p>
                {{ $t('index.about.body') }}
              </p>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-divider />
        <v-flex xs12 mt-3>
          <v-container grid-list-xl>
            <v-layout row wrap align-start>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon class="xx-large primary--text">warning</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">{{ overallStats.disruptions.toLocaleString() }} {{ $t('index.facts.disruptions.title') }}</div>
                  </v-card-title>
                  <v-card-text>
                    {{ $t('index.facts.disruptions.text') }}
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon class="xx-large primary--text">ele-elevator</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">{{ overallStats.facilities.toLocaleString() }} {{ $t('index.facts.facilities.title') }}</div>
                  </v-card-title>
                  <v-card-text>
                    {{ $t('index.facts.facilities.text') }}
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon class="xx-large primary--text">place</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">{{ overallStats.objects.toLocaleString() }} {{ $t('index.facts.places.title') }}</div>
                  </v-card-title>
                  <v-card-text>
                    {{ $t('index.facts.places.text') }}
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-divider />
      </v-container>
    </v-layout>
  </section>
  <section>
    <v-parallax :src="require('../assets/img/elescore_parallax_lower.jpg')" height="380">
      <v-layout column align-center justify-center>
        <div class="headline white--text mb-3 text-xs-center">
          <v-icon class="xx-large warning--text">warning</v-icon>
        </div>
        <div class="headline white--text mb-3 text-xs-center">
          {{ overallStats.activeDisruptions }} {{ $t('index.teaser.disruptedFacilities') }}
        </div>
        <v-btn :to="{ name: 'disruptions' }" class="primary my-5" dark large>
          {{ $t('index.teaser.buttonText') }}
        </v-btn>
      </v-layout>
    </v-parallax>
  </section>
  <section>
    <v-flex xs12 mt-3>
      <v-container grid-list-xl>
        <v-layout row wrap align-start>
          <v-flex xs12 md4>
            <v-card class="elevation-0 transparent">
              <v-card-text class="text-xs-center">
                <v-icon class="xx-large primary--text">build</v-icon>
              </v-card-text>
              <v-card-title primary-title class="layout justify-center">
                <div class="headline text-xs-center">{{ $t('index.background.builtWith.title') }}</div>
              </v-card-title>
              <v-card-text>
                <p>
                  {{ $t('index.background.builtWith.paragraph1') }}
                </p>
                <p>
                  {{ $t('index.background.builtWith.paragraph2') }}
                </p>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 md4>
            <v-card class="elevation-0 transparent">
              <v-card-text class="text-xs-center">
                <v-icon class="xx-large primary--text">flash_on</v-icon>
              </v-card-text>
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">{{ $t('index.background.getInvolved.title') }}</div>
              </v-card-title>
              <v-card-text>
                <p>
                  {{ $t('index.background.getInvolved.paragraph1') }}
                </p>
                <p>
                  {{ $t('index.background.getInvolved.paragraph2') }}<br/>
                  E-Mail: {{ ['elescore', 'akii.de'].join(String.fromCharCode(Math.round(Math.PI * (13.37 + 7)))) }}
                </p>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 md4>
            <v-card class="elevation-0 transparent">
              <v-card-text class="text-xs-center">
                <font-awesome-icon :icon="['fab', 'github']" class="xx-large primary--text" />
              </v-card-text>
              <v-card-title primary-title class="layout justify-center">
                <div class="headline text-xs-center">{{ $t('index.background.openSource.title') }}</div>
              </v-card-title>
              <v-card-text>
                <p v-html="$t('index.background.openSource.paragraph1')"></p>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </section>
  <facility-details v-model="showFacilityDetailsFor"></facility-details>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  import FacilityDetails from './dialogs/FacilityDetails'
  import { debounce, sortBy } from 'lodash'

  export default {
    data () {
      return {
        search: '',
        performedSearch: '',
        isLoading: false,
        noResults: false,
        searchDismissed: false,
        searchResult: [],
        showFacilityDetailsFor: undefined
      }
    },
    watch: {
      search: debounce(function (newSearch) {
        this.isLoading = true
        this.noResults = false
        this.result = []

        this.findObjects(newSearch).then(results => {
          this.searchResult = this.sortResults(results)
          this.isLoading = false
          this.noResults = results.length == 0
          this.performedSearch = this.search
        })
      }, 250)
    },
    computed: mapGetters(['overallStats']),
    methods: {
      sortResults (results) {
        results.map(result => {
          result.facilities = sortBy(result.facilities, [(f) => !f.isDisrupted, 'name'])
          return result
        })

        return sortBy(results, [(res) => !res.isDisrupted, 'object.name'])
      },
      showFacilityDetails (facilityId) {
        this.showFacilityDetailsFor = facilityId
      },
      ...mapActions(['findObjects'])
    },
    components: { FacilityDetails }
  }
</script>
<style>
.brand-header {
  text-shadow: 1px 1px white;
}
.brand-header-icon {
  padding: 6px 0;
}
.title-search {
  position: absolute;
  top: 64px;
  z-index: 101;
  width: 100%;
}
.card-search {
  background: rgba(255, 255, 255, .8)!important;
}
.sticky-top div.v-list__group__header {
  position: -webkit-sticky;
  position: sticky;
  top: 64px;
  background-color: white;
  z-index: 101;
}
.sticky-top div.v-list__group__header:hover {
  background: #F2F2F2!important;
}
.sticky-top div.v-list__group__header--active {
  border-bottom: 1px solid grey;
}
</style>