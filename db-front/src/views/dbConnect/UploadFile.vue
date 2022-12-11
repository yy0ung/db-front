<template>
  <div id="uploadFile">
    <p class="blackTitle">DB 연결 관리</p>
    <form>
      <input type="file" ref="file" @change="test"/>
    </form>
    
    <button @click="uploadFile">CSV 업로드</button>
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

</style>