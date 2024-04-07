<template>
    <ClassComp />
    <div class="wrapper">
        <template v-for="index in page" :key="index">
            <WordsComp :data="data" :href="true"/>
            <QuizsComp :data="quiz" />
        </template>
    </div>
    <div class="observer"></div>
</template>

<script setup>
const data = ref([])
const quiz = ref([])
const page = ref(1)
const c = useRouter().currentRoute.value.query.class

onMounted( async () => {
    
    //url
    const backend_base_url = useRuntimeConfig().public.BACKEND_API_BASE_URL
    
    let quizsurl = backend_base_url + '/api/quizs?page=' + page.value
    let wordsurl = backend_base_url + '/api/words?per_page=20&page=' + page.value
    if ( c ) { wordsurl = wordsurl + '&class=' + c }

    //headers
    let headers = { 'Content-Type': 'application/json' }

    //api
    let d = await useNuxtApp().$api('GET', wordsurl, headers)
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
    display: grid;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
}

@media (min-width: 1400px) { .wrapper { grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; } }
@media (max-width: 1400px) { .wrapper { grid-template-columns: 1fr 1fr 1fr 1fr 1fr; } }
@media (max-width: 1200px) { .wrapper { grid-template-columns: 1fr 1fr 1fr 1fr; } }
@media (max-width: 992px) { .wrapper { grid-template-columns: 1fr 1fr 1fr; } }
@media (max-width: 768px) { .wrapper { grid-template-columns: 1fr 1fr; } }
@media (max-width: 576px) { .wrapper { grid-template-columns: 1fr; } }
</style>