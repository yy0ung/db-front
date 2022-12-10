<template>
  <div id="editTable2">
    <div class="modal-back" v-if="showModal==true">
      <div class="attr-modal" v-if="showModal==true">
      <p v-if="modalType==0">{{modalTitle.attr_name}} 대표 속성 편집하기</p>
      <p v-if="modalType==1">{{modalTitle.attr_name}} 대표 결합키 편집하기</p>
      <p v-if="modalType==2">{{modalTitle.attr_name}} 속성 타입 편집하기</p>
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
        <div v-if="attrSelect==1"><input v-if="modalType==0" type="text" v-model="userAddAttr"></div>
        <div v-if="keySelect==1"><input v-if="modalType==1" type="text" v-model="userAddKeyAttr"></div>
        <div v-if="modalType==2"><input type="text" v-model="userEditAttrType"></div>
        <button v-if="modalType==0" @click="postAttr">대표 속성 편집하기</button>
        <button v-if="modalType==1" @click="postKeyAttr">대표 결합키 편집하기</button>
        <button v-if="modalType==2" @click="putType">속성 타입 편집하기</button>
        <button @click="closeModal">닫기</button>
      </div>
    </div>
    <p class="blackTitle">테이블 속성 편집</p>
    <p>"선택한 테이블 명" 속성 도메인 스캔</p>
    <table>
      <tr>
        <th>속성명</th>
        <th>속성 타입</th>
        <th>속성 삭제</th>
        <th>대표속성명</th>
        <th>대표결합키</th>
      </tr>
      <tr v-for="item in (this.scanData)" :key="item.attr_name">
        <td>{{item.attr_name}}</td>
        <td>{{item.attr_type}} <button @click="openModal(item, 2)">편집</button></td>
        <td @click="deleteAttr(item)">삭제하기</td>
        <td v-if="item.head_attr==null" @click="openModal(item, 0)">설정하기</td>
        <td v-if="item.head_attr!=null">{{item.head_attr}} <button @click="openModal(item, 0)">편집</button></td>
        <td v-if="item.head_key==null" @click="openModal(item, 1)">설정하기</td>
        <td v-if="item.head_key!=null">{{item.head_key}} <button @click="openModal(item, 1)">편집</button></td>
      </tr>
    </table>
    
    
  </div>  
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      scanData : [],
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
      modalType : -1
    }
  },
  mounted() {
    this.setIndex()
    this.fetchScanResult()
    this.fetchAttrDic()
    this.fetchKeyDic()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 2
    },
    openModal(item, num){
      this.showModal = true
      this.modalType = num
      this.modalTitle = item
    },
    closeModal(){
      this.showModal = false
    },
    
    async postAttr(){
      if(this.attrSelect==1){
        try{
          await axios.post('/post/attr/dic', {id:null, attr:this.userAddAttr})
          await axios.put('/put/attr', {attr:this.userAddAttr, name:this.attrModalTitle.attr_name})
        }catch(e){ console.log(e) }
      }else{
        try{
          await axios.put('/put/attr', {attr:this.attrSelect, name:this.attrModalTitle.attr_name})
        }catch(e){ console.log(e) }
      }
      //this.showAttrModal = false
      this.$router.go('/editattr')
    },

    async postKeyAttr(){
      if(this.keySelect==1){
        try{
          await axios.post('/post/key/dic', {id:null, key:this.userAddKeyAttr})
          await axios.put('/put/key', {key:this.userAddKeyAttr, name:this.modalTitle.attr_name})
        }catch(e){ console.log(e) }
      }else{
        try{
          await axios.put('/put/key', {key:this.keySelect, name:this.modalTitle.attr_name})
        }catch(e){ console.log(e) }
      }
      //this.showAttrModal = false
      this.$router.go('/editattr')
    },
    async putType(){
      try{
        await axios.put('/edit/type', {type:this.userEditAttrType, name:this.modalTitle.attr_name})
        this.$router.go('/editattr')
      }catch(e){ console.log(e) }
    },
    async fetchScanResult(){
      try {
        const response = await axios.get("/scan");
        this.scanData = response.data
      } catch (error) {
        console.log(error);
      }
    
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
    async deleteAttr(item){
      if(confirm(item.attr_name+" 속성을 영구 삭제하시겠습니까?")){
          try{
            console.log("지우고")
            await axios.delete('/delete/attr', {data : {name : item.attr_name}})
            this.$router.go('/editattr')
          }catch(e){ console.log(e) }
        }else{
          console.log("no")
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
    width: 300px;
    height: 200px;
    background: white;
  }
  .blackTitle{
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
  }
</style>