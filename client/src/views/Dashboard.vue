<template>
  <div class="dashboard">
    <h1 class="page-title font-weight-light">
      <i class="material-icons">home</i>
      Dashboard
    </h1>
    <p>
      {{ tripSummary }}
    </p>
    <p>
      {{ tripClaimsSummary }}
    </p>
    <p>
      {{ expenseSummary }}
    </p>
    <p>
      {{ expenseClaimsSummary }}
    </p>
    <p>
      userId: {{ userId }}
    </p>
    <p>
      userEmail: {{ userEmail }}
    </p>
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
        this.tripSummary = response.data[0]
        this.tripClaimsSummary = response.data[1]
        this.expenseSummary = response.data[2]
        this.expenseClaimsSummary = response.data[3]
        console.log(response);
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
    userId () {
      return this.$store.getters.userId
    },
    userEmail () {
      return this.$store.getters.userEmail
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

</style>
