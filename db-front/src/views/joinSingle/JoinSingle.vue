<template>
  <div id="joinSingle">
    <p class="blackTitle">단일 결합</p>
    <p>단일 결합 결과</p>
    <button @click="singleJoin">조인</button>
    <div class="table-container">
      <table v-if="show">
        <tr>
          <th v-for="item in (Object.keys(this.joinData[0]))" :key="item">{{item}}</th>
        </tr>
        <tr v-for="item in (this.joinData)" :key="item">
          <td v-for="i in item" :key="i">{{i}}</td>
        </tr>
      </table>
    </div>
  </div>  
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      joinData : [],
      show : false
    }
  },
  mounted() {
    this.setIndex()
    this.singleJoin()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 3
    },
    async singleJoin(){
      const data = {
        table1 : "1_fitness_measurement",
        table2 : "2_physical_instructor_practice_info",
        att1 : "PHONE_NUM",
        att2 : "TEL_NO"
      }
      const response = await axios.post('/post/singlejoin', data)
      this.joinData = response.data
      this.show = true
      console.log("aa")
    }
  },
}
</script>

<style>

</style>