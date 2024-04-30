<template>
    <div id="search" class="container">
        <div class="row">
            <div class="col-md-9">
                <template v-for="index in page" :key="index">
                    <WordsComp :data="data" :href="true"/>
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
const data = ref([])
const quiz = ref([])
const page = ref(1)

onMounted( async () => {
    //headers
    let headers = {
        'Content-Type': 'application/json',
        'Accept-Language' : 'zh-tw'
    }

    //api
    let d = await fetch(useRuntimeConfig().public.BACKEND_API_BASE_URL + '/api/search?per_page=20&page=' + page.value, {
        method : 'GET',
        headers : headers
    })
    d = await d.json()
    data.value = d.data

    let q = await fetch(useRuntimeConfig().public.BACKEND_API_BASE_URL + '/api/quizs', {
        method : 'GET',
        headers : headers
    })
    q = await q.json()
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