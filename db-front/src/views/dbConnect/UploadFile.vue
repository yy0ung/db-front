<template>
  <div id="uploadFile">
    <p class="blackTitle">DB 연결 관리</p>
    <input type="file">
    <button>CSV 업로드</button>
  </div>  
</template>

<script>
export default {
  mounted() {
    this.setIndex()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 0
    },
  },
}
</script>

<style>

</style>