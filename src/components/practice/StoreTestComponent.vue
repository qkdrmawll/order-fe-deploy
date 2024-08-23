<template lang="">
    <div>
        <h1>test1</h1>
        
        <StoreTestComponent2 />
        <StoreTestComponent3 />
    </div>
</template>
<script>
import StoreTestComponent2 from '@/components/practice/StoreTestComponent2.vue';
import StoreTestComponent3 from '@/components/practice/StoreTestComponent3.vue';
export default {
    components:{
        StoreTestComponent2,
        StoreTestComponent3
    },
    data(){
        return{
            
        }
    }
}
</script>
<style>

</style>