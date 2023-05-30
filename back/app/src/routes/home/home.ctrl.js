"use strict";

const logger = require("../../config/logger");
const Review = require("../../models/Review");
const Product = require("../../models/Product");
const Edit = require("../../models/Edit");
const MyPage = require("../../models/Mypage");
const Order = require("../../models/Order");

const router = require(".");


const jwt = require("jsonwebtoken");
const secretKey = 'secretKey'; // 비밀 키를 정의합니다.
const MyPageEdit = require("../../models/Edit");
global.c_id;
global.s_id;



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
        logger.info(`GET /laundry 304 "내세탁소 화면으로 이동"`);
        res.render("home/laundry");
    },
    laundryAdmin : async(req, res) => {
        console.log(global.s_id)
        logger.info(`GET /laundryAdmin 304 "세탁소관리 화면으로 이동"`);
        //세탁소 정보 띄우기
        const edit = new Edit(req.body, global.s_id); //req.body는 사용x , 세탁소아이디만 사용
        const data = await edit.showLaundry(); //laundry의 정보 data로 불러오기
        //console.log(data);
        res.json(data);
    },
    productAdmin : async(req, res) => {
        logger.info(`GET /productAdmin 304 "productAdmin 화면으로 이동"`);
        console.log(global.s_id);
        const product = new Product(global.s_id, global.s_id); 
        const productAdmin = await product.showStroeProduct(); // 세탁소상품 보여주기
        const response = {
            productAdmin: [productAdmin], // productAdmin을 배열에 담아 응답 데이터 구조 생성
            S_ID: global.s_id
        };
        console.log(productAdmin);
        res.json(response);
    },
    // productAdmin: async (req, res) => {
    //     logger.info(`GET /productAdmin 304 "productAdmin 화면으로 이동"`);
    //     const S_ID = req.params.S_ID; // 사용자 아이디


    //     // const S_ID = req.params.S_ID;
    //     const product = new Product(S_ID); // 세탁소 아이디가 7이라고 가정
    //     const productAdmin = await product.showProduct(); // 세탁소 상품 보여주기
    //     console.log(productAdmin);
    //     console.log(product);
    //     res.json({
    //         S_ID,
    //         productAdmin
    //       });
        // res.render("home/productAdmin", {
        //   productAdmin,
        // });
    //   },
      
    // reviewAdmin : (req, res) => {
    //     logger.info(`GET /reviewAdmin 304 "review관리 화면으로 이동"`);
    //     res.render("home/reviewAdmin");
    // },
    reviewAdmin : async (req, res) => {
        logger.info(`GET /laundry 304 "showreview 화면으로 이동"`);
        console.log(global.s_id);
        const review = new Review(req.body, global.s_id); //body는 비어있음 
        const RV = await review.showReview();
        console.log(RV);
        res.json({RV});
    },
    orderManage : async (req, res) => {
        logger.info(`GET /orderManage 304 "주문내역 화면으로 이동"`);
        // const S_ID = "1";//세탁소아이디 불러옴
        res.render("home/orderManage",{s_id});
    },
    addProduct : async (req, res) => {
        logger.info(`GET /history 304 "상품추가 화면으로 이동"`);
        const S_ID = console.log(req.params.id);
        res.render("home/addProduct", {S_ID});
    },
    edit : async (req, res) => 
    {   
        logger.info(`GET /myPage/profileEdit 304 "프로필편집 화면으로 이동"`);
        //실제 경로 , 라우팅 경로 : myPage/profileEdit
        const myEdit = new Edit(req.body, global.c_id);
        const myEditRes = await myEdit.myEdit();

        console.log(myEditRes);
        res.json(myEditRes);
    },

    myEdit : async (req, res) => {
        logger.info(`GET /myPage 304 "edit 화면으로 이동"`);
        const myEdit = new Edit(req.body, global.s_id);
        const myEditRes = await myEdit.myEdit();
        console.log(myEditRes);
        res.json(myEditRes);
    },


    customerService : (req, res) => {
        logger.info(`GET /home/myPage/customerService 304 "고객센터 화면으로 이동`);
        res.render("home/customerService");
    },
    userManagement : (req, res) => {
        logger.info(`GET /home/myPage/userManagement 304 "탈퇴/로그아웃 화면으로 이동`);
        res.render("home/userManagement");
    },

    // 세탁소 세부페이지 
    upload : async(req, res) =>{
        logger.info(`GET /home/upload 304 "upload 화면으로 이동`);
        res.render('home/upload');
    },
    showProduct : async(req, res) =>{
        logger.info(`GET /home/upload 304 "upload 화면으로 이동`);
        const product = new Product(req.params.id, global.s_id);
        const response = await product.showProduct();
        console.log(response);
        res.json(response);
    },
    history : async(req, res) =>{
        logger.info(`GET /home/upload 304 "ManageOrder 화면으로 이동`);
        console.log(global.s_id);
        const history = new Order(req.body,global.s_id);
        const response = await history.showOrder();
        console.log(response);
        res.json(response);
    },
    deleteProduct : async(req, res) =>{
        logger.info(`GET /home/upload 304 "Product 화면으로 이동`);
        // console.log(req.params.id);
        // PRODUCT_ID = req.params.id;
        res.render('home/productAdmin', {PRODUCT_ID});
    },
    myPage: async (req, res) => {
        try {
          logger.info(`GET /home/myPage 304 "마이페이지 화면으로 이동`);
    
        //   const userId = req.params.userId; // userId 값을 얻어옵니다. 이 부분에 대한 로직이 필요합니다.
          const myPage = new MyPage(req.body, global.c_id); // userId를 생성자에 전달하여 MyPage 인스턴스를 생성합니다.
          const myPageInfo = await myPage.showMyPageInfo(global.c_id);

          console.log("myPageInfo",myPageInfo);
        //   console.log(myPageInfo);
          res.json(myPageInfo);
        } catch (error) {
          console.error(error);
          // 오류 처리 로직을 추가합니다.
          res.status(500).json({ error: "마이페이지 정보를 가져오는 중에 오류가 발생했습니다." });
        }
        },
};

