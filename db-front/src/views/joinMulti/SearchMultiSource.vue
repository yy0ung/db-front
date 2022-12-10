<template>
  <div id="searchMultiSource">
    <p class="blackTitle">다중 결합</p>
    <p>Source 테이블 검색</p>
    <button @click="nextTest">다음</button>
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
    },
    nextTest(){
      this.$router.push('/mjointsearch')
    }
  },
}
</script>

<style>

</style>