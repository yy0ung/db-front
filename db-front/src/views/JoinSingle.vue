<template>
  <div id="joinSingle">
    <h2>단일 결합</h2>
  </div>  
</template>

<script>
export default {
  mounted() {
    this.setIndex()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 3
    }
  },
}
</script>

<style>

</style>