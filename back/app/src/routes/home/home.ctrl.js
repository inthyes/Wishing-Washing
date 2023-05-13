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
const MyPageEdit = require("../../models/MyPageEdit");
const History = require("../../models/History");
const Review = require("../../models/Review");
// const router = require(".");
const router = express.Router();

const jwt = require("jsonwebtoken");


// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization; // 토큰을 쿼리 파라미터로 전달 받음
  
//     // 토큰 검증 로직
//     jwt.verify(token, "secretKey", (err, decoded) => {
//       if (err) {
//         // 토큰이 유효하지 않은 경우
//         return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
//       }
  
//       // 토큰이 유효한 경우
//       req.user_id = decoded.id; // 토큰에서 추출한 사용자 ID를 요청 객체에 추가
//       next(); // 다음 미들웨어로 이동
//     });
//   };

const output ={
    
    home: async (req, res) => {
        if (req.headers.cookie.includes('response')) {
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
    login : (req,res) => {
        logger.info(`GET /login 304 "로그인 화면으로 이동"`);
        res.render("home/login");
    },
    register : (req, res) => {
        logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
        res.render("home/register");
    },
    laundry : async (req, res) => {
            logger.info(`GET /laundry 304 "세탁신청 화면으로 이동"`);

            const cookieValue = req.headers.cookie;
            const decodedValue = decodeURIComponent(cookieValue);

            const matches = decodedValue.match(/deliveryAddress1="([^"]+)";\s*deliveryAddress2="([^"]+)"/);
            const deliveryAddress1 = matches[1];
            const deliveryAddress2 = matches[2];

            const laundryList = new LaundryList(req.body, deliveryAddress1, deliveryAddress2);
            const laundryListRes = await laundryList.getLaundryInfo();
            console.log(laundryListRes);
            res.json(laundryListRes);
        },
    review : (req, res) => {
        logger.info(`GET /laundry 304 "review 화면으로 이동"`);
        const S_ID = req.params.S_ID;
        const O_NUM = req.params.O_NUM;
        res.render("home/review", {S_ID : S_ID, O_NUM : O_NUM});
    },

    // showReview : async (req, res) => {
    //     logger.info(`GET /laundry 304 "showreview 화면으로 이동"`);
    //     const S_ID = req.params.id; //세탁소아이디 불러옴
    //     //console.log(req.params.id);
    //     const review = new Review(S_ID, "codus");
    //     const RV = await review.showReview();
    //     console.log("RV:");
    //     console.log(RV);
    //     res.json(
    //     {
    //         RV
    //     });
    // },
    history : async (req, res) => {
        const token = req.query.token;
        const user_id = Vtoken(token);  // 토큰 검증
        console.log("토큰확인: " + token);
        console.log("user_id: " + user_id);

        logger.info(`GET /history 304 "이용내역 화면으로 이동"`);
        const history = new History("codus"); //아이디토큰 받아오기

        const {completeList, notCompleteList} = await history.showHistory();
        //const response1 = await cart.addOrderList();
        console.log(completeList, notCompleteList);
        res.render("home/history", 
        {
            completeList : completeList, 
            notCompleteList : notCompleteList
        });
    },
    myPage : (req, res) => {
        // const token = req.query.token;
        // const user_id = Vtoken(token);  // 토큰 검증
        // console.log("토큰확인: " + token);
        // console.log("user_id: " + user_id);

        logger.info(`GET /home/myPage 304 "마이페이지 화면으로 이동`);
        res.render("home/myPage");
    },
    favoriteList : (req, res) => {
        const token = req.query.token;
        const user_id = Vtoken(token);  // 토큰 검증
        console.log("토큰확인: " + token);
        console.log("user_id: " + user_id);

        logger.info(`GET /myPage/favoriteList 304 "프로필편집 화면으로 이동"`);
        res.render("home/favoriteList");
        //실제 경로 , 라우팅 경로 : myPage/favoriteList
        /* var user;
         //클라이언트가 HTTP요청 헤더에 토큰 받아서 보낼거임
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "secretKey", (err, decoded) => {
          if (err) {
            console.log("토큰 만료 오류");
            const json = {
              code : 401,
              message : "로그인 후 이용해주세요." 
            }
            return res.status(401).send(json);
          }
          try {
            // JWT 토큰 검증을 수행한다.
            const decoded = jwt.verify(token, 'secretKey');
            // 검증이 완료된 경우, 요청 객체에 인증 정보를 추가한다.
            //디코드한 유저를 변수로 저장.
            console.log(decoded);
           user = decoded.id;
          } catch (err) {
            // JWT 토큰 검증 실패 시, 403 Forbidden 에러를 반환한다.
            const json = {
              code: 403,
              message: '잘못된 인증 정보입니다.'
            };
            return res.status(403).send(json);
          }
        }); */
        //토큰 받아오면 하드코딩 해제
        const favorite = new MyPage("codus");

        const response = favorite.showFavoriteList();
        //const response1 = await cart.addOrderList();
        console.log(response);
    },
    //myPage 하위 기능
    profileEdit : (req, res) => 
    {
        logger.info(`GET /myPage/profileEdit 304 "프로필편집 화면으로 이동"`);
        //실제 경로 , 라우팅 경로 : myPage/profileEdit
        res.render("home/profileEdit");
    },
    customerService : (req, res) => {
        const token = req.query.token;
        const user_id = Vtoken(token);  // 토큰 검증
        console.log("토큰확인: " + token);
        console.log("user_id: " + user_id);

        logger.info(`GET /home/myPage/customerService 304 "고객센터 화면으로 이동`);
        res.render("home/customerService");
    },
    userManagement : (req, res) => {
        const token = req.query.token;
        const user_id = Vtoken(token);  // 토큰 검증
        console.log("토큰확인: " + token);
        console.log("user_id: " + user_id);

        logger.info(`GET /home/myPage/userManagement 304 "탈퇴/로그아웃 화면으로 이동`);
        res.render("home/userManagement");
    },
    // 세탁소 세부페이지 
    // laundryDetail: async(req, res) => {
    //     // const token = req.query.token;
    //     // const user_id = Vtoken(token);  // 토큰 검증
    //     // console.log("토큰확인: " + token);
    //     // console.log("user_id: " + user_id);

    //     logger.info(`GET /laundry/detail/id 304 "세탁신청 세부 화면으로 이동`);
    //     const laundry = new Laundry(req.params.id);
    //     const product = new Product(req.params.id);
        
    //     //db에서 찾아온 내용 보여주기.
    //     // response로 json 형태로 데이터가 전달.
    //     const laundryDetailRes = await laundry.showDetail();
    //     const productDetailRes = await product.showDetail();
    //     console.log(laundryDetailRes);
    //     console.log(productDetailRes); 
    //     res.json({
    //         laundryDetail: laundryDetailRes, 
    //         productDetail: productDetailRes
    //     });
    // },
    laundryDetail: async (req, res) => {
      /*  try {
          const token = req.headers.cookie; // 헤더에서 토큰 추출
      
          // 토큰 검증
          jwt.verify(token, 'your-secret-key', async (err, decoded) => {
            if (err) {
              // 토큰이 유효하지 않을 경우에 대한 처리
              console.error(err);
              return res.status(401).json({ error: 'Invalid token' });
            }
      
            const user_id = decoded.user_id; // 토큰에서 추출한 사용자 ID
            console.log('user_id:', user_id); */
      
            // 토큰 검증 후의 나머지 로직을 이곳에 작성
            
            // 뒤로가기 실행시 if 쿠키가 존재 -> 쿠키삭제 + cart랑 orderList에서 ordernum관련 내용 삭제
            if (req.headers.cookie.includes('response')) {
                const cookieValue = req.cookies.response;
                console.log(req.cookies);
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
            const review = new Review(S_ID, "codus");
            const RV = await review.showReview();
            const reviewStar = await review.averageStar(S_ID);

            const like = new Likes(req.body, "codus");
            const userLike = await like.likeStatus(S_ID, "codus");

            res.json({
              laundryDetail: laundryDetailRes,
              productDetail: productDetailRes,
              review : RV,
              reviewStar : reviewStar,
              userLike : userLike
            });
       /*   });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }*/
      },

    //사장님 기능 & 리뷰 사진 올릴 때 사용
    upload : async(req, res) =>{
        logger.info(`GET /home/upload 304 "upload 화면으로 이동`);
        res.render('home/upload');
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

        const product = new Product(cartRes);
        const productRes = await product.getProductId();

        logger.info(`GET /home/laundryOrder 304 " 세탁신청주문 화면으로 이동`);

        res.json(
        {
            deliveryAddress : deliveryAddress,
            cartRes : cartRes,
            laundryDetailRes : laundryDetailRes,
            productRes : productRes
        });
    },
};

const process = {
    addCart: async (req, res) => {
        // const token = req.query.token;
        // const user_id = Vtoken(token);  // 토큰 검증
        // console.log("토큰확인: " + token);
        // console.log("user_id: " + user_id);
        const cart = new Cart(req.body, "codus");
        const response = await cart.add();
        res.json(response)
    },

    like: async (req,res) => {
        //req.body -> 1과 0 리턴 
        const like = new Likes(req.body, "codus");
        const response = await like.insert();
        res.status(200).json({ message: 'success' });
    },
    orderComplete: async (req, res) => {
        const cookieAddress = req.headers.cookie;
        const decodedValue = decodeURIComponent(cookieAddress);
        const matches = decodedValue.match(/deliveryAddress1="([^"]+)";\s*deliveryAddress2="([^"]+)"/);
        const deliveryAddress = matches[2];
        
        const cookieValue = req.cookies.response;
        const orderNum = JSON.parse(cookieValue).orderNumber; 
        const orderComplete = new LaundryOrderComplete(req.body, orderNum, deliveryAddress);
        const orderListRes = await orderComplete.addOrderList();
        const orderCompleteRes = await orderComplete.addOrderCompleteList();
        res.clearCookie('response').redirect('/');
    },

    //수정중
    edit : async (req,res) => {
        console.log(req.body);

        const token = req.headers.authorization;

        try {
          // 토큰을 검증하고 사용자 아이디를 추출합니다.
          const decodedToken = jwt.verify(token, secretKey);
          const userId = decodedToken.userId;
      
        const Edit = new MyPageEdit(req.body, userId);
        const response = await Edit.update();
        return response;
        }catch (error) {
            // 토큰 검증 실패 등의 오류 처리
            console.error(error);
            // 오류 응답을 반환하거나 예외 처리를 진행합니다.
          }
    },
    review : async (req,res) => {
        console.log(req.body);
        const review = new Review(req.body, "codus");
        const response = await review.update();
        res.render("home/myPage",);
    },
    verityToken : (req,res) => {
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

