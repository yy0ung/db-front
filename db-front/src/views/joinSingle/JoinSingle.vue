<template>
  <div id="joinSingle">
    <p class="blackTitle">단일 결합</p>
    <p>단일 결합 결과</p>
    <div class="spinner" v-if="this.$store.state.joinSingle==false || this.show==false">
        <i class="fas fa-spinner"></i>
          불러오는 중
      </div>
    <div class="table-container" v-if="this.$store.state.joinSingle && this.show">
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
          <td>완료</td>
          <td>single_{{item.테이블A}}_{{item.테이블B}}</td>
          <td class="table-btn" @click="makeCsv">다운로드</td>
        </tr>
      </table>
    </div>
    <button class="send-btn" @click="makeCsvRes" v-if="this.$store.state.joinSingle && this.show">단일 결합 결과 다운로드</button>
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
      source : this.$route.params.source,
      target : this.$route.params.target
    }
  },
  mounted() {
    this.setIndex()
    //this.singleJoin()
    this.getSingleResult()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 3
    },

    async getSingleResult(){
      setTimeout(async ()=>{
        const response = await axios.get('/get/singleresult')
        this.joinResult = response.data
        console.log(response.data)
        this.$store.state.joinSingle = true
        this.show = true
      },3000)
    },
    async makeCsv(){
      var fileCsv = "single_"+this.source+"_"+this.target
      const response = await axios.get(`/download/${fileCsv}`)
      if(response){
        alert('다운로드 성공')
      }
    },
    async makeCsvRes(){
      var fileCsv = "single_join_result"
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