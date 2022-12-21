<template>
  <div id="showResult">
    <p class="blackTitle">결과 조회</p>
    <div class="index-container">
      <span class="blackBack">속성 스캔 결과 조회</span>
      <span class="grayBack" @click="goSingle">단일 결합 결과 조회</span>
      <span class="grayBack" @click="goMulti">다중 결합 결과 조회</span>
    </div>
    <p class="blackSub">속성 스캔 완료 테이블 목록</p>
    <p class="blackSub">선택 테이블 : {{this.selectTable}}</p>
    <div class="table-container">
      <table>
      <tr>
        <th>테이블 명</th>
        <th>레코드 수</th>
        <th>속성</th>
      </tr>
      <tr v-for="item in (this.scanData)" :key="item.테이블_명">
        <td  @click="clickTable(item.테이블_명)" class="select-td" v-if="item.스캔여부==1">{{item.테이블_명}}</td>
        <td v-if="item.스캔여부==1">{{item.레코드_수}}</td>
        <td v-if="item.스캔여부==1">{{item.속성}}</td>
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
      selectTable: "",
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
      this.$store.state.persist.indexColor = 5
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
      this.$router.push(`/showscan/${this.selectTable}`)
    },
    clickTable(item){
      this.selectTable = item
    },
    goSingle(){
      this.$router.push('/showsingle')
    },
    goMulti(){
      this.$router.push('/showmulti')
    }
  },
}
</script>

<style>
.index-container{
  text-align: center;
  margin-bottom: 60px;
}
.index-container span{
  margin-right: 30px;
}
.grayBack{
    text-align: center;
    font-size: 1.2rem;
    font-weight: 500;
    color: #494949;
    cursor: pointer;
  }
.blackBack{
    text-align: center;
    font-size: 1.2rem;
    font-weight: 300;
    color: #ffffff;
    background: rgb(12, 45, 136);
    cursor: pointer;
  }
</style>