<template>
<h1>화면 라우팅 테스트</h1>
<div>
    <button @click="spaMove1">move to modeling page (url)</button>    
</div>

<div>
    <button @click="spaMove2">move to modeling page (name)</button>
</div>
<div>
    <button @click="hrefMove">move to modeling page (href)</button>
</div>

<div>
    <button @click="reloadPage">reload current page</button>
</div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        spaMove1(){
            this.$router.push("/practice/modeling");
        },
        spaMove2(){
            this.$router.push({name:"ModelingComponent"});
        },
        hrefMove(){
            window.location.href='/practice/modeling';
        },
        reloadPage(){
            window.location.reload();
        }
    }
}
</script>