"use strict";

const id = document.querySelector("#id"),//id 태그로 부여되어있는 id를 불러와라
name = document.querySelector("#name"), 
psword = document.querySelector("#psword"),
confirmPsword = document.querySelector("#confirm-psword"),
registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
    if (!id.value) return alert("아이디를 입력해주세요");
    if (psword.value !== confirmPsword.value) return alert("비빌입니다이 일치하지않습니다");


    const req = {
        id: id.value,
        name: name.value,
        psword: psword.value,
        
    };
    console.log(req);

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req), 
    })
    .then((res)=> res.json())
    .then((res) => {
        if(res.success) {
            location.href = "/login";
        } else {
            if (res.err) return alert(res.err);
        }
    }).catch((err)=> {
        console.error("회원가입 중 에러 발생");
    });
}
