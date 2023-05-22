<template>
    <div>
        <v-card elevation="0">
            <router-link to="editmanagerprofile"> 
                <v-img src="@/assets/images/profile.png" height="160" width="160" class="round-profile-picture"></v-img>
                <v-icon class="icon-overlay">mdi-account-edit</v-icon>
            </router-link>
            
            <v-card-text v-for="manager in managers" :key="manager.id">
                <v-row>
                    <v-col class="mt-7">
                        <p id="name">{{ manager.managerName }} 사장님, 안녕하세요!</p>
                        <p id="email">{{ manager.managerEmail }}</p>
                        <p id="phone">{{ manager.managerPhone }}</p>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data: () => ({
        show: false,
        managers: [],
    }),
    async created() {
        try {
            const res = await axios.get('http://localhost:5001/managers');
            this.managers = res.data.filter((laundry) => laundry.id === 1);
        } catch (e) {
            console.error(e);
        }
    },
    async logout() {
      try {
        const response = await axios.post('http://localhost:4000/logout', null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = response.data;
        console.log(data);
        alert(data.message);

        localStorage.removeItem("token");

        this.$router.push('/login');
      } catch (error) {
        console.log(error);
        alert('로그아웃 실패');
      }
    }
}
</script>

<style scoped>
.round-profile-picture {
    border-radius: 50%;
    margin: auto;
}
p {
    margin: 0;
}
#email, #phone {
    padding-block: 6px;
    font-size: 18px;
}
#name {
    padding-block: 10px;
    font-size: 20px;
    font-weight: 800;
}
.icon-overlay {
    border-radius: 25%;
    position: absolute;
    top: 39%;
    left: 60%;
    /* transform: translate(110%, 110%); */
    background-color: rgba(0, 0, 0, 0.436);
    color: white;
    font-size: 30px;
}
</style>