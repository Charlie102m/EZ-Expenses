<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      style="border-radius: 0;"
      expand-on-hover
      permanent
      dark
      height="100vh"
    >
     <template v-slot:prepend>
        <v-list class="mt-5">
          <v-list-item>
            <v-list-item-avatar class="mx-auto">
              <v-img :src="profileImage"
                alt="https://where-inc.com/wpradmin/template/enfold/images/no_agent.png"></v-img>
            </v-list-item-avatar>
          </v-list-item>
          <v-list-item
            two-line
          >
            <v-list-item-content>
              <v-list-item-title class="title">{{ user.firstName }} {{ user.lastName }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
       <v-divider class="mb-5"></v-divider>
      <v-list shaped>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon large>home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item link to="/trips">
          <v-list-item-icon>
            <v-icon large>directions_car</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Trips</v-list-item-title>
        </v-list-item>

        <v-list-item link to="/expenses">
          <v-list-item-icon>
            <v-icon large>payment</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Expenses</v-list-item-title>
        </v-list-item>

        <v-list-item link to="/claims">
          <v-list-item-icon>
            <v-icon large>attach_money</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Claims</v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
          <v-list shaped>
              <v-list-item link to="/profile">
                  <v-list-item-icon>
                      <v-icon large>settings</v-icon>
                  </v-list-item-icon>
          <v-list-item-title>Settings</v-list-item-title>
              </v-list-item>
          </v-list>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { HttpService } from '@/services/HttpService.js'
export default {
name: 'SideNav',
    data() {
        return {
            drawer: true,
            profileImage: 'https://where-inc.com/wpradmin/template/enfold/images/no_agent.png'
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    mounted () {
    HttpService.getUserProfile()
        .then((response) => {
            this.profileImage = response.data[0].profileImageUrl
        })
        .catch((error) => {
            this.$store.dispatch('setMessage', error.response)
        })
    }
}
</script>

<style>

    .is-active .material-icons, .v-list-item--active {
        color: #26A69A !important;
        /* transform: scale(1.1) */
    }

</style>
