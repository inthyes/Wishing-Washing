<!--사용자 하단 넵바-->

<template>
    <div class="nav">
        <span><img id="home" src="./assets/home.png"></span>
        <span><img id="request" src="./assets/request.png"></span>
        <span><img id="history" src="./assets/history.png"></span>
        <span><img id="mypage" src="./assets/my.png"></span>
    </div>
</template>

<style>
/* navbar */
.nav {
  width: 23.2%;
  height: 9%;
  background-color: #fff;
  margin-top: 5.2%;
  box-shadow: 0 0 4px rgba(0.2, 0, 0, 0.5);
  border-radius: 20px 20px 0 0;
  position: fixed;
  top: 508px;
  left: 9px;
  right: 0px;
}
#home {
  width: 40px;
  height: 48px;
  margin-left: 8%;
  margin-bottom: 9%;
}
#request {
  width: 37px;
  height: 46px;
  margin-top: 3%;
  margin-right: 15%;
  margin-bottom: 9%;
  margin-left: 12%;
}
#history {
  width: 34px;
  height: 46px;
  margin-top: -5%;
  margin-right: 12%;
  margin-bottom: 9%;
}
#mypage {
  width: 42px;
  height: 49px;
  margin-top: -3%;
  margin-bottom: 8.7%;
}
</style>