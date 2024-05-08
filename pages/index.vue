<template>
    <CategoryComp />
    <CarouselComp />
    <div class="container">
        <div class="row">
            <h5><i class="fa-solid fa-person"></i>{{ $t('Individual') }}</h5>
            <template v-for="index in page" :key="index">
                <WordsComp :data="word.slice(0, 3)" :href="true"/>
                <QuizsComp :data="quiz.slice(0, 1)" />
            </template>
        </div>
        <div class="row">
            <h5><i class="fa-regular fa-face-smile"></i>{{ $t('Spirit') }}</h5>
            <template v-for="index in page" :key="index">
                <WordsComp :data="word.slice(3, 6)" :href="true"/>
                <QuizsComp :data="quiz.slice(1, 2)" />
            </template>
        </div>
        <div class="row">
            <h5><i class="fa-solid fa-house"></i>{{ $t('Household') }}</h5>
            <template v-for="index in page" :key="index">
                <WordsComp :data="word.slice(6, 9)" :href="true"/>
                <QuizsComp :data="quiz.slice(2, 3)" />
            </template>
        </div>
        <div class="row">
            <h5><i class="fa-solid fa-burger"></i>{{ $t('FoodAndDrink') }}</h5>
            <template v-for="index in page" :key="index">
                <WordsComp :data="word.slice(9, 12)" :href="true"/>
                <QuizsComp :data="quiz.slice(3, 4)" />
            </template>
        </div>
        <div class="row">
            <h5><i class="fa-solid fa-users"></i>{{ $t('Social') }}</h5>
            <template v-for="index in page" :key="index">
                <WordsComp :data="word.slice(12, 15)" :href="true"/>
                <QuizsComp :data="quiz.slice(4, 5)" />
            </template>
        </div>
        <div class="row">
            <h5><i class="fa-solid fa-kit-medical"></i>{{ $t('Medical') }}</h5>
            <template v-for="index in page" :key="index">
                <WordsComp :data="word.slice(15, 18)" :href="true"/>
                <QuizsComp :data="quiz.slice(5, 6)" />
            </template>
        </div>
        <div class="row">
            <h5><i class="fa-solid fa-car"></i>{{ $t('Traffic') }}</h5>
            <template v-for="index in page" :key="index">
                <WordsComp :data="word.slice(18, 21)" :href="true"/>
                <QuizsComp :data="quiz.slice(6, 7)" />
            </template>
        </div>
    </div>
</template>

<script setup>
const { $authorization, $backendapi } = useNuxtApp()

const word = ref([])
const quiz = ref([])
const page = ref(1)

onMounted( async () => {
    let words = await $backendapi('GET', '/api/words?per_page=20&page=' + page.value)
    word.value = words.data
  
    let quizs = await $backendapi('GET', '/api/quizs')
    quiz.value = quizs.data
})
</script>

<style scoped lang="scss">
.container {
    h5 {
        font-weight: bold;
        margin: 15px 10px;

        i {
            font-size: 18px;
            margin-right: 10px;
            color: #6610f2;
        }
    }
}
</style>