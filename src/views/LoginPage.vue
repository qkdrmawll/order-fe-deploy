<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="6" md="6">
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        로그인
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="doLogin">
                            <v-text-field label="email" type="email" v-model="email" prepend-icon="mdi-email" required></v-text-field>
                            <v-text-field label="password" type="password" v-model="password" prepend-icon="mdi-lock" required></v-text-field>
                            <v-row>
                                <v-col cols="6">
                                    <v-btn @click="showPasswordModal" block>비밀번호 변경</v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <v-btn type="submit" color="primary" block>로그인</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- resetPassword가 true가 될때 해당 모달이 보여짐 -->
         <!-- modal 캄포넌트가 pdate:dialog 라는 이벤트를 발생시킬 때 실핼될 이벤트 핸들러를 정으ㅣ-->
          <!-- $event는 자식 요소로부터 전달 된 값 true false가 전달  -->
        <ResetPasswordModal v-model="resetPassword" @update:dialog="resetPassword = $event">
            
        </ResetPasswordModal>


    </v-container>
    </template>
    <script>
    import axios from 'axios';
    import {jwtDecode} from 'jwt-decode';
    import ResetPasswordModal from './ResetPasswordModal.vue'

    export default {
        components:{
            ResetPasswordModal
        },
        data() {
            return {
                email:"",
                password:"",
                resetPassword:false
            }
        },methods: {
            async doLogin(){
                try{
                    const loginData = {
                        email:this.email,
                        password:this.password
                    }
                    const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/doLogin`,loginData);
                    const token = response.data.result.token;
                    const refreshToken = response.data.result.refreshToken;
                    console.log(jwtDecode(token));
                    const role = jwtDecode(token).role;
                    console.log(token);
                    localStorage.setItem('token',token);
                    localStorage.setItem('refreshToken',refreshToken);
                    localStorage.setItem('role',role);
                    
                    // this.$router.push("/");
                    window.location.href='/';
                    
                }catch (e) {
                    console.log(e)
                }   
            },
        showPasswordModal() {
            this.resetPassword=true;
        }
        }
    }
    </script>