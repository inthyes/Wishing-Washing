 



//   "use strict";
// const db = require("../config/db");
// const {response} = require("express");
// //const LaundryDetail = require("./LaundryDetail");

// // 세탁소 클래스 생성

// class Likes {
//     constructor(body, U_ID) {
//         // this.body에는 req.params.id가 들어가있음
//         this.body = body;
//         this.U_ID = U_ID;
//       }
  
    
//      //상점별 like개수
// static async getLikedStore() {
//     return new Promise((resolve, reject) => {
//       db.query("USE CAPSTONE", (err, result) => {
//         if (err) reject(err);
//         const query = `
//           SELECT S_ID, COUNT(U_ID) as like_count
//           FROM LIKES
//           GROUP BY S_ID
//           ORDER BY like_count DESC;
//         `;
//         db.query(query, (err, data) => {
//           if (err) reject(err);
//           else resolve(data);
//         });
//       });
//     });
//   }
      
// }


// module.exports = Likes; 