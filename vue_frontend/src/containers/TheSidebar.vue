<template>

  <CSidebar
      fixed
      :minimize="minimize"
      :show="show"
      :overlaid="!minimize"
      @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <v-img contain src="http://oktatas.mik.uni-pannon.hu/pluginfile.php/1/theme_enlightlite/logo/1604907398/cimer_szines_99_transparent.png" max-height="150px"></v-img>
    </CSidebarBrand>

    <PackageHandlerCollapse v-show="!minimize"/>

    <transition name="fade">
      <DoughnutChart v-show="!minimize"/>
    </transition>


    <CSidebarMinimizer
        class="d-md-down-none"
        style="bottom: 0; position: absolute"
        @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'
import DoughnutChart from "@/containers/DoughnutChart";
import PackageHandlerCollapse from "@/containers/PackageHandlerCollapse";

export default {
  name: 'TheSidebar',
  nav,
  components: {
    PackageHandlerCollapse,
    DoughnutChart
  },
  computed: {
    show() {
      return this.$store.state.sidebarShow
    },
    minimize() {
      return this.$store.state.sidebarMinimize
    }
  }
}
</script>

<style scoped>
  .visible{
    opacity: 1;
  }
  .invisible{
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
