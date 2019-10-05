<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['chartData'],
  data () {
      return {
          options: {
              title: {
                display: true,
                text: 'TRIPS PER MONTH'
              },
              responsive: false,
              maintainAspectRatio: false,
              layout: {
                  padding: {
                    left: 100,
                    right: 0,
                    top: 0,
                    bottom: 0
                  }
              },
              legend: {
                display: false
              },
              scales: {
                  yAxes: [{
                      ticks: {
                          min: 0,
                          stepSize: 5,
                          suggestedMax: 40
                      }
                  }]
              }
          }
      }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>



