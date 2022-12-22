<template>
  <div id="showMulti">
    <p class="blackTitle">결과 조회</p>
    <div class="index-container">
      <span class="grayBack" @click="goScan">속성 스캔 결과 조회</span>
      <span class="grayBack" @click="goSingle">단일 결합 결과 조회</span>
      <span class="blackBack">다중 결합 결과 조회</span>
    </div>
    <div class="spinner" v-if="this.$store.state.joinMulti==false">
        <i class="fas fa-spinner"></i>
          불러오는 중
      </div>
    <p>다중 결합 결과</p>
    <div class="table-container" v-if="this.$store.state.joinMulti==true">
      <table>
        <tr>
          <th>Source 테이블</th>
          <th>테이블 A레코드 수</th>
          <th>결합키 속성A</th>
          <th>Target 테이블</th>
          <th>테이블 B레코드 수</th>
          <th>결합키 속성B</th>
          <th>대표 결합키</th>
          <th>결과 레코드 수</th>
          <th>결합 성공률 (W1)</th>
          <th>결합 성공률 (W2)</th>
          <th>결합 진행상황</th>
          <th>결합 테이블 명</th>
          <th>CSV 저장</th>
        </tr>
        <tr v-for="item in (this.joinResult)" :key="item">
          <td>{{item.테이블A}}</td>
          <td>{{item.테이블A_레코드_수}}</td>
          <td>{{item.결합키_속성A}}</td>
          <td>{{item.테이블B}}</td>
          <td>{{item.테이블B_레코드_수}}</td>
          <td>{{item.결합키_속성B}}</td>
          <td>{{item.대표_결합키}}</td>
          <td>{{item.결과_레코드_수}}</td>
          <td>{{item.결합_성공률_W1}}</td>
          <td>{{item.결합_성공률_W2}}</td>
          <td v-if="this.$store.state.joinMulti = false">진행중</td>
          <td v-if="this.$store.state.joinMulti = true">완료</td>
          <td>multi_{{item.테이블A}}_{{item.테이블B}}</td>
          <td class="table-btn" @click="makeCsv(item.테이블A, item.테이블B)">
            다운로드</td>
        </tr>
      </table>
    </div>
    <button class="send-btn" @click="makeCsvRes" v-if="this.$store.state.joinMulti==true">다중 결합 결과 다운로드</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      joinData : [],
      joinResult : [],
      show : false,
  
    }
  },
  mounted() {
    this.setIndex()
    //this.singleJoin()
    this.getMultiResult()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 5
    },
    // async singleJoin(){
    //   const response = await axios.get(`/get/singlejoin/${this.source}/2_physical_instructor_practice_info`)
    //   this.joinData = response.data
    //   console.log(response.data)
    //   this.show = true
    // },

    async getMultiResult(){
      const response = await axios.get('/get/multiresult')
      this.joinResult = response.data
      console.log(response.data)
      this.show = true
      this.$store.state.joinMulti==true
    },
    goSingle(){
      this.$router.push('/showsingle')
    },
    goMulti(){
      this.$router.push('/showmulti')
    },
    goScan(){
      this.$router.push('/showresult')
    },
    async makeCsv(a,b){
      var fileCsv = "multi_"+a+"_"+b
      const response = await axios.get(`/download/${fileCsv}`)
      if(response){
        alert('다운로드 성공')
      }
    },
    async makeCsvRes(){
      var fileCsv = "multi_join_result"
      const response = await axios.get(`/download/${fileCsv}`)
      if(response){
        alert('다운로드 성공')
      }
    }    
    
  },
}
</script>

<style>

</style>