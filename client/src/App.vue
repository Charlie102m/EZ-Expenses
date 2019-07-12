<template>
  <div id="app">
      <v-layout fill-height>
        <v-flex>
          <SideNav/>
        </v-flex>
        <v-flex xs12 ma-2>
          <router-view/>
        </v-flex>
      </v-layout>
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
