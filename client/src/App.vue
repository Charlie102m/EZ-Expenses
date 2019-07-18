<template>
  <div id="app">
    <!-- <v-app> -->
      <v-app>
        <v-navigation-drawer>
          <SideNav/>
        </v-navigation-drawer>
        <v-toolbar app></v-toolbar>
        <v-content>
          <v-container fluid>
            <router-view></router-view>
          </v-container>
        </v-content>
        <v-footer app></v-footer>
      </v-app>
      <!-- <v-layout fill-height>
        <v-flex>
          
        </v-flex>
        <v-flex xs12 ma-2>
          <router-view/>
        </v-flex>
      </v-layout>
    </v-app> -->
  </div>
</template>

<script>
import SideNav from '@/components/SideNav.vue'
export default {
    components: {
    SideNav
  },
}
</script>


<style lang="scss">
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
</style>
