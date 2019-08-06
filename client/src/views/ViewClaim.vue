<template>
    <div>
        <h1 class="page-title font-weight-light">
            <i class="material-icons">attach_money</i>
            Claim
        </h1>
        <v-layout align-top justify-content-around row wrap>
            <v-flex ma-5 >
                <h3 class="font-weight-light">
                    Expenses/Trips Claimed: <strong class="green--text text--darken-1">{{ claimSummary ? claimSummary.countTrips : 0 }}</strong>
                </h3>
            </v-flex>
            <v-flex ma-5 >
                <h3 class="font-weight-light">
                    Claim Value: <strong class="green--text text--darken-1">£{{ claimSummary ? claimSummary.totalValue.toFixed(2) : 0.00 }}</strong>
                </h3>
            </v-flex>
            <v-flex ma-5 >
                <h3 class="font-weight-light" v-if="claim.type == 'Milage'">
                    Miles Travelled: <strong class="green--text text--darken-1">{{ claimSummary ? claimSummary.totalMiles : 0 }}</strong>
                </h3>
            </v-flex>
            <v-flex text-right ma-5>
                <v-btn rounded color="teal lighten-1" @click="download(claimData)" dark>
                    <v-icon class="mr-2" dark>cloud_download</v-icon>Download
                </v-btn>
            </v-flex>
            <!-- table -->
            <v-flex xs12 class="table-container elevation-1" mt-3>
                <v-data-table
                    dark
                    fixed-header
                    height="450"
                    :headers="headers"
                    :items="claimData"
                    hide-default-footer
                    loading-text="Loading... Please wait"
                    v-model="claimData"
                    class="table"
                    :single-expand="showExpand"
                    :show-expand="showExpand"
                    no-data-text="There are no claim items to display">
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
                </v-data-table>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import HttpService from '@/services/HttpService.js'
import {json2excel} from 'js2excel'
export default {
    props: ['claimType', 'claimId'],
    data () {
        return {
            claim: {
                type: this.claimType,
                id: this.claimId
            },
            showExpand: false,
            claimSummary: null,
            claimData: []
        }
    },
    methods: {
        download (claimData) {
            const data = JSON.parse(JSON.stringify(claimData))
            try {
                json2excel({
                    data,
                    name: 'claim-data'
                });
            } catch (error) {
                console.error('export error: ', error);
            }
        }
    },
    mounted () {
        if (this.claim.type == 'Milage') {
            this.showExpand = true
        }
        HttpService.viewClaim(this.claim)
            .then((response) => {
                this.claimSummary = response.data[0][0]
                this.claimData = response.data[1]
            })
            .catch(error => console.log(error))
    },
    computed: {
        headers: function () {
            if (this.claimType == 'Milage') {
                return [
                    {text: 'Date', value: 'tripDate'},
                    {text: 'Origin', value: 'originName'},
                    {text: 'Destination', value: 'destinationName'},
                    {text: 'Duration', value: 'duration'},
                    {text: 'Distance', value: 'distance'},
                    {text: 'Value', value: 'value'}
                ]
            } else {
                return [
                    { text: 'Date', value: 'expenseDate' },
                    { text: 'Comment', value: 'comment'},
                    { text: 'Type', value: 'expenseType' },
                    { text: 'Status', value: 'status' },
                    { text: 'Total', value: 'total' }
                ]
            }
        }
    }
}
</script>

<style>

</style>
