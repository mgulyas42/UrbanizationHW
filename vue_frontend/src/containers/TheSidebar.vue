<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <img src="http://oktatas.mik.uni-pannon.hu/pluginfile.php/1/theme_enlightlite/logo/1604907398/cimer_szines_99_transparent.png"></img>
    </CSidebarBrand>
    <form action="http://localhost:3000/upload" method="post" enctype="multipart/form-data">
      <div class="col-md-4 input-group">
        <div class="input-group-btn">
          <label for="myFile" class="btn btn-default">Import File</label>
          <input id="myFile" type="file" name="filename" class="btn btn-default"  style="visibility:hidden;"/>
          <button class="btn btn-default" value="Upload" type="submit" style="background: green"><i class="fa fa-upload"></i></button>
        </div>
      </div>
    </form>
    <button id="kaki" class="btn" style="background: white" ><i class="fa fa-file-archive-o"></i></button>
    <CRenderFunction flat :content-to-render="$options.nav"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'

export default {
  name: 'TheSidebar',
  nav,
  computed: {
    show () {
      return this.$store.state.sidebarShow
    },
    minimize () {
      return this.$store.state.sidebarMinimize
    }
  }
}
</script>
