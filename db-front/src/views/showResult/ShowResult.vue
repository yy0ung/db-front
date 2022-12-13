<template>
  <div id="showResult">
    <h2>결과 조회</h2>
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
      this.$store.state.persist.indexColor = 5
    },
    checkConnect(){
      if(!VueCookies.isKey("info")){
        if(confirm('DB에 연결되어있지 않습니다.')){
          this.$router.push('/connect')
        }else{
          this.$router.push('/connect')
        }
      }
    }
  },
}
</script>

<style>

</style>