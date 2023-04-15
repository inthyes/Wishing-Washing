"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");``

router.get("/", ctrl.output.laundry);

// 세탁신청 디테일 페이지 S_ID(세탁소 ID)를 기준으로 라우팅 되어있음.
router.get("/detail/:id", ctrl.output.laundryDetail);

module.exports = router; //웹으로 내보내기