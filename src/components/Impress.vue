<template>
 <div class="container pt-3 pb-3">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <h2>Impressum</h2>
            <div class="row">
              <div class="col-6">
                <h3>Anbieter</h3>
                <p>
                  Philipp Maier <br/>
                  Tivoliplatz 1<br/>
                  76137 Karlsruhe
                </p>
              </div>
              <div class="col-6">
                <h3>Kontakt</h3>
                <p>
                  Telefon: ‭0151 - 10851486‬<br/>
                  {{ email }}
                </p>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <h3 id="attributions">Datenquellen & Attributionen</h3>
                <h4>Datenquellen</h4>
                <p>
                  Die in diesem Portal angebotenen Daten basieren auf der <a href="https://developer.deutschebahn.com/store/apis/info?name=FaSta-Station_Facilities_Status&version=v1&provider=DBOpenData&" target="_blank">FaSta API</a> welche durch die DB Station&Service AG unter der Lizenz <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a> bereitgestellt wird.
                </p>
                <p>
                  Die Daten werden mit eigenen Algorithmen aufbereitet und damit verändert. Für eine genauere Beschreibung wie und in welchem Umfang dies geschieht, kann der Source Code auf <a href="https://github.com/Akii/elescore">GitHub</a> eingesehen werden.
                </p>
                <p>
                  Es wird absolut keinerlei Gewähr auf die Richtigkeit der Daten gegeben.
                </p>

                <h4>Attributionen</h4>
                <p>
                  Die Marker für die Karte wurden zusammengestellt durch Material von:
                </p>
                <ul>
                  <li>"Map Marker" <a href="https://thenounproject.com/metalheads/">Abhimanyu Bose</a></li>
                  <li>"Elevator" <a href="https://thenounproject.com/coquet_adrien/">Adrien Coquet</a></li>
                  <li>"Escalator" <a href="https://thenounproject.com/royyanwijaya/">Royyan Wijaya</a></li>
                </ul>
                <p>
                  Lizenziert unter <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.
                </p>

                <h3>Haftungsausschluss</h3>
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

                <h4>Datenschutz</h4>
                <p>
                  Diese Webseite kann ohne Angabe der personenbezogenen Daten genutzt werden. Es werden keine Cookies verwendet.
                </p>

                <h4>Cloudflare</h4>
                <p>
                  Diese Website verwendet Cloudflare. Alle Anfragen, die Sie an diese Website schicken, können von Cloudflare eingesehen werden (auch Man-in-the-middle genannt). Cloudflare setzt einen Cookie "__cfduid". Wenn Sie damit nicht einverstanden sind bitte ich Sie die Website nicht weiter zu verwenden und sich an <a href="https://www.cloudflare.com">Cloudflare</a> zu wenden bezüglich der Löschung Ihrer Daten dort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
