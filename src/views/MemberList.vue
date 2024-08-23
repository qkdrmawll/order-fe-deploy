<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5" style="font-family: Moirai One;">
                        회원 목록
                    </v-card-title>
                    <v-card-text>
                        <v-data-table :headers="tableHeaders" :items="memberList">

                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            tableHeaders:[
                {title:"ID", key:'id', align:'center'},
                {title:'name',key:'name', align:'center'},
                {title:'email',key:'email', align:'center'},
                {title:'orderCount',key:'orderCount', align:'center'}],
            memberList:[]
        }
    },
    async created() {
        // const token = localStorage.getItem('token');
        // const headers = {Authorization : `Bearer ${token}`};
        // {"header" : {"Authorization" : "Bearer 토큰 값 "}}
        try {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/list`);
            this.memberList = response.data.result.content;
        } catch (error) {
            console.log(error);
        }
    }
};
</script>
