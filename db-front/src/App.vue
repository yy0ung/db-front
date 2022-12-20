<template>
  <div id="app">
    <div class="app-container">
      <div id="nav">
        <div class="dbInfo">
          <p @click="cancle">DB 정보</p>
          <p>HOST : {{host}} PORT : {{port}}</p>
          <p>DATABASE : {{db}}</p>
        </div>
        <div class="navTitle">
          <router-link to="/connect"><span class="navItem" @click="indexC(0)" :class="{active: this.$store.state.persist.indexColor>=0}">DB 연결관리</span></router-link>
          <router-link to="/scan"><span class="navItem" @click="indexC(1)" :class="{active: this.$store.state.persist.indexColor>=1}"><span class="navArrow">></span>테이블 속성 도메인 스캔</span></router-link>
          <router-link to="/edit"><span class="navItem" @click="indexC(2)" :class="{active: this.$store.state.persist.indexColor>=2}"><span class="navArrow">></span>테이블 속성 편집</span></router-link>
          <router-link to="/sjoinssearch"><span class="navItem" @click="indexC(3)" :class="{active: this.$store.state.persist.indexColor>=3}"><span class="navArrow">></span>단일 결합</span></router-link>
          <router-link to="/mjoinssearch"><span class="navItem" @click="indexC(4)" :class="{active: this.$store.state.persist.indexColor>=4}"><span class="navArrow">></span>다중 결합</span></router-link>
          <router-link to="/showresult"><span class="navItem" @click="indexC(5)" :class="{active: this.$store.state.persist.indexColor>=5}"><span class="navArrow">></span>결과 조회</span></router-link>
          
        </div>
      </div>
      <div>
        <router-view/>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import VueCookies from 'vue-cookies'

export default {
  name: 'App',
  data() {
    return {
      host : "",
      port : "",
      db : ""
    }
  },
  mounted() {
     this.getCookie()
  },
  
  methods: {
    indexC(num){
      this.$store.state.persist.indexColor = num
    },
    cancle(){
      VueCookies.remove('info')
      console.log("done")
    },
    async getData() {
      
      try {
        const result = await axios.get("/attr/dic");
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
    getCookie(){
      if(VueCookies.isKey("info")){
        var info = VueCookies.get("info").toString()
        var host = info.substring(0, info.indexOf("&"))
        var port = info.substring(info.indexOf("&")+1,info.indexOf("%"))
        var database = info.substring(info.indexOf("%")+1)

        this.host = host
        this.port = port
        this.db = database

      }else{
        console.log("no")
      }
     //VueCookies.remove("none")
    },

  },

  }
  
  

</script>

<style>
#app {
  min-width: 1500px;
  font-family: 'Noto Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: auto;
  height: auto;
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;
}

#nav{
  display: flex;
  padding-left: 20px;
  text-align: center;
  padding-right: 50px;
}
#nav .navTitle {
  flex: 1;
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 50px;
}
#nav .navTitle span{
  margin-top: 0;
  padding-left: 20px;
}
.navArrow{
  padding-right: 60px;
}

.dbInfo{
  width: 250px;
  border: #21365e 2px solid;
  border-radius: 20px;
}
#nav a{
  text-decoration: none;
  color: rgb(172, 172, 172);
}
.navItem.active{
  color: #21365e;
  text-decoration: none;
}
</style>
