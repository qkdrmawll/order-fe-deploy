<template>
    <v-app-bar app>
        네비게이션바
    </v-app-bar>
    <!-- v-container, v-row, v-col -->
     <v-container>
        <v-row>
            <v-col cols="8">
                HelloWorld1
            </v-col>
            <v-col cols="4">
                HelloWorld2
            </v-col>
        </v-row>
        <v-row>
            <!-- v-card -->
             <v-card>
                <!-- card-title, card-text -->
                 <v-card-title>
                    안내장
                 </v-card-title>
                 <v-card-text>
                    안녕하세요.
                 </v-card-text>
             </v-card>
        </v-row>
        <v-row>
            <v-simple-table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>에미일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>방은지</td><td>eunji8016</td>
                    </tr>
                    <tr>
                        <td>홍길동</td><td>hong12</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-row>
        <v-row>
            
        </v-row>
     </v-container>
     <v-card>
                <v-card-title>
                    회원가입 
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field label="email">
                        </v-text-field>
                        <v-text-field label="name">
                        </v-text-field>
                        <v-text-field label="password" type="password">
                            
                        </v-text-field>
                        <v-btn color="primary">제출</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
            <br><br>
            <v-btn @click.stop="cancel()">
                취소버튼
            </v-btn>
            <!-- 모달창을 위한 v-dialog -->
            <v-dialog v-model="dialog" max-width="400px">
                <v-card>
                    <v-card-title>
                        really?🥹
                    </v-card-title>
                    <v-card-actions>
                    <v-btn>yeees</v-btn>
                    <v-btn @click="dialog=false">nooooo</v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
            <v-btn href="/practice/modeling">일반라우팅</v-btn>
            <!-- single page application  -->
            <v-btn :to="{path: '/practice/modeling'}">SPA라우팅</v-btn>
            <v-btn :to="{name: 'ModelingComponent'}">SPA라우팅</v-btn>
</template>
<script>
export default{
    // 변수설정 : data() 함수를 통해 변수 세팅
    data(){
        return {
            dialog:false,
        }
    },
    methods: {
        cancel() {
            this.dialog = true;
        }
    }
};
</script>