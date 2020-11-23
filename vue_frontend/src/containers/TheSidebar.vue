<template>

  <CSidebar
      fixed
      :minimize="minimize"
      :show="show"
      :overlaid="!minimize"
      @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
    </CSidebarBrand>

    <PackageHandlerCollapse v-show="!minimize"/>
    <DoughnutChart v-show="!minimize"/>
    <!--<CRenderFunction flat :content-to-render="$options.nav"/>-->
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
