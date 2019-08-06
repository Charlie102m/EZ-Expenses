<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['chartData'],
  data () {
      return {
          options: {
              responsive: false,
              maintainAspectRatio: false,
              layout: {
                  padding: {
                    left: 100,
                    right: 0,
                    top: 0,
                    bottom: 0
                  }
              }
          }
      }
  },
  mounted () {
    console.log(this.chartData);
    this.renderChart(this.chartData, this.options)
  }
}
</script>



