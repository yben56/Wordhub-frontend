<template>
    <TypeComp />
    <div class="wrapper">
        <QuestionsComp />
        <WordsComp />
    </div>
</template>

<script setup>
const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
       
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})

</script>