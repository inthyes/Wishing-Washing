<template>
    <div class="signupform">

        <div class="header">
            <img src="@/assets/ww_logo.png" />
        </div>
        
        <form @submit.prevent="submitForm">

            <input type="username" id="username" placeholder="사용자이름" v-model="username" required>

            <input type="email" id="email" placeholder="이메일" v-model="email" required>

            <input type="password" id="password" placeholder="비밀번호" v-model="password" required>

            <input type="password" id="confirmPassword" placeholder="비밀번호 확인" v-model="confirmPassword" required>

            <div class="submit_button">
                <button type="submit" class="btn btn-primary">가입하기</button>
            </div>

        </form>

    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    methods: {
        submitForm() {
            // Form submission logic
        }
    }
}
</script>

<style scoped>
.signupform {
    background-color: #e1dacd;
    position: flex;
    bottom: 0;
    width: 100%;
    height: calc(var(--vh, 1vh) * 100);
    overflow: auto;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    height: auto;
    bottom: 0;
    color: #000000;

}

input[type="username"],
input[type="email"],
input[type="password"],
input[type="confirmPassword"] {
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 300px;
}

.submit_button {
    padding-top: 30px;
    padding-bottom: 30px;
}

button[type="submit"] {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: #797a7b;
    color: #fff;
    cursor: pointer;
}

button[type="submit"]:hover {
    background-color: #473952;
}
</style>