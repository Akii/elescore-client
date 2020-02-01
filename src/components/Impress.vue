<template>
  <section>
    <v-layout row wrap>
      <v-container grid-list-xl>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline">Impressum</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <div class="row mb-5">
              <div class="col-12">
                <div class="row">
                  <div class="col-6">
                    <h3>Anbieter</h3>
                    <p>
                      Philipp Maier <br/>
                      Killisfeldstr. 36<br/>
                      76227 Karlsruhe
                    </p>
                  </div>
                  <div class="col-6">
                    <h3>Kontakt</h3>
                    <p>
                      Telefon: 0176 - 43266049<br/>
                      {{ email }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <h3 id="attributions" class="mb-3">Datenquellen &amp; Attributionen</h3>
                <h4>Datenquellen</h4>
                <p>
                  Die in diesem Portal angebotenen Daten basieren auf der <a href="https://developer.deutschebahn.com/store/apis/info?name=FaSta-Station_Facilities_Status&version=v2&provider=DBOpenData" target="_blank">FaSta API</a> welche durch die DB Station&Service AG unter der Lizenz <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a> bereitgestellt wird.
                </p>
                <p>
                  Die Daten werden mit eigenen Algorithmen aufbereitet und damit verändert. Für eine genauere Beschreibung wie und in welchem Umfang dies geschieht, kann der Source Code auf <a href="https://github.com/Akii/elescore">GitHub</a> eingesehen werden.
                </p>
                <p>
                  Es wird absolut keinerlei Gewähr auf die Richtigkeit der Daten gegeben.
                </p>

                <h3 class="mb-3">Haftungsausschluss</h3>
                <h4>Haftung für die Inhalte</h4>
                <p>
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                </p>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p>
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>

                <h4>Haftung für Links</h4>
                <p>
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
                <p>
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>

                <h4>Urheberrecht</h4>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
                <p>
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-layout>
  </section>
</template>

<script>
  export default {
    name: 'Impress',
    data () {
      return {
        email: 'Email: ' + ['elescore', 'akii.de'].join(String.fromCharCode(Math.round(Math.PI * (13.37 + 7))))
      }
    }
  }
</script>