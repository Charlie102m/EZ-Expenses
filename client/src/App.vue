<template>
  <div id="app">
    <v-app>
      <v-container fluid pa-0 fill-height :class="className">
        <v-layout>
          <v-flex grow-shrink-0 v-if="showMenu">
            <SideNav v-if="showMenu"/>
          </v-flex>
          <v-flex mx-5 pa-5 shrink xs11>
          <v-flex >
            <Messages v-if="messageExists"/>
          </v-flex>
          <v-flex xs12>
            <TopNav v-if="showMenu"/>
          </v-flex>
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import SideNav from '@/components/SideNav.vue'
import TopNav from '@/components/TopNav.vue'
import Messages from '@/components/Messages.vue'
export default {
  name: 'App',
  components: {
    SideNav,
    TopNav,
    Messages
  },
  computed: {
    showMenu () {
      return this.$route.name !== 'login' && this.$route.name !== 'register';
    },
    className () {
      let className = ''
      if(this.$route.name === 'login' || this.$route.name === 'register') className = 'body'
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

  .body {
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

  input[type="text"]:focus, input[type="email"]:focus, input[type="password"]:focus, input[type="number"]:focus {
      outline: none;
      border-bottom: 2px solid #26A69A;
      box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  }
  
  .page-title i {
    font-size: 50px;
  }

  .page-title {
    vertical-align: center;
    color: #2F303C;
    margin-bottom: 50px;
    font-size: 70px;
  }
</style>