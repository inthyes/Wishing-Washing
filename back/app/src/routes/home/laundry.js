"use strict";

const express = require("express");
const router = express.Router();
const cookieParser = require('cookie-parser');

const ctrl = require("./home.ctrl");

router.use(cookieParser());


router.get("/", ctrl.output.laundry);

router.get("/:id/showReview", ctrl.output.showReview);
// 세탁신청 디테일 페이지 S_ID(세탁소 ID)를 기준으로 라우팅 되어있음.
router.get("/detail/:id", ctrl.output.laundryDetail);
// router.get("/search", ctrl.output.search);
router.get("/detail/:id/order", ctrl.output.orderPage);
// 세탁신청 후 장바구니 페이지
router.post("/detail/:id/order", ctrl.process.addCart);
router.post("/detail/:id/complete", ctrl.process.orderComplete);


module.exports = router; //웹으로 내보내기