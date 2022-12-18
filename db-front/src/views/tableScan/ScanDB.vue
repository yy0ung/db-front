<template>
  <div id="scanDB">
    <p class="blackTitle">테이블 속성 도메인 스캔</p>
    <p class="blackSub">대상 테이블 선택</p>
    <div class="table-container">
      <table>
      <tr>
        <th>테이블 명</th>
        <th>레코드 수</th>
        <th>속성</th>
      </tr>
      <tr v-for="item in (this.scanData)" :key="item.테이블_명">
        <td>{{item.테이블_명}}</td>
        <td>{{item.레코드_수}}</td>
        <td>{{item.속성}}</td>
      </tr>
    </table>
    </div>
    <button @click="nextTest" class="send-btn">선택하기</button>
  </div>  
</template>

<script>
import axios from 'axios'
import VueCookies from 'vue-cookies'
export default {
  data() {
    return {
      selectTable: "5_bank_marketing",
      scanData: []
    }
  },
  mounted() {
    this.setIndex()
    this.checkConnect()
    this.fetchTable()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 1
    },
    async fetchTable(){
      const response = await axios.get('/get/csvdonetable')
      this.scanData = response.data
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
    async nextTest(){
      this.$router.push(`/scanattr/${this.selectTable}`)
      await axios.post('/scan/scantable', {table : this.selectTable})
      
    }
  },
}
</script>

<style>
#scanDB{
  text-align: center;
}
</style>