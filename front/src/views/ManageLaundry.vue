<!--세탁소 관리-->
<!--서혜린-->

<template>
    <v-card class="mx-auto my-5" max-width="400" elevation="0">
        <v-container>
            <v-text-field v-model="laundryName" :rules="[rules.required]" 
                color="blue" label="세탁소명" placeholder="세탁소 이름을 입력해주세요" variant="underlined"></v-text-field><br>

            <v-text-field v-model="laundryAddr" :rules="[rules.required]" 
                color="blue" label="주소" placeholder="세탁소 주소를 입력해주세요" variant="underlined"></v-text-field><br>    

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

            <v-file-input v-model="image" :rules="[rules.required]"
                color="blue" label="세탁소 이미지" variant="outlined"></v-file-input>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#0C70FE" @click="addManageLaundrys">
                등록<v-icon icon="mdi-chevron-right" color="#0C70FE" end></v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            laundryName: null,
            laundryAddr: null,
            intro: null,
            openTime: null,
            closeTime: null,
            tel: null,
            notice: null,
            image: null,

            managelaundrys: [],
            rules: {
                required: value => !!value || '반드시 입력하세요',
                minRules: value => value.length >= 5 || '5자 이상 입력하세요',
                phoneNumber: value => /^\d{3}-\d{3,4}-\d{4}$/.test(value) || '유효한 전화번호 형식으로 입력하세요.',
            },
        }
    },
    methods: {
        async addManageLaundrys() {
            if (
            this.rules.required(this.laundryName) === true && 
            this.rules.required(this.laundryAddr) === true && 
            this.rules.minRules(this.intro) === true &&
            this.rules.required(this.openTime) === true && 
            this.rules.required(this.closeTime) === true &&
            this.rules.phoneNumber(this.tel) === true &&
            this.rules.required(this.notice) === true &&
            this.rules.required(this.image) === true
            )
            {
                // 새로운 세탁소 데이터 객체
                const newLaundry = {
                    laundryName: this.laundryName,
                    laundryAddr: this.laundryAddr,
                    intro: this.intro,
                    openTime: this.openTime,
                    closeTime: this.closeTime,
                    tel: this.tel,
                    notice: this.notice,
                };

                // 이미지 업로드를 위한 폼 데이터
                const formData = new FormData();
                formData.append('image', this.image);

                try {
                    // 이미지 업로드 요청
                    //const response = await axios.post('http://localhost:4000/upload', formData);
                    // 업로드된 이미지의 경로를 데이터 객체에 추가
                    //newLaundry.image = response.data.filePath;

                    await axios.post('http://localhost:3005/managelaundrys', newLaundry);
                    console.log('데이터가 성공적으로 추가되었습니다.');
                    this.showAlert("세탁소 정보가 등록되었습니다.");

                    // 입력 필드 초기화
                    this.laundryName = null;
                    this.laundryAddr = null;
                    this.intro = null;
                    this.openTime = null;
                    this.closeTime = null;
                    this.tel = null;
                    this.notice = null;
                    this.image = null;

                } catch (error) {
                    console.error('데이터 추가 오류:', error);
                }
            }
        },
        showAlert(message) {
            alert(message);
        },
    },
};
</script>