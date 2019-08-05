<template>
  <div class="dashboard">
    <v-layout align-center row wrap v-if="tripSummary">
      <v-flex>
        <v-btn text color="text--blue-grey text--darken-4" class="ma-5" small disabled>
          THIS YEAR
          <v-icon class="ml-2">filter_list</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout align-center row wrap v-if="tripSummary">
      <v-flex md3 my-5 sm6 xs12 text-center class="teal--text text--lighten-1">
        <h3 class="display-3 mb-3">{{ tripSummary ? travelTime : 0 }}</h3>
        <p class="caption">TRAVEL TIME</p>
      </v-flex>
      <v-flex md3 my-5 sm6 xs12 text-center class="teal--text text--lighten-1">
        <h3 class="display-3 mb-3">{{ tripSummary.totalMiles ? tripSummary.totalMiles : 0 }}</h3>
        <p class="caption">TRAVEL MILES</p>
      </v-flex>
      <v-flex md3 my-5 sm6 xs12 text-center class="teal--text text--lighten-1">
        <h3 class="display-3 mb-3">£{{ tripClaimsSummary.totalValue ? tripClaimsSummary.totalValue.toFixed(2) : 0 }}</h3>
        <p class="caption">MILAGE CLAIMED</p>
      </v-flex>
      <v-flex md3 my-5 sm6 xs12 text-center class="teal--text text--lighten-1">
        <h3 class="display-3 mb-3">£{{ expenseClaimsSummary.totalValue ? expenseClaimsSummary.totalValue.toFixed(2) : 0 }}</h3>
        <p class="caption">EXPENSES CLAIMED</p>
      </v-flex>
      <v-flex my-5 xs12></v-flex>
      <v-flex xs6>
        <div class="table-goes-here"></div>
      </v-flex>
      <v-flex my-5 xs6>
        <table>
          <tr class="row-1">
            <td class="column-1 green--text text--darken-1">
              <h4 class="display-2">{{ tripClaimsSummary.tripClaims }}</h4>
              <p class="caption">MILAGE CLAIMS</p>
            </td>
            <td class="red--text text--lighten-1">
              <h4 class="display-2">{{ unclaimedTrips }}</h4>
              <p class="caption">UNCLAIMED TRIPS</p>
            </td>
          </tr>
          <tr>
            <td class="column-1 green--text text--darken-1">
              <h4 class="display-2">{{ expenseClaimsSummary.expenseClaims }}</h4>
              <p class="caption">EXPENSE CLAIMS</p>
            </td>
            <td class="red--text text--lighten-1">
              <h4 class="display-2">{{ unclaimedExpenses }}</h4>
              <p class="caption">UNCLAIMED EXPENSES</p>
            </td>
          </tr>
        </table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import HttpService from '@/services/HttpService.js'
export default {
  name: 'dasboard',
  data () {
    return {
      tripSummary: null,
      tripClaimsSummary: null,
      expenseSummary: null,
      expenseClaimsSummary: null
    }
  },
  created() {
    HttpService.loadDashboard()
      .then(response => {
        this.tripSummary = response.data[0][0]
        this.tripClaimsSummary = response.data[1][0]
        this.expenseSummary = response.data[2][0]
        this.expenseClaimsSummary = response.data[3][0]
      })
      .catch(error => console.log(error))
  },
  computed: {
    message () {
      if (this.$store.state.message) {
        return this.$store.state.message
      }
      return false
    },
    travelTime () {
      let hours = Math.floor(this.tripSummary.totalTime / 60)
      let mins = this.tripSummary.totalTime % 60
      return hours + 'h ' + mins + 'm'
    },
    unclaimedTrips () {
      return this.tripSummary.totalTrips - this.tripClaimsSummary.totalTripsClaimed
    },
    unclaimedExpenses () {
      return this.expenseSummary.totalExpenses - this.expenseClaimsSummary.totalExpensesClaimed
    }
  },
  watch: {
    message(value) {
      if (value.status === 401) return this.$router.push({name: 'login'})
    }
  }
}
</script>

<style scoped>
  table {
    width: 80%;
    text-align: center;
    border-collapse: collapse;
    margin: 0 auto;
  }
  .row-1 td {
    border-bottom: 2px solid rgba(128, 128, 128, 0.5)
  }
  .column-1 {
    border-right: 2px solid rgba(128, 128, 128, 0.5)
  }
  td {
    width: 50%;
    padding: 10px;
  }
  .table-goes-here {
    width: 80%;
    height: 250px;;
    background-image: url('https://images.unsplash.com/photo-1555952494-efd681c7e3f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin: 0 auto;
  }
</style>
