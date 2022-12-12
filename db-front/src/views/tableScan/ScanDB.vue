<template>
  <div id="scanDB">
    <p class="blackTitle">테이블 속성 도메인 스캔</p>
    <p class="blackSub">대상 테이블 선택</p>
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
      this.$store.state.persist.indexColor = 1
    },
    nextTest(){
      this.$router.push('/scanattr')
    }
  },
}
</script>

<style>
#scanDB{
  text-align: center;
}
</style>