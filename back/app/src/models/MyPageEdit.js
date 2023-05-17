"use strict";
const db = require("../config/db");
const {response} = require("express");
const crypto = require("crypto");

class MyPageEdit {
    constructor(body, U_ID) {
        // this.body에는 req.params.id가 들어가있음
        this.body = body;
        this.U_ID = U_ID;
      }
      async update() {
        const password = this.body.password;
        const phone = this.body.phone;
        const address = this.body.address;
        const mail = this.body.mail;
        const U_ID = this.U_ID;


        var salt = Math.round(new Date().valueOf() * Math.random()) + "";
        var hashPsword = crypto
          .createHash("sha512")
          .update(password + salt)
          .digest("hex");
        // const PW = await MyPageEdit.PW(mail,hashPsword,phone,address, U_ID);
        const PW = await MyPageEdit.PW(mail, password, phone, U_ID);

        return PW;
    }
    
    static async PW(mail,password,phone,U_ID) {
      return new Promise ((resolve, reject) => {const json = {
        code: 404,
        message: "DB 서버 연결 실패"
      };
  
      db.getConnection((err, conn) => {
        // db 연결 실패
        if (err) {
          console.log("Mysql 연결 실패");
          conn.release();
          console.log(json);
          // return res.status(404).send(json);
          reject(json);
        }
        // db 연결 성공
        console.log("DB 연결 성공");
        
      db.query("USE CAPSTONE", (err, result) => {
        const query = "UPDATE USERS SET U_MAIL = ?, U_PW = ?, U_PHONE = ? WHERE U_ID = ?;";

          if (err) reject(err);
          //const keys = Object.keys(query);
          db.query(query,  [mail, password, phone, U_ID], (err, data) => {
              if (err) reject(err);
              else {
                resolve(data)
                  }
              });
            })
      });
      })
  }

async myEdit() {
  return new Promise((resolve, reject) => {
    let userId = this.U_ID;
    // let userName = this.U_NAME;
    db.query("USE CAPSTONE", (err, result) => {
      const queryGetMyEdit = "SELECT * FROM USERS WHERE U_ID = ?;";
      if (err) reject(err);
      db.query(queryGetMyEdit, [userId, userName], (err, data) => {
        if (err) reject(err);
        else {
          console.log(data);
          resolve(data);
        }
      });
    });
  });
}     
}
module.exports = MyPageEdit; 

// "use strict";
// const db = require("../config/db");
// const { response } = require("express");
// const crypto = require("crypto");

// class MyPageEdit {
//   constructor(body, U_ID) {
//     this.body = body;
//     this.U_ID = U_ID;
//   }

//   async update() {
//     const password = this.body.password;
//     const phone = this.body.phone;
//     const address = this.body.address;
//     const mail = this.body.mail;
//     const U_ID = this.U_ID;
//     const name = this.body.name;

//     // var salt = Math.round(new Date().valueOf() * Math.random()) + "";
//     // var hash = crypto.createHash("sha512").update(password + salt).digest("hex");

//     let updatedFields = [];
//     let queryParams = [];

//     if (mail) {
//       updatedFields.push("U_MAIL = ?");
//       queryParams.push(mail);
//     }

//     if (password) {
//       const salt = Math.round(new Date().valueOf() * Math.random()) + "";
//       const hashedClientPassword = crypto
//         .createHash("sha512")
//         .update(password + salt)
//         .digest("hex");
      
//       const existingPassword = await MyPageEdit.getPassword(U_ID);
//       if (existingPassword && existingPassword === hashedClientPassword) {
//         // 기존 비밀번호와 일치하는 경우에만 새로운 비밀번호를 작성할 수 있도록 처리
//         const newPassword = generateNewPassword(); // 새로운 비밀번호 생성 로직 구현 필요
//         const newHashedPassword = crypto
//           .createHash("sha512")
//           .update(newPassword + salt)
//           .digest("hex");
        
//         updatedFields.push("U_PW = ?");
//         queryParams.push(newHashedPassword);
//       }
//     }

    

//     if (phone) {
//       updatedFields.push("U_PHONE = ?");
//       queryParams.push(phone);
//     }

//     if (name) {
//       updatedFields.push("U_NAME = ?");
//       queryParams.push(name);
//     }

