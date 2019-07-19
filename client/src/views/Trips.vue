<template>
<div>
  <v-layout row wrap>
    <v-flex xs12>
      <h1 class="page-title font-weight-light">
        <i class="material-icons">directions_car</i>
        Trips
      </h1>
    </v-flex>
    <v-layout align-center justify-space-between row fill-height mb-3>
      <v-flex>
        <h3 class="font-weight-light">
          You have <strong class="red--text text--lighten-1">{{ unclaimedTrips ? unclaimedTrips : 0 }}</strong> unclaimed trips!
        </h3>
      </v-flex>
      <v-flex text-xs-right>
        <router-link to="/trips/new">
            <v-btn round color="teal lighten-1" dark>
              <v-icon class="mr-2" dark>add_circle</v-icon>New Trip
            </v-btn>
        </router-link>
      </v-flex>
    </v-layout>
    <v-flex xs12 class="table-container elevation-1 ">
        <v-data-table
        :headers="headers"
        :items="trips"
        class="table"
        hide-actions
        no-data-text="There are no trips to display"
        disable-initial-sort
        >
          <template v-slot:items="props">
            <td>{{ props.item.tripDate }}</td>
            <td class="text-xs-left">
              <strong>{{ props.item.originName }}</strong><br>
              <span class="">{{ props.item.originAddress }}</span>
            </td>
            <td class="text-xs-left">
              <strong>{{ props.item.destinationName }}</strong><br>
              <span class="">{{ props.item.destinationAddress }}</span>
            </td>
            <td class="text-xs-left">{{ props.item.duration }} mins</td>
            <td class="text-xs-left">{{ props.item.distance }} miles</td>
            <td class="text-xs-left">£{{ props.item.value }}</td>
            <td class="text-xs-center">
            <router-link :to="{ name: 'editTrip', params: { tripId: props.item.id}}">
              <v-btn fab dark small flat color="primary">
                <v-icon dark>edit</v-icon>
              </v-btn>
            </router-link>
                <v-btn fab dark small flat color="red lighten-1" v-on:click="deleteTrip(props.item)">
                  <v-icon dark>delete</v-icon>
                </v-btn>
            </td>
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
        {text: 'Actions', sortable: false, align: 'center', width: '160px' }
      ],
      trips: [],
      unclaimedTrips: null,
      message: null
    }
  },
  created() {
    HttpService.getTrips()
      .then(response => this.trips = response.data)
      .then(() => console.log(this.trips))
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
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>
  .table-actions:hover {
    cursor: pointer;
  }

  .table-actions {
    margin: 5px;
    padding: 8px;
    background-color: darkblue;
    border-radius: 50%;
    color: white
  }

  .message-container {
      line-height: 30px;
      width: 25%;
      border: 1px solid #ddd;
      text-align: center;
      border-radius: 3px;
      box-shadow: 3px 3px 10px #ddd;
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

  .table-container {
    max-height: 400px;
    overflow-y: scroll;
  }
</style>
