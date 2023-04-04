"use strict";

const logger = require("../../config/logger");
const UserStorage = require("../../models/UserStorage");
const User = require("../../models/User");


const output ={
    home : (req, res) =>{
        logger.info(`GET / 304 "홈 화면으로 이동"`);
        res.render("home/index");
    },
    login : (req,res) => {
        logger.info(`GET /login 304 "로그인 화면으로 이동"`);
        res.render("home/login");
    },
    register : (req, res) => {
        logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
        res.render("home/register");
    },
    laundry : (req, res) => {
        logger.info(`GET /laundry 304 "세탁신청 화면으로 이동"`);
        res.render("home/laundry");
    },
    history : (req, res) => {
        logger.info(`GET /history 304 "이용내역 화면으로 이동"`);
        res.render("home/history");
    },
    myPage : (req, res) => {
        logger.info(`GET /home/myPage 304 "마이페이지 화면으로 이동`);
        res.render("home/myPage");
    },
    favoriteList : (req, res) => {
        logger.info(`GET /myPage/favoriteList 304 "프로필편집 화면으로 이동"`);
        //실제 경로 , 라우팅 경로 : myPage/favoriteList
        res.render("home/favoriteList");
    },
    //myPage 하위 기능
    profileEdit : (req, res) => {
        logger.info(`GET /myPage/profileEdit 304 "프로필편집 화면으로 이동"`);
        //실제 경로 , 라우팅 경로 : myPage/profileEdit
        res.render("home/profileEdit");
    },
   

    customerService : (req, res) => {
        logger.info(`GET /home/myPage/customerService 304 "고객센터 화면으로 이동`);
        res.render("home/customerService");
    },
    userManagement : (req, res) => {
        logger.info(`GET /home/myPage/userManagement 304 "탈퇴/로그아웃 화면으로 이동`);
        res.render("home/userManagement");
    },


    //세탁신청 기능 - 아직 개발중 오류떠염
    laundryDetail: (req, res) => {
        logger.info(`GET /laundry/detail 304 "세탁신청 세부 화면으로 이동`);
       //  res.render("home/laundryDetail");
        // 괄호 안에 디비에서 뽑아온 아이디 
        // model 폴더 안에 있는 laudrydetailnumber한테서 받아와야함
        //디비에서 아이디 찾아서 home.ctrl 한테 전달 
         res.render("home/laundryDetail", {데이터 : resutlt});
        // db.query("USE capstone", (err, result) => {
             const query = "SELECT * FROM STORE where S_ID = ?;";
             if (err) reject(err);
             db.query(query, [req.params.S_ID], (err, data) => {
                 if (err) reject(err);
                 else {
                     res.render("home/laundryDetail", {데이터 : resutlt});
                 }
             });
        }
};

const process = {
    login : async (req, res) => {
        const user = new User(req.body); //여기서의 body가 User클래스의 body로 들어감
        const response = await user.login();

        const url = {
            method: "POST",
            path: "/login",
            status: response.err ? 400 : 200,
        };
        log(response, url);
        return res.status(url.status).json(response);
    },
    register: async (req, res) => {
        const user = new User(req.body); //여기서의 body가 User클래스의 body로 들어감
        const response = await user.register();

        const url = {
            method: "POST",
            path: "/register",
            status: response.err ? 400 : 201,
        };

        log(response, url);
        return res.status(url.status).json(response);

    },

    // 필요시 작성
    // laundry: async (req, res) => {
   
    // },
    // histoy: async (req, res) => {
   
    // },

    // myPage: async (req, res) => {
   
    // },
    // profileEdit: async (req, res) => {
   
    // },
    // favoriteList: async (req, res) => {
   
    // },
    // customerService: async (req, res) => {
   
    // },
    // userManagement: async (req, res) => {
   
    // },

};

module.exports = {
    output,
    process,
};

const log = (response, url) =>{
    if(response.err){
            logger.error(
                `${url.method} ${url.path} ${url.status} Response: ${response.success}, ${response.err}"`
                );}
        else{
            logger.info(
                `${url.method} ${url.path} ${url.status} Response: ${response.success}, msg: ${response.msg || " "}"`
                );}
}

