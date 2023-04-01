<template>
    <div id="nav" class="nav-show">
        <div class="nav-box">
            <router-link to="/">
                <div class="nav-box-circle nav-box-default">홈</div>
            </router-link>
        </div>
        <div class="nav-box">
            <router-link to="/landrylist">
                <div class="nav-box-circle nav-box-default">세탁신청</div>
            </router-link>
        </div>
        <div class="nav-box">
            <router-link to="/history">
                <div class="nav-box-circle nav-box-default">이용내역</div>
            </router-link>
        </div>
        <div class="nav-box">
            <router-link to="/mypage">
                <div class="nav-box-circle nav-box-default">MY</div>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
#nav {
    transition: all;
    width: 100%;
    height: 60px;
    position: fixed;
    border-top: 1px #838a92 solid;
    margin: 0 auto;
    z-index: 50;
    text-align: center;
    background-color: #ffffff;
}

.nav-show {
    bottom: 0;
    transition: all .3s linear;
}

.nav-hide {
    bottom: -70px;
    transition: all .3s linear;
}

.nav-box {
    width: 25%;
    float: left;
}

.nav-box div {
    width: 40px;
    height: 40px;
    margin: 10px;
    display: inline-block;
    line-height: 40px;

    cursor: pointer;
}

.nav-box div a {
    text-decoration: none;
    font-size: 1px;
}

.nav-box-default {
    transition: all .1s linear;
    background-color: rgba(0, 0, 0, 0);
    font-size: 10px;
}

.nav-box-selected {
    transition: all .1s linear;
    background-color: blue;
}

.nav-box-circle {
    color: rgb(0, 0, 0);
    font-weight: bold;
}

@media(max-width: 750px) {
    #nav {
        width: 100%;
    }
}
</style>
