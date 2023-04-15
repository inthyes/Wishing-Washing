<!--사용자 mypage 화면-->

<template>
    <div class="container" id="app">
        <router-view></router-view>
        <div class="wrapper">

            <div class="mypage">
                <h4>My page</h4>
                <hr id="mypageLine">
            </div>

            <div class="content">

                <div class="userInfo">
                    <span><img id="userProfile" src="./assets/userProfile.png"></span>
                    <span>
                        <p id="userName"><b>xxx 고객님</b></p>
                        <p id="userAddress">경기도 수원시</p>
                    </span>
                    <span>
                        <div class="editProfile">
                            <img id="editProfile" src="./assets/editProfile.png">
                        </div>
                    </span>
                </div>

                <div class="cash">
                    <h3 id="WWCash">WW CASH</h3>
                    <div id="cash">
                        <span><img id="cashIcon" src="./assets/cash.png"></span>
                        <span>
                            <h3 id="cashSum">7,800원</h3>
                        </span>
                    </div>
                    <span>
                        <div class="buyingCash" @click="goToHome">
                            <a>충전</a>
                        </div>
                    </span>
                </div>

                <div class="myMenu">
                    <span>
                        <div class="historyMenu">
                            <b id="menuName">이용내역</b>
                            <h1 id="case">32</h1>
                        </div>
                    </span>
                    <span>
                        <div class="reviewMenu">
                            <b id="menuName">작성한 리뷰</b>
                            <h1 id="case">11</h1>
                        </div>
                    </span>
                    <span>
                        <div class="QnAMenu">
                            <b id="menuName">Q&A</b>
                            <h1 id="case">2</h1>
                        </div>
                    </span>
                </div>

                <hr id="divisionLine">

                <div class="favoriteLaundry">
                    <div id="favoriteLaundry">
                        <a>단골 세탁소</a>
                    </div><br>
                    <div class="laundryInfo">
                        <span><img id="favoriteLaundryImg" src="./assets/favoriteLaundryImg.jpg"></span>
                        <span>
                            <div class="laundryInfo">
                                <p id="favoriteLaundryName">xx 세탁소</p>
                                <p id="favoriteLaundryAddr">경기도 수원시</p>
                            </div>
                            <span><img id="rateImg" src="./assets/rateImg.png"></span>
                            <span><a id="rate">평균 별점 4.6/5.0</a></span>
                        </span>
                    </div>
                </div>

                <div class="etcPage">
                    <div class="customerCenter">
                        <span><a id="customerCenter">고객센터</a></span>
                        <span><b><a id="arrow">&gt;</a></b></span>
                    </div>
                    <hr id="divisionLine2">
                    <div class="logout">
                        <span><a id="logout">로그아웃/회원탈퇴</a></span>
                        <span><b><a id="arrow">&gt;</a></b></span>
                    </div>
                </div>

            </div>

            <!--<router-link to="/home" exact active-class="active" tag="button">Home 페이지로 이동</router-link>-->

            <!-- 넷바는 따로 컴포넌트를 만들어서 App.vue에 적용했기때문에 주석처리 했습니다 -->
            <!-- <div class="nav">
                <span><img id="home" src="./assets/home.png"></span>
                <span><img id="request" src="./assets/request.png"></span>
                <span><img id="history" src="./assets/history.png"></span>
                <span><img id="mypage" src="./assets/my.png"></span>
            </div> -->

        </div>

    </div>
</template>

<style scoped>
/* 다른 컴포넌트에 같은 태그 해놓으신게 style 중첩되서 scoped 처리 했습니다*/
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

.mypage {
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

#mypageLine {
    width: 342px;
    position: fixed;
    top: 45px;
    left: 22px;
}

#userProfile {
    margin-left: 5%;
    width: 50px;
    height: 50px;
    float: left;
}

#userName {
    margin-left: 24%;
    margin-top: 20%;
    margin-bottom: -3%;
}

#userAddress {
    margin-left: 23%;
    margin-bottom: 5%;
}

.editProfile {
    width: 50px;
    height: 40px;
    border: 1px solid lightgrey;
    border-radius: 45px;
    float: right;
    margin-top: -18%;
    margin-right: 6%;
}

#editProfile {
    width: 20px;
    height: 20px;
    margin-left: 30%;
    margin-top: 18%;
}

