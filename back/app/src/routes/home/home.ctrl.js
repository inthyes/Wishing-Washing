"use strict";

const express = require("express");

const logger = require("../../config/logger");
const Laundry = require("../../models/Laundry");
const Product = require("../../models/Product");
const Cart = require("../../models/Cart");
const Likes = require("../../models/Likes");
const LaundryOrder = require("../../models/LaundryOrder");
const MyPage = require("../../models/Mypage");
const LaundryOrderComplete = require("../../models/LaundryOrderComplete");
const LaundryList = require("../../models/LaundryList");
// const Search = require("../../models/Search");
// const MyPageEdit = require("../../models/MyPageEdit");
const History = require("../../models/History");
const Review = require("../../models/Review");
const Edit = require("../../models/MyPageEdit");
// const router = require(".");
const router = express.Router();
const MyPageEdit = require("../../models/MyPageEdit")

const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const secretKey = 'secretKey'; // 비밀 키를 정의합니다.
global.userId;

const output ={
    home: async (req, res) => {
        if (req.headers.cookie && req.headers.cookie.includes('response')) {
                  const cookies = req.headers.cookie.split('; ');
                  let cookieValue;
                  cookies.forEach(cookie => {
                    if (cookie.startsWith('response=')) {
                        cookieValue = cookie.split('=')[1];
                    }
                  });
                  const orderNum = JSON.parse(decodeURIComponent(cookieValue)).orderNumber;
                  const deleteCart = new Cart(orderNum);
                  deleteCart.deleteCart();
                  res.clearCookie('response');
                res.status(200).json({ message: 'success' });
        }
    },
    laundry : async (req, res) => {
        logger.info(`GET /laundry 304 "세탁신청 화면으로 이동"`);
        const cookieValue = req.headers.cookie;
        const decodedValue = decodeURIComponent(cookieValue);
        const matches = decodedValue.match(/deliveryAddress1="([^"]+)";\s*deliveryAddress2="([^"]+)"/);
        if (matches == null) {
            res.status(200).json({ message: '주소를 설정하세요' });
        }
        else if (global.userId === undefined) {
            const deliveryAddress1 = matches[1];
            const deliveryAddress2 = matches[2];
            const laundryList = new LaundryList(req.body, deliveryAddress1, deliveryAddress2);
            const laundryListRes = await laundryList.getLaundryInfoNoUserId();
            console.log(laundryListRes)
            res.json(laundryListRes);
        }
        else {
            const deliveryAddress1 = matches[1];
            const deliveryAddress2 = matches[2];
            const laundryList = new LaundryList(req.body, deliveryAddress1, deliveryAddress2);
            const laundryListRes = await laundryList.getLaundryInfo(global.userId.id);
            console.log(laundryListRes)
            res.json(laundryListRes);
        }
    }, 
    review : async (req, res) => {
        logger.info(`GET /laundry 304 "review 화면으로 이동"`);
        const laundry = new Laundry(req.params.storeId);
        const laundryDetailRes = await laundry.showDetail();
        const orderComplete = new LaundryOrderComplete();
        const orderCompleteRes = await orderComplete.orderCompleteInfo(req.params.orderNum);
        res.json(laundryDetailRes);
    },
    //update로 들어갔을때 기존 작성했던 리뷰가 보여짐
    reviewUpdate : async (req, res) => {
        logger.info(`GET /laundry 304 "review 화면으로 이동"`);
        const reviewInfo = new Review();
        const reviewInfoRes = await reviewInfo.getUpdateInfo(req.params.orderNum, req.params.storeId);
        res.json(reviewInfoRes);
    },
    myReview : async (req, res) => {
        logger.info(`GET /myPage 304 "review 화면으로 이동"`);
        const myReview = new Review(req.body, global.userId.id);
        const myReviewRes = await myReview.myReview();
        console.log(myReviewRes);
        res.json(myReviewRes);
    },
    edit : async (req, res) => 
    {   
        logger.info(`GET /myPage/profileEdit 304 "프로필편집 화면으로 이동"`);
        //실제 경로 , 라우팅 경로 : myPage/profileEdit
        const myEdit = new MyPageEdit(req.body, global.userId.id);
        const myEditRes = await myEdit.myEdit();

        console.log(myEditRes);
        res.json(myEditRes);
    },

    myEdit : async (req, res) => {
        logger.info(`GET /myPage 304 "edit 화면으로 이동"`);
        const myEdit = new MyPageEdit(req.body, userId.id);
        const myEditRes = await myEdit.myEdit();
        console.log(myEditRes);
        res.json(myEditRes);
    },

    history : async (req, res) => {
        logger.info(`GET /history 304 "이용내역 화면으로 이동"`);
        const history = new History(global.userId.id); //아이디토큰 받아오기
        const orderCompleteList = await history.showHistory();
        console.log(orderCompleteList);
        //const response1 = await cart.addOrderList();
        res.json(orderCompleteList);
    },
    myPage : async (req, res) => {
        logger.info(`GET /home/myPage 304 "마이페이지 화면으로 이동`);
        const myPage = new MyPage(global.userId.id);
        const myPageInfo = await myPage.showMyPageInfo(global.userId.id);
        console.log(myPageInfo);
        console.log(myPageInfo);
        res.json(myPageInfo);
    },
    favoriteList : async (req, res) => {
        logger.info(`GET /myPage/favoriteList 304 "프로필편집 화면으로 이동"`);
        const favorite = new MyPage(global.userId.id);
        const response = await favorite.showFavoriteList();
        res.json(response);
    },
    laundryDetail: async (req, res) => {
        // userId 가 없을 떄 처리하기 
        try {    
            // 뒤로가기 실행시 if 쿠키가 존재 -> 쿠키삭제 + cart랑 orderList에서 ordernum관련 내용 삭제
            if (req.headers.cookie && req.headers.cookie.includes('response')) {
                const cookieValue = req.cookies.response;
                const orderNum = JSON.parse(cookieValue).orderNumber; 
                const deleteCart = new Cart(orderNum);
                deleteCart.deleteCart();
                res.clearCookie('response');
            }
            const laundry = new Laundry(req.params.id);
            const product = new Product(req.params.id);
      
            const laundryDetailRes = await laundry.showDetail();
            const productDetailRes = await product.showDetail();

            const S_ID = req.params.id; //세탁소아이디 불러옴
            //console.log(req.params.id);
            const review = new Review(S_ID, global.userId);
            const RV = await review.showReview();

            const reviewStar = await review.averageStar(S_ID);
            const countReview = await review.countReview(S_ID);
            if (global.userId === undefined) {
                res.json({
                    laundryDetail: laundryDetailRes,
                    productDetail: productDetailRes,
                    review : RV,
                    reviewStar : reviewStar,
                    countReview : countReview
                  });
            }
            else {
                const like = new Likes(req.body, global.userId.id);
                const userLike = await like.likeStatus(S_ID, global.userId.id);
                res.json({
                  laundryDetail: laundryDetailRes,
                  productDetail: productDetailRes,
                  review : RV,
                  reviewStar : reviewStar,
                  userLike : userLike,
                  countReview : countReview
    
                });
            }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
    orderPage : async (req, res) => {
        const laundry = new Laundry(req.params.id);
        const laundryDetailRes = await laundry.showDetail();

        const cookieAddress = req.headers.cookie;
        const decodedValue = decodeURIComponent(cookieAddress);
        const matches = decodedValue.match(/deliveryAddress1="([^"]+)";\s*deliveryAddress2="([^"]+)"/);
        const deliveryAddress = matches[2];

        const cookieValue = req.cookies.response;
        const orderNum = JSON.parse(cookieValue).orderNumber; 
        const laundryOrder = new LaundryOrder(orderNum);
        const cartRes = await laundryOrder.showCart();
        const totalPriceRes = await laundryOrder.getTotalPrice();

        const product = new Product(cartRes);
        const productRes = await product.getProductId();

        logger.info(`GET /home/laundryOrder 304 " 세탁신청주문 화면으로 이동`);
        res.json(
        {
            deliveryAddress : deliveryAddress,
            cartRes : cartRes,
            laundryDetailRes : laundryDetailRes,
            productRes : productRes,
            totalPriceRes : totalPriceRes
        });
    },
};

const process = {
    addCart: async (req, res) => {
        if (global.userId === undefined) {
            res.status(200).json({message:"login"})
        }
        else {
            const cart = new Cart(req.body, global.userId.id);
            const response = await cart.add();
            res.json(response)
        }
    },

    like: async (req,res) => {
        //req.body -> 1과 0 리턴 
        if (global.userId === undefined) {
            res.status(200).json({message : "ok"})
        }
        else {
            const like = new Likes(req.body, global.userId.id);
            const response = await like.insert();
            res.status(200).json({ message: 'success' });
        }
    },
    orderComplete: async (req, res) => {
        const cookieAddress = req.headers.cookie;
        const decodedValue = decodeURIComponent(cookieAddress);
        const matches = decodedValue.match(/deliveryAddress1="([^"]+)";\s*deliveryAddress2="([^"]+)"/);
        const deliveryAddress = matches[2];
        
        const cookieValue = req.cookies.response;
        const orderNum = JSON.parse(cookieValue).orderNumber; 
        const orderComplete = new LaundryOrderComplete(req.body, orderNum, deliveryAddress);
        await orderComplete.addOrderList();
        await orderComplete.addOrderCompleteList();
        if (req.headers.cookie && req.headers.cookie.includes('response')) {
            res.clearCookie('response').json({message:"ok"});
        }
        res.status(200);
    },
    review : async (req,res) => {
        const review = new Review(req.body, global.userId.id);
        const response = await review.write();
        console.log(response);
        res.json(response);
    },
    reviewUpdate : async (req,res) => {
        const review = new Review(req.body);
        console.log(req.body);
        const response = await review.update(req.params.orderNum);
        console.log(response);
        res.json(response);
    },
    reviewDelete : async (req,res) => {
        const review = new Review();
        const response = await review.delete(req.body.orderNum);
        res.status(200).json({message : "ok"});
    },
    edit : async (req,res) => {
        const edit = new Edit(req.body, global.userId.id);
        const response = await edit.update();
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
                global.userId = decoded;

                console.log(token,global.userId);
                return res.status(200).json({ message: '토큰이 유효합니다.' });
        });
    },
    reviewExist: async (req, res) => {
        const review = new Review();
        const reviewExist = await review.isReviewexist(req.body.orderNum);
        try {
            if (reviewExist.O_NUM != null) {
                console.log(await review.isReviewexist(req.body.orderNum))
                res.status(200).json({message:"이미 작성한 리뷰입니다."})
            }
        } catch(e) {
            res.status(200).json({message:"리뷰 작성 페이지로 이동합니다."})
        }
    }
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

