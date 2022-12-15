<template>
  <div id="connectDB">
    <p class="blackTitle">DB 연결 관리</p>
    <div class="connect-container">
      <p class="connectInput">H O S T : <input class="cDBInput" type="text" v-model="this.host"></p>
      <p class="connectInput">P O R T : <input class="cDBInput" type="text" v-model="this.port"></p>
      <p class="connectInput">DATABASE: <input class="cDBInput" type="text" v-model="this.db"></p>
      <p class="connectInput">U S E R : <input class="cDBInput" type="text" v-model="this.user"></p>
      <p class="connectInput">PASSWORD: <input class="cDBInput" type="password" v-model="this.pw"></p>
      <button class="send-btn" @click="setDB">DB 연결하기</button>
      <button id="non-active" v-if="nextBtnActive==false">csv 업로드하러가기</button>
      <button class="send-btn" id="active" @click="next" v-if="nextBtnActive==true">csv 업로드하러가기</button>
      <p class="connectWarn" @click="test">* DB에 연결해야 CSV 업로드가 가능합니다.</p>
    </div>
    
  </div>  
</template>

<script>
import axios from 'axios'
import VueCookies from 'vue-cookies'

export default {
  data() {
    return {
      host : "",
      port : "",
      db : "",
      user : "",
      pw: "",
      nextBtnActive : false
      
    }
  },
  mounted() {
    this.setIndex()
    this.checkConnect()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 0
    },
    checkConnect(){
      
      if(!VueCookies.isKey("info")){
        this.nextBtnActive = false
        }else{
          this.nextBtnActive = true
        }
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
          console.log("aa")
          VueCookies.set("info", this.host+"&"+this.port+"%"+this.db, "1d")
          this.$router.go()
          
        }else{
          alert('입력한 정보를 확인하세요')
        }
      } catch (error) {
        console.log(error);
      }
    },
    next(){
      this.$router.push('/uploadfile')
    }
  }
}

</script>

<style>
#connetDB{
  
  margin-left: auto;
  margin-right: auto;
  
}
.connect-container{
  margin-top: 50px;
  text-align: center;
}

.cDBInput{
  font-family: 'Noto Sans KR';
  border-radius: 9px;
  width: 300px;
  height: 35px;
  margin-top: 20px;
  margin-left: 10px;
  padding-left: 15px;
  border: 0.75px solid #bec0d8;
  opacity: 1;
  background-color: #f4f5ff;
  font-size: 17px;
  color: black;
}
.send-btn{
  background-color: #FFFFFF;
  border: 1px solid #3c58b3;
  padding: 8px 20px;
  margin-top: 25px;
  color: #3c58b3;
  font-family: 'Noto Sans KR';
  font-size: 1rem;
  font-weight: medium;
  border-radius: 26px;
  cursor: pointer; 
}
.send-btn:hover{
  color: white;
  background-color: #3c58b3;
}
#non-active{
  border: 1px solid #afafaf;
  color: #afafaf;
  margin-left: 5px;
  background-color: #FFFFFF;
  padding: 8px 20px;
  margin-top: 25px;
  font-family: 'Noto Sans KR';
  font-size: 1rem;
  font-weight: medium;
  border-radius: 26px;
  cursor: pointer; 
}

#active{
  margin-left: 5px;
}
</style>