.cash {
    width: 330px;
    height: 70px;
    border-radius: 11px;
    font-size: smaller;
    background-color: white;
    border: 1px solid gainsboro;
    box-shadow: 1px 1px 3px lightgray;
    font-display: center;
    margin-left: 5%;
    padding-bottom: 1%;
}

#cash {
    margin-left: 10%;
    margin-top: -2%;
}

#WWCash {
    margin-bottom: -3%;
    margin-left: 7%;
}

#cashIcon {
    width: 20px;
    height: 20px;
    float: left;
    margin-right: 3%;
    margin-left: -2%;
}

.buyingCash {
    width: 45px;
    height: 21px;
    border-radius: 40px;
    background-color: gray;
    color: white;
    float: right;
    margin-top: -17%;
    margin-right: 8%;
    text-align: center;
    justify-content: center;
    padding: 2px;
}

.myMenu {
    width: 330px;
    height: 70px;
    border-radius: 11px;
    font-size: smaller;
    background-color: white;
    border: 1px solid gainsboro;
    box-shadow: 1px 1px 3px lightgray;
    font-display: center;
    margin-left: 5%;
    margin-top: 3%;
    padding-bottom: 1%;
}

.historyMenu {
    float: left;
    margin-left: 10%;
    margin-right: 15%;
    margin-top: 3%;
}

.reviewMenu {
    float: left;
    margin-right: 15%;
    margin-top: 3%;
}

.QnAMenu {
    float: left;
    margin-top: 3%;
}

#case {
    color: gray;
    margin-top: -2%;
    margin-left: 22%;
}

#divisionLine {
    width: 342px;
    margin-top: 5%;
    margin-bottom: 5%;
    border-top: 1px solid rgb(231, 231, 231);
}

.favoriteLaundry {
    width: 330px;
    height: 135px;
    border-radius: 11px;
    font-size: smaller;
    background-color: rgb(237, 237, 237);
    box-shadow: 1px 1px 3px lightgray;
    font-display: center;
    margin-left: 5%;
    margin-top: 3%;
    padding-bottom: 1%;
}

#favoriteLaundry {
    width: 100px;
    height: 23px;
    border-radius: 40px;
    background-color: rgb(199, 199, 199);
    text-align: center;
    justify-content: center;
    float: left;
    margin-top: 3%;
    margin-left: 8%;
    font-weight: bold;
    padding-top: 1%;
}

#favoriteLaundryImg {
    width: 130px;
    height: 80px;
    float: left;
    margin-top: 4%;
    margin-left: -33%;
    margin-right: 5%;
}

#laundryInfo {
    width: 100px;
    height: 70px;
    float: left;
    margin-top: 8%;
}

#favoriteLaundryName {
    padding-top: 4%;
    margin-bottom: -2%;
    font-weight: bold;
    font-size: 15px;
}

#rateImg {
    width: 25px;
    height: 25px;
    float: left;
    margin-right: 1.5%;
    margin-top: -2%;
}

#rate {
    float: left;
    margin-top: -1%;
}

.etcPage {
    width: 340px;
    height: 65px;
    font-size: 14px;
    background-color: rgb(237, 237, 237);
    margin-left: 4%;
    margin-top: 5%;
    padding-bottom: 1%;
}

.customerCenter {
    padding-top: 3%;
    margin-left: 4.5%;
    padding-bottom: 5%;
}

.logout {
    margin-left: 4.5%;
}

#customerCenter {
    float: left;
}

#arrow {
    float: right;
    margin-right: 5.5%;
}

#divisionLine2 {
    width: 325px;
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

<!-- 스크립트 중복 오류로 주석처리했습니다 -->

<!-- <script>
export default {
    name: 'Mypage'  // 이건 뭘까요??? 오류나서 일단 주석처리했습니다
}
</script> -->

<!--통신-->
<!-- <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<script>

  import axios from 'axios';

  //캐시 내역 가져오기
  axios.get('https://example.com/api/cash')  //해당 api로 변경
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });

</script> -->

<script>
export default {
    methods: {
        goToHome() {
            this.$router.push('/'); // '/home' 경로로 이동 
            // 이거 제꺼 home 경로는 /로 해놔서 수정했는데 home화면으로 이동하는 이유가 있을까요?
        }
    }
}
</script>