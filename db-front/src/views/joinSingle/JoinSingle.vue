<template>
  <div id="joinSingle">
    <p class="blackTitle">단일 결합</p>
    <p>단일 결합 결과</p>
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