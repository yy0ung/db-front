<template>
  <div id="searchSingleSource">
    <p class="blackTitle">단일 결합</p>
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
      this.$store.state.persist.indexColor = 3
    },
    nextTest(){
      this.$router.push('/sjointsearch')
    }
  },
}
</script>

<style>

</style>