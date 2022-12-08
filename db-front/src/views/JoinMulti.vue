<template>
  <div id="joinMulti">
    <h2>다중</h2>
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