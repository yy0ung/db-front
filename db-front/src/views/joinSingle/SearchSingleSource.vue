<template>
  <div id="searchSingleSource">
    <p class="blackTitle">단일 결합</p>
    <p class="blackSub">Source 테이블 검색</p>
    <button @click="nextTest">다음</button>
  </div>  
</template>

<script>
import axios from 'axios'
import VueCookies from 'vue-cookies'
export default {
  mounted() {
    this.setIndex()
    this.checkConnect()
    //this.search()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 3
    },
    async search(){
      const response = await axios.post('/search', {tablename : "fitness", key: 0, att:0, attName:0})
      console.log(response.data)
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
      this.$router.push('/sjointsearch')
      //this.search()
    }
  },
}
</script>

<style>

</style>