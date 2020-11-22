<template>

  <CSidebar
      fixed
      :minimize="minimize"
      :show="show"
      @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
    </CSidebarBrand>

    <PackageHandler v-show="!minimize"/>
    <DoughnutChart v-show="!minimize"/>
    <CRenderFunction flat :content-to-render="$options.nav"/>
    <CSidebarMinimizer
        class="d-md-down-none"
        @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'
import PackageHandler from "./PackageHandler";
import DoughnutChart from "@/containers/DoughnutChart";

export default {
  name: 'TheSidebar',
  nav,
  components: {
    DoughnutChart,
    PackageHandler
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
