USE CAPSTONE;

-- 테이블 생성 SQL - ORDER_COMPLETE
CREATE TABLE ORDER_COMPLETE
(
    `O_NUM`             INT            NOT NULL    COMMENT '주문번호', 
    `S_ID`              INT            NULL        COMMENT '세탁소ID', 
    `U_ID`              VARCHAR(45)    NULL        COMMENT 'USER ID', 
    `O_DAY`             VARCHAR(45)    NULL        COMMENT '배달 희망 날짜', 
    `DELEVERY_STATE`    TINYINT        NULL        COMMENT '배달 상태', 
    `U_PHONE`           VARCHAR(45)    NULL        COMMENT '회원전화번호', 
    `O_METHOD`          VARCHAR(45)    NULL        COMMENT '결제 수단', 
    `O_PRICE`           INT            NULL        COMMENT '총 가격', 
    `O_REQUEST`         TEXT           NULL        COMMENT '요청사항', 
    `DELEVERY_ADDRESS`  TEXT    NULL        COMMENT '배달 주소', 
    `ORD_DAY`           TIMESTAMP      NULL        COMMENT '주문 날짜', 
     PRIMARY KEY (O_NUM)
);

-- 테이블 Comment 설정 SQL - ORDER_COMPLETE
ALTER TABLE ORDER_COMPLETE COMMENT '주문 완료';


-- 테이블 생성 SQL - IMAGE
CREATE TABLE IMAGE
(
    `I_ID`    INT             NOT NULL    AUTO_INCREMENT COMMENT '이미지 아이디', 
    `I_NAME`  VARCHAR(255)    NULL        COMMENT '이미지이름', 
    `I_DATA`  LONGBLOB        NULL        COMMENT '이미지 데이터', 
     PRIMARY KEY (I_ID)
);

-- 테이블 Comment 설정 SQL - IMAGE
ALTER TABLE IMAGE COMMENT '이미지';

-- 테이블 생성 SQL - ORDER_NUM
CREATE TABLE ORDER_NUM
(
    `ORDER_NUM`  INT    NOT NULL    COMMENT '주문번호'
);

insert into order_num (order_num)
values (0);


-- 테이블 생성 SQL - USERS
CREATE TABLE USERS
(
    `U_ID`     VARCHAR(45)     NOT NULL    COMMENT '로그인ID', 
    `U_PW`     VARCHAR(255)    NOT NULL    COMMENT '비밀번호', 
    `U_NAME`   VARCHAR(45)     NULL        COMMENT '이름', 
    `U_PHONE`  VARCHAR(45)     NULL        COMMENT '휴대폰번호', 
    `SALT`     VARCHAR(255)    NULL        COMMENT 'salt', 
    `U_MAIL`   VARCHAR(45)     NULL        COMMENT '이메일', 
     PRIMARY KEY (U_ID)
);

-- 테이블 Comment 설정 SQL - USERS
ALTER TABLE USERS COMMENT '회원';

-- 테이블 생성 SQL - STORE
CREATE TABLE STORE
(
    `S_ID`        INT             NOT NULL    AUTO_INCREMENT COMMENT '세탁소ID', 
    `S_NAME`      VARCHAR(45)     NULL        COMMENT '세탁소 이름', 
    `S_PHONE`     VARCHAR(45)     NULL        COMMENT '세탁소 전화번호', 
    `S_IMAGE`     TEXT            NULL        COMMENT '세탁소 이미지', 
    `S_THUMB`     TEXT            NULL        COMMENT '세탁소 썸네일', 
    `S_OPENING`   VARCHAR(45)     NULL        COMMENT '영업시작시간', 
    `S_CLOSING`   VARCHAR(45)     NULL        COMMENT '영업종료시간', 
    `S_COMMENT`   TEXT            NULL        COMMENT '소개글', 
    `S_ANNOUNCE`  TEXT            NULL        COMMENT '공지사항', 
    `S_ADDR1`     VARCHAR(200)    NULL        COMMENT '세탁소 주소1', 
    `S_ADDR2`     VARCHAR(200)    NULL        COMMENT '세탁소 주소2', 
    `S_ADDR3`     VARCHAR(200)    NULL        COMMENT '세탁소 주소3', 
     PRIMARY KEY (S_ID)
);

-- 테이블 Comment 설정 SQL - STORE
ALTER TABLE STORE COMMENT '세탁소(매장)';

-- 테이블 생성 SQL - ORDER_LIST
CREATE TABLE ORDER_LIST
(
    `O_NUM`             INT            NOT NULL    COMMENT '주문번호', 
    `S_ID`              INT            NULL        COMMENT '세탁소ID', 
    `U_ID`              VARCHAR(45)    NULL        COMMENT 'USER ID', 
    `O_DAY`             VARCHAR(45)    NULL        COMMENT '배달 희망 날짜', 
    `U_PHONE`           VARCHAR(45)    NULL        COMMENT '회원전화번호', 
    `DELEVERY_ADDRESS`  TEXT    NULL        COMMENT '배달주소', 
    `O_REQUEST`         TEXT           NULL        COMMENT '요청사항', 
     PRIMARY KEY (O_NUM)
);

-- 테이블 Comment 설정 SQL - ORDER_LIST
ALTER TABLE ORDER_LIST COMMENT '주문목록';

