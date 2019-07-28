<template>
    <v-form v-on:submit.prevent="addTrip">
        <v-layout align-top justify-space-around row wrap>
            <v-flex lg5 class="get-directions-fields">
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
                    <v-date-picker v-show="trip.distance" v-model="trip.tripDate" :landscape="landscape" color="teal lighten-1"></v-date-picker>
                </v-layout>
                <v-layout align-top justify-space-around row wrap mt-3 v-show="trip.distance">
                    <v-flex xs4>
                        <input
                        type="number"
                        v-show="!defualtMilageToggle"
                        v-model="trip.milageRate"
                        required/>
                        <v-switch v-model="defualtMilageToggle" v-show="defualtMilageToggle" label="Use default milage rate?" color="teal lighten-1"></v-switch>
                    </v-flex>
                    <v-flex xs4>
                        <v-switch v-model="autoReturn" label="Auto create return trip?" color="teal lighten-1"></v-switch>
                    </v-flex>
                    <v-flex xs12>
                        <input
                        type="text"
                        v-model="trip.reason"
                        placeholder="What is the reason for your trip?"
                        required/>
                    </v-flex>
                    <v-flex text-right mt-3 v-show="trip.reason">
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
// import $Scriptjs from 'scriptjs'
import HttpService from '@/services/HttpService.js'
export default {
    data (){
        return {
            landscape: true,
            directionsResponse: null,
            summary: null,
            defualtMilageToggle: true,
            autoReturn: false,
            temp: {
                origin: null,
                destination: null
            },
            trip: {
                tripDate: new Date().toISOString().substr(0, 10), 
                originName: null,
                originAddress: null,
                destinationName: null,
                destinationAddress: null,
                reason: null,
                distance: null,
                duration: null,
                milageRate: 0.45,
                value: null,
                createdBy: 1,
            },
            message: null
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
    methods: {
        getDirections () {
            let waypoints = {
                origin: this.trip.originAddress,
                destination: this.trip.destinationAddress
            }
            HttpService.getDirections(waypoints)
                .then((response) => {
                    console.log(response)
                    this.trip.originAddress = response.data.routes[0].legs[0].start_address
                    this.trip.destinationAddress = response.data.routes[0].legs[0].end_address
                    this.trip.distance = response.data.routes[0].legs[0].distance.value / 1609.34
                    this.trip.duration = (response.data.routes[0].legs[0].duration.value / 60).toFixed(0)
                    this.summary = response.data.routes[0].summary
                    this.message = null
                })
                .catch(error => this.message = error)
        },
        addTrip () {
            this.trip.value = this.trip.milageRate * this.trip.duration
            HttpService.addTrip(this.trip)
                .then(() => {
                    if (this.autoReturn === true) {
                        let newWaypoints = {
                            originName: this.trip.destinationName,
                            originAddress: this.trip.destinationAddress,
                            destinationName: this.trip.originName,
                            destinationAddress: this.trip.originAddress
                        }
                        this.trip.originName = newWaypoints.originName
                        this.trip.originAddress = newWaypoints.originAddress
                        this.trip.destinationName = newWaypoints.destinationName
                        this.trip.destinationAddress = newWaypoints.destinationAddress
                        this.autoReturn = false
                        return this.addTrip()
                    }
                })
                .then(() => this.$router.push("/trips"))
                .catch(error => this.message = error)
        },
        closeResults () {
            this.trip.distance = null
            return;
        }
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
