"use strict";

const express = require("express");
const router = express.Router();

// const router = require("../")

//로그인,회원가입 관련 이동
const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get('/laundry', ctrl.output.laundry);
router.get('/orderManage', ctrl.output.orderManage);
router.get('/myPage', ctrl.output.myPage);
router.get('/upload', ctrl.output.upload);
router.get('/laundryAdmin', ctrl.output.laundryAdmin);

router.use("/myPage", require("./myPage"));
router.use("/laundry", require("./laundry"));
//router.use("/search", require("./search"));

//router.post("/review", ctrl.process.review);

module.exports = router; //웹으로 내보내기