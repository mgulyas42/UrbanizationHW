<!-- Vue SFC -->
<template>
  <div id="app">
    <treeselect v-model="value"
                :multiple="true"
                :alwaysOpen="true"
                :options="options"
                @select="onselect"
                @input="oninput"
                @deselect="ondeselect"
    />
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import MarkerService from "@/containers/MarkerService";

function changeStyleOfSelection(event, style){

  if(event.children) {
    event.children.forEach(child => changeStyleOfSelection(child, style));
    //alert('root clicked');
  }
  else {
    const selectedFeature = MarkerService.getSelectedFeature(event.id);
    selectedFeature.setStyle(style);
  }
}


export default {
  name: 'TheTreeView',
  // register the component
  components: { Treeselect },

  mounted() {},
  data() {
    console.log(this.$store.state.treeData);
    return this.$store.state.treeData
  },

  methods: {
    onselect: function (event) {
      changeStyleOfSelection(event, MarkerService.checkedStyle);
    },
    oninput: function (event) {
      console.log('input changed', event);
      //alert('input changed');
    },
    ondeselect: event => {
      changeStyleOfSelection(event, MarkerService.defaultStyle);
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
