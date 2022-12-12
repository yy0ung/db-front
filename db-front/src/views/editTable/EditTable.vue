<template>
  <div id="editTable">
    <p class="blackTitle">테이블 속성 편집</p>
    <p class="blackSub">속성 스캔 완료 테이블 목록</p>
    <div class="table-container">
      <table>
      <tr>
        <th>테이블 명</th>
        <th>레코드 수</th>
        <th>속성</th>
      </tr>
    </table>
    
    </div>
    <button @click="nextTest" class="send-btn">선택하기</button>
  </div>  
</template>

<script>
export default {
  mounted() {
    this.setIndex()
  },
  methods: {
    setIndex(){
      this.$store.state.persist.indexColor = 2
    },
    nextTest(){
      this.$router.push('/editattr')
    }
  },
}
</script>

<style>
#editTable{
  text-align: center;
}
</style>