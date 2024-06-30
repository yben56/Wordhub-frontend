<template>
    <div id="search" class="container">
        <div class="row">
            <div class="col-md-9">
                <div v-if="!result">
                    <h4 class="text-primary ms-4"><h4 class="fa-solid fa-robot"></h4> {{ $t('NoSearchResult') }}...</h4>
                    <div class="alert alert-info">
                        <p><b>Wordhub</b> <span v-html="$t('NoSearchResultInfo')"></span></p><br>
                        <a href="/openedit/word" class="addword text-danger"><i class="fa-solid fa-folder-plus"></i> {{ $t('AddWord') }}</a>
                    </div>
                </div>
                <div class="mt-4">
                    <h5 v-if="result"><i class="fa-solid fa-magnifying-glass"></i>{{ $t('Search') }}</h5>
                    <h5 v-else><i class="fa-solid fa-magnifying-glass"></i>{{ $t('SearchFuzzy') }}</h5>
                    <SearchComp :data="search"/>
                    <div v-if="result">
                        <h5><i class="fa-solid fa-link"></i>{{ $t('Associate') }}</h5>
                        <SearchComp :data="associate"/>
                    </div>
                </div>
            </div>
            <div class="col-md-3 d-sm-none d-md-block">
                <h5><i class="fa-solid fa-pen"></i>{{ $t('Quiz') }}</h5>
                <QuizComp :data="quiz" />
            </div>
        </div>
    </div>
    <div id="observer"></div>
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
    search.value = api_search.data

    if ( api_search.elasticsearch == true ) {
        result.value = false
    } else {
        //2. if word found, fetch associate
        search.value = api_search.data

        //3. load data & scroll to bottom and load more
        let page = 1
        const observer = new IntersectionObserver((enteries) => {
            enteries.forEach(async (entry) => {
                let api_associate = await $backendapi('GET', '/api/associate/' + useRoute().query.q + '?page=' + page)
                associate.value = associate.value.concat(api_associate.data)
                page += 1
            })
        })

        observer.observe(document.getElementById('observer'))
    }

    //4. fetch quiz
    let quizs = await $backendapi('GET', '/api/quiz?pages=5')
    quiz.value = quizs.data 
})
</script>

<style lang="scss" scoped>
    #search { 
        min-height: 1000px;
        margin-top: 30px;

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
        }

        .addword {
            i {
                font-size: 18px;
            }
        }
    }
</style>