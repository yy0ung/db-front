<template>
  <div id="app">
    <div class="app-container">
      <div id="nav">
        <div class="dbInfo">
          <p>DB 정보</p>
          <p>HOST : {{this.host}}</p>
          <p>PORT : {{this.port}}</p>
          <p>DATABASE : {{this.db}}</p>
        </div>
        <div class="navTitle">
          <router-link to="/connect"><span class="navItem" @click="indexC(0)" :class="{active: this.$store.state.persist.indexColor>=0}">DB 연결관리</span></router-link>
          <router-link to="/scan"><span class="navItem" @click="indexC(1)" :class="{active: this.$store.state.persist.indexColor>=1}"><span class="navArrow">></span>테이블 속성 도메인 스캔</span></router-link>
          <router-link to="/edit"><span class="navItem" @click="indexC(2)" :class="{active: this.$store.state.persist.indexColor>=2}"><span class="navArrow">></span>테이블 속성 편집</span></router-link>
          <router-link to="/joinsingle"><span class="navItem" @click="indexC(3)" :class="{active: this.$store.state.persist.indexColor>=3}"><span class="navArrow">></span>단일 결합</span></router-link>
          <router-link to="/joinmulti"><span class="navItem" @click="indexC(4)" :class="{active: this.$store.state.persist.indexColor>=4}"><span class="navArrow">></span>다중 결합</span></router-link>
          <router-link to="/showresult"><span class="navItem" @click="indexC(5)" :class="{active: this.$store.state.persist.indexColor>=5}"><span class="navArrow">></span>결과 조회</span></router-link>
          
        </div>
      </div>
      <div>
        <router-link to="/">시작</router-link>
        <router-view/>
      </div>
    </div>
    
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: 'App',
  data() {
    return {
      host : "-",
      port : "-",
      db : "-"
    }
  },
  mounted() {
     //this.getData()
  },
  
  methods: {
    indexC(num){
      this.$store.state.persist.indexColor = num
    }
    // async getData() {
      
    //   try {
    //     const result = await axios.get("/attr/dic");
    //     console.log(result);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
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
  
}
#nav .navTitle span{
  margin-top: 0;
  padding-left: 20px;
}
.navArrow{
  padding-right: 40px;
}

.dbInfo{
  background: rgb(198, 220, 245);
  width: 200px;
}
#nav a{
  text-decoration: none;
  color: black;
}
.navItem.active{
  color: rgb(113, 151, 255);
  text-decoration: none;
}
</style>
