<template>
    <div id="search" class="container">
        <div class="row">
            <div class="col-md-9">
                <div v-if="result">
                    <h5><i class="fa-solid fa-magnifying-glass"></i>{{ $t('Search') }}</h5>
                    <SearchComp :data="search"/>
                    <h5><i class="fa-solid fa-link"></i>{{ $t('Associate') }}</h5>
                    <SearchComp :data="associate"/>
                    <div id="observer"></div>
                </div>
                <div class="p-3" v-else>
                    <h4 class="text-primary"><h4 class="fa-solid fa-robot"></h4> {{ $t('NoSearchResult') }}...</h4>
                    <div class="alert alert-info">
                        <p><b>Wordhub</b> <span v-html="$t('NoSearchResultInfo')"></span></p><br>
                        <a href="#" class="addword text-danger"><i class="fa-solid fa-square-plus"></i> {{ $t('AddWord') }}</a>
                    </div>
                </div>
            </div>
            <div class="col-md-3 d-sm-none d-md-block">
                <h5><i class="fa-solid fa-pen"></i>{{ $t('Quiz') }}</h5>
                <QuizComp :data="quiz" />
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
    //1. fetch api data
    let api_search = await $backendapi('GET', '/api/search/' + useRoute().query.q)
    if ( api_search.data.length == 0 ) {
        result.value = false
    } else {
        //2. if word found, fetch associate
        search.value = api_search.data

        let api_associate = await $backendapi('GET', '/api/associate/' + useRoute().query.q)
        associate.value = api_associate.data
    }

    //3. fetch quiz
    let quizs = await $backendapi('GET', '/api/quiz?pages=5')
    quiz.value = quizs.data

    //4. scroll to bottom and load data
    let page = 1
    const observer = new IntersectionObserver((enteries) => {
        enteries.forEach(async (entry) => {
            page += 1
            let api_associate = await $backendapi('GET', '/api/associate/' + useRoute().query.q + '?page=' + page)
            associate.value = associate.value.concat(api_associate.data)
        })
    })

    observer.observe(document.getElementById('observer'))
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

        .alert-info {
            margin-top: 15px;
            max-width: 500px;
        }

        .addword {
        
            i {
                font-size: 18px;
            }
        }
    }
</style>