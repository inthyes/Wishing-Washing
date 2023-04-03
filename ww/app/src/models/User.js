"use strict";

const {response} = require("express");
const UserStorage = require("./UserStorage");


// class User{
//     constructor(body) {
//         this.body = body;
//     }

//     async login() {
//         const client = this.body;
//         try{
//             const user = await UserStorage.getUserInfo(client.id);
    
//             if (user) {
//                 if (user.psword === client.psword && user.psword === client.psword){
//                     return {success: true};
//                 }
//                 return {success: false, msg: "비밀번호가 틀렸습니다"};
//             }
//             return {success: false, msg: "존재하지 않는 아이디입니다"};
//             }catch (err) {
//             return {success: false, err};
//         }
        
//     }

//     async register() {
//         const client = this.body;
//         try{
//         const response = await UserStorage.save(client);

//         return response;
//         } catch (err) {
//             return {success : false, err};
//         }
//     }
// }


class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    // 아이디가 DB에 없을 경우 에러 발생 수정 필요
    try {
      if (!client.id) {
        return { success: false, msg: "아이디를 입력해주세요." };
      }
  
      const user = await UserStorage.getUserInfo(client.id);
    
      if (user) {
        if (user.psword === client.psword) {
          return { success: true };
        }
        return { success: false, msg: '비밀번호가 틀렸습니다' };
      }
      return { success: false, msg: '존재하지 않는 아이디입니다' };
    } catch (err) {
      return { success: false, err };
    }
  }
  
  
  
  async register() {
    const client = this.body;
    try {
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = User; 