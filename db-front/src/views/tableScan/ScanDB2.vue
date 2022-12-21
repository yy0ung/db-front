<template>
  <div id="scanDB2">
    <div class="modal-back" v-if="showModal==true">
      <div class="attr-modal" v-if="showModal==true">
      <p class="modal-title" v-if="modalType==0">{{modalTitle.속성명}} 대표 속성 선택하기</p>
      <p class="modal-title" v-if="modalType==1">{{modalTitle.속성명}} 대표 결합키 선택하기</p>
        <select class="attrKeySelect" v-model="attrSelect" v-if="modalType==0">
          <option selected disabled hidden :value=0>속성 사전값 보기</option>
          <option v-for="opt in (this.attrDicData)" :key="opt.attr">{{opt.attr}}</option>
          <option :value=1>사용자 추가</option>
        </select>
        <select class="attrKeySelect" v-model="keySelect" v-if="modalType==1">
          <option selected disabled hidden :value=0>대표 결합키 사전값 보기</option>
          <option v-for="opt in (this.keyDicData)" :key="opt.key_attr">{{opt.key_attr}}</option>
          <option :value=1>사용자 추가</option>
        </select>
        <div v-if="attrSelect==1"><input class="modal-input" v-if="modalType==0" type="text" v-model="userAddAttr" placeholder="입력하세요"></div>
        <div v-if="keySelect==1"><input class="modal-input" v-if="modalType==1" type="text" v-model="userAddKeyAttr" placeholder="입력하세요"></div>
        <button v-if="modalType==0" class="send-btn" @click="postAttr">대표 속성 설정하기</button>
        <button v-if="modalType==1" class="send-btn" @click="postKeyAttr">대표 결합키 설정하기</button>
        <button @click="closeModal" class="send-btn" id="btn-close">닫기</button>
      </div>
    </div>
    <p class="blackTitle">테이블 속성 도메인 스캔</p>
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
        <td v-if="item.대표_속성==null" @click="openModal(item, 0, 0)" class="table-btn">설정하기</td>
        <td v-if="item.대표_속성!=null" @click="openModal(item, 0, 0)">{{item.대표_속성}}</td>
        <td v-if="item.결합키_후보!=null">O</td>
        <td v-if="item.결합키_후보==null">X</td>
        <td v-if="item.대표_결합키==null && item.결합키_후보!=null" @click="openModal(item, 1, 0)" class="table-btn">설정하기</td>
        <td v-if="item.대표_결합키==null && item.결합키_후보==null">-</td>
        <td v-if="item.대표_결합키!=null" @click="openModal(item, 1, 0)">{{item.대표_결합키}}</td>
        
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
        <td v-if="item.대표_속성==null" @click="openModal(item, 0, 1)" class="table-btn">설정하기</td>
        <td v-if="item.대표_속성!=null" @click="openModal(item, 0, 1)">{{item.대표_속성}}</td>
        <td v-if="item.결합키_후보!=null">O</td>
        <td v-if="item.결합키_후보==null">X</td>
        <td v-if="item.대표_결합키==null && item.결합키_후보!=null" @click="openModal(item, 1, 1)" class="table-btn">설정하기</td>
        <td v-if="item.대표_결합키==null && item.결합키_후보==null">-</td>
        <td v-if="item.대표_결합키!=null" @click="openModal(item, 1, 1)">{{item.대표_결합키}}</td>
        
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
      attrDicData : [],
      keyDicData : [],
      attrSelect : 0,
      keySelect : 0,
      showModal : false,
      showInput : false,
      modalTitle : "",
      userAddAttr:"",
      userAddKeyAttr:"",
      modalType : -1,
      tableType : "",
      loading :true
    }
  },
  mounted() {
    this.setIndex()
    //this.fetchScanResult()
    this.fetchAttrDic()
    this.fetchKeyDic()
    this.fetchT()
  },
  methods: {
    async fetchT(){
      let responseS = null
      let responseC = null
      
      while(responseS==null || responseC==null || responseS.data[responseS.data.length-1]==null){
        responseS = await axios.get(`/api/statistictable/${this.tableName}`)
        responseC = await axios.get(`/api/categorytable/${this.tableName}`)
        console.log("loading")
      }
      
      this.scanDataS = responseS.data
      this.scanDataC = responseC.data
      console.log()
      this.loading = false

      const re = await axios.put('/put/scanbool', {table : this.tableName})
      console.log(re.data)
      
    },
    setIndex(){
      this.$store.state.persist.indexColor = 1
    },
    openModal(item, num, type){
      this.showModal = true
      this.modalType = num
      this.modalTitle = item
      if(type==0){
        this.tableType = this.tableName+"_category_attribute"
      }else{
        this.tableType = this.tableName+"_statistic_attribute"
      }
    },
    closeModal(){
      this.showModal = false
    },
    
    async postAttr(){
      if(this.attrSelect==1){
        try{
          await axios.post('/post/attr/dic', {id:null, attr:this.userAddAttr})
          await axios.put('/put/attr', {table:this.tableType, attr:this.userAddAttr, name:this.modalTitle.속성명})
        }catch(e){ console.log(e) }
      }else{
        try{
          await axios.put('/put/attr', {table:this.tableType, attr:this.attrSelect, name:this.modalTitle.속성명})
        }catch(e){ console.log(e) }
      }
      //this.showAttrModal = false
      this.$router.go()
    },

    async postKeyAttr(){
      if(this.keySelect==1){
        try{
          await axios.post('/post/key/dic', {id:null, key:this.userAddKeyAttr})
          await axios.put('/put/key', {table:this.tableType, key:this.userAddKeyAttr, name:this.modalTitle.속성명})
        }catch(e){ console.log(e) }
      }else{
        try{
          await axios.put('/put/key', {table:this.tableType, key:this.keySelect, name:this.modalTitle.속성명})
        }catch(e){ console.log(e) }
      }
      //this.showAttrModal = false
      this.$router.go()
    },
    async fetchAttrDic(){
      try {
        const response = await axios.get("/attr/dic");
        this.attrDicData = response.data
      } catch (error) {
        console.log(error);
      }
    
    },
    async fetchKeyDic(){
      try {
        const response = await axios.get("/key/dic");
        this.keyDicData = response.data
      } catch (error) {
        console.log(error);
      }
    
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
    }
  },
}
</script>

