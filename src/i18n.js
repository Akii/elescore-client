const reasons = {
  'en': {
    'UnderConstruction': 'Under construction',
    'MonitoringDisrupted': 'Monitoring disrupted',
    'UnderMaintenance': 'Under maintenance',
    'NotAvailable': 'Not available',
    'MonitoringNotAvailable': 'Monitoring not available'
  },
  'de': {
    'UnderConstruction': 'In Reparatur',
    'MonitoringDisrupted': 'Fernüberwachung gestört',
    'UnderMaintenance': 'In Wartung',
    'NotAvailable': 'Nicht verfügbar',
    'MonitoringNotAvailable': 'Fernüberwachung nicht verfügbar'
  }
}

const disruptionTableHeaders = {
  'en': {
    'disruptionId': 'Disruption Id',
    'placeFacility': 'Place / Facility',
    'reason': 'Reason',
    'disruptedOn': 'Disrupted On',
    'resolvedOn': 'Resolved On',
    'duration': 'Duration'
  },
  'de': {
    'disruptionId': 'Störungs-Id',
    'placeFacility': 'Ort / Gerät',
    'reason': 'Grund',
    'disruptedOn': 'Gestört am',
    'resolvedOn': 'Beseitigt am',
    'duration': 'Dauer'
  }
}

