<template>
    <div>
        <!-- choose which type of claim to submit -->
        <v-radio-group v-model="claimType">
            <template v-slot:label>
                <div>What type of claim would you like to create?</div>
            </template>
            <v-radio value="milage" label="Milage" color="teal lighten-1"></v-radio>
            <v-radio value="expense" label="Expense" color="teal lighten-1"></v-radio>
        </v-radio-group>
        <!-- milage claim -->
        <v-form @submit.prevent="addTripClaim" v-if="this.claimType == 'milage'">
            <v-layout align-top justify-content-around row wrap>
                <v-flex ma-5 v-if="claimTrips.length == 0">
                    <h3 class="font-weight-light">
                        You have <strong class="red--text text--lighten-1">{{ unclaimedTrips ? unclaimedTrips : 0 }}</strong> unclaimed trips!
                    </h3>
                </v-flex>
                <v-flex ma-5 v-else>
                    <h3 class="font-weight-light">
                        <strong class="green--text text--darken-1">{{ claimTrips.length }}</strong> trips selected!
                    </h3>
                </v-flex>
                <!-- submit -->
                <v-flex text-right mt-3>
                    <v-btn type="submit" rounded color="teal lighten-1" dark>
                        <v-icon class="mr-2" dark>send</v-icon>Submit
                    </v-btn>
                </v-flex>
                <!-- table -->
                <v-flex xs12 class="table-container elevation-1" mt-3>
                    <v-data-table
                    :headers="tripHeaders"
                    :items="trips"
                    loading-text="Loading... Please wait"
                    v-model="claimTrips"
                    show-select
                    single-expand
                    show-expand
                    hide-default-footer
                    class="table"
                    no-data-text="There are no trips to display">
                        <template v-slot:expanded-item="{ headers, item }">
                            <td :colspan="headers.length">{{ item.reason }}</td>
                        </template>
                        <template v-slot:item.duration="{ item }">
                        {{ item.duration }} mins
                        </template>
                        <template v-slot:item.distance="{ item }">
                        {{ item.distance }} miles
                        </template>
                        <template v-slot:item.value="{ item }">
                        £{{ item.value.toFixed(2) }}
                        </template>
                        <template v-slot:item.action="{ item }">
                            <v-icon
                            small
                            class="mr-2"
                            @click="editTrip(item)">
                            edit
                            </v-icon>
                            <v-icon
                                small
                                @click="deleteTrip(item)">
                                delete
                            </v-icon>
                        </template>
                    </v-data-table>
                </v-flex>
            </v-layout>
        </v-form>
        <!-- expense claim -->
        <v-form @submit.prevent="addExpenseClaim" v-else-if="this.claimType == 'expense'">
            <v-layout align-top justify-content-around row wrap>
                <!-- submit -->
                <v-flex text-right mt-3>
                    <v-btn type="submit" rounded color="teal lighten-1" dark>
                        <v-icon class="mr-2" dark>send</v-icon>Submit
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </div>
</template>

<script>
import HttpService from '@/services/HttpService.js'
export default {
    data () {
        return {
            unclaimedTrips: 0,
            claimType: null,
            claimTrips: [],
            claimExpenses: [],
            trips: [],
            expenses: [],
            tripClaim: {
                totalMiles: null,
                countTrips: null,
                totalValue: null,
                createdBy: null
            },
            expenseClaim: {
                count_expenses: null,
                netValue: null,
                vatValue: null,
                totalValue: null,
                createdBy: null
            },
            tripHeaders: [
                {text: 'Date', value: 'tripDate'},
                {text: 'Origin', value: 'originName'},
                {text: 'Destination', value: 'destinationName'},
                {text: 'Duration', value: 'duration'},
                {text: 'Distance', value: 'distance'},
                {text: 'Value', value: 'value'}
            ]
        }
    },
    methods: {
        addTripClaim () {
            this.tripClaim.countTrips = this.claimTrips.length
            this.tripClaim.totalMiles = this.totalMilesForClaim
            this.tripClaim.totalValue = this.totalValueForClaim
            this.tripClaim.createdBy = this.$store.getters.userId
            let payload = [this.tripClaim, this.claimTrips]
            HttpService.addClaim(payload)
                .then(() => this.$router.push("/claims"))
                .catch(error => console.log(error))
        },
        // IMPLEMENT ME
        addExpenseClaim () {
            return console.log('expense claim submitted')
        }
    },
    created () {
        HttpService.getTripsByStatus('unclaimed')
            .then(response => this.trips = response.data)
            .then(() => {
                this.unclaimedTrips = this.trips.filter((obj) => obj.status === 'unclaimed').length;
            })
            .catch(error => console.log(error))
    },
    computed: {
        totalMilesForClaim: function () {
            var sum = 0;
            this.claimTrips.forEach(e => {
                sum += e.distance;
            });
            return sum
        },
        totalValueForClaim: function () {
            var sum = 0;
            this.claimTrips.forEach(e => {
                sum += e.value;
            });
            return sum
        }
    }
}
</script>

<style>

</style>
