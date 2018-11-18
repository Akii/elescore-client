<template>
  <section>
    <v-layout row wrap>
      <v-container grid-list-xl>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline">{{ $t('notFoundPage.header') }}</h3>
            </div>
          </v-card-title>
          <v-card-text>
            {{ $t('notFoundPage.body') }}
          </v-card-text>
        </v-card>
      </v-container>
    </v-layout>
  </section>
</template>