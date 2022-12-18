<template>
  <div id="searchSingleTarget">
    <p class="blackTitle">단일 결합</p>
    <p>Target 테이블 검색</p>
    <button @click="nextTest">다음</button>
    
  </div>  
</template>

<script>
// import axios from 'axios'
export default {
  mounted() {
    this.setIndex()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 3
    },
    nextTest(){
      this.$router.push('/joinsingle')
    },
    
  },
}
</script>

<style>

</style>