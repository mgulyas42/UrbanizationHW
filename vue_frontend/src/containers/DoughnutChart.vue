<template>
  <CChartDoughnut
      :datasets="defaultDatasets"
      :options="options"
      :labels="['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']"
  />
</template>

<script>
import { CChartDoughnut } from '@coreui/vue-chartjs'
export default {
  name: 'DoughnutChart',
  components: { CChartDoughnut },

  data: () => ({
    options: {
      legend: {
        display: true,
        position: 'bottom'
      }
    }
  }),

  computed: {
    defaultDatasets () {
      return [
        {
          backgroundColor: [
            '#41B883',
            '#E46651',
            '#00D8FF',
            '#DD1B16'
          ],
          data: [40, 20, 80, 10],
        }
      ]
    }
  }
}
</script>
