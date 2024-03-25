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

    let wordurl = backend_base_url + 'database/Word.json'
    let quizsurl = backend_base_url + 'database/Quizs.json'
    let homonymsurl = backend_base_url + 'database/Homonyms.json'
    let homophonesurl = backend_base_url + 'database/Homophones.json'

    //headers
    let headers = {  token: useCookie('token').value }

    //api
    const d = await useNuxtApp().$api('GET', wordurl, headers)
    const q = await useNuxtApp().$api('GET', quizsurl, headers)
    const n = await useNuxtApp().$api('GET', homonymsurl, headers)
    const p = await useNuxtApp().$api('GET', homophonesurl, headers)

    //response
    data.value.push(d.data)
    quiz.value = q.data
    homon.value = n.data
    homop.value = p.data
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