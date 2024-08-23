<template>
<!-- HTML 요소의 동적 값 표시 -->
 <!-- html 요소안에 중괄호2번을 사용함으로서 스크립트에 정의된 변수값을 화면에 표시 -->
 <h1>HelloWorld {{ language }}</h1>

 <!-- :value은 단방향 데이터 바인딩 -->
 <input type="text" :value="value1">
 <!-- v-model은 양방향 데이터 바인딩 -->
  <input type="text" v-model="value2">
  <button @click="showValue()">변수 변경 사항 확인</button>
  <h1>
     {{ doubleCount }}
  </h1>
    <br>
  <input type="number" v-model="count">
  <button @click="increment()">increment</button>
</template>
<script>
export default{
    data() {
        return {
            language:"python",
            value1:" java",
            value2:" spring",
            count: 0
        }
    },
    created() {
        alert("created 호출");
    },
    // computed는 종속된 반응형 데이터가 변경될 때에 함수를 다시 실행하여 값을 계산하는 함수
    computed : {
        doubleCount(){
            return this.count*2;
        }
    },
    methods: {
        showValue(){
            alert(this.value2);
        },
        increment(){
            this.count +=1; 
        }
    }
}
</script>