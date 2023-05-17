<template>
    <v-card class="mx-auto my-5" max-width="400" title="vmf" elevation="0">
        <v-card-actions>
        </v-card-actions>

        <div style="color: gray;">프로필 사진 편집</div>
        <br>
        <div>
            <!-- <input multiple @change="onInputImage" ref="surveyImage" type="file"> -->
        </div>
        <br>

        <v-form>
            <v-text-field v-model="edit.password" label="현재 비밀번호"></v-text-field>
            <v-btn type="button" color="primary" @click="submit">확인</v-btn>
        </v-form>
    </v-card>
</template>


<script>
import axios from 'axios';
// const baseURL = "http://localhost:3000/myPage/profileEdit";
import jwt_decode from 'jwt-decode';

/* eslint-disable */

export default {
    data() {
        return {
            edit: {
                // phone: '',//전화번호
                password: '',//비밀번호
                // newPassword: '',
                // newPasswordConfirm: '',
            },
        }
    },
    async created() {

            try {
                const res = await axios.get(`http://localhost:3000/edit`)
                console.log(res);
                console.log(res.data);
                //     // this.edit.userId = res.data[0].userId;
                //     this.edit.userId = res.data[0].userId;

                //     console.log(this.edit.userId);
                // this.fetcheditprofileData();

                if (res.data && res.data.message === 'success') {
                 
                        this.edit.userId = res.data.userId;
                        console.log(this.edit.userId);
                        this.fetcheditprofileData();
                  
                        console.log("메롱~");
                    }
            } catch (e) {
                console.error(e);
            }
    },

    methods: {
        async submit() {

            const newEdit = {
                password : this.edit.password
            }
            
            try {
                const response = await axios.post('http://localhost:3000/edit', newEdit);
                const data = response.data;

                console.log("Asdf");
                if (data && data.message === 'success') {
                // 비밀번호가 올바른 경우에만 다음 페이지로 이동
                this.$router.push('/mypage');
                } else {
                // 비밀번호가 올바르지 않은 경우 처리 (예: 에러 메시지 표시)
                console.error('비밀번호가 올바르지 않습니다.');
                // this.$router.push('/mypage');
                }

                this.edit.password = '';
            } catch (error) {
                console.error(error);
            }
        },
        async verifyToken(token) {
            try {
                const response = await axios.post(
                "http://localhost:3000/verify-token",
                { token }
                );
                const data = response.data;
                console.log(data);
                return data.isValid;
            } catch (error) {
                throw new Error("토큰 검증 실패");
            }
        },
        async fetcheditprofileData() {
            try {
                const res = await axios.get("http://localhost:3000/edit");
                this.editprofileData = res.data;
                const token = localStorage.getItem("token");
                const tokenPayload = jwt_decode(token);


                // this.edit.userId = res.data.userId; // Assign the user ID
                // this.edit.name = res.data.name; // Assign the user's name from the response data

                console.log("ID:", tokenPayload.id);
                // console.log("ID:", this.edit.userId);
                // console.log("name:", this.edit.name);
                console.log("Token Payload:", tokenPayload);

        
            } catch (error) {
                console.error(error);
                throw new Error("password 데이터 확인 실패");
            }
        },
        // goToEditPassword() {
        // this.$router.push('/EditPassword' )
        // }
    }
}
</script>