//     const PW = await MyPageEdit.PW(updatedFields, queryParams, U_ID, password);

//     return PW;
//   }

//   static async PW(updatedFields, queryParams, U_ID, clientPassword) {
//     return new Promise((resolve, reject) => {
//       const json = {
//         code: 404,
//         message: "DB 서버 연결 실패"
//       };

//       db.getConnection((err, conn) => {
//         if (err) {
//           console.log("Mysql 연결 실패");
//           conn.release();
//           console.log(json);
//           reject(json);
//         }

//         console.log("DB 연결 성공");

//         db.query("USE CAPSTONE", (err, result) => {
//           if (err) reject(err);

//           const query = `UPDATE USERS SET ${updatedFields.join(", ")} WHERE U_ID = ?`;

//           queryParams.push(U_ID);

//           db.query(query, queryParams, (err, data) => {
//             if (err) reject(err);
//             else {
             
//               // if (hashedClientPassword === data[0].password) {
//               //   console.log("비밀번호 일치");
//               // } else {
//               //   console.log("비밀번호 불일치");
//               // }
              
//               resolve(data);
//             }
//           });
//         });
//       });
//     });
//   }

//   async myEdit() {
//     return new Promise((resolve, reject) => {
//       let userId = this.U_ID;
//       db.query("USE CAPSTONE", (err, result) => {
//         const queryGetMyEdit = "SELECT * FROM USERS WHERE U_ID = ?;";
//         if (err) reject(err);
//         db.query(queryGetMyEdit, [userId], (err, data) => {
//           if (err) reject(err);
//           else {
//             console.log(data);
//             resolve(data);
//           }
//         });
//       });
//     });
//   }
//   static async getPassword(U_ID) {
//     return new Promise((resolve, reject) => {
//       db.getConnection((err, conn) => {
//         if (err) {
//           // ...
//           reject(json);
//         }

//         // ...

//         db.query("USE CAPSTONE", (err, result) => {
//           if (err) reject(err);

//           const query = "SELECT U_PW FROM USERS WHERE U_ID = ?";

//           db.query(query, [U_ID], (err, data) => {
//             if (err) reject(err);
//             else {
//               if (data.length > 0) {
//                 resolve(data[0].U_PW);
//                 console.log("성공");
//               } else {
//                 resolve(null);
//               }
//             }
//           });
//         });
//       });
//     });
//   }
  
// }

// // module.exports = MyPageEdit;
// "use strict";
// const db = require("../config/db");
// const { response } = require("express");
// const crypto = require("crypto");

// class MyPageEdit {
//   constructor(body, U_ID) {
//     this.body = body;
//     this.U_ID = U_ID;
//   }

//   async update() {

//     const password = this.body.password;
//     const phone = this.body.phone;
//     const address = this.body.address;
//     const mail = this.body.mail;
//     const U_ID = this.U_ID;
//     const name = this.body.name;

//     let updatedFields = [];
//     let queryParams = [];

//     if (mail) {
//       updatedFields.push("U_MAIL = ?");
//       queryParams.push(mail);
//     }

//     // if (password) {
//     //   const salt = Math.round(new Date().valueOf() * Math.random()) + "";
//     //   const newPassword = this.generateNewPassword();
//     //   const hashedClientPassword = crypto
      
//     //     .createHash("sha512")
//     //     .update(password + salt)
//     //     .digest("hex");
      
//     //     const existingPassword = await MyPageEdit.getPassword(U_ID).catch(err => {
//     //       // 오류 처리
//     //       console.err(err);
//     //     });
//     //     if (existingPassword && existingPassword === hashedClientPassword){}
//     //     updatedFields.push("U_PW = ?");
//     //     queryParams.push(newHashedPassword);
//     //     console.log("tㄴㅁㅇㄹ");
//     //   }

//     if (password) {
//       const salt = Math.round(new Date().valueOf() * Math.random()) + "";
//       const password = this.generateNewPassword();
//       const hashedClientPassword = crypto
//         .createHash("sha512")
//         .update(password + salt)
//         .digest("hex");
    
//       const existingPassword = await MyPageEdit.getPassword(U_ID);
    
