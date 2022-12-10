<template>
  <div id="showResult">
    <h2>결과 조회</h2>
  </div>  
</template>

<script>
export default {
  mounted() {
    this.setIndex()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 5
    }
  },
}
</script>

<style>

</style>