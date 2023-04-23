<!--사용자 이용내역-->

<template>
    <div class="wrapper">
        <div class="content">
            <div class="myWashing">
                <h5><b>내 세탁물</b></h5>
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
                <h5><b>세탁 내역</b></h5>
            </div>

            <div class="date" id="date">
                <b>2023.03.11</b>
            </div>
            <div class="washingStatus">
                <span><img id="washingImg" src="./assets/shoes.jpg"></span>
                <span>
                    <p id="name"> 품 &nbsp;&nbsp;&nbsp; 목 | 운동화 &nbsp;∙ <a class="delivery">배송완료(3/14)</a></p>
                    <p id="cost">세탁비용 | 12,000원</p>
                    <p id="requirement">요청사항 | 변색 복구 부탁드립니다</p>
                </span>
            </div>
            <div class="washingStatus">
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
            <div class="washingStatus">
                <span><img id="washings" src="./assets/washings.png"></span>
                <span>
                    <p id="name"> 품 &nbsp;&nbsp;&nbsp; 목 | 종합 세탁물 &nbsp;∙ <a class="delivery">배송완료(3/12)</a></p>
                    <p id="cost">세탁비용 | 10,000원</p>
                    <p id="requirement">요청사항 | 없음</p>
                </span>
            </div>

            <br>

        </div>
    </div>
</template>

<style>
.history {
    text-align: center;
    justify-content: center;
    margin-top: -2%;
    margin-right: 2%;
    position: fixed;
    background-color: white;
    top: 30px;
    /*고정 위치 지정*/
}

.myWashing {
    margin-left: 6%;
    margin-top: 3%;
    margin-bottom: 1%;
}

#myHistoryLine {
    margin-left: 4%;
    margin-right: 4%;
}

.myHistory {
    margin-left: 6%;
    margin-top: 3%;
}

.date {
    margin-left: 6%;
    font-size: 15px;
}

.washingStatus {
    height: 85px;
    border-radius: 13px;
    font-size: smaller;
    background-color: white;
    border: 1px solid gainsboro;
    font-display: center;
    margin: 5%;
    margin-top: 1.5%;
}

#name {
    margin-bottom: 5px;
}

#cost {
    margin-bottom: 5px;
}

#requirement {}

.delivery {
    color: red;
}

#washingImg {
    width: 70px;
    height: 70px;
    float: left;
    margin-left: 3%;
    margin-top: 1%;
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
</style>