<style>
  .modal-back{
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }
  .attr-modal{
    width: 400px;
    height: 220px;
    margin: 250px auto;
    padding-left: 70px;
    padding-right: 70px;
    padding-top: 20px;
    padding-bottom: 30px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    z-index: 2;
    text-align: center;
  }
  .blackSub{
    text-align: center;
    font-size: 1.2rem;
    font-weight: 500;
    color: #21365e;
  }
  .table-container{
    display: flex;
    justify-content: center;
  }
  .blackTitle{
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: #21365e;
  }
  table{
    border-collapse: collapse;
  }
  th, td{
    border: #0000009C 0.5px solid;
    font-weight: 400;
    padding: 9px;
    padding-right: 15px;
  }
  th{
    background: #e0e8f7;
    text-align: center;
  }
  .table-btn{
    color: #3c58b3;
    text-decoration: underline;
    cursor: pointer;
    text-align: center;
  }
  .attrKeySelect{
    font-family: 'Noto Sans KR', sans-serif;
    margin-top: 10px;
    padding-left: 5px;
    width: 250px;
    height: 40px;
    background-color: #f3f7ff;
    font-size: 15px;
    cursor: pointer;
    border: none;
  }
  .modal-input{
    font-family: 'Noto Sans KR';
    border: 10px;
    width: 230px;
    height: 30px;
    margin-top: 10px;
    padding-left: 15px;
    border: 2px solid #a5aec0;
    opacity: 1;
    font-size: 15px;
    color: black;
  }
  #btn-close{
    margin-left: 5px;
  }
  .spinner{
  text-align: center;
  font-size: 1.5rem;
  font-family: 'Noto Sans KR', sans-serif;
  color: #3c58b3;
  margin-top: 150px;
}
  
  
</style>