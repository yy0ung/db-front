<template>
  <div id="searchMultiSource">
    <p class="blackTitle">다중 결합</p>
    <p>Source 테이블 검색</p>
    <button @click="nextTest">다음</button>
  </div>  
</template>

<script>
import VueCookies from 'vue-cookies'
export default {
  mounted() {
    this.setIndex()
    this.checkConnect()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 4
    },
    checkConnect(){
      if(!VueCookies.isKey("info")){
        if(confirm('DB에 연결되어있지 않습니다.')){
          this.$router.push('/connect')
        }else{
          this.$router.push('/connect')
        }
      }
    },
    nextTest(){
      this.$router.push('/mjointsearch')
    }
  },
}
</script>

<style>

</style>