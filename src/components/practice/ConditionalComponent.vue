<template>
    <div v-if="isLogined">
        welcome
    </div>
    <div v-else>
        Login please
    </div>
    <button @click=login()>login</button>

    <h1>product list</h1>
    <ul>
        <!-- v-for에서는 반드시 키값지정. 각 요소마다 고유식별 -->
        <li v-for="product in products" :key="product.id">{{product.name}}</li>
    </ul>

</template>
<script>
export default{
    data() {
        return{
            isLogined:false,
            products:[
                {id:1,name:"apple"},
                {id:2,name:"banana"},
                {id:3,name:"mango"}
            ]
        }
    },
    methods : {
        login() {
            this.isLogined=true;
        }
    }
}
</script>