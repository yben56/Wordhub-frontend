<template>
    <div id="container" class="container">
        <div class="row">
            <div class="col-md-9 wrapper">
                <WordsComp :data="data"/>
                <div v-for="(item, index) in sent">
                    <div class="card">{{ item.from }}</div>
                    <div class="card">{{ item.to }}</div>
                </div>
            </div>
            <div class="col-md-3 d-none d-sm-block">
                <div class="wrapper">
                    <h4 class="title">{{ $t('Quiz') }}</h4>
                    <QuizsComp :data="quiz" />

                    <h4 class="title">{{ $t('Homonym') }}</h4>
                    <WordsComp :data="homon" :href="true"/>

                    <h4 class="title">{{ $t('Homophones') }}</h4>
                    <WordsComp :data="homop" :href="true"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const data = ref([])
const sent = ref([])
const quiz = ref([])
const homon = ref([])
const homop = ref([])
const page = ref(1)

onMounted( async () => {
    const d = await useNuxtApp().$api('GET', '/database/Word.json', false, useCookie('token').value)
    const q = await useNuxtApp().$api('GET', '/database/Quizs.json', page, useCookie('token').value)
    const n = await useNuxtApp().$api('GET', '/database/Homonyms.json', page, useCookie('token').value)
    const p = await useNuxtApp().$api('GET', '/database/Homophones.json', page, useCookie('token').value)

    data.value.push(d.data)
    sent.value = d.data.sentences
    quiz.value = q.data
    homon.value = n.data
    homop.value = p.data
})
</script>

<style scoped lang="scss">
.wrapper {
    margin-top: 15px;
    display: grid;
    grid-row-gap: 10px;

    h4 {
        color: #fff;
        padding: 10px 0;
        border-bottom: solid 1px #555;
    }

    .card {
        background-color: #2d3134;
        color: #fff;
        padding: 10px 15px;
        border: solid 1px #3535;
    }
}
</style>