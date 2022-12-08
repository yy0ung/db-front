<template>
  <div id="editTable">
    <h2>속성 편집</h2>
  </div>  
</template>

<script>
export default {
  mounted() {
    this.setIndex()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 2
    }
  },
}
</script>

<style>

</style>