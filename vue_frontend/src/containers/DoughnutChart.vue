<template>
  <CChartDoughnut
      :datasets="defaultDatasets"
      :options="options"
      :labels="labels"
  />
</template>

<script>
import { CChartDoughnut } from '@coreui/vue-chartjs';
import json from './chart-colors.json';

export default {
  name: 'DoughnutChart',
  components: { CChartDoughnut },

  data: () => ({
    options: {
      legend: {
        display: false,
        position: 'bottom'
      }
    },
    colors: []
  }),
  mounted() {
    console.log('char created');
    console.log(this.colors);
  },
  created() {
    console.log('char created');
    this.colors = json;
  },
  computed: {
    defaultDatasets () {
      const numberOfPackages = this.$store.state.treeData.options.length;
      return [
        {
          backgroundColor: this.colors.slice(0, numberOfPackages),
          data: this.$store.state.treeData.options.map(x => x.children.length),
        }
      ]
    },
    labels() {
      return this.$store.state.treeData.options.map(x => x.label);
    }
  }
}
</script>
