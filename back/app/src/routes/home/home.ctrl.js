"use strict";

const logger = require("../../config/logger");
const Review = require("../../models/Review");
const Product = require("../../models/Product");
const Edit = require("../../models/Edit");

const router = require(".");


const jwt = require("jsonwebtoken");
const secretKey = 'secretKey'; // 비밀 키를 정의합니다.





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
        logger.info(`GET /laundryAdmin 304 "세탁소관리 화면으로 이동"`);
        //세탁소 정보 띄우기
        const s_id = "1"; //하드코딩
        const edit = new Edit(req.body, "1"); //req.body는 사용x , 세탁소아이디만 사용
        const data = await edit.showLaundry(); //laundry의 정보 data로 불러오기
        //console.log(data);
        res.json(data);
    },
    productAdmin : async(req, res) => {
        logger.info(`GET /productAdmin 304 "productAdmin 화면으로 이동"`);
        const product = new Product("7", "7"); //세탁소아이디가 7이라고 가정
        const productAdmin = await product.showProduct(); // 세탁소상품 보여주기
        const response = {
            productAdmin: [productAdmin] // productAdmin을 배열에 담아 응답 데이터 구조 생성
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
        const S_ID = "1";//세탁소아이디 불러옴
        const review = new Review(req.body, "1"); //body는 비어있음 
        const RV = await review.showReview();
        console.log(RV);
        res.json({RV});
    },
    orderManage : async (req, res) => {
        logger.info(`GET /orderManage 304 "주문내역 화면으로 이동"`);
        // const S_ID = "1";//세탁소아이디 불러옴
        res.render("home/orderManage",{S_ID});
    },
    addProduct : async (req, res) => {
        logger.info(`GET /history 304 "상품추가 화면으로 이동"`);
        const S_ID = console.log(req.params.id);
        res.render("home/addProduct", {S_ID});
    },
    myPage : (req, res) => {
        logger.info(`GET /home/myPage 304 "마이페이지 화면으로 이동`);
        res.render("home/myPage");
    },
    //myPage 하위 기능
    profileEdit : (req, res) => {
        logger.info(`GET /myPage/profileEdit 304 "프로필편집 화면으로 이동"`);
        
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

    // 세탁소 세부페이지 
    laundryDetail: async(req, res) => {
        logger.info(`GET /laundry/detail/id 304 "세탁신청 세부 화면으로 이동`);
        console.log(req.body);
        const laundry = new Laundry(req.params.id);
        const product = new Product(req.params.id);
        
        //db에서 찾아온 내용 보여주기.
        // response로 json 형태로 데이터가 전달.
        const laundryDetailRes = await laundry.showDetail();
        const productDetailRes = await product.showDetail();
        console.log(laundryDetailRes, productDetailRes)
        res.render("home/LaundryDetail", 
        {
            laundryDetail : laundryDetailRes,
            productDetail : productDetailRes
        });
    },
    upload : async(req, res) =>{
        logger.info(`GET /home/upload 304 "upload 화면으로 이동`);
        res.render('home/upload');
    },
    deleteProduct : async(req, res) =>{
        logger.info(`GET /home/upload 304 "Product 화면으로 이동`);
        // console.log(req.params.id);
        // PRODUCT_ID = req.params.id;
        res.render('home/productAdmin', {PRODUCT_ID});
    },
};

const process = {
    ProfileEdit : async (req,res) => {
        console.log(req.body);
        const edit = new Edit(req.body, "7");
        const response = await edit.profileUpdate();
        res.render('home/myPage');
    },
    LaundryEdit : async (req,res) => {
        //console.log(req.body);
        const edit = new Edit(req.body, "1");
        const response = await edit.laundryUpdate();
        res.json(response);
    },
    addProduct : async (req,res) => {
        console.log(req.body);
        const add = new Product(req.body, "7"); //세탁소아이디는 토큰으로 받아오기
        const response = await add.addProduct(); //상품추가메소드
        res.render('home/laundry');
    },
    deleteProduct : async (req,res) => {
        const deleteProduct = new Product(req.body, req.params.id);
        const response = await deleteProduct.deleteProduct();
        res.render('home/laundry');
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
                console.log(token);
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