const process = {
    ProfileEdit : async (req,res) => {
        console.log(req.body);
        const edit = new Edit(req.body, global.s_id);
        const response = await edit.profileUpdate();
        res.render('home/myPage');
    },
    LaundryEdit : async (req,res) => {
        //console.log(req.body);
        console.log(global.s_id)
        const edit = new Edit(req.body, global.s_id);
        const response = await edit.laundryUpdate();
        res.json(response);
    },
    addProduct: async (req, res) => {
        console.log(req.body);
        console.log("s_id",global.s_id);
        const { PRODUCT_NAME, PRODUCT_INFO, PRODUCT_PRICE } = req.body;
        const add = new Product({ PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_INFO}, global.s_id);

        const response = await add.addProduct(); // 상품 추가 메소드
        console.log(response);
        res.json(response);
      },
      deleteProduct: async (req, res) => {
        const deleteProduct = new Product(req.body, req.params.id);
        const response = await deleteProduct.deleteProduct();
        res.render("home/laundry");
      },
      
    addReviewReply : async (req,res) => {
        console.log(req.body); //body에 CEO_COMMENT가담김
        console.log(req.params.id); //O_NUM임
        
        const review = new Review(req.body.CEO_COMMENT, req.params.id);
        const response = review.reviewUpdate();
        //res.render('home/laundry');
        // const review2 = new Review(req.body, "7"); //body는 비어있음 
        // const RV = await review2.showReview();
        // res.render('home/reviewAdmin', { RV: RV });
    },
    edit : async (req,res) => {
        const edit = new Edit(req.body, global.c_id);
        const response = await edit.update();
        res.json(response);
    },
    orderUpdate1 : async (req,res) => {
        console.log("o_id",req.params.id);
        const order = new Order(req.params.id, global.s_id);
        const response = await order.update1();
        res.json(response);
    },
    orderDelete : async (req,res) => {
        console.log("o_id",req.params.id);
        const order = new Order(req.params.id, global.s_id);
        const response = await order.orderDelete();
        res.json(response);
    },
    orderUpdate2 : async (req,res) => {
        const order = new Order(req.params.id, global.s_id);
        const response = await order.update2();
        res.json(response);
    },
    orderUpdate3 : async (req,res) => {
        const order = new Order(req.params.id, global.s_id);
        const response = await order.update3();
        res.json(response);
    },
    verifyToken : (req,res) => {
        const { token } = req.body;

        // 토큰 검증
        jwt.verify(token,secretKey, (err, decoded) => {
            if (err) {
                // 토큰이 유효하지 않은 경우
                return res.status(401).json({ message: '토큰이 유효하지 않습니다.' });
                }

                // 토큰이 유효한 경우
                // 여기에서 추가적인 검증이나 처리를 수행할 수 있습니다.
                // 예를 들어, decoded 객체에 저장된 정보를 확인하고 권한 검사를 수행할 수 있습니다.

                // 검증에 성공한 경우, 클라이언트에게 성공 응답을 보냅니다.
                console.log({token});
                console.log(decoded);
                // const userId = decoded.id;
                global.c_id = decoded.id;
                global.s_id = decoded.s_id;
                console.log(token,global.c_id);
                console.log(token,global.s_id);
                return res.status(200).json({ message: '토큰이 유효합니다.' });
        });
    },

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

