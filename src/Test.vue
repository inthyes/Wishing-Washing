<template>
    <div>
      <h1>New Page</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Test'
  }
  </script>

  
<script>
var url = '/test';

// div 요소 찾기
var buyingCash = document.getElementById('buyingCash');

// 클릭 이벤트 리스너 추가
myBox.addEventListener('click', function() {
// 새로운 페이지로 이동
this.$router.push(url);
});
</script>

