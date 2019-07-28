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
                :headers="headers"
                :items="claims"
                loading-text="Loading... Please wait"
                class="table"
                no-data-text="There are no claims to display">
                    <template v-slot:item.totalValue="{ item }">
                        £{{item.totalValue.toFixed(2)}}
                    </template>
                    <template v-slot:item.download="{ item }">
                        <v-icon
                            color="teal lighten-1"
                            @click="downloadClaim(item)">
                            cloud_download
                        </v-icon>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import HttpService from '@/services/HttpService.js'
export default {
    data () {
        return {
            unclaimedExpenses: 0,
            unclaimedTrips: 0,
            claims: [],
            headers: [
                { text: 'Date', value: 'createdAt' },
                { text: 'Type', value: 'type' },
                { text: 'Status', value: 'status' },
                { text: 'Total', value: 'totalValue'},
                { text: 'Download', value: 'download', sortable: false, align: 'center'}
            ]
        }
    },
    methods: {
        downloadClaim (item) {
            console.log(item)
        }
    },
    created () {
        HttpService.getClaims()
            .then(response => this.claims = response.data)
            .catch(error => console.log(error))
    }
}
</script>

<style>

</style>
