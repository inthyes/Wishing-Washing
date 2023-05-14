<!--세탁소 관리-->
<!--서혜린-->

<template>
    <v-card class="mx-auto my-5" max-width="400" elevation="0">
        <v-tabs v-model="tab" stacked grow>
                    <v-tab value="add" @click="clickAddTab()">세탁소 등록</v-tab>
                    <v-tab value="edit" @click="clickEditTab()">세탁소 수정</v-tab>
        </v-tabs>

        <div v-if="tab === 'add'">
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

                <v-file-input v-model="image" @change="handleFileUpload" :rules="[rules.required]"
                    color="blue" label="세탁소 이미지" variant="outlined"></v-file-input>
            </v-container>

            <v-divider></v-divider>

            <v-img :src="uploadedImagePath" alt="Uploaded Image"></v-img>

            <v-card-actions style="margin-top:5px; margin-right: 10px">
                <v-spacer></v-spacer>
                <v-btn color="#0C70FE" @click="addManageLaundrys()" style="background-color: #e1ecfe;">등록</v-btn>
            </v-card-actions>
        </div>

        <div v-if="tab === 'edit'">
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

            <v-card-actions style="margin-top: 5px; margin-right: 10px">
                <v-spacer></v-spacer>
                <v-btn color="#0C70FE" @click="editManageLaundrys()" style="background-color: #e1ecfe;">수정</v-btn>
            </v-card-actions>
        </div>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            tab: null,
            laundryName: null,
            laundryAddr: null,
            intro: null,
            openTime: null,
            closeTime: null,
            tel: null,
            notice: null,
            image: null,
            selectedImage: null,
            uploadedImagePath: null, //

            managelaundrys: [],
            rules: {
                required: value => !!value || '반드시 입력하세요',
                minRules: value => value.length >= 5 || '5자 이상 입력하세요',
                phoneNumber: value => /^\d{2,3}-\d{3,4}-\d{4}$/.test(value) || '유효한 전화번호 형식으로 입력하세요.',
            },
        }
    },
    methods: {
        handleFileUpload(event) {
            this.selectedImage = event.target.files[0];
        },
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

                // 이미지 업로드
                const formData = new FormData();
                formData.append('image', this.selectedImage);
                axios.post('http://localhost:2000/upload', formData)
                    .then(response => {
                        console.log('Image uploaded successfully');
                        console.log('업로드된 이미지 경로:', response.data.imagePath);
                        this.uploadedImagePath = response.data.imagePath; // 업로드된 이미지 경로 저장
                    })
                    .catch(error => {
                        console.error('Error uploading image', error);
                    });

                try {
                    // 폼 데이터 업로드
                    const response = await axios.post('http://localhost:5001/managelaundrys', newLaundry);
                    const createdLaundryId = response.data.id; // 생성된 아이디를 저장
                    console.log('데이터가 성공적으로 추가되었습니다.');
                    this.showAlert('세탁소 정보가 등록되었습니다.');
                    console.log('생성된 세탁소 아이디:', createdLaundryId);

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
        async clickAddTab() {
            try {
                this.laundryName = null;
                this.laundryAddr = null;
                this.intro = null;
                this.openTime = null;
                this.closeTime = null;
                this.tel = null;
                this.notice = null;
                this.image = null;
            } catch (error) {
                console.error(error);
            }
        },
        async clickEditTab() {
            try {
                const response = await axios.get(`http://localhost:5001/managelaundrys/1`);
                const laundryData = response.data;

                // 세탁소 정보를 받아와서 폼에 할당
                this.laundryName = laundryData.laundryName;
                this.laundryAddr = laundryData.laundryAddr;
                this.intro = laundryData.intro;
                this.openTime = laundryData.openTime;
                this.closeTime = laundryData.closeTime;
                this.tel = laundryData.tel;
                this.notice = laundryData.notice;
            } catch (error) {
                console.error('데이터 할당 오류:', error);
            }
        },
        async editManageLaundrys() {
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

                try {
                    await axios.put('http://localhost:5001/managelaundrys/1', newLaundry);
                    console.log('데이터가 성공적으로 추가되었습니다.');
                    this.showAlert('세탁소 정보가 수정되었습니다.');
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