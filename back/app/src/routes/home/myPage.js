"use strict";


const express = require("express");
const router = express.Router();


// const router = require("../")

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.myPage);
router.get("/profileEdit", ctrl.output.edit);
router.get("/review", ctrl.output.myReview);
router.get("/review/update/:storeId/:orderNum", ctrl.output.reviewUpdate);

// router.get('/favoriteList', ctrl.output.favoriteList);

router.get("/favoriteList", ctrl.output.favoriteList);
// router.get("/customerService", ctrl.output.customerService);
// router.get("/userManagement", ctrl.output.userManagement);
// router.get("/edit", ctrl.output.myEdit);
// router.post("/edit", ctrl.process.edit);
router.post("/review/update/:storeId/:orderNum", ctrl.process.reviewUpdate);
router.post("/review/delete", ctrl.process.reviewDelete)

module.exports = router; //웹으로 내보내기