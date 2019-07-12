<template>
    <div>
        <v-form v-on:submit.prevent="addTrip">
            <v-container fill-height>
                <v-layout row wrap>
                    <v-flex lg4>
                        <v-date-picker v-model="trip.tripDate" :landscape="landscape" color="green lighten-1" no-title></v-date-picker>
                    </v-flex>
                    <v-flex lg8 mt-4>
                        <v-text-field
                        v-model="trip.originName"
                        label="Where are you traveling from?"
                        outline
                        required/>
                    <v-flex>
                        <v-text-field 
                        type="text"
                        v-model="trip.destinationName"
                        label="Where are you traveling to?"
                        outline
                        required/>
                    </v-flex >
                        <v-flex xs12 class="text-xs-right">
                            <v-card >
                                <v-card-text v-show="trip.distance" class="text-xs-left">
                                    <v-flex xs8>
                                        <p>Via: <strong>{{ summary ? summary : ''}}</strong></p>
                                        <span>Distance: {{ trip.distance ? trip.distance.toFixed(2) : 0 }} miles</span><br>
                                        <span>Est. Duration: {{ trip.duration ? trip.duration : 0}} mins</span>
                                    </v-flex>
                                    <v-flex xs4>
                                        <span>From: {{ trip.originAddress }}</span><br>
                                        <span>To: {{ trip.destinationAddress }}</span>
                                    </v-flex>
                                </v-card-text>
                            </v-card>
                            <v-btn v-on:click.prevent="getDirections" v-show="!trip.distance">Calculate Trip</v-btn>
                        </v-flex>
                    </v-flex>
                    <v-flex xs12 v-show="trip.duration">
                            <v-text-field
                            type="text"
                            v-model="trip.reason"
                            label="What is the reason for your trip?"
                            outline
                            required/>
                        <v-flex class="text-xs-right">
                            <v-btn type="submit"
                            required>Submit</v-btn>
                        </v-flex>
                    </v-flex>

                </v-layout>

            </v-container>
        </v-form>
        <div class="message-container" v-show="message">{{ message ? message : ""}}</div>
    </div>
</template>

<script>
import HttpService from '@/services/HttpService.js'
export default {
    data (){
        return {
            // picker: new Date().toISOString().substr(0, 10), 
            landscape: false,
            directionsResponse: null,
            summary: null,
            trip: {
                tripDate: new Date().toISOString().substr(0, 10), 
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
                    this.trip.duration = (response.data.routes[0].legs[0].duration.value / 60).toFixed(0)
                    this.summary = response.data.routes[0].summary
                })
                .catch(error => this.message = error)
        },
        addTrip () {
            HttpService.addTrip(this.trip)
                .then(() => this.$router.push("/trips"))
                .catch(error => this.message = error)
        }
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
