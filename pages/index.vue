<template>
    <TypeComp />
    <div class="wrapper">
        <template v-for="index in page" :key="index">
            <WordsComp :data="data"/>
            <QuestionsComp :page="index" />
        </template>
    </div>
</template>

<script setup>
const api = useNuxtApp().$api
const token = useCookie('token').value
const data = ref([])
const page = ref(1)

const handleScroll = () => {
    if ( (window.innerHeight + window.scrollY) >= document.body.scrollHeight ) {
        page.value++
    }
}

onMounted( async () => {
    data.value = await api('GET', '/database/Words.json', page, token)
    window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>