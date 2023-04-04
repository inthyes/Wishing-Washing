<template>

    <div class="loginform">
        <div class="header">
            <img src="@/assets/ww_logo.png" />
        </div>
        <form @submit.prevent="submitForm">

            <input type="email" id="email" placeholder="이메일" v-model="email" required>

            <input type="password" id="password" placeholder="비밀번호" v-model="password" required>

            <div class="login_button">
                <button type="submit">로그인</button>
            </div>

            <!--<base-checkbox class="mb-3" v-model="checkboxes.unchecked">
                Unchecked
            </base-checkbox>-->
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="autoSizingCheck">
                <label class="form-check-label" for="autoSizingCheck">
                    Remember me
                </label>
            </div>
        </form>

    </div>
</template>

<script>
//import MaterialInput from "@/components/MaterialInput.vue";
export default {
    data() {
        return {
            email: '',
            password: '',
            checkboxes: {
                unchecked: false
            }
        }
    },
    methods: {
        submitForm() {
            // send email and password to server to verify user
            // if successful, redirect to dashboard
            // if unsuccessful, display error message to user
        }
    }
}
</script>

<style scoped>
.loginform {
    background-color: #e1dacd;
    position:flex;
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
    /*border: 1px solid #ffffff;
    border-radius: 5px;
    /*box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);*/
    /*background-color: #3e4372;*/
    height: auto;
    bottom: 0;
    color: #000000;
}

.login_button {
    padding-top: 30px;
    padding-bottom: 30px;
}

input[type="email"],
input[type="password"] {
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 300px;
}

button[type="submit"] {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: #72767a;
    color: #fff;
    cursor: pointer;
}

button[type="submit"]:hover {
    background-color: #3b3143;
}

.error {
    color: red;
    margin-top: 1rem;
}
</style>

