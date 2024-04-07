<template>
    <div id="container" class="container">
        <div class="row">
            <div class="col-md-9 wrapper">
                <template v-for="index in page" :key="index">
                    <WordsComp :data="data" :href="true"/>
                </template>
                <div class="observer"></div>
            </div>
            <div class="col-md-3 d-none d-sm-block">
                <div class="wrapper">
                    <QuizsComp :data="quiz" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const data = ref([])
const quiz = ref([])
const page = ref(1)

onMounted( async () => {
    //url
    const backend_base_url = useRuntimeConfig().public.BACKEND_API_BASE_URL

    let searchurl = backend_base_url + '/api/search?per_page=20&page=' + page.value
    let quizsurl = backend_base_url + '/api/quizs'

    //headers
    let headers = { 'Content-Type': 'application/json' }

    //api
    let d = await useNuxtApp().$api('GET', searchurl, headers)
    data.value = await d.json()

    let q = await useNuxtApp().$api('GET', quizsurl, headers)
    quiz.value = await q.json()

    //scroll bottom load data
    const observer = new IntersectionObserver((enteries) => {
        enteries.forEach((entry) => {
            if ( entry.intersectionRatio > 0 ) {
                page.value++
            }
        })
    })

    document.querySelectorAll('.observer').forEach((section) => {
        observer.observe(section)
    })
})
</script>

<style scoped lang="scss">
.wrapper {
    margin-top: 15px;
    display: grid;
    grid-row-gap: 10px;
}
</style>