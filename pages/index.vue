<template>
    <CategoryComp />
    <CarouselComp />
    <div class="container">
        <div class="row">
            <h5><i class="fa-solid fa-person"></i>{{ $t('Individual') }}</h5>
            <template v-for="index in page" :key="index">
                <WordsComp :data="data.slice(0, 3)" :href="true"/>
                <QuizsComp :data="quiz.slice(0, 1)" />
            </template>
        </div>
        <div class="row">
            <h5><i class="fa-regular fa-face-smile"></i>{{ $t('Spirit') }}</h5>
            <template v-for="index in page" :key="index">
                <WordsComp :data="data.slice(3, 6)" :href="true"/>
                <QuizsComp :data="quiz.slice(1, 2)" />
            </template>
        </div>
        <div class="row">
            <h5><i class="fa-solid fa-house"></i>{{ $t('Household') }}</h5>
            <template v-for="index in page" :key="index">
                <WordsComp :data="data.slice(6, 9)" :href="true"/>
                <QuizsComp :data="quiz.slice(2, 3)" />
            </template>
        </div>
        <div class="row">
            <h5><i class="fa-solid fa-burger"></i>{{ $t('FoodAndDrink') }}</h5>
            <template v-for="index in page" :key="index">
                <WordsComp :data="data.slice(9, 12)" :href="true"/>
                <QuizsComp :data="quiz.slice(3, 4)" />
            </template>
        </div>
        <div class="row">
            <h5><i class="fa-solid fa-users"></i>{{ $t('Social') }}</h5>
            <template v-for="index in page" :key="index">
                <WordsComp :data="data.slice(12, 15)" :href="true"/>
                <QuizsComp :data="quiz.slice(4, 5)" />
            </template>
        </div>
        <div class="row">
            <h5><i class="fa-solid fa-kit-medical"></i>{{ $t('Medical') }}</h5>
            <template v-for="index in page" :key="index">
                <WordsComp :data="data.slice(15, 18)" :href="true"/>
                <QuizsComp :data="quiz.slice(5, 6)" />
            </template>
        </div>
        <div class="row">
            <h5><i class="fa-solid fa-car"></i>{{ $t('Traffic') }}</h5>
            <template v-for="index in page" :key="index">
                <WordsComp :data="data.slice(18, 21)" :href="true"/>
                <QuizsComp :data="quiz.slice(6, 7)" />
            </template>
        </div>
    </div>
</template>

<script setup>
const { $authorization } = useNuxtApp()
const c = useRouter().currentRoute.value.query.class

const data = ref([])
const quiz = ref([])
const page = ref(1)

onMounted( async () => {
    //url
    const backend_base_url = useRuntimeConfig().public.BACKEND_API_BASE_URL
    
    let quizsurl = backend_base_url + '/api/quizs?page=' + page.value
    let wordsurl = backend_base_url + '/api/words?per_page=20&page=' + page.value
    if ( c ) { wordsurl = wordsurl + '&class=' + c }

    //headers
    let headers = {
        'Content-Type': 'application/json',
        'Accept-Language' : 'zh-tw',
    }

    if ( $authorization ) { headers['Authorization'] = $authorization }

    //api
    let d = await fetch(wordsurl, {
        method : 'GET',
        headers : headers
    })
    
    d = await d.json()
    data.value = d.data
  
    let q = await fetch(quizsurl, {
        method : 'GET',
        headers : headers
    })
    q = await q.json()
    quiz.value = q.data
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