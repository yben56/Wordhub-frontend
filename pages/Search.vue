<template>
    <div id="search" class="container">
        <div class="row">
            <div class="col-md-9">
                <div v-if="result">
                    <h5><i class="fa-solid fa-magnifying-glass"></i>{{ $t('Search') }}</h5>
                    <SearchComp :data="search"/>
                    <h5><i class="fa-solid fa-link"></i>{{ $t('Associate') }}</h5>
                    <SearchComp :data="associate"/>
                    <div class="observer"></div>
                </div>
                <div v-else>
                    <h4 class="text-primary"><h4 class="fa-solid fa-robot"></h4> {{ $t('NoSearchResult') }}...</h4>
                </div>
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
const result = ref(true)

onMounted( async () => {
    let api_search = await $backendapi('GET', '/api/search/' + useRoute().query.q)
    if ( api_search.data.length == 0 ) {
        result.value = false
    } else {
        search.value = api_search.data

        let api_associate = await $backendapi('GET', '/api/associate/' + useRoute().query.q)
        associate.value = api_associate.data
    }

    let quizs = await $backendapi('GET', '/api/quiz')
        quiz.value = quizs.data

    //scroll bottom load data
    let page = 1
    const observer = new IntersectionObserver((enteries) => {
        enteries.forEach(async (entry) => {
            page += 1
            let api_associate = await $backendapi('GET', '/api/associate/' + useRoute().query.q + '?page=' + page)
            associate.value = associate.value.concat(api_associate.data)
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