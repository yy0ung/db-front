<template>
  <div id="uploadFile">
    <p class="blackTitle">DB 연결 관리</p>
    <form class="upload-container">
      <input type="file" ref="file" @change="test"/>
    </form>
    
    <button class="send-btn" @click="uploadFile">CSV 업로드</button>
  </div>  
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      file:null
    }
  },
  mounted() {
    this.setIndex()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 0
    },
    test(){
      this.file = this.$refs.file.files
      console.log(this.file)
      console.log(this.file[0])
    },
    
    async uploadFile(){
      var frm = new FormData()
      
      frm.append("file", this.file[0])
      console.log(frm)
      try{
        const response = await axios.post(
          '/fileupload', frm, 
          {
            headers:{
            "Content-Type": "multipart/form-data"
          }
          }
        )
        console.log(response)
      }catch(e){ console.log(e) }
    }
  },
}
</script>

<style>
#uploadFile{
  text-align: center;
}
.upload-container{
  margin-top: 50px;
}
.upload-container input{
  font-family: 'Noto Sans KR';
  border-radius: 9px;
  width: 400px;
  height: 35px;
  margin-top: 20px;
  margin-left: 10px;
  padding-left: 15px;
  padding-right: 5px;
  padding-top: 7px;
  border: 0.75px solid #BCBCBC;
  opacity: 1;
  font-size: 17px;
  color: grey;
}
</style>