"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.laundry);

// 세탁신청 디테일 페이지 -> 인덱스 디테일 아직 안 들어감.
router.get("/detail", ctrl.output.laundryDetail);

module.exports = router; //웹으로 내보내기