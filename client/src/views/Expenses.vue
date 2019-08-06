<template>
    <div>
        <h1 class="page-title font-weight-light">
            <i class="material-icons">payment</i>
            Expenses
        </h1>
        <v-layout align-center justify-space-around row>
      <v-flex ma-5>
        <h3 class="font-weight-light">
          You have <strong class="red--text text--lighten-1">{{ unclaimedExpenses ? unclaimedExpenses : 0 }}</strong> unclaimed expenses!
        </h3>
      </v-flex>
      <v-flex text-right ma-5>
        <router-link to="/expenses/new">
            <v-btn rounded color="teal lighten-1" dark>
              <v-icon class="mr-2" dark>add_circle</v-icon>New Expense
            </v-btn>
        </router-link>
      </v-flex>
    <v-flex xs12 class="table-container elevation-1 ">
        <v-data-table
        dark
        fixed-header
        :headers="headers"
        :items="expenses"
        height="450"
        loading-text="Loading... Please wait"
        hide-default-footer
        class="table"
        no-data-text="There are no expenses to display">
        <template v-slot:item.total="{ item }">
          £{{item.total.toFixed(2)}}
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)" class="text-uppercase" dark>{{ item.status }}</v-chip>
        </template>
          <!-- implement me -->
        <template v-slot:item.action="{ item }">
          <v-icon
            color="teal lighten-1"
            class="mr-2"
            @click="editExpense(item)">
            edit
          </v-icon>
          <v-icon
            color="teal lighten-1"
            @click="deleteExpense(item)">
            delete
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
            headers: [
                { text: 'Date', value: 'expenseDate' },
                { text: 'Comment', value: 'comment'},
                { text: 'Type', value: 'expenseType' },
                { text: 'Status', value: 'status', align: 'center' },
                { text: 'Total', value: 'total' },
                { text: 'Actions', value: 'action', sortable: false}
            ],
            unclaimedExpenses: 0,
            expenses: [],
            message: null
        }
    },
    created () {
        HttpService.getExpenses()
            .then(response => this.expenses = response.data)
            .then(() => {
                this.unclaimedExpenses = this.expenses.filter((obj) => obj.status === 'unclaimed').length;
            })
            .catch(error => console.log(error))
    },
    methods: {
      deleteExpense(expense) {
        HttpService.deleteExpense(expense)
          .then(() => {
            HttpService.getExpenses()
              .then(response => this.expenses = response.data)
              .then(() => {
                  this.unclaimedExpenses = this.expenses.filter((obj) => obj.status === 'unclaimed').length;
              })
              .catch(error => console.log(error))
          })
          .catch(error => console.log(error))
      },
      getColor(status) {
          if (status == 'unclaimed') return 'red'
          else return 'green'
      }
    }
}
</script>

<style>

</style>
