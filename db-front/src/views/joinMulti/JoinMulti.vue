<template>
  <div id="joinMulti">
    <p class="blackTitle">다중 결합</p>
    <p>다중 결합 결과</p>
  </div>  
</template>

<script>
export default {
  mounted() {
    this.setIndex()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 4
    }
  },
}
</script>

<style>

</style>