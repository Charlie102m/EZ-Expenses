<template>
<div>
  <h1>Trips Page</h1>
  <router-link to="/trips/new"><i class="fas fa-car"></i></router-link>
    <v-data-table
    :headers="headers"
    :items="trips"
    class="elevation-1"
    hide-actions
    >
    <template v-slot:no-data>
      <v-alert :value="true" type="error" icon="warning">
        Sorry, nothing to display here :(
      </v-alert>
    </template>
    <template v-slot:items="props">
      <td>{{ props.item.tripDate }}</td>
      <td class="text-xs-left"><strong>{{ props.item.originName }}</strong><br>
          {{ props.item.originAddress }}</td>
      <td class="text-xs-left"><strong>{{ props.item.destinationName }}</strong><br>
          {{ props.item.destinationAddress }}</td>
      <td class="text-xs-left">{{ props.item.duration }} mins</td>
      <td class="text-xs-left">{{ props.item.distance }} miles</td>
      <td class="text-xs-left">£{{ props.item.value }}</td>
      <td class="text-xs-left">
        <router-link :to="{ name: 'editTrip', params: { tripId: props.item.id}}">
          <i class="far fa-edit"></i>
        </router-link>
          <i class="far fa-trash-alt" v-on:click="deleteTrip(props.item)"></i></td>
    </template>
  </v-data-table>
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
        {text: 'duration', value: 'duration'},
        {text: 'distance', value: 'distance'},
        {text: 'Value', value: 'value'},
        {text: 'Actions', sortable: false }
      ],
      trips: [],
      message: null
    }
  },
  created() {
    HttpService.getTrips()
      .then(response => this.trips = response.data)
      .then(() => console.log(this.trips))
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
  .far:hover {
    cursor: pointer;
  }
  .far {
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
</style>
