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
    const d = await useNuxtApp().$api('GET', '/database/Search.json', page, useCookie('token').value)
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
    margin-top: 15px;
    display: grid;
    grid-row-gap: 10px;
}
</style>