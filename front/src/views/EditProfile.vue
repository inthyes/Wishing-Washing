<!--프로필 편집-->

<template>
    <v-card class="mx-auto my-5" max-width="400" title="프로필편집" elevation="0">
        <v-card-actions>
        </v-card-actions>

        <div style="color: gray;">프로필 사진 편집</div>
        <br>
        <div>
            <input multiple @change="onInputImage" ref="surveyImage" type="file">
        </div>
        <br>

        <v-form>
            <v-text-field v-model="edit.userId" label="아이디" readonly></v-text-field>
            <v-text-field v-model="edit.name" label="이름"></v-text-field>
            <v-text-field v-model="edit.mail" label="이메일"></v-text-field>
            
            <v-text-field v-model="edit.phone" label="연락처"></v-text-field>
            <!-- <v-text-field v-model="edit.password" label="현재 비밀번호"></v-text-field>
            <v-text-field v-model="edit.newPassword" label="새 비밀번호"></v-text-field>
            <v-text-field v-model="edit.newPasswordConfirm" label="새 비밀번호 확인"></v-text-field> -->
            <v-btn type="button" color="primary" @click="save">저장</v-btn>
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
                // id: null,
                userId: '',//아이디
                name: '',//이름
                // mail: '',
                phone: '',//전화번호
                password: '',//비밀번호
                newPassword: '',
                newPasswordConfirm: '',
            },
        }
    },
    async created() {

        // const token = localStorage.getItem("token");

        //     if (token) {
        //     this.verifyToken(token)
        //         .then((isValidToken) => {
        //             this.fetcheditprofileData();
        //             console.log(isValidToken);
        //         })
        //         .catch((error) => {
        //         console.error(error);
        //         this.redirectToLogin();
        //         });
        //     } else {
        //     this.redirectToLogin();
        //     }

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
        async save() {
            const newEdit = {
                userId : this.edit.userId,
                name : this.edit.name,
                phone : this.edit.phone,
                password : this.edit.password,
                newPassword : this.edit.newPassword,
                newPasswordConfirm : this.edit.newPasswordConfirm
            };

            axios.post('http://localhost:3000/edit', newEdit)
                .then(() => {
                    this.edit.userId = '';
                    this.edit.name = '';
                    this.edit.phone = '';
                    this.edit.password = '';
                    this.edit.newPassword = '';
                    this.edit.newPasswordConfirm = '';
                    this.$router.push('/mypage');
                })
                .catch(error => {
                    console.error(error);
                });
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
                throw new Error("usagehistory 데이터 가져오기 실패");
            }
        },
    }
}
</script>