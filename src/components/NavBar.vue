
<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Wishing Washing</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="routerlink" href="/login">로그인</a>
                    </li>
                    <li class="nav-item">
                        <a class="routerlink" href="/signup">회원가입</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    mounted() {
        document.querySelector('#navbarContent').addEventListener('hidden.bs.collapse', function () {
            console.log("hidden.bs.collapse");
        });
    }

}

</script>

<style>
.navbar navbar-expand-lg navbar-light bg-light {
    position: sticky;
}

.routerlink {
    text-decoration: none;
    color: #000000;
}

li {
    margin: 10px;
}
</style>
