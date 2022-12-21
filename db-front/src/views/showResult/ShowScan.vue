<template>
  <div id="ShowScan">
    <p class="blackTitle">테이블 속성 도메인 스캔</p>
    <div class="index-container">
      <span class="blackBack">속성 스캔 결과 조회</span>
      <span class="grayBack" @click="goSingle">단일 결합 결과 조회</span>
      <span class="grayBack" @click="goMulti">다중 결합 결과 조회</span>
    </div>
    <p class="blackSub">"{{tableName}}" 속성 도메인 스캔</p>
    <p class="blackSub" v-if="loading==false">범주속성 도메인 스캔</p>
    <div class="spinner" v-if="loading==true">
        <i class="fas fa-spinner"></i>
          불러오는 중
      </div>
    <div class="table-container" v-if="loading==false">
      <table>
      <tr>
        <th>속성명</th>
        <th>데이터 타입</th>
        <th>NULL 레코드 수</th>
        <th>NULL 레코드 비율</th>
        <th>상이 범주값</th>
        <th>특수문자 포함 레코드 수</th>
        <th>특수문자 포함 레코드 비율</th>
        <th>대표속성</th>
        <th>결합키 후보</th>
        <th>대표결합키</th>
        
      </tr>
      <tr v-for="item in (this.scanDataC)" :key="item.속성명">
        <td>{{item.속성명}}</td>
        <td>{{item.데이터_타입}}</td>
        <td>{{item.NULL_레코드_수}}</td>
        <td>{{item.NULL_레코드_비율}}</td>
        <td>{{item.상이_범주_값}}</td>
        <td>{{item.특수문자_포함_레코드_수}}</td>
        <td>{{item.특수문자_포함_레코드_비율}}</td>
        <td v-if="item.대표_속성==null">-</td>
        <td v-if="item.대표_속성!=null">{{item.대표_속성}}</td>
        <td v-if="item.결합키_후보!=null">O</td>
        <td v-if="item.결합키_후보==null">X</td>
        <td v-if="item.대표_결합키==null">-</td>
        <td v-if="item.대표_결합키!=null">{{item.대표_결합키}}</td>
        
      </tr>
    </table>
    
    </div>
    <button class="send-btn" @click="makeCsv(0)">범주속성 스캔 결과 내려받기</button>

    <p class="blackSub" v-if="loading==false">수치속성 도메인 스캔</p>
    <div class="table-container" v-if="loading==false">
      <table>
      <tr>
        <th>속성명</th>
        <th>데이터 타입</th>
        <th>NULL 레코드 수</th>
        <th>NULL 레코드 비율</th>
        <th>상이 수치값</th>
        <th>최대 값</th>
        <th>최소 값</th>
        <th>0 레코드 수</th>
        <th>0 레코드 비율</th>
        <th>대표속성</th>
        <th>결합키 후보</th>
        <th>대표결합키</th>
        
      </tr>
      <tr v-for="item in (this.scanDataS)" :key="item.속성명">
        <td>{{item.속성명}}</td>
        <td>{{item.데이터_타입}}</td>
        <td>{{item.NULL_레코드_수}}</td>
        <td>{{item.NULL_레코드_비율}}</td>
        <td>{{item.상이_수치_값}}</td>
        <td>{{item.최대_값}}</td>
        <td>{{item.최소_값}}</td>
        <td>{{item.영_레코드_수}}</td>
        <td>{{item.영_레코드_비율}}</td>
        <td v-if="item.대표_속성==null">-</td>
        <td v-if="item.대표_속성!=null">{{item.대표_속성}}</td>
        <td v-if="item.결합키_후보!=null">O</td>
        <td v-if="item.결합키_후보==null">X</td>
        <td v-if="item.대표_결합키==null">-</td>
        <td v-if="item.대표_결합키!=null">{{item.대표_결합키}}</td>
        
      </tr>
    </table>
    
    </div>
    <button class="send-btn" @click="makeCsv(1)">수치속성 스캔 결과 내려받기</button>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      tableName : this.$route.params.file,
      scanDataS : [],
      scanDataC : [],
      tableType : "",
      loading :true
    }
  },
  mounted() {
    this.setIndex()
    //this.fetchScanResult()
    this.fetchT()
  },
  methods: {
    async fetchT(){
      let responseS = null
      let responseC = null
      while(responseS==null || responseC==null){
        responseS = await axios.get(`/api/statistictable/${this.tableName}`)
        responseC = await axios.get(`/api/categorytable/${this.tableName}`)
        console.log("loading")
      }
      
      this.scanDataS = responseS.data
      this.scanDataC = responseC.data
      console.log(responseS.data.length, this.scanDataS.length, responseS.data[responseS.data.length-1].NULL_레코드_비율)
      this.loading = false
      
    },
    setIndex(){
      this.$store.state.persist.indexColor = 5
    },
    
    async makeCsv(type){
      var makeC = null
      if(type==0){
        makeC = this.tableName+"_category_attribute"
      }else{
        makeC = this.tableName+"_statistic_attribute"
      }
      const response = await axios.get(`/download/${makeC}`)
      if(response){
        alert('다운로드 성공')
      }
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

</style>