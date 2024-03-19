<template>
    <TypeComp />
    <div class="wrapper">
        <template v-for="index in page" :key="index">
            <WordsComp :data="data"/>
            <QuestionsComp :page="index" />
        </template>
    </div>
    <div class="observer"></div>
</template>

<script setup>
const data = ref([])
const page = ref(1)

onMounted( async () => {
    data.value = await useNuxtApp().$api('GET', '/database/Words.json', page, useCookie('token').value)

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