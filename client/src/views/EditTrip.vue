<template>
    <div>
        <form v-on:submit.prevent="updateTrip">
            <input 
            type="text"
            v-model="trip.originName"
            placeholder="Where are you traveling from?"
            required>
            <input 
            type="text"
            v-model="trip.destinationName"
            placeholder="Where are you traveling to?"
            required>
            <button v-on:click.prevent="getDirections">Get Directions</button>
            <br>
            <input 
            type="date" 
            v-model="trip.tripDate"
            required>
            <input 
            type="text"
            v-model="trip.reason">
            <input type="submit"
            required>
        </form>
            <p>Date: {{ trip.tripDate }}</p>
            <p>Origin Name: {{ trip.originName }}</p>
            <p>Origin Address: {{ trip.originAddress }}</p>
            <p>Destination Name: {{ trip.destinationName }}</p>
            <p>Destination Address: {{ trip.destinationAddress }}</p>
            <p>Reason: {{ trip.reason }}</p>
            <p>Trip Distance: {{ trip.distance ? trip.distance : 0 }} miles</p>
            <p>Trip Duration: {{ trip.duration ? trip.duration / 60 : 0}} mins</p>  
        <div class="message-container" v-show="message">{{ message ? message : ""}}</div>
    </div>
</template>

<script>
import HttpService from '@/services/HttpService.js'
export default {
    props: ['tripId'],
    data (){
        return {
            directionsResponse: null,
            trip: {
                tripDate: null,
                originName: null,
                originAddress: null,
                destinationName: null,
                destinationAddress: null,
                reason: null,
                distance: null,
                duration: null,
                userId: 123456
            },
            message: null
        }
    },
    methods: {
        getDirections () {
            let waypoints = {
                origin: this.trip.originName,
                destination: this.trip.destinationName
            }
            HttpService.getDirections(waypoints)
                .then((response) => {
                    this.trip.originAddress = response.data.routes[0].legs[0].start_address
                    this.trip.destinationAddress = response.data.routes[0].legs[0].end_address
                    this.trip.distance = response.data.routes[0].legs[0].distance.value / 1609.34
                    this.trip.duration = response.data.routes[0].legs[0].duration.value / 60
                    this.message = "Directions retrieved successfully!"
                })
                .catch(error => this.message = error)
        },
        updateTrip () {
            HttpService.updateTrip(this.trip)
                .then(() => this.message = 'Trip updated successfully!')
                .catch(error => this.message = error)
        }
    },
    created() {
        HttpService.getTrip(this.tripId)
            .then(response => {
                this.trip.id = response.data.id
                this.trip.tripDate = response.data.tripDate
                this.trip.originName = response.data.originName
                this.trip.originAddress = response.data.originAddress
                this.trip.destinationName = response.data.destinationName
                this.trip.destinationAddress = response.data.destinationAddress
                this.trip.reason = response.data.reason
                this.trip.distance = response.data.distance
                this.trip.duration = response.data.duration
                this.trip.userId = response.data.userId

            })
            .catch(error => console.log(error))
    }
}
</script>

<style>
input[type="text"] {
    width: 300px;
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
