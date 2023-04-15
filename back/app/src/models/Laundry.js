"use strict";

const {response} = require("express");
const LaundryDetail = require("./LaundryDetail");

// 세탁소 클래스 생성

class Laundry {
    constructor(body) {
        // this.body에는 req.params.id가 들어가있음
        this.body = body;
      }
      async showDetail() {
        const laundry = this.body;
        const detail = await LaundryDetail.getLaundryDetail(laundry);
        //detail에는 db에서 가져온 세탁소의 id와 name이 포함.

        if(detail) {
            //detail에는 db에서 가져온 세탁소의 id와 body로 담겨온 index 비교
            if(detail.id == laundry) {
                // detail 객체 넘겨줌
                return detail;
            }
        }
    }

      
}


module.exports = Laundry; 