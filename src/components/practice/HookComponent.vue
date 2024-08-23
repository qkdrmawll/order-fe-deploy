<template>
    <h1>생명주기 함수</h1>
    <p>{{ data1 }}</p>
    <p>{{ data2 }}</p>
    <p>{{ data3 }}</p>
</template>
<script>
export default {
    data() {
        return {
            data1: "변경될 데이터1",
            data2: "변경될 데이터2",
            data3: "변경될 데이터3"
        }
    },
    //  화면이 열리기 전(vue 인스턴스가 생성되기 이전)에 실행되는 함수
    // 회원목록조회, 게시글 조회시 화면 열리기 전 데이터를 받아옴
    created() {
        this.data2 = "변경된 데이터2";
    },
    beforeMount() {
        window.addEventListener('resize',this.resize);
    },
    // vue 컴포넌트들이 DOM에 마운트된 이후(화면이 모두 그려진 이후)에 실행되는 함수
    mounted() {
        console.log("after mount");
        this.data3 = "변경된 데이터3";
    },
    // 컴포넌트가 화면에서 제거될때 아래 함수 실행. beforeDestroy로 사용하기도 함
    // 웹소켓, sse연결 등 서버와의 연결을 끊어주고 나가야하는 시점
    beforeUnmount() {
        window.addEventListener('resize',this.resize);
    },
    methods: {
        resize() {
            alert("화면의 배율이 변경되고 있습니다/")
        }
    }
}
</script>