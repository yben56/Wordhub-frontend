<template>
    <div id="search" class="container">
        <div class="row">
            <div class="col-md-9">
                <template v-for="index in page" :key="index">
                    <WordsComp :data="search" :href="true"/>
                </template>
                <div class="observer"></div>
            </div>
            <div class="col-md-3 d-sm-none d-md-block">
                <h5><i class="fa-solid fa-pen"></i>{{ $t('Quiz') }}</h5>
                <QuizsComp :data="quiz" />
            </div>
        </div>

    </div>
</template>

<script setup>
const { $authorization, $backendapi } = useNuxtApp()

const search = ref([])
const quiz = ref([])
const page = ref(1)

onMounted( async () => {
    let searchs = await $backendapi('GET', '/api/search?per_page=20&page=' + page.value)
    search.value = searchs.data

    let quizs = await $backendapi('GET', '/api/quizs')
    quiz.value = quizs.data

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

<style scope lang="scss">
    #search { 
        margin-top: 30px;

        .col-lg-3 {
            width: 100%;
        }

        h5 {
            font-weight: bold;
            margin-left: 10px;

            i {
                margin: 10px;
                color: #6610f2;
            }
        }
    }
</style>