//       if (existingPassword && existingPassword === hashedClientPassword) {
//         // Generate new hashed password
//         updatedFields.push("U_PW = ?");
//         queryParams.push(newHashedPassword);
//       }
//     }
//     // if (password) {
//     //   const salt = Math.round(new Date().valueOf() * Math.random()) + "";
//     //   const hashPsword = crypto
//     //     .createHash("sha512")
//     //     .update(password + salt)
//     //     .digest("hex");
  
//     //   updatedFields.push("U_PW = ?");
//     //   queryParams.push(hashPsword);
//     // }
  
    
//     if (phone) {
//       updatedFields.push("U_PHONE = ?");
//       queryParams.push(phone);
//     }

//     if (name) {
//       updatedFields.push("U_NAME = ?");
//       queryParams.push(name);
//     }
//   //   const PW = await MyPageEdit.PW(updatedFields, queryParams, U_ID, password)
//   //   .catch(err => {
//   //     // Handle the error here
//   //     console.error(err);
//   //     throw err; // Rethrow the error to propagate it further
//   //   });

//   // return PW;
//   try {
//     const PW = await MyPageEdit.PW(updatedFields, queryParams, U_ID, password);
//     // console.log("pw");
//     return PW;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
//   }
//   static async PW(updatedFields, queryParams, U_ID, password) {
//     return new Promise((resolve, reject) => {
//       const json = {
//         code: 404,
//         message: "DB 서버 연결 실패"
//       };
  
//       db.getConnection((err, conn) => {
//         if (err) {
//           console.log("Mysql 연결 실패");
//           conn.release();
//           console.log(json);
//           reject(json);
//         }
  
//         console.log("DB 연결 성공");
  
//         db.query("USE CAPSTONE", (err, result) => {
//           if (err) reject(err);
  
//           const query = `UPDATE USERS SET ${updatedFields.join(", ")} WHERE U_ID = ?`;
  
//           queryParams.push(U_ID);
  
//           db.query(query, queryParams, (err, data) => {
//             if (err) reject(err);
//             else {
//               resolve(data);
//             }
//           });
//         });
//       });
//     });
//   }
  
//   // static async getPassword(U_ID) {
//   //   return new Promise((resolve, reject) => {
//   //     const queryGetPassword = "SELECT U_PW FROM users WHERE U_ID = ?";
//   //     db.query(queryGetPassword, [U_ID], (error, rows) => {
//   //       if (error) {
//   //         reject(null);
//   //       } else {
//   //         if (rows.length > 0) {
//   //           resolve(rows[0].U_PW);
//   //           // console.log("tq");
//   //         } else {
//   //           resolve(null);
//   //         }
//   //       }
//   //     });
//   //   });
//   // }
//   static async getPassword(U_ID) {
//     return new Promise((resolve, reject) => {
//       db.getConnection((err, conn) => {
//         if (err) {
//           // ...
//           reject(json);
//         }
  
  
//         db.query("USE CAPSTONE", (err, result) => {
//           if (err) reject(err);
  
//           const query = "SELECT U_PW FROM USERS WHERE U_ID = ?";
//           console.log(query);
//           db.query(query, [U_ID], (err, data) => {
//             if (err) reject(err);
//             else {
//               if (data.length > 0) {
//                 resolve(data[0].U_PW);
//               } else {
//                 resolve(null);
//               }
//             }
//           });
//         });
//       });
//     });
//   }

//   generateNewPassword() {
//     // 비밀번호 생성 로직 구현
//     // ...
//   }
// }

// module.exports = MyPageEdit;

// "use strict";
// const db = require("../config/db");
// const { response } = require("express");
// const crypto = require("crypto");

// class MyPageEdit {
//   constructor(body, U_ID) {
//     this.body = body;
//     this.U_ID = U_ID;
//   }

//   async update() {
//     const password = this.body.password;
//     const phone = this.body.phone;
//     const address = this.body.address;
//     const mail = this.body.mail;
//     const U_ID = this.U_ID;
//     const name = this.body.name;

//     // var salt = Math.round(new Date().valueOf() * Math.random()) + "";
//     // var hash = crypto.createHash("sha512").update(password + salt).digest("hex");

//     let updatedFields = [];
//     let queryParams = [];

//     if (mail) {
//       updatedFields.push("U_MAIL = ?");
//       queryParams.push(mail);
//     }

