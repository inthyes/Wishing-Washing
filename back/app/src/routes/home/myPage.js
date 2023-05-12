"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.myPage);

router.get("/profileEdit", ctrl.output.profileEdit);
//router.get("/laundryAdmin", ctrl.output.laundryAdmin);
router.get("/reviewAdmin", ctrl.output.reviewAdmin);

router.post("/edit", ctrl.process.ProfileEdit);

module.exports = router; //웹으로 내보내기