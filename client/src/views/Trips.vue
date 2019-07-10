<template>
<div>
  <h1>Trips Page</h1>
  <table>
    <tr>
      <th>Date</th>
      <th>Origin</th>
      <th>Destination</th>
      <th>Est. Duration</th>
      <th>Distance</th>
      <th>Value</th>
      <th>Actions</th>
    </tr>
    <tr v-for="trip in trips" :key="trip.id">
        <td>{{ trip.tripDate }}</td>
        <td>{{ trip.originName }}</td>
        <td>{{ trip.destinationName }}</td>
        <td>{{ trip.duration }} mins</td>
        <td>{{ trip.distance }} miles</td>
        <td>£{{ (trip.distance * 0.13).toFixed(2) }}</td>
        <td>
          <router-link :to="{ name: 'editTrip', params: { tripId: trip.id}}">
            <i class="far fa-edit"></i>
          </router-link>
            <i class="far fa-trash-alt" v-on:click="deleteTrip(trip)"></i>
        </td>
    </tr>
  </table>
  <div class="message-container" v-show="message">{{ message ? message : ""}}</div>
</div>
</template>

<script>
import HttpService from '@/services/HttpService.js'
export default {
  data () {
    return {
      trips: [],
      message: null
    }
  },
  created() {
    HttpService.getTrips()
      .then(response => this.trips = response.data)
      .catch(error => console.log(error))
  },
  methods: {
    deleteTrip (trip) {
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
  table {
    border-collapse: collapse;
    width: 100%;
    text-align: left;
    
  }

  table, th, td {
    border: 1px solid #ddd;
    padding-left: 15px;
  }
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
