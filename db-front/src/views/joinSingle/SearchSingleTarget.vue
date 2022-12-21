<template>
  <div id="searchSingleTarget">
    <p class="blackTitle">단일 결합</p>
    <p class="blackSub">Target 테이블 검색</p>
    <p class="blackSub">현재 선택된 source 테이블</p>
    <div class="table-container">
      <table>
      <tr>
        <th>테이블 명</th>
        <th>레코드 수</th>
        <th>대표 속성</th>
        <th>대표 결합키</th>
      </tr>
      <tr>
        <td @click="clickTable(sourceData.테이블_명)">{{sourceData.테이블_명}}</td>
        <td>{{sourceData.레코드_수}}</td>
        <td>{{sourceData.대표_속성}}</td>
        <td>{{sourceData.대표_결합키}}</td>
      </tr>
      </table>
    </div>
    <p class="blackSub">선택 가능한 테이블 목록</p>
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
    
    <p class="blackSub">선택한 테이블 : {{this.targetTable}}</p>
    <button @click="nextTest" class="send-btn">다음</button>
    
  </div>  
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      sourceTable : this.$route.params.source,
      scanData : [],
      sourceData : {},
      targetData : [],
      targetTable : "",
      headKey: "",
      sourceAttr:"",
      attrArr:""
    }
  },
  mounted() {
    this.setIndex()
    this.search(null, null, null, null)
    //this.setSourceKey()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 3
    },
    async setSourceKey(){
      const response = await axios.post('/get/attrkey', {tablename : this.sourceTable , key:this.headKey})
      this.sourceAttr = response.data[0].속성명
      console.log(this.sourceAttr, "--------")
    },
    async test(){
      const response = await axios.post('/get/attrkey', {tablename : this.targetTable, key:this.headKey})
      this.attrArr = response.data[0].속성명
    },
    async nextTest(){
      this.$store.state.joinSingle = false
      this.$router.push(`/joinsingle/${this.sourceTable}/${this.targetTable}`)
      await this.test()
      this.singleJoinResultPost()
      this.singleJoin()
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

      console.log("aa",this.targetData)
      
    },
    clickTable(item){
      this.targetTable = item
      console.log(this.targetTable)
    },
    async singleJoin(){
      //get으로 각 att 불러오기
      
      const data = {
        table1 : this.sourceTable,
        table2 : this.targetTable,
        att1 : this.sourceAttr,
        att2 : this.attrArr
      }
      console.log("*****",data)
      const response = await axios.post('/post/singlejoin', data)
      this.joinData = response.data
      this.show = true
      console.log("aa")
    },
    async singleJoinResultPost(){
      const data = {
        table1 : this.sourceTable,
        table2 : this.targetTable,
        key: this.headKey
      }
      await axios.post('/post/singleresult', data)
    },
   
    
  },
}
</script>

<style>

</style>