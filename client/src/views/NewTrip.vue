<template>
    <v-form v-on:submit.prevent="addTrip">
        <h1 class="page-title font-weight-light text-no-wrap">
        <i class="material-icons">directions_car</i>
        New Trip
        </h1>
        <v-flex md8>
        <v-alert
          text
          type="success"
          color="teal"
        >
            Use the auto-complete search fields below to find you trip addresses. If you have saved your home & work addresses in the settings page, you can use the quick fill buttons to speed this process up!
        </v-alert>
        </v-flex>
        <v-layout align-top justify-space-around row wrap mx-1>
            <v-flex lg5>
                <p class="body-2 grey--text text--darken-2">Where was this trip from?</p>
                <v-flex mb-2 v-show="!trip.distance">
                        <v-btn rounded color="teal lighten-1" :dark="user.homeAddress ? true : false" :disabled="user.homeAddress ? false : true" @click="setDefualtAddress('origin', 'home')" class="mx-5">
                            <v-icon class="mr-2" dark>home</v-icon>Home
                        </v-btn>
                        <v-btn rounded color="teal lighten-1" :dark="user.workAddress ? true : false" :disabled="user.workAddress ? false : true && !trip.distance" @click="setDefualtAddress('origin', 'work')">
                            <v-icon class="mr-2" dark>work</v-icon>Work
                        </v-btn>
                </v-flex>
                <input
                v-on:keypress.enter.stop.prevent=""
                ref="autocomplete" 
                placeholder="Start typing to search for an address" 
                class="search-location mb-4" 
                v-model="temp.origin"
                type="text"/>
                <p class="body-2 grey--text text--darken-2">Where was this trip to?</p>
                <v-flex mb-2 v-show="!trip.distance">
                    <v-btn rounded color="teal lighten-1" :dark="user.homeAddress ? true : false" :disabled="user.homeAddress ? false : true" @click="setDefualtAddress('destination', 'home')" class="mx-5">
                        <v-icon class="mr-2" dark>home</v-icon>Home
                    </v-btn>
                    <v-btn rounded color="teal lighten-1" :dark="user.workAddress ? true : false" :disabled="user.workAddress ? false : true" @click="setDefualtAddress('destination', 'work')">
                        <v-icon class="mr-2" dark>work</v-icon>Work
                    </v-btn>
                </v-flex>
                <input
                v-on:keypress.enter.stop.prevent=""
                ref="autocomplete2" 
                placeholder="Start typing to search for an address" 
                class="search-location" 
                v-model="temp.destination"
                type="text"/>
                <v-flex text-right grow mt-3>
                    <v-btn 
                    rounded color="teal lighten-1" 
                    dark 
                    v-on:click.prevent="getDirections" 
                    v-show="!trip.distance && temp.origin && temp.destination">
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
                    <v-flex xs10>
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
// import $Scriptjs from 'scriptjs'
import { HttpService } from '@/services/HttpService.js'
export default {
    data (){
        return {
            directionsResponse: null,
            summary: null,
            defualtMilageToggle: true,
            autoReturn: false,
            user: {},
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
                createdBy: null,
            },
            message: null
        }
    },
    mounted () {
        HttpService.getUserProfile()
            .then(results => {
                this.user = results.data[0]
                this.trip.milageRate = results.data[0].milageValueDefualt
            })
            .catch(error => {
                this.$store.dispatch('setMessage', error.response)
            })
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
        setDefualtAddress (waypoint, savedLocation) {
            const argWaypointName = waypoint + 'Name'
            const argWaypointAddress = waypoint + 'Address'
            const argName = savedLocation + 'Name'
            const argAddress = savedLocation + 'Address'
            this.trip[argWaypointName] = this.user[argName]
            this.trip[argWaypointAddress] = this.user[argAddress]
            this.temp[waypoint] = this.user[argName] + ' - ' + this.user[argAddress]
        },
        getDirections () {
            let waypoints = {
                origin: this.trip.originAddress,
                destination: this.trip.destinationAddress
            }
            HttpService.getDirections(waypoints)
                .then((response) => {
                    this.$store.dispatch('clearMessage')
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
        addTrip () {
            this.trip.value = this.trip.milageRate * this.trip.distance
            this.trip.createdBy = this.$store.getters.userId
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
                        this.trip.reason = 'Return trip: ' + this.trip.reason
                        this.autoReturn = false
                        return this.addTrip()
                    }
                })
                .then(() => this.$router.push("/trips"))
                .catch((error) => {
                    this.$store.dispatch('setMessage', error.response)
                })
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
