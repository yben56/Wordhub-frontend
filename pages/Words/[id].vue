<template>
    <div id="container" class="container">
        <div class="row">
            <div class="col-md-9 wrapper">
                <WordsComp :data="data"/>
            </div>
            <div class="col-md-3 d-none d-sm-block">
                <div class="wrapper">
                    <h4 class="title">{{ $t('Quiz') }}</h4>
                    <QuizsComp :data="quiz" />

                    <h4 class="title">{{ $t('Homonym') }}</h4>
                    <WordsComp :data="homon" :href="true"/>

                    <h4 class="title">{{ $t('Homophones') }}</h4>
                    <WordsComp :data="homop" :href="true"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const data = ref([])
const quiz = ref([])
const homon = ref([])
const homop = ref([])

onMounted( async () => {
    //url
    const backend_base_url = useRuntimeConfig().public.BACKEND_API_BASE_URL

    let wordurl = backend_base_url + '/api/word'
    let quizsurl = backend_base_url + '/api/quizs'
    let homonymsurl = backend_base_url + '/api/homonyms'
    let homophonesurl = backend_base_url + '/api/homophones'

    //headers
    let headers = { 'Content-Type': 'application/json' }

    //api
    let d = await useNuxtApp().$api('GET', wordurl, headers)
    data.value.push(await d.json())

    let q = await useNuxtApp().$api('GET', quizsurl, headers)
    quiz.value = await q.json()

    let n = await useNuxtApp().$api('GET', homonymsurl, headers)
    homon.value = await n.json()

    let p = await useNuxtApp().$api('GET', homophonesurl, headers)
    homop.value = await p.json()
})
</script>

<style scoped lang="scss">
.wrapper {
    margin-top: 15px;
    display: grid;
    grid-row-gap: 10px;

    h4 {
        color: #fff;
        padding: 10px 0;
        border-bottom: solid 1px #555;
    }

    .card {
        background-color: #2d3134;
        color: #fff;
        padding: 10px 15px;
        border: solid 1px #3535;
    }
}
</style>