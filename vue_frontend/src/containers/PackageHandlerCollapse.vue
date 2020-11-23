<template>
  <div>
    <CButton
        @click="collapse = !collapse"
        color="primary"
        class="mb-2"
    >
      Package Handler
    </CButton>
    <CCollapse :show="collapse">
      <CCard body-wrapper>
        <PackageHandler/>
      </CCard>
    </CCollapse>
  </div>
</template>

<script>
import PackageHandler from "@/containers/PackageHandler";
export default {
  name: "PackageHandlerCollapse",
  components: {PackageHandler},
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
