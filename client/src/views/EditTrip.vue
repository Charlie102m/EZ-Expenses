<template>
    <v-form v-on:submit.prevent="updateTrip">
        <h1 class="page-title font-weight-light">
        <i class="material-icons">directions_car</i>
        Edit Trip
        </h1>
        <v-alert
            class=""
            border="bottom"
            colored-border
            type="warning"
            elevation="2">
            Before editing your origin or destination, you must clear the trip summary for your existing trip by clicking the white X icon.
        </v-alert>
        <v-layout align-top justify-space-around row wrap>
            <v-flex lg5>
                <input
                v-on:keypress.enter.stop.prevent=""
                ref="autocomplete" 
                placeholder="Where was this trip from?" 
                class="search-location" 
                v-model="temp.origin"
                type="text"/>
                <input
                v-on:keypress.enter.stop.prevent=""
                ref="autocomplete2" 
                placeholder="Where was this trip to?" 
                class="search-location" 
                v-model="temp.destination"
                type="text"/>
                <v-flex text-right grow mt-3>
                    <v-btn 
                    rounded color="teal lighten-1" 
                    dark 
                    v-on:click.prevent="getDirections" 
                    v-show="!trip.distance">
                        <v-icon class="mr-2" dark>directions</v-icon><span>Calculate Route</span>
                    </v-btn>
                </v-flex>
                <v-flex grow v-show="trip.distance">
                    <v-card 
                    color="teal lighten-1"
                    class="pa-3">
                        <v-card-title class="pt-0">
                            <v-layout row wrap align-end justify-space-between>
                                <v-flex class="white--text">
                                    <h3 class="font-weight-light headline">Via: <strong class="font-weight-medium">{{ summary ? summary : ''}}</strong></h3>
                                </v-flex>
                                <v-flex text-xs-right shrink>
                                    <v-btn class="" text icon small color="white" v-on:click.prevent="closeResults">
                                        <v-icon>close</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-card-text class="text-xs-left white--text font-weight-light pt-0">
                            <v-layout row wrap align-center>
                                <v-flex lg6 mb-4 grow text-md-left text-xs-right>
                                    <h3 class="font-weight-light display-1">
                                        <strong class="font-weight-medium">{{ trip.distance ? trip.distance.toFixed(1) : 0 }}</strong> miles
                                    </h3>
                                </v-flex>
                                <v-flex md6 mb-4 grow text-md-left text-xs-right>
                                    <h3 class="font-weight-light display-1">
                                        <strong class="font-weight-medium">{{ trip.duration ? trip.duration : 0}}</strong> mins
                                    </h3>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap align-top>
                                <v-flex md6>
                                    <p><strong class="subtitle-1">From:</strong></p>
                                    <p><em>{{trip.originName}}</em></p>
                                    <p>{{ trip.originAddress }}</p>
                                </v-flex>
                                <v-flex md6>
                                    <p><strong class="subtitle-1">To:</strong></p>
                                    <p><em>{{trip.destinationName}}</em></p>
                                    <p>{{ trip.destinationAddress }}</p>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-flex>
            <v-flex lg5>
                <v-layout align-top justify-space-around row wrap mt-3 v-show="trip.distance">
                    <v-date-picker v-show="trip.distance" class="ma-3" v-model="trip.tripDate" full-width :landscape="$vuetify.breakpoint.smAndUp" color="teal lighten-1"></v-date-picker>
                </v-layout>
                <v-layout align-top justify-space-around row wrap mt-3 v-show="trip.distance">
                    <v-flex sm10 mr-2>
                        <input
                        type="number"
                        v-show="!defualtMilageToggle"
                        v-model="trip.milageRate"
                        placeholder="00.00"
                        required/>
                        <v-switch 
                        v-model="defualtMilageToggle"
                        v-show="defualtMilageToggle" 
                        label="Click toggle to change milage rate"
                        color="teal lighten-1"></v-switch>
                    </v-flex>
                    <v-flex sm10>
                        <input
                        type="text"
                        v-model="trip.reason"
                        placeholder="What is the reason for your trip?"
                        required/>
                    </v-flex>
                    <v-flex xs10 text-right mt-3 v-show="trip.reason">
                        <v-btn type="submit" rounded color="teal lighten-1" dark>
                            <v-icon class="mr-2" dark>send</v-icon>Submit
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <div class="message-container" v-show="message">{{ message ? message : ""}}</div>
    </v-form>
</template>

<script>
import { HttpService } from '@/services/HttpService.js'
export default {
    props: ['tripId'],
    data (){
        return {
            directionsResponse: null,
            summary: null,
            defualtMilageToggle: true,
            temp: {
                origin: null,
                destination: null
            },
            trip: {
                tripDate: null, 
                originName: null,
                originAddress: null,
                destinationName: null,
                destinationAddress: null,
                reason: null,
                distance: null,
                duration: null,
                milageRate: null,
                value: null,
                createdBy: null,
            },
            message: null
        }
    },
    methods: {
        getDirections () {
            let waypoints = {
                origin: this.trip.originAddress,
                destination: this.trip.destinationAddress
            }
            HttpService.getDirections(waypoints)
                .then((response) => {
                    this.trip.originAddress = response.data.routes[0].legs[0].start_address
                    this.trip.destinationAddress = response.data.routes[0].legs[0].end_address
                    this.trip.distance = response.data.routes[0].legs[0].distance.value / 1609.34
                    this.trip.duration = (response.data.routes[0].legs[0].duration.value / 60).toFixed(0)
                    this.summary = response.data.routes[0].summary
                    this.message = null
                })
                .catch((error) => {
                    this.$store.dispatch('setMessage', error.response)
                })
        },
        closeResults () {
            this.trip.distance = null
            return;
        },
        updateTrip () {
            this.trip.value = this.trip.milageRate * this.trip.distance
            HttpService.updateTrip(this.trip)
                .then(() => this.$router.push("/trips"))
                .catch((error) => {
                    this.$store.dispatch('setMessage', error.response)
                })
        }
    },
    computed :{
        origin () {
            return this.temp.origin;
        }, 
        destination () {
            return this.temp.destination;
        }
    },
    mounted () {
        // eslint-disable-next-line
        this.autocomplete = new google.maps.places.Autocomplete((this.$refs.autocomplete));
        // eslint-disable-next-line
        this.autocomplete2 = new google.maps.places.Autocomplete((this.$refs.autocomplete2));
        // parse auto complete response for origin field
        this.autocomplete.addListener('place_changed', () => {
            let origin = this.autocomplete.getPlace()
            this.trip.originName = origin.name
            this.temp.origin = origin.name + ' - ' + origin.formatted_address
            this.trip.originAddress = origin.formatted_address
        })
        // parse auto complete response for destination field
        this.autocomplete2.addListener('place_changed', () => {
            let destination = this.autocomplete2.getPlace()
            this.trip.destinationName = destination.name
            this.temp.destination = destination.name + ' - ' + destination.formatted_address
            this.trip.destinationAddress = destination.formatted_address
        })
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
                this.trip.milageRate = response.data.milageRate
                this.temp.origin = response.data.originName + ' - ' + response.data.originAddress
                this.temp.destination = response.data.destinationName + ' - ' + response.data.destinationAddress
                this.trip.createdBy = response.data.createdBy

            })
            .catch((error) => {
                this.$store.dispatch('setMessage', error.response)
            })
    }
}
</script>

<style>
    .message-container {
        line-height: 30px;
        width: 25%;
        border: 1px solid #ddd;
        text-align: center;
        border-radius: 3px;
        box-shadow: 3px 3px 10px #ddd;
    }
</style>
