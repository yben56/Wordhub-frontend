<template>
    <div id="word" class="container">
        <div class="row">
            <div class="col-md-9">
                <WordsComp :data="word"/>
            </div>
            <div class="col-md-3">
                <h5><i class="fa-solid fa-pen"></i>{{ $t('Quiz') }}</h5>
                <QuizsComp :data="quiz" />
            </div>
        </div>
    </div>
</template>

<script setup>
const { $authorization, $backendapi } = useNuxtApp()

const word = ref([])
const quiz = ref([])

onMounted( async () => {
    let words = await $backendapi('GET', '/api/word')
    word.value.push(words.data)

    let quizs = await $backendapi('GET', '/api/quizs')
    quiz.value = quizs.data
})
</script>

<style lang="scss">
#word { 
    margin-top: 30px;

    .col-lg-3 {
        width: 100%;
    }

    h5 {
        font-weight: bold;
        margin-left: 10px;

        i {
            margin: 10px;
            color: #6610f2;
        }
    }
}
</style>