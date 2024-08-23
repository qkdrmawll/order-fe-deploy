<template lang="">
    <div>
        <h1>test2</h1>
        <p>count : {{getCount}}</p>
        <v-btn @click="incrementCount" color="orange">incre</v-btn>
        <br>
        <v-text-field type=text v-model="message"></v-text-field>
        <v-btn @click="updateMessage" color="orange">update</v-btn>
        div
        
    </div>
    
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    data(){
        return{
            count:0,
            message:""
        }
    },
    computed: {
        ...mapGetters(['getCount']),
    
    },
    methods: {
        incrementCount(){
            // this.count++;
            this.$store.dispatch('incrementCount')
        },
        updateMessage(){
            this.$store.dispatch('updateMessage',this.message);
        }
    }
}
</script>
<style lang="">

</style>