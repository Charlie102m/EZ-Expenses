<template>
<div>
    <h1 class="page-title font-weight-light">
      <i class="material-icons">directions_car</i>
      Trips
    </h1>
    <v-layout align-center justify-space-around row>
      <v-flex ma-5>
        <h3 class="font-weight-light">
          You have <strong class="red--text text--lighten-1">{{ unclaimedTrips ? unclaimedTrips : 0 }}</strong> unclaimed trips!
        </h3>
      </v-flex>
      <v-flex text-right ma-5>
        <router-link to="/trips/new">
            <v-btn rounded color="teal lighten-1" dark>
              <v-icon class="mr-2" dark>add_circle</v-icon>New Trip
            </v-btn>
        </router-link>
      </v-flex>
    <v-flex xs12 class="table-container elevation-1 ">
      <v-data-table
        dark
        fixed-header
        :headers="headers"
        :items="trips"
        loading-text="Loading... Please wait"
        single-expand
        height="450"
        show-expand
        hide-default-footer
        disable-pagination
        class="table"
        no-data-text="There are no trips to display">
        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="subtitle-1 teal lighten-1">
            <span class="ml-5 pl-5">{{ item.reason }}</span>
            </td>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)" class="text-uppercase" dark>{{ item.status }}</v-chip>
        </template>
        <template v-slot:item.distance="{ item }">
          {{ item.distance }} miles
        </template>
        <template v-slot:item.value="{ item }">
          £{{ item.value.toFixed(2) }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon
            v-show="item.status == 'unclaimed'"
            color="teal lighten-1"
            class="mr-2"
            @click="editTrip(item)">
            edit
          </v-icon>
          <v-icon
            v-show="item.status == 'unclaimed'"
            color="teal lighten-1"
            @click="deleteTrip(item)">
            delete
          </v-icon>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
  <div class="message-container" v-show="message">{{ message ? message : ""}}</div>
</div>
</template>

<script>
import { HttpService } from '@/services/HttpService.js'
export default {
  data () {
    return {
      headers: [
        {text: 'Date', value: 'tripDate'},
        {text: 'Origin', value: 'originName'},
        {text: 'Destination', value: 'destinationName'},
        {text: 'Status', value: 'status', align: 'center'},
        {text: 'Distance', value: 'distance'},
        {text: 'Value', value: 'value'},
        {text: 'Actions', value: 'action', sortable: false }
      ],
      trips: [],
      unclaimedTrips: null,
      message: null
    }
  },
  created() {
    HttpService.getTrips()
      .then(response => this.trips = response.data)
      .then(() => {
        this.unclaimedTrips = this.trips.filter((obj) => obj.status === 'unclaimed').length;
      })
      .catch((error) => {
          this.$store.dispatch('setMessage', error.response)
      })
  },
  methods: {
    deleteTrip (trip) {
      HttpService.deleteTrip(trip)
        .then(() => {
          HttpService.getTrips()
            .then(response => this.trips = response.data)
            .then(() => {
              this.unclaimedTrips = this.trips.filter((obj) => obj.status === 'unclaimed').length;
            })
            .catch((error) => {
                this.$store.dispatch('setMessage', error.response)
            })
        })
        .catch((error) => {
            this.$store.dispatch('setMessage', error.response)
        })
    },
    editTrip (trip) {
      this.$router.push({name: "editTrip", params: { tripId: trip.id}})
    },
    getColor(status) {
      if (status == 'unclaimed') return 'red'
      else return 'green'
    }
  }
}
</script>

<style scoped>
  .message-container {
      line-height: 30px;
      width: 25%;
      border: 1px solid #ddd;
      text-align: center;
      border-radius: 3px;
      box-shadow: 3px 3px 10px #ddd;
  }
</style>
