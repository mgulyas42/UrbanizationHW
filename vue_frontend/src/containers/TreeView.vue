<!-- Vue SFC -->
<template>
  <div id="app">
    <button v-on:click="$store.commit('updateValue')">UPDATE VALUEEEEEEE</button>
    <treeselect v-model="value" :multiple="true" :alwaysOpen="true" :options="options" />
  </div>
</template>

<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'


export default {
  name: 'TheTreeView',
  // register the component
  components: { Treeselect },

  mounted() {
    console.log(this._uid);
    this.$emit('select', this._uid);
  },
  data() {
    console.log(this.$store.state.treeData);
    return this.$store.state.treeData
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
