<template>
    <div id="container" class="container">
        <div class="row">
            <div class="col-md-9 result-wrapper">
                <template v-for="index in page" :key="index">
                    <WordsComp :data="data"/>
                </template>
                <div class="observer"></div>
            </div>
            <div class="col-md-3 d-none d-sm-block questions">
               
            </div>
        </div>
    </div>
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


<style scoped lang="scss">
.result-wrapper {
    margin-top: 15px;
    display: grid;
    grid-row-gap: 10px;
}
</style>