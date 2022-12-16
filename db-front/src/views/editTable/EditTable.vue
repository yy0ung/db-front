<template>
  <div id="editTable">
    <p class="blackTitle">테이블 속성 편집</p>
    <p class="blackSub">속성 스캔 완료 테이블 목록</p>
    <div class="table-container">
      <table>
      <tr>
        <th>테이블 명</th>
        <th>레코드 수</th>
        <th>속성</th>
      </tr>
    </table>
    
    </div>
    <button @click="nextTest" class="send-btn">선택하기</button>
  </div>  
</template>

<script>
import VueCookies from 'vue-cookies'
export default {
  data() {
    return {
      selectTable: "1_fitness_measurement"
    }
  },
  mounted() {
    this.setIndex()
    this.checkConnect()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 2
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
    async nextTest(){
      this.$router.push(`/editattr/${this.selectTable}`)
      
      
    }
  },
}
</script>

<style>
#editTable{
  text-align: center;
}
</style>