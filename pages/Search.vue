<template>
    <div id="search" class="container">
        <div class="row">
            <div class="col-md-9">
                <template v-for="index in page" :key="index">
                    <SearchComp :data="search" :href="true"/>
                    <SearchComp :data="associate" :href="true"/>
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
const associate = ref([])
const quiz = ref([])
const page = ref(1)

onMounted( async () => {
    let api = await $backendapi('GET', '/api/search/' + useRoute().query.q)
    search.value = api.data.search
    associate.value = api.data.associate

    console.log(search.value)

    let quizs = await $backendapi('GET', '/api/quiz')
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