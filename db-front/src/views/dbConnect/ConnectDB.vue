<template>
  <div id="connectDB">
    <p class="blackTitle">DB 연결 관리</p>
    <div class="connect-container">
      <p class="connectInput">H O S T : <input type="text" v-model="this.host"></p>
      <p class="connectInput">P O R T : <input type="text" v-model="this.port"></p>
      <p class="connectInput">DATABASE: <input type="text" v-model="this.db"></p>
      <p class="connectInput">U S E R : <input type="text" v-model="this.user"></p>
      <p class="connectInput">PASSWORD: <input type="text" v-model="this.pw"></p>
      <button @click="setDB">DB 연결하기</button>
      <p class="connectWarn" @click="test">DB에 연결해야 CSV 업로드가 가능합니다.</p>
    </div>
    <div v-if="this.page==1">
      aa
    </div>
  </div>  
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      host : "",
      port : "",
      db : "",
      user : "",
      pw: "",
      
    }
  },
  mounted() {
    this.setIndex()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 0
    },
  
    //db 정보 입력하기
    async setDB() {
      let data = {}
        data.host = this.host
        data.port = this.port
        data.db = this.db
        data.user = this.user
        data.pw = this.pw
      try {
        const response = await axios.post("/db/connect", data);
        if(response.data){
          this.$store.state.dbConnect.host = this.host
          this.$store.state.dbConnect.port = this.port
          this.$store.state.dbConnect.db = this.db
          this.$router.push('/uploadfile')
        }else{
          alert('입력한 정보를 확인하세요')
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style>

</style>