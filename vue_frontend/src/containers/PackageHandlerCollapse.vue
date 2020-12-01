<template>
  <div style="margin: 20px 0px">
    <CButton
        @click="collapse = !collapse"
        color="primary"
        style="margin: auto; width: 95%; display: block"
        class="mb-2">
      Package Handler
    </CButton>
    <CCollapse :show="collapse">
      <CCard body-wrapper>
        <PackageHandler2/>
      </CCard>
    </CCollapse>
  </div>
</template>

<script>
import PackageHandler2 from "@/containers/PackageHandler2";
export default {
  name: "PackageHandlerCollapse",
  components: {PackageHandler2},
  data () {
    return {
      collapse: false,
      innerCollapse: false
    }
  }
}
</script>

<style scoped>
.card {
  border: none;
  background: none;
}
</style>
