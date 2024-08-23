<template>
    <!-- 문자열로 넘길 경우에는 변수명=, 그외는 :변수명= -->
    <ProductListComponent 
    :isAdmin="false"
    pageTitle="상품 목록"/>
</template>
<script>
import ProductListComponent from '@/components/ProductListComponent.vue';
export default {
  components:{
    ProductListComponent
}
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Moirai+One&family=Oswald:wght@200..700&display=swap');
* {
    font-family: 'Moirai One', system-ui;
    font-weight: bolder;
}
</style>