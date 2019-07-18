<template>
    <div>
        <v-form v-on:submit.prevent="addTrip">
            <v-container fill-height>
                <v-layout row wrap>
                    <v-flex md4>
                        <v-date-picker v-model="trip.tripDate" :landscape="landscape" color="green lighten-1" no-title></v-date-picker>
                    </v-flex>
                    <v-flex md8 mt-4 class="get-directions-fields">
                        <input
                        v-on:keypress.enter.stop.prevent=""
                        ref="autocomplete" 
                        placeholder="Where are you traveling to?" 
                        class="search-location" 
                        v-model="temp.origin"
                        type="text"/>
                    
                    <v-flex>
                        <input
                        v-on:keypress.enter.stop.prevent=""
                        ref="autocomplete2" 
                        placeholder="Where are you traveling to?" 
                        class="search-location" 
                        v-model="temp.destination"
                        type="text"/>
                    </v-flex >
                        <v-flex xs12>
                            <v-card >
                                <v-card-text v-show="trip.distance" class="text-xs-left">
                                    <v-layout row wrap class="summary-header">
                                    <v-flex xs6>
                                        <div>Via: <strong>{{ summary ? summary : ''}}</strong></div>
                                    </v-flex>
                                    <v-flex xs6 class="text-xs-right">
                                        <div>
                                            <p>
                                                <strong>{{ trip.distance ? trip.distance.toFixed(1) : 0 }}</strong> miles
                                            </p>
                                            <p>
                                                <strong>{{ trip.duration ? trip.duration : 0}}</strong> mins
                                            </p>
                                        </div>
                                    </v-flex>
                                    <v-flex xs6>
                                        <p><strong>From:</strong></p>
                                        <p><em>{{trip.originName}}</em></p>
                                        <p>{{ trip.originAddress }}</p>
                                    </v-flex>
                                    <v-flex xs6>
                                        <p><strong>To:</strong></p>
                                        <p><em>{{trip.destinationName}}</em></p>
                                        <p>{{ trip.destinationAddress }}</p>
                                    </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                            <v-btn v-on:click.prevent="getDirections" v-show="!trip.distance">Calculate Trip</v-btn>
                        </v-flex>
                    </v-flex>
                    <v-flex xs12 v-show="trip.distance">
                            <input
                            type="text"
                            v-model="trip.reason"
                            placeholder="What is the reason for your trip?"
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
            landscape: false,
            directionsResponse: null,
            summary: null,
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
                createdBy: 1
            },
            message: null
        }
    },
      mounted() {
        // mount autocomplete fields
        this.autocomplete = new google.maps.places.Autocomplete((this.$refs.autocomplete));
        this.autocomplete2 = new google.maps.places.Autocomplete((this.$refs.autocomplete2));
        // parse auto complete response for origin field
        this.autocomplete.addListener('place_changed', () => {
            let origin = this.autocomplete.getPlace()
            console.log('origin: ', origin);
            this.trip.originName = origin.name
            this.temp.origin = origin.name + ' - ' + origin.formatted_address
            this.trip.originAddress = origin.formatted_address
        })
        // parse auto complete response for destination field
        this.autocomplete2.addListener('place_changed', () => {
            let destination = this.autocomplete2.getPlace()
            console.log('place: ', destination);
            this.trip.destinationName = destination.name
            this.temp.destination = destination.name + ' - ' + destination.formatted_address
            this.trip.destinationAddress = destination.formatted_address
        })
    },
    methods: {
        getDirections () {
            let waypoints = {
                origin: this.trip.originName,
                destination: this.trip.destinationName
            }
            HttpService.getDirections(waypoints)
                .then((response) => {
                    console.log(waypoints)
                    this.trip.originAddress = response.data.routes[0].legs[0].start_address
                    this.trip.destinationAddress = response.data.routes[0].legs[0].end_address
                    this.trip.distance = response.data.routes[0].legs[0].distance.value / 1609.34
                    this.trip.duration = (response.data.routes[0].legs[0].duration.value / 60).toFixed(0)
                    this.trip.value = this.trip.milageRate * this.trip.distance
                    this.summary = response.data.routes[0].summary
                    this.message = null
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
        width: 100% !important;
        line-height: 16px;
        font-size: 16px;
        border: 2px solid rgba(0,0,0,.54);
        padding: 0 12px;
        margin: 10px;
        border-radius: 10px;
        background: transparent!important;
        border-radius: 4px;
        align-items: stretch;
        min-height: 56px;
    }
    input[type="text"]:focus {
        outline: none;
    }
    .summary-header div * {
        margin-bottom: 15px;
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
