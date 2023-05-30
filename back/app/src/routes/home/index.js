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
router.get('/history', ctrl.output.history);
router.get('/orderManage', ctrl.output.orderManage);
//router.get('/myPage', ctrl.output.myPage);
//router.get('/upload', ctrl.output.upload);
router.get('/laundryAdmin', ctrl.output.laundryAdmin);
router.get('/edit', ctrl.output.edit);
router.get('/myEdit', ctrl.output.myEdit);
router.get('/showProduct/:id', ctrl.output.showProduct);

router.use("/myPage", require("./myPage"));
router.use("/laundry", require("./laundry"));
router.use("/upload", require("./upload"));
//router.use("/search", require("./search"));

router.post("/verify-token", ctrl.process.verifyToken);
router.post("/orderUpdate1/:id", ctrl.process.orderUpdate1);
router.post("/orderDelete/:id", ctrl.process.orderDelete);
router.post("/orderUpdate2/:id", ctrl.process.orderUpdate2);
router.post("/orderUpdate3/:id", ctrl.process.orderUpdate3);
//router.post("/review", ctrl.process.review);
router.post("/addReviewReply/:id", ctrl.process.addReviewReply);
router.post("/edit", ctrl.process.edit);
module.exports = router; //웹으로 내보내기