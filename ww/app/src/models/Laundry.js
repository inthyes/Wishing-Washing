"use strict";

const {response} = require("express");
const LaundryDetail = require("./LaundryDetail");

// 세탁소 클래스 생성

class Laundry {
    constructor(body) {
        this.body = body;
      }

      async showDetail(id) {
        const laundry = this.body;
        const detail = await LaundryDetail.getLaundryDetail(laundry);
      
        if(detail) {
            if(detail.id == laundry.id) {
                return {
                    storeName : this.name
                };
            }
        }
    }

      
}


module.exports = Laundry; 