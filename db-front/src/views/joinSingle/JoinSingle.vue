<template>
  <div id="joinSingle">
    <p class="blackTitle">단일 결합</p>
    <p>단일 결합 결과</p>
    <div class="table-container">
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
          <td>진행상황</td>
          <td>{{item.결합_테이블_명}}</td>
        </tr>
      </table>
    </div>
    <!-- <div class="table-container">
      <table v-if="show">
        <tr>
          <th v-for="item in (Object.keys(this.joinData[0]))" :key="item">{{item}}</th>
        </tr>
        <tr v-for="item in (this.joinData)" :key="item">
          <td v-for="i in item" :key="i">{{i}}</td>
        </tr>
      </table>
    </div> -->
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
    async singleJoin(){
      const response = await axios.get(`/get/singlejoin/${this.source}/2_physical_instructor_practice_info`)
      this.joinData = response.data
      console.log(response.data)
      this.show = true
    },

    async getSingleResult(){
      const response = await axios.get(`/get/singleresult/${this.source}/2_physical_instructor_practice_info`)
      this.joinResult = response.data
      console.log(response.data)
      this.show = true
    }

    
    
  },
}
</script>

<style>

</style>