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
        :headers="headers"
        :items="trips"
        loading-text="Loading... Please wait"
        single-expand=true
        show-expand
        hide-default-footer
        class="table"
        no-data-text="There are no trips to display">
        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">{{ item.reason }}</td>
        </template>
        <template v-slot:item.duration="{ item }">
          {{ item.duration }} mins
        </template>
        <template v-slot:item.distance="{ item }">
          {{ item.distance }} miles
        </template>
        <template v-slot:item.value="{ item }">
          £{{ item.value.toFixed(2) }}
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon
              color="teal lighten-1"
              class="mr-2"
              @click="editTrip(item)">
              edit
            </v-icon>
          <v-icon
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
import HttpService from '@/services/HttpService.js'
export default {
  data () {
    return {
      headers: [
        {text: 'Date', value: 'tripDate'},
        {text: 'Origin', value: 'originName'},
        {text: 'Destination', value: 'destinationName'},
        {text: 'Duration', value: 'duration'},
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
      .catch(error => console.log(error))
  },
  methods: {
    deleteTrip (trip) {
      console.log(trip);
      HttpService.deleteTrip(trip)
        .then(() => {
          this.message = 'Trip deleted successfully'
          HttpService.getTrips()
            .then(response => this.trips = response.data)
            .then(() => {
              this.unclaimedTrips = this.trips.filter((obj) => obj.status === 'unclaimed').length;
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    },
    editTrip (trip) {
      console.log(trip);
      this.$router.push({name: "editTrip", params: { tripId: trip.id}})
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
