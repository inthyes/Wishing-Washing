<!--세탁소 관리-->
<!--서혜린-->

<template>
<v-form @submit.prevent="editManageLaundrys">

    <v-card class="mx-auto my-5" max-width="400" elevation="0">
        
            <v-container><br>
                <v-text-field v-model="laundryName" :rules="[rules.required]" 
                    color="blue" label="세탁소명" placeholder="세탁소 이름을 입력해주세요" variant="underlined"></v-text-field><br>

                <v-text-field v-model="laundryAddr1" :rules="[rules.required]" 
                    color="blue" label="우편번호" placeholder="우편번호를 입력해주세요" variant="underlined"></v-text-field><br>    

                <v-text-field v-model="laundryAddr2" :rules="[rules.required]" 
                    color="blue" label="주소" placeholder="세탁소 주소를 입력해주세요" variant="underlined"></v-text-field><br>    
                
                <v-text-field v-model="laundryAddr3" :rules="[rules.required]" 
                    color="blue" label="상세 주소" placeholder="세탁소 상세 주소를 입력해주세요" variant="underlined"></v-text-field><br>    

                <v-text-field v-model="intro" :rules="[rules.minRules]" 
                    color="blue" label="소개글" placeholder="세탁소 소개글을 작성해주세요" variant="underlined"></v-text-field><br>

                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model="openTime" :rules="[rules.required]"
                        color="blue" label="오픈 시간" type="time" variant="solo"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="closeTime" :rules="[rules.required]"
                        color="blue" label="마감 시간" type="time" variant="solo"></v-text-field>
                  </v-col>
                </v-row><br>

                <v-text-field v-model="tel" :rules="[rules.phoneNumber]" 
                    color="blue" label="전화번호 (000-0000-0000)" placeholder="세탁소 전화번호를 작성해주세요" variant="underlined"></v-text-field><br>

                <v-text-field v-model="notice" :rules="[rules.required]" 
                    color="blue" label="공지사항" placeholder="공지사항을 작성해주세요" variant="underlined"></v-text-field><br>


                <div class="mb-5">
                <label for="image" class="form-label">사진을 올려주세요</label>
                <input class="form-control mb-2" type="file" id="image" @change="handleImageUpload" accept="image/*" />

                
                <div class="photo-container" :class="{ 'no-image': !selectedPhoto }" >
                    <v-img :src="selectedPhoto" alt="Selected Photo"
                        v-if="selectedPhoto" />
                    <div v-else>No Image</div>
                </div></div>
            </v-container>

            <v-divider></v-divider>

            <v-card-actions style="margin-top: 5px; margin-right: 10px">
                <v-spacer></v-spacer>
                <v-btn color="#0C70FE" type="submit" style="background-color: #e1ecfe;" @click="editManageLaundrys">수정</v-btn>

            </v-card-actions>
       
    </v-card>
    </v-form>
</template>

<script>
import axios from 'axios';
//import jwt_decode from 'jwt-decode';


export default {
    data() {
        return {
            tab: null,
            laundryName: null,
            laundryAddr1: null,
            laundryAddr2: null,
            laundryAddr3: null,
            intro: null,
            openTime: null,
            closeTime: null,
            tel: null,
            notice: null,
            selectedPhoto: null,
            edit : {
                image : null
            },

            managelaundrys: [],
            rules: {
                required: value => !!value || '반드시 입력하세요',
                minRules: value => (value && value.length >= 5) || '5자 이상 입력하세요',
                phoneNumber: value => /^\d{2,3}-\d{3,4}-\d{4}$/.test(value) || '유효한 전화번호 형식으로 입력하세요.',
            },
        }
    },
    async created() {
       
        try {
                const response = await axios.get(`http://localhost:4000/laundry/laundryAdmin`);
                console.log(response)
                const laundryData = response.data[0];

                // 세탁소 정보를 받아와서 폼에 할당
                this.laundryName = laundryData.S_NAME;
                this.laundryAddr1 = laundryData.S_ADDR1;
                this.laundryAddr2 = laundryData.S_ADDR2;
                this.laundryAddr3 = laundryData.S_ADDR3;
                this.intro = laundryData.S_COMMENT;
                this.openTime = laundryData.S_OPENING;
                this.closeTime = laundryData.S_CLOSING;
                this.tel = laundryData.S_PHONE;
                this.notice = laundryData.S_ANNOUNCE;
            } catch (error) {
                console.error('데이터 할당 오류:', error);
            }
        },
    
    methods: {
        
        handleImageUpload(event) {
            const file = event.target.files[0];
            this.edit.image = file;
            console.log(this.edit.image);
            const reader = new FileReader();

            reader.onload = (e) => {
                this.selectedPhoto = e.target.result;
            };

            reader.readAsDataURL(file);
        },
       
        
        async editManageLaundrys() {
            
                // 새로운 세탁소 데이터 객체
                const newLaundry = {
                    
                    laundryName: this.laundryName,
                    laundryAddr1: this.laundryAddr1,
                    laundryAddr2: this.laundryAddr2,
                    laundryAddr3: this.laundryAddr3,
                    intro: this.intro,
                    openTime: this.openTime,
                    closeTime: this.closeTime,
                    tel: this.tel,
                    notice: this.notice,
                    image: this.edit.image ? this.edit.image : null,

                    
                };

                axios.post('http://localhost:4000/laundry/edit', 
                        { 
                        S_NAME: newLaundry.laundryName,
                        S_PHONE: newLaundry.tel,
                        S_ADDR1: newLaundry.laundryAddr1,
                        S_ADDR2: newLaundry.laundryAddr2,
                        S_ADDR3: newLaundry.laundryAddr3,
                        S_OPENING: newLaundry.openTime,
                        S_CLOSING: newLaundry.closeTime,
                        S_COMMENT: newLaundry.intro,
                        S_ANNOUNCE: newLaundry.notice,
                })
                .then(() => {
                    
                    
                if (newLaundry.image) {
                    
                    const formData = new FormData();
                    formData.append('image', newLaundry.image);

                axios.post("http://localhost:4000/upload/laundryImg", formData, {
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
            })
            .then(() => {
                console.log('데이터가 성공적으로 추가되었습니다.');
                
                this.$router.push('/');
             })
            .catch((error) => {
            console.error('업로드 실패:', error);
        });
        },
        
    },
};
</script>