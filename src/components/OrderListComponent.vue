<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5" style="font-family: Moirai One;">
                        주문 목록
                    </v-card-title>
                    <v-card-text>
                        <v-data-table :headers="tableHeaders" :items="orderList" class="elevation-1" show-expand>
                            <template v-slot:[`item.orderStatus`]="{ item }">
                                <span :class="{ 'text-red': item.orderStatus === 'CANCELD' }">{{ item.orderStatus }}</span>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-btn v-if="isAdmin &&item.orderStatus == 'ORDERED'" @click.stop="cancelOrder(item.id)" size=small>CANCEL</v-btn>
                            </template>
                            <template v-slot:expanded-row="{item}">
                                <v-row>
                                    <v-col>
                                        <v-list-item v-for="orderItem in item.orderDetailDtos" :key="orderItem.id">
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    {{ orderItem.productName }} {{ orderItem.count }}개
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-col>
                                </v-row>
                            </template>
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
    props: ['isAdmin'],
    data() {
        return {
            tableHeaders:[
                {title:"ID", key:'id', align:'center'},
                {title:'회원',key:'memberEmail', align:'center'},
                {title:'주문 상태',key:'orderStatus', align:'center'},
                {title:'ACTION',key:'actions', align:'center'}
            ],
            orderList:[]
        }
    },
    async created() {
     
            if(this.isAdmin) {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/order/list`);
                this.orderList = response.data;
            }else {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/order/myorders`);
                this.orderList = response.data.result.content;
            }   
 
    },
    methods: {
        async cancelOrder(id){
            try {
            const response = await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/order/${id}/cancel`);
            console.log(response.data);
            window.location.reload();
            } catch (error) {
            console.log(error);
            }
        }
    },
}
</script>
<style lang="">
    
</style>