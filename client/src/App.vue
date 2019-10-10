<template>
  <div id="app">
    <v-app>
      <v-container fluid pa-0 fill-height :class="includeBackground">
        <v-layout>
          <v-flex shrink d-none d-md-flex v-if="showMenu">
            <SideNav v-if="showMenu"/>
          </v-flex>
          <v-flex class="max-height">
            <v-flex xs-12 d-flex d-md-none mb-5 v-if="showMenu">
              <MobileNav v-if="showMenu"/>
            </v-flex>
            <v-flex xs12 ml-5 pt-5 px-5 v-if="showMenu">
              <TopNav class="d-none d-md-flex" v-if="showMenu"/>
            </v-flex>
            <v-flex xs6 mx-auto>
              <Messages mt-5 v-if="messageExists"/>
            </v-flex>
            <router-view class="pa-5"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import MobileNav from '@/components/MobileNav.vue'
import SideNav from '@/components/SideNav.vue'
import TopNav from '@/components/TopNav.vue'
import Messages from '@/components/Messages.vue'
export default {
  name: 'App',
  components: {
    MobileNav,
    SideNav,
    TopNav,
    Messages
  },
  computed: {
    showMenu () {
      return this.$route.name !== 'login' && this.$route.name !== 'register';
    },
    includeBackground () {
      let className = ''
      if(this.$route.name === 'login' || this.$route.name === 'register') className = 'include_background'
      return className
    },
    messageExists () {
      return !!this.$store.state.message
    }
  }
}
</script>

<style lang="scss">
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }

  .max-height {
    overflow: auto;
    max-height: 100vh !important;
  }

  .include_background {
    background-image: url('./assets/dark-background.png');
    background-position: left top;
    background-repeat: no-repeat;
    background-size: cover;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  input[type="text"], input[type="email"], input[type="password"], input[type="number"] {
    width: 100% !important;
    line-height: 16px;
    font-size: 16px;
    border-bottom: 2px solid rgba(0,0,0,.54);
    border-radius: 0 !important;
    padding: 0 12px;
    margin-bottom: 10px;
    background: transparent !important;
    align-items: stretch;
    min-height: 56px;
    transition: all 0.2s ease-in;
  }

  .input-label {
    color: #757575
  }

  input[type="text"]:focus, input[type="email"]:focus, input[type="password"]:focus, input[type="number"]:focus, input[type="text"]:hover, input[type="email"]:hover, input[type="password"]:hover, input[type="number"]:hover {
      outline: none;
      border-bottom: 2px solid #26A69A;
      box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  }
  
  .page-title i {
    font-size: 40px;
  }

  .page-title {
    vertical-align: center;
    color: #2F303C;
    margin-bottom: 20px;
    font-size: 55px;
  }
</style>