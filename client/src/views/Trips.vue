<template>
<div>
  <h1>Trips Page</h1>
  <table>
    <tr>
      <th>ID</th>
      <th>Origin</th>
      <th>Destination</th>
      <th>Date</th>
      <th>Est. Duration</th>
      <th>Distance</th>
      <th>Value</th>
    </tr>
    <tr v-for="trip in trips" :key="trip.id">
        <td>{{ trip.id }}</td>
        <td>{{ trip.originName }}</td>
        <td>{{ trip.destinationName }}</td>
        <td>{{ trip.tripDate }}</td>
        <td>{{ trip.duration }} mins</td>
        <td>{{ trip.distance }} miles</td>
        <td>£{{ (trip.distance * 0.13).toFixed(2) }}</td>
    </tr>
  </table>

</div>
</template>

<script>
import HttpService from '@/services/HttpService.js'
export default {
  data () {
    return {
      trips: []
    }
  },
  created() {
    HttpService.getTrips()
      .then(response => this.trips = response.data)
      .catch(error => console.log(error))
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
</style>
