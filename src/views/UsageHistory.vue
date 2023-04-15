<!--사용자 이용내역 화면-->

<template>
    <div class="container" id="app">
        <div class="wrapper">

            <div class="history">
                <h4>이용내역</h4>
                <hr id="historyLine">
            </div>

            <div class="content">

                <div class="myWashing">
                    <h4>내 세탁물</h4>
                </div>

                <div class="date" id="date">
                    <b>2023.03.18</b>
                </div>
                <div class="washingStatus">
                    <span><img id="washingImg" src="./assets/knit.jpg"></span>
                    <span>
                        <p id="name"> 품 &nbsp;&nbsp;&nbsp; 목 | 니트 &nbsp;∙<a class="delivery" style="color: red;"> 배송중</a>
                        </p>
                        <p id="cost">세탁비용 | 10,000원</p>
                        <p id="requirement">요청사항 | 얼룩 깨끗하게 지워주세요</p>
                    </span>
                </div>
                <br>

                <hr id="myHistoryLine">
                <div class="myHistory">
                    <h4>세탁 내역</h4>
                </div>

                <div class="date" id="date">
                    <b>2023.03.11</b>
                </div>
                <div class="washingHistory">
                    <span><img id="washingImg" src="./assets/shoes.jpg"></span>
                    <span>
                        <p id="name"> 품 &nbsp;&nbsp;&nbsp; 목 | 운동화 &nbsp;∙ <a class="delivery">배송완료(3/14)</a></p>
                        <p id="cost">세탁비용 | 12,000원</p>
                        <p id="requirement">요청사항 | 변색 복구 부탁드립니다</p>
                    </span>
                </div>
                <div class="washingHistory">
                    <span><img id="washingImg" src="./assets/jean.jpg"></span>
                    <span>
                        <p id="name"> 품 &nbsp;&nbsp;&nbsp; 목 | 청바지 &nbsp;∙ <a class="delivery">배송완료(3/14)</a></p>
                        <p id="cost">세탁비용 | 13,000원</p>
                        <p id="requirement">요청사항 | 기장 2cm 줄여주세요</p>
                    </span>
                </div><br>

                <div class="date" id="date">
                    <b>2023.03.10</b>
                </div>
                <div class="washingHistory">
                    <span><img id="washings" src="./assets/washings.png"></span>
                    <span>
                        <p id="name"> 품 &nbsp;&nbsp;&nbsp; 목 | 종합 세탁물 &nbsp;∙ <a class="delivery">배송완료(3/12)</a></p>
                        <p id="cost">세탁비용 | 10,000원</p>
                        <p id="requirement">요청사항 | 없음</p>
                    </span>
                </div>

                <br>
            </div>

            <!-- 스크립트 주석되어있어서 click 이벤트 실행 안되는거같아요
            넷바 컴포넌트 만든거 있어서 전체적으로 주석처리 해놀게요 -->
            <!-- <div class="nav">
                <span @click="goToHome" @mouseover="changeCursor" @mouseout="changeCursor2">
                <span><a @click.prevent="gotoHome('/Home')"><img id="home" src="./assets/home.png"></a></span>
                <span><img id="request" src="./assets/request.png"></span>
                <span><img id="history" src="./assets/history.png"></span>
                <span><img id="mypage" src="./assets/my.png"></span>
            </div> -->


        </div>
    </div>
</template>
  
<!-- 스크립트 중복 오류로 전체 주석처리 했습니다 -->
  
<!-- <script src="https://unpkg.com/vue@next"></script>
  <script src="https://unpkg.com/vue-router@4"></script>
  
  <script>
  
  export default {
    methods: {
      goToHome() {
        this.$router.push('/Home.vue');
      },
      changeCursor() {
        document.body.style.cursor = "pointer";
      },
      changeCursor2() {
        document.body.style.cursor = "mouse";
      }
    }
  }
  
        
        const Home = { template: '<div>홈 페이지</div>' };
        const Request = { template: '<div>세탁신청 페이지</div>' };
        const History = { template: '<div>이용내역 페이지</div>' };
        const Mypage = { template: '<div>마이 페이지</div>' };
  
        const routes = [
          { path: '/Home', component: Home },
          { path: '/Request', component: Request },
          { path: '/History', component: History },
          { path: '/Mypage', component: Mypage }
        ];
  
        const router = VueRouter.createRouter({
          history: VueRouter.createWebHistory(),
          routes
        });
  
        const app = Vue.createApp({
          methods: {
            gotoRoute(route) {
              this.$router.push(route);
            }
          }
        });
  
        app.use(router);
        app.mount('#app');
        
  </script> -->
  
  <!-- 태그 중첩되서 scoped 처리 했습니다 -->
<style scoped>
.wrapper {
    width: 370px;
    height: 650px;
    background-color: #fff;
    box-shadow: 0 0 4px rgba(0.2, 0, 0, 0.5);
}

.content {
    height: 577px;
    overflow-y: scroll;
    overflow-x: hidden;
}

.content::-webkit-scrollbar {
    width: 2px;
    /* 스크롤바의 너비 */
}

.history {
    text-align: center;
    justify-content: center;
    margin-top: -2%;
    margin-right: 2%;
    position: fixed;
    width: 370px;
    background-color: white;
    top: 30px;
    /*고정 위치 지정*/
}

#historyLine {
    width: 342px;
    position: fixed;
    top: 45px;
    left: 22px;
}

.myWashing {
    margin-left: 6%;
    padding-top: 11%;
}

.myHistory {
    margin-left: 6%;
    margin-top: -1.1%;
}

#myHistoryLine {
    width: 342px;
}

.date {
    margin-left: 6%;
    font-size: 15px;
}

.washingStatus {
    width: 350px;
    height: 85px;
    border-radius: 13px;
    font-size: smaller;
    background-color: white;
    border: 1px solid gainsboro;
    font-display: center;
    margin-left: 2.5%;
    margin-top: 1.5%;
}

#name {
    margin-bottom: -2.6%;
}

#cost {
    margin-bottom: -2.6%;
}

.delivery {
    color: red;
}

.washingHistory {
    width: 350px;
    height: 85px;
    border-radius: 13px;
    font-size: smaller;
    background-color: white;
    border: 1px solid gainsboro;
    font-display: center;
    margin-left: 2.5%;
    margin-top: 1.5%;
}

#washingImg {
    width: 70px;
    height: 70px;
    float: left;
    margin-left: 3%;
    margin-top: 2%;
    margin-right: 3%;
    border-radius: 15%;
}

#washings {
    width: 60px;
    height: 60px;
    float: left;
    margin-left: 3%;
    margin-top: 4%;
    margin-right: 3%;
    border-radius: 15%;
}

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
  
  <!--통신-->
  <!-- <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  
  <script>
  
    import axios from 'axios';
  
    axios.get('/api/order')  //해당 api로 변경
    .then(function (response) {
      var data = response.data;
  
      // 세탁물 이미지
      var image = document.createElement('img');
      image.src = data.image;
      document.getElementById('washingImg').appendChild(washingImg);
  
      //날짜
      document.getElementById('date').textContent = data.date;
  
      // 세탁물 품목
      document.getElementById('name').textContent = data.name;
  
      // 세탁 비용
      document.getElementById('cost').textContent = data.cost;
  
      // 요청사항
      document.getElementById('requirement').textContent = data.requirement;
    })
    .catch(function (error) {
      console.log(error);
    });
  
  </script>
   -->