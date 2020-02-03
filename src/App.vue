<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center"></div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/yoannKy/inter-enchere"
        target="_blank"
        text
      >
        <span class="mr-2">Go to repo</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <home-component/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HomeComponent from '@/views/home/home.component';

export default Vue.extend({
  name: 'App',

  components: {
    HomeComponent,
  },

  data: () => ({
    //
  }),
});
</script>