-- 테이블 생성 SQL - PRODUCT
CREATE TABLE PRODUCT
(
    `PRODUCT_ID`     INT            NOT NULL    AUTO_INCREMENT COMMENT '상품ID', 
    `S_ID`           INT            NULL        COMMENT '세탁소ID', 
    `PRODUCT_NAME`   VARCHAR(45)    NULL        COMMENT '상품명', 
    `PRODUCT_PRICE`  INT            NULL        COMMENT '가격', 
    `PRODUCT_INFO`   TEXT           NULL        COMMENT '상품 정보', 
    `PRODUCT_IMG`    TEXT           NOT NULL    COMMENT '상품 이미지', 
     PRIMARY KEY (PRODUCT_ID)
);

-- 테이블 Comment 설정 SQL - PRODUCT
ALTER TABLE PRODUCT COMMENT '상품';

-- Foreign Key 설정 SQL - PRODUCT(S_ID) -> STORE(S_ID)
ALTER TABLE PRODUCT
    ADD CONSTRAINT FK_PRODUCT_S_ID_STORE_S_ID FOREIGN KEY (S_ID)
        REFERENCES STORE (S_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- 테이블 생성 SQL - CART
CREATE TABLE CART
(
    `O_NUM`              INT    NOT NULL    COMMENT '주문번호', 
    `PRODUCT_ID`         INT    NULL        COMMENT '상품ID', 
    `PRODUCT_QUANTITIY`  INT    NULL        COMMENT '수량'
);

-- 테이블 Comment 설정 SQL - CART
ALTER TABLE CART COMMENT '주문상품';

-- Foreign Key 설정 SQL - CART(PRODUCT_ID) -> PRODUCT(PRODUCT_ID)
ALTER TABLE CART
    ADD CONSTRAINT FK_CART_PRODUCT_ID_PRODUCT_PRODUCT_ID FOREIGN KEY (PRODUCT_ID)
        REFERENCES PRODUCT (PRODUCT_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 설정 SQL - CART(O_NUM) -> ORDER_LIST(O_NUM)
ALTER TABLE CART
    ADD CONSTRAINT FK_CART_O_NUM_ORDER_LIST_O_NUM FOREIGN KEY (O_NUM)
        REFERENCES ORDER_LIST (O_NUM) ON DELETE RESTRICT ON UPDATE RESTRICT;
        
-- 테이블 생성 SQL - ORDER_LIST
CREATE TABLE CEO
(
    `C_ID`        VARCHAR(45)     NOT NULL   COMMENT '사장님ID', 
    `C_PW`     VARCHAR(255)    NOT NULL    COMMENT '사장님 비밀번호', 
    `S_ID`        INT            NOT NULL    	COMMENT '세탁소ID', 
    `C_NAME`      VARCHAR(45)    NULL        COMMENT '사장님이름', 
    `C_PHONE`     VARCHAR(45)    NULL        COMMENT '사장님 전화번호', 
    `C_IMAGE`     TEXT           NULL        COMMENT '사장님 이미지',   
    `S_NUM`     TEXT           NOT NULL        COMMENT '사업자번호',
    `SALT`     VARCHAR(255)    NULL        COMMENT 'salt', 
    `S_MAIL`   VARCHAR(100)    NULL        COMMENT '사장님 이메일', 
     PRIMARY KEY (C_ID)
);       

-- 테이블 Comment 설정 SQL - CEO
ALTER TABLE CEO COMMENT '사장님'; 



-- 테이블 생성 SQL - LIKES
CREATE TABLE LIKES
(
    `U_ID`        VARCHAR(45)    NULL        COMMENT 'USER ID', 
    `S_ID`        INT            NULL        COMMENT 'STORE_ID', 
    `LIKES_DATE`  TIMESTAMP      NULL        COMMENT '찜한 날짜'
);

-- 테이블 Comment 설정 SQL - LIKES
ALTER TABLE LIKES COMMENT '찜';

-- Foreign Key 설정 SQL - LIKES(U_ID) -> USERS(U_ID)
ALTER TABLE LIKES
    ADD CONSTRAINT FK_LIKES_U_ID_USERS_U_ID FOREIGN KEY (U_ID)
        REFERENCES USERS (U_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- Foreign Key 설정 SQL - LIKES(S_ID) -> STORE(S_ID)
ALTER TABLE LIKES
    ADD CONSTRAINT FK_LIKES_S_ID_STORE_S_ID FOREIGN KEY (S_ID)
        REFERENCES STORE (S_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- 테이블 생성 SQL - REVIEW
CREATE TABLE REVIEW
(
    `O_NUM`         INT            NOT NULL    COMMENT '주문번호', 
    `S_ID`          INT            NULL        COMMENT '세탁소ID', 
    `REVIEW_TEXT`   TEXT           NULL        COMMENT '리뷰 내용', 
    `CEO_COMMENT`   TEXT           NULL        COMMENT '사장님 댓글', 
    `REGI_DATE`     TIMESTAMP      NULL        COMMENT '작성완료시간', 
    `U_ID`          VARCHAR(45)    NULL        COMMENT 'USER ID', 
    `REVIEW_START`  INT            NULL        COMMENT '별점', 
    `REVIEW_IMG`    TEXT           NULL        COMMENT '리뷰 이미지'
);

-- 테이블 Comment 설정 SQL - REVIEW
ALTER TABLE REVIEW COMMENT '리뷰';

-- Foreign Key 설정 SQL - REVIEW(O_NUM) -> ORDER_LIST(O_NUM)
ALTER TABLE REVIEW
    ADD CONSTRAINT FK_REVIEW_O_NUM_ORDER_LIST_O_NUM FOREIGN KEY (O_NUM)
        REFERENCES ORDER_LIST (O_NUM) ON DELETE RESTRICT ON UPDATE RESTRICT;
