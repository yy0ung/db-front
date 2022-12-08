<template>
  <div id="connectDB">
    <h2>연결</h2>

  </div>  
</template>

<script>
export default {
  mounted() {
    this.setIndex()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 0
    }
  },
}
</script>

<style>

</style>