export const messages = {
  'en': {
    'general': {
      'day': 'day',
      'days': 'days',
      'hour': 'hour',
      'hours': 'hours',
      'sources': {
        'DB': 'Deutsche Bahn',
        'BOG': 'Bogestra'
      }
    },
    'app': {
      'meta': {
        'title': 'Disruption analysis for elevators and escalators'
      },
      'toolbar': {
        'disruptions': 'Disruptions',
        'map': 'Map',
        'stats': 'Stats',
        'favorites': 'Favorites',
        'options': 'Options',
        'logout': 'Logout',
        'login': 'Login'
      },
      'impress': 'Impress',
      'privacy-policy': 'Privacy Policy'
    },

    'index': {
      'search': {
        'placeholder': 'Search by station names, cities, addresses, ...',
        'errors': {
          'notEnoughCharacters': 'Please type at least 3 characters.',
          'noResults': 'No places or facilities found matching this search.'
        }
      },
      'about': {
        'title': 'About Elescore',
        'body': `Elescore is a platform that offers advanced insights and statistics about elevators and escalators.
                It started as a personal project, providing me with notifications and information for my daily commute.
                Now, a year later, it has become a platform for consumers and producers, delivering
                insight into facilities, their outages, and more.`
      },
      'facts': {
        'disruptions': {
          'title': 'Disruptions',
          'text': `... and counting! With every new disruption, Elescore gains more insight into how facilities operate.
                  From this data, various important facts like the average disruption duration can be calculated.
                  At some point, Elescore might even be able to predict outages!`
        },
        'facilities': {
          'title': 'Facilities',
          'text': `These are elevators and escalators. Elescore includes several external sources and keeps every facility status up-to-date.
                  Additionally, Elescore grades facilities. This helps you to get an intuition on how reliable a facility is.`
        },
        'places': {
          'title': 'Places',
          'text': `Elevators and escalators are installed at places. A place could be an address, a train station or a city.
                  The more places Elescore covers, the more information is available for people who visit those places and require accessibility!`
        }
      },
      'teaser': {
        'disruptedFacilities': ' facilities are currently disrupted',
        'buttonText': 'Check out all disruptions'
      },
      'background': {
        'builtWith': {
          'title': 'Built with Haskell and Vue',
          'paragraph1': 'Haskell is an advanced purely-functional programming language. Its code is declarative and statically typed.',
          'paragraph2': `Vue.js is "The Progressive JavaScript Framework".
                        Vuetify is an implementation of the Material Design specification by Google for Vue.`
        },
        'getInvolved': {
          'title': 'Get Involved',
          'paragraph1': 'If you you\'re missing facilities on the platform, or have ideas about additional sources to integrate, please do contact me!',
          'paragraph2': 'Likewise, if you can provide disruption data for Elescore, get in touch! I can integrate almost everything.'
        },
        'openSource': {
          'title': '100% Open Source',
          'paragraph1': `Elescore is completely open source. You can check out the Haskell backend implementation <a href="https://github.com/Akii/elescore">here</a>.
                        The Elescore Client, which is built with Vue and Vuetify, is available <a href="https://github.com/Akii/elescore-client">here</a>.
                        Please note that issues can only be created in the Elescore backend project.`
        }
      }
    },

    'disruptions': {
      'meta': {
        'title': 'Disruptions'
      },
      'header': 'Disruptions',
      'tableHeaders': disruptionTableHeaders.en,
      'reasons': reasons.en
    },

    'map': {
      'meta': {
        'title': 'Active disruption map'
      },
      'disruptionId': 'Disruption Id',
      'object': 'Object',
      'elevator': 'Elevator',
      'escalator': 'Escalator',
      'durationSoFar': 'Duration',
      'status': 'Status',
      'facilityType': {
        'Elevator': 'Elevator',
        'Escalator': 'Escalator'
      },
      'reasons': reasons.en
    },

    'notFoundPage': {
      'header': '404 Not Found',
      'body': 'The requested page does not exist. Please use the navigation or browser history to go somewhere else.'
    },

    'stats': {
      'meta': {
        'title': 'Statistics'
      },

      'header': 'Statistics',
      'graph': {
        'headline': 'Disrupted facilities per day',
        'subheading': 'average, previous 30 days',
        'label': ' Disruptions'
      },
      'disruptions': 'Disruptions',
      'facilities': 'Facilities',
      'places': 'Places',
      'longesDisruptions': 'Top 10 longest disruptions',
      'recentlyResolved': 'Recently resolved disruptions',
      'tableHeaders': disruptionTableHeaders.en
    },

    'facilityDetails': {
      'tableHeaders': disruptionTableHeaders.en,
      'resolved': 'resolved',
      'close': 'Close',
      'disruptions': 'Disruptions',
      'notFound': {
        'title': 'Not Found',
        'text': 'A facility with id "{id}" does not exist.'
      },
      'generalInfo': {
        'title': 'General Information',
        'facilityId': 'Facility Id:',
        'place': 'Place:',
        'type': 'Type:',
        'facilityType': {
          'Elevator': 'Elevator',
          'Escalator': 'Escalator'
        },
        'dataSource': 'Data Source:',
        'noDisruptions': '# Disruptions:'
      },
      'grading': {
        'title': 'Grade',
        'downTimeLast30Days': 'Downtime in the last 30 days:',
        'explanation': 'Grades are calculated based on the outage in the last 30 days:',
        'grade': 'Grade'
      }
    }
  },
  'de': {
    'general': {
      'day': 'Tag',
      'days': 'Tage',
      'hour': 'Stunde',
      'hours': 'Stunden',
      'sources': {
        'DB': 'Deutsche Bahn',
        'BOG': 'Bogestra'
      }
    },
    'app': {
      'meta': {
        'title': 'Störungsanalyse für Aufzüge und Rolltreppen'
      },
      'toolbar': {
        'disruptions': 'Störungen',
        'map': 'Karte',
        'stats': 'Statistiken',
        'favorites': 'Favoriten',
        'options': 'Optionen',
        'logout': 'Logout',
        'login': 'Login'
      },
      'impress': 'Impressum',
      'privacy-policy': 'Datenschutz'
    },

    'index': {
      'search': {
        'placeholder': 'Suche nach Bahnhöfen, Städten, Adressen, ...',
        'errors': {
          'notEnoughCharacters': 'Bitte mindestens 3 Buchstaben eingeben.',
          'noResults': 'Keine Orte oder Geräte gefunden die der Suche entsprechen.'
        }
      },
      'about': {
        'title': 'Über Elescore',
        'body': `Elescore ist eine Platform welche fortgeschrittene Einblicke und Statistiken über Aufzüge und Rolltreppen anbietet.
                Es begann als persönliches Projekt mit welchem ich Notifikationen und Informationen über Geräte auf meinem Arbeitsweg erhielt.
                Jetzt, ein Jahr später, ist es zu einer Platform geworden die für Benutzer und Hersteller Daten über Geräte, deren Ausfälle, und mehr bereitstellt.`
      },
      'facts': {
        'disruptions': {
          'title': 'Störungen',
          'text': `Mit jeder neuen Störung kann Elescore mehr Informationen über das Verhalten von Aufzügen und Rolltreppen erlangen.
                  Von den Störungsdaten werden mehrere wichtige Kennzahlen, wie z. B. die durchschnittliche Ausfalldauer, abgeleitet.
                  In der nahen Zukunft kann Elescore eventuell sogar Ausfälle voraussagen!`
        },
        'facilities': {
          'title': 'Geräte',
          'text': `Geräte sind Aufzüge oder Rolltreppen. Elescore bindet mehrere externe Quellen an und hält den Störungsstatus aller Geräte immer auf dem aktuellen Stand.
                  Darüber hinaus vergibt Elescore Noten für Geräte um eine grobe Vorstellung über deren Verlässlichkeit zu vermitteln.`
        },
        'places': {
          'title': 'Orte',
          'text': `Aufzüge und Rolltreppen sind an Orten installiert. Zu Orten gehören z. B. Adressen, Haltestellen oder Städte.
                  Je mehr Orte in Elescore erfasst sind, desto mehr Informationen können für Leute bereit gestellt werden die auf barrierefreiheit
                  angewiesen sind!`
        }
      },
      'teaser': {
        'disruptedFacilities': ' Geräte stehen derzeit still',
        'buttonText': 'Alle Störungen ansehen'
      },
      'background': {
        'builtWith': {
          'title': 'Mit Haskell und Vue gemacht',
          'paragraph1': 'Haskell ist eine fortgeschrittene, ausschließlich funktionale Programmiersprache. Ihr Code ist deklarativ und statisch typisiert.',
          'paragraph2': `Vue.js ist "Das Progressive JavaScript Framework".
                        Vuetify ist eine Implementierung der Material Design Spezifikation von Google für Vue.`
        },
        'getInvolved': {
          'title': 'Mach mit',
          'paragraph1': 'Wenn Dir Aufzüge fehlen oder du andere Quellen für Aufzüge kennst, kontaktiere mich!',
          'paragraph2': 'Ebenso, wenn Du Daten über Aufzüge für Elescore zur Verfügung stellen willst, kontaktiere mich! Ich kann so gut wie alles anbinden.'
        },
        'openSource': {
          'title': '100% Open Source',
          'paragraph1': `Elescore ist komplett open source. Die Implementierung des Backends in Haskell findest du <a href="https://github.com/Akii/elescore">hier</a>.
                        Der Elescore Client, welcher mit Vue und Vuetify implementiert wurde, ist <a href="https://github.com/Akii/elescore-client">hier verfügbar</a>.
                        Bitte beachte, dass Issues nur im Elescore Backend Projekt angelegt werden können.`
        }
      }
    },

    'disruptions': {
      'meta': {
        'title': 'Störungen'
      },
      'header': 'Störungen',
      'tableHeaders': disruptionTableHeaders.de,
      'reasons': reasons.de
    },

    'map': {
      'meta': {
        'title': 'Störungskarte'
      },
      'disruptionId': 'Störungs-Id',
      'object': 'Ort',
      'elevator': 'Aufzug',
      'escalator': 'Rolltreppe',
      'durationSoFar': 'Dauer',
      'status': 'Status',
      'facilityType': {
        'Elevator': 'Aufzug',
        'Escalator': 'Rolltreppe'
      },
      'reasons': reasons.de
    },

    'notFoundPage': {
      'header': '404 Not Found',
      'body': 'Die angefrage Seite existiert nicht. Bitte benutzen Sie die Browser Historie oder die Navigation um woanders hin zu navigieren.'
    },

    'stats': {
      'meta': {
        'title': 'Statistiken'
      },

      'header': 'Statistiken',
      'graph': {
        'headline': 'Störungen pro Tag',
        'subheading': 'Durchschnitt, vergangene 30 Tage',
        'label': ' Störungen'
      },
      'disruptions': 'Störungen',
      'facilities': 'Geräte',
      'places': 'Orte',
      'longesDisruptions': 'Top 10 längste Störungen',
      'recentlyResolved': 'Zuletzt beseitigte Störungen',
      'tableHeaders': disruptionTableHeaders.de
    },

    'facilityDetails': {
      'tableHeaders': disruptionTableHeaders.de,
      'resolved': 'resolved',
      'close': 'Schließen',
      'disruptions': 'Störungen',
      'notFound': {
        'title': 'Nicht gefunden',
        'text': 'Ein Gerät mit der id  "{id}" konnte nicht gefunden werden.'
      },
      'generalInfo': {
        'title': 'Allgemeine Informationen',
        'facilityId': 'Geräte-Id:',
        'place': 'Ort:',
        'type': 'Art:',
        'facilityType': {
          'Elevator': 'Aufzug',
          'Escalator': 'Rolltreppe'
        },
        'dataSource': 'Datenquelle:',
        'noDisruptions': '# Störungen:'
      },
      'grading': {
        'title': 'Note',
        'downTimeLast30Days': 'Ausfall in den letzten 30 Tagen:',
        'explanation': 'Noten sind auf Basis der Ausfälle in den letzten 30 Tagen kalkuliert:',
        'grade': 'Note'
      }
    }
  }
}
