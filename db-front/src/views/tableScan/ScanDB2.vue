<template>
  <div id="scanDB2">
    <div class="modal-back" v-if="showAttrModal==true">
      <div class="attr-modal" v-if="showAttrModal==true">
      <p>{{attrModalTitle.attr_name}} 대표 속성 선택하기</p>
        <select class="attrSelect" v-model="attrSelect">
          <option selected disabled hidden :value=0>속성 사전값 보기</option>
          <option v-for="opt in (this.attrDicData)" :key="opt.attr">{{opt.attr}}</option>
          <option :value=1>사용자 추가</option>
        </select>
        <div v-if="attrSelect==1"><input type="text" v-model="userAddAttr"></div>
        <button @click="postAttr">click</button>
      </div>
    </div>
    <p class="blackTitle">테이블 속성 도메인 스캔</p>
    <p>"선택한 테이블 명" 속성 도메인 스캔</p>
    <table>
      <tr>
        <th>속성명</th>
        <th>속성 타입</th>
        <th>대표속성명</th>
        <th>대표결합키</th>
      </tr>
      <tr v-for="item in (this.scanData)" :key="item.attr_name">
        <td>{{item.attr_name}}</td>
        <td>{{item.attr_type}}</td>
        <td @click="openAttrModal(item)">{{item.head_attr}}</td>
        <td>{{item.head_key}}</td>
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
      showAttrModal : false,
      showInput : false,
      attrModalTitle : "",
      userAddAttr:""
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
      this.$store.state.persist.indexColor = 1
    },
    openAttrModal(item){
      this.showAttrModal = true
      this.attrModalTitle = item
    },
    logg(){
      
      
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
      this.$router.go('/scanattr')
    },
    async fetchScanResult(){
      try {
        const response = await axios.get("/scan");
        console.log(response.data)
        this.scanData = response.data
        console.log(this.scanData[0].attr_name)
      } catch (error) {
        console.log(error);
      }
    
    },
    async fetchAttrDic(){
      try {
        const response = await axios.get("/attr/dic");
        console.log(response.data)
        this.attrDicData = response.data
        //console.log(this.scanData[0].attr_name)
      } catch (error) {
        console.log(error);
      }
    
    },
    async fetchKeyDic(){
      try {
        const response = await axios.get("/key/dic");
        console.log(response.data)
        this.keyDicData = response.data
        //console.log(this.scanData[0].attr_name)
      } catch (error) {
        console.log(error);
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
</style>