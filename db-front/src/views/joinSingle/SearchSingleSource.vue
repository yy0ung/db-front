<template>
  <div id="searchSingleSource">
    <p class="blackTitle">단일 결합</p>
    <p class="blackSub">Source 테이블 검색</p>
    <div class="search-container">
      <span class="connectInput">테이블명 : <input class="searchInput" type="text" v-model="this.tableName"></span>
      <span class="connectInput">표준 결합키 : <input class="searchInput" type="text" v-model="this.headKey"></span>
      <span class="connectInput">대표속성 : <input class="searchInput" type="text" v-model="this.headAttr"></span>
      <span class="connectInput">속성명 : <input class="searchInput" type="text" v-model="this.attrName"></span>
      <button class="send-btn" @click="searchBtn">검색</button>
    </div>
    <p class="blackSub">선택 가능한 테이블 목록</p>
    <table>
      <tr>
        <th>테이블 명</th>
        <th>레코드 수</th>
        <th>대표 속성</th>
        <th>대표 결합키</th>
      </tr>
      <tr v-for="item in (this.scanData)" :key="item.테이블_명">
        <td @click="clickTable(item.테이블_명)" class="select-td">{{item.테이블_명}}</td>
        <td>{{item.레코드_수}}</td>
        <td>{{item.대표_속성}}</td>
        <td>{{item.대표_결합키}}</td>
      </tr>
    </table>
    <p class="blackSub">선택한 테이블 : {{this.selectTable}}</p>
    <button @click="nextTest">다음</button>
  </div>  
</template>

<script>
import axios from 'axios'
import VueCookies from 'vue-cookies'
export default {
  data() {
    return {
      selectTable: "",
      tableName : null,
      headKey :null,
      headAttr : null,
      attrName : null,
      scanData : []
    }
  },
  mounted() {
    this.setIndex()
    this.checkConnect()
    //this.search()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 3
    },
    async search(one, two, three, four){
      const response = await axios.post('/search', {tablename : one, key: two, att:three, attName:four})
      console.log(response.data)
      this.scanData = response.data
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
      this.$router.push(`/sjointsearch/${this.selectTable}`)
     
    },
    searchBtn(){
      this.search(this.tableName, this.headKey, this.headAttr, this.attName)
    },
    clickTable(item){
      this.selectTable = item
      console.log(this.selectTable)
    }
  },
}
</script>

<style>
.searchInput{
  font-family: 'Noto Sans KR';
  border-radius: 9px;
  width: 200px;
  height: 35px;
  margin-top: 20px;
  margin-left: 10px;
  padding-left: 15px;
  border: 0.75px solid #bec0d8;
  opacity: 1;
  background-color: #f4f5ff;
  font-size: 17px;
  color: black;
}
</style>