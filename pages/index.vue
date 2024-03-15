<template>
    <TypeComp />
    <div class="wrapper">
        <template v-for="index in page" :key="index">
            <WordsComp :page="index" />
            <QuestionsComp :page="index" />
        </template>
    </div>
</template>

<script setup>
const page = ref(1)

const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        page.value++
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>