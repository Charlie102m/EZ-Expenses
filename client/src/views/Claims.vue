<template>
    <div>
        <h1 class="page-title font-weight-light">
            <i class="material-icons">attach_money</i>
            Claims
        </h1>
        <v-layout align-center justify-space-around row>
            <v-flex ma-5>
                <h3 class="font-weight-light">
                You have <strong class="red--text text--lighten-1">{{ unclaimedExpenses ? unclaimedExpenses : 0 }}</strong> unclaimed expenses!
                </h3>
            </v-flex>
            <v-flex ma-5>
                <h3 class="font-weight-light">
                You have <strong class="red--text text--lighten-1">{{ unclaimedTrips ? unclaimedTrips : 0 }}</strong> unclaimed trips!
                </h3>
            </v-flex>
            <v-flex text-right ma-5>
                <router-link to="/claims/new">
                    <v-btn rounded color="teal lighten-1" dark>
                    <v-icon class="mr-2" dark>add_circle</v-icon>New Claim
                    </v-btn>
                </router-link>
            </v-flex>
            <v-flex xs12 class="table-container elevation-1 ">
                <v-data-table
                dark
                fixed-header
                :headers="headers"
                :items="claims"
                height="450"
                hide-default-footer
                disable-pagination
                loading-text="Loading... Please wait"
                class="table"
                no-data-text="There are no claims to display">
                    <template v-slot:item.type="{item}">
                        <v-icon color="white" class="mr-1" v-if="item.type == 'Milage'">directions_car</v-icon>
                        <v-icon color="white" class="mr-1" v-else>payment</v-icon>
                        {{ item.type }}
                    </template>
                    <template v-slot:item.status="{ item }">
                        <v-chip class="text-uppercase" color="green" dark>{{ item.status }}</v-chip>
                    </template>
                    <template v-slot:item.totalValue="{ item }">
                        £{{item.totalValue.toFixed(2)}}
                    </template>
                    <template v-slot:item.action="{ item }">
                        <v-icon
                            color="teal lighten-1"
                            class="mr-2"
                            @click="viewClaim(item)">
                            remove_red_eye
                        </v-icon>
                        <v-icon
                            color="teal lighten-1"
                            class="mr-4"
                            @click="downloadClaim(item)">
                            cloud_download
                        </v-icon>
                        <v-icon
                            color="red"
                            @click="deleteClaim(item)">
                            delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import { HttpService } from '@/services/HttpService.js'
import {json2excel} from 'js2excel'
export default {
    data () {
        return {
            unclaimedExpenses: 0,
            unclaimedTrips: 0,
            claims: [],
            headers: [
                { text: 'Date', value: 'createdAt'},
                { text: 'Type', value: 'type'},
                { text: 'Trips/Expenses', value: 'items', align: 'center' },
                { text: 'Status', value: 'status', align: 'center' },
                { text: 'Total', value: 'totalValue'},
                { text: 'Actions', value: 'action', sortable: false, align: 'center'}
            ]
        }
    },
    methods: {
        downloadClaim (claim) {
            HttpService.viewClaim(claim)
                .then((response) => {
                    const data = JSON.parse(JSON.stringify(response.data[1]))
                    try {
                        json2excel({
                            data,
                            name: 'claim-data'
                        });
                    } catch (error) {
                        this.$store.dispatch('setMessage', error.response)
                    }
                })
                .catch((error) => {
                    this.$store.dispatch('setMessage', error.response)
                })
        },
        viewClaim (claim) {
            this.$router.push(`/claims/${claim.type}/${claim.id}`)
        },
        deleteClaim (claim) {
            HttpService.deleteClaim(claim)
                .then(() => {
                    this.$router.go(0);
                })
                .catch((error) => {
                    this.$store.dispatch('setMessage', error.response)
                })
        }
    },
    created () {

        HttpService.getClaims()
            .then(response => {
                this.claims = response.data
            })
            .catch((error) => {
                this.$store.dispatch('setMessage', error.response)
            })
            
        HttpService.getTripsByStatus('unclaimed')
            .then(response => this.unclaimedTrips = response.data.length)
            .catch((error) => {
                this.$store.dispatch('setMessage', error.response)
            })

        HttpService.getExpensesByStatus('unclaimed')
            .then(response => this.unclaimedExpenses = response.data.length)
            .catch((error) => {
                this.$store.dispatch('setMessage', error.response)
            })
    }
}
</script>

<style>

</style>
