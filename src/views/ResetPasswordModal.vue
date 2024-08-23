<template>
    <v-dialog max-width="500px">
    <v-card>
        <v-card-title class="text-h5 text-center">
            비밀번호 변경
        </v-card-title>
        <v-card-text>
            <v-form @submit.prevent="resetPassword">
                <v-text-field label="email" type="email" v-model="email" prepend-icon="mdi-email" required></v-text-field>
                <v-text-field label="original password" type="password" v-model="asIsPassword" prepend-icon="mdi-lock" required></v-text-field>
                <v-text-field label="new password" type="password" v-model="toBePassword" prepend-icon="mdi-lock" required></v-text-field>
                <v-btn @click="closeModal" block>닫기</v-btn>
                <v-btn type="submit" block>비밀번호 재설정</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</v-dialog>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email:"",
            asIsPassword:"",
            toBePassword:""
        }
    },methods: {
        async resetPassword() {
            try {
                const resetData = {
                email:this.email,
                asIsPassword:this.asIsPassword,
                toBePassword:this.toBePassword
                }
                const response = await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/member/reset-password`,resetData);
                alert(response);
            } catch (e) {
                alert(e.response?.data?.error_message);
            }
            
        },
        closeModal() {
            // this.emit은 vue에서 컴포넌트간의 이벤트를 전달하는 메커니즘
            // 자식 컴포넌트에서 this.$emit를 호춯하면 update:dialog하는 이벤트가 실행되고, 
            this.$emit('update:dialog', false);
        }
        
    }
}
</script>