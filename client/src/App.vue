<template>
  <div id="app">
    <v-app>
      <v-layout fill-height>
        <v-flex>
          <SideNav/>
        </v-flex>
        <v-flex xs12 ma-2 pa-5>
          <router-view/>
        </v-flex>
      </v-layout>
    </v-app>
  </div>
</template>

<script>
import SideNav from '@/components/SideNav.vue'
export default {
  name: 'App',
  components: {
    SideNav,
  },
  data: () => ({
    //
  }),
}
</script>

<style lang="scss">
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  input[type="text"], input[type="email"], input[type="password"] {
    width: 100% !important;
    line-height: 16px;
    font-size: 16px;
    border-bottom: 2px solid rgba(0,0,0,.54);
    padding: 0 12px;
    margin-bottom: 10px;
    background: transparent!important;
    align-items: stretch;
    min-height: 56px;
    transition: all 0.2s ease-in;
  }

  input[type="text"]:focus, input[type="email"]:focus, input[type="password"]:focus {
      outline: none;
      border-bottom: 2px solid #26A69A;
      box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  }
</style>