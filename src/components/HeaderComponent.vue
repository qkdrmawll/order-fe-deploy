<template>
  <v-app-bar app dark>
    <v-container>
        <v-row>
                <v-col class="d-flex justify-start">
                    <div v-if="userRole === 'ADMIN'">
                    <v-btn :to="{path:'/member/list'}">회원관리</v-btn>
                    <v-btn :to="{path:'/product/manage'}">상품관리</v-btn>
                    <v-btn href='/order/list'>실시간주문 ({{ liveQuantuty }})</v-btn>
                    </div>
                </v-col>
            
            <v-col class="text-center">
                <v-btn :to="{path:'/'}" class="index">🍬potate shop🍬</v-btn>
            </v-col>
            <v-col class="d-flex justify-end">
                <v-btn v-if="isLogin" :to="{path:'/order/cart'}">장바구니 ({{getTotalQuantity}})</v-btn>
                <v-btn :to="{path:'/product/list'}">상품목록</v-btn>
                <v-btn v-if="isLogin" :to="{path:'/mypage'}">MyPage</v-btn>
                <v-btn v-if="!isLogin" :to="{path:'/member/create'}">회원가입</v-btn>
                <v-btn v-if="!isLogin" :to="{path:'/login'}">로그인</v-btn>
                <v-btn v-if="isLogin" @click="doLogout">로그아웃</v-btn>
            </v-col>
        </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import {mapGetters} from 'vuex';
// 서버와 실시간 알림서비스를 위한 의존성 추가 필요
import {EventSourcePolyfill} from 'event-source-polyfill';
export default {
    
    data() {
        return {
            userRole: null,
            isLogin: false,
            liveQuantuty:0 // 실시간 주문 개수
        }
    },
    computed: {
        ...mapGetters(['getTotalQuantity']),
    },
    created(){
        const token = localStorage.getItem("token");
        if (token) {
            this.isLogin = true;
            this.userRole = localStorage.getItem("role");
        }

        if(this.userRole==='ADMIN') {
            let sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASE_URL}/subscribe`,{headers:{Authorization: `Bearer ${token}`}});
            sse.addEventListener('connect',(event)=>{console.log(event.data)});
            sse.addEventListener('ordered',(event)=>{
                console.log(event.data);
                this.liveQuantuty ++;
            });

            sse.onerror = (error)=>{
                console.log(error);
                sse.close();
            }
        }

    }
    ,methods : {
        doLogout(){
            localStorage.clear();
            window.location.reload();
        }
    }
}
</script>
<style>
.index {
    color: pink;
    font-size: 20px;
}
</style>