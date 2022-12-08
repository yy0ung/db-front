<template>
  <div id="scanDB">
    <h2>스캔</h2>
  </div>  
</template>

<script>
export default {
  mounted() {
    this.setIndex()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 1
    }
  },
}
</script>

<style>

</style>