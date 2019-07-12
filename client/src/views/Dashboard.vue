<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    {{ data }}
  </div>
</template>

<script>
import HttpService from '@/services/HttpService.js'
export default {
  name: 'dasboard',
  components: {
    
  },
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
  }
}
</script>

<style scoped>

</style>
