"use strict";

const id = document.querySelector("#id"), //id 태그로 부여되어있는 id를 불러와라
psword = document.querySelector("#psword"),
loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

function login() {
    if (!id.value) return alert("아이디를 입력해주세요");
    if (!psword.value) return alert("비밀번호를 입력해주세요");

    const req = {
        id: id.value,
        psword: psword.value,
    };

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req), 
    })
    .then((res)=> res.json())
    //.then((res)=> console.log(res)); 을 생략가능
    .then((res) => {
        if(res.success) {
            location.href = "/";
        } else {
            if (res.err) return alert(res.err);
            alert(res.msg);
        }
    }).catch((err)=> {
        console.error("로그인 중 에러 발생");
    });
}
