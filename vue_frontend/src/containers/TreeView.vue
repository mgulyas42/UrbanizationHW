<!-- Vue SFC -->
<template>
  <div id="app">
    <treeselect v-model="value"
                :multiple="true"
                :alwaysOpen="true"
                :options="options"
                @select="onselect"
                @input="oninput"
    />
  </div>
</template>

<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import store from "@/store";
import * as axios from "axios";
import {Feature} from "ol";
import {Point} from "ol/geom";
import {fromLonLat} from "ol/proj";
import MarkerService from "@/containers/MarkerService";


export default {
  name: 'TheTreeView',
  // register the component
  components: { Treeselect },

  mounted() {
    axios.default.get('http://localhost:3000/data').then((a) => {
      for (const [packageName, values] of Object.entries(a.data)) {
        store.state.treeData.options.push({
          id: packageName,
          label: packageName,
          children: values.map((item) => {
            return {
              id: item.id + item.title,
              label: item.title,
              tags: item
            }
          })
        });
      }

      this.$store.state.treeData.options.forEach(rootPackage => {
        console.log(rootPackage);
        const features = rootPackage.children.map(data => new Feature({
          geometry: new Point(fromLonLat([data.tags.lat, data.tags.lng])),
          data: data.tags,
          style: MarkerService.uncheckedStyle
        }));
        MarkerService.markerVector.getSource().addFeatures(features);
      })
    });


  },
  data() {
    console.log(this.$store.state.treeData);
    return this.$store.state.treeData
  },

  methods: {
    onselect: function (event) {
      alert('SELECT TRIGGERED')
    },
    oninput: function (event) {
      alert('INPUT CHANGED')
    }
  }
}
</script>

<!-- Using the `scoped` attribute -->
<style scoped>
.vue-treeselect {
  width: 30%;
  position: absolute;
  right: 0;
  z-index: 1000;
}

.vue-treeselect__menu{
  width: 1000px!important;
}

</style>
