"use strict";

const id = document.querySelector("#id"), 
psword = document.querySelector("#psword"),
loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", showDetail);

function showDetail() {
    const req = {
        id: id.value,
        psword: psword.value,
    };

    fetch("/laundry", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req), 
    })
    .then((res)=> res.json())
    .then((res) => {
        if(res.success) {
            //ejs 페이지 보여줘야하는데....
        } else {
            if (res.err) return alert(res.err);
            alert(res.msg);
        }
    }).catch((err)=> {
        console.error("에러");
    });
}
