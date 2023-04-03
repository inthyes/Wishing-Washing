"use strict";

const express = require("express");
const router = express.Router();

// const router = require("../")

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.myPage);
router.get("/profileEdit", ctrl.output.profileEdit);

// router.get('/favoriteList', ctrl.output.favoriteList);

router.get("/favoriteList", ctrl.output.favoriteList);
// router.get("/customerService", ctrl.output.customerService);
// router.get("/userManagement", ctrl.output.userManagement);

module.exports = router; //웹으로 내보내기