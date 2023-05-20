<!--프로필 편집-->
<template>
    <v-card class="mx-auto my-5" max-width="400" title="프로필편집" elevation="0">
      <!-- <v-card-actions>
      </v-card-actions> -->
      <v-form>
        <br>
        <div class="mb-5">
                <label for="formFile" class="form-label">사진을 올려주세요</label>
                <input class="form-control mb-2" type="file" id="edit.image" @change="handleImageUpload" accept="image/*" />
                <div class="photo-container" :class="{ 'no-image': !selectedPhoto }" >
                    <v-img :src="selectedPhoto" alt="Selected Photo"
                        v-if="selectedPhoto" />
                    <div v-else>No Image</div>
                </div></div>
        <v-text-field v-model="edit.userId" label="아이디" readonly></v-text-field>
        <v-text-field v-model="edit.name" label="이름" readonly></v-text-field>
        <v-text-field v-model="edit.mail" :rules="[rules.emailRules]" label="이메일"></v-text-field>
              
        <v-text-field v-model="edit.phone" :rules="[rules.phoneRules]" label="연락처"></v-text-field>
        <!-- <button @click="goToEditPassword">비밀번호 변경</button> -->
        <!-- <div style="color: gray;">프로필 사진 편집</div>
        <div>
        <input multiple @change="onInputImage" ref="surveyImage" type="file">
        </div> -->
        <!-- <v-text-field v-model="edit.newPassword" label="새 비밀번호"></v-text-field>
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
        userId: '', //아이디
        name: '', //이름
        mail: '',
        phone: '', //전화번호
        image : null,
      },
      
      selectedPhoto: null,
      rules: {
        // 회원가입 유효성 검사
        required: value => !!value || '반드시 입력하세요',
        phoneRules: value => {
          const pattern = /^(\+)?([0-9]{3})?[-]?([0-9]{4})?[-]?([0-9]{4,})$/
          return pattern.test(value) || '번호를 정확히 입력하세요'
        },
        emailRules: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || '이메일 형식으로 입력하세요'
        },
      },
    }
  },
  async created() {

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const isValidToken = await this.verifyToken(token);
        if (isValidToken) {
          const res = await axios.get(`http://localhost:3000/edit`);
          console.log(res);
          console.log(res.data);

          if 
          (res.data && res.data.message === 'success') {
            this.edit.userId = res.data.userId;
            console.log(this.edit.userId);
            this.fetcheditprofileData();
            
          }
        } 
        else {
            this.fetcheditprofileData();
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      this.redirectToLogin();
    }
  },
  methods: {
    handleImageUpload(event){
            const file = event.target.files[0];
            this.edit.image = file;
            const reader = new FileReader();

            reader.onload = (e) => {
                this.selectedPhoto = e.target.result;
                
            };

            reader.readAsDataURL(file);
        },
    async save() {
      const newEdit = {
        userId: this.edit.userId,
        name: this.edit.name,
        mail: this.edit.mail,
        phone: this.edit.phone,
        image: await this.edit.image,
      };

      axios.post('http://localhost:3000/edit', {
            userId: newEdit.userId,
            name : newEdit.name,
            mail: newEdit.mail,
            phone: newEdit.phone,
            
        })
        .then(() => {
          this.edit.userId = '';
          this.edit.name = '';
          this.edit.mail = '';
          this.edit.phone = '';
          this.$router.push('/mypage');
        })
        .then(() => {
          if (newEdit.image) {
            const formData = new FormData();
                formData.append('image', newEdit.image);
                
                axios
                    .post('http://localhost:3000/upload/profile', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then(() => {
                        console.log('이미지 업로드 완료');
                    })
                    .catch((error) => {
                        console.error('이미지 업로드 실패:', error);
                    });
          }
          this.$router.push('/MyPage2');
            })
        

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

        // console.log(res.data.U_ID);
        this.edit.userId = res.data.U_ID;
        this.edit.name = res.data.U_NAME;

        console.log("ID:", tokenPayload.id);
        console.log("Token Payload:", tokenPayload);
      } catch (error) {
        console.error(error);
        throw new Error("editprofile 데이터 가져오기 실패");
      }
    },
    // redirectToLogin() {
    //     this.$router.push("/login");
    //     },

  }
}
</script>