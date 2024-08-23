<template>
    <v-container>
        <v-row class="d-flex justify-content-between mt-5">
            <v-col>
                <v-form @submit.prevent="searchProducts">
                    <v-row>
                        <v-col cols="auto">
                            <v-select v-model="searchType"
                            :items="searchOptions"
                            item-title="text"
                            item-value="value"
                            >
                            </v-select>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="searchValue">

                            </v-text-field>
                        </v-col>
                        <v-col cols="auto"><v-btn type="submit">검색</v-btn></v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-col cols="auto" v-if="!isAdmin">
                <v-btn @click="addCart" class="mr-2 moirai-one-regular">장바구니</v-btn>
                <v-btn @click="createOrder">주문</v-btn>
            </v-col>
            <v-col cols="auto" v-if="isAdmin">
                <v-btn href="/product/create" color="success">상품등록</v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-h5 text-center" style="font-family: 'Moirai One'">
                        {{ pageTitle }}
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr><th>제품사진</th><th>제품명</th><th>가격</th><th>재고수량</th><th v-if="!isAdmin">주문수량</th><th v-if="!isAdmin" class="text-center">주문선택</th><th v-if="isAdmin">Action</th><th></th></tr>
                            </thead>
                            <tbody>
                                <tr v-for="p in productList" :key="p.id">
                                <td><v-img :src="p.imagePath" style="height:100px; width:auto;"></v-img></td>
                                <td>{{p.name}}</td>
                                <td>{{p.price}}</td>
                                <td>{{p.stockQuantity}}</td>
                                <td v-if="!isAdmin">
                                    <v-text-field v-model.number="p.quantity" type="number" style="width: 60px;">
                                        
                                    </v-text-field>
                                </td>
                                <td class="text-center" v-if="!isAdmin">
                                    <input type="checkbox" v-model="selected[p.id]">
                                </td>
                                <td v-if="isAdmin"><v-btn @click="deleteProduct(p.id)">delete</v-btn></td></tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
  </template>
<script>
import axios from 'axios';
import {mapGetters} from 'vuex';
export default {
    props: ['isAdmin','pageTitle'],
    computed: {
        ...mapGetters(['getProductsInCart']),
    },
    data(){
        return{
            searchType: 'optional',
            searchOptions:[
                {text:"선택",value:'optional'},
                {text:"상품명",value:'name'},
                {text:"카테고리",value:'category'}
            ],
            searchValue: "",
            productList:[],
            pageSize: 5,
            currentPage:0,
            isLastPage: false,
            isLoading: false,
            // selected 예시
            // 1:true 1번 상품 선택됨
            // 2:false 2번 상품 선택안됨
            // 3:false
            // 4:true
            selected: {}
        }
    },
    created() {
        this.loadProduct();
        window.addEventListener('scroll',this.scrollPagination);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.scrollPagination);
    },
    methods: {
        searchProducts(){
            console.log("searchProducts");
            this.productList = [];
            this.currentPage = 0;
            this.isLastPage = false;
            this.isLoading = false;
            this.loadProduct();
        },
        deleteProduct(productId) {
            console.log(productId);
        },
        async loadProduct(){
            try {
                if(this.isLoading || this.isLastPage) return;
                this.isLoading = true;
                let params = {
                    size: this.pageSize,
                    page: this.currentPage
                }
                if(this.searchType =='name') {
                    params.name = this.searchValue;
                }else if(this.searchType =='category') {
                    params.category = this.searchValue;
                }
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/product/list`, {params});
                const additionalData = response.data.result.content.map(p=>({...p, quantity:0}));
                this.isLastPage = response.data.isLastPage;
                this.productList = [...this.productList, ...additionalData]
                this.currentPage++;
                console.log(response.data);
                this.isLoading = false;

            } catch (e) {
                console.log(e);
            }
        },
        scrollPagination() {
            // 현재 화면 + 스크롤로 이동한 화면 > 전체화면 -N 의 조건이 성립되면 추가 데이터 로드
            const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight -100;
            if(isBottom && !this.isLastPage && !this.isLoading) {
                this.loadProduct();
            }
        },
        async createOrder() {
            // Object.keys(this.selected) 객체에서 키값만 뽑아내기
            const orderProducts = Object.keys(this.selected).filter(key=>this.selected[key]).map(key=>{
                const product = this.productList.find(p=>p.id==key)
                return {productId:product.id,productCount:product.quantity};
            })
            console.log(orderProducts);
            if(orderProducts.length<1){
                alert("주문 대상 물건이 없습니다.");
            }
            const yesOrNo = confirm(`${orderProducts.length}개의 상품을 주문하시겠습니까?`);
            if(!yesOrNo) {
                console.log("주문이 취소되었습니다.");
                return;
            }
            try {
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order/create`, orderProducts);
                alert("주문완료");
                window.location.reload();
            } catch (error) {
                console.log(error);
                alert("주문실패");
            }
        },
        addCart(){
            const orderProducts = Object.keys(this.selected).filter(key=>this.selected[key]).map(key=>{
                const product = this.productList.find(p=>p.id==key)
                return {id:product.id, name:product.name, quantity:product.quantity};
            });
            console.log(orderProducts);
            orderProducts.forEach(p => this.$store.dispatch('addCart',p));
            console.log(this.getProductsInCart)
            // window.location.reload();

        }
    }
};
</script>
<style>

</style>
