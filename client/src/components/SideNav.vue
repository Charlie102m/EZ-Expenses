<template>
<!-- <nav class="nav">
    <v-layout align-center justify-space-between column fill-height text-center>
        <div class="nav-head">
            <router-link to="/profile">
                <v-img
                lazy-src="https://where-inc.com/wpradmin/template/enfold/images/no_agent.png"
                src="@/assets/66711277_10156148056800025_6782326558129389568_n.jpg"
                aspect-ratio="1"
                max-width="80"
                max-height="80"
                ></v-img>
            </router-link>
        </div>
        <div class="nav-body">
            <router-link to="/"><i class="material-icons">home</i></router-link>
            <router-link to="/trips"><i class="material-icons">directions_car</i></router-link>
            <router-link to="/expenses"><i class="material-icons">payment</i></router-link>
            <router-link to="/claims"><i class="material-icons">attach_money</i></router-link>
        </div>
        <div class="nav-footer">
            <router-link to="/profile"><i class="material-icons">settings</i></router-link>
        </div>
    </v-layout>
</nav> -->
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
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
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

      <v-list
        nav
      >
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
          <v-list>
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
export default {
name: 'SideNav',
    data() {
        return {
            drawer: true,
        // items: [
        //   { title: 'Home', icon: 'mdi-home-city' },
        //   { title: 'My Account', icon: 'mdi-account' },
        //   { title: 'Users', icon: 'mdi-account-group-outline' },
        // ],
        // mini: true,
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    }
}
</script>

<style>

    .is-active .material-icons, .v-list-item--active {
        color: #26A69A !important;
        /* transform: scale(1.1) */
    }

</style>
