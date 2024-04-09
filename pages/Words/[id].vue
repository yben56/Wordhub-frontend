<template>
    <div id="word" class="container">
        <div class="row">
            <div class="col-md-9">
                <WordsComp :data="data"/>
            </div>
            <div class="col-md-3">
                <h5><i class="fa-solid fa-pen"></i>{{ $t('Quiz') }}</h5>
                <QuizsComp :data="quiz" />
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