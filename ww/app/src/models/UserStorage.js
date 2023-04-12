//사용 안함 routes/home/login.js, register.js 사용

// "use strict";

// const db = require("../config/db");

// class UserStorage {
//   static getUsers(isAll, ...fields) {}

//   static getUserInfo(id) {
//     return new Promise((resolve, reject) => {
//       db.query("USE capstone", (err, result) => {
//         const query = "SELECT * FROM users where id = ?;";
//         if (err) reject(err);
//         db.query(query, [id], (err, data) => {
//           if (err) reject(err);
//           else {
//             const user = data[0];
//             resolve({
//               id: user.id,
//               name: user.name,
//               psword: user.psword,
//             });
//           }
//         });
//       });
//     });
//   }

//   static async save(userInfo) {
//     return new Promise((resolve, reject) => {
//       db.query("USE capstone", (err, result) => {
//         if (err) {
//           reject(err);
//           return;
//         }
//         const query =
//           "INSERT INTO users(id, name, psword) VALUES (?, ?, ?);";

//         db.query(
//           query,
//           [userInfo.id, userInfo.name, userInfo.psword],
//           (err, result) => {
//             if (err) reject(err);
//             else resolve({ success: true });
//           }
//         );
//       });
//     });
//   }
// }

// module.exports = UserStorage;
