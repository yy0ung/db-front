<template>
  <div id="searchMultiTarget">
    <p class="blackTitle">다중 결합</p>
    <p class="blackSub">Target 테이블 검색</p>
    <p class="blackSub">결합 가능한 테이블 목록</p>
    <div class="table-container">
      <table>
      <tr>
        <th>테이블 명</th>
        <th>레코드 수</th>
        <th>대표 속성</th>
        <th>대표 결합키</th>
        
      </tr>
      <tr v-for="item in (this.targetData)" :key="item.테이블_명">
        <td @click="clickTable(item.테이블_명)" class="select-td">{{item.테이블_명}}</td>
        <td>{{item.레코드_수}}</td>
        <td>{{item.대표_속성}}</td>
        <td>{{item.대표_결합키}}</td>
        
      </tr>
    </table>
    </div>
    <p class="blackSub">선택한 테이블 : {{this.selectTable}}  <button @click="reset" class="send-btn">초기화</button></p>
    
    <button class="send-btn" @click="startJoin">실행</button>
    <button @click="nextTest" class="send-btn">다음</button>
  </div>  
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      sourceTable : this.$route.params.source,
      selectTable: [],
      scanData : [],
      targetData : [],
      sourceData : {},
      headKey: "",
      attrArr: [],
      sourcKeyAttr: ""
    }
  },
  mounted() {
    this.setIndex()
    this.search(null, null, null, null)
    //this.setSourceKey()
  },
  methods: {
    async setSourceKey(){
      const response = await axios.post('/get/attrkey', {tablename : this.sourceTable , key:this.headKey})
      this.sourcKeyAttr = response.data[0].속성명
      console.log(this.sourcKeyAttr,"/////")
    },
    async test(){
      
      for(let t in this.selectTable){
        const response = await axios.post('/get/attrkey', {tablename : this.selectTable[t] , key:this.headKey})
        this.attrArr.push(response.data[0].속성명)
        console.log(response.data[0])
      }
      
      //
      //console.log(response.data[0])
    },
    setIndex(){
      this.$store.state.persist.indexColor = 4
    },
    nextTest(){
      
    },
    async search(one, two, three, four){
      const response = await axios.post('/search', {tablename : one, key: two, att:three, attName:four})
      console.log(response.data)
      this.scanData = response.data

      for(let d=0; d<this.scanData.length; d++){
        if(this.scanData[d].테이블_명==this.sourceTable){
          this.sourceData=this.scanData[d]
        }
      }

      for(let i=0; i<this.scanData.length; i++){
        //console.log(this.sourceData.대표_결합키, this.scanData[i].대표_결합키)
        if((this.sourceData.대표_결합키).indexOf(this.scanData[i].대표_결합키)>=0 && this.scanData[i].테이블_명!=this.sourceData.테이블_명){
          this.targetData.push(this.scanData[i])
        }
        
      }
      this.headKey = this.sourceData.대표_결합키
      this.setSourceKey()

      console.log(this.headKey)
      
    },
    clickTable(item){
      this.selectTable.push(item)
      console.log(this.selectTable)
    },
    async startJoin(){
      this.$store.state.joinMulti==false
      console.log("do")
      await this.test()
      this.multiJoin()
      this.multiJoinResultPost()
      
    },
    async multiJoin(){
      //get으로 각 att 불러오기
      
      const data = {
          table1 : this.sourceTable,
          table2 : this.selectTable,
          att1 : this.sourcKeyAttr,
          att2 : this.attrArr
        }
        const response = await axios.post('/post/multijoin', data)
        if(response.data){
          alert('결합 진행중')
        }
      
    },
    async multiJoinResultPost(){
      const data = {
          table1 : this.sourceTable,
          table2 : this.selectTable,
          key : this.headKey
        }
        await axios.post('/post/multiresult', data)
        console.log("bb")
    },
    
    reset(){
      this.selectTable = []
      console.log(this.selectTable)
    }
  },
}
</script>

<style>

</style>