<template>
  <div id="editTable2">
    <div class="modal-back" v-if="showModal==true">
      <div class="attr-modal" v-if="showModal==true">
      <p class="modal-title" v-if="modalType==0">{{modalTitle.속성명}} 대표 속성 편집하기</p>
      <p class="modal-title" v-if="modalType==1">{{modalTitle.속성명}} 대표 결합키 편집하기</p>
      <p class="modal-title" v-if="modalType==2">{{modalTitle.속성명}} 속성 타입 편집하기</p>
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
        <div v-if="modalType==2"><input class="modal-input" type="text" v-model="userEditAttrType" placeholder="입력하세요"></div>
        <button v-if="modalType==0" @click="postAttr" class="send-btn">대표 속성 편집하기</button>
        <button v-if="modalType==1" @click="postKeyAttr" class="send-btn">대표 결합키 편집하기</button>
        <button v-if="modalType==2" @click="putType" class="send-btn">속성 타입 편집하기</button>
        <button @click="closeModal" class="send-btn" id="edit-modal-btn">닫기</button>
      </div>
    </div>
    <p class="blackTitle">테이블 속성 편집</p>
    <p class="blackSub">"{{tableName}}" 속성 도메인 스캔</p>
    <p class="blackSub">범주속성 도메인 스캔</p>
    <div class="table-container">
      <table>
      <tr>
        <th>속성명</th>
        <th>데이터 타입</th>
        <th>속성 삭제</th>
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
        <td>{{item.데이터_타입}} <span @click="openModal(item, 2, 0)" class="table-btn-edit">편집</span></td>
        <td @click="deleteAttr(item, 0)" class="table-btn-del">삭제하기</td>
        <td>{{item.NULL_레코드_수}}</td>
        <td>{{item.NULL_레코드_비율}}</td>
        <td>{{item.상이_범주_값}}</td>
        <td>{{item.특수문자_포함_레코드_수}}</td>
        <td>{{item.특수문자_포함_레코드_비율}}</td>
        <td v-if="item.대표_속성==null" @click="openModal(item, 0, 0)" class="table-btn">설정하기</td>
        <td v-if="item.대표_속성!=null">{{item.대표_속성}} <span @click="openModal(item, 0, 0)" class="table-btn-edit">편집</span></td>
        <td>{{item.결합키_후보}}</td>
        <td v-if="item.대표_결합키==null" @click="openModal(item, 1, 0)" class="table-btn">설정하기</td>
        <td v-if="item.대표_결합키!=null" @click="openModal(item, 1, 0)">{{item.대표_결합키}} <span @click="openModal(item, 1, 0)" class="table-btn-edit">편집</span></td>
      </tr>
      </table>
    </div>

    <p class="blackSub">수치속성 도메인 스캔</p>
    <div class="table-container">
      <table>
      <tr>
        <th>속성명</th>
        <th>데이터 타입</th>
        <th>속성 삭제</th>
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
        <td>{{item.데이터_타입}} <span @click="openModal(item, 2, 1)" class="table-btn-edit">편집</span></td>
        <td @click="deleteAttr(item, 1)" class="table-btn-del">삭제하기</td>
        <td>{{item.NULL_레코드_수}}</td>
        <td>{{item.NULL_레코드_비율}}</td>
        <td>{{item.상이_수치_값}}</td>
        <td>{{item.최대_값}}</td>
        <td>{{item.최소_값}}</td>
        <td>{{item.영_레코드_수}}</td>
        <td>{{item.영_레코드_비율}}</td>
        <td v-if="item.대표_속성==null" @click="openModal(item, 0, 1)" class="table-btn">설정하기</td>
        <td v-if="item.대표_속성!=null">{{item.대표_속성}} <span @click="openModal(item, 0, 1)" class="table-btn-edit">편집</span></td>
        <td>{{item.결합키_후보}}</td>
        <td v-if="item.대표_결합키==null" @click="openModal(item, 1, 1)" class="table-btn">설정하기</td>
        <td v-if="item.대표_결합키!=null" @click="openModal(item, 1, 1)">{{item.대표_결합키}} <span @click="openModal(item, 1, 0)" class="table-btn-edit">편집</span></td>
      </tr>
    </table>
    </div>
    <button class="send-btn" @click="doneEdit">편집 완료하기</button>
    
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
      userEditAttrType:"",
      modalType : -1,
      tableType : ""
    }
  },
  mounted() {
    this.setIndex()
    
    this.fetchAttrDic()
    this.fetchKeyDic()
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
      
    },
    setIndex(){
      this.$store.state.persist.indexColor = 2
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

    //여기부터
    async putType(){
      try{
        await axios.put('/edit/type', {table: this.tableType, type:this.userEditAttrType, name:this.modalTitle.속성명})
        this.$router.go()
      }catch(e){ console.log(e) }
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
    async deleteAttr(item, type){
      if(type==0){
        this.tableType = this.tableName+"_category_attribute"
      }else{
        this.tableType = this.tableName+"_statistic_attribute"
      }
      if(confirm(item.속성명+" 속성을 영구 삭제하시겠습니까?")){
          try{
            console.log("지우고")
            await axios.delete('/delete/attr', {data : {table: this.tableType, name : item.속성명}})
            this.$router.go()
          }catch(e){ console.log(e) }
        }else{
          console.log("no")
        }
    },
    async doneEdit(){
      await axios.post('/post/scandonetable', {fileName: this.tableName})
      console.log("done")
      this.$router.push('/sjoinssearch')
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
  
  .table-btn-edit{
    color: #3c58b3;
    text-decoration: underline;
    cursor: pointer;
  }
  .table-btn-del{
    color: #833636;
    text-decoration: underline;
    cursor: pointer;
    text-align: center;
  }
  #edit-modal-btn{
    margin-left: 5px;
  }
  
</style>