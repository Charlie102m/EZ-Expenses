<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    {{ data }}
    {{ userId }}
    {{ userEmail }}
  </div>
</template>

<script>
import HttpService from '@/services/HttpService.js'
export default {
  name: 'dasboard',
  data () {
    return {
      data: null
    }
  },
  created() {
    HttpService.loadDashboard()
      .then(response => {
        this.data = response.data[0]
        this.data["expense"] = (response.data[0].totalMiles * 0.13).toFixed(2)
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