//     if (password) {
//       const salt = Math.round(new Date().valueOf() * Math.random()) + "";
//       const hashedClientPassword = crypto
//         .createHash("sha512")
//         .update(password + salt)
//         .digest("hex");
      
//       const existingPassword = await MyPageEdit.submitPW(password);
//       if (existingPassword && existingPassword === hashedClientPassword) {
//         // 기존 비밀번호와 일치하는 경우에만 새로운 비밀번호를 작성할 수 있도록 처리
//         const newPassword = generateNewPassword(); // 새로운 비밀번호 생성 로직 구현 필요
//         const newHashedPassword = crypto
//           .createHash("sha512")
//           .update(newPassword + salt)
//           .digest("hex");
//           console.log("해시완료");
        
//         updatedFields.push("U_PW = ?");
//         queryParams.push(newHashedPassword);
//       }
//     }

    

//     if (phone) {
//       updatedFields.push("U_PHONE = ?");
//       queryParams.push(phone);
//     }

//     if (name) {
//       updatedFields.push("U_NAME = ?");
//       queryParams.push(name);
//     }

//     const PW = await MyPageEdit.PW(updatedFields, queryParams, U_ID, password);

//     return PW;
//   }

//   static async PW(updatedFields, queryParams, U_ID, clientPassword) {
//     return new Promise((resolve, reject) => {
//       const json = {
//         code: 404,
//         message: "DB 서버 연결 실패"
//       };

//       db.getConnection((err, conn) => {
//         if (err) {
//           console.log("Mysql 연결 실패");
//           conn.release();
//           console.log(json);
//           reject(json);
//         }

//         console.log("DB 연결 성공");

//         db.query("USE CAPSTONE", (err, result) => {
//           if (err) reject(err);

//           const query = `UPDATE USERS SET ${updatedFields.join(", ")} WHERE U_ID = ?`;


//           queryParams.push(U_ID);

//           db.query(query, queryParams, (err, data) => {
//             if (err) reject(err);
//             else {
             
//               // if (hashedClientPassword === data[0].password) {
//               //   console.log("비밀번호 일치");
//               // } else {
//               //   console.log("비밀번호 불일치");
//               // }
              
//               resolve(data);
//             }
//           });
//         });
//       });
//     });
//   }

//   async myEdit() {
//     return new Promise((resolve, reject) => {
//       let userId = this.U_ID;
//       db.query("USE CAPSTONE", (err, result) => {
//         const queryGetMyEdit = "SELECT * FROM USERS WHERE U_ID = ?;";
//         if (err) reject(err);
//         db.query(queryGetMyEdit, [userId], (err, data) => {
//           if (err) reject(err);
//           else {
//             console.log(data);
//             resolve(data);
//           }
//         });
//       });
//     });
//   }
//   // const crypto = require('crypto');

//   // static async submitPW(password) {
//   //   const userId = 'codus'; // 클라이언트에서 전송한 U_ID 값
  
//   //   // 디비에서 비밀번호와 salt 조회
//   //   const queryGetMyEdit = "SELECT U_PW, SALT FROM USERS WHERE U_ID = ?;";
//   //   try {
//   //     const [results] = await db.query(queryGetMyEdit, [userId]);
//   //     console.log("확인");
//   //     if (results.length === 0) {
//   //       return { success: false, message: '사용자를 찾을 수 없습니다.' };
//   //     };
  
//   //     const hashedPasswordFromDB = results[0].U_PW;
//   //     const salt = results[0].U_SALT;
  
//   //     // 클라이언트에서 받은 비밀번호와 salt 값을 사용하여 비밀번호를 해시화
//   //     const newHashedPassword = crypto
//   //       .createHash('sha512')
//   //       .update(password + salt)
//   //       .digest('hex');
  
//   //     // 해시화된 비밀번호와 디비에 저장된 해시화된 비밀번호 비교
//   //     if (newHashedPassword === hashedPasswordFromDB) {
//   //       // 비밀번호가 일치하는 경우
//   //       return { success: true, message: '비밀번호가 일치합니다.' };
//   //     } else {
//   //       // 비밀번호가 일치하지 않는 경우
//   //       return { success: false, message: '비밀번호가 올바르지 않습니다.' };
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //     return { success: false, message: '서버 오류' };
//   //   }
//   // }
  

// }

// module.exports = MyPageEdit;