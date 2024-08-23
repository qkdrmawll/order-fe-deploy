<template>
    <!-- props를 컴포넌트를 전달함으로서 컴포넌트 화면내에서 분기처리 -->
    <ProductListComponent 
    :isAdmin="true"
    pageTitle="상품 관리"/>
  </template>
  <script>
  import ProductListComponent from '@/components/ProductListComponent.vue';
  export default {
    components:{
      ProductListComponent
  }
  };
  </script>
  