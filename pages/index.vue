<template>
    <TypeComp />
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

onMounted( async () => {
    const d = await useNuxtApp().$api('GET', '/database/Words.json', page, useCookie('token').value)
    const q = await useNuxtApp().$api('GET', '/database/Quizs.json', page, useCookie('token').value)

    data.value = d.data
    quiz.value = q.data

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