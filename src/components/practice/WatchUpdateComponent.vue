<template>
<div>watch 예제</div>
<div>count : {{ count }}</div>
<button @click="incrementCount">increment count</button>
<div>update 예제</div>
<div>message : {{ message }}</div>
<button @click="updateMessage">update message</button>
</template>
<script>
export default {
    data() {
        return {
            count :0,
            message : "hello java"
        }
    },
    // 특정 변수 값의 변경사항을 인지하는 hook 함수
    watch: {
        // 인지하고자 하는 변수값과 일치되는 함수명을 사용해야함
        count() {
            alert("count 값 변경");
        }

    },
    // dom객체(화면)의 변경사항을 인지하는 hook 함수
    updated(){
        alert("dom 요소 변경")
    },
    methods: {
        incrementCount() {
            this.count++;
        },
        updateMessage() {
            this.message = "hello python";
        }
    }
}
</script>