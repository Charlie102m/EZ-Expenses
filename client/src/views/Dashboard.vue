<template>
  <div class="dashboard">
    <v-layout align-center justify-center row v-if="tripSummary">
      <div class="my-5 d-flex d-md-none"></div>
      <v-flex mx-5>
        <v-alert
          text
          type="success"
          color="teal"
        >
          <h3 class="display-1 mb-2">Welcome to EZ Expenses!</h3>
          <div class="subtitle-2">To get started, use the menu to navigate to <i class="material-icons">directions_car</i> to log a work trip, or <i class="material-icons">payment</i> to log a business expense.</div>
          <v-divider
            class="my-4 white"
            style="opacity: 0.5"
          ></v-divider>
          <div class="subtitle-2 mb-2">When you are ready to claim for your trips or expenses, go to <i class="material-icons">attach_money</i> to create a claim which can then be downloaded at the click of a button to submit to your employer. </div>
          <div class="caption">Make sure you check out the <i class="material-icons">settings</i> page to set your <strong>Defualt Milage Rate</strong>, <strong>Home</strong> & <strong>Work</strong> addresses and even upload your own <strong>Profile Picture</strong>, giving your EZ Expenses account a personal touch! </div>
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout align-center row wrap v-if="tripSummary">
      <v-flex md3 my-5 sm6 xs12 text-center class="teal--text text--lighten-1">
        <h3 class="display-3 mb-3">{{ tripSummary ? travelTime : 0 }}</h3>
        <p class="caption">TRAVEL TIME</p>
      </v-flex>
      <v-flex md3 my-5 sm6 xs12 text-center class="teal--text text--lighten-1">
        <h3 class="display-3 mb-3">{{ tripSummary.totalMiles ? tripSummary.totalMiles : 0 }}</h3>
        <p class="caption">MILES TRAVELLED</p>
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
      <v-flex lg6 class="chart-container text-center d-none d-sm-flex ">
        <BarChart :chartData="chartData" :height="chartHeight" :width="chartWidth"/>
      </v-flex>
      <v-flex my-5 lg6>
        <table>
          <tr class="row-1">
            <td class="column-1 green--text text--darken-1">
              <h4 class="display-2">{{ tripClaimsSummary.tripClaims }}</h4>
              <p class="caption">MILAGE CLAIMS</p>
            </td>
            <td class="red--text text--darken-3">
              <h4 class="display-2">{{ unclaimedTrips }}</h4>
              <p class="caption">UNCLAIMED TRIPS</p>
            </td>
          </tr>
          <tr>
            <td class="column-1 green--text text--darken-1">
              <h4 class="display-2">{{ expenseClaimsSummary.expenseClaims }}</h4>
              <p class="caption">EXPENSE CLAIMS</p>
            </td>
            <td class="red--text text--darken-3">
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
import { HttpService } from '@/services/HttpService.js'
import BarChart from '@/components/BarChart.vue'
export default {
  name: 'dasboard',
  components: {
    BarChart
  },
  data () {
    return {
      chartWidth: 600,
      chartHeight: 300,
      tripSummary: null,
      tripClaimsSummary: null,
      expenseSummary: null,
      expenseClaimsSummary: null,
      chartData: null
    }
  },
  created() {
    HttpService.loadDashboard()
      .then(response => {
        this.tripSummary = response.data[0][0]
        this.tripClaimsSummary = response.data[1][0]
        this.expenseSummary = response.data[2][0]
        this.expenseClaimsSummary = response.data[3][0]
        this.chartData = response.data[4]
        
      })
      .catch((error) => {
          this.$store.dispatch('setMessage', error.response)
      })
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
.material-icons {
  line-height: inherit;
  display:inline-block;
  vertical-align: middle;
}
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
@media screen and (max-width: 600px) {
  table {
    width: 95%;
  }
}
</style>
