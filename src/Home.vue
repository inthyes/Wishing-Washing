<!--사용자 홈 화면-->

<template>
    <div class="container">
      <div class="wrapper">
        <div class="content">
  
          <div class="address">
            <span><img id="locateIcon" src="./assets/locateIcon.png"></span>
            <span>경기 성남시 분당구 불정로 6 그린팩토리</span>
            <span><img id="arrowIcon" src="./assets/arrowIcon.png"></span>
          </div>
  
          <div class="recommend">
            <p style="font-size: 18px;"><b>이 세탁소는 어떠세요 ?</b></p>
            <p style="font-size: 9px; margin-top: -3%;">저희가 추천해드릴게요.</p>
            <div class="popularLaundry">
              <p style="font-size: 15px; padding: 8%; padding-top: 6%;"><b>우리 동네 인기 세탁소</b></p>
              <p style="font-size: 6px; padding-left: 10%; margin-top: -11%; margin-bottom: -1%;">주변에서 인기 있는 세탁소예요!</p>
              <img id="map" src="./assets/map.png">
            </div>
          </div>
  
          <div class="washingTip">
            <p style="font-size: 18px;"><b>생활 속 세탁 TIP !</b></p>
            <p style="font-size: 9px; margin-top: -3%;">집에서도 옷을 잘 관리할 수 있게 도와드릴게요.</p>
            <div class="dryCleaning">
              <p style="font-size: 15px; padding: 8%; padding-top: 6%;"><b>드라이클리닝</b></p>
              <p style="font-size: 3px; padding-left: 10%; margin-top: -11%;">
                손 많이 가는 드라이클리닝 의류, <br>&nbsp; 집에서 어떻게 관리해야 할까 ?</p>
              <img id="drycleaning" src="./assets/drycleaning.png">
            </div>
          </div>
  
          <div class="bar">
            <span><img id="home" src="./assets/clickedHome.png"></span>
            <span><img id="request" src="./assets/request.png"></span>
            <span><img id="history" src="./assets/history.png"></span>
            <span><img id="my" src="./assets/my.png"></span>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyComponent'
  }
  </script>
  
  <style>
  .container {
    width: 370px;
    height: 650px;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .wrapper {
    width: 370px;
    height: 650px;
    background-color: #fff;
    box-shadow: 0 0 4px rgba(0.2, 0, 0, 0.5);
    overflow: hidden;
  }
  
  .address {
    width: 340px;
    height: 30px;
    background-color: rgba(228, 227, 227, 0.728);
    border-radius: 20px;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin-left: 4%;
    margin-top: 7%;
    margin-bottom: 7%;
    font-size: 10px;
    padding-bottom: 3%;
  }
  
  #locateIcon {
    width: 18px;
    height: 20px;
    margin-top: 2%;
    margin-left: -12%;
    margin-right: 4%;
    padding-top: 1.4%;
    margin-bottom: -1.4%;
  }
  
  #arrowIcon {
    width: 18px;
    height: 20px;
    margin-left: 5%;
    margin-right: -13%;
    padding-top: 1%;
    margin-bottom: -1.2%;
  }
  
  .recommend {
    margin-left: 5.2%;
  }
  
  .popularLaundry {
    width: 330px;
    height: 170px;
    background-color: rgba(228, 227, 227, 0.728);
    border-radius: 20px;
  }
  
  .washingTip {
    margin-left: 5.2%;
    margin-top: 7%;
  }
  
  .dryCleaning {
    width: 330px;
    height: 170px;
    background-color: rgba(228, 227, 227, 0.728);
    border-radius: 20px;
  }
  
  #map {
    width: 250px;
    height: 120px;
    margin-left: 12%;
    margin-bottom: 20%;
  }
  
  #drycleaning {
    width: 200px;
    height: 100px;
    margin-left: 39%;
    margin-top: -2%;
    margin-bottom: 30%;
  }
  
  /* navbar */
  .bar {
    width: 332px;
    height: 100px;
    background-color: #fff;
    margin-top: 4%;
    padding: 5%;
    box-shadow: 0 0 4px rgba(0.2, 0, 0, 0.5);
    border-radius: 20px;
  }
  #home {
    width: 34px;
    height: 43px;
    margin-top: -3%;
    margin-left: 4.5%;
    margin-right: 15%;
    margin-bottom: 9%;
  }
  #request {
    width: 31px;
    height: 40px;
    margin-top: -5%;
    margin-right: 15.6%;
    margin-bottom: 9%;
  }
  #history {
    width: 28px;
    height: 40px;
    margin-top: -5%;
    margin-right: 15.2%;
    margin-bottom: 9%;
  }
  #my {
    width: 36px;
    height: 43px;
    margin-top: -3%;
    margin-bottom: 8.7%;
  }
  
  </style>