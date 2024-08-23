<template lang="">
    <div>
        <h1>test3</h1>
        <p>count : {{getCount}}</p>
        <p>message :{{getMessage}}</p>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    data(){
        return{
            count:0
        }
    },
    computed: {
        ...mapGetters(['getCount','getMessage'])
    },
}
</script>
<style lang="">

</style>