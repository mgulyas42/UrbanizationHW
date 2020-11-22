<template>
  <div>
    <CButton
        @click="collapse = !collapse"
        color="primary"
        class="mb-2"
    >
      Toggle Collapse
    </CButton>
    <CCollapse :show="collapse">
      <CCard body-wrapper>
        <DoughnutChart/>
      </CCard>
    </CCollapse>
  </div>
</template>

<script>
import DoughnutChart from "@/containers/DoughnutChart";
export default {
  name: "ChartCollapse",
  components: {DoughnutChart},
  data () {
    return {
      collapse: false,
      innerCollapse: false
    }
  }
}
</script>
