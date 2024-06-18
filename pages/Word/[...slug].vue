<template>
    <div id="word" class="container">
        <div class="row">
            <div class="col-md-9">
                <WordComp :data="word"/>
            </div>
            <div class="col-md-3">
                <h5><i class="fa-solid fa-pen"></i>{{ $t('Quiz') }}</h5>
                <QuizComp :data="quiz" />
            </div>
        </div>
    </div>
</template>

<script setup>
const { $authorization, $backendapi } = useNuxtApp()

const word = ref([])
const quiz = ref([])

onMounted( async () => {
    let api = await $backendapi('GET', '/api/word/' + useRoute().params.slug[0] + '/' + useRoute().params.slug[1])
    word.value.push(api.data)

    let quizs = await $backendapi('GET', '/api/quiz?pages=2')
    quiz.value = quizs.data
})
</script>

<style lang="scss">
#word { 
    margin-top: 30px;

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