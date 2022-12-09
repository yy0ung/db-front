<template>
  <div id="scanDB">
    <p class="blackTitle">테이블 속성 도메인 스캔</p>
    <p>대상 테이블 선택</p>
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
      this.$store.state.persist.indexColor = 1
    },
    nextTest(){
      this.$router.push('/scanattr')
    }
  },
}
</script>

<style>

</style>